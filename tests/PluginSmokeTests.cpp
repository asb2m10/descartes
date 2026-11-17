#include "plugin/PluginProcessor.h"

#include <juce_core/juce_core.h>

#include <set>

struct PluginSmokeTests : public juce::UnitTest {
    PluginSmokeTests() : juce::UnitTest("PluginSmoke", "descartes") {}

    void runTest() override {
        beginTest("processBlock emits MIDI from grid cells on the internal clock");

        DescartesProcessor processor;
        processor.setPlayConfigDetails(0, 0, 48000.0, 480);
        processor.prepareToPlay(48000.0, 480);

        // The async rebuild needs a message loop, so hand the grid over directly.
        processor.grid().setCell(1, 2, "c3 c4"); // b3
        processor.grid().setHeader(1, "midi:3");
        processor.scheduler().setGrid(processor.grid());
        processor.scheduler().requestStart(1, 2);

        juce::AudioBuffer<float> audio(0, 480);
        juce::MidiBuffer midi;
        std::set<int> notesOn;
        std::set<int> notesOff;
        std::set<int> channels;

        // Internal clock: 120 bpm, 4 beats per cycle -> a cycle lasts 2 s, c4 sounds 1 s after c3.
        // Run roughly in real time (10 ms blocks) for up to 5 s.
        for (int i = 0; i < 500 && notesOff.size() < 2; ++i) {
            midi.clear();
            processor.processBlock(audio, midi);
            for (auto meta : midi) {
                auto m = meta.getMessage();
                if (m.isNoteOn()) {
                    notesOn.insert(m.getNoteNumber());
                    channels.insert(m.getChannel());
                } else if (m.isNoteOff()) {
                    notesOff.insert(m.getNoteNumber());
                }
            }
            juce::Thread::sleep(10);
        }

        expect(processor.scheduler().isReady(), "bundle failed: " + processor.scheduler().loadError());
        expect(notesOn.count(48) == 1, "c3 (48) not played");
        expect(notesOn.count(60) == 1, "c4 (60) not played");
        expect(notesOff.count(48) == 1, "c3 never released");
        expectEquals((int)channels.size(), 1);
        expect(channels.count(3) == 1, "wrong MIDI channel");
        expectEquals((int)processor.scheduler().droppedNotes(), 0);

        processor.releaseResources();
    }
};

static PluginSmokeTests sPluginSmokeTests;
