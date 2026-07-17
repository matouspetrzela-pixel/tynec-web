# Content workflow (texty, kandidáti, média)

## 1) Zásady

- **Měňte pouze to, co je explicitně zadáno** — viz [`current-production-state.md`](current-production-state.md).
- V aktuální fázi se na produkci typicky doplňují **jen jednotliví kandidáti** (`revealed: true` + deploy po schválení).
- Obsah měňte v datových souborech, ne napříč náhodnými místy.
- Každou změnu ověřte lokálně (`npm run build`) před push.
- Commit a deploy **jen na pokyn vlastníka**.

## 2) Kandidáti

Zdroj dat: `lib/candidates.ts` — detail UI: [`kandidati-local-status.md`](kandidati-local-status.md).

### Zveřejnění dalšího kandidáta (standardní workflow)

1. U daného slug nastavit `revealed: true` (harmonogram v komentáři v `candidates.ts`).
2. Doplnit `bio` / texty, pokud je to součást zadání.
3. Lokálně ověřit `/kandidati` a `/kandidati/[slug]`; pro náhled produkce: `NEXT_PUBLIC_PRODUCTION_PREVIEW=true`.
4. Po pokynu vlastníka: `npm run lint && npm run typecheck && npm run build`, commit, push.

Nezveřejnění zůstávají jako bílé placeholdery; jejich profily vrací 404.

### Přidání nového kandidáta (výjimečné)

1. Přidat objekt do pole kandidátů včetně `gridSlot` (**pořadí na kandidátní listině**, ne abeceda).
2. Vyplnit stabilní `slug` (používá se v URL).
3. Přidat fotku do `public/images/kandidati/`.
4. Nastavit cestu `photo`.
5. Ověřit detail i listing lokálně (číslo listiny se bere z `gridSlot`).

Poznámka: změna `slug` mění URL a může rozbít sdílené odkazy. Změna `gridSlot` mění pořadí v mřížce i číslo na portrétu.

## 3) Aktuality

Zdroj dat: `lib/aktuality.ts` — pole `AKTUALITY`.

Při přidání nové aktuality:
1. Přidat nový objekt do pole (pořadí v souboru nehraje roli — řadí se podle `datum`).
2. Vyplnit `id` (unikátní řetězec bez mezer, např. `'2026-05-uvod'`), `typ`, `datum` (ISO `YYYY-MM-DD`), `nadpis`.
3. Přidat `perex` (krátký úvod na kartě) a `obsah` (další odstavce oddělené prázdným řádkem).
4. Přidat `obrazek` (cesta k souboru v `public/aktuality/`) a zkopírovat obrázek do `public/aktuality/`.
5. Volitelně `nahledOrez`: `'left' | 'right' | 'center'` — kde „najet“ při ořezu náhledu (`object-cover`). U širokých bannerů s logem nebo textem vlevo použijte `'left'`, aby zůstal vidět levý okraj obrázku; výchozí chování je `'center'`.
6. Ověřit lokálně na `/aktuality` (a případně `?strana=2`, pokud přesáhnete 8 položek).

**Stránkování:** každá stránka má **8 článků** (`ITEMS_PER_PAGE` v `app/aktuality/page.tsx`). Nejnovější jsou na stránce 1; starší postupují na stránku 2, 3… URL: `/aktuality?strana=N` (stránka 1 bez query).

Typy obsahu: `clanek`, `pdf`, `letak`, `video`.  
Náhledový obrázek: pole `obrazek` — pokud chybí, zobrazí se neutrální ikona typu.

**Chování karty (pro kontrolu náhledu):** náhled vyplní rámeček pomocí `object-cover` (žádné „letterboxy“). Datum na kartě je **vždy vpravo dole**, menším štítkem — při návrhu grafiky počítejte s malým přesahem v pravém dolním rohu.

## 4) Hero a homepage texty

- Hero panel: `components/hero/HeroLead.tsx`
- Kompozice hero sekce: `components/Hero.tsx`
- Homepage: `app/page.tsx` — **Phase 1 = jen `<Hero />` + footer**, bez dalších sekcí.

**Neměnit homepage bez explicitního pokynu.** Soubory `CampaignHomeJourney.tsx` a `CampaignHomeLaunchedStrip.tsx` existují, ale na homepage se aktuálně nepoužívají.

## 5) Navigace

- `components/Header.tsx`
- Za logem: text `2026–2030`.
- Aktuálně odemčeno: `O nás`, **`Program`**, **`Kandidáti`**, **`Aktuality`**, **`Podpořte nás`**.
- Phase 2 (homepage se sekcemi): `NEXT_PUBLIC_SITE_LAUNCHED=true`.

## 5b) Podpořte nás — partneři

- Pás partnerů: `app/podporte-nas/SupportSponsorsStrip.tsx` (mezi úvodem a „Jak můžete pomoci“).
- Data partnerů jsou v komponentě; odkaz u Řehuly na Loxone partner profil.

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

