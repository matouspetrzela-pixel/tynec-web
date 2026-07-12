# Aktuální stav webu (červenec 2026 — nasazeno)

> **Pro AI agenta / vývojáře:** Tento soubor čti jako první před jakoukoliv prací na projektu.

## Pravidlo změn (závazné)

**Prováděj pouze to, co explicitně zadá vlastník webu.**  
Commit a deploy **jen na explicitní pokyn**.

---

## Fáze webu: Kampaň s plně odemčenou navigací

| Proměnná (Vercel Production) | Hodnota |
|---|---|
| `NEXT_PUBLIC_SITE_LAUNCHED` | `false` |
| LOCAL flagy (`NEXT_PUBLIC_LOCAL_*`) | **nepoužívat** — chování je v kódu natvrdo |

### Úvodní stránka `/`

**Pouze hero s fotkou obce a patička.** Žádná mezisekce mezi nimi.

- Hero box: eyebrow „Změna začíná vaším hlasem“, badge voleb, logo, Facebook pod logem
- CTA: **Náš program** (primary), **Kandidáti**, **Aktuality**, **Podpořte nás**
- **Není** mřížka kandidátů na homepage (zobrazí se až po `SITE_LAUNCHED=true`)

#### Responzivita hero (nasazeno `9081639` + lokální oprava notebooku)

| Zařízení | Chování |
|---|---|
| Mobil (~66 % GA) | Centrovaný box, patička těsně pod ním, **bez prázdné prodlevy** |
| Tablet (~0,4 %) | Centrovaný box, fullscreen výška hero |
| Notebook (1280–1919 px) | Dole vlevo, bez useknutí, bez nutnosti zoom out |
| Desktop (~34 %, 1920 px+) | Fullscreen hero, box vlevo dole s `-ml-32`, patička po scrollu |

Detailní popis breakpointů, CSS a QA: [`hero-homepage.md`](hero-homepage.md).

### Navigace (`components/Header.tsx`)

| Položka | Stav |
|---|---|
| O nás | odemčeno |
| Program | **odemčeno** |
| Kandidáti | odemčeno |
| Aktuality | odemčeno |
| Podpořte nás | **odemčeno** (červené tlačítko) |

### Sekce Kandidáti `/kandidati`

- **11 kandidátů**, všichni `revealed: true`
- Abecední pořadí podle `gridSlot` 1–11
- Nezveřejněný profil: **404**
- **Oční linka v mřížce:** Drahomíra Obšnajdrová sladěna s osou Michaela Dvořáková / Kateřina Parčová (crop `eyeLineInCrop` + `portraitWebpTune: '-translate-y-[5%]'` v `lib/candidates.ts`; WebP přegenerován)

### Všichni kandidáti (11/11 odhaleno)

`michal-andrysek`, `petra-andryskova`, `jiri-dvorak`, `michaela-dvorakova`, `drahomira-obsnajdrova`, `katerina-parcova`, `filip-sklenar`, `vaclav-sklenar`, `alena-sojakova`, `michal-svitak`, `jakub-zadnik`

---

## Poslední nasazené commity (main)

| Commit | Popis |
|---|---|
| `9e43054` | Sjednocená typografie: menší H1–H3, perexy, kompaktní primární tlačítka, `PageSectionHeader` |
| `9081639` | Responzivita hero: mobil bez prodlevy, tablet centrovaný, desktop box vlevo dole |
| `b6d346c` | Hero fullscreen — patička pod foldem |
| `70bd40c` | Kampaňová homepage, Program/Podpořte odemčeny, 11 kandidátů |

### Typografie (nasazeno `9e43054`)

- Nadpisy stránek: **20 / 26 px** (mobil / desktop)
- Sekce H2: **17 / 22 px**, H3: **15 / 17 px**
- Tělo: **16 px**, perex: **16 / 18 px**
- Primární tlačítka: **12 / 14 px** — viz [`typography.md`](typography.md)

---

## Lokální vývoj

| Účel | Nastavení |
|---|---|
| Běžný vývoj | `npm run dev` — stejný vizuál jako produkce po deployi |
| Náhled jen revealed | `NEXT_PUBLIC_PRODUCTION_PREVIEW=true` v `.env.local` (volitelné) |
| Problém s portem 3000 | `npm run dev:clean` |

`isCandidateRevealed()`: produkce = `candidate.revealed`; dev bez PRODUCTION_PREVIEW = všichni (pro ladění fotek).

---

## Necommitovat

`.cursor/`, `.vscode/`, `.tmp-photo-one/`, `components/home/HomeCampaignFront.tsx`, `.env.local`, `scripts/sources/` (prázdné), zpracované PNG mimo pipeline.

---

## Související dokumentace

- [`typography.md`](typography.md) — typografie a tlačítka
- [`hero-homepage.md`](hero-homepage.md) — layout hero, breakpointy, QA
- [`content-workflow.md`](content-workflow.md)
- [`kandidati-local-status.md`](kandidati-local-status.md)
- [`architecture.md`](architecture.md)
- [`release-checklist.md`](release-checklist.md)
