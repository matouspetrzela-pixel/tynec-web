import React from 'react';
import Link from 'next/link';
import { HeartIcon } from '@/components/HeartIcon';

export const Footer: React.FC = () => {
  const navItems = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Program', href: '/program' },
    { label: 'Kandidáti', href: '/kandidati' },
    { label: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <footer className="border-t border-white/10 bg-tynec-black text-white">
      <div className="container mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-3">
              <span className="text-white">
                <HeartIcon className="h-9 w-9" />
              </span>
              <span className="text-base font-bold uppercase tracking-[0.1em]">
                Pro Velký Týnec
              </span>
            </div>
            <p className="max-w-sm text-center text-sm leading-relaxed text-white/60 md:text-left">
              Komunální volby 2026. Profesionální přístup k rozvoji obce — s respektem k tradici i
              moderním standardům.
            </p>
          </div>

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
