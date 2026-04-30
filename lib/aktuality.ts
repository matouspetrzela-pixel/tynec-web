/**
 * Aktuality — datový soubor.
 *
 * Jak přidat novou aktualitu:
 * 1. Zkopíruj jeden z níže uvedených příkladů
 * 2. Vyplň pole (viz typy níže)
 * 3. Řazení na webu: podle pole `datum` (nejnovější první → vlevo nahoře na 1. stránce).
 *    Pořadí v souboru nehraje roli; datum musí být ISO YYYY-MM-DD.
 *
 * Typy obsahu:
 *  'clanek'  — text (perex povinný, obsah volitelný)
 *  'pdf'     — PDF ke stažení (soubor: cesta k PDF v /public/aktuality/)
 *  'letak'   — leták/obrázek (soubor: cesta k obrázku, volitelně odkaz na PDF)
 *  'video'   — video (odkaz: URL na YouTube nebo jiný zdroj)
 */

export type AktualitaTyp = 'clanek' | 'pdf' | 'letak' | 'video';

export interface Aktualita {
  /** Unikátní ID (libovolný řetězec bez mezer, např. '2026-04-uvod') */
  id: string;
  /** Typ obsahu */
  typ: AktualitaTyp;
  /** Datum ve formátu 'YYYY-MM-DD' */
  datum: string;
  /** Nadpis karty */
  nadpis: string;
  /** Krátký popis / úvodní odstavec na kartě */
  perex?: string;
  /** Další odstavce článku (odděl prázdným řádkem = nový odstavec) */
  obsah?: string;
  /**
   * Cesta k souboru v /public/aktuality/
   * PDF → zobrazí se tlačítko "Stáhnout PDF"
   * Obrázek (.jpg/.png/.webp) → zobrazí se náhled letáku
   */
  soubor?: string;
  /** Odkaz na externí zdroj (video, web, …) */
  odkaz?: string;
  /**
   * Náhledový obrázek na kartě (jakýkoli typ; cesta v /public/…).
   * Chybí-li, použije se obrázek ze `soubor`, jinak neutrální pozadí — datum se zobrazí vždy.
   */
  obrazek?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// AKTUALITY — kam přidáváš záznam nehraje roli; řadí se podle `datum` (nejnovější nahoře vlevo)
// ─────────────────────────────────────────────────────────────────────────────

export const AKTUALITY: Aktualita[] = [
  {
    id: '2026-05-01-startujeme',
    typ: 'clanek',
    datum: '2026-05-01',
    nadpis: 'Startujeme. Buďte u toho s námi',
    perex:
      'Srdce je symbolem lásky, péče a opravdového zájmu. A právě proto, symbolicky v máji, spouštíme komunikační kampaň našeho týmu pro letošní komunální volby.',
    obsah: `Chceme pracovat pro Velký Týnec srdcem. Poctivě, otevřeně a s respektem k místu, kde žijeme. Protože obec nejsou jen ulice a domy. Obec tvoří lidé, jejich příběhy, potřeby i společná budoucnost.

Těšíme se, že s vámi budeme sdílet naše vize, nápady i konkrétní kroky. A hlavně, že vám budeme naslouchat.

Protože pro Týnec chceme to nejlepší. A chceme to dělat srdcem. ❤️`,
    obrazek: '/aktuality/startujeme-2026-05-banner.png',
  },
  // ── PŘÍKLAD — článek ──────────────────────────────────────────────────────
  // {
  //   id: '2026-05-prvni-clanek',
  //   typ: 'clanek',
  //   datum: '2026-05-01',
  //   nadpis: 'Spouštíme web!',
  //   perex: 'Vítejte na stránkách hnutí Pro Týnec srdcem. Budeme vás zde průběžně informovat o dění a přípravách na komunální volby 2026.',
  // },
  // ── PŘÍKLAD — PDF ─────────────────────────────────────────────────────────
  // {
  //   id: '2026-05-program-pdf',
  //   typ: 'pdf',
  //   datum: '2026-05-10',
  //   nadpis: 'Náš volební program ke stažení',
  //   perex: 'Celý volební program Pro Týnec srdcem v přehledném PDF formátu.',
  //   soubor: '/aktuality/program-2026.pdf',
  // },
  // ── PŘÍKLAD — leták ───────────────────────────────────────────────────────
  // {
  //   id: '2026-06-letak-jaro',
  //   typ: 'letak',
  //   datum: '2026-06-01',
  //   nadpis: 'Jarní leták',
  //   perex: 'Náš jarní leták distribuovaný do schránek v červnu 2026.',
  //   soubor: '/aktuality/letak-jaro-2026.pdf',
  //   obrazek: '/aktuality/letak-jaro-2026-nahled.jpg',
  // },
  // ── PŘÍKLAD — video ───────────────────────────────────────────────────────
  // {
  //   id: '2026-07-video-uvod',
  //   typ: 'video',
  //   datum: '2026-07-15',
  //   nadpis: 'Představujeme se — video',
  //   perex: 'Krátké představení kandidátů a naší vize pro Velký Týnec.',
  //   odkaz: 'https://www.youtube.com/watch?v=XXXXX',
  // },
];
