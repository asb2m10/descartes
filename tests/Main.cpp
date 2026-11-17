#include <juce_gui_basics/juce_gui_basics.h>

#include <cstdio>

int main() {
    juce::ScopedJuceInitialiser_GUI gui; // message manager for component and timer tests

    juce::UnitTestRunner runner;
    runner.runAllTests();

    int failures = 0;
    for (int i = 0; i < runner.getNumResults(); ++i) {
        failures += runner.getResult(i)->failures;
    }
    std::printf("%d test group(s), %d failure(s)\n", runner.getNumResults(), failures);
    return failures == 0 ? 0 : 1;
}
