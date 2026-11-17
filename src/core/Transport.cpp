#include "core/Transport.h"

#include <cmath>

namespace Descartes {

TransportBlock Transport::advance(const HostTime& host, int numSamples) {
    TransportBlock block;
    mLastBpm = host.bpm.value_or(mInternalBpm);
    block.cyclesPerSample = mLastBpm / 60.0 / mSampleRate / mBeatsPerCycle;
    const double span = block.cyclesPerSample * double(numSamples);

    if (!host.hasPosition || !host.ppq.has_value()) {
        // Free-running internal clock.
        block.playing = true;
        block.beginCycle = mInternalCycle;
        block.endCycle = mInternalCycle + span;
        block.discontinuity = !mWasPlaying || !mWasInternal;
        mInternalCycle = block.endCycle;
        mWasInternal = true;
    } else {
        block.playing = host.playing;
        block.beginCycle = *host.ppq / mBeatsPerCycle;
        mWasInternal = false;
        if (host.playing) {
            block.endCycle = block.beginCycle + span;
            const double tolerance = block.cyclesPerSample * 2.0;
            block.discontinuity = !mWasPlaying || std::abs(block.beginCycle - mExpectedBegin) > tolerance;
        } else {
            block.endCycle = block.beginCycle;
            block.discontinuity = mWasPlaying; // stop edge
        }
    }

    mExpectedBegin = block.endCycle;
    mWasPlaying = block.playing;
    return block;
}

} // namespace Descartes
