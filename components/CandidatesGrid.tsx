import React from 'react';
import { CandidateCard } from './CandidateCard';
import { getCandidatesForGrid, isCandidateRevealed } from '@/lib/candidates';

interface CandidatesGridProps {
  limit?: number;
  showTitle?: boolean;
}

export const CandidatesGrid: React.FC<CandidatesGridProps> = ({
  limit,
  showTitle = true,
}) => {
  const sorted = getCandidatesForGrid();
  const displayed = limit ? sorted.slice(0, limit) : sorted;

  const sectionPad = showTitle
    ? 'section-padding'
    : 'px-4 pb-20 pt-8 sm:px-6 md:px-8 lg:px-8 lg:pb-[120px] lg:pt-10';

  return (
    <section
      className={`${sectionPad} border-t border-slate-200/60 bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-white`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <header className="reveal mb-12 md:mb-16">
            <p className="type-eyebrow">Volby 2026</p>
            <h2 className="type-h2 mt-4">Náš tým</h2>
            <p className="mt-6 max-w-4xl text-pretty text-tynec-black/80">
              Jedenáct lidí, jedna vize — postupně představujeme každého člena týmu.
            </p>
          </header>
        )}

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-7 sm:gap-8 xl:gap-9">
          {displayed.map((candidate) => (
            <CandidateCard
              key={candidate.slug}
              slug={candidate.slug}
              name={candidate.name}
              heartPriority={candidate.heartPriority}
              photo={candidate.photo}
              portraitWebpTune={candidate.portraitWebpTune}
              portraitObjectPosition={candidate.portraitObjectPosition}
              revealed={isCandidateRevealed(candidate)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
