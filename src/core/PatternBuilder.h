#pragma once

#include "core/Grid.h"
#include "core/Layout.h"
#include "core/StrudelEngine.h"

#include <map>

namespace Descartes {

/** Errors from compiling cells, keyed by (col, row). Empty when everything compiled. */
using CellErrors = std::map<std::pair<int, int>, juce::String>;

/** Compiles every starter and step cell and builds each starter's cycle pattern in the engine,
    keyed by Starter::patternKey(). Runs on the engine's thread. */
CellErrors rebuildPatterns(const Grid& grid, const Layout& layout, StrudelEngine& engine);

} // namespace Descartes
