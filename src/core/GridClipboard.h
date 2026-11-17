#pragma once

#include "core/Grid.h"

#include <vector>

namespace Descartes {

/** Inclusive rectangle of cells (0-based). */
struct CellRect {
    int col0 = 0;
    int row0 = 0;
    int col1 = 0;
    int row1 = 0;

    int numCols() const { return col1 - col0 + 1; }
    int numRows() const { return row1 - row0 + 1; }
    bool contains(int col, int row) const { return col >= col0 && col <= col1 && row >= row0 && row <= row1; }
    bool operator==(const CellRect&) const = default;
};

/** Text form of a block of cells, used for the system clipboard. GUI-free.

    Copy produces a markdown table (header line with column names, separator, one line per row)
    so the text can be reused in notes and docs. Only the cell expressions travel, never cell
    properties. Paste accepts such a table, tab-separated text (spreadsheets), or plain lines. */
namespace GridClipboard {

using Block = std::vector<std::vector<juce::String>>; ///< rows of cells

/** "| b | c |\n| --- | --- |\n| c3 | e3 |"; `\` and `|` inside cells are escaped. */
juce::String toMarkdown(const Grid& grid, const CellRect& rect);

/** Parses clipboard text into rows of cells. Empty for blank input. */
Block fromText(const juce::String& text);

} // namespace GridClipboard

} // namespace Descartes
