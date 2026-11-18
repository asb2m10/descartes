// Entry point of the bundle evaluated inside juce::JavascriptEngine.
// Exposes top-level functions (descartes_*) so callFunction can reach them.
import Fraction from 'fraction.js';
import * as core from '@strudel/core';
import * as mini from '@strudel/mini';
import { transpiler } from '@strudel/transpiler';

// Make the Strudel API available as globals for cell expressions.
for (const mod of [core, mini]) {
  for (const [name, value] of Object.entries(mod)) {
    globalThis[name] = value;
  }
}
mini.miniAllStrings();

// fraction.js 4 turns a float into a fraction with a step-by-step search that can take tens of
// milliseconds for values like 0.30000000000000004. Window bounds arrive as doubles on every
// scheduler tick, so snap them to a power-of-two grid and build the Fraction from two integers.
// The same double always maps to the same Fraction, so consecutive windows still tile exactly.
const TIME_DEN = 1 << 16;
const toFraction = (x) => new Fraction(Math.round(x * TIME_DEN), TIME_DEN);

// A speed such as 2/3 arrives as a double; handing 0.6666666666666666 to .fast() builds a huge-denominator
// Fraction and stalls the engine. Snap to the nearest ratio with a small denominator instead.
const speedFraction = (x) => {
  let best = new Fraction(Math.round(x), 1);
  for (let den = 1; den <= 16; ++den) {
    const num = Math.round(x * den);
    if (num > 0 && Math.abs(num / den - x) < 1e-9) {
      best = new Fraction(num, den);
      break;
    }
  }
  return best;
};

const patterns = new Map(); // id -> Pattern
const columns = new Map(); // colId -> Pattern

const errorText = (e) => String((e && e.message) || e);

function evalCell(code) {
  const out = transpiler(code, { wrapAsync: false, addReturn: true, emitMiniLocations: false, emitWidgets: false });
  return new Function(out.output)();
}

// Compile a cell expression. Valid JS is evaluated as Strudel code; text that
// is not valid JS (e.g. bare `c3 c4`) is treated as mini-notation notes.
// Returns '' on success or an error message.
globalThis.descartes_compile = (id, code) => {
  try {
    let pat;
    try {
      pat = evalCell(code);
    } catch (e) {
      // Plain mini-notation (`c3 c4`, `c3`, `bd*2 sd`) is not valid JS or references unknown
      // identifiers. Anything that looks like a call or method chain keeps its real error.
      const looksLikeMini = !/\w\s*\(/.test(code);
      const fallbackable = e instanceof SyntaxError || e instanceof ReferenceError || /Unexpected (token|character)/.test(errorText(e));
      if (!(fallbackable && looksLikeMini)) throw e;
      pat = core.note(mini.mini(code));
    }
    if (!core.isPattern(pat)) {
      pat = core.note(mini.mini(String(code)));
    }
    patterns.set(String(id), pat);
    return '';
  } catch (e) {
    patterns.delete(String(id));
    return errorText(e);
  }
};

// Build the pattern of a whole column cycle: the starter, plus step cells each
// squeezed into their 1/N slot. stepsJson = [[stepIndex, cellId, speed], ...]; a step cell's speed is `.fast(speed)` inside its slot
globalThis.descartes_buildColumn = (colId, starterId, stepsJson, resolution) => {
  try {
    const starter = patterns.get(String(starterId));
    if (!starter) return `unknown starter ${starterId}`;
    const n = Math.max(1, resolution | 0);
    const layers = [starter];
    for (const [k, cellId, speed] of JSON.parse(stepsJson)) {
      let p = patterns.get(String(cellId));
      if (!p) continue;
      if (speed != null && speed !== 1) p = p.fast(speedFraction(speed));
      layers.push(p.compress(new Fraction(k, n), new Fraction(k + 1, n)));
    }
    columns.set(String(colId), layers.length === 1 ? starter : core.stack(...layers));
    return '';
  } catch (e) {
    return errorText(e);
  }
};

const toMidi = (v) => {
  if (v == null) return null;
  if (typeof v === 'object') {
    if (v.note != null) return toMidi(v.note);
    if (v.n != null && typeof v.n === 'number') return v.n;
    return null;
  }
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && core.isNote(v)) return core.noteToMidi(v);
  return null;
};

// Flat array, stride 4: [begin, end, midi, velocity, ...] for haps with an onset.
globalThis.descartes_query = (colId, begin, end) => {
  const pat = columns.get(String(colId));
  const out = [];
  if (!pat) return out;
  for (const hap of pat.queryArc(toFraction(begin), toFraction(end))) {
    if (!hap.hasOnset()) continue;
    const midi = toMidi(hap.value);
    if (midi == null) continue;
    const vel = typeof hap.value === 'object' && hap.value != null ? (hap.value.velocity ?? hap.value.gain ?? 1) : 1;
    out.push(hap.whole.begin.valueOf(), hap.whole.end.valueOf(), midi, Number(vel));
  }
  return out;
};
