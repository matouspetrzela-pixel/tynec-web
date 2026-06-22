# Kandidáti — lokální stav práce (2026-06)

> **Scope:** pouze localhost / lokální vývoj. **Nedeployovat** dokud není sekce v top kvalitě a vlastník neřekne další krok.

## Strategie zveřejnění (pexeso)

- 12 fixních slotů v mřížce, **abecedně podle příjmení** (`gridSlot` v `lib/candidates.ts`)
- `revealed: false` → bílý placeholder (bez jména, fotky, odkazu)
- Postupné odhalování: nastavit `revealed: true` u vybraných jmen + deploy
- **Dev náhled:** `isCandidateRevealed()` vrací `true` pro všechny, když `NODE_ENV === 'development'`

## Fotografie

- Zdroj: `../fofo kandidatu/foto kandidatu final/Gemini generated/` (+ fallback `.../final/`)
- Výstup: `public/images/kandidati/<slug>.webp` (4∶5, 960×1200)
- Pipeline: `npm run photos:kandidati` (`scripts/process-candidate-photos.mjs`)
  - BlazeFace **landmarky očí**, `EYE_LINE_IN_CROP=0.36`, `HEAD_FRAC=0.41`
  - Kontrola: `npm run photos:kandidati:measure`, náhled: `npm run photos:kandidati:preview` → `_preview-grid.webp`
- Fotky a většina kódu sekce **nejsou na produkci**, dokud se necommitne/nedeployne

## UI — přehled `/kandidati`

- Úvod: jeden odstavec pod H1, plná šířka `max-w-6xl`
- Karta (odhalená): foto → jméno → **PROFIL KANDIDÁTA →** (`text-xs uppercase tracking-[0.14em]`, jako menu)
- Celá karta je `<Link>`, bez textu priority na dlaždici (priorita jen na profilu)
- Rám karty (`.card-candidate`): šedý 1px + **červená linka dole** `border-b-2 border-b-primary` (ne plný červený box)
- Placeholder: šedý rám, bez červené
- Jména v řadě: pevná výška bloku jména (`CandidateCard.tsx`)
- Mřížka: kompaktnější odsazení nahoře (`CandidatesGrid` s `showTitle={false}`)

## UI — profil `/kandidati/[slug]`

- Zatím jedno pole `name` v datech (strukturovaná jména `givenName`/`titles` **plánována**, ne dokončena)
- `heartPriority` v boxu na profilu; `bio` doplnit později

## Klíčové soubory

| Soubor | Účel |
|--------|------|
| `lib/candidates.ts` | data, `revealed`, `gridSlot` |
| `components/CandidateCard.tsx` | dlaždice |
| `components/CandidatesGrid.tsx` | mřížka |
| `app/kandidati/page.tsx` | stránka + úvodní text |
| `app/kandidati/[slug]/page.tsx` | profil |
| `app/globals.css` | `.card-candidate` |
| `scripts/process-candidate-photos.mjs` | generování WebP |

## Co ještě může přijít (lokálně)

- Strukturovaná jména na profilu (tituly nad H1, bez rozbitého zalomení)
- Medailonky `bio` po dodání textů
- Týdenní odhalení: `revealed: true` pro 2 jména dle domluvy
- Deploy až po schválení „top kvality“
