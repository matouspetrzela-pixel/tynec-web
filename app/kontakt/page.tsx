import React from 'react';
import { Mail } from 'lucide-react';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';

const FB_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://www.facebook.com/';

export default function KontaktPage() {
  return (
    <div className="pb-16 pt-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-6 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Kontakt
          </h1>
          <div className="mx-auto mb-8 h-1 w-24 bg-gray-300"></div>
          <p className="text-lg md:text-xl text-tynec-gray max-w-3xl mx-auto">
            Máte dotaz, nápad nebo připomínku? Rádi vás vyslechnem a odpovíme na vaše otázky.
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 p-8 md:p-12">
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-tynec-black uppercase mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:info@provelkytynec.cz"
                    className="text-lg text-tynec-gray transition-colors hover:text-tynec-black"
                  >
                    info@provelkytynec.cz
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1877F2]/12">
                  <FacebookBrandIcon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold uppercase text-tynec-black">
                    Facebook
                  </h3>
                  <a
                    href={FB_URL}
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

          {/* Support CTA */}
          <div className="mt-12 text-center bg-gray-50 border border-gray-200 p-8">
            <h2 className="text-h3-mobile md:text-h3-desktop font-bold text-tynec-black uppercase mb-4">
              Podpořte nás
            </h2>
            <p className="text-tynec-gray mb-6">
              Pokud souhlasíte s naším programem a chcete nás podpořit, budeme rádi za vaši důvěru
              v komunálních volbách 2026.
            </p>
            <div className="inline-block rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white md:text-base">
              Děkujeme za vaši podporu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
