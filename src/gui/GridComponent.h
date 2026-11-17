#pragma once

#include "core/Grid.h"
#include "core/GridClipboard.h"
#include "core/Layout.h"
#include "gui/GridHost.h"

#include <juce_gui_basics/juce_gui_basics.h>

#include <functional>

namespace Descartes {

/** The grid editor: header row (column destinations), cells, ranges, playhead and errors.

    Keys: arrows move, typing or Enter edits, Enter commits (and moves down), Escape cancels,
    Delete clears, Ctrl+Enter starts the cycle, Ctrl+. stops it, Ctrl+Shift+. stops all,
    Ctrl+Z / Ctrl+Shift+Z undo / redo, Ctrl+L opens the log window, Ctrl+D the ValueTree debugger.

    Selection is a rectangle: Shift+arrows / Shift+click / mouse drag extend it, Ctrl+A selects all.
    Ctrl+C / X copy / cut it as a markdown table, Ctrl+V pastes a table (or tab-separated text) at its
    top-left corner as one undo step; Delete clears it. */
class GridComponent : public juce::Component, private Grid::Listener {
public:
    static constexpr int GutterWidth = 44;
    static constexpr int CellWidth = 156;
    static constexpr int CellHeight = 22;
    static constexpr int HeaderHeight = 26;

    GridComponent(Grid& grid, GridHost& host);
    ~GridComponent() override;

    // Selection
    int selectedCol() const { return mSelCol; }
    int selectedRow() const { return mSelRow; }
    void select(int col, int row);                 ///< selects a single cell
    void extendSelection(int col, int row);        ///< keeps the anchor, moves the other corner
    void selectAll();
    CellRect selection() const;                    ///< normalised rectangle, includes the anchor cell
    bool hasRangeSelection() const { return mEndCol != mSelCol || mEndRow != mSelRow; }

    // Clipboard (Ctrl+C / X / V); paste returns false when the clipboard holds nothing usable
    void copySelection();
    void cutSelection();
    bool pasteClipboard();
    void clearSelection();
    std::function<void()> onSelectionChanged;
    std::function<void()> onShowLog; ///< Ctrl+L
    std::function<void()> onShowTree; ///< Ctrl+D

    // Editing (also used by tests)
    bool isEditing() const { return mEditKind != EditKind::None; }
    void beginEdit(const juce::String& initialText);
    void beginHeaderEdit();
    void commitEdit(bool moveDown = true);
    void cancelEdit();

    /** Current structure, recomputed lazily after grid changes. */
    const Layout& layout() const;
    const CellErrors& errors() const { return mErrors; }

    /** Called by the editor's timer: refreshes errors and repaints the playheads. */
    void tick();

    /** Visible part of this component inside its viewport (for the sticky header). */
    void setVisibleArea(juce::Rectangle<int> area);

    juce::Rectangle<int> cellBounds(int col, int row) const;

    void paint(juce::Graphics&) override;
    void resized() override;
    bool keyPressed(const juce::KeyPress&) override;
    void mouseDown(const juce::MouseEvent&) override;
    void mouseDrag(const juce::MouseEvent&) override;
    void mouseUp(const juce::MouseEvent&) override;
    void mouseDoubleClick(const juce::MouseEvent&) override;

private:
    class CellEditor;
    enum class EditKind { None, Cell, Header };

    void gridChanged();
    void cellChanged(int, int) override { gridChanged(); }
    void headerChanged(int) override { gridChanged(); }
    void gridReset() override;

    juce::Rectangle<int> headerBounds(int col) const;
    bool cellAt(juce::Point<int> p, int& col, int& row, bool& isHeader) const;
    void moveSelection(int dCol, int dRow);
    void scrollIntoView(int col, int row);
    void beginEditAt(EditKind kind, const juce::String& text);
    void layoutEditor();
    void updateSize();

    Grid& mGrid;
    GridHost& mHost;

    int mSelCol = 0; ///< anchor cell, the one the properties panel describes
    int mSelRow = 0;
    int mEndCol = 0; ///< opposite corner of the selection rectangle
    int mEndRow = 0;
    bool mDragSelecting = false;

    EditKind mEditKind = EditKind::None;
    std::unique_ptr<CellEditor> mEditor;

    mutable Layout mLayout;
    mutable bool mLayoutDirty = true;
    CellErrors mErrors;
    unsigned int mSeenBuildCount = 0;

    juce::Rectangle<int> mVisible;
    juce::Font mFont;
    juce::Font mBoldFont;
    juce::Font mSmallFont;
};

} // namespace Descartes
