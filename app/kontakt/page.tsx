import React from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function KontaktPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-h1-mobile md:text-h1-desktop font-bold uppercase mb-6">
            <span className="text-tynec-red">Kontakt</span>
          </h1>
          <div className="w-24 h-1 bg-tynec-red mx-auto mb-8"></div>
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
                <div className="flex-shrink-0 w-12 h-12 bg-tynec-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-tynec-red" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-tynec-black uppercase mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:info@provelkytynec.cz"
                    className="text-tynec-gray hover:text-tynec-red transition-colors text-lg"
                  >
                    info@provelkytynec.cz
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-tynec-red bg-opacity-10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-tynec-red" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-tynec-black uppercase mb-2">
                    Adresa
                  </h3>
                  <p className="text-tynec-gray text-lg">
                    Velký Týnec<br />
                    Česká republika
                  </p>
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
            <div className="inline-block px-8 py-4 bg-tynec-red text-white text-sm md:text-base font-bold uppercase tracking-wide">
              Děkujeme za vaši podporu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
