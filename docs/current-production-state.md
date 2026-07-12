# Aktuální stav webu (červenec 2026 — po chystaném commitu)

> **Pro AI agenta / vývojáře:** Tento soubor čti jako první před jakoukoliv prací na projektu.  
> Popisuje cílový stav kódu v repozitáři (připraveno k deployi, commit zatím na pokyn vlastníka).

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

## Lokální vývoj

| Účel | Nastavení |
|---|---|
| Běžný vývoj | `npm run dev` — stejný vizuál jako produkce po deployi |
| Náhled jen revealed | `NEXT_PUBLIC_PRODUCTION_PREVIEW=true` v `.env.local` (volitelné) |

`isCandidateRevealed()`: produkce = `candidate.revealed`; dev bez PRODUCTION_PREVIEW = všichni (pro ladění fotek).

---

## Chystaný commit (připraveno lokálně, bez push)

Součást stejného commitu jako homepage / hero / odemknutí navigace / 11 kandidátů:

| Oblast | Soubory |
|---|---|
| Oční osa Obšnajdrová | `scripts/process-candidate-photos.mjs` (`SLUG_EXTRACT_TUNING['drahomira-obsnajdrova']`), `lib/candidates.ts` (`portraitWebpTune`), `public/images/kandidati/drahomira-obsnajdrova.webp` |
| Michaela Dvořáková (crop) | `lib/candidates.ts`, `public/images/kandidati/michaela-dvorakova.webp` |
| Poslední odhalení | `vaclav-sklenar.webp`, `alena-sojakova.webp` |
| Hero / layout / nav / program / podpora | viz `git status` |

**Necommitovat:** `.cursor/`, `.vscode/`, `.tmp-photo-one/`, `components/home/HomeCampaignFront.tsx`, `.env.local`, `scripts/sources/` (prázdné).

---

## Související dokumentace

- [`content-workflow.md`](content-workflow.md)
- [`kandidati-local-status.md`](kandidati-local-status.md)
- [`architecture.md`](architecture.md)
- [`release-checklist.md`](release-checklist.md)
