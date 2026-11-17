#pragma once

#include "core/PatternBuilder.h"

namespace Descartes {

/** What the grid UI needs from the rest of the application. Keeps the GUI independent of the
    processor so it can be tested with a fake. */
class GridHost {
public:
    virtual ~GridHost() = default;

    virtual void startCycle(int col, int row) = 0;
    virtual void stopCycle(int col, int row) = 0;
    virtual void stopAll() = 0;

    /** Row the playhead is on in a column, or -1. */
    virtual int playheadRow(int col) const = 0;

    /** Time (cycles) since the running cycle in a column began, or a negative value when none runs. */
    virtual double cycleTime(int col) const = 0;

    virtual CellErrors cellErrors() const = 0;
    /** Changes whenever cellErrors() may have changed. */
    virtual unsigned int buildCount() const = 0;
};

} // namespace Descartes
