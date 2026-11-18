#pragma once

#include "core/Engine.h"

#include <juce_audio_devices/juce_audio_devices.h>

namespace Descartes {

/** Stands in for the plugin host: a thread that advances the engine in real time on its internal
    clock and writes the resulting MIDI to an output device. */
class MidiClock : private juce::Thread {
public:
    static constexpr double SampleRate = 48000.0;

    /** Opens `portName` when it names an existing output; otherwise creates a virtual port with
        that name (Linux / macOS). Check isOpen(). */
    MidiClock(Engine& engine, const juce::String& portName);
    ~MidiClock() override;

    bool isOpen() const { return mOutput != nullptr; }
    juce::String portDescription() const { return mDescription; }

    void setBpm(double bpm) { mBpm.store(bpm); }
    double bpm() const { return mBpm.load(); }

private:
    void run() override;

    Engine& mEngine;
    std::unique_ptr<juce::MidiOutput> mOutput;
    juce::String mDescription;
    std::atomic<double> mBpm{120.0};
};

} // namespace Descartes
