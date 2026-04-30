import React from 'react';
import type { Metadata } from 'next';
import {
  Bell,
  HeartHandshake,
  MessageCircle,
  PartyPopper,
  School,
  Shield,
  Trees,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'O nás',
  description:
    'Jsme sdružení nezávislých kandidátů a aktivních občanů Velkého Týnce. Kandidujeme, protože nám na obci záleží — poznáváme ji, žijeme v ní a chceme ji rozvíjet.',
};

type Hodnota = {
  id: string;
  /** Krátký popis jen pro přístupnost / čtečky */
  ariaLabel: string;
  text: string;
  Icon: LucideIcon;
};

const hodnoty: Hodnota[] = [
  {
    id: 'vite-vcas',
    ariaLabel: 'Transparentnost a předstižné informování občanů',
    text: 'Kde víte, co se chystá dřív, než se to stane.',
    Icon: Bell,
  },
  {
    id: 'vas-hlas',
    ariaLabel: 'Respekt k názoru občanů',
    text: 'Kde má váš názor váhu.',
    Icon: MessageCircle,
  },
  {
    id: 'hospodareni',
    ariaLabel: 'Rozumné hospodaření obce',
    text: 'Kde se hospodaří rozumně a s respektem k budoucnosti.',
    Icon: Wallet,
  },
  {
    id: 'skoly',
    ariaLabel: 'Kvalitní vzdělávání',
    text: 'Kde děti dostávají kvalitní vzdělání.',
    Icon: School,
  },
  {
    id: 'seniori',
    ariaLabel: 'Podpora seniorů',
    text: 'Kde senioři nejsou sami a mají podporu.',
    Icon: HeartHandshake,
  },
  {
    id: 'zelen',
    ariaLabel: 'Čistota, zeleň a odpočinek ve veřejném prostoru',
    text: 'Kde je čisto, zeleň a místo k odpočinku.',
    Icon: Trees,
  },
  {
    id: 'kultura',
    ariaLabel: 'Komunitní a kulturní život',
    text: 'Kde to žije (kulturou, spolky i sousedskými setkáními).',
    Icon: PartyPopper,
  },
  {
    id: 'bezpeci',
    ariaLabel: 'Bezpečné prostředí',
    text: 'Kde se cítíte bezpečně.',
    Icon: Shield,
  },
];

export default function ONasPage() {
  return (
    <div className="bg-white pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Záhlaví */}
        <header className="mb-16 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Hnutí
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            O nás
          </h1>
          <div className="mt-6 max-w-5xl space-y-5 text-lg text-tynec-black/80 md:text-xl">
            <p>
              Týnec pro nás není jen bod na mapě. Je to náš domov. Místo, kde žijeme, vychováváme
              děti, potkáváme sousedy a kde chceme jednou spokojeně zestárnout. Proto nám záleží na
              tom, jak naše obec funguje dnes a jaká bude zítra.
            </p>
            <p>
              Jsme sdružení nezávislých kandidátů PRO TÝNEC SRDCEM. Spojuje nás chuť dělat věci
              otevřeně, férově a s respektem k lidem. Nechceme slibovat nereálné věci. Chceme naopak
              naslouchat, mluvit s lidmi (ne o nich), přemýšlet a hledat řešení, která dávají smysl.
            </p>
          </div>
        </header>

        {/* Vize obce */}
        <section aria-labelledby="vize-obce-heading" className="max-w-6xl">
          <h2
            id="vize-obce-heading"
            className="mb-4 text-h2-mobile font-bold uppercase tracking-tight text-tynec-black md:text-h2-desktop"
          >
            Co chceme
          </h2>
          <p className="mb-10 text-[1.05rem] leading-[1.7] text-tynec-black/68 md:whitespace-nowrap md:text-lg">
            Jak má vypadat obec, kde se dobře žije — konkrétně, lidsky a s respektem ke každodennímu životu.
          </p>
          <ol className="divide-y divide-slate-200/80 border-y border-slate-200/80">
            {hodnoty.map((h, index) => (
              <li
                key={h.id}
                className="group py-4 transition-colors duration-300 hover:bg-slate-50/55 sm:py-5"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-primary sm:h-11 sm:w-11">
                    <h.Icon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="min-w-0 flex-1 pr-1 text-pretty text-[1rem] leading-[1.75] tracking-[-0.01em] text-tynec-black/[0.8] antialiased sm:text-[1.05rem]">
                    <span className="sr-only">
                      Položka {index + 1} z {hodnoty.length}: {h.ariaLabel}.{' '}
                    </span>
                    {h.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
