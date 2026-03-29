import React from 'react';
import Link from 'next/link';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { FACEBOOK_URL } from '@/lib/social';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" aria-label="Úvod">
      {/* Fotka obce — plná viditelnost bez tmavého překrytí */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/9000.jpg"
          alt="Velký Týnec"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_45%] brightness-[1.1] contrast-[1.04] sm:object-[center_42%_40%] md:object-[62%_38%]"
        />
      </div>

      {/* Layout */}
      <div className="relative z-10 mx-auto flex min-h-[min(100dvh,920px)] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 md:min-h-[calc(100dvh-5rem)] md:justify-center md:pb-20 md:pt-12 lg:pb-24">

        {/* Glass panel — text čitelný, foto prosvítá skrz */}
        <div
          className="w-full max-w-[460px] rounded-3xl px-7 py-8 sm:px-9 sm:py-10"
          style={{
            background: 'rgba(10, 10, 10, 0.48)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)',
          }}
        >
          {/* Červená dekorativní linka */}
          <div className="mb-6 h-[3px] w-10 bg-primary" aria-hidden />

          <h1
            className="font-sans leading-[1.07] tracking-[-0.03em] text-white"
            style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
          >
            <span className="block">Pro Týnec</span>
            <span className="mt-1 block sm:mt-2">Srdcem</span>
          </h1>

          <p
            className="mt-5 font-medium leading-snug text-white/85"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            Rozum do rozvoje, srdce do komunity.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <Link
              href="/program"
              className="inline-flex min-h-[50px] items-center text-[0.9rem] font-bold uppercase tracking-[0.12em] text-white underline decoration-primary decoration-2 underline-offset-[10px] transition-opacity hover:opacity-75"
            >
              Náš program 2026
            </Link>
            <Link
              href="/o-nas"
              className="inline-flex min-h-[50px] items-center text-[0.9rem] font-bold uppercase tracking-[0.12em] text-white/70 underline decoration-white/30 decoration-2 underline-offset-[10px] transition-colors hover:text-white"
            >
              Poznejte nás
            </Link>
          </div>

          {/* Datum voleb */}
          <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/55">
            Volby 9.–10. října 2026
          </p>

          {/* Facebook */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 text-[0.9rem] font-medium leading-snug text-white/70 transition-colors hover:text-white"
          >
            <FacebookBrandIcon className="h-8 w-8 shrink-0" />
            <span className="min-w-0 underline decoration-white/20 underline-offset-4">
              Pojďme do toho společně.
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
