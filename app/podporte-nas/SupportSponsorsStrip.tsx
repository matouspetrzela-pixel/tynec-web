import React from 'react';

const SPONSORS = [
  {
    name: 'Martin Klabačka',
    trade: 'obkladačské práce',
  },
  {
    name: 'Stanislav Řehula',
    trade: 'elektromontáže',
    tradeHref: 'https://www.loxone.com/cscz/partner/78372-velky-tynec/stanislav-rehula/',
  },
] as const;

/**
 * Decentní pás partnerů mezi úvodem a kartami „Jak můžete pomoci“.
 */
export function SupportSponsorsStrip() {
  return (
    <section
      aria-labelledby="podporte-sponsori-heading"
      className="mt-12 border-y border-slate-200/80 py-10 md:py-12"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="type-eyebrow">Podporují nás</p>
        <div className="mx-auto mt-3 h-[3px] w-10 bg-primary" aria-hidden />
        <h2 id="podporte-sponsori-heading" className="sr-only">
          Partneři kampaně
        </h2>

        <ul className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
          {SPONSORS.map((sponsor) => (
            <li key={sponsor.name} className="min-w-0">
              <p className="text-lg font-semibold tracking-tight text-tynec-black md:text-xl">
                {sponsor.name}
              </p>
              <p className="mt-1.5 text-sm font-medium uppercase tracking-[0.14em] text-tynec-gray">
                {'tradeHref' in sponsor && sponsor.tradeHref ? (
                  <a
                    href={sponsor.tradeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {sponsor.trade}
                  </a>
                ) : (
                  sponsor.trade
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
