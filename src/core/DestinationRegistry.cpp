#include "core/DestinationRegistry.h"

namespace Descartes {

DestinationRegistry::DestinationRegistry() {
    for (int i = 0; i < 16; ++i) {
        mMidi[(size_t)i] = std::make_unique<MidiSink>(i + 1);
    }
    for (auto& c : mColumns) {
        c.store(nullptr);
    }
}

EventSink* DestinationRegistry::resolve(const juce::String& destination) const {
    auto text = destination.trim().toLowerCase();
    if (text == "midi") {
        return mMidi[0].get();
    }
    if (text.startsWith("midi:")) {
        auto number = text.fromFirstOccurrenceOf(":", false, false).trim();
        if (number.isNotEmpty() && number.containsOnly("0123456789")) {
            const int channel = number.getIntValue();
            if (channel >= 1 && channel <= 16) {
                return mMidi[(size_t)(channel - 1)].get();
            }
        }
    }
    return nullptr;
}

void DestinationRegistry::setColumn(int column, const juce::String& destination) {
    if (column >= 0 && column < MaxColumns) {
        mColumns[(size_t)column].store(resolve(destination));
    }
}

EventSink* DestinationRegistry::sinkFor(int column) const noexcept {
    return column >= 0 && column < MaxColumns ? mColumns[(size_t)column].load() : nullptr;
}

void DestinationRegistry::endBlock(const BlockContext& block, juce::MidiBuffer& midi) {
    for (auto& sink : mMidi) {
        sink->endBlock(block, midi);
    }
}

void DestinationRegistry::allNotesOff(juce::MidiBuffer& midi) {
    for (auto& sink : mMidi) {
        sink->allNotesOff(midi);
    }
}

} // namespace Descartes
