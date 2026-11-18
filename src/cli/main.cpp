// descartes_cli: text-mode editor for the Descartes grid (FTXUI), playing MIDI on its own clock.

#include "cli/MidiClock.h"
#include "cli/TuiModel.h"
#include "core/MemoryLogger.h"

#include <ftxui/component/component.hpp>
#include <ftxui/component/screen_interactive.hpp>
#include <ftxui/dom/elements.hpp>
#include <ftxui/screen/terminal.hpp>

#include <algorithm>
#include <atomic>
#include <cstdio>
#include <thread>

using namespace ftxui;
using ftxui::Event; // Descartes::Event also exists
using Descartes::CellErrors;
using Descartes::CellRole;
using Descartes::Engine;
using Descartes::Grid;
using Descartes::MemoryLogger;
using Descartes::MidiClock;
using Descartes::TuiModel;

namespace {

constexpr int CellWidth = 14;
constexpr int RowLabelWidth = 4;

std::string pad(const juce::String& text, int width) {
    auto s = text.replaceCharacters("\r\n\t", "   ").toStdString();
    // Truncate on character boundaries, not bytes.
    juce::String t(s);
    if (t.length() > width) {
        t = t.substring(0, width - 1) + juce::String::charToString(0x2026);
    }
    while (t.length() < width) {
        t << " ";
    }
    return t.toStdString();
}

// Shift+arrow sequences sent by xterm-compatible terminals.
bool isShift(const Event& e, char arrow) {
    return e.input() == std::string{'\x1b', '[', '1', ';', '2', arrow};
}

class TuiApp {
public:
    TuiApp(Engine& engine, MidiClock& clock, juce::File file) : mModel(engine), mClock(clock), mFile(std::move(file)) {}

    Element render() {
        auto& grid = mModel.grid();
        const auto& layout = mModel.layout();
        const auto size = Terminal::Size();
        const int bodyRows = std::max(3, size.dimy - (mShowLog ? 14 : 6));
        const int visCols = std::max(1, (size.dimx - RowLabelWidth - 2) / CellWidth);

        mRowTop = std::clamp(mRowTop, std::max(0, mModel.cursorRow() - bodyRows + 1), mModel.cursorRow());
        mColLeft = std::clamp(mColLeft, std::max(0, mModel.cursorCol() - visCols + 1), mModel.cursorCol());
        const int lastRow = std::min(grid.numRows(), mRowTop + bodyRows);
        const int lastCol = std::min(grid.numCols(), mColLeft + visCols);
        const auto sel = mModel.selection();
        auto errors = mModel.engine().scheduler().cellErrors();

        Elements lines;

        Elements head{text(std::string(RowLabelWidth, ' '))};
        for (int c = mColLeft; c < lastCol; ++c) {
            auto label = pad(juce::String(Grid::columnName(c)) + " " + grid.header(c), CellWidth);
            head.push_back(text(label) | bold | color(Color::Yellow));
        }
        lines.push_back(hbox(std::move(head)));

        for (int row = mRowTop; row < lastRow; ++row) {
            Elements line;
            line.push_back(text(pad(juce::String(row + 1), RowLabelWidth - 1) + " ") | dim);
            for (int c = mColLeft; c < lastCol; ++c) {
                const bool cursor = c == mModel.cursorCol() && row == mModel.cursorRow();
                juce::String content = grid.cell(c, row);
                if (cursor && mModel.isEditing() && !mModel.isEditingHeader()) {
                    content = mModel.editText() + juce::String::charToString(0x258F);
                }
                auto role = layout.roleAt(c, row);
                const bool playing = mModel.engine().scheduler().playheadRow(c) == row;

                auto marker = playing ? juce::String::charToString(0x25B6) : juce::String(" ");
                auto element = text(pad(marker + content, CellWidth));
                const bool inLoop = role.kind == CellRole::Kind::Step || role.kind == CellRole::Kind::Range;
                switch (role.kind) {
                    case CellRole::Kind::Starter: element |= bold | color(Color::Cyan); break;
                    case CellRole::Kind::Step: element |= color(Color::White); break;
                    case CellRole::Kind::Range: break;
                    case CellRole::Kind::None: element |= dim; break;
                }
                if (inLoop) {
                    element |= bgcolor(Color::Black);
                }
                if (playing) {
                    element |= bgcolor(Color::Black) | color(Color::Green) | bold;
                }
                if (errors.count({c, row}) != 0) {
                    element |= color(Color::Red) | underlined;
                }
                if (sel.contains(c, row)) {
                    element |= bgcolor(Color::Grey23) | color(Color::White);
                }
                if (cursor) {
                    element |= inverted;
                }
                line.push_back(std::move(element));
            }
            lines.push_back(hbox(std::move(line)));
        }

        Elements footer;
        footer.push_back(separator());
        footer.push_back(propertiesLine(errors));
        if (mModel.isEditingHeader()) {
            footer.push_back(text("header " + Grid::columnName(mModel.cursorCol()).toStdString() + ": " + mModel.editText().toStdString()
                                  + "▏") | bold);
        } else {
            footer.push_back(text(mStatus.empty() ? helpText() : mStatus) | dim);
        }
        if (mShowLog) {
            footer.push_back(separator());
            footer.push_back(logPane());
        }

        return vbox({vbox(std::move(lines)) | flex, vbox(std::move(footer))});
    }

    bool handle(const Event& e, ScreenInteractive& screen) {
        mStatus.clear();
        if (mModel.isEditing()) {
            return handleEditing(e);
        }

        if (e == Event::ArrowLeft) { mModel.move(-1, 0, false); }
        else if (e == Event::ArrowRight || e == Event::Tab) { mModel.move(1, 0, false); }
        else if (e == Event::ArrowUp) { mModel.move(0, -1, false); }
        else if (e == Event::ArrowDown) { mModel.move(0, 1, false); }
        else if (e == Event::TabReverse) { mModel.move(-1, 0, false); }
        else if (isShift(e, 'D')) { mModel.move(-1, 0, true); }
        else if (isShift(e, 'C')) { mModel.move(1, 0, true); }
        else if (isShift(e, 'A')) { mModel.move(0, -1, true); }
        else if (isShift(e, 'B')) { mModel.move(0, 1, true); }
        else if (e == Event::PageUp) { mModel.move(0, -16, false); }
        else if (e == Event::PageDown) { mModel.move(0, 16, false); }
        else if (e == Event::Home) { mModel.moveTo(mModel.cursorCol(), 0, false); }
        else if (e == Event::End) { mModel.moveTo(mModel.cursorCol(), mModel.grid().numRows() - 1, false); }
        else if (e == Event::CtrlA) { mModel.selectAll(); }
        else if (e == Event::Return || e == Event::F2 || e == Event::Character('e')) { mModel.beginEdit({}, true); }
        else if (e == Event::Character('H')) { mModel.beginHeaderEdit(); }
        else if (e == Event::Delete || e == Event::Backspace || e == Event::Character('x')) { mModel.clearSelection(); }
        else if (e == Event::Character('c')) { mClipboard = mModel.copy(); mStatus = "copied"; }
        else if (e == Event::Character('X')) { mClipboard = mModel.cut(); mStatus = "cut"; }
        else if (e == Event::Character('p')) { mStatus = mModel.paste(mClipboard) ? "pasted" : "nothing to paste"; }
        else if (e == Event::Character('u')) { mModel.undo(); }
        else if (e == Event::CtrlR) { mModel.redo(); }
        else if (e == Event::Character(' ') || e == Event::F5) { mModel.engine().flushGridUpdate(); mModel.startAtCursor(); }
        else if (e == Event::Character('.') || e == Event::F6) { mModel.stopAtCursor(); }
        else if (e == Event::Character('!') || e == Event::F7) { mModel.stopAll(); }
        else if (e == Event::Character('[')) { mModel.stepResolution(-1); }
        else if (e == Event::Character(']')) { mModel.stepResolution(1); }
        else if (e == Event::Character('-')) { mModel.stepSpeed(-1); }
        else if (e == Event::Character('=')) { mModel.stepSpeed(1); }
        else if (e == Event::Character('o')) { mModel.stepCycles(); }
        else if (e == Event::Character('<')) { mClock.setBpm(std::max(20.0, mClock.bpm() - 1.0)); }
        else if (e == Event::Character('>')) { mClock.setBpm(std::min(300.0, mClock.bpm() + 1.0)); }
        else if (e == Event::Character('l')) { mShowLog = !mShowLog; }
        else if (e == Event::CtrlS) { save(); }
        else if (e == Event::Character('q') || e == Event::CtrlQ) { screen.Exit(); }
        else { return false; }

        mModel.engine().flushGridUpdate();
        return true;
    }

private:
    bool handleEditing(const Event& e) {
        if (e == Event::Return) { mModel.commitEdit(true); }
        else if (e == Event::Escape) { mModel.cancelEdit(); }
        else if (e == Event::Backspace) {
            auto t = mModel.editText();
            mModel.setEditText(t.dropLastCharacters(1));
        } else if (e.is_character()) {
            mModel.setEditText(mModel.editText() + juce::String::fromUTF8(e.character().c_str()));
        } else {
            return false;
        }
        mModel.engine().flushGridUpdate();
        return true;
    }

    Element propertiesLine(const CellErrors& errors) {
        std::string s = " " + Grid::cellName(mModel.cursorCol(), mModel.cursorRow()).toStdString();
        const bool isStep = mModel.layout().roleAt(mModel.cursorCol(), mModel.cursorRow()).kind == CellRole::Kind::Step;
        if (auto p = mModel.propsAtCursor()) {
            if (isStep) {
                s += "   step speed x" + juce::String(mModel.grid().props(mModel.cursorCol(), mModel.cursorRow()).speed, 3).toStdString()
                     + "   (starter: resolution " + std::to_string(p->resolution) + ")";
            } else {
                s += "   resolution " + std::to_string(p->resolution) + "   speed x" + juce::String(p->speed, 3).toStdString() + (p->cycles > 0 ? "   cycles " + std::to_string(p->cycles) : "   loop");
            }
        }
        s += "   bpm " + juce::String(mClock.bpm(), 0).toStdString();
        auto it = errors.find({mModel.cursorCol(), mModel.cursorRow()});
        auto line = text(s);
        if (it != errors.end()) {
            return hbox({line, text("   " + it->second.toStdString()) | color(Color::Red)});
        }
        return line;
    }

    Element logPane() {
        auto entries = MemoryLogger::instance().entries();
        Elements rows;
        const size_t first = entries.size() > 6 ? entries.size() - 6 : 0;
        for (size_t i = first; i < entries.size(); ++i) {
            auto row = text(MemoryLogger::format(entries[i]).toStdString());
            if (entries[i].level == MemoryLogger::Level::Error) {
                row |= color(Color::Red);
            } else if (entries[i].level == MemoryLogger::Level::Warning) {
                row |= color(Color::Yellow);
            }
            rows.push_back(row);
        }
        if (rows.empty()) {
            rows.push_back(text("(log is empty)") | dim);
        }
        return vbox(std::move(rows));
    }

    static std::string helpText() {
        return " Enter/e edit  Space start  . stop  ! stop all  [ ] res  - = speed  o cycles  < > bpm  c/X/p copy/cut/paste  u undo  "
               "H header  l log  ^S save  q quit";
    }

    void save() {
        if (mFile == juce::File()) {
            mFile = juce::File::getCurrentWorkingDirectory().getChildFile("untitled.descartes");
        }
        mStatus = mFile.replaceWithText(mModel.grid().toXmlString()) ? "saved " + mFile.getFullPathName().toStdString()
                                                                    : "could not write " + mFile.getFullPathName().toStdString();
    }

    TuiModel mModel;
    MidiClock& mClock;
    juce::File mFile;
    juce::String mClipboard;
    std::string mStatus;
    bool mShowLog = false;
    int mRowTop = 0;
    int mColLeft = 0;
};

} // namespace

int main(int argc, char** argv) {
    juce::String portName = "Descartes";
    juce::File file;
    for (int i = 1; i < argc; ++i) {
        const juce::String arg(juce::CharPointer_UTF8(argv[i]));
        if ((arg == "--midi-port" || arg == "-p") && i + 1 < argc) {
            portName = juce::CharPointer_UTF8(argv[++i]);
        } else if (arg == "--help" || arg == "-h") {
            std::printf("usage: descartes_cli [file] [--midi-port NAME]\n"
                        "  Opens a MIDI output called NAME (default \"Descartes\") or creates a virtual port with that name.\n");
            return 0;
        } else {
            file = juce::File::getCurrentWorkingDirectory().getChildFile(arg);
        }
    }

    juce::MessageManager::getInstance(); // juce::Timer / async helpers need one; no loop is run
    int result = 0;
    {
        MemoryLogger::instance().install();
        Engine engine;

        if (file != juce::File() && file.existsAsFile() && !engine.grid().fromXmlString(file.loadFileAsString())) {
            std::fprintf(stderr, "could not read %s\n", file.getFullPathName().toRawUTF8());
            return 1;
        }
        engine.flushGridUpdate();

        MidiClock clock(engine, portName);
        if (!clock.isOpen()) {
            std::fprintf(stderr, "could not open a MIDI output\n");
            result = 1;
        } else {
            auto screen = ScreenInteractive::Fullscreen();
            TuiApp app(engine, clock, file);
            auto root = Renderer([&] { return app.render(); }) | CatchEvent([&](Event e) { return app.handle(e, screen); });

            // Repaint ~25 times per second so the playhead moves.
            std::atomic<bool> running{true};
            std::thread ticker([&] {
                while (running.load()) {
                    std::this_thread::sleep_for(std::chrono::milliseconds(40));
                    screen.PostEvent(Event::Custom);
                }
            });
            screen.Loop(root);
            running.store(false);
            ticker.join();
        }
        MemoryLogger::instance().uninstall();
    }
    juce::MessageManager::deleteInstance();
    return result;
}
