#include "core/Player.h"

namespace Descartes {

void Player::process(const TransportBlock& block,
                     unsigned int epoch,
                     int numSamples,
                     EventQueue& queue,
                     DestinationRegistry& registry,
                     juce::MidiBuffer& midi) {
    BlockContext ctx;
    ctx.beginCycle = block.beginCycle;
    ctx.endCycle = block.endCycle;
    ctx.cyclesPerSample = block.cyclesPerSample;
    ctx.numSamples = numSamples;

    while (const ScheduledNote* next = queue.peek()) {
        if (next->epoch != epoch) {
            queue.pop(); // stale: belongs to a previous run of the transport
            continue;
        }
        if (next->begin >= block.endCycle) {
            break;
        }

        const ScheduledNote note = *next;
        queue.pop();
        if (auto* sink = registry.sinkFor(note.column)) {
            sink->noteOn(note, ctx, midi);
        }
    }

    registry.endBlock(ctx, midi);
}

void Player::flush(EventQueue& queue, DestinationRegistry& registry, juce::MidiBuffer& midi) {
    while (queue.peek() != nullptr) {
        queue.pop();
    }
    registry.allNotesOff(midi);
}

} // namespace Descartes
