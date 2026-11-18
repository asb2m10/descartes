#include "PluginProcessor.h"

#include "PluginEditor.h"

#include "core/MemoryLogger.h"

DescartesProcessor::DescartesProcessor() : juce::AudioProcessor(BusesProperties()) {
    Descartes::MemoryLogger::instance().install();
    mEngine.onGridDirty = [this] { triggerAsyncUpdate(); };
}

DescartesProcessor::~DescartesProcessor() {
    cancelPendingUpdate();
    mEngine.onGridDirty = nullptr;
    Descartes::MemoryLogger::instance().uninstall();
}

void DescartesProcessor::handleAsyncUpdate() {
    mEngine.flushGridUpdate();
}

void DescartesProcessor::startCycle(int col, int row) {
    cancelPendingUpdate();
    mEngine.startCycle(col, row);
}

void DescartesProcessor::stopCycle(int col, int row) {
    cancelPendingUpdate();
    mEngine.stopCycle(col, row);
}

void DescartesProcessor::stopAll() {
    mEngine.stopAll();
}

void DescartesProcessor::prepareToPlay(double sampleRate, int) {
    mEngine.prepare(sampleRate);
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

    mEngine.renderBlock(host, buffer.getNumSamples(), midi);
}

juce::AudioProcessorEditor* DescartesProcessor::createEditor() {
    return new DescartesEditor(*this);
}

void DescartesProcessor::getStateInformation(juce::MemoryBlock& destData) {
    const auto xml = grid().toXmlString();
    destData.append(xml.toRawUTF8(), xml.getNumBytesAsUTF8());
}

void DescartesProcessor::setStateInformation(const void* data, int sizeInBytes) {
    const auto xml = juce::String::createStringFromData(data, sizeInBytes);
    if (!grid().fromXmlString(xml)) {
        Descartes::MemoryLogger::error("state", "could not restore the saved grid (invalid state data)");
    }
}

juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter() {
    return new DescartesProcessor();
}
