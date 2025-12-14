import React from 'react';
import { CandidateCard } from './CandidateCard';

interface Candidate {
  id: number;
  name?: string;
  role?: string;
  age?: string;
  photo?: string;
}

interface CandidatesGridProps {
  limit?: number;
  showTitle?: boolean;
}

export const CandidatesGrid: React.FC<CandidatesGridProps> = ({
  limit,
  showTitle = true
}) => {
  // Placeholder data for 12 candidates
  const candidates: Candidate[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Kandidát ${i + 1}`,
    role: 'Profese',
    age: `${35 + i} let`,
  }));

  const displayedCandidates = limit ? candidates.slice(0, limit) : candidates;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-tynec-black uppercase">
              Naši kandidáti
            </h2>
          </div>
        )}

        {/* Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              name={candidate.name}
              role={candidate.role}
              age={candidate.age}
              photo={candidate.photo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
