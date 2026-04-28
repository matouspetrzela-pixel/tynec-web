import React from 'react';
import type { Metadata } from 'next';
import { CandidatesGrid } from '@/components/CandidatesGrid';

export const metadata: Metadata = {
  title: 'Kandidáti',
  description:
    'Dvanáct tváří hnutí Pro Týnec srdcem. Poznáváme je — lidé z obce, kteří chtějí rozvíjet Velký Týnec, Vsisko a Čechovice.',
};

export default function KandidatiPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Záhlaví */}
        <header className="mb-16 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Volby 2026
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Kandidátní listina
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
            <p className="text-lg leading-[1.65] text-tynec-black/80 md:text-xl">
              Naši kandidáti jsou sousedé, rodiče, prarodiče i mladé rodiny z Velkého Týnce, Vsiska
              a Čechovic — chtějí obec rozvíjet a zlepšovat každodenní život všech občanů.
            </p>
            <p className="border-l-2 border-primary/35 pl-6 text-base leading-[1.65] text-tynec-black/70 md:pl-8 md:text-lg">
              Jména zatím uvádíme v abecedním pořadí. Konečné pořadí na oficiální kandidátní listině
              bude zveřejněno v předepsané lhůtě, před blížícími se volbami.
            </p>
          </div>
        </header>
      </div>

      {/* Mřížka kandidátů */}
      <CandidatesGrid showTitle={false} />
    </div>
  );
}
