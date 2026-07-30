/**
 * Hero foto — downscale z DJI originálu (nikdy ne upscale).
 * Použití: node scripts/process-hero-photo.mjs [cesta-k-zdroji.jpg]
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DEFAULT_SRC = path.join('scripts', 'sources', 'hero-dji-0702-source.jpg');
const FALLBACK_SRC =
  'C:/Users/Dell/OneDrive/Plocha/dji_fly_20260702_142348_413_1782995041892_photo_optimized.jpg';

const OUT_DIR = path.join('public', 'images');
const BASE = 'hero-velky-tynec-dji-0702-v2026';
/** Mobil → notebook → desktop → velké monitory */
const WIDTHS = [800, 1280, 1920, 2560];

const srcArg = process.argv[2];
let src = srcArg ? path.resolve(srcArg) : path.resolve(DEFAULT_SRC);
if (!fs.existsSync(src)) src = FALLBACK_SRC;

const meta = await sharp(src).metadata();
console.log('Zdroj:', src);
console.log('Rozměr:', `${meta.width}x${meta.height}`);

for (const width of WIDTHS) {
  const height = Math.round((width * 9) / 16);
  const pipeline = sharp(src)
    .rotate()
    .resize(width, height, {
      fit: 'cover',
      position: sharp.strategy.attention,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.55, m1: 0.55, m2: 0.3, x1: 2, y2: 10, y3: 20 });

  const stem = path.join(OUT_DIR, `${BASE}-${width}`);
  // Nižší kvalita u menších šířek = rychlejší LCP na mobilu
  const jpegQ = width <= 1280 ? 78 : width <= 1920 ? 82 : 85;
  const webpQ = width <= 1280 ? 72 : width <= 1920 ? 76 : 80;

  await pipeline
    .clone()
    .jpeg({ quality: jpegQ, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(`${stem}.jpg`);
  await pipeline
    .clone()
    .webp({ quality: webpQ, effort: 6, smartSubsample: true })
    .toFile(`${stem}.webp`);

  const jpgStat = fs.statSync(`${stem}.jpg`);
  const webpStat = fs.statSync(`${stem}.webp`);
  console.log(
    'OK',
    `${width}x${height}`,
    `jpg=${Math.round(jpgStat.size / 1024)}KB`,
    `webp=${Math.round(webpStat.size / 1024)}KB`,
  );
}
