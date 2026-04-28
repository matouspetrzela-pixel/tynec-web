import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { CampaignLogo } from '@/components/CampaignLogo';
import { EMAIL, FACEBOOK_URL } from '@/lib/social';

export const Footer: React.FC = () => {
  const navItems = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Program', href: '/program' },
    { label: 'Kandidáti', href: '/kandidati' },
    { label: 'Podpořte nás', href: '/podporte-nas' },
  ];

  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-tynec-black to-[#0a0b0f] text-white">
      <div className="container mx-auto max-w-6xl px-4 pt-16 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] sm:px-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
          {/* Brand + slogan */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center justify-center md:justify-start">
              <CampaignLogo
                variant="footer"
                className="h-9 w-auto max-h-9 object-contain object-left md:h-11 md:max-h-11"
              />
            </div>

            {/* Slogan */}
            <p className="max-w-xs text-center text-sm font-medium italic leading-relaxed text-white/70 md:text-left">
              Rozum do rozvoje, srdce do komunity.
            </p>

            {/* Datum voleb */}
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/45 text-center md:text-left">
              Komunální volby 9.–10. října 2026
            </p>

            <p className="max-w-sm text-center text-sm leading-relaxed text-white/50 md:text-left">
              Komunální volby 2026. Profesionální přístup k rozvoji obce — s respektem k tradici i
              moderním standardům.
            </p>

            {/* Podpora — pouze Facebook */}
            <div className="mt-1 flex flex-col items-center gap-3 md:items-start">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-white"
              >
                <FacebookBrandIcon className="h-5 w-5 shrink-0" />
                <span>Facebook</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 shrink-0" aria-hidden />
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Nav */}
          <nav
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:justify-end"
            aria-label="Patička"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs uppercase tracking-[0.12em] text-white/75 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center md:text-left">
          <p className="text-xs text-white/45">
            © 2026 Pro Týnec srdcem. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};
