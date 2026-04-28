import React from 'react';

/** Jediné brand logo srdce (PNG, průhledné pozadí). */
export const BRAND_HEART_LOGO_SRC = '/images/logo-srdce.png';

const LOGO_WIDTH = 445;
const LOGO_HEIGHT = 377;

export type BrandHeartLogoProps = {
  /** Velikost „krabice“ kolem loga (Tailwind); poměr stran loga se nemění — pouze měřítko. */
  className?: string;
};

/**
 * Logo srdce z /public — škálování jen změnou className (např. h-10 w-10),
 * bez deformace grafiky (object-contain).
 */
export const BrandHeartLogo: React.FC<BrandHeartLogoProps> = ({
  className = 'h-10 w-10',
}) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center ${className}`}
    aria-hidden
  >
    {/* eslint-disable-next-line @next/next/no-img-element -- statický brand asset v /public */}
    <img
      src={BRAND_HEART_LOGO_SRC}
      alt=""
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className="max-h-full max-w-full object-contain object-center"
      decoding="async"
    />
  </span>
);

export const HeartIcon: React.FC<BrandHeartLogoProps> = (props) => (
  <BrandHeartLogo {...props} />
);

export const HeroHeartBold: React.FC<BrandHeartLogoProps> = ({
  className = 'h-48 w-48',
}) => <BrandHeartLogo className={className} />;
