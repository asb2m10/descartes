#include "core/DestinationRegistry.h"
#include "core/EventQueue.h"
#include "core/Player.h"
#include "core/Scheduler.h"
#include "core/Transport.h"

#include <juce_core/juce_core.h>

#include <cmath>

using namespace Descartes;

namespace {
ScheduledNote note(double begin, double end, int column, int midi, unsigned epoch = 0, float vel = 1.0f) {
    ScheduledNote n;
    n.begin = begin;
    n.end = end;
    n.column = column;
    n.note = midi;
    n.velocity = vel;
    n.epoch = epoch;
    return n;
}

struct Msg {
    int offset;
    juce::MidiMessage message;
};

std::vector<Msg> collect(const juce::MidiBuffer& buffer) {
    std::vector<Msg> out;
    for (auto meta : buffer) {
        out.push_back({meta.samplePosition, meta.getMessage()});
    }
    return out;
}
} // namespace

struct TransportTests : public juce::UnitTest {
    TransportTests() : juce::UnitTest("Transport", "descartes") {}

    void runTest() override {
        beginTest("internal clock free-runs at the internal tempo");
        Transport t;
        t.prepare(48000.0);
        t.setInternalBpm(120.0); // 2 beats/s, 4 beats/cycle -> 0.5 cycles/s
        auto b = t.advance({}, 48000);
        expect(b.playing);
        expect(b.discontinuity); // first block
        expectWithinAbsoluteError(b.beginCycle, 0.0, 1e-12);
        expectWithinAbsoluteError(b.endCycle, 0.5, 1e-9);
        auto b2 = t.advance({}, 48000);
        expect(!b2.discontinuity);
        expectWithinAbsoluteError(b2.beginCycle, 0.5, 1e-9);

        beginTest("host position maps ppq to cycles using the host tempo");
        Transport h;
        h.prepare(48000.0);
        HostTime ht;
        ht.hasPosition = true;
        ht.playing = true;
        ht.ppq = 8.0;
        ht.bpm = 60.0;
        auto hb = h.advance(ht, 48000); // one second = 1 beat = 0.25 cycle
        expectWithinAbsoluteError(hb.beginCycle, 2.0, 1e-12);
        expectWithinAbsoluteError(hb.endCycle, 2.25, 1e-9);
        expect(hb.discontinuity); // playback just started

        ht.ppq = 9.0;
        auto hb2 = h.advance(ht, 48000);
        expect(!hb2.discontinuity);

        beginTest("jumps and stops are discontinuities");
        ht.ppq = 20.0;
        expect(h.advance(ht, 480).discontinuity);
        ht.playing = false;
        auto stopped = h.advance(ht, 480);
        expect(!stopped.playing);
        expect(stopped.discontinuity);
        expect(!h.advance(ht, 480).discontinuity);
    }
};
static TransportTests sTransportTests;

struct AudioPathTests : public juce::UnitTest {
    AudioPathTests() : juce::UnitTest("AudioPath", "descartes") {}

    void runTest() override {
        beginTest("event queue is FIFO and drops when full");
        {
            auto queue = std::make_unique<EventQueue>();
            expect(queue->peek() == nullptr);
            for (int i = 0; i < 5; ++i) {
                expect(queue->push(note(i, i + 1, 0, 60 + i)));
            }
            expectEquals(queue->numReady(), 5);
            for (int i = 0; i < 5; ++i) {
                expectEquals(queue->peek()->note, 60 + i);
                queue->pop();
            }
            expect(queue->peek() == nullptr);

            int accepted = 0;
            while (queue->push(note(0, 1, 0, 60))) {
                ++accepted;
            }
            expectEquals(accepted, EventQueue::Capacity - 1);
        }

        beginTest("registry parses destinations");
        {
            DestinationRegistry reg;
            expect(reg.resolve("midi:3") != nullptr);
            expect(reg.resolve(" MIDI:16 ") != nullptr);
            expect(reg.resolve("midi") != nullptr);
            expect(reg.resolve("midi:0") == nullptr);
            expect(reg.resolve("midi:17") == nullptr);
            expect(reg.resolve("midi:x") == nullptr);
            expect(reg.resolve("osc:/a") == nullptr);
            reg.setColumn(1, "midi:2");
            expect(reg.sinkFor(1) == reg.resolve("midi:2"));
            expect(reg.sinkFor(0) == nullptr);
            reg.setColumn(1, "nonsense");
            expect(reg.sinkFor(1) == nullptr);
        }

        beginTest("player sends note-on / note-off at the right sample offsets and channel");
        {
            auto queue = std::make_unique<EventQueue>();
            DestinationRegistry reg;
            reg.setColumn(1, "midi:2");

            // 1 cycle = 480 samples; block = [0, 1) cycle
            TransportBlock block;
            block.playing = true;
            block.beginCycle = 0.0;
            block.endCycle = 1.0;
            block.cyclesPerSample = 1.0 / 480.0;

            queue->push(note(0.5, 0.75, 1, 48, 0, 0.5f));
            queue->push(note(1.5, 1.75, 1, 50)); // later block
            juce::MidiBuffer midi;
            Player::process(block, 0, 480, *queue, reg, midi);

            auto msgs = collect(midi);
            expectEquals((int)msgs.size(), 2);
            if (msgs.size() == 2) {
                expect(msgs[0].message.isNoteOn());
                expectEquals(msgs[0].offset, 240);
                expectEquals(msgs[0].message.getChannel(), 2);
                expectEquals((int)msgs[0].message.getNoteNumber(), 48);
                expectEquals((int)msgs[0].message.getVelocity(), 64);
                expect(msgs[1].message.isNoteOff());
                expectEquals(msgs[1].offset, 360);
            }
            expectEquals(queue->numReady(), 1);

            // The note that ends in the next block gets its note-off there.
            block.beginCycle = 1.0;
            block.endCycle = 2.0;
            midi.clear();
            Player::process(block, 0, 480, *queue, reg, midi);
            msgs = collect(midi);
            expectEquals((int)msgs.size(), 2);
            if (msgs.size() == 2) {
                expectEquals(msgs[0].offset, 240);
                expectEquals(msgs[1].offset, 360);
            }
        }

        beginTest("a note that ends in a later block is released there");
        {
            auto queue = std::make_unique<EventQueue>();
            DestinationRegistry reg;
            reg.setColumn(0, "midi:1");
            TransportBlock block;
            block.playing = true;
            block.beginCycle = 0.0;
            block.endCycle = 1.0;
            block.cyclesPerSample = 1.0 / 480.0;
            queue->push(note(0.9, 1.25, 0, 60));
            juce::MidiBuffer midi;
            Player::process(block, 0, 480, *queue, reg, midi);
            expectEquals((int)collect(midi).size(), 1);

            block.beginCycle = 1.0;
            block.endCycle = 2.0;
            midi.clear();
            Player::process(block, 0, 480, *queue, reg, midi);
            auto msgs = collect(midi);
            expectEquals((int)msgs.size(), 1);
            if (!msgs.empty()) {
                expect(msgs[0].message.isNoteOff());
                expectEquals(msgs[0].offset, 120);
            }
        }

        beginTest("late notes play at offset 0; unrouted columns are dropped; stale epochs are ignored");
        {
            auto queue = std::make_unique<EventQueue>();
            DestinationRegistry reg;
            reg.setColumn(0, "midi:1");
            TransportBlock block;
            block.playing = true;
            block.beginCycle = 5.0;
            block.endCycle = 6.0;
            block.cyclesPerSample = 1.0 / 480.0;

            queue->push(note(4.9, 5.1, 0, 60, 1));  // late
            queue->push(note(5.2, 5.4, 3, 61, 1));  // no sink on column 3
            queue->push(note(5.3, 5.4, 0, 62, 0));  // stale epoch
            juce::MidiBuffer midi;
            Player::process(block, 1, 480, *queue, reg, midi);
            auto msgs = collect(midi);
            expectEquals((int)msgs.size(), 2); // on + off of note 60
            if (!msgs.empty()) {
                expectEquals(msgs[0].offset, 0);
                expectEquals((int)msgs[0].message.getNoteNumber(), 60);
            }
            expectEquals(queue->numReady(), 0);
        }

        beginTest("retriggering a held note releases it first; flush releases everything");
        {
            auto queue = std::make_unique<EventQueue>();
            DestinationRegistry reg;
            reg.setColumn(0, "midi:1");
            TransportBlock block;
            block.playing = true;
            block.beginCycle = 0.0;
            block.endCycle = 1.0;
            block.cyclesPerSample = 1.0 / 480.0;
            queue->push(note(0.1, 5.0, 0, 60));
            queue->push(note(0.5, 5.0, 0, 60));
            juce::MidiBuffer midi;
            Player::process(block, 0, 480, *queue, reg, midi);
            auto msgs = collect(midi);
            expectEquals((int)msgs.size(), 3); // on, off, on
            if (msgs.size() == 3) {
                expect(msgs[0].message.isNoteOn());
                expect(msgs[1].message.isNoteOff());
                expect(msgs[2].message.isNoteOn());
                expectEquals(msgs[1].offset, msgs[2].offset);
            }

            queue->push(note(3.0, 4.0, 0, 61));
            midi.clear();
            Player::flush(*queue, reg, midi);
            msgs = collect(midi);
            expectEquals((int)msgs.size(), 1);
            if (!msgs.empty()) {
                expect(msgs[0].message.isNoteOff());
                expectEquals((int)msgs[0].message.getNoteNumber(), 60);
            }
            expectEquals(queue->numReady(), 0);
        }

        beginTest("velocity and note numbers are clamped to the MIDI range");
        {
            auto queue = std::make_unique<EventQueue>();
            DestinationRegistry reg;
            reg.setColumn(0, "midi:1");
            TransportBlock block;
            block.playing = true;
            block.endCycle = 1.0;
            block.cyclesPerSample = 1.0 / 480.0;
            queue->push(note(0.0, 0.1, 0, 200, 0, 5.0f));
            queue->push(note(0.2, 0.3, 0, -5, 0, 0.0f));
            juce::MidiBuffer midi;
            Player::process(block, 0, 480, *queue, reg, midi);
            for (auto& m : collect(midi)) {
                if (m.message.isNoteOn()) {
                    expect(m.message.getNoteNumber() >= 0 && m.message.getNoteNumber() <= 127);
                    expect(m.message.getVelocity() >= 1 && m.message.getVelocity() <= 127);
                }
            }
        }
    }
};
static AudioPathTests sAudioPathTests;

struct SchedulerTests : public juce::UnitTest {
    SchedulerTests() : juce::UnitTest("Scheduler", "descartes") {}

    void runTest() override {
        beginTest("worker thread generates notes ahead of the transport");
        {
            TransportState state;
            state.cyclesPerSecond.store(2.0);
            state.playing.store(true);
            auto queue = std::make_unique<EventQueue>();

            Scheduler scheduler(state, *queue);
            scheduler.startScheduler();

            Grid grid(4, 64);
            grid.setCell(1, 2, "c3 c4");  // b3
            grid.setCell(1, 6, "e3");     // b7: step 3
            scheduler.setGrid(grid);
            scheduler.requestStart(1, 2);

            std::vector<ScheduledNote> got;
            double now = 0.0;
            for (int i = 0; i < 400 && got.size() < 4; ++i) {
                juce::Thread::sleep(10);
                now += 0.02; // 2 cycles/s -> 10 ms is 0.02 cycles
                state.nowCycle.store(now);
                while (auto* n = queue->peek()) {
                    got.push_back(*n);
                    queue->pop();
                }
            }

            expect(scheduler.isReady(), "bundle failed: " + scheduler.loadError());
            expect(scheduler.cellErrors().empty());
            expect(got.size() >= 4, "expected notes, got " + juce::String((int)got.size()));

            bool c3 = false, c4 = false, e3 = false;
            for (auto& n : got) {
                expectEquals(n.column, 1);
                c3 |= n.note == 48;
                c4 |= n.note == 60;
                e3 |= n.note == 52;
            }
            expect(c3 && c4 && e3, "missing notes");
            for (size_t i = 1; i < got.size(); ++i) {
                expect(got[i - 1].begin <= got[i].begin + 1e-9, "notes out of order");
            }

            expect(scheduler.playheadRow(1) >= 3, "playhead not reported");
            expect(scheduler.cycleTime(1) >= 0.0, "cycle time not reported");
            expect(scheduler.cycleTime(0) < 0.0);
            auto diag = scheduler.diagnostics();
            expect(diag.aheadMs > 0.0, "scheduler should be ahead of the transport, got " + juce::String(diag.aheadMs));
            expect(diag.peakLoopMs > 0.0);
            expectEquals(scheduler.playheadRow(0), -1);

            scheduler.requestStop(1, 2);
            scheduler.stopScheduler();
        }

        beginTest("a transport jump restarts running cycles from the new position");
        {
            TransportState state;
            state.cyclesPerSecond.store(2.0);
            state.playing.store(true);
            auto queue = std::make_unique<EventQueue>();
            Scheduler scheduler(state, *queue);
            scheduler.startScheduler();

            Grid grid(4, 64);
            grid.setCell(1, 2, "c3");
            scheduler.setGrid(grid);
            scheduler.requestStart(1, 2);
            juce::Thread::sleep(200);

            // jump far ahead: bump the epoch first, then publish the new position
            state.epoch.fetch_add(1);
            state.nowCycle.store(100.0);

            double minBegin = 1e9;
            for (int i = 0; i < 300; ++i) {
                juce::Thread::sleep(10);
                state.nowCycle.store(100.0 + 0.02 * (i + 1));
                bool gotNew = false;
                while (auto* n = queue->peek()) {
                    if (n->epoch == 1) {
                        minBegin = std::min(minBegin, n->begin);
                        gotNew = true;
                    }
                    queue->pop();
                }
                if (gotNew) {
                    break;
                }
            }
            expect(minBegin >= 100.0 - 1e-9 && minBegin < 102.0, "restart position wrong: " + juce::String(minBegin));
            scheduler.stopScheduler();
        }
    }
};
static SchedulerTests sSchedulerTests;
