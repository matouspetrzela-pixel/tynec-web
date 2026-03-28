# Pro Velký Týnec — technická dokumentace

Webová prezentace kandidátky **Pro Velký Týnec** pro komunální volby 2026.

**Live URL:** [tynec-web.vercel.app](https://tynec-web.vercel.app)
**Repozitář:** [github.com/matouspetrzela-pixel/tynec-web](https://github.com/matouspetrzela-pixel/tynec-web)

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

# Vývojový server (Turbopack — doporučeno na Windows)
npm run dev

# Vývojový server (Webpack — záložní)
npm run dev:webpack

# Čisté spuštění (smaže cache + spustí Turbopack)
npm run dev:clean

# Produkční build
npm run build

# Spuštění produkčního buildu lokálně
npm run start
```

Web běží na **http://localhost:3000**

---

## Struktura projektu

```
tynec-web/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Kořenový layout (Header + Footer)
│   ├── page.tsx                # Domovská stránka
│   ├── globals.css             # Globální styly, Tailwind direktivy
│   ├── o-nas/page.tsx          # Stránka „O nás"
│   ├── program/page.tsx        # Stránka „Program"
│   ├── kandidati/
│   │   ├── page.tsx            # Seznam kandidátů
│   │   └── [slug]/page.tsx     # Dynamický profil kandidáta
│   ├── kontakt/page.tsx        # Kontaktní stránka
│   ├── error.tsx               # Error boundary (App Router)
│   ├── global-error.tsx        # Globální error boundary
│   └── not-found.tsx           # Stránka 404
│
├── components/                 # Sdílené komponenty
│   ├── Header.tsx              # Fixní navigační lišta
│   ├── Footer.tsx              # Patička s kontakty
│   ├── Hero.tsx                # Úvodní sekce s fotografií
│   ├── ProgramGrid.tsx         # Sekce „10 bodů rozvoje"
│   ├── AboutPreview.tsx        # Sekce „O nás" (preview)
│   ├── CandidatesGrid.tsx      # Mřížka kandidátů
│   ├── CandidateCard.tsx       # Karta jednoho kandidáta
│   ├── FacebookBrandIcon.tsx   # Facebook SVG ikona
│   └── HeartIcon.tsx           # Srdce SVG ikona
│
├── lib/                        # Sdílená data a utility
│   ├── candidates.ts           # Data kandidátů (CANDIDATES array)
│   └── social.ts               # Sociální sítě (FACEBOOK_URL)
│
├── public/
│   └── images/
│       ├── 9000.jpg            # Hlavní fotografie obce (Hero)
│       ├── logo_srdce_red.svg  # Logo — červené (Header)
│       └── logo_srdce_white.svg# Logo — bílé (Footer)
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
| `/kontakt` | `app/kontakt/page.tsx` | Kontakt |

Profily kandidátů jsou staticky generovány (`generateStaticParams`) z dat v `lib/candidates.ts`.

---

## Design systém

### Barvy (Tailwind)

| Token | Hodnota | Použití |
|---|---|---|
| `primary` | `#D71920` | Červená — akcenty, CTA |
| `primary-hover` | `#B8141A` | Hover stav tlačítek |
| `tynec-black` | `#1A1A1A` | Hlavní text |
| `tynec-gray` | `#6B7280` | Sekundární text, tagy |
| `tynec-gray-soft` | `#F4F4F5` | Světlé pozadí sekcí |

### Typografie

- **Písmo:** Inter (Google Fonts, variable font)
- **Nadpisy:** `font-bold uppercase tracking-tight`
- **Velikosti:** `text-h2-mobile` (28 px) → `md:text-h2-desktop` (36 px)
- **Hero nadpis:** `clamp(2rem, 4.5vw, 3.8rem)` — plynulé škálování

### Komponenty

**Glass panel (Hero):**
```css
background: rgba(10, 10, 10, 0.48);
backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.10);
```

**Karty (ProgramGrid, CandidateCard):**
```
rounded-2xl border border-gray-100 bg-white hover:border-gray-200
```

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

## Kandidáti — správa dat

Všechna data kandidátů jsou centralizována v `lib/candidates.ts`:

```typescript
export interface Candidate {
  id: number;
  slug: string;          // URL slug: /kandidati/jan-novak
  name: string;
  heartPriority: string; // Krátká priorita na kartě
  photo?: string;        // Cesta k fotce v /public/images/kandidati/
  position?: string;     // Profese
  bio?: string;          // Delší bio
  priorities?: string[]; // Seznam osobních priorit
}
```

**Přidání fotky kandidáta:**
1. Uložte fotku do `public/images/kandidati/jan-novak.jpg`
2. V `lib/candidates.ts` nastavte `photo: '/images/kandidati/jan-novak.jpg'`

---

## Sociální sítě

Facebook URL je centralizován v `lib/social.ts` a lze přepsat přes env proměnnou:

```typescript
export const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ??
  'https://www.facebook.com/share/18R7rjcjTu/';
```

---

## Deployment

Web je nasazen na **Vercel** s automatickým CI/CD z větve `master`.

Každý `git push` na `master` spustí automatický build a deployment.

**Ruční deployment přes CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Vercel build příkaz:** `npm run build`
**Output directory:** `.next` (detekuje automaticky)

---

## Lokální stabilita (Windows)

Projekt byl odladěn pro stabilní provoz na Windows:

- **Turbopack** jako výchozí dev server (`npm run dev`) — stabilnější HMR na Windows než Webpack
- `tsconfig.json` nemá `incremental: true` — předchází korrupci `.tsbuildinfo`
- `reactStrictMode: false` — potlačuje dvojité renderování v dev módu
- Složka `pages/` neexistuje — čistý App Router bez konfliktů

---

## Skripty

| Příkaz | Popis |
|---|---|
| `npm run dev` | Turbopack dev server na portu 3000 |
| `npm run dev:webpack` | Webpack dev server (záložní) |
| `npm run dev:clean` | Smaže cache + spustí Turbopack |
| `npm run clean` | Smaže `.next` a `node_modules/.cache` |
| `npm run build` | Produkční build |
| `npm run start` | Spustí produkční build lokálně |
| `npm run lint` | ESLint kontrola |
