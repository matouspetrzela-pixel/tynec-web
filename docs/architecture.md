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
- **Responzivita hero homepage:** viz [`hero-homepage.md`](hero-homepage.md) — mobil / tablet / desktop breakpointy, `.hero-viewport-fill`, pozice panelu.

### `lib/`
- `lib/candidates.ts`: centralizovaná data kandidátů (single source of truth).
- `lib/social.ts`: Facebook URL a kontakt.
- `lib/aktuality.ts`: centralizovaná data aktualit (pole `AKTUALITY`). Řazení sestupně dle `datum`. Vykreslení a **paginace (8 / stránku)**: `app/aktuality/page.tsx`.

## 4) Fázovaný režim (Phase 1 vs Phase 2)

Řídí proměnná `NEXT_PUBLIC_SITE_LAUNCHED`. **Aktuální produkční stav:** viz [`current-production-state.md`](current-production-state.md).

- `false` (Phase 1 — aktuální stav, červenec 2026):
  - Homepage: **pouze hero s fotkou + patička** (`app/page.tsx` — bez mezisekcí).
  - Hero CTA: Náš program, Kandidáti, Aktuality, Podpořte nás, Facebook pod logem.
  - Navigace: `O nás`, **`Program`**, **`Kandidáti`**, **`Aktuality`**, **`Podpořte nás`** odemčeny (`alwaysUnlocked: true` / `podporteUnlocked`).
  - `/kandidati` živá — 11 kandidátů, všichni `revealed: true`, pořadí = listina (`gridSlot`).
  - `/podporte-nas` — včetně pásu partnerů (`SupportSponsorsStrip`).
  - `middleware.ts` se **nepoužívá** (soubor odstraněn); přístup k profilům řídí `isCandidateRevealed()`.

- `true` (Phase 2 — budoucí plný launch):
  - Homepage navíc: `ProgramGrid`, `AboutPreview`, `CandidatesGrid`.
  - Navigace i CTA plně aktivní.

## 5) Rendering a výkon

- App Router stránky jsou převážně statické.
- Kandidáti jsou předgenerováni (`generateStaticParams`) pro nízkou latenci.
- Hero využívá optimalizované obrázky (`webp` + fallback `jpg`) a responzivní `srcSet` **800 / 1280 / 1920 / 2560**.
- Homepage preloaduje LCP webp (`HERO_LCP_PRELOAD` v `components/Hero.tsx`); hero logo **nemá** `priority`, aby nesoupeřilo o bandwidth s fotkou.
- Hero výška: mobil = obsah boxu (`min-height: auto`), tablet/desktop = `100dvh` minus hlavička — viz [`hero-homepage.md`](hero-homepage.md).

## 6) Bezpečnostní hardening a právní minimum

### Hlavičky (`next.config.mjs`)

- `Content-Security-Policy` (baseline; skripty GA + `'unsafe-inline'` kvůli Next/gtag — Lighthouse může hlásit „slabší CSP“, to je očekávané)
- `Access-Control-Allow-Origin: https://www.protynecsrdcem.cz` (přepisuje výchozí Vercel `*`)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/mic/geolocation zakázány)
- `Cross-Origin-Opener-Policy` / `Cross-Origin-Resource-Policy: same-origin`
- `Strict-Transport-Security` (v produkci)

Tyto hlavičky jsou součástí baseline bezpečnosti a neměly by se oslabovat bez důvodu.

### Cookies / GA4

- GA běží **jen po souhlasu** (`components/CookieConsent.tsx` + `lib/cookie-consent.ts`).
- Lišta je v SSR HTML (skenery ji najdou); dříve uložený výběr skryje bootstrap skript před paintem.
- Bez `NEXT_PUBLIC_GA_MEASUREMENT_ID` se lišta ani GA nenačítají.

### Právní stránky a kontakt pro security

| Položka | Kde |
|---|---|
| Ochrana osobních údajů | `/ochrana-osobnich-udaju` + odkaz ve footeru |
| `security.txt` | `public/.well-known/security.txt` → `/.well-known/security.txt` |
| Skip link | „Přeskočit na obsah“ v `app/layout.tsx` |
| Homepage `<h1>` | `sr-only` v `HeroLead.tsx` („Pro Týnec srdcem“) |

### Co zůstává mimo kód (doporučené u registrátora / DNS)

E-mail kampaně je **`protynecsrdcem@seznam.cz`**, ne schránka na `@protynecsrdcem.cz`. I tak je vhodné na **apex** doméně (`protynecsrdcem.cz`) doplnit DNS záznamy proti spoofingu:

| Záznam | Stav | Doporučení |
|---|---|---|
| **SPF** (TXT) | chybí | např. `v=spf1 -all`, pokud z domény **neposíláte** mail; jinak podle poskytovatele schránky |
| **DMARC** (TXT na `_dmarc`) | chybí | začít `v=DMARC1; p=none; rua=mailto:…` a později zpřísnit |
| **DKIM** | N/A dokud neposíláte z domény | nastaví poskytovatel e-mailu |
| **DNSSEC** | vypnuto | zapnout u registrátora `.cz` (volitelné, doporučené) |

Prohlášení o přístupnosti **není** u tohoto typu webu povinné — záměrně není.

Kontrola skenerem: [vibescan.cz](https://vibescan.cz) (červenec 2026: baseline ~92; po hardenignu hlavně LCP + CORS + právní stránky).

## 7) Klíčová rozhodnutí

- **Single source of truth for kandidáty**: data nejsou duplikována v UI.
- **Feature flag pro launch**: umožní bezpečné spuštění domény bez odhalení plného obsahu.
- **CI před deploymentem**: build se validuje už na GitHub Actions.
- **Postupné odhalování kandidátů**: `revealed` flag + ruční deploy; profily skrytých kandidátů vrací 404.
- **GA jen se souhlasem**: žádné analytické cookies před volbou v liště.

## 8) Typografie a tlačítka

Od července 2026 (commit `9e43054`) je typografie sjednocená přes CSS proměnné v `app/globals.css` a sdílené třídy — **bez duplikace `clamp()` v komponentách**.

| Oblast | Soubory / třídy |
|---|---|
| Tokeny H1–H3 | `:root` → `--font-h1-mobile` (20 px) … `--font-h3-desktop` (17 px) |
| Nadpisy stránek | `.type-h1`, `.type-h2`, `.type-h3`, `.type-eyebrow`, `.type-lead` |
| Záhlaví sekcí | `components/PageSectionHeader.tsx` |
| Tlačítka | `.btn-primary-solid`, `.btn-primary-sheen`, `.btn-action--*` |
| Hero text v boxu | `.hero-lead` + `--hl-eyebrow-text`, `--hl-badge-text`, `--hl-btn-*` |
| Tailwind aliasy | `text-h1-mobile` … mapují na stejné CSS proměnné |

Kompletní tabulka velikostí: [`typography.md`](typography.md) a `README.md` § Design systém.

