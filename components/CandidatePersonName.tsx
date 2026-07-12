import React from 'react';

export interface CandidatePersonNameProps {
  givenName: string;
  familyName: string;
  /** Profil: větší nadpis; karta: kompaktní */
  variant?: 'profile' | 'card';
  className?: string;
}

const variantClass = {
  profile: 'type-h1 leading-tight',
  card: 'text-[0.875rem] font-bold leading-snug tracking-tight sm:text-[0.9325rem] md:text-[0.9625rem] lg:text-[1rem] xl:text-[1.07rem]',
};

/**
 * Jméno + příjmení vždy pohromadě — bez zalomení uprostřed.
 */
export function CandidatePersonName({
  givenName,
  familyName,
  variant = 'profile',
  className = '',
}: CandidatePersonNameProps) {
  return (
    <span className={[variantClass[variant], className].filter(Boolean).join(' ')}>
      <span className="whitespace-nowrap">{givenName}</span>{' '}
      <span className="whitespace-nowrap">{familyName}</span>
    </span>
  );
}

export interface CandidateProfileHeadingProps {
  titles?: string;
  givenName: string;
  familyName: string;
}

/** Nadpis profilu — tituly šedě nad jménem. */
export function CandidateProfileHeading({
  titles,
  givenName,
  familyName,
}: CandidateProfileHeadingProps) {
  return (
    <header>
      {titles ? (
        <p className="text-base font-medium leading-snug text-tynec-gray md:text-lg">
          {titles}
        </p>
      ) : null}
      <h1 className={titles ? 'mt-1' : 'mt-3'}>
        <CandidatePersonName givenName={givenName} familyName={familyName} variant="profile" />
      </h1>
    </header>
  );
}
