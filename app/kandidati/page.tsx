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
        <header className="mb-16 max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Volby 2026
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Kandidátní listina
          </h1>
          {/* Dva bloky: stejná typografie, na lg+ symetrický dělící prvek uprostřed */}
          <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-stretch lg:gap-0">
            <p className="flex-1 text-pretty border-b border-slate-200/90 pb-8 text-base leading-[1.7] text-tynec-black/85 md:text-lg lg:border-b-0 lg:pb-0 lg:pr-10 xl:pr-14">
              Naši kandidáti jsou sousedé, rodiče, prarodiče i mladé rodiny z Velkého Týnce, Vsiska
              a Čechovic — chtějí obec rozvíjet a zlepšovat každodenní život všech občanů.
            </p>
            <div
              className="hidden shrink-0 self-stretch bg-primary/15 lg:block lg:w-px"
              aria-hidden
            />
            <p className="flex-1 text-pretty text-base leading-[1.7] text-tynec-black/75 md:text-lg lg:pl-10 xl:pl-14">
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
