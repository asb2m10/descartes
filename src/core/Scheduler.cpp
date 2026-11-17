#include "core/Scheduler.h"

#include "core/MemoryLogger.h"
#include "core/StrudelBundle.h"
#include "core/StrudelEngine.h"

#include <algorithm>

namespace Descartes {

Scheduler::Scheduler(TransportState& state, EventQueue& queue)
    : juce::Thread("Descartes scheduler"), mState(state), mQueue(queue) {
    for (auto& p : mPlayheads) {
        p.store(-1);
    }
    for (auto& c : mCycleTimes) {
        c.store(-1.0);
    }
}

Scheduler::~Scheduler() {
    stopScheduler();
}

void Scheduler::startScheduler() {
    if (!isThreadRunning()) {
        startThread();
    }
}

void Scheduler::stopScheduler() {
    signalThreadShouldExit();
    mWake.signal();
    stopThread(5000);
}

void Scheduler::post(Command command) {
    {
        const juce::ScopedLock lock(mCommandLock);
        mCommands.push_back(std::move(command));
    }
    mWake.signal();
}

void Scheduler::setGrid(const Grid& grid) {
    Command c;
    c.kind = Command::Kind::SetGrid;
    c.grid = std::shared_ptr<Grid>(grid.clone());
    post(std::move(c));
}

void Scheduler::requestStart(int col, int row) {
    Command c;
    c.kind = Command::Kind::Start;
    c.col = col;
    c.row = row;
    post(std::move(c));
}

void Scheduler::requestStop(int col, int row) {
    Command c;
    c.kind = Command::Kind::Stop;
    c.col = col;
    c.row = row;
    post(std::move(c));
}

void Scheduler::requestStopAll() {
    Command c;
    c.kind = Command::Kind::StopAll;
    post(std::move(c));
}

int Scheduler::playheadRow(int col) const {
    return col >= 0 && col < MaxColumns ? mPlayheads[(size_t)col].load() : -1;
}

double Scheduler::cycleTime(int col) const {
    return col >= 0 && col < MaxColumns ? mCycleTimes[(size_t)col].load() : -1.0;
}

Scheduler::Diagnostics Scheduler::diagnostics() const {
    Diagnostics d;
    d.aheadMs = mAheadMs.load();
    d.peakGenerateMs = mPeakGenerateMs.load();
    d.peakLoopMs = mPeakLoopMs.load();
    d.restarts = mRestarts.load();
    d.dropped = mDropped.load();
    return d;
}

juce::String Scheduler::loadError() const {
    const juce::ScopedLock lock(mResultLock);
    return mLoadError;
}

CellErrors Scheduler::cellErrors() const {
    const juce::ScopedLock lock(mResultLock);
    return mErrors;
}

void Scheduler::run() {
    StrudelEngine engine;
    if (auto error = engine.loadBundle(strudelBundleSource()); error.isNotEmpty()) {
        MemoryLogger::error("engine", "JS engine failed to load: " + error);
        const juce::ScopedLock lock(mResultLock);
        mLoadError = error;
        return;
    }
    mReady.store(true);

    Session session;
    std::shared_ptr<Grid> grid;
    std::vector<std::pair<int, int>> userStarts; // starter positions the user asked to run
    unsigned int lastEpoch = mState.epoch.load();

    auto starterPosition = [&session](int col, int row) -> std::optional<std::pair<int, int>> {
        if (auto index = session.layout().starterFor(col, row)) {
            const auto& s = session.layout().starter(*index);
            return std::make_pair(s.col, s.row);
        }
        return std::nullopt;
    };

    std::vector<Event> events;

    double lastLoopStart = juce::Time::getMillisecondCounterHiRes();
    double peakWindowStart = lastLoopStart;
    double peakGenerate = 0.0;
    double peakLoop = 0.0;

    while (!threadShouldExit()) {
        const double loopStart = juce::Time::getMillisecondCounterHiRes();
        peakLoop = std::max(peakLoop, loopStart - lastLoopStart);
        lastLoopStart = loopStart;
        if (loopStart - peakWindowStart > 2000.0) { // peaks cover the last ~2 s
            peakWindowStart = loopStart;
            mPeakGenerateMs.store(peakGenerate);
            mPeakLoopMs.store(peakLoop);
            if (peakLoop > 100.0) {
                MemoryLogger::warn("scheduler", "scheduler loop took " + juce::String(juce::roundToInt(peakLoop)) + " ms");
            }
            peakGenerate = 0.0;
            peakLoop = 0.0;
        } else {
            mPeakGenerateMs.store(std::max(mPeakGenerateMs.load(), peakGenerate));
            mPeakLoopMs.store(std::max(mPeakLoopMs.load(), peakLoop));
        }

        // Order matters: the audio thread bumps the epoch before it publishes playing/now.
        const bool playing = mState.playing.load(std::memory_order_acquire);
        const unsigned int epoch = mState.epoch.load();
        const double now = mState.nowCycle.load();
        const double quantum = startQuantum.load();

        // 1. Commands from the message thread.
        std::vector<Command> commands;
        {
            const juce::ScopedLock lock(mCommandLock);
            commands.swap(mCommands);
        }

        for (auto& c : commands) {
            switch (c.kind) {
            case Command::Kind::SetGrid: {
                grid = c.grid;
                Layout layout(*grid);
                auto errors = rebuildPatterns(*grid, layout, engine);
                session.setLayout(layout);
                std::erase_if(userStarts, [&session](const auto& p) {
                    return session.layout().roleAt(p.first, p.second).kind != CellRole::Kind::Starter;
                });
                {
                    const juce::ScopedLock lock(mResultLock);
                    // Log an error only when it is new or changed, not on every rebuild.
                    for (const auto& [pos, message] : errors) {
                        auto previous = mErrors.find(pos);
                        if (previous == mErrors.end() || previous->second != message) {
                            MemoryLogger::error(Grid::cellName(pos.first, pos.second), message);
                        }
                    }
                    mErrors = std::move(errors);
                }
                ++mBuildCount;
                break;
            }
            case Command::Kind::Start:
                if (auto pos = starterPosition(c.col, c.row)) {
                    session.start(pos->first, pos->second, Session::quantize(std::max(now, session.generatedUpTo()), quantum));
                    if (std::find(userStarts.begin(), userStarts.end(), *pos) == userStarts.end()) {
                        userStarts.push_back(*pos);
                    }
                }
                break;
            case Command::Kind::Stop:
                if (auto pos = starterPosition(c.col, c.row)) {
                    session.stop(pos->first, pos->second);
                    std::erase(userStarts, *pos);
                }
                break;
            case Command::Kind::StopAll:
                session.stopAll();
                userStarts.clear();
                break;
            }
        }

        // 2. Transport stopped / started / jumped: restart what the user started, from now.
        if (epoch != lastEpoch) {
            lastEpoch = epoch;
            ++mRestarts;
            MemoryLogger::info("scheduler", "transport started, stopped or jumped: restarting the running cycles");
            std::erase_if(userStarts, [&session](const auto& p) { return !session.isRunning(p.first, p.second); });
            session.rewind(now);
            for (auto& p : userStarts) {
                session.start(p.first, p.second, Session::quantize(now, quantum));
            }
        }

        // 3. Generate ahead of the play-head.
        if (playing) {
            const double target = now + lookaheadSeconds.load() * mState.cyclesPerSecond.load();
            if (target > session.generatedUpTo()) {
                events.clear();
                const double generateStart = juce::Time::getMillisecondCounterHiRes();
                session.generate(session.generatedUpTo(), target, engine, events);
                peakGenerate = std::max(peakGenerate, juce::Time::getMillisecondCounterHiRes() - generateStart);

                int dropped = 0;
                for (const auto& e : events) {
                    ScheduledNote n;
                    n.begin = e.begin;
                    n.end = e.end;
                    n.column = e.column;
                    n.note = (int)e.value["note"];
                    n.velocity = (float)(double)e.value["velocity"];
                    n.epoch = epoch;
                    if (!mQueue.push(n)) {
                        ++mDropped;
                        ++dropped;
                    }
                }
                if (dropped > 0) {
                    MemoryLogger::warn("scheduler", "event queue full, " + juce::String(dropped) + " note(s) dropped");
                }
            }
        }

        // 4. Publish playhead rows, cycle times and health numbers for the GUI.
        for (int col = 0; col < MaxColumns; ++col) {
            auto row = playing ? session.playheadRow(col, now) : std::nullopt;
            mPlayheads[(size_t)col].store(row.value_or(-1));
            auto local = playing ? session.localCycleTime(col, now) : std::nullopt;
            mCycleTimes[(size_t)col].store(local.value_or(-1.0));
        }
        const double cps = mState.cyclesPerSecond.load();
        mAheadMs.store(playing && cps > 0.0 ? (session.generatedUpTo() - now) / cps * 1000.0 : 0.0);

        mWake.wait(5);
    }
}

} // namespace Descartes
