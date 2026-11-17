#include "core/PatternBuilder.h"

namespace Descartes {

CellErrors rebuildPatterns(const Grid& grid, const Layout& layout, StrudelEngine& engine) {
    CellErrors errors;

    auto compileCell = [&](int col, int row) {
        auto error = engine.compile(Grid::cellName(col, row), grid.cell(col, row));
        if (error.isNotEmpty()) {
            errors[{col, row}] = error;
        }
        return error.isEmpty();
    };

    for (int i = 0; i < (int)layout.starters().size(); ++i) {
        const auto& s = layout.starter(i);
        if (!compileCell(s.col, s.row)) {
            continue;
        }

        std::vector<StrudelEngine::StepCell> steps;
        for (auto [step, row] : layout.stepsOf(i)) {
            if (compileCell(s.col, row)) {
                steps.push_back({step, Grid::cellName(s.col, row), grid.props(s.col, row).speed});
            }
        }

        auto error = engine.buildColumn(s.patternKey(), Grid::cellName(s.col, s.row), steps, s.resolution);
        if (error.isNotEmpty()) {
            errors[{s.col, s.row}] = error;
        }
    }
    return errors;
}

} // namespace Descartes
