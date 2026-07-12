import React from 'react';
import { HeroInfoPanel } from '@/components/hero/HeroInfoPanel';
import { HeroLead } from '@/components/hero/HeroLead';

const HERO_BASE = 'hero-velky-tynec-dji-0702-v2026';
/** Bump po přegenerování hero fotek — obchází cache prohlížeče */
const HERO_ASSET_VER = '2';

/** Fotka — mobil ukazuje věž pod boxem; desktop posune ostení vpravo */
const heroPhotoObject =
  'object-[50%_40%] sm:object-[52%_38%] md:object-[56%_34%] lg:object-[62%_34%]';

export const Hero: React.FC = () => {
  return (
    <section
      className="hero-viewport-fill relative isolate w-full overflow-x-clip overflow-y-hidden min-[1920px]:overflow-x-visible"
      aria-label="Úvod"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <picture className="absolute inset-0 block h-full w-full">
          <source
            type="image/webp"
            srcSet={`/images/${HERO_BASE}-1600.webp?v=${HERO_ASSET_VER} 1600w, /images/${HERO_BASE}-2560.webp?v=${HERO_ASSET_VER} 2560w`}
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet={`/images/${HERO_BASE}-1600.jpg?v=${HERO_ASSET_VER} 1600w, /images/${HERO_BASE}-2560.jpg?v=${HERO_ASSET_VER} 2560w`}
            sizes="100vw"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/${HERO_BASE}-1600.jpg?v=${HERO_ASSET_VER}`}
            alt=""
            width={2560}
            height={1440}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover ${heroPhotoObject}`}
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(15,23,42,0.36)_0%,rgba(15,23,42,0.14)_38%,transparent_55%)] sm:bg-[linear-gradient(102deg,rgba(15,23,42,0.32)_0%,rgba(15,23,42,0.12)_36%,transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.14)_0%,transparent_48%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,23,42,0.14)_0%,transparent_42%)]" />
      </div>

      <div className="hero-panel-shell">
        <div className="hero-panel-wrap">
          <HeroInfoPanel className="hero-info-panel-stage w-full max-w-full">
            <HeroLead />
          </HeroInfoPanel>
        </div>
      </div>
    </section>
  );
};
