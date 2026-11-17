#pragma once

#include "core/Event.h"

#include <juce_audio_basics/juce_audio_basics.h>

namespace Descartes {

/** Time information for the block being rendered. */
struct BlockContext {
    double beginCycle = 0.0;
    double endCycle = 0.0;
    double cyclesPerSample = 0.0;
    int numSamples = 0;

    /** Sample offset inside the block for a cycle time (clamped; late events play at 0). */
    int sampleOffset(double cycle) const {
        if (cyclesPerSample <= 0.0 || numSamples <= 0) {
            return 0;
        }
        const int offset = (int)((cycle - beginCycle) / cyclesPerSample);
        return offset < 0 ? 0 : (offset >= numSamples ? numSamples - 1 : offset);
    }
};

/** Destination of the notes of a column. Called on the audio thread: no allocation, no locks. */
class EventSink {
public:
    virtual ~EventSink() = default;

    virtual void noteOn(const ScheduledNote& note, const BlockContext& block, juce::MidiBuffer& midi) = 0;

    /** Called once after all notes of the block were delivered; emits due note-offs. */
    virtual void endBlock(const BlockContext& block, juce::MidiBuffer& midi) = 0;

    virtual void allNotesOff(juce::MidiBuffer& midi) = 0;
};

} // namespace Descartes
