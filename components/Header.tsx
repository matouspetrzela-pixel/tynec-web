'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Program', href: '/program' },
    { label: 'Kandidáti', href: '/kandidati' },
    { label: 'Kontakt', href: '/kontakt' },
  ];

  const isActive = (href: string) => {
    if (href === '/o-nas') return pathname === '/o-nas';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="glass-header fixed top-0 left-0 z-50 w-full">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-[88px] items-center justify-between md:h-24">
          <Link
            href="/"
            className="group flex items-center gap-3.5 transition-opacity duration-300 hover:opacity-90 md:gap-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_srdce_red.svg"
                alt=""
                width={56}
                height={56}
                className="h-full w-full max-h-full max-w-full object-contain object-center"
                decoding="async"
              />
            </span>
            <span className="text-lg font-bold uppercase leading-tight tracking-[0.08em] text-tynec-black md:text-xl lg:text-2xl">
              Pro Velký Týnec
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-10 md:flex" aria-label="Hlavní navigace">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 lg:text-sm ${
                    active
                      ? 'border-b-2 border-primary pb-0.5 text-tynec-black'
                      : 'border-b-2 border-transparent pb-0.5 text-tynec-black/80 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              className="rounded-xl bg-primary px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-primary-hover lg:px-10 lg:py-4 lg:text-xs"
            >
              Podpořte nás
            </Link>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-tynec-black md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={1.75} /> : <Menu size={28} strokeWidth={1.75} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-nav"
            className="glass-panel mb-4 flex flex-col gap-1 rounded-2xl px-4 py-6 md:hidden"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b-2 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                    active
                      ? 'border-tynec-black text-tynec-black'
                      : 'border-transparent text-tynec-black/80 hover:text-tynec-black'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 rounded-xl bg-primary py-4 text-center text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-primary-hover"
            >
              Podpořte nás
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
