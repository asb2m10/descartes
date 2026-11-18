#pragma once

#include "core/Engine.h"

#include <juce_audio_processors/juce_audio_processors.h>

class DescartesProcessor : public juce::AudioProcessor, private juce::AsyncUpdater {
public:
    DescartesProcessor();
    ~DescartesProcessor() override;

    void prepareToPlay(double sampleRate, int samplesPerBlock) override;
    void releaseResources() override;
    using juce::AudioProcessor::processBlock;
    void processBlock(juce::AudioBuffer<float>&, juce::MidiBuffer&) override;

    juce::AudioProcessorEditor* createEditor() override;
    bool hasEditor() const override { return true; }

    const juce::String getName() const override { return "Descartes"; }
    bool acceptsMidi() const override { return false; }
    bool producesMidi() const override { return true; }
    bool isMidiEffect() const override { return true; }
    double getTailLengthSeconds() const override { return 0.0; }

    int getNumPrograms() override { return 1; }
    int getCurrentProgram() override { return 0; }
    void setCurrentProgram(int) override {}
    const juce::String getProgramName(int) override { return {}; }
    void changeProgramName(int, const juce::String&) override {}

    void getStateInformation(juce::MemoryBlock& destData) override;
    void setStateInformation(const void* data, int sizeInBytes) override;

    // Model access for the editor (message thread).
    Descartes::Grid& grid() { return mEngine.grid(); }
    Descartes::Scheduler& scheduler() { return mEngine.scheduler(); }

    /** Starts / stops cycles. Pending grid edits are sent to the scheduler first, so a cell that
        was just typed is already a starter when the start request arrives. */
    void startCycle(int col, int row);
    void stopCycle(int col, int row);
    void stopAll();

private:
    // AsyncUpdater: coalesces edits into one pattern rebuild
    void handleAsyncUpdate() override;

    Descartes::Engine mEngine;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(DescartesProcessor)
};
