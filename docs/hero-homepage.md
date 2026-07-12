# Hero homepage — layout a responzivita

> **Nasazeno na produkci** (commit `9081639`, červenec 2026).  
> Související: [`architecture.md`](architecture.md), [`current-production-state.md`](current-production-state.md).

## Účel

Homepage v Phase 1 (`NEXT_PUBLIC_SITE_LAUNCHED=false`) obsahuje **pouze hero s fotkou obce a patičku** — žádné mezisekce (`app/page.tsx`).

Hero musí fungovat na čtyřech reálných skupinách zařízení podle GA4 (2026):

| Skupina | Podíl návštěv | Typické šířky | Chování |
|---|---|---|---|
| **Mobil** | ~66 % | 360, 384, 390, 393, 402 px | Centrovaný box nahoře, patička těsně pod ním (~28 px mezera) |
| **Tablet** | ~0,4 % | 768–1279 px (zejm. 1024) | Centrovaný box, fullscreen výška hero |
| **Notebook** | — | 1280–1919 px (1366, 1440, 1536) | Dole vlevo, **bez negativního `-ml`**, `pl-6`, užší panel (~38 rem) |
| **Desktop** | ~34 % | 1920×1080+ | Fullscreen hero, box vlevo dole s `-ml-32`, patička až po scrollu |

---

## Soubory

| Soubor | Úloha |
|---|---|
| `components/Hero.tsx` | Kompozice: fotka, overlay, shell + wrap panelu, breakpoint třídy |
| `components/hero/HeroLead.tsx` | Obsah boxu (eyebrow, badge, logo, CTA tlačítka) |
| `components/hero/HeroInfoPanel.tsx` | Skleněný panel (`.hero-info-panel`) |
| `app/globals.css` | `.hero-viewport-fill`, `.hero-info-panel-stage`, `.hero-info-panel` |
| `app/layout.tsx` | Fixní hlavička, `--header-height`, padding `main` |

---

## Výška hero sekce (`.hero-viewport-fill`)

```css
/* Mobil (< 768px): výška podle obsahu boxu */
min-height: auto;
padding-bottom: clamp(1rem, 5vw, 2rem);

/* Tablet + desktop (≥ 768px): celá obrazovka pod hlavičkou */
min-height: calc(100dvh - var(--header-height) - env(safe-area-inset-top, 0px));
```

**Proč mobil nemá `100dvh`:** Při fullscreen výšce box sedí nahoře a zbytek obrazovky je prázdná fotka — uživatel musí scrollovat dlouhou „mrtvou zónu“ před patičkou. Na mobilu tedy hero končí těsně za boxem + krátký pruh fotky.

**Proč tablet/desktop ano:** Box má být dole (desktop) nebo centrovaný uprostřed výšky (tablet); fullscreen hero drží patičku pod foldem.

---

## Pozice panelu (`Hero.tsx`)

### Konstanty

```tsx
// heroPanelWrap — šířka a horizontální posun panelu
'mx-auto … max-md:translate-y-0 … md:-translate-y-3
 xl:mx-0 xl:max-w-[min(38rem,calc(100%-3rem))] xl:-translate-y-5
 min-[1920px]:max-w-[min(51.5rem,calc(100%-3.5rem))] min-[1920px]:-ml-32 min-[1920px]:-translate-y-8'

// heroPanelShell — flex kontejner (flex-col!)
'… items-center justify-start …
 xl:items-start xl:justify-end xl:pl-6 xl:pr-6 xl:pb-12 xl:pt-[clamp(1.5rem,4vh,6rem)]
 min-[1920px]:pl-0 min-[1920px]:pr-6 2xl:pr-10'
```

### Breakpointy (Tailwind)

| Breakpoint | Šířka | Panel | Poznámka |
|---|---|---|---|
| default | < 640 px | Centrovaný, `mx-auto`, bez vertikálního posunu | Těsnější padding v `HeroLead` |
| `sm` | ≥ 640 px | Centrovaný | — |
| `md` | ≥ 768 px | Centrovaný, `-translate-y-3` | Začíná fullscreen výška hero |
| `lg` | ≥ 1024 px | **Stále centrovaný** | Tablet — záměrně |
| `xl` | 1280–1919 px | **Dole vlevo**, bez `-ml`, max ~38 rem | Notebook |
| `min-[1920px]` | ≥ 1920 px | `-ml-32`, max ~51.5 rem, `pl-0` | Stolní PC |

### Proč notebook (1280–1919) nemá negativní `-ml`

Na noteboocích původní `xl:-ml-24` / `2xl:-ml-32` usekávalo box vlevo (eyebrow „Změna začíná…“) a vyžadovalo zoom ~67 %. Negativní posun je proto **pouze od 1920 px** (`min-[1920px]:`).

### Proč desktop layout až od `xl` (1280 px), ne `lg` (1024 px)

Původní layout od `lg` s negativními okraji na tabletu 1024 px box usekával. Tablet má centrovaný box do 1279 px.

Negativní `margin-left` (`min-[1920px]:-ml-32`) na stolním PC box vizuálně táhne doleva přes padding — **nesmazat** bez otestování na 1920 px.

### Flex směr (důležité)

Shell používá `flex-col`. U column layoutu:
- `items-start` / `items-center` = horizontální zarovnání
- `justify-end` = vertikální zarovnání dolů

Desktop tedy = box vlevo dole, ne „vpravo“.

---

## Fotka na pozadí

- Základ: `hero-velky-tynec-dji-0702-v2026` (`public/images/`)
- Formáty: WebP + JPEG fallback, `srcSet` 1600w / 2560w
- Cache bust: `HERO_ASSET_VER` v `Hero.tsx` (query `?v=`)
- `object-position` (responzivní):
  - mobil: `50% 40%` — pod boxem vidět věž
  - desktop: `62% 34%` — ostení vpravo

Sekce má `overflow-x-clip` do 1919 px, pak `min-[1920px]:overflow-x-visible` kvůli desktopovému přesahu panelu.

---

## Obsah boxu (`HeroLead.tsx`)

Textové velikosti řídí CSS proměnné v `.hero-lead` (`app/globals.css`):

| Prvek | Proměnná | Mobil / default | Notebook (1280–1919) | Desktop (1920+) |
|---|---|---|---|---|
| Eyebrow | `--hl-eyebrow-text` | 13–15 px (clamp) | 13 px | 13–15 px |
| Badge voleb | `--hl-badge-text` | 10–12 px | 10 px | 10–12 px |
| Facebook pruh | `--hl-fb-text` | 12–14 px | 13 px | 12–14 px |
| CTA ghost (miniboxy) | `--hl-btn-text` | 11–12 px | 11 px | 11–12 px |
| CTA „Náš program“ | `--hl-btn-primary-text` | 12–14 px | 12 px | 12–14 px |

Výšky tlačítek: `--hl-btn-h` (ghost), `--hl-btn-primary-h` (primary), `--hl-btn-fb-h` (Facebook).

Obsah: eyebrow, badge, logo, Facebook pod logem, CTA **Náš program** / **Kandidáti** / **Aktuality** / **Podpořte nás**.  
Padding a `gap` se liší podle breakpointu (`sm`, `md`, `xl`, `min-[1920px]`).

---

## QA — smoke test před release

Ověřit v DevTools (nebo reálném zařízení):

| Viewport | Kontrola |
|---|---|
| **360×800** | Box centrovaný, mezera panel → patička **< 40 px**, žádná dlouhá prázdná fotka |
| **390×844** | Stejné (nejčastější mobil dle GA) |
| **1024×768** | Box centrovaný, **neuseknutý** vlevo |
| **1366×768** | Box dole vlevo, `panelLeft ≥ 16 px`, celý eyebrow viditelný |
| **1440×900** | Stejné jako 1366 |
| **1536×864** | Stejné — **bez** `-ml-32` (dříve usekávalo) |
| **1920×1080** | Fullscreen hero, `-ml-32`, box vlevo dole, patička až po scrollu |

Příkazy:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Historie klíčových commitů

| Commit | Popis |
|---|---|
| `70bd40c` | Kampaňová homepage, odemknutí Program/Podpořte nás, 11 kandidátů |
| `b6d346c` | Hero fullscreen — patička pod foldem (všechny breakpointy) |
| `9081639` | Responzivita podle GA: mobil bez prodlevy, tablet centrovaný, desktop box vlevo dole |
| `9e43054` | Typografie hero CTA mírně zmenšena (součást celkového sjednocení webu) |
| *(lokálně)* | Notebook 1280–1919: bez `-ml`, užší panel, padding od `min-[1920px]` |

---

## Časté chyby při úpravách

1. **Vrátit `min-height: 100dvh` na mobil** → znovu vznikne velká prodleva před patičkou.
2. **Desktop layout aktivovat od `lg`** → tablet 1024 px se rozbije.
3. **Aplikovat `2xl:-ml-32` pod 1920 px** → notebook 1536 px se znovu usekne vlevo.
4. **Odstranit `min-[1920px]:-ml-32`** → box na stolním PC skočí doprava.
5. **Změnit `flex-col` na `flex-row` bez přepočtu** → `justify-end` přestane znamenat „dole“.
6. **Zapomenout bump `HERO_ASSET_VER`** po výměně hero fotek → prohlížeče servírují starý obrázek z cache.
