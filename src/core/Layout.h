#pragma once

#include "core/Grid.h"

#include <optional>
#include <vector>

namespace Descartes {

/** A cell that begins a cycle. It owns rows row+1 ... lastRow of its column. */
struct Starter {
    int col = 0;
    int row = 0;
    int resolution = 16;
    bool once = false;
    double speed = 1.0;
    int lastRow = 0; ///< last row owned (clamped to the grid), == row when it owns nothing

    int numSteps() const { return lastRow - row; }

    /** Stable key identifying this starter's pattern in the Strudel engine. */
    int patternKey() const { return col * 100000 + row; }

    /** Row the playhead sits on for a local cycle phase in [0, 1). Phase 0 is the first row
        below the starter, so a 16-row starter at b3 visits b4 ... b19. */
    int rowAtPhase(double phase) const;

    /** Local cycle phase at which the playhead reaches `row` (inverse of rowAtPhase). */
    double phaseOfRow(int rowIndex) const { return double(rowIndex - row - 1) / double(resolution); }

    bool operator==(const Starter&) const = default;
};

/** What a cell is, relative to the starters in its column. */
struct CellRole {
    enum class Kind {
        None,    ///< not part of any cycle, and empty
        Starter, ///< begins a cycle
        Step,    ///< non-empty cell inside a starter's range
        Range,   ///< empty cell inside a starter's range
    };

    Kind kind = Kind::None;
    int starterIndex = -1; ///< index into Layout::starters(), -1 for None
    int step = -1;         ///< 0-based step within the range, -1 unless Step/Range
};

/** Immutable snapshot of starter / step structure derived from a Grid.

    A non-empty cell is a starter unless it falls inside the range of a starter above it in the
    same column. The Layout is a pure function of the Grid contents, so it can be copied to the
    scheduler thread without touching the Grid. */
class Layout {
public:
    Layout() = default;
    explicit Layout(const Grid& grid);

    int numCols() const { return mNumCols; }
    const std::vector<Starter>& starters() const { return mStarters; }
    const Starter& starter(int index) const { return mStarters[(size_t)index]; }

    /** Indices into starters() for one column, ordered top to bottom. */
    const std::vector<int>& startersInColumn(int col) const;

    CellRole roleAt(int col, int row) const;

    /** The starter that a Ctrl+Enter on this cell would start (the cell itself, or the starter whose
        range contains it). */
    std::optional<int> starterFor(int col, int row) const;

    /** Step cells (non-empty cells inside the range) of a starter as (step, row). */
    const std::vector<std::pair<int, int>>& stepsOf(int starterIndex) const { return mSteps[(size_t)starterIndex]; }

    /** Cell content strings are not kept; step rows are enough to rebuild the column pattern. */

private:
    int mNumCols = 0;
    std::vector<Starter> mStarters;
    std::vector<std::vector<std::pair<int, int>>> mSteps;
    std::vector<std::vector<int>> mByColumn;
};

} // namespace Descartes
