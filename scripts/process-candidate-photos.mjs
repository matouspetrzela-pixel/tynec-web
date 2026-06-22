/**
 * Zdrojové fotografie: `webobec/foto kandidatu` nebo `fofo kandidatu`.
 *
 * Výstup: `public/images/kandidati/<slug>.webp` — poměr 4∶5.
 * Sjednocení záběru: BlazeFace (TensorFlow.js CPU) najde obličej → stejná relativní
 * výška hlavy v rámu a zarovnání očí. Bez detekce obličeje → Smart crop (attention/bottom).
 *
 * ENV:
 *   FACE_ALIGN=0       — vypnout detekci
 *   PHOTO_FOCUS=bottom — fallback ořez (default attention)
 *   HEAD_FRAC=0.40    — (legacy) dříve zoom z „hlavy“; preferujte TARGET_FACE_FRAC
 *   TARGET_FACE_FRAC=0.36 — výška detekčního obličeje jako podíl výřezu (sjednocuje zoom)
 *   HEAD_PAD_TOP=0.54 — rezerva NAD detekčním bboxem (násobek výšky obličeje) kvůli vlasům
 *   HEAD_PAD_BOTTOM=0.12 — rezerva POD bradu
 *   FACE_FRAC          — synonymum HEAD_FRAC (zpětná kompatibilita)
 *   EYE_LINE_IN_CROP=0.36 — výška oční linky v 4∶5 výřezu (stejná u všech)
 *   EYE_FROM_FACE_TOP — fallback, když BlazeFace nevrátí landmarky očí
 *   Konstanta SLUG_EXTRACT_TUNING v tomto souboru — výjimky kandidát per slug (např. více vzduchu nad hlavou na zdroji).
 *
 * Volitelná záměna nudného pozadí za jemný gradient (oddělení osoby + podklad):
 *   PORTRAIT_BACKDROP=mist|wave|warm|slate|aurora
 *   npm run photos:kandidati:backdrop -- wave
 *   STRIP_GEMINI_WATERMARK=1 — ořízne spodní/pravý okraj (hvězdička Gemini). Zapne se i automaticky, pokud cesta obsahuje „gemini“.
 * (první běh stáhne model; na CPU může trvat). Detekce obličeje dál běží na původním souboru,
 * ořez se aplikuje na obrázek s novým pozadím (stejné rozměry po rotaci).
 */

import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const DET_MAX = 512;
const TARGET_W = 960;
const TARGET_H = 1200;
const TARGET_ASPECT = TARGET_W / TARGET_H;

const FALLBACK_FOCUS = process.env.PHOTO_FOCUS === 'bottom' ? 'bottom' : 'attention';
const USE_FACE = process.env.FACE_ALIGN !== '0';

const HEAD_FRAC = Math.min(
  0.52,
  Math.max(
    0.3,
    Number.parseFloat(
      String(process.env.HEAD_FRAC || process.env.FACE_FRAC || '0.41'),
    ) || 0.4,
  ),
);
/** BlazeFace nesahá do vlasů — stejně u všech přičteme virtuální lem hlavy */
const HEAD_PAD_TOP =
  Number.parseFloat(String(process.env.HEAD_PAD_TOP || '0.54')) || 0.54;
const HEAD_PAD_BOTTOM =
  Number.parseFloat(String(process.env.HEAD_PAD_BOTTOM || '0.12')) || 0.12;
/** Minimální výška „hlavy“ vůči detekčnímu boxu — stabilnější mezi různými obličeji */
const HEAD_MIN_RATIO =
  Number.parseFloat(String(process.env.HEAD_MIN_RATIO || '1.32')) || 1.32;
/** Minimální rezerva nad vrcholem hlavy (vlasy) v ořezu — sjednocuje vizuální velikost */
const HEAD_TOP_MARGIN =
  Number.parseFloat(String(process.env.HEAD_TOP_MARGIN || '0.06')) || 0.06;

const EYE_LINE_IN_CROP = Number.parseFloat(String(process.env.EYE_LINE_IN_CROP || '0.36')) || 0.36;
const EYE_FROM_FACE_TOP =
  Number.parseFloat(String(process.env.EYE_FROM_FACE_TOP || '0.38')) || 0.38;
/** Cílový podíl výšky detekčního obličeje v 4∶5 výřezu — hlavní páka sjednocení zoomu */
const TARGET_FACE_FRAC = Math.min(
  0.48,
  Math.max(
    0.28,
    Number.parseFloat(String(process.env.TARGET_FACE_FRAC || '0.36')) || 0.36,
  ),
);

/**
 * Jemné výjimky per slug:
 * - `faceFrac` vyšší ⇒ větší hlava v rámu (zoom in)
 * - `headTopMargin` — rezerva nad hlavou v ořezu (default 0.06)
 * - `boundaryPin` — true: při nárazu na okraj nezmenšovat výřez (oddálit / „dozadu“)
 * - `eyeLineInCrop` — výška oční linky v cílovém výřezu (default 0.36)
 */
const SLUG_EXTRACT_TUNING = {
  /** Michaela — víc rezervy nad hlavou, oddálení jako řada 1 */
  'michaela-dvorakova': { faceFrac: 0.338, headTopMargin: 0.11, boundaryPin: false },
  /** Drahomíra + Kateřina — kompaktní studiový výřez */
  'drahomira-obsnajdrova': { faceFrac: 0.352, headTopMargin: 0.09, boundaryPin: false },
  'katerina-parcova': { faceFrac: 0.348, headTopMargin: 0.10, boundaryPin: false },
  /** Řada 3 — sladění s řadou 1/4 */
  'filip-sklenar': { faceFrac: 0.352, headTopMargin: 0.09, boundaryPin: false },
  'alena-sojakova': { faceFrac: 0.352, headTopMargin: 0.09, boundaryPin: false },
  /** Mírný zoom in u portrétů, které po globálním 0.36 působí menší */
  'pavlina-zlamalova': { faceFrac: 0.39 },
  'jiri-dvorak': { faceFrac: 0.38 },
};

/** Souborové aliasy (název souboru → slug), když se liší od jména v candidates.ts */
const FILE_SLUG_ALIASES = {
  'pavla zlamalova': 'pavlina-zlamalova',
};

function shouldStripGeminiWatermark(inputPath) {
  const forced = process.env.STRIP_GEMINI_WATERMARK;
  if (forced === '1' || forced === 'true') return true;
  if (forced === '0' || forced === 'false') return false;
  return /gemini/i.test(inputPath);
}

/**
 * Připraví zdroj: EXIF rotace + odstranění watermarku Gemini (spodní/pravý okraj).
 * @returns {Promise<string>} cesta k dočasnému PNG
 */
async function prepareSourceImage(inputPath, slug) {
  fs.mkdirSync(TMP_BG_DIR, { recursive: true });
  const prepPath = path.join(TMP_BG_DIR, `${slug}.prepared.png`);
  const rotated = sharp(inputPath).rotate();
  const meta = await rotated.metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;

  let pipeline = rotated;
  if (shouldStripGeminiWatermark(inputPath)) {
    const trimB = Math.max(36, Math.round(h * 0.045));
    const trimR = Math.max(36, Math.round(w * 0.05));
    pipeline = sharp(inputPath).rotate().extract({
      left: 0,
      top: 0,
      width: Math.max(64, w - trimR),
      height: Math.max(64, h - trimB),
    });
  }

  await pipeline.png({ compressionLevel: 6 }).toFile(prepPath);
  return prepPath;
}

const TMP_BG_DIR = path.join(PROJECT_ROOT, '.tmp-photo-kandidati');

/** Klidné gradientní podklady (hex) — méně „šedá zeď“, pořád důstojné pro volby */
const BACKDROP_PRESETS = {
  mist: { c1: '#edf1f8', c2: '#cdd7e9' },
  wave: { c1: '#e5eefb', c2: '#b9cbe0' },
  warm: { c1: '#f6eee8', c2: '#e6d9cf' },
  slate: { c1: '#e4e9f0', c2: '#c9d3df' },
  aurora: { c1: '#ebe8f4', c2: '#d0dce9' },
};

function activeBackdropPreset() {
  const raw = process.env.PORTRAIT_BACKDROP;
  const v = String(raw ?? '')
    .trim()
    .toLowerCase();
  if (!v || v === '0' || v === 'false' || v === 'off') return null;
  if (!BACKDROP_PRESETS[v]) {
    console.warn(
      `PORTRAIT_BACKDROP="${raw}" — neznámý preset. Povolené: ${Object.keys(BACKDROP_PRESETS).join(', ')}.`,
    );
    return null;
  }
  return v;
}

function gradientSvg(w, h, c1, c2) {
  return `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;
}

/** @returns {boolean} */
function runRembg(inPath, outPath) {
  const chains = [];
  if (process.env.PYTHON) chains.push([process.env.PYTHON]);
  chains.push(['python'], ['python3'], ['py', '-3']);

  let lastErr = '';
  for (const c of chains) {
    const exe = c[0];
    const extra = c.slice(1);
    const r = spawnSync(exe, [...extra, '-m', 'rembg', 'i', inPath, outPath], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      windowsHide: true,
    });
    if (r.status === 0) return true;
    lastErr = r.stderr || r.stdout || String(r.error || '');
  }
  console.warn(
    '  Nepodařilo se spustit rembg. Nainstalujte např.:  python -m pip install rembg\n  Nebo nastavte proměnnou PYTHON na cestu k python.exe',
  );
  if (lastErr) console.warn(String(lastErr).slice(0, 600));
  return false;
}

/**
 * Vyrobí PNG stejných rozměrů jako rotated original: gradient + řez bez pozadí.
 * @returns {Promise<string|null>} cesta k dočasnému composed PNG nebo null
 */
async function buildBackdropReplacedPath(inputPath, slug, presetKey) {
  fs.mkdirSync(TMP_BG_DIR, { recursive: true });
  const uid = randomUUID().slice(0, 10);
  const rotPath = path.join(TMP_BG_DIR, `${slug}.${uid}.rot.png`);
  const nobgPath = path.join(TMP_BG_DIR, `${slug}.${uid}.nobg.png`);
  const outPath = path.join(TMP_BG_DIR, `${slug}.${uid}.composed.png`);
  const toDelete = [rotPath, nobgPath];

  try {
    await sharp(inputPath).rotate().png({ compressionLevel: 7 }).toFile(rotPath);
    const rotMeta = await sharp(rotPath).metadata();
    const rw = rotMeta.width;
    const rh = rotMeta.height;
    if (!rw || !rh) return null;

    if (!runRembg(rotPath, nobgPath)) return null;

    const { c1, c2 } = BACKDROP_PRESETS[presetKey];
    let fgPath = nobgPath;
    const nm = await sharp(nobgPath).metadata();
    if (nm.width !== rw || nm.height !== rh) {
      const fitPath = path.join(TMP_BG_DIR, `${slug}.${uid}.nobg.fit.png`);
      await sharp(nobgPath).resize(rw, rh, { fit: 'fill' }).png().toFile(fitPath);
      fgPath = fitPath;
      toDelete.push(fitPath);
    }

    const svg = gradientSvg(rw, rh, c1, c2);
    await sharp(Buffer.from(svg, 'utf8'))
      .composite([{ input: fgPath, left: 0, top: 0, blend: 'over' }])
      .png()
      .toFile(outPath);

    return outPath;
  } catch (e) {
    console.warn(`  (PORTRAIT_BACKDROP) ${e?.message || e}`);
    return null;
  } finally {
    for (const p of toDelete) {
      try {
        if (fs.existsSync(p)) fs.unlinkSync(p);
      } catch {
        /* noop */
      }
    }
  }
}

/** Rozměry po automatické orientaci (EXIF 5–8 prohází šířku/výšku). Bez toho nesedí detekce a extract. */
function orientedDimensions(meta) {
  let w = meta.width ?? 1;
  let h = meta.height ?? 1;
  const o = meta.orientation ?? 1;
  if (o >= 5 && o <= 8) {
    return { width: h, height: w };
  }
  return { width: w, height: h };
}

function resolveDefaultSrcDir() {
  const webobec = path.resolve(PROJECT_ROOT, '..');
  for (const name of ['foto kandidatu', 'fofo kandidatu']) {
    const p = path.join(webobec, name);
    if (!fs.existsSync(p)) continue;
    const gemini = path.join(p, 'foto kandidatu final', 'Gemini generated');
    if (fs.existsSync(gemini)) return gemini;
    const finalDir = path.join(p, 'foto kandidatu final');
    if (fs.existsSync(finalDir)) return finalDir;
    return p;
  }
  return path.join(webobec, 'foto kandidatu');
}

/** Musí sedět s lib/candidates.ts (name → slug). */
const CANDIDATES = [
  { slug: 'michal-andrysek', name: 'Mgr. Michal Andrýsek' },
  { slug: 'petra-andryskova', name: 'Ing. Petra Andrýsková' },
  { slug: 'jiri-dvorak', name: 'Ing. Jiří Dvořák' },
  { slug: 'michaela-dvorakova', name: 'Michaela Dvořáková' },
  { slug: 'vladimira-hacsikova', name: 'Ing. Vladimíra Hacsiková' },
  { slug: 'drahomira-obsnajdrova', name: 'Drahomíra Obšnajdrová' },
  { slug: 'katerina-parcova', name: 'Mgr. Bc. Kateřina Parčová' },
  { slug: 'filip-sklenar', name: 'Filip Sklenář' },
  { slug: 'alena-sojakova', name: 'Alena Sojáková' },
  { slug: 'michal-svitak', name: 'Michal Sviták' },
  { slug: 'pavlina-zlamalova', name: 'Mgr. Pavlína Zlámalová' },
  { slug: 'jakub-zadnik', name: 'Jakub Žádník' },
];

function stripTitles(s) {
  return s
    .replace(/,/g, ' ')
    .replace(/\b(Mgr|Ing|Bc|PhD|Dr|doc|RNDr|MDDr|JUDr)\b\.?/gi, ' ')
    .replace(/\bPh\.?\s*D\.?\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeKey(s) {
  return stripTitles(s)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function parseArgs() {
  const args = process.argv.slice(2);
  let src = resolveDefaultSrcDir();
  let fallbackSrc = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--src' && args[i + 1]) {
      src = path.resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--fallback-src' && args[i + 1]) {
      fallbackSrc = path.resolve(args[i + 1]);
      i++;
    }
  }
  if (!fallbackSrc) {
    const parent = path.dirname(src);
    if (/gemini generated$/i.test(src) && fs.existsSync(parent)) {
      fallbackSrc = parent;
    }
  }
  return { src, fallbackSrc };
}

function findSourceFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Složka neexistuje: ${dir}`);
    process.exit(1);
  }
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|tif?f)$/i.test(f))
    .map((f) => ({ full: path.join(dir, f), base: f }));
}

function matchSlug(fileBaseName) {
  const stem = fileBaseName.replace(/\.[^.]+$/, '');
  const fileKey = normalizeKey(stem);
  const aliasSlug = FILE_SLUG_ALIASES[fileKey];
  if (aliasSlug) return aliasSlug;
  for (const c of CANDIDATES) {
    if (normalizeKey(c.name) === fileKey) return c.slug;
  }
  return null;
}

/** @type {import('@tensorflow-models/blazeface').BlazeFaceModel | null} */
let faceModel = null;

async function ensureFaceModel() {
  if (!USE_FACE) return null;
  if (faceModel) return faceModel;
  const tf = await import('@tensorflow/tfjs');
  const blazeface = await import('@tensorflow-models/blazeface');
  await tf.setBackend('cpu');
  await tf.ready();
  faceModel = await blazeface.load({
    maxFaces: 5,
    scoreThreshold: 0.55,
  });
  return faceModel;
}

async function measureFaceInOriginal(inputPath, model) {
  const fileMeta = await sharp(inputPath).metadata();
  const { width: fullW, height: fullH } = orientedDimensions(fileMeta);
  if (!fullW || !fullH) return null;

  const base = sharp(inputPath).rotate();

  const scaleDet = Math.min(1, DET_MAX / Math.max(fullW, fullH));
  const detW = Math.max(1, Math.round(fullW * scaleDet));
  const detH = Math.max(1, Math.round(fullH * scaleDet));
  const sx = fullW / detW;
  const sy = fullH / detH;

  const { data, info } = await base
    .clone()
    .resize(detW, detH, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  if (ch !== 3 && ch !== 4) return null;

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
  const tensor = tf.tensor3d(rgb, [detH, detW, 3]);
  const preds = await model.estimateFaces(tensor, false, false, true);
  tensor.dispose();

  if (!preds.length) return null;

  let best = preds[0];
  let bestArea = 0;
  for (const p of preds) {
    const tl = p.topLeft;
    const br = p.bottomRight;
    const fw = br[0] - tl[0];
    const fh = br[1] - tl[1];
    const a = fw * fh;
    if (a > bestArea) {
      bestArea = a;
      best = p;
    }
  }

  const tl = best.topLeft;
  const br = best.bottomRight;
  const faceLeft = tl[0] * sx;
  const faceTop = tl[1] * sy;
  const faceRight = br[0] * sx;
  const faceBottom = br[1] * sy;
  const faceW = Math.max(1, faceRight - faceLeft);
  const faceH = Math.max(1, faceBottom - faceTop);
  const cx = (faceLeft + faceRight) / 2;

  /** BlazeFace landmarky 0–1 = oči; průměr Y pro horizontální linku v mřížce */
  let eyeY = faceTop + faceH * EYE_FROM_FACE_TOP;
  if (best.landmarks && best.landmarks.length >= 2) {
    const eyeYs = best.landmarks.slice(0, 2).map((pt) => pt[1] * sy);
    eyeY = (eyeYs[0] + eyeYs[1]) / 2;
  }

  return { fullW, fullH, faceLeft, faceTop, faceRight, faceBottom, faceW, faceH, cx, eyeY };
}

function fitCropToAspect(cropH, cropW, fullW, fullH) {
  cropW = Math.min(cropW, fullW);
  cropH = Math.min(cropH, fullH);
  if (cropW / cropH > TARGET_ASPECT + 1e-6) {
    cropW = cropH * TARGET_ASPECT;
  } else {
    cropH = cropW / TARGET_ASPECT;
  }
  cropW = Math.min(cropW, fullW);
  cropH = Math.min(cropH, fullH);
  return { cropW, cropH };
}

function virtualHeadTop(faceTop, faceH) {
  return Math.max(0, faceTop - faceH * HEAD_PAD_TOP);
}

/** Posune výřez výš, aby nad hlavou zůstala stejná rezerva (vlasy / čelo). */
function applyHeadTopMargin(top, cropH, headTop, margin) {
  const topForHead = headTop - cropH * margin;
  return topForHead < top ? topForHead : top;
}

/**
 * Výřez 4∶5 — zoom z velikosti obličeje, oční linka + jednotná rezerva nad hlavou.
 */
function computeExtractFromFace(box, slug) {
  const { fullW, fullH, faceH, cx, eyeY, faceTop } = box;
  const tune = SLUG_EXTRACT_TUNING[slug] || {};
  const eyeLine = tune.eyeLineInCrop ?? EYE_LINE_IN_CROP;
  const faceFrac = tune.faceFrac ?? tune.headFrac ?? TARGET_FACE_FRAC;
  const headTopMargin = tune.headTopMargin ?? HEAD_TOP_MARGIN;
  const boundaryPin = tune.boundaryPin === true;
  const eyeYPos = eyeY ?? faceTop + faceH * EYE_FROM_FACE_TOP;
  const headTop = virtualHeadTop(faceTop, faceH);

  let cropH = faceH / faceFrac;
  let cropW = cropH * TARGET_ASPECT;
  ({ cropW, cropH } = fitCropToAspect(cropH, cropW, fullW, fullH));

  const maxCropH = Math.min(fullH, fullW / TARGET_ASPECT);
  if (cropH > maxCropH) {
    cropH = maxCropH;
    cropW = cropH * TARGET_ASPECT;
  }

  let top = eyeYPos - cropH * eyeLine;
  top = applyHeadTopMargin(top, cropH, headTop, headTopMargin);

  if (boundaryPin) {
    top = Math.max(0, Math.min(top, fullH - cropH));
  } else if (top < 0) {
    const hFromEye = eyeYPos / eyeLine;
    cropH = Math.min(cropH, hFromEye, fullH);
    cropW = cropH * TARGET_ASPECT;
    ({ cropW, cropH } = fitCropToAspect(cropH, cropW, fullW, fullH));
    top = eyeYPos - cropH * eyeLine;
    top = applyHeadTopMargin(top, cropH, headTop, headTopMargin);
    top = Math.max(0, top);
  } else if (top + cropH > fullH) {
    const hFromBottom = (fullH - eyeYPos) / (1 - eyeLine);
    cropH = Math.min(cropH, hFromBottom, fullH);
    cropW = cropH * TARGET_ASPECT;
    ({ cropW, cropH } = fitCropToAspect(cropH, cropW, fullW, fullH));
    top = eyeYPos - cropH * eyeLine;
    top = applyHeadTopMargin(top, cropH, headTop, headTopMargin);
    top = Math.max(0, Math.min(top, fullH - cropH));
  }

  let left = cx - cropW / 2;
  left = Math.max(0, Math.min(left, fullW - cropW));

  cropW = Math.floor(cropW);
  cropH = Math.floor(cropH);
  left = Math.floor(left);
  top = Math.floor(top);

  cropW = Math.min(cropW, fullW - left);
  cropH = Math.min(cropH, fullH - top);

  if (cropW < 48 || cropH < 48) {
    return null;
  }

  return { left, top, width: cropW, height: cropH };
}

async function processOne(inputPath, outPath, model, slug, backdropPreset) {
  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });

  const preparedPath = await prepareSourceImage(inputPath, slug);
  if (shouldStripGeminiWatermark(inputPath)) {
    console.log('  + oříznut watermark Gemini (spodní/pravý okraj)');
  }

  let composedPath = null;
  if (backdropPreset) {
    composedPath = await buildBackdropReplacedPath(preparedPath, slug, backdropPreset);
    if (composedPath) {
      console.log(`  + nahrazené pozadí (${backdropPreset})`);
    } else {
      console.warn(`  (pozadí „${backdropPreset}“ se nepovedlo — pokračuji s připraveným souborem)`);
    }
  }

  const useComposed = Boolean(composedPath);
  const rasterPath = useComposed ? composedPath : preparedPath;

  let pipeline;
  let mode = 'fallback';

  if (model) {
    try {
      const box = await measureFaceInOriginal(preparedPath, model);
      if (box) {
        const ex = computeExtractFromFace(box, slug);
        if (ex) {
          pipeline = sharp(rasterPath).extract(ex);
          mode = 'face';
        }
      }
    } catch (e) {
      console.warn(`  (face detekce selhala, fallback) ${e?.message || e}`);
    }
  }

  if (mode === 'fallback') {
    pipeline = sharp(rasterPath).resize(TARGET_W, TARGET_H, {
      fit: 'cover',
      position: FALLBACK_FOCUS,
    });
  } else {
    pipeline = pipeline.resize(TARGET_W, TARGET_H, { fit: 'fill' });
  }

  try {
    await pipeline
      .sharpen({ sigma: 0.5, m1: 0.6, m2: 2.5 })
      .webp({
        quality: 88,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(outPath);
  } finally {
    if (composedPath && fs.existsSync(composedPath)) {
      try {
        fs.unlinkSync(composedPath);
      } catch {
        /* noop */
      }
    }
    if (preparedPath && fs.existsSync(preparedPath)) {
      try {
        fs.unlinkSync(preparedPath);
      } catch {
        /* noop */
      }
    }
  }
}

async function main() {
  const { src, fallbackSrc } = parseArgs();
  let files = findSourceFiles(src);
  const outDir = path.join(PROJECT_ROOT, 'public', 'images', 'kandidati');

  const model = await ensureFaceModel();
  const backdropPreset = activeBackdropPreset();
  if (USE_FACE && model) {
    console.log(
      `Face align: zapnuto (TARGET_FACE_FRAC=${TARGET_FACE_FRAC}, oční linka ${EYE_LINE_IN_CROP}). Model při prvním běhu stahuje data z internetu.\n`,
    );
  } else {
    console.log(`Face align: vypnuto — Smart crop (${FALLBACK_FOCUS}).\n`);
  }
  if (backdropPreset) {
    console.log(
      `Pozadí: náhrada gradientem („${backdropPreset}“). Vyžaduje „python -m rembg“ (viz hlavička skriptu).\n`,
    );
  }

  const used = new Set();
  const skipped = [];

  async function runFile(full, base) {
    const slug = matchSlug(base);
    if (!slug) {
      skipped.push(base);
      return;
    }
    if (used.has(slug)) {
      console.warn(`Duplicita pro slug ${slug}, přeskakuji: ${base}`);
      return;
    }
    used.add(slug);
    const outPath = path.join(outDir, `${slug}.webp`);
    await processOne(full, outPath, model, slug, backdropPreset);
    const st = fs.statSync(outPath);
    console.log(`OK  ${slug}.webp  ←  ${base}  (${(st.size / 1024).toFixed(0)} KB)`);
  }

  for (const file of files) {
    await runFile(file.full, file.base);
  }

  const missing = CANDIDATES.filter((c) => !used.has(c.slug));
  if (missing.length && fallbackSrc) {
    console.log(`\nDoplňuji ${missing.length} chybějící ze záložní složky: ${fallbackSrc}`);
    const fallbackFiles = findSourceFiles(fallbackSrc);
    for (const c of missing) {
      const hit = fallbackFiles.find((f) => matchSlug(f.base) === c.slug);
      if (hit) {
        await runFile(hit.full, hit.base);
      }
    }
  }

  if (model) {
    try {
      model.dispose();
    } catch {
      /* noop */
    }
  }

  if (skipped.length) {
    console.warn('\nNepárované soubory (zkontrolujte název — musí odpovídat jménu v lib/candidates.ts):');
    skipped.forEach((f) => console.warn(`  - ${f}`));
  }

  const stillMissing = CANDIDATES.filter((c) => !used.has(c.slug)).map((c) => c.slug);
  if (stillMissing.length) {
    console.log('\nBez zdrojové fotky (ponechte placeholder v public nebo doplňte soubor):');
    stillMissing.forEach((s) => console.log(`  - ${s}`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
