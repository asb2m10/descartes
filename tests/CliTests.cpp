#include "cli/TuiModel.h"
#include "core/Engine.h"

#include <juce_audio_basics/juce_audio_basics.h>

using namespace Descartes;

struct CliTests : public juce::UnitTest {
    CliTests() : juce::UnitTest("Cli", "descartes") {}

    void runTest() override {
        beginTest("Engine renders the b3 example to MIDI without a plugin host");
        {
            Engine engine;
            engine.prepare(48000.0);
            engine.transport().setInternalBpm(240.0); // 1 cycle per second
            engine.grid().setCell(1, 2, "c3 c4");
            engine.startCycle(1, 2);

            std::vector<int> notes;
            const int block = 480; // 10 ms
            for (int i = 0; i < 400 && notes.size() < 2; ++i) {
                juce::Thread::sleep(10);
                juce::MidiBuffer midi;
                engine.renderBlock({}, block * 1, midi);
                for (const auto meta : midi) {
                    if (meta.getMessage().isNoteOn()) {
                        notes.push_back(meta.getMessage().getNoteNumber());
                    }
                }
            }
            expect(engine.scheduler().isReady(), "bundle failed: " + engine.scheduler().loadError());
            expect(notes.size() >= 2, "expected notes, got " + juce::String((int)notes.size()));
            if (notes.size() >= 2) {
                expectEquals(notes[0], 48);
                expectEquals(notes[1], 60);
            }
            juce::MidiBuffer off;
            engine.panic(off);
        }

        beginTest("TuiModel: cursor, selection, editing, undo");
        {
            Engine engine;
            TuiModel m(engine);
            m.moveTo(1, 2, false);
            m.beginEdit("c3 c4", false);
            m.commitEdit(true);
            expectEquals(engine.grid().cell(1, 2), juce::String("c3 c4"));
            expectEquals(m.cursorRow(), 3);

            m.move(0, -1, false);
            m.move(1, 1, true);
            expect(m.selection() == CellRect{1, 2, 2, 3});

            m.moveTo(1, 2, false);
            m.beginEdit("", true);
            expectEquals(m.editText(), juce::String("c3 c4"));
            m.setEditText("e3");
            m.cancelEdit();
            expectEquals(engine.grid().cell(1, 2), juce::String("c3 c4"));

            m.undo();
            expect(engine.grid().isEmpty(1, 2));
        }

        beginTest("TuiModel: copy / paste round-trip and properties of the owning starter");
        {
            Engine engine;
            TuiModel m(engine);
            engine.grid().setCell(0, 0, "c3");
            engine.grid().setCell(0, 1, "e3");
            m.moveTo(0, 0, false);
            m.moveTo(0, 1, true);
            const auto text = m.copy();
            m.moveTo(3, 4, false);
            expect(m.paste(text));
            expectEquals(engine.grid().cell(3, 4), juce::String("c3"));
            expectEquals(engine.grid().cell(3, 5), juce::String("e3"));

            m.moveTo(3, 5, false); // a step cell: properties belong to the starter above
            expect(m.propsAtCursor().has_value());
            m.stepResolution(1);
            expectEquals(engine.grid().props(3, 4).resolution, 24);
            m.stepCycles();
            expectEquals(engine.grid().props(3, 4).cycles, 1);
            m.stepSpeed(1);
            expectEquals(engine.grid().props(3, 4).speed, 1.5);
        }
    }
};

static CliTests sCliTests;
