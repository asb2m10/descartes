#pragma once

#include "core/Engine.h"
#include "core/GridClipboard.h"
#include "core/Layout.h"

namespace Descartes {

/** State and behaviour of the text-mode editor, independent of FTXUI so it can be tested.
    The FTXUI layer only maps key events to these calls and draws the result. */
class TuiModel {
public:
    explicit TuiModel(Engine& engine) : mEngine(engine) { refreshLayout(); }

    Engine& engine() { return mEngine; }
    Grid& grid() { return mEngine.grid(); }

    // Cursor / selection
    int cursorCol() const { return mCol; }
    int cursorRow() const { return mRow; }
    CellRect selection() const;
    void moveTo(int col, int row, bool extend);
    void move(int dCol, int dRow, bool extend) { moveTo(mCol + dCol, mRow + dRow, extend); }
    void selectAll();

    // Editing
    bool isEditing() const { return mEditing; }
    bool isEditingHeader() const { return mEditHeader; }
    const juce::String& editText() const { return mEditText; }
    void beginEdit(const juce::String& initial, bool keepExisting);
    void beginHeaderEdit();
    void setEditText(const juce::String& text) { mEditText = text; }
    void commitEdit(bool moveDown);
    void cancelEdit() { mEditing = false; mEditHeader = false; }
    void clearSelection();

    // Clipboard (markdown table text kept in memory; the app also mirrors it to the terminal)
    juce::String copy() const;
    juce::String cut();
    bool paste(const juce::String& text);

    // Cycles
    void startAtCursor();
    void stopAtCursor();
    void stopAll() { mEngine.stopAll(); }

    // Properties of the starter owning the cursor
    std::optional<CellProps> propsAtCursor() const;
    void stepResolution(int direction);
    void stepSpeed(int direction);
    void stepCycles(); ///< next cycles preset (0 = loop), wrapping

    bool undo();
    bool redo();

    /** Rebuilds the cached layout; call before drawing (cheap). */
    const Layout& layout();
    void refreshLayout();

private:
    std::optional<std::pair<int, int>> starterCell() const;
    void applyProps(const CellProps& p);

    Engine& mEngine;
    Layout mLayout;
    int mCol = 0, mRow = 0, mAnchorCol = 0, mAnchorRow = 0;
    bool mEditing = false;
    bool mEditHeader = false;
    juce::String mEditText;
};

} // namespace Descartes
