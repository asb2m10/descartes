#include "core/PatternBuilder.h"
#include "core/Session.h"
#include "core/StrudelBundle.h"

#include <juce_core/juce_core.h>

#include <cmath>

using namespace Descartes;

namespace {
std::pair<int, int> at(const char* name) {
    return *Grid::parseCellName(name);
}

void put(Grid& g, const char* name, const juce::String& text) {
    g.setCell(at(name).first, at(name).second, text);
}

/** Emits one event every `step` local cycles, ignoring the pattern key. */
struct FakeProvider : PatternProvider {
    double step = 0.25;
    std::vector<Event> query(int, double b, double e) override {
        std::vector<Event> events;
        for (double t = std::ceil(b / step - 1e-9) * step; t < e - 1e-12; t += step) {
            Event ev;
            ev.begin = t;
            ev.end = t + step;
            events.push_back(ev);
        }
        return events;
    }
};

Session makeSession(const Grid& g) {
    Session s;
    s.setLayout(Layout(g));
    return s;
}
} // namespace

struct SessionTests : public juce::UnitTest {
    SessionTests() : juce::UnitTest("Session", "descartes") {}

    void runTest() override {
        FakeProvider provider;
        auto [bc, b3] = at("b3");

        beginTest("a started cycle emits events in global time, tagged with its column");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            auto s = makeSession(g);
            expect(s.start(bc, b3, 0.0));
            std::vector<Event> out;
            s.generate(0.0, 1.0, provider, out);
            expectEquals((int)out.size(), 4);
            expectWithinAbsoluteError(out[1].begin, 0.25, 1e-12);
            expectEquals(out[0].column, bc);
        }

        beginTest("a cycle does not emit before its origin");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            auto s = makeSession(g);
            s.start(bc, b3, 2.0);
            std::vector<Event> out;
            s.generate(0.0, 1.0, provider, out);
            expectEquals((int)out.size(), 0);
            s.generate(1.0, 3.0, provider, out);
            expectEquals((int)out.size(), 4);
            expectWithinAbsoluteError(out[0].begin, 2.0, 1e-12);
        }

        beginTest("cycles loop; once stops after one cycle");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 3.0, provider, out);
            expectEquals((int)out.size(), 12);
            expect(s.isRunning(bc, b3));

            g.setProps(bc, b3, CellProps{16, true});
            auto once = makeSession(g);
            once.start(bc, b3, 0.0);
            out.clear();
            once.generate(0.0, 3.0, provider, out);
            expectEquals((int)out.size(), 4);
            expect(!once.isRunning(bc, b3));
        }

        beginTest("starting a step cell starts its starter; unrelated cells do not start");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "b10", "y");
            auto s = makeSession(g);
            expect(s.start(bc, at("b10").second, 0.0));
            expect(s.isRunning(bc, b3));
            expect(!s.start(bc, at("b30").second, 0.0));
        }

        beginTest("stop and stopAll");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "c10", "y");
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            s.start(2, at("c10").second, 0.0);
            s.stop(bc, at("b7").second);
            expect(!s.isRunning(bc, b3));
            expect(s.isRunning(2, at("c10").second));
            s.stopAll();
            expect(s.running().empty());
        }

        beginTest("restart never begins before the generated window");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 2.0, provider, out);
            s.start(bc, b3, 0.5);
            expectWithinAbsoluteError(s.running()[0].origin, 2.0, 1e-12);
        }

        beginTest("chaining: c10 starts when the playhead of b reaches row 10");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "c10", "y");
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 1.0, provider, out);

            expect(s.isRunning(2, at("c10").second));
            double cOrigin = -1.0;
            for (auto& r : s.running()) {
                if (r.col == 2) {
                    cOrigin = r.origin;
                }
            }
            expectWithinAbsoluteError(cOrigin, 6.0 / 16.0, 1e-12);

            double firstC = 1e9;
            for (auto& e : out) {
                if (e.column == 2) {
                    firstC = std::min(firstC, e.begin);
                }
            }
            expectWithinAbsoluteError(firstC, 6.0 / 16.0, 1e-12);

            // the next loop of b does not restart c
            s.generate(1.0, 2.0, provider, out);
            for (auto& r : s.running()) {
                if (r.col == 2) {
                    expectWithinAbsoluteError(r.origin, 6.0 / 16.0, 1e-12);
                }
            }
        }

        beginTest("chaining is correct when a window boundary falls mid-cycle");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "c10", "y");
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 0.3, provider, out);
            expect(!s.isRunning(2, at("c10").second));
            s.generate(0.3, 0.6, provider, out);
            expect(s.isRunning(2, at("c10").second));
        }

        beginTest("chaining cascades to the next column");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "c10", "y");
            put(g, "d12", "z"); // row 12 is step 1 of c10 (b4..: c11 is step 0)
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 1.0, provider, out);
            expect(s.isRunning(3, at("d12").second));
            for (auto& r : s.running()) {
                if (r.col == 3) {
                    expectWithinAbsoluteError(r.origin, 6.0 / 16.0 + 1.0 / 16.0, 1e-12);
                }
            }
        }

        beginTest("a chained once cycle can be triggered again on the next loop");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "c10", "y");
            g.setProps(2, at("c10").second, CellProps{16, true});
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 3.0, provider, out);
            int cEvents = 0;
            for (auto& e : out) {
                cEvents += e.column == 2 ? 1 : 0;
            }
            expectEquals(cEvents, 4 + 4 + 3); // the third run is cut off by the end of the window
        }

        beginTest("speed 2 plays the cycle twice as fast; speed 0.5 half as fast");
        {
            for (double speed : {2.0, 0.5}) {
                Grid g(4, 64);
                put(g, "b3", "x");
                CellProps p;
                p.speed = speed;
                g.setProps(bc, b3, p);
                auto s = makeSession(g);
                s.start(bc, b3, 0.0);
                std::vector<Event> out;
                s.generate(0.0, 1.0, provider, out);
                // the fake provider emits an event every 0.25 pattern cycles
                expectEquals((int)out.size(), speed > 1.0 ? 8 : 2);
                expectWithinAbsoluteError(out[1].begin, 0.25 / speed, 1e-12);
                expectWithinAbsoluteError(out[1].end - out[1].begin, 0.25 / speed, 1e-12);
                expectEquals(s.playheadRow(bc, 0.25).value_or(-1), at("b4").second + (int)(0.25 * speed * 16));
                expectWithinAbsoluteError(s.localCycleTime(bc, 0.25).value_or(-1.0), 0.25 * speed, 1e-12);
            }
        }

        beginTest("speed scales once and chaining");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "c10", "y");
            CellProps p;
            p.speed = 2.0;
            g.setProps(bc, b3, p);
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 1.0, provider, out);
            double cOrigin = -1.0;
            for (auto& r : s.running()) {
                if (r.col == 2) {
                    cOrigin = r.origin;
                }
            }
            expectWithinAbsoluteError(cOrigin, 6.0 / 16.0 / 2.0, 1e-12);

            CellProps once;
            once.once = true;
            once.speed = 2.0;
            g.setProps(bc, b3, once);
            auto o = makeSession(g);
            o.start(bc, b3, 0.0);
            out.clear();
            o.generate(0.0, 3.0, provider, out);
            int bEvents = 0;
            for (auto& e : out) {
                bEvents += e.column == bc ? 1 : 0;
            }
            expectEquals(bEvents, 4); // one pattern cycle = 4 events, lasting 0.5 global cycles
            expect(!o.playheadRow(bc, 0.6).has_value());
        }

        beginTest("speed is persisted and clamped");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            CellProps p;
            p.speed = 1.5;
            g.setProps(bc, b3, p);
            Grid copy(4, 64);
            copy.fromXmlString(g.toXmlString());
            expectWithinAbsoluteError(copy.props(bc, b3).speed, 1.5, 1e-12);
            p.speed = 1000.0;
            g.setProps(bc, b3, p);
            expectWithinAbsoluteError(g.props(bc, b3).speed, CellProps::MaxSpeed, 1e-12);
        }

        beginTest("output is sorted by time");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            put(g, "c10", "y");
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            std::vector<Event> out;
            s.generate(0.0, 2.0, provider, out);
            for (size_t i = 1; i < out.size(); ++i) {
                expect(out[i - 1].begin <= out[i].begin);
            }
        }

        beginTest("layout change drops cycles whose starter disappeared");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            auto s = makeSession(g);
            s.start(bc, b3, 0.0);
            put(g, "b3", "");
            s.setLayout(Layout(g));
            expect(s.running().empty());
        }

        beginTest("playhead row");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            auto s = makeSession(g);
            s.start(bc, b3, 1.0);
            expect(!s.playheadRow(bc, 0.5).has_value());
            expectEquals(s.playheadRow(bc, 1.0).value_or(-1), at("b4").second);
            expectEquals(s.playheadRow(bc, 1.0 + 6.0 / 16.0).value_or(-1), at("b10").second);
            expectEquals(s.playheadRow(bc, 2.5).value_or(-1), at("b12").second);
            expect(!s.playheadRow(0, 1.5).has_value());
        }

        beginTest("local cycle time");
        {
            Grid g(4, 64);
            put(g, "b3", "x");
            auto s = makeSession(g);
            s.start(bc, b3, 1.0);
            expect(!s.localCycleTime(bc, 0.5).has_value());
            expectWithinAbsoluteError(s.localCycleTime(bc, 1.25).value_or(-1.0), 0.25, 1e-12);
            expectWithinAbsoluteError(s.localCycleTime(bc, 3.5).value_or(-1.0), 2.5, 1e-12);
            expect(!s.localCycleTime(0, 1.25).has_value());
        }

        beginTest("quantize");
        expectWithinAbsoluteError(Session::quantize(0.3, 0.25), 0.5, 1e-12);
        expectWithinAbsoluteError(Session::quantize(0.5, 0.25), 0.5, 1e-12);
        expectWithinAbsoluteError(Session::quantize(0.3, 0.0), 0.3, 1e-12);
    }
};

static SessionTests sSessionTests;

struct SessionEngineTests : public juce::UnitTest {
    SessionEngineTests() : juce::UnitTest("SessionEngine", "descartes") {}

    void runTest() override {
        beginTest("grid -> patterns -> session -> events (b3 + step cell + chained c10)");
        StrudelEngine engine;
        expect(engine.loadBundle(strudelBundleSource()).isEmpty());

        Grid g(4, 64);
        put(g, "b3", "c3 c4");
        put(g, "b7", "e3");    // step 3 of b3's cycle -> squeezed into 3/16..4/16
        put(g, "c10", "g3");

        Layout layout(g);
        auto errors = rebuildPatterns(g, layout, engine);
        expect(errors.empty());

        Session s;
        s.setLayout(layout);
        s.start(1, at("b3").second, 0.0);
        std::vector<Event> out;
        s.generate(0.0, 1.0, engine, out);

        bool sawStep = false;
        int bNotes = 0;
        int cNotes = 0;
        for (auto& e : out) {
            const int note = (int)e.value["note"];
            if (e.column == 1) {
                ++bNotes;
                if (note == 52) {
                    sawStep = true;
                    expectWithinAbsoluteError(e.begin, 3.0 / 16.0, 1e-9);
                }
            } else if (e.column == 2) {
                ++cNotes;
                expectEquals(note, 55);
                expect(e.begin >= 6.0 / 16.0 - 1e-9);
            }
        }
        expect(sawStep, "step cell event missing");
        expectEquals(bNotes, 3);
        expectEquals(cNotes, 1);

        beginTest("compile errors are reported per cell");
        put(g, "d5", "undefinedFunction()");
        errors = rebuildPatterns(g, Layout(g), engine);
        expectEquals((int)errors.size(), 1);
        expect(errors.count(at("d5")) == 1);
    }
};

static SessionEngineTests sSessionEngineTests;
