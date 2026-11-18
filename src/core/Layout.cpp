#include "core/Layout.h"

#include <algorithm>
#include <cmath>

namespace Descartes {

int Starter::rowAtPhase(double phase) const {
    const int steps = juce::jmax(1, resolution);
    const int k = juce::jlimit(0, steps - 1, (int)std::floor(phase * steps));
    return juce::jmin(row + 1 + k, juce::jmax(row, lastRow));
}

Layout::Layout(const Grid& grid) : mNumCols(grid.numCols()), mByColumn((size_t)grid.numCols()) {
    for (int col = 0; col < grid.numCols(); ++col) {
        int row = 0;
        while (row < grid.numRows()) {
            if (grid.isEmpty(col, row)) {
                ++row;
                continue;
            }

            const auto props = grid.props(col, row);
            Starter s;
            s.col = col;
            s.row = row;
            s.resolution = props.resolution;
            s.cycles = props.cycles;
            s.speed = props.speed;
            s.lastRow = juce::jmin(row + props.resolution, grid.numRows() - 1);

            std::vector<std::pair<int, int>> steps;
            for (int r = s.row + 1; r <= s.lastRow; ++r) {
                if (!grid.isEmpty(col, r)) {
                    steps.emplace_back(r - s.row - 1, r);
                }
            }

            mByColumn[(size_t)col].push_back((int)mStarters.size());
            mStarters.push_back(s);
            mSteps.push_back(std::move(steps));
            row = s.lastRow + 1;
        }
    }
}

const std::vector<int>& Layout::startersInColumn(int col) const {
    static const std::vector<int> empty;
    return col >= 0 && col < (int)mByColumn.size() ? mByColumn[(size_t)col] : empty;
}

CellRole Layout::roleAt(int col, int row) const {
    for (int index : startersInColumn(col)) {
        const auto& s = mStarters[(size_t)index];
        if (row == s.row) {
            return {CellRole::Kind::Starter, index, -1};
        }
        if (row > s.row && row <= s.lastRow) {
            const int step = row - s.row - 1;
            const bool hasContent = std::any_of(mSteps[(size_t)index].begin(), mSteps[(size_t)index].end(),
                                                [row](const auto& st) { return st.second == row; });
            return {hasContent ? CellRole::Kind::Step : CellRole::Kind::Range, index, step};
        }
    }
    return {};
}

std::optional<int> Layout::starterFor(int col, int row) const {
    auto role = roleAt(col, row);
    if (role.kind == CellRole::Kind::None) {
        return std::nullopt;
    }
    return role.starterIndex;
}

} // namespace Descartes
