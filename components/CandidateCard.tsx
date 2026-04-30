import React from 'react';
import Link from 'next/link';

export interface CandidateCardProps {
  slug: string;
  name?: string;
  heartPriority?: string;
  photo?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  slug,
  name = 'Jméno Příjmení',
  heartPriority = 'Priorita kandidáta',
  photo,
}) => {
  return (
    <Link
      href={`/kandidati/${slug}`}
      className="card-elevated group flex h-full flex-col px-7 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-8 sm:py-8"
    >
      {/* Fotka */}
      <div className="mb-6 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200/80 transition-transform duration-300 group-hover:scale-[1.01]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-tynec-gray/70">
            Foto 2026
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-1 flex-col justify-end gap-3">
        {/* Jedna řádka na větších šířkách; centrované projednotící dlaždice */}
        <h3 className="flex min-h-[2.875rem] items-center justify-center text-center text-[0.9375rem] font-bold leading-snug tracking-tight text-tynec-black transition-colors group-hover:text-primary sm:text-[1rem] md:whitespace-nowrap md:text-[1.05rem] lg:text-lg xl:text-[1.2rem]">
          {name}
        </h3>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-medium leading-snug text-tynec-gray">
            <span className="sr-only">Srdcová priorita: </span>
            {heartPriority}
          </p>
        </div>

        <span className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Zobrazit profil →
        </span>
      </div>
    </Link>
  );
};
