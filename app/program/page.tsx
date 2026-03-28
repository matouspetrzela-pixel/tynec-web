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
    <div className="pb-16 pt-8">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Náš program
          </h1>
          <div className="mx-auto mb-8 h-1 w-24 bg-gray-300" />
          <p className="mx-auto max-w-3xl text-lg text-tynec-gray md:text-xl">
            Náš program vychází z potřeb občanů a dlouhodobé koncepce rozvoje obce.
            Prioritami jsou kvalita života, tradice a moderní infrastruktura.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {programPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-400"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-tynec-black/25">
                <Check className="h-4 w-4 text-tynec-black" />
              </div>
              <p className="pt-1 text-base font-normal text-tynec-black md:text-lg">
                {point}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl border border-gray-200 bg-gray-50 p-8">
            <h2 className="mb-4 text-h3-mobile font-bold uppercase text-tynec-black md:text-h3-desktop">
              Máte nápad nebo připomínku?
            </h2>
            <p className="mb-6 text-tynec-gray">
              Program tvoříme společně s vámi. Napište nám, co vás v obci trápí nebo co byste chtěli změnit.
            </p>
            <a
              href="/kontakt"
              className="inline-block rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover md:text-base"
            >
              Napište nám
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
