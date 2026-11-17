#pragma once

#include "core/MidiSink.h"

#include <array>
#include <atomic>
#include <memory>

namespace Descartes {

/** Owns the available sinks and routes columns to them by their header text.

    Header syntax: "midi:N" (N = 1..16) or "midi" (channel 1). setColumn() is called from the
    message thread; sinkFor() and the per-block calls are lock-free and safe on the audio thread.
    Sinks live as long as the registry, so the routing pointers never dangle. */
class DestinationRegistry {
public:
    static constexpr int MaxColumns = 64;

    DestinationRegistry();

    /** nullptr when the text is not a known destination. */
    EventSink* resolve(const juce::String& destination) const;

    void setColumn(int column, const juce::String& destination);
    EventSink* sinkFor(int column) const noexcept;

    void endBlock(const BlockContext& block, juce::MidiBuffer& midi);
    void allNotesOff(juce::MidiBuffer& midi);

private:
    std::array<std::unique_ptr<MidiSink>, 16> mMidi;
    std::array<std::atomic<EventSink*>, MaxColumns> mColumns;
};

} // namespace Descartes
