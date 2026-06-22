/**
 * Náhledová mřížka 3×4 všech WebP portrétů pro kontrolu sjednocení ořezu.
 * Výstup: public/images/kandidati/_preview-grid.webp
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const SLUGS_BY_GRID = [
  'michal-andrysek',
  'petra-andryskova',
  'jiri-dvorak',
  'michaela-dvorakova',
  'vladimira-hacsikova',
  'drahomira-obsnajdrova',
  'katerina-parcova',
  'filip-sklenar',
  'alena-sojakova',
  'michal-svitak',
  'pavlina-zlamalova',
  'jakub-zadnik',
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUT = path.join(PROJECT_ROOT, 'public', 'images', 'kandidati', '_preview-grid.webp');

const COLS = 3;
const CELL_W = 320;
const CELL_H = 400;
const GAP = 16;
const PAD = 24;

const candidates = SLUGS_BY_GRID;
const rows = Math.ceil(candidates.length / COLS);
const width = PAD * 2 + COLS * CELL_W + (COLS - 1) * GAP;
const height = PAD * 2 + rows * CELL_H + (rows - 1) * GAP;

const composites = [];
for (let i = 0; i < candidates.length; i++) {
  const slug = candidates[i];
  const file = path.join(PROJECT_ROOT, 'public', 'images', 'kandidati', `${slug}.webp`);
  if (!fs.existsSync(file)) continue;
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const left = PAD + col * (CELL_W + GAP);
  const top = PAD + row * (CELL_H + GAP);
  const buf = await sharp(file)
    .resize(CELL_W, CELL_H, { fit: 'cover', position: 'centre' })
    .toBuffer();
  composites.push({ input: buf, left, top });
}

await sharp({
  create: {
    width,
    height,
    channels: 3,
    background: '#e8eaed',
  },
})
  .composite(composites)
  .webp({ quality: 90 })
  .toFile(OUT);

console.log('Náhledová mřížka:', OUT);
