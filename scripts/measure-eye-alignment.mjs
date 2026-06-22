/**
 * Změří výšku oční linky v hotových WebP (pro kontrolu sjednocení mřížky).
 * Cíl: všichni kolem stejného % výšky rámu (typicky 31–34 %).
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
const TARGET_EYE_PCT = 36;

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
  const blazeface = await import('@tensorflow-models/blazeface');
  await tf.setBackend('cpu');
  await tf.ready();

  const tensor = tf.tensor3d(rgb, [detH, detW, 3]);
  const preds = await model.estimateFaces(tensor, false, false, true);
  tensor.dispose();

  if (!preds.length || !preds[0].landmarks?.length) return null;

  const lm = preds[0].landmarks;
  const eyeY = ((lm[0][1] + lm[1][1]) / 2) * sy;
  const pct = (eyeY / fullH) * 100;
  return { slug, eyePct: pct, delta: pct - TARGET_EYE_PCT };
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

  rows.sort((a, b) => a.eyePct - b.eyePct);
  const avg = rows.reduce((s, r) => s + r.eyePct, 0) / rows.length;
  const spread = rows.length ? rows[rows.length - 1].eyePct - rows[0].eyePct : 0;

  console.log(`Cíl oční linky: ~${TARGET_EYE_PCT}% výšky rámu\n`);
  for (const r of rows) {
    const flag = Math.abs(r.delta) > 2 ? ' ←' : '';
    console.log(`  ${r.slug.padEnd(22)} ${r.eyePct.toFixed(1)}%  (Δ ${r.delta >= 0 ? '+' : ''}${r.delta.toFixed(1)})${flag}`);
  }
  console.log(`\nPrůměr: ${avg.toFixed(1)}%  |  Rozptyl: ${spread.toFixed(1)} pp`);

  if (spread > 3) {
    console.log('\nDoporučení: upravit SLUG_EXTRACT_TUNING (eyeLineInCrop) u označených slugů.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
