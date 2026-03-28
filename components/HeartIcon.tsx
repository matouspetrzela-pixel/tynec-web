import React from 'react';

type HeartIconProps = {
  className?: string;
};

const PATH_HEART =
  'M 60 165 C 25 125 25 45 80 45 C 105 45 115 70 115 70 C 115 70 130 45 160 45 C 195 45 195 115 130 165 L 45 190';

/** Standardní srdce — navigace, karty. */
export const HeartIcon: React.FC<HeartIconProps> = ({ className = 'h-10 w-10' }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    preserveAspectRatio="xMidYMid meet"
    className={className}
    aria-hidden
  >
    <path
      d={PATH_HEART}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Hero — silnější tah, výraznější červeň; ručnější křivka (mírný posun kontrolních bodů).
 */
export const HeroHeartBold: React.FC<HeartIconProps> = ({ className = 'h-48 w-48' }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    width={192}
    height={192}
    preserveAspectRatio="xMidYMid meet"
    className={className}
    aria-hidden
  >
    <path
      d="M 58 168 C 20 128 22 42 82 42 C 108 42 118 72 118 72 C 118 72 132 44 162 46 C 198 48 198 118 128 168 L 42 192"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);
