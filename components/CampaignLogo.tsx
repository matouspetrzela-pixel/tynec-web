import Image from 'next/image';
import React from 'react';

/**
 * Průhledné logo (PNG). Kanonický soubor v repu: `Zdojové kody Volby 2026/logo/logo-pruhledne.png`.
 * Veřejné kopie pro Next:
 * - barevné: `public/images/volby2026-logo-transparent.png`
 * - bílé (jen hero tmavý box): `public/images/volby2026-logo-transparent-white.png`
 */
export const CAMPAIGN_LOGO_PATH = '/images/volby2026-logo-transparent.png';
export const CAMPAIGN_LOGO_HERO_PATH = '/images/volby2026-logo-transparent-white.png';

const INTRINSIC_W = 879;
const INTRINSIC_H = 495;

type Props = {
  className?: string;
  priority?: boolean;
  /** Drobná značka u textu (stejný soubor, zmenšený). */
  variant?: 'header' | 'footer' | 'inline' | 'hero';
};

export const CampaignLogo: React.FC<Props> = ({
  className,
  priority,
  variant = 'header',
}) => {
  if (variant === 'inline') {
    const ih = Math.round((120 * INTRINSIC_H) / INTRINSIC_W);
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={CAMPAIGN_LOGO_PATH}
        alt=""
        width={120}
        height={ih}
        decoding="async"
        className={className}
      />
    );
  }

  const alt =
    variant === 'hero' ? 'Pro Týnec srdcem' : 'Pro Týnec srdcem — logo kampaně';

  const sizes =
    variant === 'footer'
      ? '(max-width: 768px) 200px, 240px'
      : variant === 'hero'
        ? '(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1080px'
        : '(max-width: 768px) 160px, 200px';
  const src = variant === 'hero' ? CAMPAIGN_LOGO_HERO_PATH : CAMPAIGN_LOGO_PATH;

  return (
    <Image
      src={src}
      alt={alt}
      width={INTRINSIC_W}
      height={INTRINSIC_H}
      priority={priority}
      className={className}
      sizes={sizes}
    />
  );
};
