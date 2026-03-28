import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Shield,
  Users,
  MonitorSmartphone,
  Trees,
  Landmark,
  Dumbbell,
  Briefcase,
  Eye,
  Sparkles,
  Baby,
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
    body:
      'Neskládáme se přes nebezpečné přechody. Zajistíme opravy chodníků a zklidníme rizikové úseky, kde děti i senioři cítí strach.',
    Icon: Shield,
  },
  {
    tag: 'PRO RODINY',
    title: 'Školy a volný čas',
    body:
      'Školky a školy musí stačit. Zajistíme kapacity a podporu kroužků, aby rodiče nemuseli jezdit za aktivitami jinam.',
    Icon: Baby,
  },
  {
    tag: 'PRO SENIORY',
    title: 'Důstojnost a péče',
    body:
      'Stárnutí obce řešíme teď. Zajistíme dostupné služby a komunitní projekty, aby nikdo nezůstal osamělý.',
    Icon: Users,
  },
  {
    tag: 'PRO DIGITALIZACI',
    title: 'Služby online',
    body:
      'Úřad má být srozumitelný. Zajistíme vyřizování online, přehledné lhůty a komunikaci, na kterou se dá spolehnout.',
    Icon: MonitorSmartphone,
  },
  {
    tag: 'PRO ZELEŇ',
    title: 'Veřejná prostranství',
    body:
      'Zanedbaná místa bereme jako prioritu. Zajistíme péči o zeleň a úpravy parků tak, aby obec dýchala.',
    Icon: Trees,
  },
  {
    tag: 'PRO KULTURU',
    title: 'Tradice živě',
    body:
      'Hody a spolky nesmí ztratit podporu. Zajistíme stabilní financování a zázemí pro akce, které Týnec definují.',
    Icon: Landmark,
  },
  {
    tag: 'PRO SPORT',
    title: 'Hřiště a pohyb',
    body:
      'Děti potřebují kde sportovat. Zajistíme údržbu hřišť a rozvoj sportovišť bez zbytečných průtahů.',
    Icon: Dumbbell,
  },
  {
    tag: 'PRO PODNIKATELE',
    title: 'Lokální ekonomika',
    body:
      'Řemeslo a služby drží obec při životě. Zajistíme férová pravidla a podporu podnikatelům, kteří u nás zaměstnávají sousedy.',
    Icon: Briefcase,
  },
  {
    tag: 'PRO TRANSPARENTNOST',
    title: 'Radnice otevřeně',
    body:
      'Skepse vůči radnici bereme vážně. Zajistíme otevřená data, jasné investiční plány a odpovědi, ne mlžení.',
    Icon: Eye,
  },
  {
    tag: 'PRO BUDOUCNOST',
    title: 'Udržitelný rozvoj',
    body:
      'Krátkodobé kšefty nestačí. Zajistíme energetické úspory a investice, které obstojí i za deset let.',
    Icon: Sparkles,
  },
];

export const ProgramGrid: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-gray-100 bg-white section-padding">
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Program 2026
          </p>
          <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight text-tynec-black sm:text-3xl md:text-4xl">
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
                key={i}
                className="flex min-h-[200px] flex-col rounded-2xl border border-gray-100 bg-white p-7 transition-colors duration-300 hover:border-gray-200 lg:min-h-0"
              >
                <div className="mb-4">
                  <Icon
                    className="h-8 w-8 shrink-0 text-tynec-black"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tynec-gray">
                  {item.tag}
                </p>
                <h3 className="mt-2 text-lg font-bold uppercase leading-snug tracking-tight text-tynec-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-tynec-black/75">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
