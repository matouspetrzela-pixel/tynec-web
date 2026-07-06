export interface Candidate {
  id: number;
  /** URL slug — např. /kandidati/jan-novak */
  slug: string;
  name: string;
  /**
   * Fixní pozice na mřížce (1–12), abecedně podle příjmení.
   * Pořadí odhalování je jiné — při zveřejnění se obsah objeví v tomto slotu.
   */
  gridSlot: number;
  /** Zveřejněn na webu (fotka, jméno, profil). Jinak bílý placeholder. */
  revealed: boolean;
  /** Krátká srdcová priorita zobrazená na dlaždici */
  heartPriority: string;
  /** Pohlaví — pro správné skloňování nadpisu profilu */
  gender: 'male' | 'female';
  /** Volitelná cesta k fotce v /public/images/kandidati/ */
  photo?: string;
  /**
   * Tailwind na obalu kolem obrázku (`CandidatePortrait`) — posun měřítko/origin kvůli oříznutým WebP.
   */
  portraitWebpTune?: string;
  /** object-position pro WebP (např. `object-[center_55%]`) */
  portraitObjectPosition?: string;
  /* ── Pole pro budoucí doplnění ─────────────────────── */
  /** Delší bio text (odstavce oddělené prázdným řádkem) */
  bio?: string;
  /** Seznam osobních priorit */
  priorities?: string[];
  /** Závěrečná věta medailonku (za seznamem priorit) */
  profileClosing?: string;
}

/**
 * Abecední mapa slotů podle příjmení (pexeso — pozice fixní, odhalování postupné):
 *  1 Michal Andrýsek
 *  2 Petra Andrýsková
 *  3 Jiří Dvořák
 *  4 Michaela Dvořáková
 *  5 Ing. Vladimíra Hacsiková
 *  6 Drahomíra Obšnajdrová
 *  7 Kateřina Parčová
 *  8 Filip Sklenář
 *  9 Alena Sojáková
 * 10 Michal Sviták
 * 11 Pavlína Zlámalová
 * 12 Jakub Žádník
 *
 * Harmonogram ručního odhalování (18:00, `revealed: true` + deploy):
 *  22. 6. — jakub-zadnik
 *  26. 6. — filip-sklenar, petra-andryskova
 *  30. 6. — katerina-parcova, drahomira-obsnajdrova
 *   4. 7. — michal-andrysek, michal-svitak
 *   8. 7. — jiri-dvorak, alena-sojakova
 *  12. 7. — pavlina-zlamalova, michaela-dvorakova
 *  14. 7. — vladimira-hacsikova
 */
export const CANDIDATES: Candidate[] = [
  {
    id: 1,
    slug: 'michal-andrysek',
    name: 'Mgr. Michal Andrýsek',
    gridSlot: 1,
    revealed: true,
    heartPriority: 'Pro moderní technologie',
    gender: 'male',
    photo: '/images/kandidati/michal-andrysek.webp',
    bio: [
      'Jmenuji se Michal Andrýsek, je mi 46 let a po vystudování oborů elektrotechnika, počítačové systémy a software engineering jsem několik let pracoval ve firmách zaměřených na programování. Posledních 14 let podnikám a věnuji se především dohledovým kamerovým systémům a energo-managementu (FVE projektování a realizace) a vývoji vlastních produktů v uvedených oborech. Díky tomu mám blízko k moderním technologiím i praktickým řešením, která dávají smysl v každodenním životě.',
      'V obci žiji 17 let a považuji ji za svůj domov. Mám tři děti, a proto mi záleží na tom, jak se zde žije nejen nám, ale i dalším rodinám. Ve volném čase se věnuji tanci, který mě naučil lepší komunikaci a trpělivosti. Jsem typ člověka, který rád věci opravuje a zlepšuje, a přirozeně se zajímám o nové technologie a jejich využití v praxi. Díky své práci mám zkušenosti i se zakázkami pro obce, zejména v oblasti zabezpečení a technického zázemí.',
      'Do života obce se zapojuji jako člen místního sboru dobrovolných hasičů a rád pomáhám při místních akcích. Beru to jako samozřejmou součást života v komunitě.',
      'Kandiduji proto, že bych rád přispěl k tomu, aby se obec posouvala dopředu a držela krok s dobou. Myslím si, že je důležité nebát se změn, hledat nové cesty a využívat moderní řešení tam, kde mohou lidem skutečně usnadnit život. Často vidím prostor pro zlepšení právě v praktických věcech, které mohou fungování obce zefektivnit.',
      'Rád bych se zaměřil především na využití moderních technologií v obci – například v oblasti bezpečnosti, energetiky nebo komunikace s občany. Smysl vidím také v podpoře úspor energií, chytrých řešení pro veřejný prostor a lepším využívání dat pro rozhodování. Zároveň je pro mě důležité, aby technologie sloužily lidem a byly zaváděny s rozumem a ohledem na reálné potřeby.',
    ].join('\n\n'),
    profileClosing:
      'Věřím, že i menší změny mohou mít velký dopad. Když se věci dělají poctivě a s rozumem, výsledky jsou vidět. A právě o to bych se chtěl zasadit.',
  },
  {
    id: 2,
    slug: 'petra-andryskova',
    name: 'Ing. Petra Andrýsková',
    gridSlot: 2,
    revealed: true,
    heartPriority: 'Pro komunitní život',
    gender: 'female',
    photo: '/images/kandidati/petra-andryskova.webp',
    bio: [
      'Jmenuji se Petra Andrýsková, je mi 45 let a dlouhodobě pracuji jako projektová manažerka dotačních projektů nejčastěji zaměřených na rozvoj lidských zdrojů a práci s lidmi a komunitami. Posledních 9 let působím v Místní akční skupině Bystřička, o.p.s. ve Velké Bystřici, kde spolupracuji se školami, starosty i neziskovými organizacemi. Tato práce mi dala cenné zkušenosti s rozvojem obcí i s propojováním lidí.',
      'V obci žiji 17 let a mám zde svůj domov i rodinu. Jsem maminkou tří dětí, a proto vnímám každodenní potřeby rodin i kvalitu prostředí, ve kterém žijeme. Ve volném čase se věnuji tanci, především argentinskému tangu, které mě naučilo vnímat důležitost naslouchání, respektu a spolupráce. Od mala ráda tvořím, jsem kreativní a důležitou součástí mého života je také sport.',
      'Do života obce se zapojuji dlouhodobě. Jsem zakladatelkou Rodinného centra Čmelda, členkou místního sboru dobrovolných hasičů a pravidelně vypomáhám při místních akcích. Komunitní život považuji za klíčový pro to, aby se lidem v obci dobře žilo.',
      'Kandidaturu nevnímám jako vstup do politiky, ale jako přirozené rozšíření občanského zapojení. Myslím si, že pokud chce člověk něco kritizovat, měl by si to nejdříve vyzkoušet, a pokud chce něco změnit, musí se o to aktivně pokusit. Mrzí mě, že se někdy nedaří více podporovat komunitu a spolupráci, ale zároveň mě motivuje, kolik aktivních a inspirativních lidí v obci máme a jak dobře dokážou spolky spolupracovat.',
      'Ráda bych se věnovala především oblasti dotací, školství a podpory komunity. Vidím velký potenciál v lepším využívání dotačních příležitostí, v rozvoji školního prostředí a v posilování vztahů mezi lidmi.',
    ].join('\n\n'),
    profileClosing:
      'Nevzdávám se a věřím, že sdílení dobré praxe má smysl. Vždy je prostor věci zlepšovat – a právě to je moje motivace. Protože když člověk někde žije, měl by se snažit, aby to místo bylo co nejlepší.',
  },
  {
    id: 3,
    slug: 'jiri-dvorak',
    name: 'Ing. Jiří Dvořák',
    gridSlot: 3,
    revealed: false,
    heartPriority: 'Pro otevřenost',
    gender: 'male',
    photo: '/images/kandidati/jiri-dvorak.webp',
    bio: [
      'Jmenuji se Jiří Dvořák, je mi 41 let a pracuji jako vedoucí oddělení technologie ve společnosti MORA Moravia s.r.o. Mnoho let byly mým domovem Čechovice. Jaké dítě jsem si tu naši malou vesničku zamiloval a i když jsem potom během studií strávil necelých 8 let v Brně, do Čechovic jsem se pořád vracel a zůstal jsem zde i po škole. Jedním z hlavních důvodů bylo i to, že od sedmi let chodím do skautského oddílu Poutníci a od roku 2007 ho vedu. Nyní již 6 let bydlím s rodinou ve Velkém Týnci a většinu času trávím se svými dvěma malými dcerami. Baví mě práce na zahradě, rád si pouštím hudbu z vinylových desek a často neodolám a vyrážím do přírody, kde aktivně odpočívám a čerpám energii. Skautský oddíl v současné době předávám do rukou mladší generaci, ale protože skaut pro mě není koníček, ale životní styl, skautem jsem a budu i dál. Více než třicet letních táborů v člověku zanechá nesmazatelnou stopu a jsem moc rád, že je čechovický oddíl stále oblíbený. Třeba tento způsob života osloví i mé dcery a brzy také zakotví v nějakém oddílu.',
      'Mnoho let se zajímám o politiku, a to nejen na lokální úrovni. Jsem totiž přesvědčen o tom, že lidé mají být aktivní, poskytovat voleným představitelům zpětnou vazbu a je zcela legitimní na ně klást nároky. Mám mezi politiky několik přátel, kteří také prošli skautskými oddíly a jsou to lidé, kterým důvěřuji. V současné době mě nejvíc mrzí, jak politika zhrubla, jak se kopou příkopy a jak se vytrácí kultura slušnosti a pokory. Chtěl bych komunální politiku dělat otevřeně. Klíčová je transparentnost. Ta vede k efektivnějšímu nakládání s veřejnými prostředky a jsem přesvědčen, že ve finále se zvýší i důvěra ve veřejnou správu jako takovou. Komunikace s občany a jejich zapojení do plánování i rozhodování je podle mě zásadní. Obzvláště v obci, kde pořád ještě žije určitý sousedský duch.',
    ].join('\n\n'),
  },
  {
    id: 4,
    slug: 'michaela-dvorakova',
    name: 'Michaela Dvořáková',
    gridSlot: 4,
    revealed: false,
    heartPriority: 'Pro rodinu',
    gender: 'female',
    photo: '/images/kandidati/michaela-dvorakova.webp',
    /** Řada 2 — bez zoomu, více headroomu jako řada 1 */
    portraitObjectPosition: 'object-[center_55%]',
    bio: [
      'Jmenuji se Michaela Dvořáková, je mi 46 let a pracuji na Magistrátu města Olomouce na personálním oddělení. Ve své profesi se denně setkávám s fungováním veřejné správy i s prací s lidmi, což považuji za cennou zkušenost využitelnou i pro rozvoj naší obce.',
      'Ve Velkém Týnci jsem se narodila, mám zde rodinu i zázemí. Jsem mámou dvou dospívajících dcer, a proto dobře vnímám potřeby rodin i mladých lidí, otázku vzdělávání, trávení volného času, bezpečí i celkové prostředí, ve kterém děti vyrůstají. Záleží mi na tom, jakým směrem se naše obec rozvíjí, a ráda bych se aktivně zapojila do jejího života nejen v oblasti kultury, ale i v dalších oblastech.',
      'Od 18 let jsem aktivní členkou Sboru dobrovolných hasičů ve Velkém Týnci. Začínala jsem jako členka sportovního družstva žen, později jsem působila jako kulturní referentka a vedoucí mladých hasičů a dnes zastávám funkci jednatelky. Tato dlouholetá zkušenost mě naučila vést kolektiv, organizovat kulturní a společenské akce, řídit jednání i zajišťovat administrativu. Především mě však naučila být nápomocná druhým.',
      'Jsem také spoluzakladatelkou a místopředsedkyní Spolku rodičů a přátel školy, kde úzce spolupracujeme se základní školou. Podílím se na organizaci akcí pro děti i rodiče, jako jsou dětské dny, rozloučení s žáky devátých tříd, vánoční dílničky a další aktivity. Připravuji projektové dny zaměřené na kreativitu a rozvoj logického myšlení a již několik let působím jako hlavní vedoucí příměstského tábora.',
      'Kandiduji, protože chci být aktivní součástí dění v obci a přispět k jejímu dalšímu rozvoji. Věřím, že díky zkušenostem z veřejného sektoru i z komunitního života mám co nabídnout. Jsem empatická, spravedlivá a otevřená komunikaci, ráda naslouchám a hledám smysluplná a realistická řešení.',
    ].join('\n\n'),
    profileClosing:
      'Mým cílem je otevřený a vstřícný úřad pro všechny spoluobčany. Záleží mi na tom, aby se v naší obci dobře žilo.',
  },
  {
    id: 8,
    slug: 'vladimira-hacsikova',
    name: 'Ing. Vladimíra Hacsiková',
    gridSlot: 5,
    revealed: false,
    heartPriority: 'Profil doplníme',
    gender: 'female',
  },
  {
    id: 5,
    slug: 'drahomira-obsnajdrova',
    name: 'Drahomíra Obšnajdrová',
    gridSlot: 6,
    revealed: false,
    heartPriority: 'Pro bezpečí',
    gender: 'female',
    photo: '/images/kandidati/drahomira-obsnajdrova.webp',
    /** Řada 2 — bez zoomu, více headroomu jako řada 1 */
    portraitObjectPosition: 'object-[center_51%]',
    bio: [
      'Jmenuji se Drahomíra Obšnajdrová, je mi 51 let a dlouhodobě žiji ve Velkém Týnci v místní části Čechovice. Jsem vyučená v oboru zemědělství. Nyní pracuji jako vedoucí v místním obchodu. Díky své profesní i životní zkušenosti dobře rozumím každodenním potřebám lidí i fungování běžného života v obci.',
      'Do života obce se aktivně zapojuji jako dobrovolník při různých kulturních a společenských akcích. Je pro mě důležité být v kontaktu s lidmi, naslouchat jim a přispívat k tomu, aby se v naší obci dobře žilo.',
      'Mezi mé hlavní priority patří podpora dostupného bydlení pro mladé rodiny, řešení sociálního bydlení pro samoživitele a zlepšení situace v oblasti parkování. Vnímám tyto oblasti jako klíčové pro kvalitní a spokojený život v obci.',
      'Jsem vdaná a mám jedno dítě. Ve volném čase se věnuji práci na zahrádce a ručním pracím, které mi přinášejí radost a odpočinek.',
    ].join('\n\n'),
    profileClosing:
      'Kandiduji, protože chci přispět k dalšímu rozvoji obce a podílet se na hledání konkrétních a realistických řešení. Mým cílem je, aby byl Velký Týnec dobrým místem pro život pro všechny generace.',
  },
  {
    id: 6,
    slug: 'katerina-parcova',
    name: 'Mgr. Bc. Kateřina Parčová',
    gridSlot: 7,
    revealed: true,
    heartPriority: 'Pro komunikaci',
    gender: 'female',
    photo: '/images/kandidati/katerina-parcova.webp',
    /** Řada 3 — bez zoomu, více headroomu (Kateřina měla hlavu nejvýš) */
    portraitObjectPosition: 'object-[center_52%]',
    bio: [
      'Jmenuji se Kateřina Parčová, je mi 41 let a ve Velký Týnec jsem našla svůj domov před více než jedenácti lety. Deset let jsem působila jako učitelka v mateřské škole přímo v obci, kde jsem získala cenné zkušenosti s prací s dětmi i jejich rodinami. V současnosti pracuji na Magistrátu města Olomouce na odboru školství, kde se nadále věnuji oblasti vzdělávání.',
      'Jsem maminkou dvou dětí a právě díky každodenním zkušenostem vnímám potřeby rodin i kvalitu života v obci. Aktivně se zapojuji do komunitního života, podílím se na organizaci volnočasových aktivit v rámci Rodinného centra Čmelda a spolupracuji se Spolkem rodičů a přátel školy při Základní škole ve Velkém Týnci.',
      'Do komunální politiky vstupuji s cílem podpořit další rozvoj obce jako místa, kde se dobře žije rodinám, dětem i seniorům. Nepovažuji se za člověka, který má odpověď na vše, ale jsem připravena naslouchat, učit se a aktivně hledat řešení problémů, které naši obec ovlivňují.',
    ].join('\n\n'),
    profileClosing:
      'Mým cílem je obec, která je bezpečná, živá a otevřená komunikaci mezi vedením obce a jejími občany. Obec, kde se dobře žije všem generacím.',
  },
  {
    id: 7,
    slug: 'filip-sklenar',
    name: 'Filip Sklenář',
    gridSlot: 8,
    revealed: true,
    heartPriority: 'Pro budoucnost',
    gender: 'male',
    photo: '/images/kandidati/filip-sklenar.webp',
    /** Řada 3 — bez zoomu, sladěno s řadou 1 */
    portraitObjectPosition: 'object-[center_50%]',
    bio: [
      'Jmenuji se Filip Sklenář, je mi 18 let a jsem studentem 4. ročníku na Slovanském gymnáziu v Olomouci. Ve Velkém Týnci žiji celý život, a proto chci, aby se naše obec, místo, kde jsem vyrostl, rozvíjela pozitivně i v budoucnu.',
      'Volný čas trávím nejčastěji s rodinou a mým největším koníčkem je nyní lyžování. V dětství jsem byl mnoho let členem sboru dobrovolných hasičů zde v Týnci, poznal jsem tu spoustu skvělých lidí a důležitost pomoci druhým.',
      'Zajímám se o politiku na všech úrovních již několik let a volby do obecního zastupitelstva vnímám jako velkou příležitost v politice začít, protože je mi naše obec blízká. Navíc bych rád osobně přispěl k lepšímu životu nás všech. Věřím, že mladí lidé v politice mohou přinést nové nápady a energii.',
      'V obci bych chtěl hlavně zlepšit komunikaci s obyvateli, například založením profilu obce na různých sociálních sítích, aby se informace z obce dostaly ke všem. Dále se chci podílet na vytvoření atraktivních míst pro volnočasové aktivity dětí a mladých lidí, aby měli možnost se setkávat a bavit.',
    ].join('\n\n'),
    profileClosing:
      'Přeji si, aby se i mladá generace aktivně účastnila dění v obci a všichni společně přispěli k tomu, aby byl Týnec moderní a přátelská obec. Myslím si, že i malé kroky mohou přinést velké změny.',
  },
  {
    id: 9,
    slug: 'alena-sojakova',
    name: 'Alena Sojáková',
    gridSlot: 9,
    revealed: true,
    heartPriority: 'Pro seniory',
    gender: 'female',
    photo: '/images/kandidati/alena-sojakova.webp',
    /** Řada 3 — oční linka bez translate */
    /** Řada 3 — bez zoomu, sladěno s řadou 1 */
    portraitObjectPosition: 'object-[center_50%]',
    bio: [
      'Jmenuji se Alena Sojáková, je mi 72 let a jsem v důchodu. Celý svůj profesní život jsem zasvětila práci zdravotní sestry, od roku 1986 jsem působila ve Velkém Týnci. Denně jsem byla v kontaktu s lidmi v různých životních situacích od běžné péče až po náročné chvíle, kdy je potřeba nejen odbornost, ale i lidský přístup. Díky tomu jsem poznala mnoho místních lidí i jejich životní příběhy.',
      'V obci žiji od roku 1980 a vždy jsem se snažila být její aktivní součástí. Působila jsem jako předsedkyně Českého červeného kříže, kde jsem se podílela na organizaci kulturních akcí i charitativních sbírek pro občany postižené mimořádnými událostmi nebo složitými životními situacemi. Pomoc druhým pro mě byla vždy samozřejmostí. Lidé u mě nacházeli podporu nejen v oblasti zdravotní péče, ale i v osobních životních situacích.',
      'Již více než 15 let jsem aktivní členkou sociální komise v naší obci. Společně pomáháme občanům v nouzi, organizujeme různé aktivity a pravidelně navštěvujeme seniory, kterým při významných jubileích předáváme dárky a věnujeme čas osobnímu setkání. Tato práce mi dává hlubší porozumění potřebám starší generace i celé komunity.',
      'Ráda se i nadále zapojuji jako dobrovolník při akcích, které pořádají místní hasiči, SRPŠ a spolek Čmelda, a přispívám tak k aktivnímu životu v obci.',
      'Jsem komunikativní, empatická a otevřená. Umím naslouchat lidem, spolupracovat a hledat řešení. Pomáhat druhým považuji za přirozenou součást života.',
      'Kandiduji, protože chci své zkušenosti z práce s lidmi i z komunitního života využít pro další rozvoj obce. Záleží mi na kvalitní péči o seniory, dostupnosti služeb, podpoře mezilidských vztahů a na tom, aby naše obec byla příjemným místem pro život všech generací.',
    ].join('\n\n'),
    profileClosing:
      'Mým cílem je obec, kde se dobře žije – s respektem, vzájemnou pomocí a lidským přístupem.',
  },
  {
    id: 10,
    slug: 'michal-svitak',
    name: 'Michal Sviták',
    gridSlot: 10,
    revealed: true,
    heartPriority: 'Pro kulturu',
    gender: 'male',
    photo: '/images/kandidati/michal-svitak.webp',
    bio: [
      'Jmenuji se Michal Sviták, je mi 33 let a pracuji jako elektromontér ve společnosti ČEZ. Pocházím z Hrochova Týnce a právě díky tomu mám už od dětství blízký vztah k Týnci a jeho okolí. I proto mé cesty vedly z Týnce do Týnce. Posledních 13 let zde žiji, z toho 10 let trvale.',
      'Tuto obec jsem si vybral jako svůj domov především díky místním lidem a jejímu jedinečnému prostředí. Žiji zde s přítelkyní, která v obci vyrůstala, a společně vychováváme našeho syna.',
      'S naší obcí jsem pevně spjatý především díky sboru dobrovolných hasičů. U hasičů jsem začal už v dětství. Právě v rámci sboru se spolu s rodinou aktivně podílíme na pořádání kulturních a společenských akcí, které spojují místní lidi. Zároveň působím v jednotce sboru dobrovolných hasičů obce, kde zastávám pozici zástupce velitele.',
      'Kandidovat jsem se rozhodl proto, že mi není dění v obci lhostejné. Chci prosazovat názory občanů a podílet se na tom, aby byla obec otevřená, vstřícná a přátelská k lidem. Zároveň chci ukázat, že i obyčejný člověk mého věku bez předchozích zkušeností může být součástí rozhodování a přinést nový pohled.',
      'Velkým tématem pro mě je větší zapojení občanů do rozhodování o obci. Chci, aby lidé měli možnost ovlivnit, co se v jejich okolí buduje a jakým směrem se obec rozvíjí. Záleží mi na tom, aby se v obci dobře žilo nejen dnes, ale hlavně i našim dětem v budoucnu. Chci se zaměřit zejména na tyto oblasti:',
    ].join('\n\n'),
    priorities: [
      'Zapojení občanů do rozhodování – více komunikace, otevřenost a možnost podílet se na projektech.',
      'Praktické zlepšování života v obci – služby, veřejný prostor a prostředí pro každodenní život.',
    ],
    profileClosing:
      'Chci být součástí týmu, který bude naslouchat lidem a společně s nimi tvořit obec, kde se dobře žije.',
  },
  {
    id: 11,
    slug: 'pavlina-zlamalova',
    name: 'Mgr. Pavlína Zlámalová',
    gridSlot: 11,
    revealed: false,
    heartPriority: 'Pro občany Čechovic, Týnce a Vsiska',
    gender: 'female',
    photo: '/images/kandidati/pavlina-zlamalova.webp',
    bio: [
      'Ve Velkém Týnci žiji od svého narození, společně s manželem vychováváme dva syny. Na životě v obci a na rozvoji obce mi záleží, protože je to domov naší rodiny. Ve své práci se denně setkávám s lidmi v náročných životních situacích, kteří potřebují pomoc a podporu. Právě díky tomu vím, jak je důležité mít kolem sebe podporující a chápající komunitu. Práce mě naučila naslouchat lidem a hledat řešení v neřešitelných situacích.',
      'Díky lásce mých synů k fotbalu jsem aktivní v místním fotbalovém klubu TJ Sokol Velký Týnec. Práce s lidmi mě baví, a to je také jeden z důvodů, proč se účastním kulturních a společenských akcí v obci, kde se snažím pomáhat.',
      'Ráda bych se věnovala především podpoře rodin s dětmi, zajištění dostupných služeb pro seniory a podpoře neformálně pečujících. Mojí vizí je vytvoření krizového obecního bytu pro rodiny, popř. osoby v nouzi. Budu se snažit o zavedení dobrovolnického projektu „sousedská výpomoc“. Pokusím se prosadit pravidelné vyhlašování výběrových řízení na vedoucí pozice školských zařízení v obci. Samozřejmostí pro mě bude podpora nových i stávajících spolků a zájmových sdružení v obci. Zasadím se o neměnnost územního plánu obce.',
    ].join('\n\n'),
    profileClosing:
      'Záleží mi na tom, aby naše obec byla místem, kde se lidé cítí dobře, vzájemně si pomáhají a podporují se a mají prostor pro spokojený rodinný život.',
  },
  {
    id: 12,
    slug: 'jakub-zadnik',
    name: 'Jakub Žádník',
    gridSlot: 12,
    revealed: true,
    heartPriority: 'Pro sport',
    gender: 'male',
    photo: '/images/kandidati/jakub-zadnik.webp',
    bio: [
      'Jmenuji se Jakub Žádník, je mi 46 let a podnikám v oboru stavebnictví.',
      'Ve volném čase působím jako trenér mládeže ve fotbalovém oddíle. Ve Velkém Týnci jsem se narodil, vyrůstal a prožil zde celý svůj život.',
      'Kandiduji, protože chci obci vrátit to, co mi po celý život dávala – bezpečné, spokojené a kvalitní místo pro život.',
      'Rád bych se svou prací podílel na dalším rozvoji naší obce. Věřím, že společnou prací můžeme zachovat vše dobré, co ve Velkém Týnci máme, a zároveň vytvářet podmínky pro jeho další rozvoj.',
    ].join('\n\n'),
  },
];

/** Mřížka vždy v abecedním pořadí podle příjmení (gridSlot). */
export function getCandidatesForGrid(): Candidate[] {
  return [...CANDIDATES].sort((a, b) => a.gridSlot - b.gridSlot);
}

const LOCAL_REVEAL_EXTRA_SLUGS = new Set(
  (process.env.NEXT_PUBLIC_LOCAL_REVEAL_EXTRA_SLUGS ?? '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean),
);

/**
 * Na localhostu zobrazí celou mřížku pro srovnání fotek (`NEXT_PUBLIC_PRODUCTION_PREVIEW` není `true`).
 * S `NEXT_PUBLIC_PRODUCTION_PREVIEW=true` v `.env.local` chování jako na produkci.
 * `NEXT_PUBLIC_LOCAL_REVEAL_EXTRA_SLUGS` (jen dev, v `.env.local`) dočasně odhalí další slugy bez změny `revealed`.
 */
export function isCandidateRevealed(candidate: Candidate): boolean {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_PRODUCTION_PREVIEW !== 'true'
  ) {
    return true;
  }
  if (
    process.env.NODE_ENV === 'development' &&
    LOCAL_REVEAL_EXTRA_SLUGS.has(candidate.slug)
  ) {
    return true;
  }
  return candidate.revealed;
}

/** Pomocník: najde kandidáta podle slugu. */
export function getCandidateBySlug(slug: string): Candidate | undefined {
  return CANDIDATES.find((c) => c.slug === slug);
}

/** Jen zveřejnění — profily, sitemap. */
export function getRevealedCandidates(): Candidate[] {
  return CANDIDATES.filter(isCandidateRevealed);
}
