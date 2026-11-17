#pragma once

#include <atomic>
#include <optional>

namespace Descartes {

/** What the host told us about the play-head for one block. */
struct HostTime {
    bool hasPosition = false; ///< false when there is no play-head at all (standalone)
    bool playing = false;
    std::optional<double> ppq; ///< quarter notes since the start of the song
    std::optional<double> bpm;
};

/** Cycle range covered by one audio block. */
struct TransportBlock {
    bool playing = false;
    double beginCycle = 0.0;
    double endCycle = 0.0;
    double cyclesPerSample = 0.0;
    bool discontinuity = false; ///< stopped, started or jumped: queued events are stale
};

/** Maps host time to cycles. Audio thread only. Free-runs on an internal clock when the host
    gives no play-head. */
class Transport {
public:
    void prepare(double sampleRate) {
        mSampleRate = sampleRate;
        reset();
    }

    void reset() {
        mInternalCycle = 0.0;
        mExpectedBegin = 0.0;
        mWasPlaying = false;
        mWasInternal = false;
    }

    void setBeatsPerCycle(double beats) { mBeatsPerCycle = beats > 0.0 ? beats : 4.0; }
    void setInternalBpm(double bpm) { mInternalBpm = bpm > 0.0 ? bpm : 120.0; }
    double beatsPerCycle() const { return mBeatsPerCycle; }

    double cyclesPerSecond(double bpm) const { return bpm / 60.0 / mBeatsPerCycle; }

    TransportBlock advance(const HostTime& host, int numSamples);

    double lastBpm() const { return mLastBpm; }

private:
    double mSampleRate = 44100.0;
    double mBeatsPerCycle = 4.0;
    double mInternalBpm = 120.0;
    double mLastBpm = 120.0;
    double mInternalCycle = 0.0;
    double mExpectedBegin = 0.0;
    bool mWasPlaying = false;
    bool mWasInternal = false;
};

/** State shared between the audio thread (writer) and the scheduler thread (reader). */
struct TransportState {
    std::atomic<double> nowCycle{0.0};
    std::atomic<double> cyclesPerSecond{0.5};
    std::atomic<bool> playing{false};
    std::atomic<unsigned int> epoch{0};
};

} // namespace Descartes
