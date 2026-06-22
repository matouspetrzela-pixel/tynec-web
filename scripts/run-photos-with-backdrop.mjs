/**
 * Wrapper: nastaví PORTRAIT_BACKDROP a spustí hlavní zpracování fotografií kandidátů.
 *
 * Použití:
 *   node scripts/run-photos-with-backdrop.mjs wave
 *   npm run photos:kandidati:backdrop -- slate
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mainScript = path.join(__dirname, 'process-candidate-photos.mjs');

/** Výchozí „mist“ — jinak zadej jako první argument (wave, warm, slate, aurora). */
const presetArg = (process.argv[2] ?? 'mist').trim().toLowerCase();

const r = spawnSync(process.execPath, [mainScript, ...process.argv.slice(3)], {
  cwd: path.join(__dirname, '..'),
  env: { ...process.env, PORTRAIT_BACKDROP: presetArg },
  stdio: 'inherit',
});

if (r.status === null && r.error) {
  console.error(String(r.error));
  process.exit(1);
}

process.exit(r.status ?? 1);
