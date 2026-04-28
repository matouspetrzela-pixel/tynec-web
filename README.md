# Pro Týnec srdcem — technická dokumentace

Webová prezentace kandidátky **Pro Týnec srdcem** pro komunální volby 2026.

**Live URL:** [protynec.cz](https://protynec.cz)  
**Repozitář:** [github.com/matouspetrzela-pixel/tynec-web](https://github.com/matouspetrzela-pixel/tynec-web)

## Dokumentace

Detailní technická dokumentace je ve složce `docs/`:

- `docs/README.md` — rozcestník dokumentace
- `docs/architecture.md` — architektura aplikace a rozhodnutí
- `docs/operations.md` — provoz, CI/CD, Vercel a troubleshooting
- `docs/content-workflow.md` — jak bezpečně upravovat obsah
- `docs/release-checklist.md` — checklist pro release a launch
- `docs/owner-handbook.md` — rychlý návod pro správu webu bez programování

---

## Technický stack

| Technologie | Verze | Účel |
|---|---|---|
| Next.js | 14.2.35 | Framework (App Router) |
| React | 18 | UI library |
| TypeScript | 5 | Typová bezpečnost |
| Tailwind CSS | 3.4 | Utility-first styling |
| Lucide React | 0.561 | Ikony |
| Vercel | — | Hosting a CI/CD |

---

## Spuštění lokálního prostředí

**Požadavky:** Node.js 18+, npm

```bash
# Instalace závislostí
npm install

# Vývojový server (Webpack — výchozí a stabilní)
npm run dev

# Vývojový server (Turbopack — volitelně)
npm run dev:turbo

# Čisté spuštění (smaže cache + spustí Webpack)
npm run dev:clean

# Produkční build
npm run build

# Spuštění produkčního buildu lokálně
npm run start
```

Web běží na **http://localhost:3000** (případně **http://127.0.0.1:3000**).

> **Windows PowerShell:** příkazy **nespojuj** operátorem `&&` (na starších verzích selže). Použij jeden řádek se středníkem, např.  
> `cd c:\Development\webobec\tynec-web; npm run dev`  
> Nebo nejdřív `cd` do složky `tynec-web`, pak `npm run dev`. Spouštění z `c:\Development` bez `package.json` skončí chybou ENOENT.

### Když se stránka nenačte nebo je bílá

1. Ověř, že terminál ukazuje **„Ready“** a adresa **Local: http://localhost:3000**.
2. Jednou spusť **`npm install`** ve složce `tynec-web`, pokud chybí `node_modules`.
3. Pokud Turbopack zlobí, spusť stabilní režim: **`npm run dev`** (Webpack). Turbopack je dostupný přes **`npm run dev:turbo`**.
4. Tvrdý refresh v prohlížeči: **Ctrl+Shift+R**.
5. Port obsazený jinou aplikací: v terminálu uvidíš `EADDRINUSE` — ukonči druhý proces nebo změň port: `npx next dev -p 3001`.

---

## CI/CD — automatické nasazování

Web je napojen na **Vercel** s plně automatickým CI/CD a na **GitHub Actions** s kontrolou před nasazením.

### Workflow po každém commitu

```
git push origin main
  │
  ├─▶ GitHub Actions CI (.github/workflows/ci.yml)
  │     1. npm ci          — reprodukovatelná instalace
  │     2. npm run lint    — kontrola kódu
  │     3. npm run build   — ověření produkčního buildu
  │     ✓ nebo ✗ — výsledek vidíte na záložce "Actions" v GitHub
  │
  └─▶ Vercel (vercel.json)
        npm ci + npm run build → nasazení na protynec.cz
```

```bash
# Standardní workflow — commit + push = automatické nasazení
git add -A
git commit -m "popis změny"
git push origin main
```

**Větev:** `main` (výchozí větev GitHub repozitáře)  
**Vercel projekt:** `tynec-web` (tým `matous-petrzelas-projects`)  
**Build příkaz:** `npm run build` (definován v `vercel.json`)  
**Install příkaz:** `npm ci` (definován v `vercel.json` — použije lockfile)  
**Node.js:** `20.x` (definován v `vercel.json`)

### Před commitem (doporučeno)

```bash
npm run lint
npm run build
```

Oba příkazy musí projít bez chyb. Pokud projdou lokálně, projdou i na CI a Vercelu.

---

## Phase strategie — fázované spuštění

Web je řízen proměnnou `NEXT_PUBLIC_SITE_LAUNCHED` nastavenou ve Vercelu.

| Proměnná | Co uvidí návštěvník |
|---|---|
| `false` (Phase 1) | Pouze hero stránka s coming-soon sdělením, nav neklikatelný |
| `true` (Phase 2) | Plný funkční web |

### Větvení

```
main    → Vercel produkce → protynec.cz
develop → Vercel preview URL (probíhající práce)
```

### Phase 1 — tento týden

```bash
# Nastavit ve Vercelu:
# Settings → Environment Variables
# NEXT_PUBLIC_SITE_LAUNCHED = false   (scope: Production)
```

Soubory ovlivněné Phase přepínačem:
- `middleware.ts` — přesměruje `/o-nas`, `/program`, `/kandidati`, `/podporte-nas` → `/`
- `components/Header.tsx` — nav jako plain text, "Podpořte nás" skryto
- `components/hero/HeroLead.tsx` — skryta CTA tlačítka, zobrazeno coming-soon sdělení
- `app/page.tsx` — skryty sekce ProgramGrid, AboutPreview, CandidatesGrid

### Práce na Phase 2 (plný web)

```bash
git checkout develop
# přidávejte fotky, profily kandidátů, texty...
git add -A
git commit -m "přidány fotky kandidátů"
git push origin develop
# → Vercel vytvoří preview URL pro testování, produkce se nedotkne
```

### Phase 2 — spuštění plného webu

```bash
# 1. Otestovat vše na develop preview URL
# 2. Merge develop → main
git checkout main
git merge develop
git push origin main

# 3. Ve Vercelu změnit proměnnou:
# NEXT_PUBLIC_SITE_LAUNCHED = true → Redeploy
# → Plný web okamžitě živý, žádný nový commit není potřeba
```

---

## Struktura projektu

```
tynec-web/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Kořenový layout + globální SEO metadata
│   ├── page.tsx                # Domovská stránka
│   ├── globals.css             # Globální styly, animace, View Transition API
│   ├── o-nas/page.tsx          # Stránka „O nás"
│   ├── program/page.tsx        # Stránka „Program"
│   ├── kandidati/
│   │   ├── page.tsx            # Seznam kandidátů
│   │   └── [slug]/page.tsx     # Dynamický profil kandidáta (SSG)
│   ├── podporte-nas/page.tsx   # Stránka „Podpořte nás"
│   ├── error.tsx               # Error boundary (App Router)
│   ├── global-error.tsx        # Globální error boundary
│   └── not-found.tsx           # Stránka 404
│
├── components/                 # Sdílené komponenty
│   ├── Header.tsx              # Fixní navigační lišta
│   ├── Footer.tsx              # Patička s kontakty a logem
│   ├── Hero.tsx                # Úvodní sekce s fotografií + glass panel
│   ├── ProgramGrid.tsx         # Sekce „10 bodů rozvoje"
│   ├── AboutPreview.tsx        # Sekce „O nás" (preview na homepage)
│   ├── CandidatesGrid.tsx      # Mřížka kandidátů
│   ├── CandidateCard.tsx       # Karta jednoho kandidáta s odkazem
│   ├── FacebookBrandIcon.tsx   # Facebook SVG ikona
│   └── HeartIcon.tsx           # BrandHeartLogo (PNG srdce, jednotné měřítko)
│
├── lib/                        # Sdílená data a utility
│   ├── candidates.ts           # Data kandidátů (CANDIDATES array)
│   └── social.ts               # Kontakty (FACEBOOK_URL, EMAIL)
│
├── public/
│   └── images/
│       ├── 9000.jpg            # Hlavní fotografie obce (Hero, OG image)
│       └── logo-srdce.png      # Logo srdce (průhledné pozadí), jediný brand asset
│
├── next.config.mjs             # Next.js konfigurace
├── tailwind.config.ts          # Tailwind téma a barvy
├── tsconfig.json               # TypeScript konfigurace
└── start-dev.ps1               # PowerShell skript pro čisté spuštění
```

---

## Stránky a routing

| URL | Soubor | Popis |
|---|---|---|
| `/` | `app/page.tsx` | Domovská stránka |
| `/o-nas` | `app/o-nas/page.tsx` | O hnutí |
| `/program` | `app/program/page.tsx` | 10 bodů programu |
| `/kandidati` | `app/kandidati/page.tsx` | Přehled kandidátů |
| `/kandidati/[slug]` | `app/kandidati/[slug]/page.tsx` | Profil kandidáta |
| `/podporte-nas` | `app/podporte-nas/page.tsx` | Podpořte nás |

Profily kandidátů jsou staticky generovány (`generateStaticParams`) z dat v `lib/candidates.ts`.

---

## Design systém

### Barvy (Tailwind)

| Token | Hodnota | Použití |
|---|---|---|
| `primary` | `#D71920` | Červená — akcenty, CTA, dekorativní linky |
| `primary-hover` | `#B8141A` | Hover stav tlačítek |
| `tynec-black` | `#1A1A1A` | Hlavní text |
| `tynec-gray` | `#6B7280` | Sekundární text, tagy |
| `tynec-gray-soft` | `#F4F4F5` | Světlé pozadí sekcí |

### Typografie

- **Písmo:** Inter (Google Fonts, variable font)
- **Nadpisy:** `font-bold uppercase tracking-tight`
- **Velikosti:** `text-h2-mobile` (28 px) → `md:text-h2-desktop` (36 px)
- **Hero nadpis:** `clamp(2rem, 4.5vw, 3.8rem)` — plynulé škálování

### Klíčové vizuální prvky

**Glass panel (Hero sekce):**
```css
background: rgba(10, 10, 10, 0.48);
backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.10);
box-shadow: 0 8px 40px 0 rgba(0,0,0,0.25);
```

**Karty (ProgramGrid, CandidateCard, podstránky):**
```
rounded-2xl border border-gray-100 bg-white hover:border-gray-200
```

**Header logo:** samotné PNG na čistém podkladu bez stínu a bez ohraničujícího „badge“ rámečku.

**Scroll reveal animace:**
```css
.reveal {
  animation: reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 28%;
}
```

**View Transition API** — plynulé přechody mezi stránkami jsou definovány v `globals.css` přes `::view-transition-old/new` s `@supports` guard pro starší prohlížeče.

---

## SEO a metadata

Globální metadata jsou definována v `app/layout.tsx`:

- `metadataBase`: `https://protynec.cz`
- `title template`: `%s | Pro Týnec srdcem`
- **Open Graph** obrázek: `/images/9000.jpg` (1920×1080)
- **Twitter card**: `summary_large_image`

Každá podstránka má vlastní `export const metadata` s konkrétním `title` a `description`.

---

## Kandidáti — správa dat

Všechna data kandidátů jsou centralizována v `lib/candidates.ts`:

```typescript
export interface Candidate {
  id: number;
  slug: string;          // URL slug: /kandidati/jan-novak
  name: string;
  heartPriority: string; // Krátká priorita na kartě
  gender: 'male' | 'female'; // Pro správné skloňování nadpisu profilu
  photo?: string;        // Cesta k fotce v /public/images/kandidati/
  position?: string;     // Profese / funkce
  bio?: string;          // Delší bio text
  priorities?: string[]; // Seznam osobních priorit
}
```

**Přidání kandidáta:**
1. Přidejte záznam do pole `CANDIDATES` v `lib/candidates.ts` (nezapomeňte na pole `gender`)
2. Uložte fotku do `public/images/kandidati/jan-novak.jpg`
3. Nastavte `photo: '/images/kandidati/jan-novak.jpg'`
4. `git push` → Vercel automaticky vygeneruje novou statickou stránku

---

## Kontakty a sociální sítě

Centralizovány v `lib/social.ts`:

```typescript
// Facebook URL — přepište přes env proměnnou NEXT_PUBLIC_FACEBOOK_URL
export const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ??
  'https://www.facebook.com/share/18R7rjcjTu/';

// Kontaktní email hnutí
export const EMAIL = 'protynec@seznam.cz';
```

---

## Lokální stabilita (Windows)

Projekt byl odladěn pro stabilní provoz na Windows:

- **Webpack** jako výchozí dev server (`npm run dev`) — stabilnější v tomto projektu
- `reactStrictMode: true` — zachycuje potenciální problémy v React komponentách
- Složka `pages/` neexistuje — čistý App Router bez konfliktů

---

## Skripty

| Příkaz | Popis |
|---|---|
| `npm run dev` | Webpack dev server na portu 3000 (výchozí) |
| `npm run dev:turbo` | Turbopack dev server (volitelně) |
| `npm run dev:webpack` | Webpack dev server |
| `npm run dev:clean` | Smaže cache + spustí Webpack |
| `npm run clean` | Smaže `.next` a `node_modules/.cache` |
| `npm run build` | Produkční build |
| `npm run start` | Spustí produkční build lokálně |
| `npm run lint` | ESLint kontrola |
