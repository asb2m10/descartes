#pragma once

#include <juce_core/juce_core.h>
#include <juce_events/juce_events.h>

#include <atomic>
#include <vector>

namespace Descartes {

/** The single sink for everything worth telling the user: engine console output, cell compile
    errors, scheduler warnings, state restore failures.

    Entries live in a bounded ring buffer. A new entry identical to the previous one (same level,
    source and message) only bumps that entry's repeat count, so a bad cell that fails on every
    lookahead query cannot flush the history. Thread safe, but never call it from processBlock
    (it locks and allocates). Listeners are notified on the message thread.

    install() makes it the global juce::Logger (juce::Logger::writeToLog ends up here as an Info
    entry with source "juce"). Installation is reference counted and restores the previous logger,
    because a plugin shares its process with the host and with other instances. Note that DBG()
    does not go through the global logger in JUCE; use the helpers below. */
class MemoryLogger final : public juce::Logger {
public:
    enum class Level { Info, Warning, Error };

    struct Entry {
        juce::Time time;
        Level level = Level::Info;
        juce::String source;
        juce::String message;
        int count = 1; ///< how many identical consecutive messages this entry stands for
    };

    struct Listener {
        virtual ~Listener() = default;
        virtual void logChanged() = 0; ///< message thread
    };

    static constexpr int DefaultCapacity = 1024;

    static MemoryLogger& instance();

    void install();
    void uninstall();

    void log(Level level, const juce::String& source, const juce::String& message);
    static void info(const juce::String& source, const juce::String& message) { instance().log(Level::Info, source, message); }
    static void warn(const juce::String& source, const juce::String& message) { instance().log(Level::Warning, source, message); }
    static void error(const juce::String& source, const juce::String& message) { instance().log(Level::Error, source, message); }

    std::vector<Entry> entries() const;
    int size() const;           ///< number of entries (folded duplicates count once)
    int errorCount() const;     ///< number of Error messages, duplicates included
    unsigned int version() const { return mVersion.load(); } ///< bumps on every change
    void clear();
    void setCapacity(int newCapacity);

    /** All entries as text, one per line: "12:30:01.123 [error] b3: message (x3)". */
    juce::String text() const;
    static juce::String format(const Entry& entry);
    static const char* levelName(Level level);

    void addListener(Listener* l) { mListeners.add(l); }
    void removeListener(Listener* l) { mListeners.remove(l); }

private:
    MemoryLogger() = default;
    ~MemoryLogger() override = default;

    void logMessage(const juce::String& message) override;
    void notifyListeners();
    void changed();

    mutable juce::CriticalSection mLock;
    std::vector<Entry> mEntries;
    int mCapacity = DefaultCapacity;
    int mErrorCount = 0;
    int mInstallCount = 0;
    juce::Logger* mPrevious = nullptr;
    std::atomic<unsigned int> mVersion{0};
    std::atomic<bool> mNotifyPending{false};
    juce::ListenerList<Listener> mListeners;

    JUCE_DECLARE_NON_COPYABLE(MemoryLogger)
};

} // namespace Descartes
