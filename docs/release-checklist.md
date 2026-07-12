# Release checklist

Použijte tento checklist před každým release na produkci.

## A) Kvalita kódu

- [ ] Lokálně prošel `npm run lint`
- [ ] Lokálně prošel `npm run typecheck`
- [ ] Lokálně prošel `npm run build`
- [ ] Nebyly změněny citlivé/security hlavičky bez důvodu

## B) Funkční kontrola

- [ ] Homepage funguje na desktopu
- [ ] Homepage funguje na mobilu
- [ ] Hero: box „Změna začíná vaším hlasem“, CTA Program / Kandidáti / Aktuality / Podpořte nás, Facebook pod logem
- [ ] Navigace: Program a Podpořte nás odemčené; footer těsně pod hero na mobilu
- [ ] Text `2026–2030` za logem v hlavičce zobrazen správně
- [ ] Aktuality: nové články a obrázky se zobrazují na `/aktuality`
- [ ] `/kandidati` — 11 odhalených karet, fotky edge-to-edge (včetně Michaela Dvořáková)
- [ ] `/kandidati` — oční linka Drahomíra Obšnajdrová v ose s Michaela Dvořáková / Kateřina Parčová (desktop i mobil)
- [ ] Facebook odkaz je funkční a správný

## C) Launch flag a environment

- [ ] `NEXT_PUBLIC_SITE_LAUNCHED` je správně nastaveno v Production
- [ ] (Volitelně) `NEXT_PUBLIC_FACEBOOK_URL` je validní
- [ ] (Volitelně) `NEXT_PUBLIC_GA_MEASUREMENT_ID` je nastaveno v Production (GA4)
- [ ] Poslední production deploy je `Ready` + `Current`

## D) Doména

- [ ] Doména je připojená ve Vercelu (`Valid/Connected`)
- [ ] `protynecsrdcem.cz` ukazuje správný aktuální deploy
- [ ] Ověřeno v anonymním okně (bez cache)

## E) Post-release

- [ ] Rychlá smoke kontrola klíčových URL
- [ ] Kontrola metadat (title/description/OG) — první `og:image` musí být `https://www.protynecsrdcem.cz/images/og-pro-tynec-srdcem-square.jpg` (barevné logo na bílém)
- [ ] Po změně OG: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) + Search Console → kontrola URL homepage → **Požádat o indexování** (náhled ve Google se mění až po dnech)
- [ ] Pokud používáš GA: po pár hodinách v **Administrátor → Události** zkontroluj vlastní události (`cta_podporte`, `cta_facebook`, `cta_email`, …), pak je v **Klíčové události** označ podle kampaně; detailní přehled je v samostatné aplikaci `tynec-analytics`.
- [ ] Případné drobné bugfixy připravené v samostatném commitu

---

## Přepnutí Phase 1 -> Phase 2

1. Otestovat finální obsah na preview/develop.
2. Sloučit změny do `main`.
3. Ve Vercelu přepnout:
   - `NEXT_PUBLIC_SITE_LAUNCHED=true` (Production)
4. Spustit redeploy (nebo nový push).
5. Projít celý checklist znovu.

