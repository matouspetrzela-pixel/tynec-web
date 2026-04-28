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

### `middleware.ts`
- V režimu Phase 1 přesměruje všechny relevantní routy na `/`.
- Brání přístupu na neodhalené části webu i při přímém zadání URL.

## 4) Fázovaný režim (Phase 1 vs Phase 2)

Řídí proměnná `NEXT_PUBLIC_SITE_LAUNCHED`:

- `false` (Phase 1):
  - Homepage ve "coming soon" režimu.
  - Navigace a interní akce jsou vizuálně uzamčené.
  - Aktivní je jen externí Facebook odkaz v hero panelu.
  - Middleware směruje návštěvnost na `/`.

- `true` (Phase 2):
  - Full web (program, kandidáti, podstránky, akce).
  - Navigace i CTA jsou aktivní.
  - Middleware neomezuje interní routy.

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
- **Defenzivní middleware**: nečeká na klientský stav, rozhoduje už na serverové vrstvě.

