#include "cli/MidiClock.h"

namespace Descartes {

MidiClock::MidiClock(Engine& engine, const juce::String& portName) : juce::Thread("descartes clock"), mEngine(engine) {
    for (const auto& device : juce::MidiOutput::getAvailableDevices()) {
        if (device.name == portName) {
            mOutput = juce::MidiOutput::openDevice(device.identifier);
            mDescription = device.name;
            break;
        }
    }
    if (mOutput == nullptr) {
        mOutput = juce::MidiOutput::createNewDevice(portName);
        mDescription = portName + " (virtual)";
    }

    mEngine.prepare(SampleRate);
    startThread(juce::Thread::Priority::highest);
}

MidiClock::~MidiClock() {
    stopThread(2000);
    if (mOutput != nullptr) {
        juce::MidiBuffer off;
        mEngine.panic(off);
        mOutput->sendBlockOfMessagesNow(off);
    }
}

void MidiClock::run() {
    auto last = juce::Time::getMillisecondCounterHiRes();
    double carry = 0.0; // fractional samples

    while (!threadShouldExit()) {
        wait(1);
        const auto now = juce::Time::getMillisecondCounterHiRes();
        carry += (now - last) * 0.001 * SampleRate;
        last = now;
        const int numSamples = (int)carry;
        if (numSamples <= 0) {
            continue;
        }
        carry -= numSamples;

        mEngine.transport().setInternalBpm(mBpm.load());

        const HostTime host; // no position: the transport free-runs on its internal clock

        juce::MidiBuffer midi;
        mEngine.renderBlock(host, numSamples, midi);
        if (!midi.isEmpty() && mOutput != nullptr) {
            mOutput->sendBlockOfMessagesNow(midi);
        }
    }
}

} // namespace Descartes
