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
   * Rozbalovací podrobný text na stránce článku (tlačítko „Přečíst podrobnosti“).
   * Odstavce odděl prázdným řádkem; podnadpisy jako krátký řádek bez tečky na konci;
   * odrážky řádky začínající „• “.
   */
  podrobneNadpis?: string;
  podrobneObsah?: string;
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
    id: '2026-07-22-pivni-gulasove-slavnosti',
    typ: 'clanek',
    datum: '2026-07-22',
    nadpis:
      'Pivní a gulášové slavnosti očima soutěžících: Pštrosí guláš vařený srdcem sklidil velký úspěch',
    perex:
      'Letošní Pivní a gulášové slavnosti ve Velkém Týnci nabídly nejen skvělou atmosféru, dobré jídlo a setkání sousedů, ale také tradiční soutěž ve vaření guláše, do které jsme se zapojili jako tým Pro Týnec srdcem. Do soutěže jsme vyrazili jako parta kamarádů, sousedů a občanů Velkého Týnce s jediným cílem – užít si společný den a přispět k pohodové atmosféře celé akce.',
    obsah: `Už od ranního příjezdu nás potěšilo, jak dobře byla celá akce připravená. Soutěžní stanoviště byla přehledně označená, organizace fungovala bez problémů a nechybělo ani zázemí, které soutěžícím usnadnilo celý den. Postavili jsme si vlastní stan, který se později ukázal jako velmi dobrý pomocník, protože během odpoledne přišla silná bouřka. Ani nepříznivé počasí ale nikoho neodradilo. Po dešti se soutěž i setkávání s návštěvníky opět naplno rozběhly.

Kromě samotného vaření jsme chtěli návštěvníkům nabídnout i něco navíc. Připravili jsme proto kolo štěstí, které si mohli vyzkoušet děti i dospělí. Každý účastník si odnesl malou odměnu a nechyběly ani netradiční ceny pro dospělé. Velký zájem návštěvníků nám udělal velkou radost.

Největší odměnou pro celý tým ale byla zpětná vazba od návštěvníků. Náš pštrosí guláš vařený srdcem se totiž vyprodal jako úplně první ze všech soutěžních gulášů.

„Do soutěže jsme nešli primárně kvůli vítězství. Chtěli jsme být součástí krásné obecní akce, potkat se s lidmi, pobavit se a ukázat, že když se spojí parta nadšených lidí, může vzniknout něco příjemného pro celou komunitu. To, že našemu guláši lidé dali takovou důvěru a rychle se vyprodal, je pro nás obrovská pochvala,“ říká členka soutěžního týmu Michaela Dvořáková.

Přestože jsme tentokrát na stupně vítězů nedosáhli, odnášíme si především skvělý zážitek, spoustu milých setkání a radost z toho, že jsme mohli být součástí této povedené akce. Jediné, čeho litujeme, je, že jsme nemohli uspokojit všechny zájemce, kteří chtěli náš pštrosí guláš ještě ochutnat.

Na závěr bychom chtěli poděkovat všem organizátorům za skvěle připravenou akci. Oceňujeme jejich práci, nasazení i péči, díky nimž si soutěžící i návštěvníci mohli užít krásný den plný dobrého jídla, pití a přátelských setkání.

Už teď se těšíme na další ročník!`,
    obrazek: '/aktuality/pivni-gulasove-slavnosti-2026.jpg',
    obrazekSirka: 1024,
    obrazekVyska: 576,
  },
  {
    id: '2026-07-20-zasedani-zastupitelstva-bankomat',
    typ: 'clanek',
    datum: '2026-07-20',
    nadpis: 'Zastupitelstvo bude řešit bankomat i dodatky k investičním akcím',
    perex:
      'Na dalším zasedání Zastupitelstva obce Velký Týnec, které se uskuteční v pondělí 27. července 2026 od 17:30 hodin v Malém sále Společenského domu ve Velkém Týnci, se budou řešit rozpočet, revitalizace zámecké stodoly, dodatky ke stavebním akcím i instalace bankomatu.',
    obsah: `Na dalším zasedání Zastupitelstva obce Velký Týnec, které se uskuteční:

📅 pondělí 27. července 2026 od 17:30 hodin
📍 Malý sál Společenského domu ve Velkém Týnci

se budou řešit následující body:

• rozpočtové opatření č. 4/2026,

• výběr zhotovitele revitalizace zámecké stodoly,

• nový řád veřejného pohřebiště,

• dodatky ke smlouvám na stavební akce v Čechovicích a na víceúčelovém hřišti VT–Vsisko,

• žádost o bezúplatný převod majetku související s výstavbou infrastruktury pro lokalitu Podštampilí,

• majetkoprávní záležitosti obce (žádosti o prodej a pronájem obecních pozemků),

• projekt instalace bankomatu a

• žádosti o mimořádné dotace.

Zasedání zastupitelstva je veřejné a zúčastnit se jej mohou všichni občané. Zveme proto všechny zájemce o dění v obci, aby přišli sledovat projednávání důležitých témat a zapojili se do závěrečné diskuse.`,
    obrazek: '/aktuality/zasedani-zastupitelstva-uzemni-plan-2026-06-19.png',
    obrazekSirka: 1024,
    obrazekVyska: 682,
    kartaZobrazeni: 'contain',
  },
  {
    id: '2026-07-17-volebni-program-poradi-kandidatu',
    typ: 'clanek',
    datum: '2026-07-17',
    nadpis:
      'Představujeme náš volební program. V příštích dnech ho najdete ve svých schránkách',
    perex:
      'V příštích dnech dorazí do poštovních schránek ve Velkém Týnci, Vsisku a Čechovicích náš volební leták. Najdete v něm představení všech členů našeho týmu i základní body programu, se kterým se ucházíme o vaši důvěru v komunálních volbách.',
    obsah: `Věříme, že obec se nejlépe rozvíjí tehdy, když ji vedou lidé, kteří v ní skutečně žijí. Proto náš tým tvoří sousedé, rodiče, prarodiče i mladí lidé, kteří znají každodenní život v naší obci, její silné stránky i výzvy, které je potřeba řešit.

Náš volební program nevznikal za zavřenými dveřmi. Je výsledkem rozhovorů s občany, podnětů z našeho dotazníkového šetření i komentářů a zpráv, které nám posíláte prostřednictvím sociálních sítí. Všechny vaše názory jsme pečlivě četli a řada z nich se promítla do konkrétních návrhů. Program se proto zaměřuje na témata, která považujete za důležitá – otevřenou komunikaci, odpovědné hospodaření, podporu rodin, spolků i seniorů, kvalitní veřejný prostor a moderní obec, která svým občanům naslouchá.

Všechny informace, představení našeho týmu i základní volební program najdete také na našem webu a sociálních sítích.

Děkujeme za podporu, důvěru i všechny podněty, které nám posíláte. Právě díky nim můžeme společně pracovat na tom, aby se ve Velkém Týnci, Vsisku a Čechovicích dobře žilo všem generacím.`,
    obrazek: '/aktuality/volebni-program-poradi-kandidatu-2026-07-17.png',
    obrazekSirka: 1024,
    obrazekVyska: 681,
    nahledOrez: 'left',
  },
  {
    id: '2026-06-23-zasedani-zastupitelstva-hospodareni',
    typ: 'clanek',
    datum: '2026-06-25',
    nadpis: 'Týnecké zastupitelstvo jednalo o hospodaření obce i dopravní situaci',
    perex:
      'V pondělí 22. června 2026 se uskutečnilo 26. veřejné zasedání Zastupitelstva obce Velký Týnec. Zastupitelé projednali celkem devět bodů programu, které se týkaly hospodaření obce, územního rozvoje i dalších záležitostí důležitých pro fungování obce.',
    obsah: `Mezi schválenými body bylo rozpočtové opatření, závěrečný účet obce za rok 2025, účetní závěrka obce a účetní závěrky Základní školy a Mateřské školy Velký Týnec. Zastupitelé dále schválili smlouvu o přezkoumání hospodaření obce za rok 2026, změnu č. 2 územního plánu a smlouvu o zřízení služebnosti.

Do programu byl zařazen také bod týkající se poskytnutí dotace z Olomouckého kraje pro Jednotku sboru dobrovolných hasičů Velký Týnec. Zastupitelstvo schválilo přijetí dotace ve výši 52 500 korun.

Součástí jednání byl rovněž prostor pro vystoupení občanů. Dotazy směřovaly především k rozpočtovému opatření, účetní závěrce obce a změně územního plánu. V následné diskuzi zazněla řada podnětů týkajících se každodenního života v obci.

Diskutovalo se například o možnosti instalace dopravního zrcadla na křižovatce v ulici Sadová, snížení rychlosti v úseku mezi kinem a sochou svatého Floriána, situaci s parkováním v ulici U Nové školy nebo o parkování vozidel na chodnících. Obyvatelé se zajímali také o dodržování obecní vyhlášky regulující hlučné činnosti, organizaci parkování během pivních a gulášových slavností, problematiku shromažďování mladistvých a osob pod vlivem omamných látek na veřejných prostranstvích, umístění přechodů pro chodce či funkčnost bezpečnostní kamery u altánu pod mateřskou školou.

Sdružení Pro Týnec srdcem chce občanům pravidelně přinášet přehledné a srozumitelné informace o dění v obci. Věříme, že otevřená komunikace a informovanost občanů jsou základem dobrého fungování samosprávy.

Podrobnější informace k jednotlivým bodům jednání najdete níže.`,
    podrobneNadpis:
      'Podrobněji k jednání zastupitelstva obce Velký Týnec ze dne 22. června 2026',
    podrobneObsah: `Na červnovém zasedání zastupitelstva bylo projednáno celkem devět bodů programu. Všechny předložené materiály byly zastupiteli schváleny. Některé body však vyvolaly dotazy občanů a zajímavou diskuzi, proto přinášíme podrobnější shrnutí.

Rozpočtové opatření č. 3/2026

Zájem veřejnosti vzbudilo projednávání rozpočtového opatření. Občané se dotazovali především na plánované výdaje ve výši 325 tisíc korun určené na rekonstrukci hasičské dílny a na částku 400 tisíc korun vedenou v položce drobného dlouhodobého hmotného majetku. Podle informací vedení obce jsou tyto prostředky určeny na vybavení nově vznikajícího komunitního centra.

Hospodaření obce za rok 2025

Zastupitelstvo schválilo závěrečný účet obce i účetní závěrku za rok 2025.

V průběhu jednání zazněl dotaz občana na výsledek hospodaření obce. Odpověď ze strany vedení nebyla zcela jednoznačná, proto doplňujeme základní informaci. Pro rok 2025 byl schválen schodkový rozpočet a obec hospodařila se saldem příjmů a výdajů po konsolidaci ve výši -12 525 187,36 Kč.

Zastupitelé dále schválili účetní závěrky Mateřské školy Velký Týnec a Základní školy Velký Týnec.

Změna č. 2 územního plánu

Významnou část jednání zabralo schvalování změny č. 2 územního plánu obce.

Starosta během projednávání upozornil, že v této fázi již občané nemohou podávat připomínky a konečné rozhodnutí je plně v kompetenci zastupitelů. Současně uvedl, že veřejnost měla možnost se ke změnám vyjádřit na informačním setkání organizovaném na konci loňského roku. Informace o tomto setkání byla zveřejněna pouze na úřední desce Magistrátu města Olomouce a podle vyjádření starosty měla být také odvysílána místním rozhlasem. V archivu hlášení na webových stránkách obce se nám však tuto informaci nepodařilo dohledat.

Schválená změna územního plánu obsahuje mimo jiné dva body, které považujeme za zásadní:

• objekt bývalé sokolovny bude nahrazen bytovým domem,
• v centru obce dojde ke změně využití bývalého areálu DAE, který bude nově určen pro bytové bydlení namísto původní výrobní funkce.

Oba bytové domy mají mít dohromady 40 bytů, nemají svou výškou překročit zdravotní středisko a každý byt má mít jedno parkovací stání. Obě změny mohou významně ovlivnit budoucí podobu centra obce.

Další schválené body

Bez větší diskuze byla schválena smlouva o výkonu přezkoumání hospodaření obce za rok 2026 a smlouva o zřízení služebnosti související se stavbou Ředitelství silnic a dálnic.

Zastupitelé rovněž schválili přijetí dotace z Olomouckého kraje pro Jednotku požární ochrany Velký Týnec ve výši 52 500 Kč.

Co zaznělo v diskuzi občanů

Nepřehledná křižovatka v ulici Sadová

Občané upozornili na problematickou dopravní situaci na křižovatce při příjezdu od kina směrem k Junácké aleji. Řidiči zde musí dávat přednost zprava, ale kvůli omezenému rozhledu často nevidí vozidla přijíždějící z vedlejších komunikací.

Vedení obce bylo požádáno o prověření možnosti instalace dopravního zrcadla.

Rychlost vozidel v centru obce

Po schválení změny územního plánu zazněl také podnět ke snížení rychlosti projíždějících vozidel v úseku od kina k soše sv. Floriána.

Vedení obce přislíbilo, že možnosti dopravního řešení prověří.

Situace v ulici U Nové školy

Občané upozornili na komplikovanou dopravní situaci v ulici U Nové školy. V průběhu dne zde proudí velké množství chodců, cyklistů i automobilů mířících do školy, na sportovní tréninky a další zájmové aktivity.

Parkující vozidla podle diskutujících často zhoršují přehlednost a bezpečnost provozu. Vedení obce bylo vyzváno k hledání vhodného řešení.

Parkování na chodnících

Opakovaně zazněl problém parkování osobních vozidel na chodnících. Takové stání omezuje bezpečný pohyb chodců, rodičů s kočárky i seniorů, kteří jsou často nuceni vstupovat do vozovky.

Podle informací z jednání bude obecní policista na tento problém více dohlížet a v případě potřeby využívat i sankční opatření.

Dodržování vyhlášky o hlučných činnostech

Diskutovalo se také o dodržování obecně závazné vyhlášky upravující hlučné činnosti.

Parkování během pivních a gulášových slavností

V souvislosti s připravovanými slavnostmi bylo oznámeno, že návštěvníkům bude určeno parkování na ploše pod hřbitovem.

Cílem je omezit parkování v okolních ulicích a předejít komplikacím pro místní obyvatele.

Shromažďování problémových skupin v obci

Občané upozornili na zvýšený výskyt skupinek mladistvých a osob pod vlivem omamných látek na některých veřejných prostranstvích.

Nejčastěji byly zmíněny prostory dětského hřiště pod mateřskou školou a hřiště v bývalé pionýrské zahradě za společenským domem. Obecní policista bude tato místa pravidelně kontrolovat.

Kamera u altánu pod mateřskou školou

V závěru diskuze byla otevřena otázka funkčnosti kamery monitorující prostor dětského hřiště pod mateřskou školou.

Přestože během jednání zaznělo z úst starosty, že kamera není funkční a je atrapou, podle dostupných informací zařízení funguje. Problémem jsou větve a listy stromů, které zasahují do zorného pole kamery a omezují její účinnost.`,
    obrazek: '/aktuality/informace-ze-zastupitelstva-2026-06-25.png',
    obrazekSirka: 1024,
    obrazekVyska: 682,
    kartaZobrazeni: 'contain',
  },
  {
    id: '2026-06-19-zasedani-zastupitelstva-uzemni-plan',
    typ: 'clanek',
    datum: '2026-06-19',
    nadpis: 'Desítky nových bytů v centru obce? Změna územního plánu otevírá nové možnosti',
    perex:
      'Na nejbližším jednání zastupitelstva obce, které proběhne v pondělí 22. 6. 2026 v 17:30 hodin na Malém sále Společenského domu, se bude schvalovat změna územního plánu, která může významně ovlivnit budoucí podobu centra Velkého Týnce.',
    obsah: `Součástí navrhovaných změn jsou mimo jiné dvě plochy přímo v centru obce, u nichž se navrhuje změna využití — na hromadné bydlení. V prvním případě se jedná o objekt stávající sokolovny, kde bude současný objekt nahrazen novou budovou určenou pro bydlení. Druhá změna se týká částečně nevyužívaného objektu v centru obce (bývalé DAE), který bude nově sloužit také pro bytové účely.

Změna územního plánu ještě automaticky neznamená realizaci konkrétní stavby. Vytváří však předpoklady pro budoucí rozvoj těchto lokalit a otevírá prostor pro následné projektové přípravy.

Právě proto považujeme za důležité, aby se občané o předkládané změny zajímali již nyní. V souvislosti s možným vznikem nových bytů vyvstává řada otázek, které si zaslouží odpovědi:

Kolik bytových jednotek by v jednotlivých objektech mohlo vzniknout?

Jaké budou nároky na parkování a dopravní obslužnost?

Budou kapacitně dostačovat mateřská škola, základní škola a další veřejné služby?

Jaké dopady budou mít případné nové stavby na okolní zástavbu a kvalitu života v centru obce?

Jaké další požadavky bude obec muset v souvislosti s novou bytovou výstavbou řešit?

Podporujeme otevřenou diskusi o budoucím rozvoji naší obce, který je přirozenou součástí její budoucnosti. Stejně důležité je však také vědět, jaké konkrétní dopady budou mít jednotlivá rozhodnutí na každodenní život obyvatel a zda je obec na plánované změny dostatečně připravena.`,
    obrazek: '/aktuality/zasedani-zastupitelstva-uzemni-plan-2026-06-19.png',
    obrazekSirka: 1024,
    obrazekVyska: 682,
    kartaZobrazeni: 'contain',
  },
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
