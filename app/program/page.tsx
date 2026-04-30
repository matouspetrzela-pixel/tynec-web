import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CampaignLogo } from '@/components/CampaignLogo';
import {
  Eye,
  Wallet,
  Route,
  School,
  HeartHandshake,
  Trees,
  Landmark,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program 2026',
  description:
    'Program PRO TÝNEC SRDCEM pro komunální volby 2026: otevřený úřad, rozumné finance, strategický rozvoj, školství, sociální oblast, životní prostředí, kultura a bezpečnost.',
};

type ProgramItem = {
  tag: string;
  title: string;
  intro: string;
  points: string[];
  Icon: LucideIcon;
  variant?: 'default' | 'brand';
};

const PROGRAM: ProgramItem[] = [
  {
    tag: 'Pro otevřenost, férovost a dialog',
    title: 'Transparentní a otevřený úřad',
    intro: 'Úřad má být srozumitelný, dostupný a průběžně komunikovat s občany.',
    points: [
      'Zveřejňování informací a záměrů s dostatečným časovým předstihem.',
      'Pravidelné průzkumy spokojenosti a získávání zpětné vazby.',
      'Kontaktní formulář na webu obce pro sběr podnětů.',
      'Zveřejňování zápisů z veřejných zasedání zastupitelstva obce.',
      'Digitalizace úřadu a služeb.',
      'Na kus řeči se starostou.',
    ],
    Icon: Eye,
  },
  {
    tag: 'Pro rozumné hospodaření',
    title: 'Finance a investice',
    intro: 'Investice musí být dlouhodobě udržitelné a spravedlivé pro všechny části obce.',
    points: [
      'Participativní rozpočet – občané se podílejí na rozhodování o využití části obecního rozpočtu.',
      'Promyšlené strategické plánování budoucích investic do rozvoje obce.',
      'Aktivní využívání vypsaných dotačních titulů.',
      'Férové investice do rozvoje všech tří místních částí.',
    ],
    Icon: Wallet,
  },
  {
    tag: 'Pro budoucí generace',
    title: 'Strategický rozvoj obce',
    intro: 'Rozvoj obce musí být promyšlený, odpovědný a připravený na další desetiletí.',
    points: [
      'Zodpovědné posuzování návrhů na změnu územního plánu.',
      'Zapojení mladých lidí do plánování a definování dlouhodobé vize rozvoje.',
      'Smysluplné rekonstrukce silnic a chodníků.',
      'Pečlivé vyhodnocení budoucích plánů na rozvoj občanské vybavenosti a infrastruktury.',
      'Údržba stávajících a podpora budování nových cyklostezek.',
      'Rozšíření projektů vedoucích k částečné energetické soběstačnosti.',
    ],
    Icon: Route,
  },
  {
    tag: 'Pro kvalitní vzdělání od školky po školu',
    title: 'Školství',
    intro: 'Kvalitní vzdělávání je základní investicí do budoucnosti celé obce.',
    points: [
      'Úzká spolupráce obce s vedením školských zařízení.',
      'Podpora začleňování dětí ze sociálně slabých rodin do kolektivu.',
      'Zkvalitnění výuky a preventivních programů na ochranu dětí před škodlivými vlivy.',
      'Vypracování plánu pro další možnosti rozvoje a zkvalitnění výuky.',
      'Investice do moderní výstavby, vybavení a učebních pomůcek.',
      'Pravidelné vyhlašování výběrových řízení na vedení školských zařízení v obci.',
    ],
    Icon: School,
  },
  {
    tag: 'Pro lidi. Nasloucháme, podporujeme, propojujeme.',
    title: 'Sociální věci',
    intro: 'Sociální oblast má pomáhat lidem v reálných situacích a propojovat generace.',
    points: [
      'Rozšíření sociálních služeb pro seniory (senior taxi, rozšíření terénní pečovatelské služby, ...).',
      'Edukace veřejnosti o nabídce a možnostech sociálních služeb a podpory.',
      'Podpora rodin a rodičů v těžké životní situaci a vytvoření krizového a sociálního fondu.',
      'Podpora a spolupráce s Klubem seniorů, organizace pravidelných aktivit (přednášky, výlety atd.).',
      'Vytvoření klidových a podpůrných zón pro relaxaci a duševní pohodu.',
      'Spolupráce s charitativními a neziskovými organizacemi.',
      'Transparentní pravidla pro přidělování obecních bytů.',
      'Podpora a zřízení sociálních (startovacích) bytů.',
    ],
    Icon: HeartHandshake,
  },
  {
    tag: 'Pro zelenou obec',
    title: 'Životní prostředí',
    intro: 'O životní prostředí je potřeba pečovat systematicky a s důrazem na prevenci.',
    points: [
      'Svědomitá péče o veřejná prostranství.',
      'Pravidelná výsadba stromů, efektivní péče o zeleň v obci.',
      'Revitalizace sběrných míst pro tříděný odpad a dohled nad dodržováním třídění.',
      'Zřízení re-use centra - nabídka využití věcí před jejich likvidací.',
      'Revize a rozšíření protipovodňových opatření.',
    ],
    Icon: Trees,
  },
  {
    tag: 'Pro setkávání, tradice a komunitu',
    title: 'Kultura',
    intro: 'Kultura drží obec pohromadě a vytváří prostor pro setkávání napříč generacemi.',
    points: [
      'Podpora kulturního života v obci, akce pro všechny generace.',
      'Podpora komunitního života.',
      'Podpora nových i stávajících spolků a zájmových sdružení, vzájemná komunikace (křížení akcí).',
    ],
    Icon: Landmark,
  },
  {
    tag: 'Pro klidný a spokojený život',
    title: 'Bezpečnost',
    intro: 'Bezpečná obec vyžaduje prevenci, pořádek i připravenost na mimořádné situace.',
    points: [
      'Podpora programů prevence a vzdělávání občanů.',
      'Důraz na čistotu veřejných prostranství.',
      'Revize a nápravná opatření pro nebezpečná a problémová místa.',
      'Pravidelný audit bezpečnostní situace a kontinuální plány pro zlepšení.',
      'Možnost hlášení problémů a transparentní komunikace incidentů.',
      'Revize a vytvoření plánů pro mimořádné situace.',
    ],
    Icon: ShieldCheck,
  },
  {
    tag: 'PRO TÝNEC SRDCEM',
    title: 'Naše společná vize',
    intro: 'Silná obec stojí na aktivních lidech, důvěře a spolupráci napříč celým Týncem.',
    points: [
      'Domov, kde chceme dobře žít dnes i za deset let.',
      'Respekt k tradici, odpovědnost k budoucnosti.',
      'Společný směr pro Velký Týnec, Vsisko i Čechovice.',
    ],
    Icon: Eye,
    variant: 'brand',
  },
];

export default function ProgramPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">

        {/* Záhlaví */}
        <header className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Volby 2026
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Náš program
          </h1>
        </header>

        {/* Programové oblasti */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PROGRAM.map((item, i) => {
            const Icon = item.Icon;
            const isBrandTile = item.variant === 'brand';
            if (isBrandTile) {
              return (
                <article
                  key={item.title}
                  className="group relative flex h-full items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:border-gray-200"
                >
                  <div className="w-full rounded-xl border border-gray-100 bg-white px-3 py-4">
                    <CampaignLogo
                      variant="header"
                      className="mx-auto h-auto w-full max-w-[280px] object-contain"
                    />
                  </div>
                </article>
              );
            }
            return (
              <article
                key={item.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-gray-200"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 select-none font-black leading-none text-tynec-black/[0.045]"
                  style={{ fontSize: '5rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mb-5">
                  <Icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                </div>
                <p className="min-h-[2.6rem] text-[11px] font-semibold uppercase leading-[1.25] tracking-[0.18em] text-tynec-gray">
                  {item.tag}
                </p>
                <h2 className="mt-3 min-h-[3.1rem] text-[1.15rem] font-bold uppercase leading-tight tracking-tight text-tynec-black">
                  {item.title}
                </h2>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-gray-100 bg-white p-8 text-center md:p-12">
          <h2 className="mb-4 text-h3-mobile font-bold uppercase text-tynec-black md:text-h3-desktop">
            Máte nápad nebo připomínku?
          </h2>
          <p className="mb-8 text-tynec-black/75">
            Program tvoříme společně s vámi. Napište nám, co vás v obci trápí nebo co byste chtěli
            změnit.
          </p>
          <Link
            href="/podporte-nas"
            className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover md:text-base"
          >
            Podpořte nás
          </Link>
        </div>
      </div>
    </div>
  );
}
