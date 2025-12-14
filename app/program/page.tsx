import React from 'react';
import { Check } from 'lucide-react';

export default function ProgramPage() {
  const programPoints = [
    'Dokončení rekonstrukce náměstí a centra obce',
    'Podpora místních spolků a sboru dobrovolných hasičů',
    'Rozšíření kapacit mateřské a základní školy',
    'Zlepšení dopravní bezpečnosti ve Vsisku',
    'Revitalizace zámeckého parku a zeleně',
    'Modernizace sportovních zařízení a hřišť',
    'Podpora kulturních akcí a místních tradic',
    'Zlepšení údržby místních komunikací',
    'Rozvoj turistického ruchu a propagace obce',
    'Podpora seniorů a sociálních služeb',
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-h1-mobile md:text-h1-desktop font-bold uppercase mb-6">
            <span className="text-tynec-black">Náš </span>
            <span className="text-tynec-red">program</span>
          </h1>
          <div className="w-24 h-1 bg-tynec-red mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-tynec-gray max-w-3xl mx-auto">
            Náš program vychází z potřeb občanů a dlouhodobé koncepce rozvoje obce.
            Prioritami jsou kvalita života, tradice a moderní infrastruktura.
          </p>
        </div>

        {/* Program Points */}
        <div className="max-w-4xl mx-auto space-y-6">
          {programPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-white border border-gray-200 hover:border-tynec-red transition-all duration-300"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-tynec-red flex items-center justify-center">
                <Check className="w-4 h-4 text-tynec-red" />
              </div>
              <p className="text-base md:text-lg text-tynec-black font-normal pt-1">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-gray-50 border border-gray-200">
            <h2 className="text-h3-mobile md:text-h3-desktop font-bold text-tynec-black uppercase mb-4">
              Máte nápad nebo připomínku?
            </h2>
            <p className="text-tynec-gray mb-6">
              Program tvoříme společně s vámi. Napište nám, co vás v obci trápí nebo co byste chtěli změnit.
            </p>
            <a
              href="/kontakt"
              className="inline-block px-8 py-4 bg-tynec-red text-white text-sm md:text-base font-bold uppercase tracking-wide hover:bg-red-700 transition-colors"
            >
              Napište nám
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
