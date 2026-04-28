# Provoz a nasazování

## 1) Lokální vývoj

Požadavky:
- Node.js 20+ (viz `package.json` engines)
- npm

Základní příkazy:

```bash
npm install
npm run dev
```

Produkční ověření:

```bash
npm run lint
npm run typecheck
npm run build
```

## 2) CI pipeline

Soubor: `.github/workflows/ci.yml`

Pipeline na `push` a `pull_request` do `main`:
1. `npm ci`
2. `npm run lint -- --max-warnings 0`
3. `npm run typecheck`
4. `npm run build`

Pokud CI neprojde, release je blokovaný.

## 3) Vercel deployment

Konfigurace je v `vercel.json`.

- `framework`: `nextjs`
- `installCommand`: `npm ci`
- `buildCommand`: `npm run build`

Deployment se spouští pushnutím do `main` nebo ručně přes Vercel UI.

## 4) Environment proměnné

### `NEXT_PUBLIC_SITE_LAUNCHED`
- `false` = Phase 1 (locked mode)
- `true` = Phase 2 (full web)

### `NEXT_PUBLIC_FACEBOOK_URL` (volitelné)
- Pokud není nastavená, použije se fallback z `lib/social.ts`.

## 5) Troubleshooting

### Build failed na Vercelu
1. Otevřít detail deploye a první chybu v logu.
2. Ověřit lokálně: `npm run build`.
3. Opravit, commitnout, pushnout nový commit (fresh deployment).

### "Deployment cannot be redeployed"
- Vytvořte nový commit na `main` (klidně technický/chore) a push.
- Tím vznikne nový deploy, který jde nasadit.

### Starý obsah v prohlížeči
- Ověřit, že poslední deploy je `Ready` + `Current`.
- Otevřít přes Vercel `Visit` nebo dát hard refresh (`Ctrl+F5`).

## 6) Provozní doporučení

- Nepouštět změny přímo do `main` bez lokálního buildu.
- U větších změn používat `develop` a testovat preview URL.
- U launch-critical změn používat checklist (`release-checklist.md`).

