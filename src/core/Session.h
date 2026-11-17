#pragma once

#include "core/Layout.h"
#include "core/PatternProvider.h"

#include <optional>
#include <vector>

namespace Descartes {

/** Running cycles and event generation, in global cycle time (1.0 = one cycle).

    GUI-free and independent of the JS engine: patterns come from a PatternProvider. Not
    thread-safe; owned by the scheduler thread, which receives layout changes and start/stop
    requests through its command queue.

    generate() must be called with contiguous, increasing windows. A cycle started with start()
    never begins before the end of the last generated window, so already generated events are
    never contradicted. */
class Session {
public:
    struct Running {
        int col = 0;
        int row = 0; ///< row of the starter cell
        double origin = 0.0; ///< global cycle at which the starter's cycle began
        double speed = 1.0;  ///< speed of the starter when this cycle began (one cycle lasts 1/speed)
    };

    /** Installs a new layout. Running cycles whose starter no longer exists are dropped. */
    void setLayout(const Layout& layout);
    const Layout& layout() const { return mLayout; }

    /** Starts (or restarts) the cycle that owns cell (col, row) at `atCycle`, or at the end of the
        already generated window if that is later. Returns false when the cell belongs to no cycle. */
    bool start(int col, int row, double atCycle);
    void stop(int col, int row);
    void stopAll();
    bool isRunning(int col, int row) const;

    /** Appends events for [begin, end) in global time, tagged with their column, sorted by begin.
        Also starts cycles chained to the right (see docs/PLAN.md, "Horizontal chaining"). */
    void generate(double begin, double end, PatternProvider& provider, std::vector<Event>& out);

    double generatedUpTo() const { return mGeneratedUpTo; }

    /** Row the playhead of a running cycle in `col` sits on at global cycle `now`. */
    std::optional<int> playheadRow(int col, double now) const;

    /** Time (in cycles) since the running cycle in `col` began, or nullopt if none is active at `now`. */
    std::optional<double> localCycleTime(int col, double now) const;

    const std::vector<Running>& running() const { return mRunning; }

    void reset();

    /** Stops every cycle and moves the generated window to `cycle` (after a transport jump). */
    void rewind(double cycle);

    /** Smallest multiple of `quantum` that is >= cycle. */
    static double quantize(double cycle, double quantum);

private:
    std::optional<int> starterIndexAt(int col, int row) const;
    int findRunning(int col, int row) const;

    /** True if a cycle at this starter is running at global time t (finished one-shots are not). */
    bool activeAt(int col, int row, double t) const;

    Layout mLayout;
    std::vector<Running> mRunning;
    double mGeneratedUpTo = 0.0;
};

} // namespace Descartes
