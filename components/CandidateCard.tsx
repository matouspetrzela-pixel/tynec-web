import React from 'react';

export interface CandidateCardProps {
  name?: string;
  heartPriority?: string;
  photo?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  name = 'Jméno Příjmení',
  heartPriority = 'Priorita kandidáta',
  photo,
}) => {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-gray-200">
      <div className="mb-6 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-100">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-tynec-gray/70">
            Foto 2026
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-1 flex-col justify-end gap-3">
        <h3 className="text-lg font-bold text-tynec-black md:text-xl">{name}</h3>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-medium leading-snug text-tynec-gray">
            <span className="sr-only">Srdcová priorita: </span>
            {heartPriority}
          </p>
        </div>
      </div>
    </article>
  );
};
