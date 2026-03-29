import React from 'react';
import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { FACEBOOK_URL, EMAIL } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Napište nám na info@provelkytynec.cz nebo nás sledujte na Facebooku. Rádi odpovíme na vaše dotazy a připomínky.',
};

export default function KontaktPage() {
  return (
    <div className="pb-20 pt-12">
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
          {/* Kontaktní karta */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 md:p-12">
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="mb-2 text-base font-bold uppercase tracking-tight text-tynec-black">
                    Email
                  </h3>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-lg text-tynec-gray transition-colors hover:text-tynec-black"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10">
                  <FacebookBrandIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-2 text-base font-bold uppercase tracking-tight text-tynec-black">
                    Facebook
                  </h3>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-tynec-gray transition-colors hover:text-tynec-black"
                  >
                    Skupina Pro Velký Týnec — sledujte dění a diskutujte s námi
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Podpora CTA */}
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 text-center">
            <h2 className="mb-4 text-h3-mobile font-bold uppercase text-tynec-black md:text-h3-desktop">
              Podpořte nás
            </h2>
            <p className="mb-0 text-tynec-black/75">
              Pokud souhlasíte s naším programem a chcete nás podpořit, budeme rádi za vaši důvěru
              v komunálních volbách 9.–10. října 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
