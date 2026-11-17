#include "core/Grid.h"
#include "core/Layout.h"

#include <juce_core/juce_core.h>

using namespace Descartes;

namespace {
void put(Grid& g, const char* name, const juce::String& text) {
    auto pos = Grid::parseCellName(name);
    jassert(pos.has_value());
    g.setCell(pos->first, pos->second, text);
}

std::pair<int, int> at(const char* name) {
    return *Grid::parseCellName(name);
}
} // namespace

struct GridTests : public juce::UnitTest {
    GridTests() : juce::UnitTest("Grid", "descartes") {}

    struct Recorder : Grid::Listener {
        int cells = 0, headers = 0, resets = 0;
        void cellChanged(int, int) override { ++cells; }
        void headerChanged(int) override { ++headers; }
        void gridReset() override { ++resets; }
    };

    void runTest() override {
        beginTest("cell names");
        expectEquals(Grid::cellName(1, 2), juce::String("b3"));
        expectEquals(Grid::columnName(26), juce::String("aa"));
        expect(Grid::parseCellName("b3") == std::make_optional(std::make_pair(1, 2)));
        expect(Grid::parseCellName("AA10") == std::make_optional(std::make_pair(26, 9)));
        expect(!Grid::parseCellName("3b").has_value());
        expect(!Grid::parseCellName("b0").has_value());
        expect(!Grid::parseCellName("b").has_value());

        beginTest("cells, props and header");
        Grid g(4, 32);
        auto [bc, br] = at("b3");
        expect(g.isEmpty(bc, br));
        expect(g.setCell(bc, br, "c3 c4"));
        expectEquals(g.cell(bc, br), juce::String("c3 c4"));
        expect(!g.setCell(99, 0, "x"));
        expect(!g.setCell(0, 99, "x"));
        expectEquals(g.props(bc, br).resolution, 16);

        CellProps p;
        p.resolution = 8;
        p.once = true;
        g.setProps(bc, br, p);
        expect(g.props(bc, br) == p);

        g.setHeader(1, "midi:1");
        expectEquals(g.header(1), juce::String("midi:1"));
        g.setHeader(1, "");
        expectEquals(g.header(1), juce::String());

        beginTest("clearing a cell with default props removes it");
        g.setProps(bc, br, CellProps{});
        g.setCell(bc, br, "");
        expect(g.isEmpty(bc, br));
        expect(g.props(bc, br) == CellProps{});

        beginTest("props survive on an empty cell until reset");
        g.setProps(0, 0, p);
        expect(g.props(0, 0) == p);
        g.setProps(0, 0, CellProps{});
        expect(g.props(0, 0) == CellProps{});

        beginTest("undo / redo and listener notifications");
        Grid u(4, 32);
        Recorder rec;
        u.addListener(&rec);
        u.undoManager().beginNewTransaction();
        u.setCell(0, 0, "a");
        u.undoManager().beginNewTransaction();
        u.setCell(0, 0, "b");
        expectEquals(u.cell(0, 0), juce::String("b"));
        u.undo();
        expectEquals(u.cell(0, 0), juce::String("a"));
        u.undo();
        expect(u.isEmpty(0, 0));
        u.redo();
        expectEquals(u.cell(0, 0), juce::String("a"));
        expect(rec.cells >= 4);
        u.setHeader(0, "midi:2");
        expect(rec.headers >= 1);
        u.removeListener(&rec);

        beginTest("xml round trip");
        Grid a(5, 40);
        put(a, "b3", "c3 c4");
        put(a, "c10", "e3");
        a.setProps(at("b3").first, at("b3").second, p);
        a.setHeader(1, "midi:1");

        Grid b;
        Recorder rec2;
        b.addListener(&rec2);
        expect(b.fromXmlString(a.toXmlString()));
        expectEquals(rec2.resets, 1);
        expectEquals(b.numCols(), 5);
        expectEquals(b.numRows(), 40);
        expectEquals(b.cell(at("b3").first, at("b3").second), juce::String("c3 c4"));
        expectEquals(b.cell(at("c10").first, at("c10").second), juce::String("e3"));
        expect(b.props(at("b3").first, at("b3").second) == p);
        expectEquals(b.header(1), juce::String("midi:1"));
        expect(!b.fromXmlString("<nope/>"));
        b.removeListener(&rec2);
    }
};

static GridTests sGridTests;

struct LayoutTests : public juce::UnitTest {
    LayoutTests() : juce::UnitTest("Layout", "descartes") {}

    void runTest() override {
        beginTest("starter owns the rows below it (b3, resolution 16 -> b4..b19)");
        Grid g(4, 64);
        put(g, "b3", "c3 c4");
        Layout l(g);
        expectEquals((int)l.starters().size(), 1);
        const auto& s = l.starter(0);
        expect(s.col == at("b3").first && s.row == at("b3").second);
        expect(s.lastRow == at("b19").second);
        expect(l.roleAt(at("b3").first, at("b3").second).kind == CellRole::Kind::Starter);
        expect(l.roleAt(at("b4").first, at("b4").second).kind == CellRole::Kind::Range);
        expect(l.roleAt(at("b19").first, at("b19").second).kind == CellRole::Kind::Range);
        expect(l.roleAt(at("b20").first, at("b20").second).kind == CellRole::Kind::None);
        expect(l.roleAt(at("b2").first, at("b2").second).kind == CellRole::Kind::None);

        beginTest("non-empty cells in the range are step cells, not starters");
        put(g, "b10", "e3");
        put(g, "b19", "g3");
        Layout l2(g);
        expectEquals((int)l2.starters().size(), 1);
        auto role = l2.roleAt(at("b10").first, at("b10").second);
        expect(role.kind == CellRole::Kind::Step);
        expectEquals(role.step, 6); // b4 is step 0
        expectEquals((int)l2.stepsOf(0).size(), 2);
        expect(l2.starterFor(at("b10").first, at("b10").second) == std::make_optional(0));

        beginTest("a non-empty cell right after the range is a new starter");
        put(g, "b20", "bd");
        Layout l3(g);
        expectEquals((int)l3.starters().size(), 2);
        expect(l3.roleAt(at("b20").first, at("b20").second).kind == CellRole::Kind::Starter);

        beginTest("changing resolution re-flows ranges");
        put(g, "b8", "sd");
        g.setProps(at("b3").first, at("b3").second, CellProps{4, false});
        Layout l4(g);
        // b3 now owns b4..b7, so b8 becomes a starter owning b9..b24, absorbing b10, b19, b20
        expectEquals((int)l4.starters().size(), 2);
        expect(l4.starter(0).lastRow == at("b7").second);
        expect(l4.starter(1).row == at("b8").second);
        expect(l4.roleAt(at("b20").first, at("b20").second).kind == CellRole::Kind::Step);
        expect(l4.roleAt(at("b10").first, at("b10").second).starterIndex == 1);

        beginTest("columns are independent and ordered");
        Grid h(4, 64);
        put(h, "c10", "e3");
        put(h, "b3", "c3");
        Layout l5(h);
        expectEquals((int)l5.starters().size(), 2);
        expectEquals((int)l5.startersInColumn(1).size(), 1);
        expectEquals((int)l5.startersInColumn(2).size(), 1);
        expect(l5.roleAt(2, at("c4").second).kind == CellRole::Kind::None);

        beginTest("range is clamped to the grid and resolution is at least 1");
        Grid small(2, 6);
        put(small, "a5", "x");
        Layout l6(small);
        expectEquals(l6.starter(0).lastRow, 5);
        small.setProps(0, at("a5").second, CellProps{0, false});
        expectEquals(Layout(small).starter(0).resolution, 1);

        beginTest("playhead row follows phase");
        Grid pg(2, 64);
        put(pg, "b3", "x");
        Layout pl(pg);
        const auto& ps = pl.starter(0);
        expectEquals(ps.rowAtPhase(0.0), at("b4").second);
        expectEquals(ps.rowAtPhase(0.999), at("b19").second);
        expectEquals(ps.rowAtPhase(6.0 / 16.0), at("b10").second);
        expectWithinAbsoluteError(ps.phaseOfRow(at("b10").second), 6.0 / 16.0, 1e-12);

        beginTest("empty grid has no starters");
        expectEquals((int)Layout(Grid(3, 10)).starters().size(), 0);
    }
};

static LayoutTests sLayoutTests;
