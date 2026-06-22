import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Informační box — jemné sklo (slabší blur), styl v `.hero-info-panel` v globals.css.
 */
export const HeroInfoPanel: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div
      className={[
        'hero-info-panel',
        'ring-1 ring-inset ring-white/30',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};
