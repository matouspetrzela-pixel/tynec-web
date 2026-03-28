import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Route,
  School,
  HeartHandshake,
  MonitorSmartphone,
  Trees,
  Landmark,
  Dumbbell,
  Briefcase,
  Eye,
  Sprout,
} from 'lucide-react';

type ProgramItem = {
  tag: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const PROGRAM: ProgramItem[] = [
  {
    tag: 'PRO BEZPEČÍ',
    title: 'Chodníky a doprava',
    body: 'Neskládáme se přes nebezpečné přechody. Zajistíme opravy chodníků a zklidníme rizikové úseky, kde děti i senioři cítí strach.',
    Icon: Route,
  },
  {
    tag: 'PRO RODINY',
    title: 'Školy a volný čas',
    body: 'Školky a školy musí stačit. Zajistíme kapacity a podporu kroužků, aby rodiče nemuseli jezdit za aktivitami jinam.',
    Icon: School,
  },
  {
    tag: 'PRO SENIORY',
    title: 'Důstojnost a péče',
    body: 'Stárnutí obce řešíme teď. Zajistíme dostupné služby a komunitní projekty, aby nikdo nezůstal osamělý.',
    Icon: HeartHandshake,
  },
  {
    tag: 'PRO DIGITALIZACI',
    title: 'Služby online',
    body: 'Úřad má být srozumitelný. Zajistíme vyřizování online, přehledné lhůty a komunikaci, na kterou se dá spolehnout.',
    Icon: MonitorSmartphone,
  },
  {
    tag: 'PRO ZELEŇ',
    title: 'Veřejná prostranství',
    body: 'Zanedbaná místa bereme jako prioritu. Zajistíme péči o zeleň a úpravy parků tak, aby obec dýchala.',
    Icon: Trees,
  },
  {
    tag: 'PRO KULTURU',
    title: 'Tradice živě',
    body: 'Hody a spolky nesmí ztratit podporu. Zajistíme stabilní financování a zázemí pro akce, které Týnec definují.',
    Icon: Landmark,
  },
  {
    tag: 'PRO SPORT',
    title: 'Hřiště a pohyb',
    body: 'Děti potřebují kde sportovat. Zajistíme údržbu hřišť a rozvoj sportovišť bez zbytečných průtahů.',
    Icon: Dumbbell,
  },
  {
    tag: 'PRO PODNIKATELE',
    title: 'Lokální ekonomika',
    body: 'Řemeslo a služby drží obec při životě. Zajistíme férová pravidla a podporu podnikatelům, kteří u nás zaměstnávají sousedy.',
    Icon: Briefcase,
  },
  {
    tag: 'PRO TRANSPARENTNOST',
    title: 'Radnice otevřeně',
    body: 'Skepse vůči radnici bereme vážně. Zajistíme otevřená data, jasné investiční plány a odpovědi, ne mlžení.',
    Icon: Eye,
  },
  {
    tag: 'PRO BUDOUCNOST',
    title: 'Udržitelný rozvoj',
    body: 'Krátkodobé kšefty nestačí. Zajistíme energetické úspory a investice, které obstojí i za deset let.',
    Icon: Sprout,
  },
];

export const ProgramGrid: React.FC = () => {
  return (
    <section
      className="border-t border-gray-100 bg-white section-padding"
      aria-labelledby="program-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="reveal mb-12 max-w-3xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Program 2026
          </p>
          <h2
            id="program-heading"
            className="mt-3 text-h2-mobile font-bold uppercase leading-tight tracking-tight text-tynec-black md:text-h2-desktop"
          >
            10 bodů rozvoje 2026
          </h2>
          <p className="mt-5 max-w-2xl text-tynec-black/80">
            Krátké závazky. Žádné prázdné fráze — odpovědi na to, co občany štve.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM.map((item, i) => {
            const Icon = item.Icon;
            return (
              <article
                key={item.title}
                className="reveal relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 transition-colors duration-300 hover:border-gray-200"
              >
                {/* Dekorativní číslo — vodoznak v pozadí */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 select-none font-black leading-none text-tynec-black/[0.045]"
                  style={{ fontSize: '5rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative mb-4">
                  <Icon
                    className="h-7 w-7 shrink-0 text-primary"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                  {item.tag}
                </p>
                <h3 className="relative mt-2 text-base font-bold uppercase leading-snug tracking-tight text-tynec-black md:text-lg">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-tynec-black/75">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
