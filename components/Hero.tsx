import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';

const FB_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://www.facebook.com/';

/** Bez panelu — čitelnost vs. prosvětlená fotka (další krok zesvětlení). */
const HERO_OVERLAY =
  'linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.30) 52%, rgba(0,0,0,0.08) 100%)';

/** Vinetace + spodní ztmavení — ještě lehčí, aby fotka více prosvítala. */
const HERO_ATMOSPHERE =
  'linear-gradient(to top, rgba(0,0,0,0.08) 0%, transparent 38%), radial-gradient(ellipse 95% 85% at 50% 42%, transparent 0%, rgba(0,0,0,0.06) 100%)';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-900">
      <div className="relative min-h-[min(100dvh,920px)] w-full md:min-h-[calc(100dvh-6rem)]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/*
            next/image: vyšší quality (JPEG), sizes=100vw = ostré na velkých displejích.
            Bez zvětšení přes 100 % — škálování nad 100 % rozmazává detaily.
          */}
          <Image
            src="/images/9000.jpg"
            alt="Velký Týnec"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[center_45%] brightness-[1.09] contrast-[1.03] sm:object-[center_42%_40%] md:object-[62%_38%]"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] min-h-full"
          style={{ background: HERO_ATMOSPHERE }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 z-[2] min-h-full"
          style={{ background: HERO_OVERLAY }}
          aria-hidden
        />

        <div className="relative z-[10] mx-auto flex min-h-[min(100dvh,920px)] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 md:min-h-[calc(100dvh-6rem)] md:justify-center md:pb-20 md:pt-12 lg:pb-24">
          <div className="mx-auto w-full max-w-2xl text-center md:mx-0 md:text-left">
            <h1 className="font-sans text-[2.7rem] font-black leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)] sm:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
              <span className="block">Srdcem</span>
              <span className="mt-2 block whitespace-nowrap sm:mt-3">Pro Velký Týnec</span>
            </h1>

            <p className="mt-8 text-[1.5rem] font-medium leading-snug text-white/95 drop-shadow-[0_1px_16px_rgba(0,0,0,0.45)] sm:text-[1.8rem]">
              Rozum do rozvoje, srdce do komunity.
            </p>

            <div className="mt-10 flex min-h-[58px] flex-col items-stretch gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-4">
              <Link
                href="/program"
                className="inline-flex min-h-[58px] items-center justify-center text-[1.05rem] font-bold uppercase tracking-[0.12em] text-white underline decoration-primary decoration-2 underline-offset-[12px] transition-colors hover:text-white/90 sm:justify-start"
              >
                Náš program 2026
              </Link>
              <Link
                href="/o-nas"
                className="inline-flex min-h-[58px] items-center justify-center text-[1.05rem] font-bold uppercase tracking-[0.12em] text-white/90 underline decoration-white/50 decoration-2 underline-offset-[12px] transition-colors hover:text-white sm:justify-start"
              >
                Poznejte nás
              </Link>
            </div>

            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-[58px] max-w-full items-center justify-center gap-3 text-left text-[1.2rem] font-medium leading-snug text-white/95 drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)] transition-colors hover:text-white md:justify-start"
            >
              <FacebookBrandIcon className="h-[2.4rem] w-[2.4rem] shrink-0" />
              <span className="min-w-0 underline decoration-white/35 underline-offset-4">
                Diskutujte s námi ve skupině Pro Velký Týnec
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
