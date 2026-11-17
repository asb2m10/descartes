#include "PluginProcessor.h"

#include "PluginEditor.h"

#include "core/MemoryLogger.h"
#include "core/Player.h"

DescartesProcessor::DescartesProcessor()
    : juce::AudioProcessor(BusesProperties()),
      mGrid(8, 64),
      mScheduler(mTransportState, mQueue) {
    Descartes::MemoryLogger::instance().install();
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

DescartesProcessor::~DescartesProcessor() {
    cancelPendingUpdate();
    mGrid.removeListener(this);
    mScheduler.stopScheduler();
    Descartes::MemoryLogger::instance().uninstall();
}

void DescartesProcessor::applyHeaders() {
    for (int col = 0; col < mGrid.numCols(); ++col) {
        mRegistry.setColumn(col, mGrid.header(col));
    }
}

void DescartesProcessor::headerChanged(int col) {
    mRegistry.setColumn(col, mGrid.header(col));
}

void DescartesProcessor::gridReset() {
    applyHeaders();
    triggerAsyncUpdate();
}

void DescartesProcessor::handleAsyncUpdate() {
    mScheduler.setGrid(mGrid);
}

void DescartesProcessor::startCycle(int col, int row) {
    handleUpdateNowIfNeeded();
    mScheduler.requestStart(col, row);
}

void DescartesProcessor::stopCycle(int col, int row) {
    handleUpdateNowIfNeeded();
    mScheduler.requestStop(col, row);
}

void DescartesProcessor::stopAll() {
    mScheduler.requestStopAll();
}

void DescartesProcessor::prepareToPlay(double sampleRate, int) {
    mTransport.prepare(sampleRate);
}

void DescartesProcessor::releaseResources() {}

void DescartesProcessor::processBlock(juce::AudioBuffer<float>& buffer, juce::MidiBuffer& midi) {
    juce::ScopedNoDenormals noDenormals;
    buffer.clear();
    midi.clear();

    Descartes::HostTime host;
    if (auto* hostPlayHead = getPlayHead()) {
        if (auto position = hostPlayHead->getPosition()) {
            host.hasPosition = true;
            host.playing = position->getIsPlaying();
            if (auto ppq = position->getPpqPosition()) {
                host.ppq = *ppq;
            }
            if (auto bpm = position->getBpm()) {
                host.bpm = *bpm;
            }
        }
    }

    const int numSamples = buffer.getNumSamples();
    const auto block = mTransport.advance(host, numSamples);

    if (block.discontinuity) {
        // Transport stopped, started or jumped: invalidate queued notes, release sounding ones.
        mTransportState.epoch.fetch_add(1);
        Descartes::Player::flush(mQueue, mRegistry, midi);
    }

    // Publish for the scheduler (epoch first, then position, then playing).
    mTransportState.nowCycle.store(block.beginCycle);
    mTransportState.cyclesPerSecond.store(mTransport.cyclesPerSecond(mTransport.lastBpm()));
    mTransportState.playing.store(block.playing, std::memory_order_release);

    if (block.playing) {
        Descartes::Player::process(block, mTransportState.epoch.load(), numSamples, mQueue, mRegistry, midi);
    }
}

juce::AudioProcessorEditor* DescartesProcessor::createEditor() {
    return new DescartesEditor(*this);
}

void DescartesProcessor::getStateInformation(juce::MemoryBlock& destData) {
    const auto xml = mGrid.toXmlString();
    destData.append(xml.toRawUTF8(), xml.getNumBytesAsUTF8());
}

void DescartesProcessor::setStateInformation(const void* data, int sizeInBytes) {
    const auto xml = juce::String::createStringFromData(data, sizeInBytes);
    if (!mGrid.fromXmlString(xml)) {
        Descartes::MemoryLogger::error("state", "could not restore the saved grid (invalid state data)");
    }
}

juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter() {
    return new DescartesProcessor();
}
