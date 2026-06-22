/**
 * Krok 2: složit studiové pozadí + výřez (sharp) → náhled + webp.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const WEBOBEC = path.resolve(PROJECT_ROOT, '..');
const SRC_DIR = path.join(WEBOBEC, 'fofo kandidatu', 'foto kandidatu final');
const NOBG = path.join(PROJECT_ROOT, '.tmp-photo-kandidati', 'michal-andrysek.nobg.png');
const OUT_PREVIEW = path.join(SRC_DIR, 'Michal Andrysek - studio test.jpg');
const OUT_WEBP = path.join(PROJECT_ROOT, 'public', 'images', 'kandidati', 'michal-andrysek.webp');

function findAndrysekFile() {
  const files = fs.readdirSync(SRC_DIR);
  const hit = files.find((f) => {
    const key = f.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
    return key.includes('michal') && key.includes('andrysek') && /\.(jpe?g|png|webp)$/i.test(f);
  });
  if (!hit) throw new Error('Michal Andrýsek nenalezen');
  return path.join(SRC_DIR, hit);
}

function studioGreySvg(w, h) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="studio" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="#b8bcc2"/>
      <stop offset="55%" stop-color="#9a9fa8"/>
      <stop offset="100%" stop-color="#7d828a"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#studio)"/>
</svg>`;
}

if (!fs.existsSync(NOBG)) {
  throw new Error(`Chybí ${NOBG} — nejdřív spusť test-andrysek-step1-nobg.mjs`);
}

const inputPath = findAndrysekFile();
const rotMeta = await sharp(inputPath).rotate().metadata();
const rw = rotMeta.width ?? 1;
const rh = rotMeta.height ?? 1;

let fg = await sharp(NOBG).ensureAlpha().png().toBuffer();
const fgMeta = await sharp(fg).metadata();
if (fgMeta.width !== rw || fgMeta.height !== rh) {
  fg = await sharp(fg).resize(rw, rh, { fit: 'fill' }).png().toBuffer();
}

const composed = await sharp(Buffer.from(studioGreySvg(rw, rh), 'utf8'))
  .composite([{ input: fg, left: 0, top: 0, blend: 'over' }])
  .jpeg({ quality: 92, mozjpeg: true })
  .toBuffer();

fs.writeFileSync(OUT_PREVIEW, composed);
console.log('Náhled:', OUT_PREVIEW);

await sharp(composed)
  .resize(960, 1200, { fit: 'cover', position: 'attention' })
  .sharpen({ sigma: 0.5, m1: 0.6, m2: 2.5 })
  .webp({ quality: 88, effort: 6, smartSubsample: true })
  .toFile(OUT_WEBP);

console.log('WebP:', OUT_WEBP);
