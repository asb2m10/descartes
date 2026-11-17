#pragma once

#include <juce_core/juce_core.h>

namespace Descartes {

/** A single scheduled event, in cycle time (cycles since the transport origin). */
struct Event {
    double begin = 0.0;
    double end = 0.0;
    int column = 0;
    juce::var value;
};

/** Plain-data note handed from the scheduler thread to the audio thread (no allocation, trivially
    copyable). `epoch` identifies the transport run it belongs to: after a stop or a jump the audio
    thread ignores notes from older epochs. */
struct ScheduledNote {
    double begin = 0.0; ///< cycles
    double end = 0.0;   ///< cycles
    int column = 0;
    int note = 60;
    float velocity = 1.0f;
    unsigned int epoch = 0;
};

} // namespace Descartes
