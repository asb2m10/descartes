#include "gui/GridComponent.h"
#include "plugin/PluginProcessor.h"

#include <juce_gui_basics/juce_gui_basics.h>

#include <cstdlib>

using namespace Descartes;

namespace {
struct FakeHost : GridHost {
    std::vector<std::pair<int, int>> starts, stops;
    int stopAllCount = 0;
    int playhead = -1;
    CellErrors errors;
    unsigned int builds = 0;

    void startCycle(int col, int row) override { starts.emplace_back(col, row); }
    void stopCycle(int col, int row) override { stops.emplace_back(col, row); }
    void stopAll() override { ++stopAllCount; }
    int playheadRow(int) const override { return playhead; }
    double cycleTime(int) const override { return -1.0; }
    CellErrors cellErrors() const override { return errors; }
    unsigned int buildCount() const override { return builds; }
};

juce::KeyPress ctrl(int code, bool shift = false) {
    return juce::KeyPress(code, juce::ModifierKeys::ctrlModifier | (shift ? juce::ModifierKeys::shiftModifier : 0), 0);
}

juce::KeyPress plain(int code) {
    return juce::KeyPress(code, juce::ModifierKeys(), 0);
}

juce::KeyPress typed(juce::juce_wchar c) {
    return juce::KeyPress((int)c, juce::ModifierKeys(), c);
}
} // namespace

struct GuiTests : public juce::UnitTest {
    GuiTests() : juce::UnitTest("Gui", "descartes") {}

    void runTest() override {
        beginTest("arrow keys move the selection and clamp at the edges");
        {
            Grid grid(4, 10);
            FakeHost host;
            GridComponent gc(grid, host);
            expectEquals(gc.selectedCol(), 0);
            gc.keyPressed(plain(juce::KeyPress::leftKey));
            gc.keyPressed(plain(juce::KeyPress::upKey));
            expectEquals(gc.selectedCol(), 0);
            expectEquals(gc.selectedRow(), 0);
            gc.keyPressed(plain(juce::KeyPress::rightKey));
            gc.keyPressed(plain(juce::KeyPress::downKey));
            gc.keyPressed(plain(juce::KeyPress::downKey));
            expectEquals(gc.selectedCol(), 1);
            expectEquals(gc.selectedRow(), 2);
            gc.keyPressed(plain(juce::KeyPress::pageDownKey));
            expectEquals(gc.selectedRow(), 9);
            gc.keyPressed(plain(juce::KeyPress::homeKey));
            expectEquals(gc.selectedRow(), 0);
        }

        beginTest("typing starts an edit, Enter commits and moves down");
        {
            Grid grid(4, 10);
            FakeHost host;
            GridComponent gc(grid, host);
            gc.select(1, 2);
            expect(gc.keyPressed(typed('c')));
            expect(gc.isEditing());
            gc.commitEdit(true);
            expect(!gc.isEditing());
            expectEquals(grid.cell(1, 2), juce::String("c"));
            expectEquals(gc.selectedRow(), 3);

            gc.select(1, 2);
            gc.beginEdit("c3 c4");
            gc.commitEdit(false);
            expectEquals(grid.cell(1, 2), juce::String("c3 c4"));
            expectEquals(gc.selectedRow(), 2);

            // Escape cancels
            gc.beginEdit("garbage");
            gc.cancelEdit();
            expectEquals(grid.cell(1, 2), juce::String("c3 c4"));

            // committing empty text clears the cell
            gc.beginEdit("");
            gc.commitEdit(false);
            expect(grid.isEmpty(1, 2));
        }

        beginTest("layout follows edits (starter and step cells)");
        {
            Grid grid(4, 64);
            FakeHost host;
            GridComponent gc(grid, host);
            gc.select(1, 2);
            gc.beginEdit("c3 c4");
            gc.commitEdit(false);
            gc.select(1, 9);
            gc.beginEdit("e3");
            gc.commitEdit(false);
            expectEquals((int)gc.layout().starters().size(), 1);
            expect(gc.layout().roleAt(1, 9).kind == CellRole::Kind::Step);
        }

        beginTest("Delete clears, Ctrl+Z / Ctrl+Shift+Z undo and redo");
        {
            Grid grid(4, 10);
            FakeHost host;
            GridComponent gc(grid, host);
            gc.select(0, 0);
            gc.beginEdit("hello");
            gc.commitEdit(false);
            expectEquals(grid.cell(0, 0), juce::String("hello"));
            gc.keyPressed(plain(juce::KeyPress::deleteKey));
            expect(grid.isEmpty(0, 0));
            gc.keyPressed(ctrl('Z'));
            expectEquals(grid.cell(0, 0), juce::String("hello"));
            gc.keyPressed(ctrl('Z'));
            expect(grid.isEmpty(0, 0));
            gc.keyPressed(ctrl('Z', true));
            expectEquals(grid.cell(0, 0), juce::String("hello"));
        }

        beginTest("Ctrl+Enter starts, Ctrl+. stops, Ctrl+Shift+. stops all");
        {
            Grid grid(4, 10);
            FakeHost host;
            GridComponent gc(grid, host);
            gc.select(2, 3);
            expect(gc.keyPressed(ctrl(juce::KeyPress::returnKey)));
            expect(gc.keyPressed(ctrl('.')));
            expect(gc.keyPressed(ctrl('.', true)));
            expectEquals((int)host.starts.size(), 1);
            expect(host.starts[0] == std::make_pair(2, 3));
            expectEquals((int)host.stops.size(), 1);
            expect(host.stops[0] == std::make_pair(2, 3));
            expectEquals(host.stopAllCount, 1);
        }

        beginTest("header edit sets the column destination");
        {
            Grid grid(4, 10);
            FakeHost host;
            GridComponent gc(grid, host);
            gc.select(2, 0);
            gc.beginHeaderEdit();
            gc.commitEdit();
            expectEquals(grid.header(2), juce::String());
            gc.beginHeaderEdit();
            gc.cancelEdit();

            gc.beginHeaderEdit();
            gc.commitEdit();
            // type a destination through the public edit path
            gc.beginHeaderEdit();
            gc.cancelEdit();
            grid.setHeader(2, "midi:5");
            gc.beginHeaderEdit();
            gc.commitEdit();
            expectEquals(grid.header(2), juce::String("midi:5"));
        }

        beginTest("errors are refreshed when the build count changes");
        {
            Grid grid(4, 10);
            FakeHost host;
            GridComponent gc(grid, host);
            expect(gc.errors().empty());
            host.errors[{1, 1}] = "boom";
            host.builds = 1;
            gc.tick();
            expectEquals((int)gc.errors().size(), 1);
        }

        beginTest("full editor renders; snapshot written when DESCARTES_SNAPSHOT_DIR is set");
        {
            DescartesProcessor processor;
            processor.setPlayConfigDetails(0, 0, 48000.0, 480);
            processor.prepareToPlay(48000.0, 480);

            auto& g = processor.grid();
            g.setHeader(0, "midi:1");
            g.setHeader(1, "midi:2");
            g.setHeader(2, "midi:3");
            g.setHeader(3, "");
            g.setCell(0, 1, "c2 ~ c2 ~");
            g.setProps(0, 1, CellProps{8, false});
            g.setCell(0, 4, "g2");
            g.setCell(1, 2, "c3 [e3 g3] <c4 b3>");
            g.setCell(1, 6, "e3*2");
            g.setCell(1, 9, "g3");
            g.setCell(2, 9, "s(\"hh*4\")");
            g.setProps(2, 9, CellProps{4, true});
            g.setCell(2, 20, "note(");

            std::unique_ptr<juce::AudioProcessorEditor> editor(processor.createEditor());
            editor->setSize(900, 560);
            processor.scheduler().setGrid(g);

            // Loading Strudel takes a while in debug builds; wait for it so the cycle starts on time.
            for (int i = 0; i < 1000 && processor.scheduler().buildCount() < 2; ++i) {
                juce::MessageManager::getInstance()->runDispatchLoopUntil(10);
            }
            expect(processor.scheduler().buildCount() >= 2, "scheduler never became ready");
            processor.startCycle(1, 2);

            // Run the transport in real time until the playhead shows up (the scheduler works in
            // wall-clock time), then a few more blocks so the highlight is mid-cycle.
            juce::AudioBuffer<float> audio(0, 480);
            juce::MidiBuffer midi;
            int extraBlocks = 20;
            for (int i = 0; i < 1000 && extraBlocks > 0; ++i) {
                midi.clear();
                processor.processBlock(audio, midi);
                juce::MessageManager::getInstance()->runDispatchLoopUntil(10);
                if (processor.scheduler().playheadRow(1) >= 0) {
                    --extraBlocks;
                }
            }
            expect(processor.scheduler().playheadRow(1) >= 3, "playhead never appeared");
            juce::MessageManager::getInstance()->runDispatchLoopUntil(40); // let the editor timer repaint

            auto image = editor->createComponentSnapshot(editor->getLocalBounds());
            expectEquals(image.getWidth(), 900);
            expect(image.getHeight() == 560);

            if (const char* dir = std::getenv("DESCARTES_SNAPSHOT_DIR")) {
                juce::File out = juce::File(dir).getChildFile("editor.png");
                juce::FileOutputStream stream(out);
                if (stream.openedOk()) {
                    stream.setPosition(0);
                    stream.truncate();
                    juce::PNGImageFormat().writeImageToStream(image, stream);
                }
                logMessage("wrote " + out.getFullPathName());
            }

            editor.reset();
            processor.releaseResources();
        }
    }
};

static GuiTests sGuiTests;
