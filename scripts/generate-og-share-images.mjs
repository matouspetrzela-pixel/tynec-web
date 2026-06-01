/**
 * Generuje OG/Twitter/SERP obrázky z brand loga (zeleno‑červené na bílém).
 * Nemění vzhled webu — pouze public/images/og-pro-tynec-srdcem*.jpg
 *
 * Použití: npm run og:generate
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesDir = path.join(root, 'public', 'images');

const SOURCE = path.join(imagesDir, 'brand-logo-pro-tynec-srdcem.png');
const OUT_LANDSCAPE = path.join(imagesDir, 'og-pro-tynec-srdcem.jpg');
const OUT_SQUARE = path.join(imagesDir, 'og-pro-tynec-srdcem-square.jpg');

const WHITE = { r: 255, g: 255, b: 255 };

async function renderOg({ outPath, width, height, padding }) {
  const meta = await sharp(SOURCE).metadata();
  const maxW = width - padding * 2;
  const maxH = height - padding * 2;
  const scale = Math.min(maxW / meta.width, maxH / meta.height);
  const lw = Math.round(meta.width * scale);
  const lh = Math.round(meta.height * scale);
  const resized = await sharp(SOURCE).resize(lw, lh).toBuffer();
  const left = Math.round((width - lw) / 2);
  const top = Math.round((height - lh) / 2);

  await sharp({
    create: { width, height, channels: 3, background: WHITE },
  })
    .composite([{ input: resized, left, top }])
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath);

  const out = await sharp(outPath).metadata();
  console.log(`✓ ${path.basename(outPath)} — ${out.width}×${out.height}`);
}

async function main() {
  try {
    await sharp(SOURCE).metadata();
  } catch {
    console.error(
      `Chybí zdrojové logo: ${SOURCE}\n` +
        'Uložte zeleno‑červené logo na bílém jako brand-logo-pro-tynec-srdcem.png',
    );
    process.exit(1);
  }

  await renderOg({ outPath: OUT_LANDSCAPE, width: 1200, height: 630, padding: 72 });
  await renderOg({ outPath: OUT_SQUARE, width: 1200, height: 1200, padding: 100 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
