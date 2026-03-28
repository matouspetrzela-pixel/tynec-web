import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { FACEBOOK_URL } from '@/lib/social';

export const Footer: React.FC = () => {
  const navItems = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Program', href: '/program' },
    { label: 'Kandidáti', href: '/kandidati' },
    { label: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <footer className="border-t border-white/10 bg-tynec-black text-white">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
          {/* Brand + slogan */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_srdce_white.svg"
                alt=""
                width={56}
                height={56}
                aria-hidden
                className="h-14 w-14 shrink-0"
              />
              <span className="text-base font-bold uppercase tracking-[0.1em]">
                Pro Velký Týnec
              </span>
            </div>

            {/* Slogan */}
            <p className="max-w-xs text-center text-sm font-medium italic leading-relaxed text-white/70 md:text-left">
              Rozum do rozvoje, srdce do komunity.
            </p>

            <p className="max-w-sm text-center text-sm leading-relaxed text-white/50 md:text-left">
              Komunální volby 2026. Profesionální přístup k rozvoji obce — s respektem k tradici i
              moderním standardům.
            </p>

            {/* Kontakty */}
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
                href="mailto:info@provlkytynec.cz"
                className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                <span>info@provlkytynec.cz</span>
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
            © 2026 Pro Velký Týnec. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};
