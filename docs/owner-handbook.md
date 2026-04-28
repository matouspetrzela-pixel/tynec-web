# Owner handbook (bez programování)

Tento návod je pro běžnou správu webu bez zásahů do kódu.

## 1) Co je důležité vědět

- Produkční web běží na Vercelu v projektu `tynec-web`.
- Každý push do větve `main` spouští nový deploy.
- Stav webu (Phase 1 vs Phase 2) řídí proměnná:
  - `NEXT_PUBLIC_SITE_LAUNCHED=false` -> omezený/locked režim
  - `NEXT_PUBLIC_SITE_LAUNCHED=true` -> plný web

## 2) Každodenní kontrola (2 minuty)

1. Otevřít Vercel -> projekt `tynec-web` -> `Deployments`.
2. Ověřit, že poslední production deploy je:
   - `Ready`
   - `Current`
3. Kliknout na `Visit` a zkontrolovat homepage.

Pokud je vše `Ready + Current`, web běží správně.

## 3) Jak zapnout plný web (Phase 2)

1. Vercel -> `Settings` -> `Environment Variables`
2. U `NEXT_PUBLIC_SITE_LAUNCHED` změnit hodnotu na `true` pro `Production`
3. Spustit redeploy (nebo pushnout nový commit do `main`)
4. Ověřit `Deployments` (`Ready + Current`)
5. Otevřít doménu v anonymním okně

## 4) Jak vrátit omezený režim (Phase 1)

1. Vercel -> `Settings` -> `Environment Variables`
2. U `NEXT_PUBLIC_SITE_LAUNCHED` nastavit `false` pro `Production`
3. Redeploy
4. Ověřit změnu na webu

Toto je nejrychlejší bezpečný rollback kampaně.

## 5) Kdy NEMĚNIT nastavení

Bez konzultace neměnit:
- `Build Command`
- `Install Command`
- Framework (`Next.js`)
- DNS/doménové záznamy
- bezpečnostní hlavičky a CSP

Tyto změny mohou web okamžitě rozbít.

## 6) Co dělat při chybě

### A) Deploy je `Error`
1. Otevřít detail deploye
2. Zkopírovat první červenou chybu z logu
3. Poslat ji vývojáři

### B) "Cannot be redeployed"
- Udělat nový commit do `main` (fresh commit), tím vznikne nový deploy.

### C) Web ukazuje starou verzi
- Ověřit, že poslední deploy je `Current`
- dát `Ctrl+F5`
- zkusit anonymní okno

## 7) Emergency rollback (doporučený postup)

Pokud je třeba okamžitě schovat plný obsah:
1. Nastavit `NEXT_PUBLIC_SITE_LAUNCHED=false` v Production
2. Redeploy
3. Ověřit homepage

Tento krok je rychlý a bezpečný, bez změny kódu.

## 8) Kontakty a podklady

- Technická dokumentace: `docs/`
- Checklist před release: `docs/release-checklist.md`
- Provozní detaily: `docs/operations.md`

