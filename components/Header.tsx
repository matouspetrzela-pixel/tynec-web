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

  const path = pathname ?? '';

  const isActive = (href: string) => {
    if (href === '/o-nas') return path === '/o-nas';
    return path === href || path.startsWith(`${href}/`);
  };

  return (
    <header className="glass-header fixed top-0 left-0 z-50 w-full">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-[70px] items-center justify-between md:h-[77px]">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-90 md:gap-3.5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span
              className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-[10px] transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11 md:rounded-[12px]"
              style={{ boxShadow: '0 2px 10px 0 rgba(215,25,32,0.30)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_srdce_red.svg"
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover"
                decoding="async"
              />
            </span>
            <span className="text-base font-bold uppercase leading-tight tracking-[0.08em] text-tynec-black md:text-lg lg:text-xl">
              Pro Týnec Srdcem
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Hlavní navigace">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
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
              className="rounded-xl bg-primary px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-primary-hover lg:px-8 lg:py-3 lg:text-xs"
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
            {mobileMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
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
