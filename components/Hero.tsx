import React from 'react';
import { HeroInfoPanel } from '@/components/hero/HeroInfoPanel';
import { HeroLead } from '@/components/hero/HeroLead';

const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" aria-label="Úvod">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <picture>
          <source
            type="image/webp"
            srcSet="/images/hero-velky-tynec-dji-0224-v2026-1600.webp 1600w, /images/hero-velky-tynec-dji-0224-v2026-2560.webp 2560w"
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet="/images/hero-velky-tynec-dji-0224-v2026-1600.jpg 1600w, /images/hero-velky-tynec-dji-0224-v2026-2560.jpg 2560w"
            sizes="100vw"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-velky-tynec-dji-0224-v2026-1600.jpg"
            alt=""
            width={2560}
            height={1440}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[52%_48%] brightness-[1.122] contrast-[1.03] saturate-[1.04] sm:object-[50%_50%] lg:object-[50%_48%]"
          />
        </picture>
        {/* Cílené prosvětlení oblohy a krajiny; střed dole = maska vypne zesvětlení (kostel) */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(198deg, rgba(255,252,250,0.29) 0%, rgba(255,255,255,0.1) 38%, rgba(255,255,255,0) 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 58% 50% at 50% 76%, #000 0%, #000 30%, #fff 100%)',
            WebkitMaskSize: '100% 100%',
            maskImage:
              'radial-gradient(ellipse 58% 50% at 50% 76%, #000 0%, #000 30%, #fff 100%)',
            maskSize: '100% 100%',
          }}
        />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-85"
          style={{
            background: 'linear-gradient(115deg, transparent 0%, rgba(220,234,255,0.14) 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 58% 50% at 50% 76%, #000 0%, #000 28%, #fff 100%)',
            WebkitMaskSize: '100% 100%',
            maskImage:
              'radial-gradient(ellipse 58% 50% at 50% 76%, #000 0%, #000 28%, #fff 100%)',
            maskSize: '100% 100%',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(12,14,18,0.7)_0%,rgba(14,17,22,0.5)_32%,rgba(16,21,30,0.1)_55%,rgba(16,21,30,0)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,11,18,0.16)_0%,rgba(8,11,18,0.06)_16%,rgba(8,11,18,0)_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_26%,rgba(138,178,255,0.06)_0%,rgba(138,178,255,0)_50%),radial-gradient(circle_at_84%_18%,rgba(120,200,255,0.09)_0%,rgba(120,200,255,0)_50%)]" />
      </div>

      {/* Desktop: čistý dvousloupcový layout bez překryvu */}
      <div className="relative z-10 mx-auto flex min-h-[min(100dvh,940px)] w-full max-w-[1920px] flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:min-h-[calc(100dvh-5rem)] md:justify-center md:pb-24 md:pt-16 lg:grid lg:grid-cols-[minmax(0,640px)_minmax(0,560px)] lg:items-start lg:justify-start lg:gap-10 lg:px-10 lg:pb-20 lg:pt-20 xl:gap-12 xl:px-14">
        <div className="mx-auto w-full max-w-md sm:max-w-xl lg:mx-0 lg:max-w-[640px]">
          <HeroInfoPanel className="w-full max-w-xl lg:max-w-2xl">
            <HeroLead />
          </HeroInfoPanel>
        </div>

        {!launched ? (
          <div className="mt-8 w-full lg:mt-0">
            <div className="mx-auto inline-flex w-auto max-w-none flex-col rounded-3xl border border-white/35 bg-[linear-gradient(135deg,rgba(18,30,46,0.48),rgba(45,63,82,0.34))] px-6 py-5 text-white shadow-[0_18px_56px_rgba(0,0,0,0.34)] backdrop-blur-lg lg:mx-0 lg:self-start">
              <p className="text-lg font-semibold leading-tight text-white/90">
                Brzy odhalíme
              </p>
              <p className="mt-2 text-[clamp(2rem,2.6vw,2.45rem)] font-extrabold leading-[1.08] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.35)] lg:whitespace-nowrap">
                Chystáme změnu pro Velký Týnec
              </p>
            </div>
          </div>
        ) : (
          <div className="hidden min-h-0 flex-1 lg:block" aria-hidden />
        )}
      </div>
    </section>
  );
};
