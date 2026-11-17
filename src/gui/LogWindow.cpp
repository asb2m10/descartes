#include "gui/LogWindow.h"

#include "core/Grid.h"

namespace Descartes {

namespace {
const juce::Colour BackgroundColour(0xff14181d);
const juce::Colour TextColour(0xffe6e9ee);
const juce::Colour DimColour(0xff8b95a3);
const juce::Colour WarnColour(0xfff6c453);
const juce::Colour ErrorColour(0xffe05555);
} // namespace

class LogWindow::Content : public juce::Component, public juce::TableListBoxModel, private MemoryLogger::Listener {
public:
    enum Column { Time = 1, Level, Source, Message };

    explicit Content(LogWindow& owner) : mOwner(owner) {
        mTable.setModel(this);
        mTable.setColour(juce::ListBox::backgroundColourId, BackgroundColour);
        mTable.setRowHeight(20);
        mTable.getHeader().addColumn("Time", Time, 90, 60, 140, juce::TableHeaderComponent::notResizableOrSortable);
        mTable.getHeader().addColumn("Level", Level, 56, 40, 90, juce::TableHeaderComponent::notResizableOrSortable);
        mTable.getHeader().addColumn("Source", Source, 90, 40, 240, juce::TableHeaderComponent::notSortable);
        mTable.getHeader().addColumn("Message", Message, 600, 100, 4000, juce::TableHeaderComponent::notSortable);
        addAndMakeVisible(mTable);

        mFilter.addItem("All messages", 1);
        mFilter.addItem("Warnings and errors", 2);
        mFilter.addItem("Errors only", 3);
        mFilter.setSelectedId(1, juce::dontSendNotification);
        mFilter.onChange = [this] { refresh(); };
        addAndMakeVisible(mFilter);

        mClear.onClick = [] { MemoryLogger::instance().clear(); };
        addAndMakeVisible(mClear);

        mCopy.onClick = [] { juce::SystemClipboard::copyTextToClipboard(MemoryLogger::instance().text()); };
        addAndMakeVisible(mCopy);

        mSummary.setColour(juce::Label::textColourId, DimColour);
        mSummary.setJustificationType(juce::Justification::centredRight);
        addAndMakeVisible(mSummary);

        MemoryLogger::instance().addListener(this);
        refresh();
        setSize(820, 360);
    }

    ~Content() override { MemoryLogger::instance().removeListener(this); }

    int numVisibleRows() const { return (int)mRows.size(); }

    void refresh() {
        const int minLevel = mFilter.getSelectedId() - 1; // 0 info, 1 warning, 2 error
        const bool atBottom = mTable.getVerticalPosition() >= 0.99 || mRows.empty();

        mRows.clear();
        for (auto& e : MemoryLogger::instance().entries()) {
            if ((int)e.level >= minLevel) {
                mRows.push_back(std::move(e));
            }
        }
        mTable.updateContent();
        mTable.repaint();
        mSummary.setText(juce::String(MemoryLogger::instance().errorCount()) + " error(s), " + juce::String((int)mRows.size())
                             + " shown",
                         juce::dontSendNotification);
        if (atBottom && !mRows.empty()) {
            mTable.scrollToEnsureRowIsOnscreen((int)mRows.size() - 1);
        }
    }

    void resized() override {
        auto area = getLocalBounds().reduced(6);
        auto bar = area.removeFromTop(26);
        mFilter.setBounds(bar.removeFromLeft(180));
        bar.removeFromLeft(8);
        mClear.setBounds(bar.removeFromLeft(70));
        bar.removeFromLeft(6);
        mCopy.setBounds(bar.removeFromLeft(70));
        mSummary.setBounds(bar);
        area.removeFromTop(6);
        mTable.setBounds(area);
    }

    void paint(juce::Graphics& g) override { g.fillAll(BackgroundColour); }

    // TableListBoxModel
    int getNumRows() override { return (int)mRows.size(); }

    void paintRowBackground(juce::Graphics& g, int row, int, int, bool selected) override {
        g.fillAll(selected ? juce::Colour(0xff2c5282) : (row % 2 ? juce::Colour(0xff181d23) : BackgroundColour));
    }

    void paintCell(juce::Graphics& g, int row, int columnId, int width, int height, bool) override {
        if (row < 0 || row >= (int)mRows.size()) {
            return;
        }
        const auto& e = mRows[(size_t)row];
        juce::String text;
        switch (columnId) {
        case Time: text = e.time.formatted("%H:%M:%S") + "." + juce::String(e.time.getMilliseconds()).paddedLeft('0', 3); break;
        case Level: text = MemoryLogger::levelName(e.level); break;
        case Source: text = e.source; break;
        case Message: text = e.message + (e.count > 1 ? "  (x" + juce::String(e.count) + ")" : juce::String()); break;
        default: break;
        }
        juce::Colour colour = e.level == MemoryLogger::Level::Error ? ErrorColour : e.level == MemoryLogger::Level::Warning ? WarnColour : TextColour;
        g.setColour(columnId == Message || columnId == Level ? colour : DimColour.brighter(0.3f));
        g.setFont(juce::Font(juce::FontOptions(juce::Font::getDefaultMonospacedFontName(), 12.5f, juce::Font::plain)));
        g.drawText(text, 4, 0, width - 8, height, juce::Justification::centredLeft, true);
    }

    void cellClicked(int row, int, const juce::MouseEvent&) override {
        if (row < 0 || row >= (int)mRows.size() || !mOwner.onSelectCell) {
            return;
        }
        if (auto cell = Grid::parseCellName(mRows[(size_t)row].source)) {
            mOwner.onSelectCell(cell->first, cell->second);
        }
    }

private:
    void logChanged() override { refresh(); }

    LogWindow& mOwner;
    juce::TableListBox mTable;
    juce::ComboBox mFilter;
    juce::TextButton mClear{"Clear"};
    juce::TextButton mCopy{"Copy"};
    juce::Label mSummary;
    std::vector<MemoryLogger::Entry> mRows;
};

LogWindow::LogWindow() : juce::DocumentWindow("Descartes log", BackgroundColour, juce::DocumentWindow::closeButton) {
    mContent = new Content(*this);
    setContentOwned(mContent, true);
    setUsingNativeTitleBar(true);
    setResizable(true, true);
    setResizeLimits(360, 160, 2400, 1600);
    centreWithSize(getWidth(), getHeight());
}

LogWindow::~LogWindow() = default;

void LogWindow::show() {
    mContent->refresh();
    setVisible(true);
    toFront(true);
}

int LogWindow::numVisibleRows() const {
    return mContent->numVisibleRows();
}

} // namespace Descartes
