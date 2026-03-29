import React from 'react';
import type { Metadata } from 'next';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { FACEBOOK_URL, EMAIL } from '@/lib/social';


export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Napište nám na info@provelkytynec.cz nebo nás sledujte na Facebooku. Rádi odpovíme na vaše dotazy a připomínky.',
};

export default function KontaktPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Záhlaví */}
        <header className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Spojte se s námi
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Kontakt
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-tynec-black/80 md:text-xl">
            Máte dotaz, nápad nebo připomínku? Rádi vás vyslechnem a odpovíme na vaše otázky.
          </p>
        </header>

        <div className="max-w-2xl">
          {/* Podpora CTA */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center md:p-10">
            {/* Datum jako vizuální dominanta */}
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
              Komunální volby
            </p>
            <p className="mt-1 font-black leading-none tracking-tight text-tynec-black" style={{ fontSize: 'clamp(2.4rem, 6vw, 3.6rem)' }}>
              9.–10. října&nbsp;2026
            </p>

            {/* Červená dekorativní linka */}
            <div className="mx-auto mt-5 h-[3px] w-10 bg-primary" />

            <p className="mt-5 text-base text-tynec-black/75 md:text-lg">
              Váš hlas rozhoduje o tom, jak bude obec vypadat za&nbsp;4&nbsp;roky.
              <br className="hidden sm:block" />
              Přijďte volit a řekněte ostatním, proč na tom záleží.
            </p>

            {/* Akce */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-tynec-black transition-colors hover:border-gray-300"
              >
                <FacebookBrandIcon className="h-4 w-4 shrink-0" />
                Sdílejte nás na Facebooku
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-tynec-black transition-colors hover:border-gray-300"
              >
                Napište nám
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
