#include "gui/PropertiesPanel.h"

#include <cmath>

namespace Descartes {

namespace {
const juce::Colour PanelColour(0xff1a2027);
const juce::Colour TextColour(0xffe6e9ee);
const juce::Colour DimColour(0xff8b95a3);
const juce::Colour ErrorColour(0xffe05555);
} // namespace

void PropertiesPanel::ChoiceBox::setChoices(std::vector<Choice> choices) {
    mPresets = std::move(choices);
    mItems = mPresets;
    mExtra = -1.0;
    clear(juce::dontSendNotification);
    for (size_t i = 0; i < mItems.size(); ++i) {
        addItem(mItems[i].label, (int)i + 1);
    }
}

void PropertiesPanel::ChoiceBox::showValue(double v) {
    auto find = [this, v]() {
        for (size_t i = 0; i < mItems.size(); ++i) {
            if (std::abs(mItems[i].value - v) < 1e-9) {
                return (int)i + 1;
            }
        }
        return 0;
    };

    int id = find();
    if (id == 0) {
        // A value outside the presets (for example from hand-edited state) stays visible and unchanged.
        mItems = mPresets;
        mItems.push_back({v, juce::String(v, 3)});
        mExtra = v;
        clear(juce::dontSendNotification);
        for (size_t i = 0; i < mItems.size(); ++i) {
            addItem(mItems[i].label, (int)i + 1);
        }
        id = (int)mItems.size();
    } else if (mExtra >= 0.0 && id <= (int)mPresets.size()) {
        mItems = mPresets;
        mExtra = -1.0;
        clear(juce::dontSendNotification);
        for (size_t i = 0; i < mItems.size(); ++i) {
            addItem(mItems[i].label, (int)i + 1);
        }
    }
    setSelectedId(id, juce::dontSendNotification);
}

double PropertiesPanel::ChoiceBox::value() const {
    const int id = getSelectedId();
    return id >= 1 && id <= (int)mItems.size() ? mItems[(size_t)id - 1].value : 0.0;
}

PropertiesPanel::PropertiesPanel(Grid& grid) : mGrid(grid) {
    auto setup = [this](juce::Label& l, juce::Colour c, float size = 13.0f) {
        l.setColour(juce::Label::textColourId, c);
        l.setFont(juce::Font(juce::FontOptions(size)));
        addAndMakeVisible(l);
    };
    setup(mTitle, TextColour, 14.0f);
    setup(mResolutionLabel, DimColour);
    setup(mSpeedLabel, DimColour);
    setup(mCyclesLabel, DimColour);
    setup(mError, ErrorColour);
    setup(mStatus, DimColour, 12.0f);
    setup(mHelp, DimColour, 11.5f);
    mResolutionLabel.setText("Resolution (rows)", juce::dontSendNotification);
    mSpeedLabel.setText("Speed", juce::dontSendNotification);
    mCyclesLabel.setText("Cycles", juce::dontSendNotification);
    mStatus.setJustificationType(juce::Justification::centredRight);
    mHelp.setText("Ctrl+Enter start   Ctrl+. stop   Ctrl+Shift+. stop all   Enter edit   Ctrl+Z undo", juce::dontSendNotification);

    std::vector<Choice> resolutions;
    for (int r : {1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128}) {
        resolutions.push_back({double(r), juce::String(r)});
    }
    mResolution.setChoices(std::move(resolutions));
    mResolution.onChange = [this] {
        if (!mUpdating) {
            mGrid.undoManager().beginNewTransaction();
            applyProps();
        }
    };
    addAndMakeVisible(mResolution);

    mSpeed.setChoices({{1.0 / 8, "x1/8"}, {1.0 / 4, "x1/4"}, {1.0 / 3, "x1/3"}, {1.0 / 2, "x1/2"}, {2.0 / 3, "x2/3"}, {1.0, "x1"},
                       {3.0 / 2, "x3/2"}, {2.0, "x2"}, {3.0, "x3"}, {4.0, "x4"}, {8.0, "x8"}});
    mSpeed.onChange = [this] {
        if (!mUpdating) {
            mGrid.undoManager().beginNewTransaction();
            applyProps();
        }
    };
    addAndMakeVisible(mSpeed);

    mLogButton.onClick = [this] {
        if (onShowLog) {
            onShowLog();
        }
    };
    addAndMakeVisible(mLogButton);

    mTreeButton.onClick = [this] {
        if (onShowTree) {
            onShowTree();
        }
    };
    addAndMakeVisible(mTreeButton);

    std::vector<Choice> cycles{{0.0, "Loop"}};
    for (int c : {1, 2, 3, 4, 6, 8, 12, 16, 32}) {
        cycles.push_back({double(c), juce::String(c)});
    }
    mCycles.setChoices(std::move(cycles));
    mCycles.onChange = [this] {
        if (!mUpdating) {
            mGrid.undoManager().beginNewTransaction();
            applyProps();
        }
    };
    addAndMakeVisible(mCycles);
}

void PropertiesPanel::applyProps() {
    if (!mHasSpeed) {
        return;
    }
    // A step cell only has a speed; its resolution and cycles are kept as they are.
    CellProps p = mGrid.props(mCol, mRow);
    if (mIsStarter) {
        p.resolution = juce::jmax(1, (int)std::lround(mResolution.value()));
        p.cycles = juce::jmax(0, (int)std::lround(mCycles.value()));
    }
    p.speed = CellProps::clampSpeed(mSpeed.value());
    mGrid.setProps(mCol, mRow, p);
}

void PropertiesPanel::update(int col, int row, const Layout& layout, const juce::String& error) {
    mCol = col;
    mRow = row;

    const auto role = layout.roleAt(col, row);
    mIsStarter = role.kind == CellRole::Kind::Starter;
    mHasSpeed = mIsStarter || role.kind == CellRole::Kind::Step;

    juce::String title = "Cell " + Grid::cellName(col, row) + "  -  ";
    switch (role.kind) {
    case CellRole::Kind::Starter: title += "starter"; break;
    case CellRole::Kind::Step:
    case CellRole::Kind::Range: {
        const auto& s = layout.starter(role.starterIndex);
        title += juce::String(role.kind == CellRole::Kind::Step ? "step " : "empty step ") + juce::String(role.step + 1) + " of "
                 + Grid::cellName(s.col, s.row);
        break;
    }
    case CellRole::Kind::None: title += "empty"; break;
    }
    mTitle.setText(title, juce::dontSendNotification);

    mUpdating = true;
    const auto props = mGrid.props(col, row);
    if (mIsStarter) {
        mResolution.showValue(props.resolution);
        mCycles.showValue(props.cycles);
    }
    if (mHasSpeed) {
        mSpeed.showValue(props.speed);
    }
    mUpdating = false;

    mResolution.setEnabled(mIsStarter);
    mCycles.setEnabled(mIsStarter);
    mCyclesLabel.setEnabled(mIsStarter);
    mSpeed.setEnabled(mHasSpeed);
    mResolutionLabel.setEnabled(mIsStarter);
    mSpeedLabel.setEnabled(mHasSpeed);
    mError.setText(error, juce::dontSendNotification);
}

void PropertiesPanel::setStatus(const juce::String& status, bool isError) {
    mStatus.setColour(juce::Label::textColourId, isError ? ErrorColour : DimColour);
    if (mStatus.getText() != status) {
        mStatus.setText(status, juce::dontSendNotification);
    }
}

void PropertiesPanel::setLogErrorCount(int errors) {
    const auto text = errors > 0 ? "Log (" + juce::String(errors) + ")" : juce::String("Log");
    if (mLogButton.getButtonText() != text) {
        mLogButton.setButtonText(text);
    }
    mLogButton.setColour(juce::TextButton::textColourOffId, errors > 0 ? ErrorColour : TextColour);
}

void PropertiesPanel::paint(juce::Graphics& g) {
    g.fillAll(PanelColour);
    g.setColour(juce::Colour(0xff2b3541));
    g.drawLine(0.0f, 0.5f, float(getWidth()), 0.5f);
}

void PropertiesPanel::resized() {
    auto area = getLocalBounds().reduced(10, 6);
    auto top = area.removeFromTop(24);
    mLogButton.setBounds(top.removeFromRight(70).reduced(0, 1));
    top.removeFromRight(6);
    mTreeButton.setBounds(top.removeFromRight(56).reduced(0, 1));
    top.removeFromRight(6);
    mStatus.setBounds(top.removeFromRight(juce::jmin(560, getWidth() / 2)));
    mTitle.setBounds(top);

    area.removeFromTop(4);
    auto row = area.removeFromTop(24);
    mResolutionLabel.setBounds(row.removeFromLeft(130));
    mResolution.setBounds(row.removeFromLeft(80));
    row.removeFromLeft(20);
    mSpeedLabel.setBounds(row.removeFromLeft(50));
    mSpeed.setBounds(row.removeFromLeft(80));
    row.removeFromLeft(20);
    mCyclesLabel.setBounds(row.removeFromLeft(50));
    mCycles.setBounds(row.removeFromLeft(80));
    row.removeFromLeft(12);
    mError.setBounds(row);

    area.removeFromTop(2);
    mHelp.setBounds(area.removeFromTop(20));
}

} // namespace Descartes
