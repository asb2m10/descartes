#include "core/StrudelEngine.h"

#include "core/Grid.h"
#include "core/MemoryLogger.h"

namespace Descartes {

namespace {

juce::DynamicObject::Ptr makeConsole() {
    auto console = juce::DynamicObject::Ptr(new juce::DynamicObject());
    auto logFn = [](MemoryLogger::Level level) {
        return [level](const juce::var::NativeFunctionArgs& args) -> juce::var {
            juce::StringArray parts;
            for (int i = 0; i < args.numArguments; ++i) {
                parts.add(args.arguments[i].toString());
            }
            MemoryLogger::instance().log(level, "js", parts.joinIntoString(" "));
            return {};
        };
    };
    console->setMethod("log", logFn(MemoryLogger::Level::Info));
    console->setMethod("info", logFn(MemoryLogger::Level::Info));
    console->setMethod("warn", logFn(MemoryLogger::Level::Warning));
    console->setMethod("error", logFn(MemoryLogger::Level::Error));
    return console;
}

juce::DynamicObject::Ptr makePerformance() {
    auto perf = juce::DynamicObject::Ptr(new juce::DynamicObject());
    perf->setMethod("now", [](const juce::var::NativeFunctionArgs&) -> juce::var {
        return juce::Time::getMillisecondCounterHiRes();
    });
    return perf;
}

} // namespace

StrudelEngine::StrudelEngine() {
    mEngine.maximumExecutionTime = juce::RelativeTime::milliseconds(2000);
    mEngine.registerNativeObject("console", makeConsole().get());
    mEngine.registerNativeObject("performance", makePerformance().get());
}

juce::String StrudelEngine::loadBundle(const juce::String& bundleSource) {
    auto result = mEngine.execute(bundleSource);
    if (!result.wasOk()) {
        MemoryLogger::error("engine", "loading the Strudel bundle failed: " + result.getErrorMessage());
        return result.getErrorMessage();
    }
    return {};
}

juce::var StrudelEngine::evaluate(const juce::String& expression, juce::String* error) {
    juce::Result result = juce::Result::ok();
    auto value = mEngine.evaluate(expression, &result);
    if (error != nullptr) {
        *error = result.wasOk() ? juce::String() : result.getErrorMessage();
    }
    return value;
}

juce::var StrudelEngine::call(const char* function, const juce::Array<juce::var>& args, juce::String& error) {
    juce::Result result = juce::Result::ok();
    juce::var thisObject;
    auto value = mEngine.callFunction(function, juce::var::NativeFunctionArgs(thisObject, args.getRawDataPointer(), args.size()), &result);
    error = result.wasOk() ? juce::String() : result.getErrorMessage();
    return value;
}

juce::String StrudelEngine::compile(const juce::String& cellId, const juce::String& code) {
    juce::String error;
    auto value = call("descartes_compile", {cellId, code}, error);
    return error.isNotEmpty() ? error : value.toString();
}

juce::String StrudelEngine::buildColumn(int column,
                                        const juce::String& starterId,
                                        const std::vector<StepCell>& steps,
                                        int resolution) {
    juce::Array<juce::var> stepList;
    for (auto& step : steps) {
        stepList.add(juce::var(juce::Array<juce::var>{step.step, step.cellId, step.speed}));
    }

    juce::String error;
    auto value = call("descartes_buildColumn",
                      {juce::String(column), starterId, juce::JSON::toString(juce::var(stepList), true), resolution},
                      error);
    return error.isNotEmpty() ? error : value.toString();
}

std::vector<Event> StrudelEngine::query(int column, double beginCycle, double endCycle) {
    std::vector<Event> events;

    auto value = call("descartes_query", {juce::String(column), beginCycle, endCycle}, mLastError);
    if (mLastError.isNotEmpty()) {
        MemoryLogger::error("engine", "query of column " + Grid::columnName(column) + " failed: " + mLastError);
    }
    auto* flat = value.getArray();
    if (flat == nullptr) {
        return events;
    }

    constexpr int Stride = 4; // begin, end, midi, velocity
    for (int i = 0; i + Stride <= flat->size(); i += Stride) {
        Event e;
        e.begin = (*flat)[i];
        e.end = (*flat)[i + 1];
        e.column = column;
        auto* obj = new juce::DynamicObject();
        obj->setProperty("note", (*flat)[i + 2]);
        obj->setProperty("velocity", (*flat)[i + 3]);
        e.value = juce::var(obj);
        events.push_back(std::move(e));
    }
    return events;
}

} // namespace Descartes
