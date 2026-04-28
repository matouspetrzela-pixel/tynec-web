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

## 3) Hero a homepage texty

- Hero panel: `components/hero/HeroLead.tsx`
- Kontextový text vedle panelu: `components/Hero.tsx`
- Další homepage sekce: `app/page.tsx`

Pro Phase 1 udržujte jasnou návštěvnickou zprávu a aktivní pouze schválené externí CTA.

## 4) Navigace

- `components/Header.tsx`
- V Phase 1 jsou interní akce zamčené/neaktivní.
- V Phase 2 se navigace odemyká přepnutím `NEXT_PUBLIC_SITE_LAUNCHED=true`.

## 5) Sociální odkazy

- `lib/social.ts`
- Preferujte změnu přes env (`NEXT_PUBLIC_FACEBOOK_URL`) před hardcoded editací.

## 6) Obrázky

Doporučení:
- používat smysluplné názvy souborů bez mezer,
- ukládat varianty (`.webp` + `.jpg`) tam, kde je to potřeba,
- kontrolovat kvalitu na desktop + mobile.

## 7) Před odesláním změn

```bash
npm run lint
npm run typecheck
npm run build
```

Teprve poté commit a push.

