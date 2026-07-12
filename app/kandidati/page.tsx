import React from 'react';
import type { Metadata } from 'next';
import { CandidatesGrid } from '@/components/CandidatesGrid';
import { PageSectionHeader } from '@/components/PageSectionHeader';

export const metadata: Metadata = {
  title: 'Kandidáti',
  description:
    'Jedenáct tváří hnutí Pro Týnec srdcem. Poznáváme je — lidé z obce, kteří chtějí rozvíjet Velký Týnec, Vsisko a Čechovice.',
};

export default function KandidatiPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <PageSectionHeader
          className="mb-6 max-w-6xl md:mb-8"
          eyebrow="Volby 2026"
          title="Naši kandidáti"
          intro={
            <>
              Naši kandidáti jsou sousedé, rodiče, prarodiče i mladé rodiny z Velkého Týnce, Vsiska
              a Čechovic, na které se můžete spolehnout. Chtějí obec rozvíjet a zlepšovat každodenní život všech občanů. Kandidáty
              představujeme postupně: na přehledu má každý své pevné místo podle abecedy příjmení,
              jednotlivé profily odhalujeme v několika vlnách.
            </>
          }
          introClassName="w-full text-pretty md:mt-8 md:leading-[1.65] text-tynec-black/85"
        />
      </div>

      {/* Mřížka kandidátů */}
      <CandidatesGrid showTitle={false} />
    </div>
  );
}
