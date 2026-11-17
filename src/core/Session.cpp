#include "core/Session.h"

#include <algorithm>
#include <cmath>
#include <limits>

namespace Descartes {

void Session::setLayout(const Layout& layout) {
    mLayout = layout;
    std::erase_if(mRunning, [this](const Running& r) { return !starterIndexAt(r.col, r.row).has_value(); });
}

std::optional<int> Session::starterIndexAt(int col, int row) const {
    auto role = mLayout.roleAt(col, row);
    if (role.kind == CellRole::Kind::Starter) {
        return role.starterIndex;
    }
    return std::nullopt;
}

bool Session::activeAt(int col, int row, double t) const {
    auto index = starterIndexAt(col, row);
    if (!index) {
        return false;
    }
    const bool once = mLayout.starter(*index).once;
    return std::any_of(mRunning.begin(), mRunning.end(), [&](const Running& r) {
        return r.col == col && r.row == row && !(once && t >= r.origin + 1.0 / r.speed);
    });
}

int Session::findRunning(int col, int row) const {
    for (size_t i = 0; i < mRunning.size(); ++i) {
        if (mRunning[i].col == col && mRunning[i].row == row) {
            return (int)i;
        }
    }
    return -1;
}

bool Session::start(int col, int row, double atCycle) {
    auto index = mLayout.starterFor(col, row);
    if (!index) {
        return false;
    }

    const auto& s = mLayout.starter(*index);
    const double origin = std::max(atCycle, mGeneratedUpTo);
    std::erase_if(mRunning, [&s](const Running& r) { return r.col == s.col && r.row == s.row; });
    mRunning.push_back({s.col, s.row, origin, s.speed});
    return true;
}

void Session::stop(int col, int row) {
    if (auto index = mLayout.starterFor(col, row)) {
        const auto& s = mLayout.starter(*index);
        std::erase_if(mRunning, [&s](const Running& r) { return r.col == s.col && r.row == s.row; });
    }
}

void Session::stopAll() {
    mRunning.clear();
}

bool Session::isRunning(int col, int row) const {
    auto index = mLayout.starterFor(col, row);
    if (!index) {
        return false;
    }
    const auto& s = mLayout.starter(*index);
    return findRunning(s.col, s.row) >= 0;
}

void Session::reset() {
    mRunning.clear();
    mGeneratedUpTo = 0.0;
}

void Session::rewind(double cycle) {
    mRunning.clear();
    mGeneratedUpTo = cycle;
}

double Session::quantize(double cycle, double quantum) {
    if (quantum <= 0.0) {
        return cycle;
    }
    return std::ceil(cycle / quantum - 1e-9) * quantum;
}

void Session::generate(double begin, double end, PatternProvider& provider, std::vector<Event>& out) {
    const size_t firstNew = out.size();
    constexpr double Never = std::numeric_limits<double>::infinity();

    // Cycles started by chaining during this pass are appended and processed in the same loop.
    for (size_t i = 0; i < mRunning.size(); ++i) {
        const Running r = mRunning[i];
        auto index = starterIndexAt(r.col, r.row);
        if (!index) {
            continue;
        }

        const Starter s = mLayout.starter(*index);
        const double speed = r.speed;
        const double period = 1.0 / speed; // global cycles per cycle of the pattern
        const double stopAt = s.once ? r.origin + period : Never;
        const double from = std::max(begin, r.origin);
        const double to = std::min(end, stopAt);
        if (from >= to) {
            continue;
        }

        for (auto e : provider.query(s.patternKey(), (from - r.origin) * speed, (to - r.origin) * speed)) {
            e.begin = r.origin + e.begin / speed;
            e.end = r.origin + e.end / speed;
            e.column = r.col;
            out.push_back(std::move(e));
        }

        // Horizontal chaining: when this playhead reaches a row whose right neighbour is a
        // starter that is not running, that starter starts at exactly that moment.
        if (r.col + 1 >= mLayout.numCols()) {
            continue;
        }
        for (int row = s.row + 1; row <= s.lastRow; ++row) {
            auto target = starterIndexAt(r.col + 1, row);
            if (!target) {
                continue;
            }

            const double phase = double(row - s.row - 1) / double(s.resolution) * period;
            for (int n = std::max(0, (int)std::floor((from - r.origin - phase) / period)); ; ++n) {
                const double t = r.origin + double(n) * period + phase;
                if (t >= to) {
                    break;
                }
                if (t >= from && !activeAt(r.col + 1, row, t)) {
                    mRunning.push_back({r.col + 1, row, t, mLayout.starter(*target).speed});
                }
            }
        }
    }

    // Drop one-shot cycles that have finished.
    std::erase_if(mRunning, [this, end](const Running& r) {
        auto index = starterIndexAt(r.col, r.row);
        return index && mLayout.starter(*index).once && r.origin + 1.0 / r.speed <= end;
    });

    std::stable_sort(out.begin() + (std::ptrdiff_t)firstNew, out.end(),
                     [](const Event& a, const Event& b) { return a.begin < b.begin; });
    mGeneratedUpTo = std::max(mGeneratedUpTo, end);
}

std::optional<int> Session::playheadRow(int col, double now) const {
    for (const auto& r : mRunning) {
        if (r.col != col || now < r.origin) {
            continue;
        }
        auto index = starterIndexAt(r.col, r.row);
        if (!index) {
            continue;
        }
        const auto& s = mLayout.starter(*index);
        const double local = (now - r.origin) * r.speed;
        if (s.once && local >= 1.0) {
            continue;
        }
        return s.rowAtPhase(local - std::floor(local));
    }
    return std::nullopt;
}

std::optional<double> Session::localCycleTime(int col, double now) const {
    for (const auto& r : mRunning) {
        if (r.col != col || now < r.origin) {
            continue;
        }
        auto index = starterIndexAt(r.col, r.row);
        if (!index) {
            continue;
        }
        const double local = (now - r.origin) * r.speed;
        if (mLayout.starter(*index).once && local >= 1.0) {
            continue;
        }
        return local;
    }
    return std::nullopt;
}

} // namespace Descartes
