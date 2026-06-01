/**
 * Zabrání náhodnému „Production“ deployi na Vercel.
 *
 * Produkcni build na Vercelu (VERCEL_ENV=production) projde jen s env
 *   ALLOW_PRODUCTION_DEPLOY=true
 * v nastaveni projektu (Environment: Production). Do repa tuto hodnotu neukladejte.
 *
 * Vercel Preview, lokalni `npm run build` a CI (GitHub Actions) tento skript neblokuji.
 */

import process from 'node:process';

const onVercel = process.env.VERCEL === '1';
const vercelEnv = process.env.VERCEL_ENV || '';

if (onVercel && vercelEnv === 'production') {
  const ok = process.env.ALLOW_PRODUCTION_DEPLOY === 'true';
  if (!ok) {
    console.error(`
┌─────────────────────────────────────────────────────────────────────
│ Produkcni nasazeni na Vercel je vypnute.
│
│ V nastaveni projektu Vercel → Environment Variables → Production
│ pridejte promennou  ALLOW_PRODUCTION_DEPLOY  s hodnotou  true
│ (jen kdyz chcete opravdu publikovat tuto verzi na produkci).
└─────────────────────────────────────────────────────────────────────
`);
    process.exit(1);
  }
}
