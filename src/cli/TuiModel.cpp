#include "cli/TuiModel.h"

#include "core/MemoryLogger.h"

#include <algorithm>

namespace Descartes {

namespace {
const int kResolutions[] = {1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128};
const int kCycles[] = {0, 1, 2, 3, 4, 6, 8, 12, 16, 32};
const double kSpeeds[] = {1.0 / 8, 1.0 / 4, 1.0 / 3, 1.0 / 2, 2.0 / 3, 1.0, 3.0 / 2, 2.0, 3.0, 4.0, 8.0};

template <typename T, size_t N, typename V>
T stepPreset(const T (&values)[N], V current, int direction) {
    // Nearest preset, then move; values outside the presets snap to the neighbour in that direction.
    size_t best = 0;
    for (size_t i = 1; i < N; ++i) {
        if (std::abs(double(values[i]) - double(current)) < std::abs(double(values[best]) - double(current))) {
            best = i;
        }
    }
    const int idx = juce::jlimit(0, (int)N - 1, (int)best + direction);
    return values[idx];
}
} // namespace

CellRect TuiModel::selection() const {
    return {std::min(mCol, mAnchorCol), std::min(mRow, mAnchorRow), std::max(mCol, mAnchorCol), std::max(mRow, mAnchorRow)};
}

void TuiModel::moveTo(int col, int row, bool extend) {
    mCol = juce::jlimit(0, grid().numCols() - 1, col);
    mRow = juce::jlimit(0, grid().numRows() - 1, row);
    if (!extend) {
        mAnchorCol = mCol;
        mAnchorRow = mRow;
    }
}

void TuiModel::selectAll() {
    mAnchorCol = 0;
    mAnchorRow = 0;
    mCol = grid().numCols() - 1;
    mRow = grid().numRows() - 1;
}

void TuiModel::beginEdit(const juce::String& initial, bool keepExisting) {
    mEditing = true;
    mEditHeader = false;
    mEditText = keepExisting ? grid().cell(mCol, mRow) + initial : initial;
}

void TuiModel::beginHeaderEdit() {
    mEditing = true;
    mEditHeader = true;
    mEditText = grid().header(mCol);
}

void TuiModel::commitEdit(bool moveDown) {
    if (!mEditing) {
        return;
    }
    grid().undoManager().beginNewTransaction();
    if (mEditHeader) {
        grid().setHeader(mCol, mEditText.trim());
    } else {
        grid().setCell(mCol, mRow, mEditText);
    }
    const bool header = mEditHeader;
    cancelEdit();
    if (moveDown && !header) {
        move(0, 1, false);
    }
}

void TuiModel::clearSelection() {
    const auto r = selection();
    grid().undoManager().beginNewTransaction();
    for (int c = r.col0; c <= r.col1; ++c) {
        for (int row = r.row0; row <= r.row1; ++row) {
            grid().setCell(c, row, {});
        }
    }
}

juce::String TuiModel::copy() const {
    return GridClipboard::toMarkdown(mEngine.grid(), selection());
}

juce::String TuiModel::cut() {
    auto text = copy();
    clearSelection();
    return text;
}

bool TuiModel::paste(const juce::String& text) {
    const auto block = GridClipboard::fromText(text);
    if (block.empty()) {
        return false;
    }
    const auto rect = selection();
    int lastCol = rect.col0, lastRow = rect.row0;
    bool clipped = false;
    grid().undoManager().beginNewTransaction();
    for (size_t r = 0; r < block.size(); ++r) {
        for (size_t c = 0; c < block[r].size(); ++c) {
            const int col = rect.col0 + (int)c, row = rect.row0 + (int)r;
            if (!grid().inBounds(col, row)) {
                clipped = true;
                continue;
            }
            grid().setCell(col, row, block[r][c]);
            lastCol = std::max(lastCol, col);
            lastRow = std::max(lastRow, row);
        }
    }
    if (clipped) {
        MemoryLogger::warn("clipboard", "the part of the pasted block outside the grid was dropped");
    }
    mCol = lastCol;
    mRow = lastRow;
    mAnchorCol = rect.col0;
    mAnchorRow = rect.row0;
    return true;
}

const Layout& TuiModel::layout() {
    refreshLayout();
    return mLayout;
}

void TuiModel::refreshLayout() {
    mLayout = Layout(mEngine.grid());
}

std::optional<std::pair<int, int>> TuiModel::starterCell() const {
    const Layout lay(mEngine.grid());
    if (auto idx = lay.starterFor(mCol, mRow)) {
        const auto& s = lay.starter(*idx);
        return std::make_pair(s.col, s.row);
    }
    return std::nullopt;
}

void TuiModel::startAtCursor() {
    mEngine.startCycle(mCol, mRow);
}

void TuiModel::stopAtCursor() {
    mEngine.stopCycle(mCol, mRow);
}

std::optional<CellProps> TuiModel::propsAtCursor() const {
    if (auto cell = starterCell()) {
        return mEngine.grid().props(cell->first, cell->second);
    }
    return std::nullopt;
}

void TuiModel::applyProps(const CellProps& p) {
    if (auto cell = starterCell()) {
        grid().undoManager().beginNewTransaction();
        grid().setProps(cell->first, cell->second, p);
    }
}

void TuiModel::stepResolution(int direction) {
    if (auto p = propsAtCursor()) {
        p->resolution = stepPreset(kResolutions, p->resolution, direction);
        applyProps(*p);
    }
}

void TuiModel::stepSpeed(int direction) {
    // A step cell has its own speed (applied to that cell's pattern); anywhere else it is the starter's.
    const Layout lay(mEngine.grid());
    if (lay.roleAt(mCol, mRow).kind == CellRole::Kind::Step) {
        CellProps p = mEngine.grid().props(mCol, mRow);
        p.speed = CellProps::clampSpeed(stepPreset(kSpeeds, p.speed, direction));
        grid().undoManager().beginNewTransaction();
        grid().setProps(mCol, mRow, p);
        return;
    }
    if (auto p = propsAtCursor()) {
        p->speed = CellProps::clampSpeed(stepPreset(kSpeeds, p->speed, direction));
        applyProps(*p);
    }
}

void TuiModel::stepCycles() {
    if (auto p = propsAtCursor()) {
        size_t next = 0;
        for (size_t i = 0; i < std::size(kCycles); ++i) {
            if (kCycles[i] > p->cycles) {
                next = i;
                break;
            }
        }
        p->cycles = kCycles[next];
        applyProps(*p);
    }
}

bool TuiModel::undo() {
    return grid().undo();
}

bool TuiModel::redo() {
    return grid().redo();
}

} // namespace Descartes
