/**
 * Krok 1: odstranit pozadí (imgly) → dočasný PNG bez sharp.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { removeBackground } from '@imgly/background-removal-node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const WEBOBEC = path.resolve(PROJECT_ROOT, '..');
const SRC_DIR = path.join(WEBOBEC, 'fofo kandidatu', 'foto kandidatu final');
const TMP = path.join(PROJECT_ROOT, '.tmp-photo-kandidati', 'michal-andrysek.nobg.png');

function findAndrysekFile() {
  const files = fs.readdirSync(SRC_DIR);
  const hit = files.find((f) => {
    const key = f.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
    return key.includes('michal') && key.includes('andrysek') && /\.(jpe?g|png|webp)$/i.test(f);
  });
  if (!hit) throw new Error('Michal Andrýsek nenalezen');
  return path.join(SRC_DIR, hit);
}

const inputPath = findAndrysekFile();
console.log('Zdroj:', inputPath);
fs.mkdirSync(path.dirname(TMP), { recursive: true });

const inputBuf = fs.readFileSync(inputPath);
const ext = path.extname(inputPath).toLowerCase();
const mime =
  ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
const inputBlob = new Blob([inputBuf], { type: mime });
console.log('Odstraňuji pozadí…');
const cutout = await removeBackground(inputBlob, {
  model: 'medium',
  output: { format: 'image/png', quality: 1 },
});
const cutoutBuf = Buffer.from(await cutout.arrayBuffer());
fs.writeFileSync(TMP, cutoutBuf);
console.log('Uloženo:', TMP);
