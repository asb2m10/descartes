#include "core/PatternBuilder.h"
#include "core/StrudelBundle.h"

#include <juce_core/juce_core.h>

using namespace Descartes;

// Not a pass/fail test: prints how long queries take, to find slow patterns.
struct ProfileTests : public juce::UnitTest {
    ProfileTests() : juce::UnitTest("Profile", "descartes-profile") {}

    void runTest() override {
        beginTest("query timings");
        StrudelEngine engine;
        const double t0 = juce::Time::getMillisecondCounterHiRes();
        engine.loadBundle(strudelBundleSource());
        logMessage("bundle load: " + juce::String(juce::Time::getMillisecondCounterHiRes() - t0, 1) + " ms");

        for (auto code : {"c3 c4", "c3 [e3 g3] <c4 b3>", "e3*2", "s(\"hh*4\")", "note(\"c3 e3\").s(\"sawtooth\")", "c3*16"}) {
            const double a = juce::Time::getMillisecondCounterHiRes();
            auto err = engine.compile("x", code);
            const double b = juce::Time::getMillisecondCounterHiRes();
            engine.buildColumn(7, "x", {}, 16);
            const double c = juce::Time::getMillisecondCounterHiRes();
            int count = 0;
            double worst = 0.0;
            for (int i = 0; i < 20; ++i) {
                const double q0 = juce::Time::getMillisecondCounterHiRes();
                count += (int)engine.query(7, i * 0.05, (i + 1) * 0.05).size();
                worst = std::max(worst, juce::Time::getMillisecondCounterHiRes() - q0);
            }
            logMessage(juce::String(code) + "  compile " + juce::String(b - a, 1) + " ms, build " + juce::String(c - b, 1) + " ms, 20 small queries worst "
                       + juce::String(worst, 1) + " ms (" + juce::String(count) + " events) " + err);
        }

        {
            engine.compile("y", "c3 c4");
            engine.buildColumn(9, "y", {}, 16);
            juce::String times;
            for (int i = 0; i < 60; ++i) {
                const double q0 = juce::Time::getMillisecondCounterHiRes();
                engine.query(9, i * 0.05, (i + 1) * 0.05);
                times << juce::String(juce::Time::getMillisecondCounterHiRes() - q0, 1) << " ";
            }
            logMessage("per-query ms: " + times);
        }

        // One big window, like after a transport jump with a stale window.
        engine.compile("x", "c3 [e3 g3] <c4 b3>");
        engine.buildColumn(7, "x", {}, 16);
        for (double span : {0.3, 3.0, 30.0, 300.0}) {
            const double q0 = juce::Time::getMillisecondCounterHiRes();
            auto n = engine.query(7, 0.0, span).size();
            logMessage("window of " + juce::String(span) + " cycles: " + juce::String(juce::Time::getMillisecondCounterHiRes() - q0, 1) + " ms, " + juce::String((int)n) + " events");
        }
    }
};
static ProfileTests sProfileTests;
