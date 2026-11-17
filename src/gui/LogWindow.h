#pragma once

#include "core/MemoryLogger.h"

#include <juce_gui_basics/juce_gui_basics.h>

#include <functional>

namespace Descartes {

/** Floating window that browses the MemoryLogger: time, level, source and message, with a level
    filter, Clear and Copy. Clicking a row whose source is a cell name (for example "b3") calls
    onSelectCell so the grid can jump to it. */
class LogWindow : public juce::DocumentWindow {
public:
    LogWindow();
    ~LogWindow() override;

    std::function<void(int col, int row)> onSelectCell;

    /** Shows the window (raises it when it is already open). */
    void show();

    void closeButtonPressed() override { setVisible(false); }

    /** Number of rows currently listed (after filtering). For tests. */
    int numVisibleRows() const;

private:
    class Content;
    Content* mContent = nullptr;
};

} // namespace Descartes
