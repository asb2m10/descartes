#pragma once

#include "core/DestinationRegistry.h"
#include "core/EventQueue.h"
#include "core/Transport.h"

namespace Descartes {

/** Audio-thread side of the pipeline: takes due notes from the queue and hands them to the sinks.
    Allocation-free. */
class Player {
public:
    /** Delivers every note of the current epoch that begins before the end of the block. */
    static void process(const TransportBlock& block,
                        unsigned int epoch,
                        int numSamples,
                        EventQueue& queue,
                        DestinationRegistry& registry,
                        juce::MidiBuffer& midi);

    /** Drops queued notes and releases all sounding notes (transport stop / jump). */
    static void flush(EventQueue& queue, DestinationRegistry& registry, juce::MidiBuffer& midi);
};

} // namespace Descartes
