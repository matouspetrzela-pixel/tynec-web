# Kandidáti — stav a UI (2026-06)

> **Produkce je živá** od 22. 6. 2026. Aktuální stav a pravidla změn: [`current-production-state.md`](current-production-state.md).

## Strategie zveřejnění (pexeso)

- 12 fixních slotů v mřížce, **abecedně podle příjmení** (`gridSlot` v `lib/candidates.ts`)
- `revealed: false` → bílý placeholder (bez jména, fotky, odkazu)
- Postupné odhalování: nastavit `revealed: true` u vybraných jmen + deploy **po pokynu vlastníka**
- **Dev náhled produkce:** `NEXT_PUBLIC_PRODUCTION_PREVIEW=true` v `.env.local`
- **Dev ladění fotek:** bez `PRODUCTION_PREVIEW` — `isCandidateRevealed()` vrací `true` pro všechny

## Fotografie

- Zdroj: `../fofo kandidatu/foto kandidatu final/Gemini generated/` (+ fallback `.../final/`)
- Výstup: `public/images/kandidati/<slug>.webp` (4∶5, 960×1200)
- Pipeline: `npm run photos:kandidati` (`scripts/process-candidate-photos.mjs`)
- Kontrola: `npm run photos:kandidati:measure`, náhled: `npm run photos:kandidati:preview` → `_preview-grid.webp`

### Sladění oční linky (mřížka)

| Slug | Crop tuning | Zobrazení v kartě |
|------|-------------|-------------------|
| `michaela-dvorakova` | `faceFrac: 0.418`, `eyeLineInCrop: 0.355` | `object-[center_51%]` |
| `drahomira-obsnajdrova` | `faceFrac: 0.352`, `eyeLineInCrop: 0.458`, `headTopMargin: 0.05` | `portraitWebpTune: '-translate-y-[5%]'` |
| `katerina-parcova` | default + `faceFrac: 0.348`, `headTopMargin: 0.10` | `object-[center_52%]` |

U přesného výřezu 4∶5 `object-position` neovlivní posun — jemné doladění v mřížce je přes `portraitWebpTune` (translate na obalu `next/image`).

## UI — přehled `/kandidati`

- Úvod: jeden odstavec pod H1, plná šířka `max-w-6xl`
- Karta (odhalená): foto → jméno → **PROFIL KANDIDÁTA →**
- Celá karta je `<Link>`, priorita jen na profilu (label **Srdcová priorita**)
- Rám karty (`.card-candidate`): šedý 1px + červená linka dole
- Placeholder: bílý box, bez červené, bez odkazu

## UI — profil `/kandidati/[slug]`

- Pole `name`, `heartPriority`, `bio`, volitelně `priorities`, `profileClosing`
- Nezveřejněný slug → 404

## Klíčové soubory

| Soubor | Účel |
|--------|------|
| `lib/candidates.ts` | data, `revealed`, `gridSlot`, harmonogram v komentáři |
| `components/CandidateCard.tsx` | dlaždice |
| `components/CandidatesGrid.tsx` | mřížka |
| `components/CandidatePortrait.tsx` | portrét 4∶5 |
| `app/kandidati/page.tsx` | stránka + úvodní text |
| `app/kandidati/[slug]/page.tsx` | profil |
| `components/Header.tsx` | Kandidáti `alwaysUnlocked: true` |
