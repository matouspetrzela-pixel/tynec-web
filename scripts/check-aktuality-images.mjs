// Jednorázový pomocník: vypíše rozměry všech obrázků v /public/aktuality/.
// Použití:  node scripts/check-aktuality-images.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = path.join(process.cwd(), 'public', 'aktuality');

const files = (await fs.readdir(DIR)).filter((f) =>
  /\.(jpe?g|png|webp)$/i.test(f),
);

for (const f of files) {
  const { width, height } = await sharp(path.join(DIR, f)).metadata();
  const ratio = (width / height).toFixed(3);
  const tvar =
    Math.abs(width - height) < 8
      ? 'čtverec'
      : width / height > 1.4
        ? 'banner (široký)'
        : 'na výšku/poměr blízko 1';
  console.log(
    `${f.padEnd(60)}  ${String(width).padStart(5)} × ${String(height).padEnd(5)}  poměr ${ratio}  ${tvar}`,
  );
}
