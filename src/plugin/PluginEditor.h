#pragma once

#include "PluginProcessor.h"

#include "gui/GridComponent.h"
#include "gui/GridHost.h"
#include "gui/LogWindow.h"
#include "gui/PropertiesPanel.h"
#include "gui/ValueTreeDebugger.h"

#include <juce_audio_processors/juce_audio_processors.h>

class DescartesEditor : public juce::AudioProcessorEditor, private Descartes::GridHost, private juce::Timer {
public:
    explicit DescartesEditor(DescartesProcessor&);
    ~DescartesEditor() override;

    void paint(juce::Graphics&) override;
    void resized() override;

private:
    class GridViewport;

    // GridHost
    void startCycle(int col, int row) override;
    void stopCycle(int col, int row) override;
    void stopAll() override;
    int playheadRow(int col) const override;
    double cycleTime(int col) const override;
    Descartes::CellErrors cellErrors() const override;
    unsigned int buildCount() const override;

    void timerCallback() override;
    void refreshPanel();
    void showLog();
    void showTree();

    DescartesProcessor& mProcessor;
    std::unique_ptr<GridViewport> mViewport;
    std::unique_ptr<Descartes::GridComponent> mGrid;
    Descartes::PropertiesPanel mPanel;
    std::unique_ptr<Descartes::LogWindow> mLogWindow;
    std::unique_ptr<ValueTreeDebugger> mTreeWindow;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(DescartesEditor)
};
