import React from 'react';
import Link from 'next/link';
import { CandidatePortrait } from '@/components/CandidatePortrait';

export interface CandidateCardProps {
  slug: string;
  name?: string;
  heartPriority?: string;
  photo?: string;
  portraitWebpTune?: string;
  portraitObjectPosition?: string;
  revealed?: boolean;
}

const cardShellClass =
  'card-elevated flex h-full min-w-0 w-full max-w-[17.5rem] flex-col px-5 py-5 sm:max-w-[18.5rem] sm:px-6 sm:py-6 xl:max-w-[19.25rem]';

const cardRevealedClass = `${cardShellClass} card-candidate`;

/** Pevná výška bloku jména — v řadě mřížky vždy stejná osa (1–2 řádky titulů). */
const nameBlockClass =
  'flex h-[3.25rem] shrink-0 items-start justify-center text-balance px-0.5 text-center text-[0.875rem] font-bold leading-snug tracking-tight text-tynec-black sm:h-[3.5rem] sm:text-[0.9325rem] md:text-[0.9625rem] lg:text-[1rem] xl:h-[3.75rem] xl:text-[1.07rem]';

const profileLinkClass =
  'mt-2.5 flex min-h-[1.25rem] shrink-0 items-center justify-center text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary';

function CandidatePlaceholderCard() {
  return (
    <div
      className={`${cardShellClass} cursor-default select-none`}
      aria-label="Kandidát bude brzy představen"
    >
      <div
        className="mb-4 aspect-[4/5] w-full rounded-xl bg-white ring-1 ring-slate-200/80"
        aria-hidden
      />
      <div className="flex min-h-0 flex-1 flex-col">
        <div className={`${nameBlockClass} rounded bg-white`} aria-hidden />
        <div className={`${profileLinkClass} rounded bg-white`} aria-hidden />
      </div>
    </div>
  );
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  slug,
  name = 'Jméno Příjmení',
  photo,
  portraitWebpTune,
  portraitObjectPosition,
  revealed = false,
}) => {
  if (!revealed) {
    return <CandidatePlaceholderCard />;
  }

  return (
    <Link
      href={`/kandidati/${slug}`}
      className={`${cardRevealedClass} group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
      aria-label={`Profil kandidáta: ${name}`}
    >
      <CandidatePortrait
        photo={photo}
        name={name ?? ''}
        variant="card"
        portraitWebpTune={portraitWebpTune}
        portraitObjectPosition={portraitObjectPosition}
        className="mb-4 shrink-0 transition-[box-shadow,transform] duration-300 group-hover:shadow-md group-hover:ring-slate-300/90"
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <h3
          className={`${nameBlockClass} transition-colors group-hover:text-primary`}
        >
          {name}
        </h3>

        <span
          className={`${profileLinkClass} transition-colors group-hover:text-primary-hover`}
          aria-hidden
        >
          Profil kandidáta →
        </span>
      </div>
    </Link>
  );
};
