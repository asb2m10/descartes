#include "core/GridClipboard.h"

namespace Descartes::GridClipboard {

namespace {

juce::String escapeCell(const juce::String& text) {
    return text.replace("\\", "\\\\").replace("|", "\\|");
}

/** Splits one markdown table line into trimmed, unescaped cells. Returns false if it is not a table line. */
bool parseMarkdownRow(const juce::String& line, std::vector<juce::String>& cells) {
    const auto trimmed = line.trim();
    if (!trimmed.startsWithChar('|')) {
        return false;
    }

    cells.clear();
    juce::String current;
    const auto chars = trimmed.toUTF32();
    const int n = (int)trimmed.length();
    bool closed = false;
    for (int i = 1; i < n; ++i) {
        const auto c = chars[i];
        if (c == '\\' && i + 1 < n && (chars[i + 1] == '|' || chars[i + 1] == '\\')) {
            current += juce::String::charToString(chars[++i]);
        } else if (c == '|') {
            cells.push_back(current.trim());
            current.clear();
            closed = i == n - 1;
        } else {
            current += juce::String::charToString(c);
            closed = false;
        }
    }
    if (!closed && current.trim().isNotEmpty()) {
        cells.push_back(current.trim()); // the line did not end with a pipe
    }
    return true;
}

bool isSeparatorRow(const std::vector<juce::String>& cells) {
    if (cells.empty()) {
        return false;
    }
    for (const auto& c : cells) {
        if (c.isEmpty() || !c.containsOnly(":-") || !c.containsChar('-')) {
            return false;
        }
    }
    return true;
}

} // namespace

juce::String toMarkdown(const Grid& grid, const CellRect& rect) {
    juce::StringArray lines;

    juce::String header = "|";
    juce::String separator = "|";
    for (int col = rect.col0; col <= rect.col1; ++col) {
        header << " " << Grid::columnName(col) << " |";
        separator << " --- |";
    }
    lines.add(header);
    lines.add(separator);

    for (int row = rect.row0; row <= rect.row1; ++row) {
        juce::String line = "|";
        for (int col = rect.col0; col <= rect.col1; ++col) {
            const auto text = escapeCell(grid.cell(col, row).trim());
            line << " " << text << (text.isEmpty() ? "|" : " |");
        }
        lines.add(line);
    }
    return lines.joinIntoString("\n");
}

Block fromText(const juce::String& text) {
    auto lines = juce::StringArray::fromLines(text);
    while (lines.size() > 0 && lines[lines.size() - 1].trim().isEmpty()) {
        lines.remove(lines.size() - 1);
    }

    Block block;
    if (lines.isEmpty()) {
        return block;
    }

    std::vector<juce::String> cells;
    if (lines.size() >= 2 && parseMarkdownRow(lines[1], cells) && isSeparatorRow(cells)) {
        for (int i = 2; i < lines.size(); ++i) {
            if (parseMarkdownRow(lines[i], cells)) {
                block.push_back(cells);
            }
        }
        return block;
    }

    for (const auto& line : lines) {
        std::vector<juce::String> row;
        int start = 0;
        for (;;) {
            const int tab = line.indexOfChar(start, '\t');
            row.push_back(line.substring(start, tab < 0 ? line.length() : tab).trim());
            if (tab < 0) {
                break;
            }
            start = tab + 1;
        }
        block.push_back(std::move(row));
    }
    return block;
}

} // namespace Descartes::GridClipboard
