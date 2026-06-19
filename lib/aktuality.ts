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
 *
 * Náhled na kartě: volitelné `nahledOrez` ('center' | 'left' | 'right') určuje ořez u širokých obrázků.
 * Štítek data je vždy vpravo dole (viz také docs/content-workflow.md, sekce Aktuality).
 *
 * V `perex` a `obsah` lze vložit odkaz zápisem [text](https://…) — viz vykreslení v app/aktuality/page.tsx.
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
  /**
   * Skutečné rozměry obrázku v px (kvůli zachování poměru stran na detailu článku).
   * Když chybí, předpokládá se 3:2 (1200×800). Tip: spusť `node scripts/check-aktuality-images.mjs`.
   */
  obrazekSirka?: number;
  obrazekVyska?: number;
  /**
   * Kam „najet“ při ořezu náhledu (`object-cover`). Výchozí: uprostřed.
   * U širokých bannerů s logem vlevo použijte `left`.
   */
  nahledOrez?: 'center' | 'left' | 'right';
  /**
   * Jak zobrazit obrázek na kartě:
   *   'cover'   – výchozí. Obrázek vyplní celou plochu náhledu, případně se ořízne (vhodné pro bannery).
   *   'contain' – obrázek se zobrazí celý uvnitř karty (vhodné pro čtvercové grafiky / plakáty,
   *              kde nesmí dojít k ořezu textu).
   */
  kartaZobrazeni?: 'cover' | 'contain';
}

// ─────────────────────────────────────────────────────────────────────────────
// AKTUALITY — kam přidáváš záznam nehraje roli; řadí se podle `datum` (nejnovější nahoře vlevo)
// ─────────────────────────────────────────────────────────────────────────────

export const AKTUALITY: Aktualita[] = [
  {
    id: '2026-06-18-pripraveni-tym',
    typ: 'clanek',
    datum: '2026-06-18',
    nadpis: 'Jsme připraveni. Postupně zveřejníme náš tým',
    perex:
      'Komunální volby 2026 se blíží a my jsme připraveni představit vám tým lidí, který chce aktivně pracovat pro budoucnost Velkého Týnce.',
    obsah: `Postupně budeme zveřejňovat kandidáty sdružení Pro Týnec srdcem. První osobnost zveřejníme už v pondělí 22. června 2026 v 18:00 hodin. Kandidáti budou představováni v náhodném pořadí. V tuto chvíli totiž není podstatné jejich pořadí na kandidátní listině, ale především lidé samotní, jejich zkušenosti, nápady a chuť věnovat svůj čas rozvoji naší obce.

Každý člen našeho týmu je důležitou součástí společné snahy o rozvoj naší obce.`,
    obrazek: '/aktuality/pripraveni-tym-odhaleni-2026-06-18.png',
    obrazekSirka: 1024,
    obrazekVyska: 785,
    kartaZobrazeni: 'contain',
  },
  {
    id: '2026-05-28-komunalni-volby-moznost-volby',
    typ: 'clanek',
    datum: '2026-05-28',
    nadpis:
      'Komunální volby nejsou formalita. Jsou o možnosti volby',
    perex:
      'Každé čtyři roky mají občané možnost rozhodnout o tom, kdo povede jejich obec. Komunální volby přitom nejsou jen administrativní povinností nebo formalitou. Jsou důležitým nástrojem demokracie a příležitostí vyjádřit spokojenost, nebo naopak potřebu změny.',
    obsah: `V roce 2022 jsme i ve Velkém Týnci zažili situaci, která by měla být varováním. O vedení obce tehdy usilovala pouze jedna kandidátka s jedenácti kandidáty na jedenáct míst v zastupitelstvu. Volby tak proběhly prakticky bez možnosti skutečné volby.

Dlouhodobě přitom sledujeme klesající zájem lidí o komunální politiku i veřejné dění. Právě na úrovni obce se ale rozhoduje o věcech, které ovlivňují každodenní život nás všech (od školství a dopravy přes veřejný prostor až po podporu spolků, kultury nebo komunikaci vedení obce s občany).

Sdružení Pro Týnec srdcem vzniklo s cílem nabídnout občanům alternativu, otevřenější přístup a větší zapojení veřejnosti do života obce. Chceme přinést novou energii, podporovat férovou komunikaci a budovat vztahy mezi obcí a občany na důvěře, respektu a spolupráci.

V tuto chvíli jsme zároveň jediným subjektem, který veřejně oznámil kandidaturu v nadcházejících komunálních volbách. Přesto věříme, že nebudeme jediní a že zájem o dění v obci existuje a lidem není budoucnost Velkého Týnce lhostejná.

Obec podle nás nemá fungovat jako uzavřený úřad, ale jako živé společenství lidí, kteří mají možnost podílet se na jejím směřování.

Proto chceme otevřít diskusi o tom, jakou obec si přejeme pro další roky. A hlavně — vrátit občanům pocit, že jejich názor má váhu.

Budoucnost obce totiž nevytváří jednotlivci za zavřenými dveřmi, ale lidé, kterým na místě, kde žijí, skutečně záleží.`,
    obrazek: '/aktuality/komunalni-volby-moznost-volby-2026-05-28.png',
    obrazekSirka: 1024,
    obrazekVyska: 1024,
    kartaZobrazeni: 'contain',
  },
  {
    id: '2026-05-15-dotaznik-program',
    typ: 'clanek',
    datum: '2026-05-15',
    nadpis:
      'Váš názor nás zajímá. Pojďte se podílet na budoucnosti obce',
    perex:
      'Sdružení Pro Týnec srdcem zahájilo sběr podnětů od občanů pro tvorbu volebního programu pro komunální volby 2026. Cílem není vytvořit program „od stolu“, ale připravit dokument, který bude vycházet z reálných potřeb lidí žijících ve Velkém Týnci, Vsisku a Čechovicích.',
    obsah: `„Lidé se nás často ptají, proč jsme ještě nezveřejnili kompletní program. Odpověď je jednoduchá – chceme dát prostor také občanům. Máme rozpracované klíčové oblasti, ale důležité je pro nás vědět, co obyvatelé skutečně řeší a co považují za priority.“

Sdružení proto spustilo krátký anonymní dotazník, jehož vyplnění zabere přibližně tři minuty. Občané mohou sdílet své nápady, připomínky i témata, která podle nich obec dlouhodobě opomíjí. Získané podněty chce sdružení využít při finalizaci programu, který plánuje zveřejnit v následujících měsících.

„Nechceme slibovat nereálné věci ani vytvářet program na základě dohadů. Chceme, aby vznikal společně s lidmi, kterých se bude přímo týkat.“

Dotazník je dostupný online a zapojit se může každý občan, kterému záleží na budoucnosti Velkého Týnce, Vsiska a Čechovic.

Anonymní dotazník naleznete zde: [Jak se vám žije v Týnci?](https://forms.gle/syzcYT2EANiSLv6P6)

Sdružení zároveň děkuje všem občanům, kteří se do tvorby programu zapojí a pomohou určit směr, kterým se má obec v následujících čtyřech letech vydat.`,
    obrazek: '/aktuality/dotaznik-budoucnost-obce-2026-05-15.png',
    obrazekSirka: 1024,
    obrazekVyska: 682,
    nahledOrez: 'left',
  },
  {
    id: '2026-05-12-moznost-volby',
    typ: 'clanek',
    datum: '2026-05-12',
    nadpis:
      'Letos budou mít občané Týnce skutečnou možnost volby. Minule chyběla',
    perex:
      'Ve Velkém Týnci vzniklo nové sdružení nezávislých kandidátů „Pro Týnec srdcem“, které se chce ucházet o důvěru občanů v letošních komunálních volbách. Hlavním důvodem jeho vzniku je přesvědčení, že demokracie má stát na možnosti výběru, otevřené diskusi a různých pohledech na budoucnost obce.',
    obsah: `Před čtyřmi lety měli občané v komunálních volbách k dispozici pouze jednu kandidátní listinu. Volby tak proběhly bez možnosti porovnání různých programů, názorů či priorit. Právě tato zkušenost byla impulzem pro vznik nového sdružení.

„Nechceme stavět naši kampaň na útocích nebo rozdělování obce. Naším cílem je přinést otevřenost, novou energii a především možnost volby. Věříme, že obec je nejsilnější tehdy, když mohou lidé sami rozhodovat mezi více pohledy na její budoucnost.“

V následujících měsících budeme postupně představovat své kandidáty, témata i konkrétní vize pro další rozvoj Velkého Týnce, Vsiska a Čechovic. Důraz budeme klást zejména na komunikaci s občany, transparentnost a aktivní zapojení veřejnosti do dění v obci.

„Jsme přesvědčeni, že možnost výběru je základním principem demokracie. A jsme rádi, že letos na podzim budou mít občané Velkého Týnce a místních částí Čechovice a Vsisko možnost rozhodnout se sami.“

Aktuální informace o kandidátech, programu i plánovaných aktivitách mohou občané sledovat na facebooku Pro Týnec srdcem.`,
    obrazek: '/aktuality/letos-moznost-volby-2026-05-12.png',
    obrazekSirka: 1024,
    obrazekVyska: 858,
    nahledOrez: 'left',
  },
  {
    id: '2026-05-05-kandidaty-predstavime-postupne',
    typ: 'clanek',
    datum: '2026-05-05',
    nadpis:
      'Kandidáty představíme postupně. Chceme je ukázat jinak než jen seznam jmen',
    perex:
      'V následujících týdnech začneme postupně představovat svůj volební tým. Reagujeme tak na časté dotazy našich spoluobčanů, kteří chtějí vědět, kdo konkrétně za iniciativou Pro Týnec srdcem stojí.',
    obsah: `Namísto jednorázového zveřejnění seznamu kandidátů jsme se rozhodli jít jinou cestou. Každému kandidátovi chceme dát prostor představit se osobně, aby voliči znali nejen jeho jméno na kandidátce, ale především jeho vlastní příběh, zkušenosti a motivaci.

"Nechceme zůstat jen u seznamu jmen. Chceme ukázat, kdo naši kandidáti opravdu jsou, co mají za sebou a proč se rozhodli zapojit do práce pro Týnec."

Postupné představování kandidátů bude probíhat prostřednictvím našich komunikačních kanálů. Každý z členů týmu tak dostane prostor přiblížit své hodnoty, zkušenosti i důvody, proč chce přispět k rozvoji obce.

Naším cílem je nabídnout občanům hlubší a autentičtější pohled na jednotlivé kandidáty a umožnit jim vytvořit si vlastní názor na základě konkrétních postojů a sdělených informací.

Buďte s námi u postupného odhalování celého týmu. ❤️💚`,
    obrazek: '/aktuality/kandidati-predstaveni-2026-05.png',
    obrazekSirka: 1024,
    obrazekVyska: 682,
  },
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
    obrazekSirka: 1024,
    obrazekVyska: 576,
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
