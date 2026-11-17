#include "core/StrudelBundle.h"
#include "core/StrudelEngine.h"

#include <juce_core/juce_core.h>

using namespace Descartes;

struct StrudelEngineTests : public juce::UnitTest {
    StrudelEngineTests() : juce::UnitTest("StrudelEngine", "descartes") {}

    void runTest() override {
        StrudelEngine engine;

        beginTest("bundle loads");
        auto loadError = engine.loadBundle(strudelBundleSource());
        expect(loadError.isEmpty(), "load error: " + loadError);
        if (loadError.isNotEmpty()) {
            return;
        }

        beginTest("bare mini-notation falls back to notes");
        expectEquals(engine.compile("a", "c3 c4"), juce::String());
        expectEquals(engine.buildColumn(0, "a", {}, 16), juce::String());
        auto events = engine.query(0, 0.0, 1.0);
        expectEquals((int)events.size(), 2);
        if (events.size() == 2) {
            expectWithinAbsoluteError(events[0].begin, 0.0, 1e-9);
            expectWithinAbsoluteError(events[1].begin, 0.5, 1e-9);
            expectEquals((int)events[0].value["note"], 48);
            expectEquals((int)events[1].value["note"], 60);
        }

        beginTest("transpiled strudel code with double-quoted mini strings");
        expectEquals(engine.compile("b", "note(\"c3 [e3 g3]\")"), juce::String());
        expectEquals(engine.buildColumn(1, "b", {}, 16), juce::String());
        events = engine.query(1, 0.0, 1.0);
        expectEquals((int)events.size(), 3);

        beginTest("step cell speed applies inside its slot");
        expectEquals(engine.compile("f0", "c3"), juce::String());
        expectEquals(engine.compile("f1", "e3"), juce::String());
        expectEquals(engine.buildColumn(3, "f0", {{4, "f1", 2.0}}, 16), juce::String());
        {
            int inSlot = 0;
            for (auto& e : engine.query(3, 0.0, 1.0)) {
                if ((int)e.value["note"] == 52) {
                    ++inSlot;
                    expect(e.begin >= 4.0 / 16.0 - 1e-9 && e.end <= 5.0 / 16.0 + 1e-9);
                }
            }
            expectEquals(inSlot, 2); // two repeats of e3 squeezed into the slot
        }

        beginTest("step cells are squeezed into their slot");
        expectEquals(engine.compile("s0", "c3"), juce::String());
        expectEquals(engine.compile("s1", "e3"), juce::String());
        expectEquals(engine.buildColumn(2, "s0", {{3, "s1"}}, 16), juce::String());
        events = engine.query(2, 0.0, 1.0);
        bool found = false;
        for (auto& e : events) {
            if ((int)e.value["note"] == 52) {
                found = true;
                expectWithinAbsoluteError(e.begin, 3.0 / 16.0, 1e-9);
                expectWithinAbsoluteError(e.end, 4.0 / 16.0, 1e-9);
            }
        }
        expect(found, "step note at 3/16 not found");

        beginTest("time arithmetic works without native BigInt");
        expectEquals(engine.evaluate("Fraction(-0.5).floor().toString()").toString(), juce::String("-1"));

        beginTest("queries with awkward double bounds stay fast and tile without gaps");
        expectEquals(engine.compile("t", "c3*3 e3"), juce::String());
        expectEquals(engine.buildColumn(5, "t", {}, 12), juce::String());
        double worst = 0.0;
        int total = 0;
        double edge = 0.0;
        for (int i = 0; i < 200; ++i) {
            const double next = edge + 0.0173 + 0.0000001 * i; // non-dyadic step sizes
            const double start = juce::Time::getMillisecondCounterHiRes();
            total += (int)engine.query(5, edge, next).size();
            worst = juce::jmax(worst, juce::Time::getMillisecondCounterHiRes() - start);
            edge = next;
        }
        // Events per cycle: c3*3 and e3 -> 4, so ~3.5 cycles gives ~14 (windows tile, nothing lost or doubled)
        const int expectedEvents = (int)std::floor(edge * 4.0 + 1e-9) + 1;
        expect(std::abs(total - expectedEvents) <= 1, "events " + juce::String(total) + " vs " + juce::String(expectedEvents));
        expect(worst < 40.0, "slowest query " + juce::String(worst) + " ms");

        beginTest("compile errors are reported");
        expect(engine.compile("bad", "note(").isNotEmpty());
        expect(engine.compile("bad2", "undefinedFunction()").isNotEmpty());
    }
};

static StrudelEngineTests sStrudelEngineTests;
