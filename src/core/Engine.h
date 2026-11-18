#pragma once

#include "core/DestinationRegistry.h"
#include "core/EventQueue.h"
#include "core/Grid.h"
#include "core/Scheduler.h"
#include "core/Transport.h"

#include <functional>

namespace Descartes {

/** Everything the plugin does apart from the plugin API: owns the grid and the whole
    scheduler -> queue -> player pipeline. Shared by the plugin and the text-mode app.

    Grid edits mark the engine dirty; the owner calls flushGridUpdate() (message thread) to send a
    snapshot to the scheduler. onGridDirty, when set, is called on every edit so the owner can
    schedule that flush (the plugin uses an AsyncUpdater). */
class Engine : private Grid::Listener {
public:
    Engine();
    ~Engine() override;

    Grid& grid() { return mGrid; }
    const Grid& grid() const { return mGrid; }
    Scheduler& scheduler() { return mScheduler; }
    const Scheduler& scheduler() const { return mScheduler; }
    Transport& transport() { return mTransport; }

    std::function<void()> onGridDirty;

    /** Sends a grid snapshot to the scheduler when something changed since the last call. */
    void flushGridUpdate();

    void startCycle(int col, int row);
    void stopCycle(int col, int row);
    void stopAll();

    void prepare(double sampleRate) { mTransport.prepare(sampleRate); }

    /** Audio thread (or the text-mode clock thread): renders one block of MIDI. */
    void renderBlock(const HostTime& host, int numSamples, juce::MidiBuffer& midi);

    /** Releases every sounding note and drops queued ones. */
    void panic(juce::MidiBuffer& midi);

    /** Re-reads headers into the routing table (after loading state). */
    void applyHeaders();

private:
    void cellChanged(int, int) override { markDirty(); }
    void headerChanged(int col) override;
    void gridReset() override;
    void markDirty();

    Grid mGrid;
    DestinationRegistry mRegistry;
    TransportState mTransportState;
    EventQueue mQueue;
    Transport mTransport;
    Scheduler mScheduler;
    std::atomic<bool> mDirty{false};
};

} // namespace Descartes
