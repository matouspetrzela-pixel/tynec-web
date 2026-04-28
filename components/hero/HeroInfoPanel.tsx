import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Informační box — elegantní "frosted glass" panel pro dominantní hero obsah.
 */
export const HeroInfoPanel: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div
      className={[
        'rounded-[26px] border border-white/35',
        'shadow-[0_4px_24px_rgba(0,0,0,0.08),0_24px_64px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_0_0_1px_rgba(255,255,255,0.12)]',
        'ring-1 ring-inset ring-white/20',
        'bg-[linear-gradient(165deg,rgba(252,252,255,0.32)_0%,rgba(232,240,255,0.14)_40%,rgba(14,20,32,0.45)_100%)]',
        'backdrop-blur-[15px] sm:backdrop-blur-[16px] supports-[backdrop-filter]:bg-[linear-gradient(165deg,rgba(252,252,255,0.22)_0%,rgba(232,240,255,0.1)_40%,rgba(14,20,32,0.38)_100%)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};
