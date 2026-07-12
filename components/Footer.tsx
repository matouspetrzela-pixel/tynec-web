'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import {
  TrackedEmailOutbound,
  TrackedFacebookOutbound,
} from '@/components/CampaignMeasuredLinks';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { CampaignLogo } from '@/components/CampaignLogo';
import { EMAIL, FACEBOOK_URL } from '@/lib/social';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-tynec-black to-[#0a0b0f] text-white">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:pt-12 lg:max-w-4xl lg:pt-14 lg:pb-[calc(3rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex flex-col">
          <CampaignLogo
            variant="footer"
            className="h-9 w-auto max-h-9 object-contain object-left md:h-11 md:max-h-11"
          />

          <p className="mt-4 text-sm font-medium italic leading-relaxed text-white/70">
            Rozum do rozvoje, srdce do komunity.
          </p>

          <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/45">
            Komunální volby 9.–10. října 2026
          </p>

          <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-[0.9375rem]">
            Naši volební kampaň vedeme jako sousedé. Obec chápeme jako místo, na kterém nám
            záleží — férově, s rozumným hospodařením a respektem k lidem a spolkům, kteří zde
            žijí a působí.
          </p>

          <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
            <TrackedFacebookOutbound
              href={FACEBOOK_URL}
              placement="footer_facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-white"
            >
              <FacebookBrandIcon className="h-5 w-5 shrink-0" />
              <span>Facebook</span>
            </TrackedFacebookOutbound>
            <TrackedEmailOutbound
              href={`mailto:${EMAIL}`}
              placement="footer_email"
              className="inline-flex min-h-11 items-center gap-2.5 break-all text-sm text-white/65 transition-colors hover:text-white sm:break-normal"
            >
              <Mail className="h-5 w-5 shrink-0" aria-hidden />
              {EMAIL}
            </TrackedEmailOutbound>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45 sm:mt-10 sm:pt-7">
          © 2026 Pro Týnec srdcem. Všechna práva vyhrazena.
        </p>
      </div>
    </footer>
  );
};
