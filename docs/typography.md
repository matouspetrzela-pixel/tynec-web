# Typografie a tlačítka

> **Nasazeno na produkci** (commit `9e43054`, červenec 2026).  
> Související: [`architecture.md`](architecture.md) §8, `README.md` § Design systém, [`hero-homepage.md`](hero-homepage.md) § Obsah boxu.

## Princip

- **Jeden zdroj pravdy:** CSS proměnné v `app/globals.css` (`:root`).
- **Komponenty** používají sémantické třídy `.type-*` a `.btn-*`, ne inline `clamp()` pro nadpisy.
- **Tailwind** tokeny `text-h1-mobile` … v `tailwind.config.ts` mapují na stejné proměnné (`var(--font-h1-mobile)` …).

Texty obsahu se nemění — úpravy se týkají pouze velikosti a spacingu.

---

## Tokeny nadpisů (`:root`)

| Token | Mobil | Desktop (≥ 768 px) |
|---|---|---|
| `--font-h1-mobile` / `--font-h1-desktop` | 20 px | 26 px |
| `--font-h2-mobile` / `--font-h2-desktop` | 17 px | 22 px |
| `--font-h3-mobile` / `--font-h3-desktop` | 15 px | 17 px |

**Tělo:** `body` = 16 px (`text-base`).  
**Perex:** `.type-lead` = 16 px → 18 px (`md:text-lg`).  
**Eyebrow:** `.type-eyebrow` = 12 px (`text-xs`).

---

## Sémantické třídy

| Třída | Účel |
|---|---|
| `.type-h1` | Nadpis stránky |
| `.type-h2` | Sekční nadpis (uppercase) |
| `.type-h3` | Podsekce, menší bloky |
| `.type-eyebrow` | „Volby 2026“, „Hnutí“ |
| `.type-lead` | Úvodní odstavec pod nadpisem |

**Záhlaví stránek:** `components/PageSectionHeader.tsx` — eyebrow + červená linka + H1 + volitelný perex.  
Použito na: O nás, Kandidáti, Program, Aktuality, Podpořte nás.

---

## Tlačítka

| Třída | Vzhled | Typická velikost textu |
|---|---|---|
| `.btn-primary-solid` | Plná červená (`bg-primary`) | 12 px → 14 px (md) |
| `.btn-primary-sheen` | Červený gradient (hero, header) | 12 px → 14 px (md) |
| `.btn-action--outline` | Obrys | 12 px → 14 px (md) |
| `.btn-action--soft` | Světle červené pozadí | 12 px → 14 px (md) |
| `.btn-action--neutral` | Bílé s okrajem | 12 px → 14 px (md) |

Padding: `px-6 py-2.5` → `md:px-7 md:py-3`. Minimální výška cca 44 px (`.btn-action`).

---

## Hero panel (`.hero-lead`)

Proměnné v `app/globals.css` — liší se podle breakpointu (mobil / notebook 1280–1919 / desktop 1920+).

| Prvek | Proměnná | Typická velikost |
|---|---|---|
| Eyebrow | `--hl-eyebrow-text` | 13–15 px |
| Badge voleb | `--hl-badge-text` | 10–12 px |
| Facebook | `--hl-fb-text` | 12–14 px |
| Ghost CTA | `--hl-btn-text` | 11–12 px |
| Primary CTA | `--hl-btn-primary-text` | 12–14 px |

Logo je obrázek (SVG/PNG), ne text — hierarchii nese vizuálně.

---

## Údržba

1. **Změna velikosti napříč webem:** uprav `:root` v `globals.css` — tokeny se propagují do Tailwindu i `.type-*`.
2. **Nová stránka se záhlavím:** použij `PageSectionHeader`, ne kopírovat markup.
3. **Nové červené CTA:** `.btn-primary-solid` nebo `.btn-primary-sheen`, nepřidávat vlastní `px-8 py-4`.
4. **Ověření:** DevTools → Computed → `font-size` u `.type-h1` (desktop očekáváno **26 px**).

---

## Historie

| Commit | Popis |
|---|---|
| `9e43054` | Sjednocení typografie webu — H1 48→26 px desktop, tlačítka, `PageSectionHeader` |
