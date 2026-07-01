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
        <header className="mb-6 max-w-6xl md:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Volby 2026
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Naši kandidáti
          </h1>
          <p className="mt-6 w-full text-pretty text-base leading-relaxed text-tynec-black/85 md:mt-8 md:text-lg md:leading-[1.65]">
            Naši kandidáti jsou sousedé, rodiče, prarodiče i mladé rodiny z Velkého Týnce, Vsiska
            a Čechovic, na které se můžete spolehnout. Chtějí obec rozvíjet a zlepšovat každodenní život všech občanů. Kandidáty
            představujeme postupně: na přehledu má každý své pevné místo podle abecedy příjmení,
            jednotlivé profily odhalujeme v několika vlnách.
          </p>
        </header>
      </div>

      {/* Mřížka kandidátů */}
      <CandidatesGrid showTitle={false} />
    </div>
  );
}
