import React from 'react';
import { CandidateCard } from './CandidateCard';

interface Candidate {
  id: number;
  name: string;
  heartPriority: string;
  photo?: string;
}

interface CandidatesGridProps {
  limit?: number;
  showTitle?: boolean;
}

const DEFAULT_CANDIDATES: Candidate[] = [
  { id: 1, name: 'Kandidát 1', heartPriority: 'Transparentní hospodaření a otevřená radnice' },
  { id: 2, name: 'Kandidát 2', heartPriority: 'Bezpečné chodníky a opravené komunikace' },
  { id: 3, name: 'Kandidát 3', heartPriority: 'Podpora škol, školek a volnočasových aktivit' },
  { id: 4, name: 'Kandidát 4', heartPriority: 'Kultura, tradice a spolkový život' },
  { id: 5, name: 'Kandidát 5', heartPriority: 'Zeleň, veřejná prostranství a estetika obce' },
  { id: 6, name: 'Kandidát 6', heartPriority: 'Digitální služby a srozumitelná komunikace' },
  { id: 7, name: 'Kandidát 7', heartPriority: 'Senioři, dostupnost péče a komunitní projekty' },
  { id: 8, name: 'Kandidát 8', heartPriority: 'Sportoviště a zdravý životní styl' },
  { id: 9, name: 'Kandidát 9', heartPriority: 'Podpora podnikání a lokální ekonomiky' },
  { id: 10, name: 'Kandidát 10', heartPriority: 'Udržitelná energetika a úspory obce' },
  { id: 11, name: 'Kandidát 11', heartPriority: 'Sousedská soudržnost a participace občanů' },
  { id: 12, name: 'Kandidát 12', heartPriority: 'Dlouhodobá vize rozvoje do roku 2030' },
];

export const CandidatesGrid: React.FC<CandidatesGridProps> = ({
  limit,
  showTitle = true,
}) => {
  const displayedCandidates = limit
    ? DEFAULT_CANDIDATES.slice(0, limit)
    : DEFAULT_CANDIDATES;

  return (
    <section className="border-t border-gray-100 bg-[#F9FAFB] section-padding">
      <div className="container mx-auto max-w-6xl">
        {showTitle && (
          <header className="mb-12 max-w-2xl md:mb-16">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
              Volby 2026
            </p>
            <h2 className="animate-fade-up-delay mt-4 text-h2-mobile font-bold uppercase tracking-tight text-tynec-black md:text-h2-desktop">
              Náš tým
            </h2>
            <p className="animate-fade-up-delay-2 mt-6 text-tynec-black/80">
              Dvanáct lidí, jedna vize — u každého je srdcová priorita, se kterou jdeme k voličům.
            </p>
          </header>
        )}

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4">
          {displayedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
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
