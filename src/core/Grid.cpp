#include "core/Grid.h"

namespace Descartes {

namespace {
const juce::Identifier GridType("Grid");
const juce::Identifier CellsType("Cells");
const juce::Identifier CellType("Cell");
const juce::Identifier HeadersType("Headers");
const juce::Identifier HeaderType("Header");

const juce::Identifier IdProp("id");
const juce::Identifier ColProp("col");
const juce::Identifier RowProp("row");
const juce::Identifier TextProp("text");
const juce::Identifier ResolutionProp("resolution");
const juce::Identifier OnceProp("once");
const juce::Identifier SpeedProp("speed");
const juce::Identifier DestProp("dest");
const juce::Identifier ColsProp("cols");
const juce::Identifier RowsProp("rows");

bool isDefault(const CellProps& p) {
    return p == CellProps{};
}

CellProps readProps(const juce::ValueTree& node) {
    CellProps p;
    p.resolution = juce::jmax(1, (int)node.getProperty(ResolutionProp, p.resolution));
    p.once = (bool)node.getProperty(OnceProp, p.once);
    p.speed = CellProps::clampSpeed((double)node.getProperty(SpeedProp, p.speed));
    return p;
}
} // namespace

Grid::Grid(int numCols, int numRows) : mNumCols(numCols), mNumRows(numRows), mState(GridType) {
    mState.setProperty(ColsProp, mNumCols, nullptr);
    mState.setProperty(RowsProp, mNumRows, nullptr);
    mCells = juce::ValueTree(CellsType);
    mHeaders = juce::ValueTree(HeadersType);
    mState.appendChild(mCells, nullptr);
    mState.appendChild(mHeaders, nullptr);
    mState.addListener(this);
}

Grid::~Grid() {
    mState.removeListener(this);
}

juce::ValueTree Grid::findCell(int col, int row) const {
    return mCells.getChildWithProperty(IdProp, cellId(col, row));
}

juce::ValueTree Grid::findHeader(int col) const {
    return mHeaders.getChildWithProperty(ColProp, col);
}

juce::String Grid::cell(int col, int row) const {
    return findCell(col, row).getProperty(TextProp).toString();
}

CellProps Grid::props(int col, int row) const {
    auto node = findCell(col, row);
    return node.isValid() ? readProps(node) : CellProps{};
}

bool Grid::setCell(int col, int row, const juce::String& text) {
    if (!inBounds(col, row)) {
        return false;
    }

    auto node = findCell(col, row);
    if (!node.isValid()) {
        if (text.isEmpty()) {
            return true;
        }
        node = juce::ValueTree(CellType);
        node.setProperty(IdProp, cellId(col, row), nullptr);
        node.setProperty(ColProp, col, nullptr);
        node.setProperty(RowProp, row, nullptr);
        node.setProperty(TextProp, text, nullptr);
        mCells.appendChild(node, &mUndo);
        return true;
    }

    if (text.isEmpty() && isDefault(readProps(node))) {
        mCells.removeChild(node, &mUndo);
    } else {
        node.setProperty(TextProp, text, &mUndo);
    }
    return true;
}

bool Grid::setProps(int col, int row, const CellProps& props) {
    if (!inBounds(col, row)) {
        return false;
    }

    auto node = findCell(col, row);
    if (!node.isValid()) {
        if (isDefault(props)) {
            return true;
        }
        node = juce::ValueTree(CellType);
        node.setProperty(IdProp, cellId(col, row), nullptr);
        node.setProperty(ColProp, col, nullptr);
        node.setProperty(RowProp, row, nullptr);
        node.setProperty(TextProp, juce::String(), nullptr);
        node.setProperty(ResolutionProp, juce::jmax(1, props.resolution), nullptr);
        node.setProperty(OnceProp, props.once, nullptr);
        node.setProperty(SpeedProp, CellProps::clampSpeed(props.speed), nullptr);
        mCells.appendChild(node, &mUndo);
        return true;
    }

    node.setProperty(ResolutionProp, juce::jmax(1, props.resolution), &mUndo);
    node.setProperty(OnceProp, props.once, &mUndo);
    node.setProperty(SpeedProp, CellProps::clampSpeed(props.speed), &mUndo);

    if (node.getProperty(TextProp).toString().isEmpty() && isDefault(readProps(node))) {
        mCells.removeChild(node, &mUndo);
    }
    return true;
}

juce::String Grid::header(int col) const {
    return findHeader(col).getProperty(DestProp).toString();
}

bool Grid::setHeader(int col, const juce::String& destination) {
    if (col < 0 || col >= mNumCols) {
        return false;
    }

    auto node = findHeader(col);
    if (!node.isValid()) {
        if (destination.isEmpty()) {
            return true;
        }
        node = juce::ValueTree(HeaderType);
        node.setProperty(ColProp, col, nullptr);
        node.setProperty(DestProp, destination, nullptr);
        mHeaders.appendChild(node, &mUndo);
    } else if (destination.isEmpty()) {
        mHeaders.removeChild(node, &mUndo);
    } else {
        node.setProperty(DestProp, destination, &mUndo);
    }
    return true;
}

std::unique_ptr<Grid> Grid::clone() const {
    auto copy = std::make_unique<Grid>(mNumCols, mNumRows);
    copy->fromXmlString(toXmlString());
    return copy;
}

bool Grid::undo() {
    return mUndo.undo();
}

bool Grid::redo() {
    return mUndo.redo();
}

juce::String Grid::toXmlString() const {
    if (auto xml = mState.createXml()) {
        return xml->toString();
    }
    return {};
}

bool Grid::fromXmlString(const juce::String& xml) {
    auto parsed = juce::ValueTree::fromXml(xml);
    if (!parsed.hasType(GridType)) {
        return false;
    }
    auto cells = parsed.getChildWithName(CellsType);
    auto headers = parsed.getChildWithName(HeadersType);
    if (!cells.isValid() || !headers.isValid()) {
        return false;
    }

    mState.removeListener(this);
    mUndo.clearUndoHistory();
    mNumCols = juce::jlimit(1, 1024, (int)parsed.getProperty(ColsProp, mNumCols));
    mNumRows = juce::jlimit(1, 100000, (int)parsed.getProperty(RowsProp, mNumRows));
    mState = parsed;
    mCells = cells;
    mHeaders = headers;
    mState.addListener(this);

    mListeners.call(&Listener::gridReset);
    return true;
}

void Grid::notifyFromNode(const juce::ValueTree& node) {
    if (node.hasType(CellType)) {
        const int col = node.getProperty(ColProp);
        const int row = node.getProperty(RowProp);
        mListeners.call(&Listener::cellChanged, col, row);
    } else if (node.hasType(HeaderType)) {
        const int col = node.getProperty(ColProp);
        mListeners.call(&Listener::headerChanged, col);
    }
}

void Grid::valueTreePropertyChanged(juce::ValueTree& tree, const juce::Identifier&) {
    notifyFromNode(tree);
}

void Grid::valueTreeChildAdded(juce::ValueTree&, juce::ValueTree& child) {
    notifyFromNode(child);
}

void Grid::valueTreeChildRemoved(juce::ValueTree&, juce::ValueTree& child, int) {
    notifyFromNode(child);
}

juce::String Grid::columnName(int col) {
    juce::String name;
    for (int n = col; n >= 0; n = n / 26 - 1) {
        name = juce::String::charToString((juce::juce_wchar)('a' + n % 26)) + name;
    }
    return name;
}

juce::String Grid::cellName(int col, int row) {
    return columnName(col) + juce::String(row + 1);
}

std::optional<std::pair<int, int>> Grid::parseCellName(const juce::String& name) {
    auto s = name.trim().toLowerCase();
    int i = 0;
    int col = 0;
    while (i < s.length() && s[i] >= 'a' && s[i] <= 'z') {
        col = col * 26 + (s[i] - 'a' + 1);
        ++i;
    }
    if (i == 0 || i == s.length() || !s.substring(i).containsOnly("0123456789")) {
        return std::nullopt;
    }
    const int rowNumber = s.substring(i).getIntValue();
    if (rowNumber < 1) {
        return std::nullopt;
    }
    return std::make_pair(col - 1, rowNumber - 1);
}

} // namespace Descartes
