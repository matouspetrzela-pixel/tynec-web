/**
 * Změří relativní velikost obličeje v hotových WebP (proxy pro zoom hlavy v mřížce).
 * Cíl: všichni kolem stejného % výšky rámu.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'kandidati');

const SLUGS = [
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

const DET_MAX = 512;
const TARGET_FACE_PCT = Number.parseFloat(String(process.env.TARGET_FACE_FRAC || '0.36')) * 100 || 36;

async function measureOne(slug, model) {
  const file = path.join(OUT_DIR, `${slug}.webp`);
  if (!fs.existsSync(file)) return null;

  const meta = await sharp(file).metadata();
  const fullW = meta.width ?? 1;
  const fullH = meta.height ?? 1;

  const scaleDet = Math.min(1, DET_MAX / Math.max(fullW, fullH));
  const detW = Math.max(1, Math.round(fullW * scaleDet));
  const detH = Math.max(1, Math.round(fullH * scaleDet));
  const sy = fullH / detH;

  const { data, info } = await sharp(file)
    .resize(detW, detH, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  const px = detW * detH;
  let rgb;
  if (ch === 3) {
    rgb = new Uint8Array(data);
  } else {
    rgb = new Uint8Array(px * 3);
    for (let i = 0; i < px; i++) {
      rgb[i * 3] = data[i * 4];
      rgb[i * 3 + 1] = data[i * 4 + 1];
      rgb[i * 3 + 2] = data[i * 4 + 2];
    }
  }

  const tf = await import('@tensorflow/tfjs');
  await tf.setBackend('cpu');
  await tf.ready();

  const tensor = tf.tensor3d(rgb, [detH, detW, 3]);
  const preds = await model.estimateFaces(tensor, false, false, true);
  tensor.dispose();

  if (!preds.length) return null;

  const p = preds[0];
  const faceH = (p.bottomRight[1] - p.topLeft[1]) * sy;
  const facePct = (faceH / fullH) * 100;
  return { slug, facePct, delta: facePct - TARGET_FACE_PCT };
}

async function main() {
  const tf = await import('@tensorflow/tfjs');
  const blazeface = await import('@tensorflow-models/blazeface');
  await tf.setBackend('cpu');
  await tf.ready();
  const model = await blazeface.load({ maxFaces: 3, scoreThreshold: 0.55 });

  const rows = [];
  for (const slug of SLUGS) {
    const r = await measureOne(slug, model);
    if (r) rows.push(r);
  }

  model.dispose();

  rows.sort((a, b) => a.facePct - b.facePct);
  const avg = rows.reduce((s, r) => s + r.facePct, 0) / rows.length;
  const spread = rows.length ? rows[rows.length - 1].facePct - rows[0].facePct : 0;

  console.log(`Cíl velikosti obličeje: ~${TARGET_FACE_PCT.toFixed(0)}% výšky rámu\n`);
  for (const r of rows) {
    const flag = Math.abs(r.delta) > 2 ? ' ←' : '';
    console.log(
      `  ${r.slug.padEnd(22)} ${r.facePct.toFixed(1)}%  (Δ ${r.delta >= 0 ? '+' : ''}${r.delta.toFixed(1)})${flag}`,
    );
  }
  console.log(`\nPrůměr: ${avg.toFixed(1)}%  |  Rozptyl: ${spread.toFixed(1)} pp`);

  if (spread > 3) {
    console.log('\nDoporučení: upravit SLUG_EXTRACT_TUNING (faceFrac) u označených slugů.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
