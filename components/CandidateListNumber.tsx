import React from 'react';

type CandidateListNumberProps = {
  number: number;
  /** card = mřížka; detail = profil */
  variant?: 'card' | 'detail';
  className?: string;
};

/**
 * Studio mark — editoriální pořadí v levém horním rohu portrétu
 * (světle šedé číslo + tenká brandová čárka, bez chipu / stickeru).
 */
export function CandidateListNumber({
  number,
  variant = 'card',
  className = '',
}: CandidateListNumberProps) {
  const isDetail = variant === 'detail';

  return (
    <span
      className={`pointer-events-none absolute z-10 flex items-center gap-1.5 ${
        isDetail ? 'left-3.5 top-3.5' : 'left-2.5 top-2.5'
      } ${className}`.trim()}
      aria-hidden
    >
      <span
        className={`shrink-0 rounded-full bg-primary ${
          isDetail ? 'h-3 w-0.5' : 'h-2.5 w-0.5'
        }`}
      />
      <span
        className={`font-semibold tabular-nums leading-none tracking-tight text-[#ECECEC] drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)] ${
          isDetail ? 'text-[1.25rem] sm:text-[1.375rem]' : 'text-[1rem] sm:text-[1.0625rem]'
        }`}
      >
        {number}
      </span>
    </span>
  );
}
