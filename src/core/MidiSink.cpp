#include "core/MidiSink.h"

namespace Descartes {

void MidiSink::noteOn(const ScheduledNote& n, const BlockContext& block, juce::MidiBuffer& midi) {
    const int note = juce::jlimit(0, 127, n.note);
    const int velocity = juce::jlimit(1, 127, juce::roundToInt(n.velocity * 127.0f));
    const int offset = block.sampleOffset(n.begin);

    // Retrigger: release the previous instance of this note first.
    for (int i = 0; i < mNumActive; ++i) {
        if (mActive[(size_t)i].note == note) {
            midi.addEvent(juce::MidiMessage::noteOff(mChannel, note), offset);
            mActive[(size_t)i] = mActive[(size_t)(--mNumActive)];
            break;
        }
    }

    // Table full: release the oldest entry to make room.
    if (mNumActive == MaxActive) {
        midi.addEvent(juce::MidiMessage::noteOff(mChannel, mActive[0].note), offset);
        mActive[0] = mActive[(size_t)(--mNumActive)];
    }

    midi.addEvent(juce::MidiMessage::noteOn(mChannel, note, (juce::uint8)velocity), offset);
    mActive[(size_t)mNumActive++] = {juce::jmax(n.end, n.begin + 1e-9), note};
}

void MidiSink::endBlock(const BlockContext& block, juce::MidiBuffer& midi) {
    for (int i = 0; i < mNumActive;) {
        const auto& a = mActive[(size_t)i];
        if (a.endCycle < block.endCycle) {
            midi.addEvent(juce::MidiMessage::noteOff(mChannel, a.note), block.sampleOffset(a.endCycle));
            mActive[(size_t)i] = mActive[(size_t)(--mNumActive)];
        } else {
            ++i;
        }
    }
}

void MidiSink::allNotesOff(juce::MidiBuffer& midi) {
    for (int i = 0; i < mNumActive; ++i) {
        midi.addEvent(juce::MidiMessage::noteOff(mChannel, mActive[(size_t)i].note), 0);
    }
    mNumActive = 0;
}

} // namespace Descartes
