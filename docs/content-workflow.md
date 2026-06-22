# Content workflow (texty, kandidáti, média)

## 1) Zásady

- Obsah měňte v datových souborech nebo dedikovaných komponentách, ne napříč náhodnými místy.
- Každou změnu ověřte lokálně (`npm run build`) před push.
- U mediálních souborů hlídejte velikost, názvy a konzistenci cest.

## 2) Kandidáti

Zdroj dat: `lib/candidates.ts`

Při přidání kandidáta:
1. Přidat objekt do pole kandidátů.
2. Vyplnit stabilní `slug` (používá se v URL).
3. Přidat fotku do `public/images/kandidati/`.
4. Nastavit cestu `photo`.
5. Ověřit detail i listing lokálně.

Poznámka: změna `slug` mění URL a může rozbít sdílené odkazy.

## 3) Aktuality

Zdroj dat: `lib/aktuality.ts` — pole `AKTUALITY`.

Při přidání nové aktuality:
1. Přidat nový objekt do pole (pořadí v souboru nehraje roli — řadí se podle `datum`).
2. Vyplnit `id` (unikátní řetězec bez mezer, např. `'2026-05-uvod'`), `typ`, `datum` (ISO `YYYY-MM-DD`), `nadpis`.
3. Přidat `perex` (krátký úvod na kartě) a `obsah` (další odstavce oddělené prázdným řádkem).
4. Přidat `obrazek` (cesta k souboru v `public/aktuality/`) a zkopírovat obrázek do `public/aktuality/`.
5. Volitelně `nahledOrez`: `'left' | 'right' | 'center'` — kde „najet“ při ořezu náhledu (`object-cover`). U širokých bannerů s logem nebo textem vlevo použijte `'left'`, aby zůstal vidět levý okraj obrázku; výchozí chování je `'center'`.
6. Ověřit lokálně na `/aktuality`.

Typy obsahu: `clanek`, `pdf`, `letak`, `video`.  
Náhledový obrázek: pole `obrazek` — pokud chybí, zobrazí se neutrální ikona typu.

**Chování karty (pro kontrolu náhledu):** náhled vyplní rámeček pomocí `object-cover` (žádné „letterboxy“). Datum na kartě je **vždy vpravo dole**, menším štítkem — při návrhu grafiky počítejte s malým přesahem v pravém dolním rohu.

## 4) Hero a homepage texty

- Hero panel: `components/hero/HeroLead.tsx`
- Kompozice hero sekce: `components/Hero.tsx`
- Další homepage sekce: `app/page.tsx`

Pro Phase 1 udržujte jasnou návštěvnickou zprávu a aktivní pouze schválené externí CTA.  
Pre-launch box „Brzy odhalíme…" byl odstraněn (2026-05-05) — do `components/Hero.tsx` jej nevracet.

## 5) Navigace

- `components/Header.tsx`
- Za logem je zobrazen text `2026–2030` (přidán 2026-05-05) — jde o statický `<span>` ve stejném stylu jako navigační položky.
- V Phase 1 jsou `Program` a `Kandidáti` vizuálně zamčené, `O nás` a `Aktuality` jsou volně přístupné.
- V Phase 2 se navigace plně odemyká přepnutím `NEXT_PUBLIC_SITE_LAUNCHED=true`.

## 6) Sociální odkazy

- `lib/social.ts`
- Preferujte změnu přes env (`NEXT_PUBLIC_FACEBOOK_URL`) před hardcoded editací.

## 7) Obrázky

Doporučení:
- používat smysluplné názvy souborů bez mezer,
- ukládat varianty (`.webp` + `.jpg`) tam, kde je to potřeba,
- kontrolovat kvalitu na desktop + mobile.

## 8) Před odesláním změn

```bash
npm run lint
npm run typecheck
npm run build
```

Teprve poté commit a push.

