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
- [ ] Hero obsah a CTA odpovídají aktuální fázi kampaně
- [ ] Navigace odpovídá režimu (locked/full)
- [ ] Facebook odkaz je funkční a správný

## C) Launch flag a environment

- [ ] `NEXT_PUBLIC_SITE_LAUNCHED` je správně nastaveno v Production
- [ ] (Volitelně) `NEXT_PUBLIC_FACEBOOK_URL` je validní
- [ ] Poslední production deploy je `Ready` + `Current`

## D) Doména

- [ ] Doména je připojená ve Vercelu (`Valid/Connected`)
- [ ] `protynec.cz` ukazuje správný aktuální deploy
- [ ] Ověřeno v anonymním okně (bez cache)

## E) Post-release

- [ ] Rychlá smoke kontrola klíčových URL
- [ ] Kontrola metadat (title/description/OG)
- [ ] Případné drobné bugfixy připravené v samostatném commitu

---

## Přepnutí Phase 1 -> Phase 2

1. Otestovat finální obsah na preview/develop.
2. Sloučit změny do `main`.
3. Ve Vercelu přepnout:
   - `NEXT_PUBLIC_SITE_LAUNCHED=true` (Production)
4. Spustit redeploy (nebo nový push).
5. Projít celý checklist znovu.

