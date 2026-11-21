# Descartes

Descartes sequences [Strudel](https://strudel.cc) patterns placed on a free 2D grid, in the spirit of
Orca (free placement) and trackers (vertical chaining). It is built with JUCE and ships as an audio
plugin (MIDI effect) and a standalone app.

Strudel is only used to build and query patterns. Timing, scheduling and output happen in C++.

This is WIP but in same paste from my previous project bartos, mxdublin and glasgow.

## How it works

- The grid holds one Strudel expression per cell. Each column has a destination (for example `midi:1`).
- A non-empty cell is a *starter*. It owns the next N rows (its resolution), and cells in that range
  play inside their own step.
- Space starts (and stops) a cycle, and a running cycle can trigger the starter on its right (horizontal chaining).

## Keybindings

The plugin/standalone GUI and the text UI (`descartes_cli`) share one keymap. A plain key navigates,
edits, or toggles play; every other command is `Ctrl+<key>`.

| Key | Action |
|---|---|
| Arrows, Tab / Shift+Tab, PageUp/PageDown, Home/End | Move the cursor (Shift+arrows extend the selection) |
| Any letter, digit or printable character | Start editing the cell, replacing its text |
| Enter, F2 | Edit the cell, keeping its text |
| Space (not editing) | Start the cycle at the cursor, or stop it if it is running |
| Delete, Backspace | Clear the selection |
| Enter / Escape (editing) | Commit and move down / cancel |
| Ctrl+Z / Ctrl+Y | Undo / redo (the GUI also accepts Ctrl+Shift+Z) |
| Ctrl+C / Ctrl+X / Ctrl+V | Copy / cut / paste (markdown table) |
| Ctrl+A | Select all |
| Ctrl+K | Stop all cycles |
| Ctrl+E | Edit the destination header of the cursor column |
| Ctrl+L | Show / hide the log |
| Ctrl+S / Ctrl+Q | Save / quit (text UI only) |
| Ctrl+D | Value tree debugger (GUI only) |
| Ctrl+Left / Right | Resolution down / up (text UI; the GUI uses the properties panel) |
| Ctrl+Down / Up | Speed down / up (text UI; the GUI uses the properties panel) |
| Ctrl+O | Next cycles preset, 0 = loop (text UI; the GUI uses the properties panel) |
| Ctrl+G / Ctrl+T | BPM down / up (text UI internal clock only) |

Terminals cannot distinguish Ctrl+Enter, Ctrl+Space or Ctrl+Shift+Z from the plain key, which is why
Space starts cycles and redo is Ctrl+Y. The full spec is in [docs/PLAN.md](docs/PLAN.md).

## Building

Requirements: CMake 3.22+, a C++20 compiler, Node.js and npm.

```sh
git clone --recurse-submodules <repo-url>   # fetches JUCE
cd descartes/js && npm install && npm run build   # bundles Strudel into resources/strudel-bundle.js
cd .. && cmake -B build && cmake --build build -j
```

Strudel (`@strudel/core`, `@strudel/mini`, `@strudel/transpiler`) comes from npm. The tests are the
`descartes_tests` target.

## License

Descartes is licensed under the [GNU Affero General Public License v3.0](LICENSE) or later.
It bundles Strudel, which is also AGPL-3.0, and uses [JUCE](https://juce.com).
