/**
 * Jednorázové / opakované rasterové placeholdery (WebP z čistého UTF-8 SVG řetězce).
 * Používá se u kandidátů bez reálného portrétu — spolehlivější než ruční .svg soubory se špatnou kódováním.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'kandidati');

function svgPortrait(initials, c1, c2) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="1200" viewBox="0 0 960 1200">
  <defs>
    <linearGradient id="gph" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="960" height="1200" fill="url(#gph)"/>
  <text x="480" y="640" text-anchor="middle"
    font-family="system-ui, Segoe UI, sans-serif"
    font-size="118"
    font-weight="700"
    fill="#FFFFFF"
    fill-opacity="0.93">${initials}</text>
</svg>`;
}

async function writeWebp(filename, initials, c1, c2) {
  await fs.promises.mkdir(OUT_DIR, { recursive: true });
  const buf = Buffer.from(svgPortrait(initials, c1, c2), 'utf8');
  const dest = path.join(OUT_DIR, filename);
  await sharp(buf).webp({ quality: 88 }).toFile(dest);
  console.log('OK ', dest);
}

await writeWebp('pavlina-zlamalova.webp', 'PZ', '#dc2626', '#991b1b');
await writeWebp('jiri-dvorak.webp', 'JD', '#c2410c', '#7c2d12');
