# Architektura webu

## 1) Kontext

Web běží jako Next.js App Router aplikace hostovaná na Vercelu.  
Primární cíl je rychlá prezentační kampaň s možností postupného odemykání funkcí přes feature flag `NEXT_PUBLIC_SITE_LAUNCHED`.

## 2) Technologie

- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- Vercel (hosting + deployment)
- GitHub Actions (CI: lint + typecheck + build)

## 3) Struktura aplikace

### `app/`
- Routy a layout aplikace.
- `app/page.tsx` je homepage.
- `app/kandidati/[slug]/page.tsx` je staticky generovaný detail kandidáta.
- `app/robots.ts` a `app/sitemap.ts` generují SEO artefakty.

### `components/`
- UI komponenty (header, hero, sekce homepage, karty).
- Hero je rozdělené na kompozici (`Hero.tsx`) a obsah panelu (`components/hero/HeroLead.tsx`).

### `lib/`
- `lib/candidates.ts`: centralizovaná data kandidátů (single source of truth).
- `lib/social.ts`: Facebook URL a kontakt.
- `lib/aktuality.ts`: centralizovaná data aktualit (pole `AKTUALITY`). Každá položka obsahuje `id`, `typ`, `datum`, `nadpis`, `perex`, `obsah` a volitelně `obrazek`/`soubor`/`odkaz` a **`nahledOrez`** (`center`, `left`, `right`) pro zarovnání ořezu náhledu. Řazení na webu je automatické — sestupně dle `datum`. Vykreslení karet včetně štítku data: `app/aktuality/page.tsx` (náhled `object-cover`, datum vpravo dole).

## 4) Fázovaný režim (Phase 1 vs Phase 2)

Řídí proměnná `NEXT_PUBLIC_SITE_LAUNCHED`. **Aktuální produkční stav:** viz [`current-production-state.md`](current-production-state.md).

- `false` (Phase 1 — aktuální stav, červen 2026):
  - Homepage: **pouze hero s fotkou + patička** (`app/page.tsx` — bez mezisekcí).
  - Hero CTA: O nás, Aktuality, Facebook.
  - Navigace: `O nás`, **`Kandidáti`**, `Aktuality` odemčeny (`alwaysUnlocked: true`).
  - `Program` a `Podpořte nás` zamčeny v menu.
  - `/kandidati` živá — 12 slotů, postupné odhalování přes `revealed` v `lib/candidates.ts`.
  - `middleware.ts` se **nepoužívá** (soubor odstraněn); přístup k profilům řídí `isCandidateRevealed()`.

- `true` (Phase 2 — budoucí plný launch):
  - Homepage navíc: `ProgramGrid`, `AboutPreview`, `CandidatesGrid`.
  - Navigace i CTA plně aktivní.

## 5) Rendering a výkon

- App Router stránky jsou převážně statické.
- Kandidáti jsou předgenerováni (`generateStaticParams`) pro nízkou latenci.
- Hero využívá optimalizované obrázky (`webp` + fallback `jpg`) a responzivní `srcSet`.

## 6) Bezpečnostní hardening

V `next.config.mjs` jsou nastavena bezpečnostní hlavičky:

- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/mic/geolocation zakázány)
- `Strict-Transport-Security` (v produkci)

Tyto hlavičky jsou součástí baseline bezpečnosti a neměly by se oslabovat bez důvodu.

## 7) Klíčová rozhodnutí

- **Single source of truth pro kandidáty**: data nejsou duplikována v UI.
- **Feature flag pro launch**: umožní bezpečné spuštění domény bez odhalení plného obsahu.
- **CI před deploymentem**: build se validuje už na GitHub Actions.
- **Postupné odhalování kandidátů**: `revealed` flag + ruční deploy; profily skrytých kandidátů vrací 404.

