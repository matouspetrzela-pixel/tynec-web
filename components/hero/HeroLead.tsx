import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import { CampaignLogo } from '@/components/CampaignLogo';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { FACEBOOK_URL } from '@/lib/social';

/** Jemný obrys/stín loga — čitelnější bílé logo na tmavém podkladu. */
const logoContrastClass =
  'drop-shadow-[0_0_1px_rgba(255,255,255,0.55)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]';

const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';

export const HeroLead: React.FC = () => {
  return (
    <div className="relative">
      <div className="relative z-[1] flex flex-col gap-7 px-5 py-8 text-left sm:px-7 sm:py-10 lg:px-9 lg:py-11">
        <p className="inline-flex min-h-[40px] w-fit items-center rounded-xl border border-white/20 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_2px_12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)] [background:linear-gradient(180deg,rgba(225,46,53,0.95)_0%,rgba(176,18,24,0.98)_100%)]">
          VOLBY DO ZASTUPITELSTVA OBCE 9.–10. ŘÍJNA 2026
        </p>

        <div className="flex w-full flex-col">
          <CampaignLogo
            variant="hero"
            priority
            className={`block h-auto w-full max-w-[min(100%,374px)] object-contain sm:max-w-[460px] lg:max-w-[572px] ${logoContrastClass}`}
          />
        </div>

        {launched ? (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/program"
              className="btn-primary-sheen inline-flex min-h-[56px] w-full items-center justify-center rounded-xl px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.1em] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Volební program 2026
            </Link>
            <Link
              href="/kandidati"
              className="inline-flex min-h-[56px] w-full items-center justify-center rounded-xl border border-white/50 bg-white/[0.08] px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.08em] text-white ring-1 ring-inset ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.16] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Naši kandidáti
            </Link>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              aria-disabled="true"
              className="inline-flex min-h-[56px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/[0.08] px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.1em] text-white/70 ring-1 ring-inset ring-white/10"
            >
              <Lock className="h-4 w-4" aria-hidden />
              Volební program 2026
            </div>
            <div
              aria-disabled="true"
              className="inline-flex min-h-[56px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/[0.08] px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.08em] text-white/70 ring-1 ring-inset ring-white/10"
            >
              <Lock className="h-4 w-4" aria-hidden />
              Naši kandidáti
            </div>
          </div>
        )}

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="grid min-h-[56px] w-full grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/40 bg-white/[0.1] px-4 py-3 text-sm font-semibold leading-snug text-white/95 ring-1 ring-inset ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.16] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
        >
          <span className="flex min-w-0 items-center gap-2">
            <FacebookBrandIcon className="h-6 w-6 shrink-0" aria-hidden />
            <span className="min-w-0 truncate">Sledujte naši vizi v přímém přenosu</span>
          </span>
          <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
        </a>
      </div>
    </div>
  );
};
