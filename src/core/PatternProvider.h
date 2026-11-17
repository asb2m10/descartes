#pragma once

#include "core/Event.h"

#include <vector>

namespace Descartes {

/** Source of events for a starter's cycle pattern, in the starter's local cycle time. */
class PatternProvider {
public:
    virtual ~PatternProvider() = default;

    /** Events whose onset lies in [beginCycle, endCycle), in local cycle time (0 = starter start). */
    virtual std::vector<Event> query(int patternKey, double beginCycle, double endCycle) = 0;
};

} // namespace Descartes
