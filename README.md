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
- Ctrl+Enter starts a cycle, and a running cycle can trigger the starter on its right (horizontal chaining).

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
