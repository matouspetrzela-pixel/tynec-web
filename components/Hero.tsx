import React from 'react';
import { HeroInfoPanel } from '@/components/hero/HeroInfoPanel';
import { HeroLead } from '@/components/hero/HeroLead';

const HERO_BASE = 'hero-velky-tynec-dji-0702-v2026';
/** Bump po přegenerování hero fotek — obchází cache prohlížeče */
const HERO_ASSET_VER = '2';

/**
 * Responzivita podle GA (2026):
 * - mobil ~66 %: 360–402 px — centrovaný box
 * - tablet ~0,4 %: 768–1279 px — centrovaný
 * - notebook: 1280–1919 px — dole vlevo, bez negativního posunu
 * - desktop ~34 %: 1920 px+ — box vlevo dole s -ml
 */
const heroPanelWrap =
  'mx-auto min-w-0 w-full max-w-[min(100%,22.75rem)] max-md:translate-y-0 sm:max-w-md md:max-w-xl md:-translate-y-3 xl:mx-0 xl:max-w-[min(38rem,calc(100%-3rem))] xl:-translate-y-2 min-[1920px]:max-w-[min(51.5rem,calc(100%-3.5rem))] min-[1920px]:-ml-32 min-[1920px]:-translate-y-8';

const heroPanelShell =
  'relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center justify-start px-4 pt-1 pb-2 sm:px-5 sm:pt-1 sm:pb-4 md:min-h-[inherit] md:px-6 md:pt-2 md:pb-5 xl:min-h-[inherit] xl:items-start xl:justify-end xl:pl-6 xl:pr-6 xl:pb-4 xl:pt-2 min-[1920px]:pl-0 min-[1920px]:pr-6 min-[1920px]:pb-12 min-[1920px]:pt-[clamp(1.5rem,4vh,6rem)] 2xl:pr-10';

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

      <div className={heroPanelShell}>
        <div className={heroPanelWrap}>
          <HeroInfoPanel className="hero-info-panel-stage w-full max-w-full">
            <HeroLead />
          </HeroInfoPanel>
        </div>
      </div>
    </section>
  );
};
