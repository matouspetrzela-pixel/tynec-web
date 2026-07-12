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

const SECONDARY_NAV = [
  { label: 'Kandidáti', href: '/kandidati', link_path: '/kandidati' },
  { label: 'Aktuality', href: '/aktuality', link_path: '/aktuality' },
] as const;

export const HeroLead: React.FC = () => {
  return (
    <div className="relative min-w-0 overflow-hidden">
      <div className="hero-lead">
        <div className="hero-lead-intro">
          <p className="hero-lead-eyebrow">Změna začíná vaším hlasem</p>
          <p className="hero-lead-badge">
            VOLBY DO ZASTUPITELSTVA OBCE 9.–10. ŘÍJNA 2026
          </p>
        </div>

        <div className="hero-lead-brand">
          <div className="hero-lead-logo">
            <CampaignLogo
              variant="hero"
              priority
              className="hero-lead-logo-fx"
            />
          </div>
          <TrackedFacebookOutbound
            href={FACEBOOK_URL}
            placement="hero_facebook_strip"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-lead-facebook"
          >
            <span className="flex min-w-0 items-center gap-2">
              <FacebookBrandIcon
                className="hero-lead-facebook-icon shrink-0"
                aria-hidden
              />
              <span className="min-w-0 truncate">Sledujte nás na Facebooku</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
          </TrackedFacebookOutbound>
        </div>

        <nav className="hero-lead-nav" aria-label="Rychlá navigace">
          <TrackedHeroNavLink
            href="/program"
            link_path="/program"
            className="hero-lead-btn hero-lead-btn--primary btn-primary-sheen"
          >
            Náš program
          </TrackedHeroNavLink>
          <div className="hero-lead-nav-grid">
            {SECONDARY_NAV.map((item) => (
              <TrackedHeroNavLink
                key={item.href}
                href={item.href}
                link_path={item.link_path}
                className="hero-lead-btn hero-lead-btn--ghost"
              >
                {item.label}
              </TrackedHeroNavLink>
            ))}
            <TrackedPodporteLink
              placement="hero_quick_nav_podporte"
              className="hero-lead-btn hero-lead-btn--ghost col-span-2 sm:col-span-1"
            >
              Podpořte nás
            </TrackedPodporteLink>
          </div>
        </nav>
      </div>
    </div>
  );
};
