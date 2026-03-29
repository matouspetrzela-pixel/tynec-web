import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nás',
  description:
    'Jsme sdružení nezávislých kandidátů a aktivních občanů Velkého Týnce. Kandidujeme, protože nám na obci záleží — poznáváme ji, žijeme v ní a chceme ji rozvíjet.',
};

const pillars = [
  {
    title: 'Tradice',
    body: 'Podpora folklóru, hodů a spolkového života, který dělá naši obec živou a jedinečnou. Respektujeme historii a identitu jednotlivých částí obce.',
  },
  {
    title: 'Rozvoj',
    body: 'Moderní infrastruktura, oprava chodníků a péče o veřejná prostranství s důrazem na estetiku a kvalitu života obyvatel.',
  },
  {
    title: 'Otevřenost',
    body: 'Radnice, která komunikuje s občany, naslouchá jejich potřebám a hospodaří transparentně s veřejnými financemi.',
  },
  {
    title: 'Vize 2026',
    body: 'Dlouhodobá koncepce rozvoje obce s ohledem na budoucí generace, udržitelnost a kvalitu života všech obyvatel.',
  },
];

export default function ONasPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Záhlaví */}
        <header className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Hnutí
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            O nás
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-tynec-black/80 md:text-xl">
            Jsme sdružení nezávislých kandidátů a aktivních občanů, které spojuje láska k Velkému
            Týnci, Vsisku a Čechovicím. Naším cílem není politikaření, ale koncepční rozvoj naší
            obce s respektem k tradici a historii.
          </p>
        </header>

        {/* Hodnoty */}
        <section aria-labelledby="hodnoty-heading">
          <h2
            id="hodnoty-heading"
            className="mb-8 text-h2-mobile font-bold uppercase text-tynec-black md:text-h2-desktop"
          >
            Naše hodnoty
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 transition-colors duration-300 hover:border-gray-200"
              >
                <h3 className="mb-4 text-h3-mobile font-bold uppercase text-tynec-black md:text-h3-desktop">
                  {p.title}
                </h3>
                <p className="text-tynec-black/75">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
