#pragma once

#include "core/Event.h"

#include <juce_core/juce_core.h>

#include <array>

namespace Descartes {

/** Lock-free single-producer / single-consumer queue of notes (scheduler thread -> audio thread).
    The consumer can peek at the next note before deciding to take it. */
class EventQueue {
public:
    static constexpr int Capacity = 8192;

    /** Producer side. Returns false when full (the note is dropped). */
    bool push(const ScheduledNote& note) {
        int s1, n1, s2, n2;
        mFifo.prepareToWrite(1, s1, n1, s2, n2);
        if (n1 == 0) {
            return false;
        }
        mData[(size_t)s1] = note;
        mFifo.finishedWrite(1);
        return true;
    }

    /** Consumer side. Valid until the next pop(). */
    const ScheduledNote* peek() const {
        int s1, n1, s2, n2;
        mFifo.prepareToRead(1, s1, n1, s2, n2);
        return n1 > 0 ? &mData[(size_t)s1] : nullptr;
    }

    void pop() {
        int s1, n1, s2, n2;
        mFifo.prepareToRead(1, s1, n1, s2, n2);
        if (n1 > 0) {
            mFifo.finishedRead(1);
        }
    }

    int numReady() const { return mFifo.getNumReady(); }

private:
    mutable juce::AbstractFifo mFifo{Capacity};
    std::array<ScheduledNote, Capacity> mData{};
};

} // namespace Descartes
