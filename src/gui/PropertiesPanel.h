#pragma once

#include "core/Grid.h"
#include "core/Layout.h"

#include <juce_gui_basics/juce_gui_basics.h>

#include <functional>
#include <vector>

namespace Descartes {

/** Bottom panel: properties of the selected cell (kept out of the cell text on purpose). */
class PropertiesPanel : public juce::Component {
public:
    explicit PropertiesPanel(Grid& grid);

    /** Describes the selection. `error` is the compile error of the cell, if any. */
    void update(int col, int row, const Layout& layout, const juce::String& error);
    void setStatus(const juce::String& status, bool isError);

    /** Shows the number of logged errors on the Log button; onShowLog opens the log window. */
    void setLogErrorCount(int errors);
    std::function<void()> onShowLog;
    std::function<void()> onShowTree; ///< opens the ValueTree debugger

    void paint(juce::Graphics&) override;
    void resized() override;

private:
    /** Numeric properties are picked from a list of presets (never a slider). */
    struct Choice {
        double value;
        juce::String label;
    };
    class ChoiceBox : public juce::ComboBox {
    public:
        void setChoices(std::vector<Choice> choices);
        void showValue(double value); ///< selects the preset, or adds the odd value as an extra item
        double value() const;

    private:
        std::vector<Choice> mPresets;
        std::vector<Choice> mItems;
        double mExtra = -1.0;
    };

    void applyProps();

    Grid& mGrid;
    int mCol = 0;
    int mRow = 0;
    bool mIsStarter = false;
    bool mHasSpeed = false; ///< starter or step cell: speed applies
    bool mUpdating = false;

    juce::Label mTitle;
    juce::Label mResolutionLabel;
    ChoiceBox mResolution;
    juce::Label mSpeedLabel;
    ChoiceBox mSpeed;
    juce::TextButton mLogButton{"Log"};
    juce::TextButton mTreeButton{"Tree"};
    juce::Label mCyclesLabel;
    ChoiceBox mCycles;
    juce::Label mError;
    juce::Label mStatus;
    juce::Label mHelp;
};

} // namespace Descartes
