#pragma once

#include "core/Event.h"
#include "core/PatternProvider.h"

#include <juce_javascript/juce_javascript.h>

#include <vector>

namespace Descartes {

/** Wraps juce::JavascriptEngine (QuickJS) running the Strudel bundle.

    Not thread-safe: all calls must come from one thread (the scheduler thread). */
class StrudelEngine : public PatternProvider {
public:
    StrudelEngine();

    /** Evaluates the Strudel bundle. Returns an error message, or an empty string on success. */
    juce::String loadBundle(const juce::String& bundleSource);

    /** Compiles a cell expression under `cellId`. Returns an error message or empty string. */
    juce::String compile(const juce::String& cellId, const juce::String& code);

    /** A step cell of a column: its slot index, compiled cell id, and speed. */
    struct StepCell {
        int step;
        juce::String cellId;
        double speed = 1.0; ///< the cell's pattern is sped up by this factor inside its slot (`.fast`)
    };

    /** Builds the column pattern: starter + step cells squeezed into 1/resolution slots. */
    juce::String buildColumn(int column,
                             const juce::String& starterId,
                             const std::vector<StepCell>& steps,
                             int resolution);

    /** Queries the column pattern over [beginCycle, endCycle) and returns events with an onset
        in that range. Event values are MIDI-style objects: { note, velocity }. */
    std::vector<Event> query(int column, double beginCycle, double endCycle) override;

    /** Evaluates an arbitrary JS expression (debugging/tests). */
    juce::var evaluate(const juce::String& expression, juce::String* error = nullptr);

    /** Errors raised from the last failed query (empty if none). */
    const juce::String& lastError() const { return mLastError; }

private:
    juce::var call(const char* function, const juce::Array<juce::var>& args, juce::String& error);

    juce::JavascriptEngine mEngine;
    juce::String mLastError;
};

} // namespace Descartes
