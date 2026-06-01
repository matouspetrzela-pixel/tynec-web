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

## Po nasazení na produkci

1. Ověřit: `https://www.protynecsrdcem.cz/images/og-pro-tynec-srdcem-square.jpg`
2. Ve zdrojáku homepage: první `property="og:image"` → URL výše (ne `9000.jpg`).
3. [Google Search Console](https://search.google.com/search-console) → kontrola URL homepage → **Požádat o indexování**.
4. Volitelně [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — Scrape Again.

Změna náhledu ve výsledcích Google obvykle trvá **několik dní až týdnů** (cache).
