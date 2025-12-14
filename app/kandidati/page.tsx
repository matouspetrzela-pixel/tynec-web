import React from 'react';
import { CandidatesGrid } from '@/components/CandidatesGrid';

export default function KandidatiPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-h1-mobile md:text-h1-desktop font-bold uppercase mb-6">
            <span className="text-tynec-black">Kandidátní </span>
            <span className="text-tynec-red">listina</span>
          </h1>
          <div className="w-24 h-1 bg-tynec-red mx-auto mb-8"></div>
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
