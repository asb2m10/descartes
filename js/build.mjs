// Bundles Strudel core + mini + transpiler into ../resources/strudel-bundle.js.
// Strudel packages are resolved from the npm registry (js/node_modules).
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [path.join(here, 'entry.mjs')],
  outfile: path.join(here, '..', 'resources', 'strudel-bundle.js'),
  bundle: true,
  format: 'iife',
  target: 'es2020',
  platform: 'neutral',
  mainFields: ['module', 'main'],
  nodePaths: [path.join(here, 'node_modules')],
  logLevel: 'info',
});
