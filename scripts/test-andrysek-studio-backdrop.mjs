/**
 * Test: nahradit pozadí u Michala Andrýška studiovým šedým gradientem.
 * Používá @imgly/background-removal-node (bez Python rembg).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const WEBOBEC = path.resolve(PROJECT_ROOT, '..');

const SRC_DIR = path.join(WEBOBEC, 'fofo kandidatu', 'foto kandidatu final');
const OUT_WEBP = path.join(PROJECT_ROOT, 'public', 'images', 'kandidati', 'michal-andrysek.webp');
const OUT_PREVIEW = path.join(SRC_DIR, 'Michal Andrysek - studio test.jpg');

/** Radial studio grey — střed světlejší, okraje tmavší (jako Gemini vzor). */
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

function findAndrysekFile() {
  if (!fs.existsSync(SRC_DIR)) {
    throw new Error(`Složka neexistuje: ${SRC_DIR}`);
  }
  const files = fs.readdirSync(SRC_DIR);
  const hit = files.find((f) => {
    const key = f
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .toLowerCase();
    return key.includes('michal') && key.includes('andrysek') && /\.(jpe?g|png|webp)$/i.test(f);
  });
  if (!hit) {
    throw new Error(`Nenalezen Michal Andrýsek v: ${SRC_DIR}`);
  }
  return path.join(SRC_DIR, hit);
}

async function main() {
  const inputPath = findAndrysekFile();
  console.log(`Zdroj: ${inputPath}`);

  const inputBuf = fs.readFileSync(inputPath);
  console.log('Odstraňuji pozadí (imgly)…');
  const cutoutBuf = await removeBackground(inputBuf, {
    model: 'medium',
    output: { format: 'image/png', quality: 1 },
  });

  const rotMeta = await sharp(inputPath).rotate().metadata();
  const rw = rotMeta.width ?? 1;
  const rh = rotMeta.height ?? 1;

  let fg = await sharp(cutoutBuf).ensureAlpha().png().toBuffer();
  const fgMeta = await sharp(fg).metadata();
  if (fgMeta.width !== rw || fgMeta.height !== rh) {
    fg = await sharp(fg).resize(rw, rh, { fit: 'fill' }).png().toBuffer();
  }

  const backdrop = Buffer.from(studioGreySvg(rw, rh), 'utf8');
  const composed = await sharp(backdrop)
    .composite([{ input: fg, left: 0, top: 0, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(OUT_PREVIEW, composed);
  console.log(`Náhled: ${OUT_PREVIEW}`);

  await sharp(composed)
    .resize(960, 1200, { fit: 'cover', position: 'attention' })
    .sharpen({ sigma: 0.5, m1: 0.6, m2: 2.5 })
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(OUT_WEBP);

  const st = fs.statSync(OUT_WEBP);
  console.log(`WebP: ${OUT_WEBP} (${(st.size / 1024).toFixed(0)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
