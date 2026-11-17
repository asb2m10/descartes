#include "core/GridClipboard.h"
#include "core/MemoryLogger.h"
#include "core/StrudelBundle.h"
#include "core/StrudelEngine.h"
#include "gui/GridComponent.h"
#include "gui/LogWindow.h"

#include <juce_gui_basics/juce_gui_basics.h>

#include <thread>

using namespace Descartes;

namespace {
struct NullHost : GridHost {
    void startCycle(int, int) override {}
    void stopCycle(int, int) override {}
    void stopAll() override {}
    int playheadRow(int) const override { return -1; }
    double cycleTime(int) const override { return -1.0; }
    CellErrors cellErrors() const override { return {}; }
    unsigned int buildCount() const override { return 0; }
};

juce::KeyPress ctrlKey(int code) {
    return juce::KeyPress(code, juce::ModifierKeys::ctrlModifier, 0);
}

juce::KeyPress shiftKey(int code) {
    return juce::KeyPress(code, juce::ModifierKeys::shiftModifier, 0);
}
} // namespace

struct MemoryLoggerTests : public juce::UnitTest {
    MemoryLoggerTests() : juce::UnitTest("MemoryLogger", "descartes") {}

    void runTest() override {
        auto& log = MemoryLogger::instance();

        beginTest("entries keep level and source; identical consecutive messages fold into a count");
        log.clear();
        log.error("b3", "boom");
        log.error("b3", "boom");
        log.warn("b3", "boom");
        log.info("engine", "hello");
        auto entries = log.entries();
        expectEquals((int)entries.size(), 3);
        expectEquals(entries[0].count, 2);
        expectEquals(log.errorCount(), 2);
        expectEquals(entries[2].source, juce::String("engine"));
        expect(MemoryLogger::format(entries[0]).contains("[error] b3: boom (x2)"));

        beginTest("the buffer is bounded");
        log.clear();
        log.setCapacity(5);
        for (int i = 0; i < 20; ++i) {
            log.error("x", juce::String(i));
        }
        expectEquals(log.size(), 5);
        expectEquals(log.errorCount(), 5);
        expectEquals(log.entries().front().message, juce::String("15"));
        log.setCapacity(MemoryLogger::DefaultCapacity);

        beginTest("logging from several threads is safe");
        log.clear();
        {
            std::vector<std::thread> threads;
            for (int t = 0; t < 4; ++t) {
                threads.emplace_back([&log, t] {
                    for (int i = 0; i < 200; ++i) {
                        log.warn("t" + juce::String(t), juce::String(i));
                    }
                });
            }
            for (auto& t : threads) {
                t.join();
            }
        }
        expectEquals(log.size(), 800);

        beginTest("install is reference counted and restores the previous logger");
        {
            struct Other : juce::Logger {
                void logMessage(const juce::String&) override {}
            } other;
            juce::Logger::setCurrentLogger(&other);
            log.install();
            log.install();
            expect(juce::Logger::getCurrentLogger() == &log);
            log.clear();
            juce::Logger::writeToLog("through juce");
            expectEquals(log.entries().back().source, juce::String("juce"));
            log.uninstall();
            expect(juce::Logger::getCurrentLogger() == &log);
            log.uninstall();
            expect(juce::Logger::getCurrentLogger() == &other);
            juce::Logger::setCurrentLogger(nullptr);
        }

        beginTest("JS console output is routed to the logger");
        {
            log.clear();
            StrudelEngine engine;
            juce::String error;
            engine.evaluate("console.error('from js')", &error);
            engine.evaluate("console.warn('careful')", &error);
            auto entries2 = log.entries();
            expectEquals((int)entries2.size(), 2);
            if (entries2.size() == 2) {
                expect(entries2[0].level == MemoryLogger::Level::Error);
                expectEquals(entries2[0].message, juce::String("from js"));
                expect(entries2[1].level == MemoryLogger::Level::Warning);
            }
        }

        beginTest("log window lists and filters entries");
        {
            log.clear();
            log.info("a", "i");
            log.warn("b", "w");
            log.error("c", "e");
            LogWindow window;
            window.show();
            expectEquals(window.numVisibleRows(), 3);
            window.setVisible(false);
            log.clear();
        }
    }
};

static MemoryLoggerTests memoryLoggerTests;

struct GridClipboardTests : public juce::UnitTest {
    GridClipboardTests() : juce::UnitTest("GridClipboard", "descartes") {}

    void runTest() override {
        beginTest("markdown table output");
        {
            Grid g(4, 8);
            g.setCell(1, 2, "c3 c4");
            g.setCell(2, 2, "a|b");
            g.setCell(1, 3, "e3");
            auto md = GridClipboard::toMarkdown(g, {1, 2, 2, 3});
            expectEquals(md, juce::String("| b | c |\n| --- | --- |\n| c3 c4 | a\\|b |\n| e3 | |"));
        }

        beginTest("markdown round trip keeps pipes, backslashes and empty cells");
        {
            Grid g(4, 8);
            g.setCell(0, 0, "x|y");
            g.setCell(2, 0, "back\\slash");
            g.setCell(1, 1, "z");
            auto block = GridClipboard::fromText(GridClipboard::toMarkdown(g, {0, 0, 2, 1}));
            expectEquals((int)block.size(), 2);
            if (block.size() == 2) {
                expectEquals((int)block[0].size(), 3);
                expectEquals(block[0][0], juce::String("x|y"));
                expectEquals(block[0][1], juce::String());
                expectEquals(block[0][2], juce::String("back\\slash"));
                expectEquals(block[1][1], juce::String("z"));
                expectEquals(block[1][0], juce::String());
            }
        }

        beginTest("hand written tables, with or without outer pipes and alignment colons");
        {
            auto block = GridClipboard::fromText("| a | b |\n|:---|---:|\n| c3 | e3 |\n| g3 | |");
            expectEquals((int)block.size(), 2);
            expectEquals(block[0][1], juce::String("e3"));
            expectEquals(block[1][0], juce::String("g3"));
            expectEquals(block[1][1], juce::String());

            auto noTrailing = GridClipboard::fromText("| a | b\n| --- | ---\n| c3 | e3");
            expectEquals((int)noTrailing.size(), 1);
            expectEquals(noTrailing[0][1], juce::String("e3"));
        }

        beginTest("tab separated text, plain lines and a single cell");
        {
            auto tsv = GridClipboard::fromText("c3\te3\n\tg3\n");
            expectEquals((int)tsv.size(), 2);
            expectEquals((int)tsv[1].size(), 2);
            expectEquals(tsv[1][0], juce::String());
            expectEquals(tsv[1][1], juce::String("g3"));

            auto one = GridClipboard::fromText("c3 e3");
            expectEquals((int)one.size(), 1);
            expectEquals(one[0][0], juce::String("c3 e3"));

            expect(GridClipboard::fromText("  \n").empty());
        }
    }
};

static GridClipboardTests gridClipboardTests;

struct SelectionTests : public juce::UnitTest {
    SelectionTests() : juce::UnitTest("Selection", "descartes") {}

    void runTest() override {
        beginTest("shift+arrows extend a rectangle from the anchor; plain arrows collapse it");
        {
            Grid grid(4, 10);
            NullHost host;
            GridComponent gc(grid, host);
            gc.select(1, 1);
            gc.keyPressed(shiftKey(juce::KeyPress::rightKey));
            gc.keyPressed(shiftKey(juce::KeyPress::downKey));
            gc.keyPressed(shiftKey(juce::KeyPress::downKey));
            expect(gc.selection() == CellRect({1, 1, 2, 3}));
            expectEquals(gc.selectedCol(), 1);
            gc.keyPressed(shiftKey(juce::KeyPress::upKey));
            gc.keyPressed(shiftKey(juce::KeyPress::leftKey));
            expect(gc.selection() == CellRect({1, 1, 1, 2}));
            gc.keyPressed(juce::KeyPress(juce::KeyPress::rightKey, juce::ModifierKeys(), 0));
            expect(!gc.hasRangeSelection());
            expectEquals(gc.selectedCol(), 2);

            gc.keyPressed(ctrlKey('a'));
            expect(gc.selection() == CellRect({0, 0, 3, 9}));
        }

        beginTest("a rectangle selects upward and leftward too");
        {
            Grid grid(4, 10);
            NullHost host;
            GridComponent gc(grid, host);
            gc.select(2, 5);
            gc.extendSelection(0, 3);
            expect(gc.selection() == CellRect({0, 3, 2, 5}));
        }

        beginTest("copy puts a markdown table on the clipboard; cut clears; paste is one undo step");
        {
            Grid grid(4, 10);
            grid.setCell(0, 0, "c3");
            grid.setCell(1, 0, "e3");
            grid.setCell(0, 1, "g3");
            grid.undoManager().clearUndoHistory();
            NullHost host;
            GridComponent gc(grid, host);

            gc.select(0, 0);
            gc.extendSelection(1, 1);
            gc.keyPressed(ctrlKey('c'));
            const auto text = juce::SystemClipboard::getTextFromClipboard();
            expect(text.startsWith("| a | b |"), "clipboard: " + text);
            expect(text.contains("| c3 | e3 |"));

            gc.select(2, 4);
            expect(gc.pasteClipboard());
            expectEquals(grid.cell(2, 4), juce::String("c3"));
            expectEquals(grid.cell(3, 4), juce::String("e3"));
            expectEquals(grid.cell(2, 5), juce::String("g3"));
            expectEquals(grid.cell(3, 5), juce::String());
            expect(gc.selection() == CellRect({2, 4, 3, 5}));

            grid.undo();
            expectEquals(grid.cell(2, 4), juce::String());
            expectEquals(grid.cell(2, 5), juce::String());
            expectEquals(grid.cell(0, 0), juce::String("c3"));

            gc.select(0, 0);
            gc.extendSelection(1, 1);
            gc.keyPressed(ctrlKey('x'));
            expect(grid.isEmpty(0, 0) && grid.isEmpty(1, 0) && grid.isEmpty(0, 1));
            grid.undo();
            expectEquals(grid.cell(1, 0), juce::String("e3"));
        }

        beginTest("Delete clears the whole selection; paste past the grid edge is clipped and logged");
        {
            Grid grid(2, 4);
            grid.setCell(0, 0, "a1");
            grid.setCell(1, 1, "b2");
            NullHost host;
            GridComponent gc(grid, host);
            gc.select(0, 0);
            gc.extendSelection(1, 1);
            gc.keyPressed(juce::KeyPress(juce::KeyPress::deleteKey, juce::ModifierKeys(), 0));
            expect(grid.isEmpty(0, 0) && grid.isEmpty(1, 1));

            MemoryLogger::instance().clear();
            juce::SystemClipboard::copyTextToClipboard("| a | b | c |\n| --- | --- | --- |\n| 1 | 2 | 3 |");
            gc.select(1, 3);
            expect(gc.pasteClipboard());
            expectEquals(grid.cell(1, 3), juce::String("1"));
            expectEquals((int)MemoryLogger::instance().entries().size(), 1);
            expect(MemoryLogger::instance().entries()[0].level == MemoryLogger::Level::Warning);
            MemoryLogger::instance().clear();
        }
    }
};

static SelectionTests selectionTests;
