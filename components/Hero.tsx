import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-white pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center">

          {/* LEFT SIDE - Text Content */}
          <div className="space-y-8">
            {/* Small Label */}
            <p className="text-sm md:text-base font-normal text-tynec-red uppercase tracking-wide">
              Komunální volby 2026
            </p>

            {/* Main Heading */}
            <h1 className="space-y-2">
              <div className="text-h1-mobile md:text-h1-desktop lg:text-[72px] font-bold text-tynec-black uppercase leading-none">
                PRO
              </div>
              <div className="text-h1-mobile md:text-h1-desktop lg:text-[72px] font-bold text-tynec-red uppercase leading-none">
                VELKÝ TÝNEC
              </div>
            </h1>

            {/* Motto */}
            <div className="space-y-2 max-w-xl">
              <p className="text-lg md:text-xl text-tynec-gray font-normal">
                Spojujeme tradici s moderním rozvojem.
              </p>
              <p className="text-lg md:text-xl text-tynec-gray font-normal">
                Společně pro naši obec, společně pro vás.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/program"
                className="px-8 py-4 bg-tynec-black text-white text-sm md:text-base font-bold uppercase tracking-wide text-center hover:bg-gray-800 transition-colors"
              >
                Náš program
              </Link>
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-white text-tynec-black border-2 border-tynec-black text-sm md:text-base font-bold uppercase tracking-wide text-center hover:bg-tynec-black hover:text-white transition-colors"
              >
                Kontakt
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] relative">
              <Image
                src="/images/logo-white.png"
                alt="Pro Velký Týnec"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
