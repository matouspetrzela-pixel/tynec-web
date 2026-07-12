# Pro Týnec srdcem — technická dokumentace

Tato složka obsahuje provozní a vývojovou dokumentaci pro web `tynec-web`.

## Obsah

- **`current-production-state.md`**  
  **Čti jako první.** Jak web aktuálně vypadá na produkci, harmonogram kandidátů, pravidlo „jen to, co je zadáno“.

- **`hero-homepage.md`**  
  Hero homepage: responzivita mobil / tablet / desktop, breakpointy, CSS, QA checklist.

- `architecture.md`  
  Architektura projektu, hlavní komponenty, routing, práce s daty a bezpečnostní opatření.

- `operations.md`  
  Lokální vývoj, CI/CD, Vercel konfigurace, environment proměnné, monitoring a řešení incidentů.

- `content-workflow.md`  
  Jak upravovat texty, kandidáty, fotografie a sociální odkazy bez rizika regresí.

- `kandidati-local-status.md`  
  UI mřížky kandidátů, portréty, klíčové soubory.

- `release-checklist.md`  
  Praktický checklist pro běžný release, launch domény a přepnutí Phase 1 -> Phase 2.

- **`typography.md`**  
  Typografie a tlačítka — CSS tokeny H1–H3, třídy `.type-*` / `.btn-*`, hero panel (shrnutí; detail také v `README.md` § Design systém).

- `owner-handbook.md`  
  Stručný provozní manuál pro vlastníka webu (bez vývoje): co kliknout, co nekazit, jak udělat rollback.

Samostatný **interní přehled GA4** žije v paralelním projektu `../tynec-analytics/` (samostatný Vercel deploy).

## Rychlý start

1. Pro aktuální stav produkce a pravidla změn otevřete **`current-production-state.md`**.
2. Pro orientaci v kódu otevřete `architecture.md`.
3. Pro nasazování a provoz otevřete `operations.md`.
4. Před jakoukoliv produkční změnou projděte `release-checklist.md`.
5. Pro netechnickou obsluhu a krizové situace používejte `owner-handbook.md`.

