#pragma once

#include <juce_core/juce_core.h>
#include <juce_data_structures/juce_data_structures.h>

#include <memory>
#include <optional>
#include <utility>

namespace Descartes {

/** Per-cell properties. They live next to the cell text, never inside it. */
struct CellProps {
    int resolution = 16; ///< number of rows below a starter that belong to its cycle
    int cycles = 0;      ///< 0 loops indefinitely, N >= 1 stops after N cycles
    double speed = 1.0;  ///< cycle speed multiplier: 2 plays the cycle twice as fast, 0.5 half as fast

    static constexpr double MinSpeed = 1.0 / 16.0;
    static constexpr double MaxSpeed = 16.0;
    static double clampSpeed(double s) { return s < MinSpeed ? MinSpeed : (s > MaxSpeed ? MaxSpeed : s); }

    bool operator==(const CellProps&) const = default;
};

/** Sparse grid of Strudel expressions plus a header row of column destinations.

    Coordinates are 0-based (col 0 = "a", row 0 = "1"). Use cellName() / parseCellName() to
    convert to the user-facing "b3" form. All mutations go through a juce::UndoManager and
    listeners are notified from the underlying ValueTree, so undo/redo notify too.

    Message-thread only. Other threads should work from a snapshot (see Layout). */
class Grid : private juce::ValueTree::Listener {
public:
    struct Listener {
        virtual ~Listener() = default;
        virtual void cellChanged(int /*col*/, int /*row*/) {}
        virtual void headerChanged(int /*col*/) {}
        virtual void gridReset() {}
    };

    explicit Grid(int numCols = 8, int numRows = 64);
    ~Grid() override;

    int numCols() const { return mNumCols; }
    int numRows() const { return mNumRows; }
    bool inBounds(int col, int row) const { return col >= 0 && col < mNumCols && row >= 0 && row < mNumRows; }

    // Cells
    juce::String cell(int col, int row) const;
    bool isEmpty(int col, int row) const { return cell(col, row).trim().isEmpty(); }
    CellProps props(int col, int row) const;
    bool setCell(int col, int row, const juce::String& text);
    bool setProps(int col, int row, const CellProps& props);

    // Header (column destinations, e.g. "midi:1")
    juce::String header(int col) const;
    bool setHeader(int col, const juce::String& destination);

    /** The underlying tree, for debugging views. Loading state (fromXmlString) replaces it. */
    juce::ValueTree state() const { return mState; }

    /** Independent copy (no listeners, no undo history), safe to hand to another thread. */
    std::unique_ptr<Grid> clone() const;

    // Undo
    juce::UndoManager& undoManager() { return mUndo; }
    bool undo();
    bool redo();

    // Serialisation
    juce::String toXmlString() const;
    bool fromXmlString(const juce::String& xml);

    // Names
    static juce::String columnName(int col);                           ///< 0 -> "a", 26 -> "aa"
    static juce::String cellName(int col, int row);                    ///< (1, 2) -> "b3"
    static std::optional<std::pair<int, int>> parseCellName(const juce::String& name); ///< "b3" -> (1, 2)

    void addListener(Listener* l) { mListeners.add(l); }
    void removeListener(Listener* l) { mListeners.remove(l); }

private:
    static int cellId(int col, int row) { return col * 100000 + row; }

    juce::ValueTree findCell(int col, int row) const;
    juce::ValueTree findHeader(int col) const;
    void notifyFromNode(const juce::ValueTree& node);

    void valueTreePropertyChanged(juce::ValueTree& tree, const juce::Identifier&) override;
    void valueTreeChildAdded(juce::ValueTree& parent, juce::ValueTree& child) override;
    void valueTreeChildRemoved(juce::ValueTree& parent, juce::ValueTree& child, int) override;

    int mNumCols;
    int mNumRows;
    juce::ValueTree mState;
    juce::ValueTree mCells;
    juce::ValueTree mHeaders;
    juce::UndoManager mUndo;
    juce::ListenerList<Listener> mListeners;
};

} // namespace Descartes
