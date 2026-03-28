import React from 'react';
import { CandidatesGrid } from '@/components/CandidatesGrid';

export default function KandidatiPage() {
  return (
    <div className="pb-16 pt-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-6 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Kandidátní listina
          </h1>
          <div className="mx-auto mb-8 h-1 w-24 bg-gray-300"></div>
          <p className="text-lg md:text-xl text-tynec-gray max-w-3xl mx-auto">
            Naši kandidáti jsou lidé, kteří mají Velký Týnec v srdci a chtějí se aktivně podílet
            na rozvoji obce a zlepšení života všech občanů.
          </p>
        </div>
      </div>

      {/* Full Grid of 12 Candidates */}
      <CandidatesGrid showTitle={false} />
    </div>
  );
}
