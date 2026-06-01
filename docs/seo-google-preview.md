# Náhled ve Google (zeleno‑červené logo)

Týká se **pouze vyhledávačů a sdílení** — vzhled webu pro návštěvníky se nemění.

## Jak to funguje

| Signál | Soubor / místo |
|--------|----------------|
| Primární `og:image` (čtverec, SERP) | `/images/og-pro-tynec-srdcem-square.jpg` |
| Sekundární `og:image` (Facebook apod.) | `/images/og-pro-tynec-srdcem.jpg` |
| Schema.org `Organization.logo` | stejná URL čtverce |
| Konstanty v kódu | `lib/og.ts` |

Zdrojový brand asset: `public/images/brand-logo-pro-tynec-srdcem.png`.

## Regenerace OG obrázků

Po výměně brand PNG:

```bash
npm run og:generate
```

## Proč je na produkci 404?

Kód a obrázky jsou v GitHubu (`main`), ale **živý web se aktualizuje až po úspěšném Vercel Production deployi**.

Projekt má ochranu: bez proměnné `ALLOW_PRODUCTION_DEPLOY=true` (Vercel → Settings → Environment Variables → **Production**) produkční build **záměrně selže** a zůstane stará verze — proto `/images/og-pro-tynec-srdcem-square.jpg` vrací 404 a v HTML je pořád `9000.jpg`.

**Postup:**

1. Vercel → projekt `tynec-web` → Settings → Environment Variables  
2. Production: `ALLOW_PRODUCTION_DEPLOY` = `true`  
3. Deployments → poslední deploy z `main` → **Redeploy** (nebo nový push už deploy spustí)

## Po úspěšném nasazení

1. Ověřit: `https://www.protynecsrdcem.cz/images/og-pro-tynec-srdcem-square.jpg` (musí být **200**, ne stránka 404)
2. Ve zdrojáku homepage: první `property="og:image"` → URL výše (ne `9000.jpg`).
3. [Google Search Console](https://search.google.com/search-console) → kontrola URL homepage → **Požádat o indexování**.
4. Volitelně [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — Scrape Again.

Změna náhledu ve výsledcích Google obvykle trvá **několik dní až týdnů** (cache).
