'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  TrackedFacebookOutbound,
  TrackedHeroNavLink,
  TrackedPodporteLink,
} from '@/components/CampaignMeasuredLinks';
import { CampaignLogo } from '@/components/CampaignLogo';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { FACEBOOK_URL } from '@/lib/social';

/** Jemný obrys/stín loga — čitelnější bílé logo na tmavém podkladu. */
const logoContrastClass =
  'drop-shadow-[0_0_1px_rgba(255,255,255,0.55)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]';

const heroQuickNavGhost =
  'inline-flex min-h-[3.3rem] w-full items-center justify-center gap-1 rounded-xl border border-white/60 bg-white/[0.18] px-2.5 py-3 text-center text-[clamp(0.8125rem,1.75vw,0.9375rem)] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] ring-1 ring-inset ring-white/18 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/75 hover:bg-white/[0.26] hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white xl:min-h-[2.85rem] xl:py-2 min-[1920px]:min-h-[3.3rem] min-[1920px]:py-3';

const heroQuickNavPrimary =
  'btn-primary-sheen inline-flex min-h-[3.9rem] w-full items-center justify-center rounded-xl px-4 py-4 text-center text-[clamp(0.875rem,1.9vw,1rem)] font-bold uppercase tracking-[0.1em] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white xl:min-h-[3.1rem] xl:py-2.5 min-[1920px]:min-h-[3.9rem] min-[1920px]:py-4';

const heroStageEyebrow =
  'inline-flex w-fit max-w-full items-center rounded-xl border border-white/45 bg-white/[0.18] px-[clamp(0.9rem,2.25vw,1.25rem)] py-[clamp(0.55rem,1.35vw,0.75rem)] text-[clamp(0.9375rem,2.15vw,1.0625rem)] font-bold leading-snug tracking-[0.01em] text-white shadow-[0_3px_14px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/18 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]';

const heroFacebookStrip =
  'grid min-h-[3.25rem] w-full grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/40 bg-white/[0.1] px-[clamp(0.875rem,2vw,1rem)] py-3 text-[clamp(0.8125rem,1.8vw,1rem)] font-semibold leading-snug text-white/95 ring-1 ring-inset ring-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] hover:bg-white/[0.18] hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white xl:min-h-[2.85rem] xl:py-2 min-[1920px]:min-h-[3.25rem] min-[1920px]:py-3';

const SECONDARY_NAV = [
  { label: 'Kandidáti', href: '/kandidati', link_path: '/kandidati' },
  { label: 'Aktuality', href: '/aktuality', link_path: '/aktuality' },
] as const;

export const HeroLead: React.FC = () => {
  return (
    <div className="relative min-w-0 overflow-hidden">
      <div className="relative z-[1] flex min-w-0 flex-col gap-[clamp(0.7rem,2.8vw,1.25rem)] px-[clamp(0.875rem,3.5vw,2rem)] py-[clamp(1.1rem,3vw,2rem)] text-left text-white sm:gap-[clamp(0.876rem,2.16vw,2.01rem)] sm:px-[clamp(1.07rem,4.12vw,3.61rem)] sm:py-[clamp(1.35rem,3.8vw,4.5rem)] md:px-[clamp(1.39rem,3.71vw,2.99rem)] xl:gap-2 xl:px-[clamp(1.1rem,2.2vw,1.75rem)] xl:py-3 xl:pb-4 min-[1920px]:gap-[clamp(0.876rem,2.16vw,2.01rem)] min-[1920px]:px-[clamp(1.75rem,4.02vw,3.61rem)] min-[1920px]:pt-[clamp(2.52rem,5.77vw,4.79rem)] min-[1920px]:pb-[clamp(2.21rem,5.15vw,4.33rem)]">
        <div className="flex flex-col gap-2 xl:gap-1.5 min-[1920px]:gap-2">
          <p className={heroStageEyebrow}>Změna začíná vaším hlasem</p>
          <p className="inline-flex min-h-[2.75rem] w-full max-w-full items-center rounded-xl border border-white/20 px-[clamp(0.875rem,2.4vw,1.2rem)] py-2.5 text-[clamp(0.625rem,2.8vw,0.8125rem)] font-bold uppercase leading-snug tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)] sm:min-h-[3rem] sm:w-fit sm:tracking-[0.14em] [background:linear-gradient(180deg,rgba(225,46,53,0.95)_0%,rgba(176,18,24,0.98)_100%)]">
            VOLBY DO ZASTUPITELSTVA OBCE 9.–10. ŘÍJNA 2026
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 xl:gap-2 min-[1920px]:gap-3">
          <CampaignLogo
            variant="hero"
            priority
            className={`block h-auto w-full min-w-0 max-w-[min(100%,clamp(13.9rem,67vw,38rem))] object-contain sm:max-w-[min(100%,clamp(16.7rem,46vw,38rem))] xl:max-w-[min(100%,19rem)] min-[1920px]:max-w-[min(100%,clamp(16.7rem,46vw,38rem))] ${logoContrastClass}`}
          />
          <TrackedFacebookOutbound
            href={FACEBOOK_URL}
            placement="hero_facebook_strip"
            target="_blank"
            rel="noopener noreferrer"
            className={heroFacebookStrip}
          >
            <span className="flex min-w-0 items-center gap-2">
              <FacebookBrandIcon className="h-6 w-6 shrink-0" aria-hidden />
              <span className="min-w-0 truncate">Sledujte nás na Facebooku</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
          </TrackedFacebookOutbound>
        </div>

        <nav className="flex w-full flex-col gap-2.5 xl:gap-2 min-[1920px]:gap-2.5" aria-label="Rychlá navigace">
          <TrackedHeroNavLink
            href="/program"
            link_path="/program"
            className={heroQuickNavPrimary}
          >
            Náš program
          </TrackedHeroNavLink>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
            {SECONDARY_NAV.map((item) => (
              <TrackedHeroNavLink
                key={item.href}
                href={item.href}
                link_path={item.link_path}
                className={heroQuickNavGhost}
              >
                {item.label}
              </TrackedHeroNavLink>
            ))}
            <TrackedPodporteLink
              placement="hero_quick_nav_podporte"
              className={`${heroQuickNavGhost} col-span-2 sm:col-span-1`}
            >
              Podpořte nás
            </TrackedPodporteLink>
          </div>
        </nav>
      </div>
    </div>
  );
};
