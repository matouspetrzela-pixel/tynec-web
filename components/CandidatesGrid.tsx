import React from 'react';
import { CandidateCard } from './CandidateCard';
import { CANDIDATES } from '@/lib/candidates';

interface CandidatesGridProps {
  limit?: number;
  showTitle?: boolean;
}

export const CandidatesGrid: React.FC<CandidatesGridProps> = ({
  limit,
  showTitle = true,
}) => {
  const displayed = limit ? CANDIDATES.slice(0, limit) : CANDIDATES;

  return (
    <section className="border-t border-gray-100 bg-[#F9FAFB] section-padding">
      <div className="container mx-auto max-w-6xl">
        {showTitle && (
          <header className="reveal mb-12 max-w-2xl md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
              Volby 2026
            </p>
            <h2 className="mt-4 text-h2-mobile font-bold uppercase tracking-tight text-tynec-black md:text-h2-desktop">
              Náš tým
            </h2>
            <p className="mt-6 text-tynec-black/80">
              Dvanáct lidí, jedna vize — u každého je srdcová priorita, se kterou jdeme k voličům.
            </p>
          </header>
        )}

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4">
          {displayed.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              slug={candidate.slug}
              name={candidate.name}
              heartPriority={candidate.heartPriority}
              photo={candidate.photo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
