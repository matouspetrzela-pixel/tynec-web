import React from 'react';
import type { Metadata } from 'next';
import { CandidatesGrid } from '@/components/CandidatesGrid';

export const metadata: Metadata = {
  title: 'Kandidáti',
  description:
    'Dvanáct tváří hnutí Pro Týnec Srdcem. Poznáváme je — lidé z obce, kteří chtějí rozvíjet Velký Týnec, Vsisko a Čechovice.',
};

export default function KandidatiPage() {
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
            Kandidátní listina
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-tynec-black/80 md:text-xl">
            Naši kandidáti jsou lidé, kteří mají Velký Týnec v srdci a chtějí se aktivně podílet
            na rozvoji obce a zlepšení života všech občanů.
          </p>
        </header>
      </div>

      {/* Mřížka kandidátů */}
      <CandidatesGrid showTitle={false} />
    </div>
  );
}
