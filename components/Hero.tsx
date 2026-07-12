import React from 'react';
import { HeroInfoPanel } from '@/components/hero/HeroInfoPanel';
import { HeroLead } from '@/components/hero/HeroLead';

const HERO_BASE = 'hero-velky-tynec-dji-0702-v2026';
/** Bump po přegenerování hero fotek — obchází cache prohlížeče */
const HERO_ASSET_VER = '2';

/** Panel — mobil: centrovaný; desktop: dole vlevo */
const heroPanelWrap =
  'mx-auto min-w-0 w-full max-w-[min(100%,22.75rem)] sm:max-w-md md:max-w-xl lg:mx-0 lg:max-w-[min(51.5rem,calc(100%-3.5rem))] lg:-ml-14 lg:-translate-y-2 xl:-ml-24 xl:-translate-y-3 2xl:-ml-32 2xl:-translate-y-4';

export const Hero: React.FC = () => {
  return (
    <section
      className="hero-viewport-fill relative isolate w-full overflow-x-clip overflow-y-hidden sm:overflow-x-visible"
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
            className="absolute inset-0 h-full w-full object-cover object-[50%_38%] sm:object-[52%_36%] md:object-[56%_34%] lg:object-[62%_34%]"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(15,23,42,0.36)_0%,rgba(15,23,42,0.14)_38%,transparent_55%)] sm:bg-[linear-gradient(102deg,rgba(15,23,42,0.32)_0%,rgba(15,23,42,0.12)_36%,transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.14)_0%,transparent_48%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,23,42,0.14)_0%,transparent_42%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1920px] flex-col items-center justify-start px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-5 lg:flex lg:min-h-[inherit] lg:items-start lg:justify-end lg:pl-0 lg:pr-6 lg:pb-12 lg:pt-[clamp(1.5rem,4vh,6rem)] xl:pr-10">
        <div className={heroPanelWrap}>
          <HeroInfoPanel className="hero-info-panel-stage w-full max-w-full">
            <HeroLead />
          </HeroInfoPanel>
        </div>
      </div>
    </section>
  );
};
