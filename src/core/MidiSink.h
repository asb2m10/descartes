#pragma once

#include "core/EventSink.h"

#include <array>

namespace Descartes {

/** Sends notes on one MIDI channel and schedules their note-offs from the note end time. */
class MidiSink : public EventSink {
public:
    explicit MidiSink(int channel) : mChannel(juce::jlimit(1, 16, channel)) {}

    void noteOn(const ScheduledNote& note, const BlockContext& block, juce::MidiBuffer& midi) override;
    void endBlock(const BlockContext& block, juce::MidiBuffer& midi) override;
    void allNotesOff(juce::MidiBuffer& midi) override;

    int channel() const { return mChannel; }

private:
    struct Active {
        double endCycle = 0.0;
        int note = 0;
    };

    static constexpr int MaxActive = 128;

    int mChannel;
    std::array<Active, MaxActive> mActive{};
    int mNumActive = 0;
};

} // namespace Descartes
