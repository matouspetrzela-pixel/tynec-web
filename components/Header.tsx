'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock, Menu, X } from 'lucide-react';
import { CampaignLogo } from '@/components/CampaignLogo';

const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';
/** Lokálně (`next dev`) zobrazit plnou navigaci bez zámků kvůli vývoji */
const devPreview = process.env.NODE_ENV === 'development';
const allUnlocked = launched || devPreview;

type NavItem = {
  label: string;
  href: string;
  /** Phase 1.5 — odemčeno i při `NEXT_PUBLIC_SITE_LAUNCHED=false` */
  alwaysUnlocked?: boolean;
};

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: 'O nás', href: '/o-nas', alwaysUnlocked: true },
    { label: 'Program', href: '/program' },
    { label: 'Kandidáti', href: '/kandidati' },
    { label: 'Aktuality', href: '/aktuality', alwaysUnlocked: true },
  ];

  const isItemUnlocked = (item: NavItem) =>
    allUnlocked || Boolean(item.alwaysUnlocked);
  const hasAnyUnlocked = navItems.some(isItemUnlocked);

  const path = pathname ?? '';

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

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
            className="group flex items-center transition-opacity duration-300 hover:opacity-90"
            onClick={() => setMobileMenuOpen(false)}
          >
            <CampaignLogo
              variant="header"
              priority
              className="h-9 w-auto max-h-9 origin-left object-contain object-left transition-transform duration-300 group-hover:scale-[1.02] md:h-11 md:max-h-11"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Hlavní navigace">
            {navItems.map((item) => {
              if (!isItemUnlocked(item)) {
                return (
                  <span
                    key={item.label}
                    className="inline-flex select-none items-center gap-1.5 border-b-2 border-transparent pb-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-tynec-black/45"
                  >
                    <Lock className="h-3 w-3" aria-hidden />
                    {item.label}
                  </span>
                );
              }
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    active
                      ? 'border-b-2 border-primary pb-0.5 text-tynec-black'
                      : 'border-b-2 border-transparent pb-0.5 text-tynec-black/80 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {allUnlocked ? (
              <Link
                href="/podporte-nas"
                className="btn-primary-sheen rounded-xl px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] lg:px-8 lg:py-3 lg:text-xs"
              >
                Podpořte nás
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed select-none items-center gap-1.5 rounded-xl border border-tynec-black/15 bg-tynec-black/[0.06] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-tynec-black/50 lg:px-8 lg:py-3 lg:text-xs">
                <Lock className="h-3 w-3" aria-hidden />
                Podpořte nás
              </span>
            )}
          </nav>

          {hasAnyUnlocked && (
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-tynec-black touch-manipulation md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          )}
        </div>

        {hasAnyUnlocked && mobileMenuOpen && (
          <nav
            id="mobile-nav"
            className="glass-panel mb-4 flex flex-col gap-1 rounded-2xl px-4 py-6 md:hidden"
          >
            {navItems.map((item) => {
              if (!isItemUnlocked(item)) {
                return (
                  <span
                    key={item.label}
                    className="inline-flex select-none items-center gap-2 border-b-2 border-transparent py-3 text-sm font-semibold uppercase tracking-[0.1em] text-tynec-black/45"
                  >
                    <Lock className="h-3.5 w-3.5" aria-hidden />
                    {item.label}
                  </span>
                );
              }
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
            {allUnlocked ? (
              <Link
                href="/podporte-nas"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary-sheen mt-3 rounded-xl py-4 text-center text-sm font-bold uppercase tracking-[0.12em]"
              >
                Podpořte nás
              </Link>
            ) : (
              <span className="mt-3 inline-flex cursor-not-allowed select-none items-center justify-center gap-2 rounded-xl border border-tynec-black/15 bg-tynec-black/[0.06] py-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-tynec-black/50">
                <Lock className="h-3.5 w-3.5" aria-hidden />
                Podpořte nás
              </span>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
