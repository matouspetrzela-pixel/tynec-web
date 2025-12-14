import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const navItems = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Program', href: '/program' },
    { label: 'Kandidáti', href: '/kandidati' },
    { label: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <footer className="bg-tynec-black text-white py-12">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo + Text */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-white.png"
              alt="Pro Velký Týnec"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold tracking-wide uppercase">
              Pro Velký Týnec
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-normal hover:text-tynec-red transition-colors uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2026 Pro Velký Týnec. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};
