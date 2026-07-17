# Kandidáti — stav a UI (červenec 2026)

> **Produkce je živá.** Aktuální stav a pravidla změn: [`current-production-state.md`](current-production-state.md).

## Pořadí a zveřejnění

- **11 slotů** v mřížce podle **kandidátní listiny** (`gridSlot` 1–11 v `lib/candidates.ts`) — ne abeceda
- Finální pořadí: viz komentář + `gridSlot` v `lib/candidates.ts` / [`current-production-state.md`](current-production-state.md)
- Všichni `revealed: true` (červenec 2026)
- Nezveřejněný slug → 404
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

- Úvod: text pod H1 — členové týmu seřazeni podle pořadí na kandidátní listině
- Karta (odhalená): foto se **studio mark** číslem (vlevo nahoře) → jméno → **PROFIL KANDIDÁTA →**
- Studio mark: světle šedé číslo + tenká červená čárka (`CandidateListNumber`) — karta i profil
- Celá karta je `<Link>`, priorita jen na profilu (label **Srdcová priorita**)
- Rám karty (`.card-candidate`): šedý 1px + červená linka dole
- Placeholder: bílý box, bez červené, bez odkazu (aktuálně nepoužito — všichni revealed)

## UI — profil `/kandidati/[slug]`

- Pole `name`, `heartPriority`, `bio`, volitelně `priorities`, `profileClosing`
- Číslo listiny na portrétu (`CandidateListNumber`, variant `detail`)
- Nezveřejněný slug → 404

## Klíčové soubory

| Soubor | Účel |
|--------|------|
| `lib/candidates.ts` | data, `revealed`, `gridSlot` (pořadí listiny) |
| `components/CandidateCard.tsx` | dlaždice |
| `components/CandidateListNumber.tsx` | studio mark na portrétu |
| `components/CandidatesGrid.tsx` | mřížka (řadí podle `gridSlot`) |
| `components/CandidatePortrait.tsx` | portrét 4∶5 |
| `app/kandidati/page.tsx` | stránka + úvodní text |
| `app/kandidati/[slug]/page.tsx` | profil |
| `components/Header.tsx` | Kandidáti `alwaysUnlocked: true` |
