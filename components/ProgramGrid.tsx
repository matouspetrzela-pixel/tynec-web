import React from 'react';
import Link from 'next/link';
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
import { CampaignLogo } from '@/components/CampaignLogo';

type ProgramItem = {
  tag: string;
  title: string;
  Icon: LucideIcon;
  variant?: 'default' | 'brand';
};

const PROGRAM: ProgramItem[] = [
  { tag: 'PRO BEZPEČÍ', title: 'Chodníky a doprava', Icon: Route },
  { tag: 'PRO RODINY', title: 'Školy a volný čas', Icon: School },
  { tag: 'PRO SENIORY', title: 'Důstojnost a péče', Icon: HeartHandshake },
  { tag: 'PRO DIGITALIZACI', title: 'Služby online', Icon: MonitorSmartphone },
  { tag: 'PRO ZELEŇ', title: 'Veřejná prostranství', Icon: Trees },
  { tag: 'PRO KULTURU', title: 'Tradice živě', Icon: Landmark },
  { tag: 'PRO SPORT', title: 'Hřiště a pohyb', Icon: Dumbbell },
  { tag: 'PRO PODNIKATELE', title: 'Lokální ekonomika', Icon: Briefcase },
  { tag: 'PRO TRANSPARENTNOST', title: 'Radnice otevřeně', Icon: Eye },
  { tag: 'PRO BUDOUCNOST', title: 'Udržitelný rozvoj', Icon: Sprout },
  {
    tag: 'PRO TÝNEC SRDCEM',
    title: 'Celý program',
    Icon: Eye,
    variant: 'brand',
  },
];

export const ProgramGrid: React.FC = () => {
  return (
    <section
      className="section-padding border-t border-slate-200/60 bg-gradient-to-b from-white via-slate-50/50 to-white"
      aria-labelledby="program-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="reveal mb-12 max-w-5xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-tynec-gray">
            Program 2026
          </p>
          <h2
            id="program-heading"
            className="mt-3 text-h2-mobile font-bold uppercase leading-[1.1] tracking-tight text-tynec-black md:text-h2-desktop"
          >
            10 bodů rozvoje 2026
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-[1.7] text-tynec-black/80 md:text-lg">
            Níže je přehled deseti hlavních směrů — to, co chceme v příštím období posouvat o
            poznání dál. Není to soupis všeho možného; jde o naše priority a směr práce. Konkrétní
            závazky, rozpracování krok za krokem a podrobnosti k jednotlivým oblastem máme v{' '}
            <Link
              href="/program"
              className="font-semibold text-tynec-black underline decoration-primary/55 underline-offset-[3px] transition-colors hover:text-primary"
            >
              plném programu
            </Link>
            .
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {PROGRAM.map((item, i) => {
            const Icon = item.Icon;
            const isBrand = item.variant === 'brand';
            if (isBrand) {
              return (
                <Link
                  key="brand"
                  href="/program"
                  className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 text-left transition-all duration-300 hover:border-gray-200 sm:min-h-0"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-3 select-none font-black leading-none text-tynec-black/[0.045]"
                    style={{ fontSize: '5rem' }}
                  >
                    11
                  </span>
                  <div className="mb-4">
                    <div className="rounded-xl border border-gray-100 bg-white px-3 py-3">
                      <CampaignLogo
                        variant="header"
                        className="mx-auto h-auto w-full max-w-[200px] object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tynec-gray">
                    {item.tag}
                  </p>
                  <h3 className="mt-2 text-base font-bold uppercase leading-snug tracking-tight text-tynec-black md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-auto pt-5 text-sm font-semibold text-primary">Přečíst celý program →</p>
                </Link>
              );
            }
            return (
              <article
                key={item.title}
                className="card-elevated group/card relative flex min-h-[200px] flex-col overflow-hidden p-6 sm:min-h-0 sm:p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-2 select-none font-black leading-none"
                  style={{
                    fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                    WebkitTextStroke: '1px rgba(15, 23, 42, 0.07)',
                    color: 'rgba(15, 23, 42, 0.02)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative mb-3 sm:mb-4">
                  <Icon
                    className="h-7 w-7 shrink-0 text-primary drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-tynec-gray">
                  {item.tag}
                </p>
                <h3 className="relative mt-2 text-base font-bold uppercase leading-snug tracking-tight text-tynec-black md:text-lg">
                  {item.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
