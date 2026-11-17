#pragma once

#include "core/EventQueue.h"
#include "core/Grid.h"
#include "core/PatternBuilder.h"
#include "core/Session.h"
#include "core/Transport.h"

#include <juce_core/juce_core.h>

#include <array>
#include <atomic>
#include <memory>
#include <vector>

namespace Descartes {

/** Worker thread that owns the Strudel engine and the Session. It keeps a short window of notes
    generated ahead of the transport and pushes them to the audio thread through an EventQueue.

    The message thread talks to it through requestStart/Stop/setGrid (thread-safe); the audio thread
    only reads/writes the lock-free TransportState and EventQueue. */
class Scheduler : private juce::Thread {
public:
    static constexpr int MaxColumns = 64;

    Scheduler(TransportState& state, EventQueue& queue);
    ~Scheduler() override;

    void startScheduler();
    void stopScheduler();

    /** Takes a copy of the grid, then compiles it and rebuilds patterns on the worker thread. */
    void setGrid(const Grid& grid);

    void requestStart(int col, int row);
    void requestStop(int col, int row);
    void requestStopAll();

    /** Row the playhead is on in a column, or -1 when nothing runs there. */
    int playheadRow(int col) const;

    /** True once the Strudel bundle is loaded. */
    bool isReady() const { return mReady.load(); }
    juce::String loadError() const;

    /** Compile errors of the last rebuild, keyed by (col, row). */
    CellErrors cellErrors() const;
    /** Incremented after every rebuild. */
    unsigned int buildCount() const { return mBuildCount.load(); }

    unsigned int droppedNotes() const { return mDropped.load(); }

    /** Time (cycles) since the running cycle in a column started, or -1 when none runs there. */
    double cycleTime(int col) const;

    /** Health of the scheduler, for finding stalls. Peaks cover roughly the last two seconds. */
    struct Diagnostics {
        double aheadMs = 0.0;         ///< how far notes are generated beyond the play-head (negative = starved)
        double peakGenerateMs = 0.0;  ///< slowest Session::generate call
        double peakLoopMs = 0.0;      ///< longest gap between two scheduler loop iterations
        unsigned int restarts = 0;    ///< transport stops/starts/jumps the scheduler has handled
        unsigned int dropped = 0;     ///< notes lost because the queue was full
    };
    Diagnostics diagnostics() const;

    // Tunables (set before starting, or from the message thread; read on the worker thread).
    std::atomic<double> lookaheadSeconds{0.15};
    std::atomic<double> startQuantum{0.25}; ///< cycles; cycles start on the next multiple

private:
    struct Command {
        enum class Kind { SetGrid, Start, Stop, StopAll } kind = Kind::Start;
        int col = 0;
        int row = 0;
        std::shared_ptr<Grid> grid;
    };

    void run() override;
    void post(Command command);

    TransportState& mState;
    EventQueue& mQueue;

    juce::CriticalSection mCommandLock;
    std::vector<Command> mCommands;
    juce::WaitableEvent mWake;

    std::atomic<bool> mReady{false};
    mutable juce::CriticalSection mResultLock;
    juce::String mLoadError;
    CellErrors mErrors;
    std::atomic<unsigned int> mBuildCount{0};
    std::atomic<unsigned int> mDropped{0};

    std::array<std::atomic<int>, MaxColumns> mPlayheads;
    std::array<std::atomic<double>, MaxColumns> mCycleTimes;
    std::atomic<double> mAheadMs{0.0};
    std::atomic<double> mPeakGenerateMs{0.0};
    std::atomic<double> mPeakLoopMs{0.0};
    std::atomic<unsigned int> mRestarts{0};
};

} // namespace Descartes
