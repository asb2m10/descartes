cmake_minimum_required(VERSION 3.22)

project(Descartes VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_subdirectory(libs/JUCE)

# ---------------------------------------------------------------------------
# descartes_core: GUI-free model + engine (shared by plugin, tests, future CLI)
# ---------------------------------------------------------------------------
juce_add_binary_data(descartes_js NAMESPACE DescartesJs SOURCES resources/strudel-bundle.js)

add_library(descartes_core STATIC
    src/core/Event.h
    src/core/Core.h
    src/core/Core.cpp
    src/core/StrudelEngine.h
    src/core/StrudelEngine.cpp
    src/core/StrudelBundle.h
    src/core/StrudelBundle.cpp
    src/core/Grid.h
    src/core/Grid.cpp
    src/core/Layout.h
    src/core/Layout.cpp
    src/core/PatternProvider.h
    src/core/Session.h
    src/core/Session.cpp
    src/core/PatternBuilder.h
    src/core/PatternBuilder.cpp
    src/core/Transport.h
    src/core/Transport.cpp
    src/core/EventQueue.h
    src/core/EventSink.h
    src/core/MidiSink.h
    src/core/MidiSink.cpp
    src/core/DestinationRegistry.h
    src/core/DestinationRegistry.cpp
    src/core/Player.h
    src/core/Player.cpp
    src/core/Scheduler.h
    src/core/Scheduler.cpp
    src/core/MemoryLogger.h
    src/core/MemoryLogger.cpp
    src/core/GridClipboard.h
    src/core/GridClipboard.cpp
)

set_target_properties(descartes_core PROPERTIES POSITION_INDEPENDENT_CODE ON)

target_include_directories(descartes_core PUBLIC src)

target_compile_definitions(descartes_core PUBLIC
    JUCE_WEB_BROWSER=0
    JUCE_USE_CURL=0
)

target_link_libraries(descartes_core
    PUBLIC
        juce::juce_core
        juce::juce_events
        juce::juce_data_structures
        juce::juce_audio_basics
        juce::juce_javascript
    PRIVATE
        descartes_js
        juce::juce_recommended_config_flags
        juce::juce_recommended_warning_flags
)

# ---------------------------------------------------------------------------
# Plugin (MIDI effect + Standalone)
# ---------------------------------------------------------------------------
juce_add_plugin(Descartes
    COMPANY_NAME "Digital Suburban"
    BUNDLE_ID "com.digitalsuburban.Descartes"
    PLUGIN_MANUFACTURER_CODE DGSB
    PLUGIN_CODE DSC1
    FORMATS VST3 Standalone
    PRODUCT_NAME "Descartes"
    IS_SYNTH FALSE
    EDITOR_WANTS_KEYBOARD_FOCUS TRUE
    COPY_PLUGIN_AFTER_BUILD TRUE
    NEEDS_MIDI_INPUT FALSE
    NEEDS_MIDI_OUTPUT TRUE
    IS_MIDI_EFFECT TRUE
)

target_sources(Descartes PRIVATE
    src/plugin/PluginProcessor.cpp
    src/plugin/PluginEditor.cpp
    src/gui/GridHost.h
    src/gui/GridComponent.h
    src/gui/GridComponent.cpp
    src/gui/PropertiesPanel.h
    src/gui/PropertiesPanel.cpp
    src/gui/LogWindow.h
    src/gui/LogWindow.cpp
    src/gui/ValueTreeDebugger.h
    src/gui/ValueTreeDebugger.cpp
)

target_compile_definitions(Descartes PUBLIC
    JUCE_VST3_CAN_REPLACE_VST2=0
    JUCE_DISPLAY_SPLASH_SCREEN=0
)

target_link_libraries(Descartes
    PRIVATE
        descartes_core
        juce::juce_audio_utils
    PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags
)

# ---------------------------------------------------------------------------
# Tests (console app, no GUI)
# ---------------------------------------------------------------------------
juce_add_console_app(descartes_tests PRODUCT_NAME "descartes_tests")

target_sources(descartes_tests PRIVATE
    tests/Main.cpp
    tests/PluginSmokeTests.cpp
    src/plugin/PluginProcessor.cpp
    src/plugin/PluginEditor.cpp
    src/gui/GridComponent.cpp
    src/gui/PropertiesPanel.cpp
    src/gui/LogWindow.cpp
    src/gui/ValueTreeDebugger.cpp
    tests/StrudelEngineTests.cpp
    tests/GridTests.cpp
    tests/SessionTests.cpp
    tests/AudioPathTests.cpp
    tests/GuiTests.cpp
    tests/M7Tests.cpp
    tests/ProfileTests.cpp
)

# Tests pump the message loop (timers, async updates) with runDispatchLoopUntil.
target_compile_definitions(descartes_tests PRIVATE JUCE_MODAL_LOOPS_PERMITTED=1)

target_link_libraries(descartes_tests
    PRIVATE
        descartes_core
        juce::juce_audio_utils
    PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_warning_flags
)

enable_testing()
add_test(NAME descartes_tests COMMAND descartes_tests)

# Third-party debugging helper (MIT, Credland Technical): keep its warnings out of our build output.
set_source_files_properties(src/gui/ValueTreeDebugger.cpp PROPERTIES COMPILE_OPTIONS "-w")
