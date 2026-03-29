import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Route, School, HeartHandshake, MonitorSmartphone, Trees,
  Landmark, Dumbbell, Briefcase, Eye, Sprout,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program 2026',
  description:
    '10 konkrétních bodů rozvoje Velkého Týnce pro komunální volby 2026. Bezpečí, rodiny, senioři, digitalizace, zeleň, kultura, sport, podnikání, transparentnost a udržitelnost.',
};

type ProgramItem = { tag: string; title: string; body: string; Icon: LucideIcon };

const PROGRAM: ProgramItem[] = [
  { tag: 'Pro bezpečí', title: 'Chodníky a doprava', body: 'Neskládáme se přes nebezpečné přechody. Zajistíme opravy chodníků a zklidníme rizikové úseky, kde děti i senioři cítí strach.', Icon: Route },
  { tag: 'Pro rodiny', title: 'Školy a volný čas', body: 'Školky a školy musí stačit. Zajistíme kapacity a podporu kroužků, aby rodiče nemuseli jezdit za aktivitami jinam.', Icon: School },
  { tag: 'Pro seniory', title: 'Důstojnost a péče', body: 'Stárnutí obce řešíme teď. Zajistíme dostupné služby a komunitní projekty, aby nikdo nezůstal osamělý.', Icon: HeartHandshake },
  { tag: 'Pro digitalizaci', title: 'Služby online', body: 'Úřad má být srozumitelný. Zajistíme vyřizování online, přehledné lhůty a komunikaci, na kterou se dá spolehnout.', Icon: MonitorSmartphone },
  { tag: 'Pro zeleň', title: 'Veřejná prostranství', body: 'Zanedbaná místa bereme jako prioritu. Zajistíme péči o zeleň a úpravy parků tak, aby obec dýchala.', Icon: Trees },
  { tag: 'Pro kulturu', title: 'Tradice živě', body: 'Hody a spolky nesmí ztratit podporu. Zajistíme stabilní financování a zázemí pro akce, které Týnec definují.', Icon: Landmark },
  { tag: 'Pro sport', title: 'Hřiště a pohyb', body: 'Děti potřebují kde sportovat. Zajistíme údržbu hřišť a rozvoj sportovišť bez zbytečných průtahů.', Icon: Dumbbell },
  { tag: 'Pro podnikatele', title: 'Lokální ekonomika', body: 'Řemeslo a služby drží obec při životě. Zajistíme férová pravidla a podporu podnikatelům, kteří u nás zaměstnávají sousedy.', Icon: Briefcase },
  { tag: 'Pro transparentnost', title: 'Radnice otevřeně', body: 'Skepse vůči radnici bereme vážně. Zajistíme otevřená data, jasné investiční plány a odpovědi, ne mlžení.', Icon: Eye },
  { tag: 'Pro budoucnost', title: 'Udržitelný rozvoj', body: 'Krátkodobé kšefty nestačí. Zajistíme energetické úspory a investice, které obstojí i za deset let.', Icon: Sprout },
];

export default function ProgramPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Záhlaví */}
        <header className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Volby 2026
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Náš program
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-tynec-black/80 md:text-xl">
            Krátké závazky. Žádné prázdné fráze — odpovědi na to, co občany štve.
          </p>
        </header>

        {/* 10 bodů */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM.map((item, i) => {
            const Icon = item.Icon;
            return (
              <article
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 transition-colors duration-300 hover:border-gray-200"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 select-none font-black leading-none text-tynec-black/[0.045]"
                  style={{ fontSize: '5rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mb-4">
                  <Icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                  {item.tag}
                </p>
                <h2 className="mt-2 text-base font-bold uppercase leading-snug tracking-tight text-tynec-black md:text-lg">
                  {item.title}
                </h2>
                <p className="mt-3 text-tynec-black/75">{item.body}</p>
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
            href="/kontakt"
            className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover md:text-base"
          >
            Napište nám
          </Link>
        </div>
      </div>
    </div>
  );
}
