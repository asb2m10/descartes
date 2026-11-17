#include "core/MemoryLogger.h"

#include <iostream>

namespace Descartes {

MemoryLogger& MemoryLogger::instance() {
    // Intentionally leaked: logging must stay valid during static destruction.
    static MemoryLogger* logger = new MemoryLogger();
    return *logger;
}

void MemoryLogger::install() {
    const juce::ScopedLock lock(mLock);
    if (mInstallCount++ == 0) {
        mPrevious = juce::Logger::getCurrentLogger();
        juce::Logger::setCurrentLogger(this);
    }
}

void MemoryLogger::uninstall() {
    const juce::ScopedLock lock(mLock);
    if (mInstallCount > 0 && --mInstallCount == 0) {
        if (juce::Logger::getCurrentLogger() == this) {
            juce::Logger::setCurrentLogger(mPrevious);
        }
        mPrevious = nullptr;
    }
}

const char* MemoryLogger::levelName(Level level) {
    switch (level) {
    case Level::Info: return "info";
    case Level::Warning: return "warn";
    case Level::Error: return "error";
    }
    return "info";
}

juce::String MemoryLogger::format(const Entry& e) {
    juce::String s = e.time.formatted("%H:%M:%S") + "." + juce::String(e.time.getMilliseconds()).paddedLeft('0', 3) + " ["
                     + levelName(e.level) + "] ";
    if (e.source.isNotEmpty()) {
        s << e.source << ": ";
    }
    s << e.message;
    if (e.count > 1) {
        s << " (x" << e.count << ")";
    }
    return s;
}

void MemoryLogger::log(Level level, const juce::String& source, const juce::String& message) {
    {
        const juce::ScopedLock lock(mLock);
        if (!mEntries.empty() && mEntries.back().level == level && mEntries.back().source == source && mEntries.back().message == message) {
            ++mEntries.back().count;
            mEntries.back().time = juce::Time::getCurrentTime();
        } else {
            mEntries.push_back({juce::Time::getCurrentTime(), level, source, message, 1});
            while ((int)mEntries.size() > mCapacity) {
                if (mEntries.front().level == Level::Error) {
                    mErrorCount -= mEntries.front().count;
                }
                mEntries.erase(mEntries.begin());
            }
        }
        if (level == Level::Error) {
            ++mErrorCount;
        }
    }

#if JUCE_DEBUG
    std::cout << format({juce::Time::getCurrentTime(), level, source, message, 1}) << std::endl;
#endif
    changed();
}

void MemoryLogger::logMessage(const juce::String& message) {
    log(Level::Info, "juce", message);
}

std::vector<MemoryLogger::Entry> MemoryLogger::entries() const {
    const juce::ScopedLock lock(mLock);
    return mEntries;
}

int MemoryLogger::size() const {
    const juce::ScopedLock lock(mLock);
    return (int)mEntries.size();
}

int MemoryLogger::errorCount() const {
    const juce::ScopedLock lock(mLock);
    return mErrorCount;
}

void MemoryLogger::clear() {
    {
        const juce::ScopedLock lock(mLock);
        mEntries.clear();
        mErrorCount = 0;
    }
    changed();
}

void MemoryLogger::setCapacity(int newCapacity) {
    {
        const juce::ScopedLock lock(mLock);
        mCapacity = juce::jmax(1, newCapacity);
        while ((int)mEntries.size() > mCapacity) {
            if (mEntries.front().level == Level::Error) {
                mErrorCount -= mEntries.front().count;
            }
            mEntries.erase(mEntries.begin());
        }
    }
    changed();
}

juce::String MemoryLogger::text() const {
    juce::StringArray lines;
    for (const auto& e : entries()) {
        lines.add(format(e));
    }
    return lines.joinIntoString("\n");
}

void MemoryLogger::changed() {
    ++mVersion;
    // One pending notification at a time, however many messages arrive meanwhile.
    if (juce::MessageManager::getInstanceWithoutCreating() != nullptr && !mNotifyPending.exchange(true)) {
        juce::MessageManager::callAsync([] { MemoryLogger::instance().notifyListeners(); });
    }
}

void MemoryLogger::notifyListeners() {
    mNotifyPending = false;
    mListeners.call([](Listener& l) { l.logChanged(); });
}

} // namespace Descartes
