#include "core/Engine.h"

#include "core/Player.h"

namespace Descartes {

Engine::Engine() : mGrid(8, 64), mScheduler(mTransportState, mQueue) {
    // Every column plays on MIDI channel 1 until the user changes its header.
    for (int col = 0; col < mGrid.numCols(); ++col) {
        mGrid.setHeader(col, "midi:1");
    }
    mGrid.undoManager().clearUndoHistory();
    applyHeaders();

    mGrid.addListener(this);
    mScheduler.startScheduler();
    mScheduler.setGrid(mGrid);
}

Engine::~Engine() {
    mGrid.removeListener(this);
    mScheduler.stopScheduler();
}

void Engine::applyHeaders() {
    for (int col = 0; col < mGrid.numCols(); ++col) {
        mRegistry.setColumn(col, mGrid.header(col));
    }
}

void Engine::headerChanged(int col) {
    mRegistry.setColumn(col, mGrid.header(col));
}

void Engine::gridReset() {
    applyHeaders();
    markDirty();
}

void Engine::markDirty() {
    mDirty.store(true);
    if (onGridDirty) {
        onGridDirty();
    }
}

void Engine::flushGridUpdate() {
    if (mDirty.exchange(false)) {
        mScheduler.setGrid(mGrid);
    }
}

void Engine::startCycle(int col, int row) {
    flushGridUpdate();
    mScheduler.requestStart(col, row);
}

void Engine::stopCycle(int col, int row) {
    flushGridUpdate();
    mScheduler.requestStop(col, row);
}

void Engine::stopAll() {
    mScheduler.requestStopAll();
}

void Engine::renderBlock(const HostTime& host, int numSamples, juce::MidiBuffer& midi) {
    const auto block = mTransport.advance(host, numSamples);

    if (block.discontinuity) {
        // Transport stopped, started or jumped: invalidate queued notes, release sounding ones.
        mTransportState.epoch.fetch_add(1);
        Player::flush(mQueue, mRegistry, midi);
    }

    // Publish for the scheduler (epoch first, then position, then playing).
    mTransportState.nowCycle.store(block.beginCycle);
    mTransportState.cyclesPerSecond.store(mTransport.cyclesPerSecond(mTransport.lastBpm()));
    mTransportState.playing.store(block.playing, std::memory_order_release);

    if (block.playing) {
        Player::process(block, mTransportState.epoch.load(), numSamples, mQueue, mRegistry, midi);
    }
}

void Engine::panic(juce::MidiBuffer& midi) {
    Player::flush(mQueue, mRegistry, midi);
}

} // namespace Descartes
