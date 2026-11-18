#include "gui/GridComponent.h"

#include "core/MemoryLogger.h"

#include <algorithm>
#include <cmath>

namespace Descartes {

namespace {
const juce::Colour BackgroundColour(0xff14181d);
const juce::Colour GridLineColour(0xff222a33);
const juce::Colour GutterColour(0xff1a2027);
const juce::Colour HeaderColour(0xff202a35);
const juce::Colour StarterColour(0xff2c5282);
const juce::Colour StepColour(0xff243447);
const juce::Colour RangeColour(0xff1a232d);
const juce::Colour PlayheadColour(0xff6b8e23);
const juce::Colour SelectionColour(0xfff6c453);
const juce::Colour ErrorColour(0xffe05555);
const juce::Colour TextColour(0xffe6e9ee);
const juce::Colour DimTextColour(0xff8b95a3);

juce::Font monospace(float size, int style = juce::Font::plain) {
    return juce::Font(juce::FontOptions(juce::Font::getDefaultMonospacedFontName(), size, style));
}
} // namespace

/** Single-line editor that also reports Ctrl+Enter, Escape and Tab to the grid. */
class GridComponent::CellEditor : public juce::TextEditor {
public:
    std::function<void()> onCtrlEnter;

    bool keyPressed(const juce::KeyPress& key) override {
        if (key.getKeyCode() == juce::KeyPress::returnKey && key.getModifiers().isCtrlDown()) {
            if (onCtrlEnter) {
                onCtrlEnter();
            }
            return true;
        }
        return juce::TextEditor::keyPressed(key);
    }
};

GridComponent::GridComponent(Grid& grid, GridHost& host)
    : mGrid(grid), mHost(host), mFont(monospace(13.5f)), mBoldFont(monospace(13.5f, juce::Font::bold)), mSmallFont(monospace(10.5f)) {
    setWantsKeyboardFocus(true);
    setOpaque(true);
    mGrid.addListener(this);

    mEditor = std::make_unique<CellEditor>();
    mEditor->setFont(mFont);
    mEditor->setMultiLine(false);
    mEditor->setReturnKeyStartsNewLine(false);
    mEditor->setColour(juce::TextEditor::backgroundColourId, juce::Colour(0xff0d1014));
    mEditor->setColour(juce::TextEditor::textColourId, TextColour);
    mEditor->setColour(juce::TextEditor::outlineColourId, SelectionColour);
    mEditor->setColour(juce::TextEditor::focusedOutlineColourId, SelectionColour);
    mEditor->setIndents(4, 2);
    mEditor->setBorder(juce::BorderSize<int>(0));
    mEditor->onReturnKey = [this] { commitEdit(true); };
    mEditor->onEscapeKey = [this] { cancelEdit(); };
    mEditor->onFocusLost = [this] {
        if (isEditing()) {
            commitEdit(false);
        }
    };
    mEditor->onCtrlEnter = [this] {
        const int col = mSelCol;
        const int row = mSelRow;
        commitEdit(false);
        mHost.startCycle(col, row);
        grabKeyboardFocus();
    };
    addChildComponent(*mEditor);

    updateSize();
}

GridComponent::~GridComponent() {
    mEditor->onFocusLost = nullptr;
    mGrid.removeListener(this);
}

void GridComponent::updateSize() {
    setSize(GutterWidth + mGrid.numCols() * CellWidth, HeaderHeight + mGrid.numRows() * CellHeight);
}

const Layout& GridComponent::layout() const {
    if (mLayoutDirty) {
        mLayout = Layout(mGrid);
        mLayoutDirty = false;
    }
    return mLayout;
}

void GridComponent::gridChanged() {
    mLayoutDirty = true;
    repaint();
}

void GridComponent::gridReset() {
    mSelCol = juce::jlimit(0, mGrid.numCols() - 1, mSelCol);
    mSelRow = juce::jlimit(0, mGrid.numRows() - 1, mSelRow);
    cancelEdit();
    updateSize();
    gridChanged();
    if (onSelectionChanged) {
        onSelectionChanged();
    }
}

void GridComponent::setVisibleArea(juce::Rectangle<int> area) {
    mVisible = area;
    repaint();
    layoutEditor();
}

void GridComponent::tick() {
    const auto count = mHost.buildCount();
    if (count != mSeenBuildCount) {
        mSeenBuildCount = count;
        mErrors = mHost.cellErrors();
        if (onSelectionChanged) {
            onSelectionChanged();
        }
    }
    repaint();
}

juce::Rectangle<int> GridComponent::cellBounds(int col, int row) const {
    return {GutterWidth + col * CellWidth, HeaderHeight + row * CellHeight, CellWidth, CellHeight};
}

juce::Rectangle<int> GridComponent::headerBounds(int col) const {
    return {GutterWidth + col * CellWidth, mVisible.getY(), CellWidth, HeaderHeight};
}

bool GridComponent::cellAt(juce::Point<int> p, int& col, int& row, bool& isHeader) const {
    if (p.x < GutterWidth) {
        return false;
    }
    col = (p.x - GutterWidth) / CellWidth;
    if (col < 0 || col >= mGrid.numCols()) {
        return false;
    }
    if (p.y >= mVisible.getY() && p.y < mVisible.getY() + HeaderHeight) {
        isHeader = true;
        row = 0;
        return true;
    }
    isHeader = false;
    row = (p.y - HeaderHeight) / CellHeight;
    return p.y >= HeaderHeight && row >= 0 && row < mGrid.numRows();
}

void GridComponent::select(int col, int row) {
    col = juce::jlimit(0, mGrid.numCols() - 1, col);
    row = juce::jlimit(0, mGrid.numRows() - 1, row);
    const bool anchorMoved = col != mSelCol || row != mSelRow;
    if (!anchorMoved && !hasRangeSelection()) {
        return;
    }
    mSelCol = mEndCol = col;
    mSelRow = mEndRow = row;
    scrollIntoView(col, row);
    repaint();
    if (anchorMoved && onSelectionChanged) {
        onSelectionChanged();
    }
}

void GridComponent::extendSelection(int col, int row) {
    col = juce::jlimit(0, mGrid.numCols() - 1, col);
    row = juce::jlimit(0, mGrid.numRows() - 1, row);
    if (col == mEndCol && row == mEndRow) {
        return;
    }
    mEndCol = col;
    mEndRow = row;
    scrollIntoView(col, row);
    repaint();
}

void GridComponent::selectAll() {
    mSelCol = 0;
    mSelRow = 0;
    mEndCol = mGrid.numCols() - 1;
    mEndRow = mGrid.numRows() - 1;
    repaint();
    if (onSelectionChanged) {
        onSelectionChanged();
    }
}

CellRect GridComponent::selection() const {
    return {juce::jmin(mSelCol, mEndCol), juce::jmin(mSelRow, mEndRow), juce::jmax(mSelCol, mEndCol), juce::jmax(mSelRow, mEndRow)};
}

void GridComponent::moveSelection(int dCol, int dRow) {
    select(mSelCol + dCol, mSelRow + dRow);
}

void GridComponent::scrollIntoView(int col, int row) {
    if (auto* viewport = findParentComponentOfClass<juce::Viewport>()) {
        auto view = viewport->getViewArea();
        auto cell = cellBounds(col, row);
        auto pos = viewport->getViewPosition();

        if (cell.getX() < view.getX() + GutterWidth) {
            pos.x = cell.getX() - GutterWidth;
        } else if (cell.getRight() > view.getRight()) {
            pos.x = cell.getRight() - view.getWidth();
        }
        if (cell.getY() < view.getY() + HeaderHeight) {
            pos.y = cell.getY() - HeaderHeight;
        } else if (cell.getBottom() > view.getBottom()) {
            pos.y = cell.getBottom() - view.getHeight();
        }
        viewport->setViewPosition(juce::jmax(0, pos.x), juce::jmax(0, pos.y));
    }
}

void GridComponent::copySelection() {
    juce::SystemClipboard::copyTextToClipboard(GridClipboard::toMarkdown(mGrid, selection()));
}

void GridComponent::clearSelection() {
    const auto rect = selection();
    mGrid.undoManager().beginNewTransaction();
    for (int col = rect.col0; col <= rect.col1; ++col) {
        for (int row = rect.row0; row <= rect.row1; ++row) {
            if (!mGrid.cell(col, row).isEmpty()) {
                mGrid.setCell(col, row, {});
            }
        }
    }
}

void GridComponent::cutSelection() {
    copySelection();
    clearSelection();
}

bool GridComponent::pasteClipboard() {
    const auto block = GridClipboard::fromText(juce::SystemClipboard::getTextFromClipboard());
    if (block.empty()) {
        return false;
    }

    const auto rect = selection();
    int width = 0;
    for (const auto& row : block) {
        width = juce::jmax(width, (int)row.size());
    }
    const int height = (int)block.size();

    int lastCol = rect.col0;
    int lastRow = rect.row0;
    bool clipped = false;
    mGrid.undoManager().beginNewTransaction();
    for (int r = 0; r < height; ++r) {
        for (int c = 0; c < (int)block[(size_t)r].size(); ++c) {
            const int col = rect.col0 + c;
            const int row = rect.row0 + r;
            if (!mGrid.inBounds(col, row)) {
                clipped = true;
                continue;
            }
            mGrid.setCell(col, row, block[(size_t)r][(size_t)c]);
            lastCol = juce::jmax(lastCol, col);
            lastRow = juce::jmax(lastRow, row);
        }
    }
    if (clipped) {
        MemoryLogger::warn("clipboard", "pasted " + juce::String(width) + "x" + juce::String(height) + " cells at "
                                            + Grid::cellName(rect.col0, rect.row0) + ": the part outside the grid was dropped");
    }

    mEndCol = lastCol;
    mEndRow = lastRow;
    repaint();
    return true;
}

void GridComponent::paint(juce::Graphics& g) {
    g.fillAll(BackgroundColour);

    const auto clip = g.getClipBounds();
    const auto& lay = layout();
    const auto selected = selection();
    const bool selectedRange = hasRangeSelection();
    const int firstRow = juce::jmax(0, (clip.getY() - HeaderHeight) / CellHeight);
    const int lastRow = juce::jmin(mGrid.numRows() - 1, (clip.getBottom() - HeaderHeight) / CellHeight);
    const int firstCol = juce::jmax(0, (clip.getX() - GutterWidth) / CellWidth);
    const int lastCol = juce::jmin(mGrid.numCols() - 1, (clip.getRight() - GutterWidth) / CellWidth);

    for (int col = firstCol; col <= lastCol; ++col) {
        const int playRow = mHost.playheadRow(col);

        for (int row = firstRow; row <= lastRow; ++row) {
            const auto r = cellBounds(col, row);
            const auto role = lay.roleAt(col, row);

            juce::Colour bg = BackgroundColour;
            switch (role.kind) {
            case CellRole::Kind::Starter: bg = StarterColour; break;
            case CellRole::Kind::Step: bg = StepColour; break;
            case CellRole::Kind::Range: bg = RangeColour; break;
            case CellRole::Kind::None: break;
            }
            g.setColour(bg);
            g.fillRect(r);

            if (row == playRow) {
                g.setColour(PlayheadColour.withAlpha(0.55f));
                g.fillRect(r);
            }

            g.setColour(GridLineColour);
            g.drawRect(r, 1);

            const auto text = mGrid.cell(col, row);
            if (text.isNotEmpty()) {
                g.setColour(TextColour);
                g.setFont(role.kind == CellRole::Kind::Starter ? mBoldFont : mFont);
                const bool hasBadge = role.kind == CellRole::Kind::Starter;
                const bool stepBadge = role.kind == CellRole::Kind::Step && std::abs(mGrid.props(col, row).speed - 1.0) > 1e-9;
                g.drawText(text, r.reduced(4, 0).withTrimmedRight(hasBadge ? 56 : (stepBadge ? 36 : 0)), juce::Justification::centredLeft, true);
            }

            if (role.kind == CellRole::Kind::Step && std::abs(mGrid.props(col, row).speed - 1.0) > 1e-9) {
                g.setColour(DimTextColour.brighter(0.4f));
                g.setFont(mSmallFont);
                g.drawText("x" + juce::String(mGrid.props(col, row).speed, 2).trimCharactersAtEnd("0").trimCharactersAtEnd("."),
                           r.reduced(4, 0), juce::Justification::centredRight, false);
            }

            if (role.kind == CellRole::Kind::Starter) {
                const auto props = mGrid.props(col, row);
                g.setColour(DimTextColour.brighter(0.4f));
                g.setFont(mSmallFont);
                juce::String badge = juce::String(props.resolution);
                if (props.cycles > 0) {
                    badge << " " << props.cycles << "c";
                }
                if (std::abs(props.speed - 1.0) > 1e-9) {
                    badge << " x" << juce::String(props.speed, 2).trimCharactersAtEnd("0").trimCharactersAtEnd(".");
                }
                g.drawText(badge, r.reduced(4, 0), juce::Justification::centredRight, false);
            }

            if (selected.contains(col, row) && selectedRange) {
                g.setColour(SelectionColour.withAlpha(0.16f));
                g.fillRect(r);
            }

            if (mErrors.count({col, row}) > 0) {
                g.setColour(ErrorColour);
                g.drawRect(r.reduced(1), 2);
            }
        }
    }

    // Row-number gutter.
    g.setColour(GutterColour);
    g.fillRect(juce::Rectangle<int>(0, HeaderHeight, GutterWidth, getHeight() - HeaderHeight));
    g.setFont(mSmallFont);
    for (int row = firstRow; row <= lastRow; ++row) {
        const auto r = juce::Rectangle<int>(0, HeaderHeight + row * CellHeight, GutterWidth, CellHeight);
        g.setColour(row >= selected.row0 && row <= selected.row1 ? SelectionColour : DimTextColour);
        g.drawText(juce::String(row + 1), r.withTrimmedRight(6), juce::Justification::centredRight, false);
    }

    // Selection outline.
    g.setColour(SelectionColour);
    if (selectedRange) {
        g.drawRect(cellBounds(selected.col0, selected.row0).getUnion(cellBounds(selected.col1, selected.row1)), 1);
        g.setColour(SelectionColour.withAlpha(0.8f));
    }
    g.drawRect(cellBounds(mSelCol, mSelRow), 2);

    // Sticky header, drawn last at the top of the visible area.
    const int top = mVisible.getY();
    g.setColour(HeaderColour);
    g.fillRect(juce::Rectangle<int>(0, top, getWidth(), HeaderHeight));
    g.setColour(GridLineColour);
    g.drawLine(0.0f, float(top + HeaderHeight), float(getWidth()), float(top + HeaderHeight));

    for (int col = firstCol; col <= lastCol; ++col) {
        const auto r = headerBounds(col);
        g.setColour(GridLineColour);
        g.drawRect(r, 1);

        const auto dest = mGrid.header(col);
        const bool isSelected = col >= selected.col0 && col <= selected.col1;
        g.setColour(isSelected ? SelectionColour : TextColour);
        g.setFont(mBoldFont);
        g.drawText(Grid::columnName(col), r.withWidth(22).translated(4, 0), juce::Justification::centredLeft, false);
        g.setColour(dest.isEmpty() ? ErrorColour.withAlpha(0.7f) : DimTextColour.brighter(0.5f));
        g.setFont(mFont);
        const double cycleTime = mHost.cycleTime(col);
        const bool running = cycleTime >= 0.0;
        g.drawText(dest.isEmpty() ? "(none)" : dest, r.withTrimmedLeft(26).withTrimmedRight(running ? 62 : 0).reduced(4, 0), juce::Justification::centredLeft, true);

        if (running) {
            // "#3 .42": which loop of the cycle, and how far into it, plus a progress bar.
            const int loop = (int)std::floor(cycleTime);
            const double phase = cycleTime - std::floor(cycleTime);
            g.setColour(PlayheadColour.brighter(0.6f));
            g.setFont(mSmallFont);
            g.drawText("#" + juce::String(loop) + " " + juce::String(phase, 2).substring(1), r.reduced(4, 0), juce::Justification::centredRight, false);
            g.setColour(PlayheadColour);
            g.fillRect(juce::Rectangle<int>(r.getX() + 1, r.getBottom() - 3, (int)((r.getWidth() - 2) * phase), 2));
        }
    }
    g.setColour(HeaderColour);
    g.fillRect(juce::Rectangle<int>(0, top, GutterWidth, HeaderHeight));
}

void GridComponent::resized() {
    layoutEditor();
}

void GridComponent::layoutEditor() {
    if (mEditKind == EditKind::Cell) {
        mEditor->setBounds(cellBounds(mSelCol, mSelRow));
    } else if (mEditKind == EditKind::Header) {
        mEditor->setBounds(headerBounds(mSelCol));
    }
}

void GridComponent::beginEditAt(EditKind kind, const juce::String& text) {
    if (isEditing()) {
        commitEdit(false);
    }
    mEditKind = kind;
    mEditor->setText(text, false);
    layoutEditor();
    mEditor->setVisible(true);
    mEditor->grabKeyboardFocus();
    mEditor->moveCaretToEnd();
}

void GridComponent::beginEdit(const juce::String& initialText) {
    beginEditAt(EditKind::Cell, initialText);
}

void GridComponent::beginHeaderEdit() {
    beginEditAt(EditKind::Header, mGrid.header(mSelCol));
}

void GridComponent::commitEdit(bool moveDown) {
    if (!isEditing()) {
        return;
    }
    const auto kind = mEditKind;
    const auto text = mEditor->getText();
    mEditKind = EditKind::None;
    mEditor->setVisible(false);

    mGrid.undoManager().beginNewTransaction();
    if (kind == EditKind::Cell) {
        mGrid.setCell(mSelCol, mSelRow, text.trim().isEmpty() ? juce::String() : text);
    } else {
        mGrid.setHeader(mSelCol, text.trim());
    }

    grabKeyboardFocus();
    if (moveDown && kind == EditKind::Cell) {
        moveSelection(0, 1);
    }
}

void GridComponent::cancelEdit() {
    if (!isEditing()) {
        return;
    }
    mEditKind = EditKind::None;
    mEditor->setVisible(false);
    grabKeyboardFocus();
}

bool GridComponent::keyPressed(const juce::KeyPress& key) {
    const auto mods = key.getModifiers();
    const int code = key.getKeyCode();
    const bool ctrl = mods.isCtrlDown() || mods.isCommandDown();

    if (ctrl) {
        if (code == juce::KeyPress::returnKey) {
            mHost.startCycle(mSelCol, mSelRow);
            return true;
        }
        if (code == '.' || code == '>') {
            if (mods.isShiftDown()) {
                mHost.stopAll();
            } else {
                mHost.stopCycle(mSelCol, mSelRow);
            }
            return true;
        }
        if (code == 'Z' || code == 'z') {
            if (mods.isShiftDown()) {
                mGrid.redo();
            } else {
                mGrid.undo();
            }
            return true;
        }
        if (code == 'Y' || code == 'y') {
            mGrid.redo();
            return true;
        }
        if (code == 'C' || code == 'c') {
            copySelection();
            return true;
        }
        if (code == 'X' || code == 'x') {
            cutSelection();
            return true;
        }
        if (code == 'V' || code == 'v') {
            pasteClipboard();
            return true;
        }
        if (code == 'D' || code == 'd') {
            if (onShowTree) {
                onShowTree();
            }
            return true;
        }
        if (code == 'L' || code == 'l') {
            if (onShowLog) {
                onShowLog();
            }
            return true;
        }
        if (code == 'A' || code == 'a') {
            selectAll();
            return true;
        }
        return false;
    }

    // Navigation moves the selection; with Shift it extends the rectangle from the anchor.
    auto go = [&](int col, int row) {
        if (mods.isShiftDown()) {
            extendSelection(col, row);
        } else {
            select(col, row);
        }
    };
    const int curCol = mods.isShiftDown() ? mEndCol : mSelCol;
    const int curRow = mods.isShiftDown() ? mEndRow : mSelRow;
    if (code == juce::KeyPress::leftKey) { go(curCol - 1, curRow); return true; }
    if (code == juce::KeyPress::rightKey) { go(curCol + 1, curRow); return true; }
    if (code == juce::KeyPress::upKey) { go(curCol, curRow - 1); return true; }
    if (code == juce::KeyPress::downKey) { go(curCol, curRow + 1); return true; }
    if (code == juce::KeyPress::pageUpKey) { go(curCol, curRow - 16); return true; }
    if (code == juce::KeyPress::pageDownKey) { go(curCol, curRow + 16); return true; }
    if (code == juce::KeyPress::homeKey) { go(curCol, 0); return true; }
    if (code == juce::KeyPress::endKey) { go(curCol, mGrid.numRows() - 1); return true; }
    if (code == juce::KeyPress::tabKey) { select(mSelCol + (mods.isShiftDown() ? -1 : 1), mSelRow); return true; }

    if (code == juce::KeyPress::returnKey || code == juce::KeyPress::F2Key) {
        beginEdit(mGrid.cell(mSelCol, mSelRow));
        return true;
    }
    if (code == juce::KeyPress::deleteKey || code == juce::KeyPress::backspaceKey) {
        clearSelection();
        return true;
    }
    if (code == juce::KeyPress::escapeKey) {
        return false;
    }

    // Typing a printable character starts a fresh edit of the cell.
    const auto c = key.getTextCharacter();
    if (c >= 32 && c != 127 && !mods.isAltDown()) {
        beginEdit(juce::String::charToString(c));
        return true;
    }
    return false;
}

void GridComponent::mouseDown(const juce::MouseEvent& e) {
    if (isEditing()) {
        commitEdit(false);
    }
    mDragSelecting = false;
    int col = 0, row = 0;
    bool isHeader = false;
    if (cellAt(e.getPosition(), col, row, isHeader)) {
        if (isHeader) {
            select(mSelCol, mSelRow);
            mSelCol = mEndCol = col;
            repaint();
        } else if (e.mods.isShiftDown()) {
            extendSelection(col, row);
        } else {
            select(col, row);
            mDragSelecting = true;
        }
    }
    grabKeyboardFocus();
}

void GridComponent::mouseDrag(const juce::MouseEvent& e) {
    if (!mDragSelecting) {
        return;
    }
    const auto p = e.getPosition();
    extendSelection((p.x - GutterWidth) / CellWidth, (p.y - HeaderHeight) / CellHeight);
}

void GridComponent::mouseUp(const juce::MouseEvent&) {
    mDragSelecting = false;
}

void GridComponent::mouseDoubleClick(const juce::MouseEvent& e) {
    int col = 0, row = 0;
    bool isHeader = false;
    if (!cellAt(e.getPosition(), col, row, isHeader)) {
        return;
    }
    if (isHeader) {
        mSelCol = mEndCol = col;
        mEndRow = mSelRow;
        beginHeaderEdit();
    } else {
        select(col, row);
        beginEdit(mGrid.cell(col, row));
    }
}

} // namespace Descartes
