'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Program', href: '/program' },
    { label: 'Kandidáti', href: '/kandidati' },
    { label: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Text */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo-red.png"
              alt="Pro Velký Týnec"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold tracking-wide text-tynec-black uppercase">
              Pro Velký Týnec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-normal text-tynec-black hover:text-tynec-red transition-colors uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="px-6 py-2 bg-tynec-red text-white text-sm font-bold uppercase tracking-wide hover:bg-red-700 transition-colors"
            >
              Podpořte nás
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-tynec-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 flex flex-col gap-4 border-t border-gray-100 pt-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-normal text-tynec-black hover:text-tynec-red transition-colors uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-3 bg-tynec-red text-white text-sm font-bold uppercase text-center hover:bg-red-700 transition-colors mt-2"
            >
              Podpořte nás
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
