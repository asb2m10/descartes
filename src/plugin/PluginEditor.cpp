#include "PluginEditor.h"

class DescartesEditor::GridViewport : public juce::Viewport {
public:
    std::function<void(juce::Rectangle<int>)> onVisibleAreaChanged;

    void visibleAreaChanged(const juce::Rectangle<int>& area) override {
        if (onVisibleAreaChanged) {
            onVisibleAreaChanged(area);
        }
    }
};

DescartesEditor::DescartesEditor(DescartesProcessor& p)
    : juce::AudioProcessorEditor(p), mProcessor(p), mPanel(p.grid()) {
    Descartes::GridHost& host = *this;
    mGrid = std::make_unique<Descartes::GridComponent>(p.grid(), host);
    mGrid->onSelectionChanged = [this] { refreshPanel(); };
    mGrid->onShowLog = [this] { showLog(); };
    mPanel.onShowLog = [this] { showLog(); };
    mGrid->onShowTree = [this] { showTree(); };
    mPanel.onShowTree = [this] { showTree(); };

    mViewport = std::make_unique<GridViewport>();
    mViewport->setScrollBarsShown(true, true);
    mViewport->setViewedComponent(mGrid.get(), false);
    mViewport->onVisibleAreaChanged = [this](juce::Rectangle<int> area) { mGrid->setVisibleArea(area); };
    addAndMakeVisible(*mViewport);
    addAndMakeVisible(mPanel);

    setResizable(true, true);
    setResizeLimits(480, 300, 2400, 1600);
    setSize(960, 640);

    refreshPanel();
    startTimerHz(30);
    mGrid->grabKeyboardFocus();
}

DescartesEditor::~DescartesEditor() {
    stopTimer();
    mLogWindow.reset();
    mTreeWindow.reset();
    mViewport->setViewedComponent(nullptr, false);
}

void DescartesEditor::paint(juce::Graphics& g) {
    g.fillAll(juce::Colour(0xff14181d));
}

void DescartesEditor::resized() {
    auto area = getLocalBounds();
    mPanel.setBounds(area.removeFromBottom(94));
    mViewport->setBounds(area);
}

void DescartesEditor::startCycle(int col, int row) {
    mProcessor.startCycle(col, row);
}

void DescartesEditor::stopCycle(int col, int row) {
    mProcessor.stopCycle(col, row);
}

void DescartesEditor::stopAll() {
    mProcessor.stopAll();
}

int DescartesEditor::playheadRow(int col) const {
    return mProcessor.scheduler().playheadRow(col);
}

double DescartesEditor::cycleTime(int col) const {
    return mProcessor.scheduler().cycleTime(col);
}

Descartes::CellErrors DescartesEditor::cellErrors() const {
    return mProcessor.scheduler().cellErrors();
}

unsigned int DescartesEditor::buildCount() const {
    return mProcessor.scheduler().buildCount();
}

void DescartesEditor::showLog() {
    if (mLogWindow == nullptr) {
        mLogWindow = std::make_unique<Descartes::LogWindow>();
        mLogWindow->onSelectCell = [this](int col, int row) {
            mGrid->select(col, row);
        };
    }
    mLogWindow->show();
}

void DescartesEditor::showTree() {
    if (mTreeWindow == nullptr) {
        mTreeWindow = std::make_unique<ValueTreeDebugger>();
    }
    // Loading state replaces the grid's tree, so point the window at the current one each time.
    auto tree = mProcessor.grid().state();
    mTreeWindow->setSource(tree);
    mTreeWindow->setVisible(true);
    mTreeWindow->toFront(true);
}

void DescartesEditor::refreshPanel() {
    juce::String error;
    auto it = mGrid->errors().find({mGrid->selectedCol(), mGrid->selectedRow()});
    if (it != mGrid->errors().end()) {
        error = it->second;
    }
    mPanel.update(mGrid->selectedCol(), mGrid->selectedRow(), mGrid->layout(), error);
}

void DescartesEditor::timerCallback() {
    mGrid->tick();
    mPanel.setLogErrorCount(Descartes::MemoryLogger::instance().errorCount());

    auto& scheduler = mProcessor.scheduler();
    if (auto loadError = scheduler.loadError(); loadError.isNotEmpty()) {
        mPanel.setStatus("JS engine error: " + loadError, true);
    } else if (!scheduler.isReady()) {
        mPanel.setStatus("loading Strudel...", false);
    } else {
        const auto d = scheduler.diagnostics();
        juce::String text = "ahead " + juce::String(juce::roundToInt(d.aheadMs)) + " ms | gen " + juce::String(d.peakGenerateMs, 1)
                            + " ms | loop " + juce::String(juce::roundToInt(d.peakLoopMs)) + " ms | restarts " + juce::String((int)d.restarts)
                            + " | dropped " + juce::String((int)d.dropped);
        const bool unhealthy = d.aheadMs < 0.0 || d.peakLoopMs > 100.0 || d.dropped > 0;
        mPanel.setStatus(text, unhealthy);
    }
}
