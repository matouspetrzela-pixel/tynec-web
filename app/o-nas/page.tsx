import React from 'react';
import Link from 'next/link';
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
  title: string;
  body: string;
  Icon: LucideIcon;
};

const hodnoty: Hodnota[] = [
  {
    title: 'Víte včas',
    body: 'Kde víte, co se chystá dřív, než se to stane.',
    Icon: Bell,
  },
  {
    title: 'Váš hlas se počítá',
    body: 'Kde má váš názor váhu.',
    Icon: MessageCircle,
  },
  {
    title: 'Rozumné hospodaření',
    body: 'Kde se hospodaří rozumně a s respektem k budoucnosti.',
    Icon: Wallet,
  },
  {
    title: 'Kvalitní školy',
    body: 'Kde děti dostávají kvalitní vzdělání.',
    Icon: School,
  },
  {
    title: 'Senioři s podporou',
    body: 'Kde senioři nejsou sami a mají podporu.',
    Icon: HeartHandshake,
  },
  {
    title: 'Čisté prostory',
    body: 'Kde je čisto, zeleň a místo k odpočinku.',
    Icon: Trees,
  },
  {
    title: 'Živá obec',
    body: 'Kde to žije (kulturou, spolky i sousedskými setkáními).',
    Icon: PartyPopper,
  },
  {
    title: 'Bezpečí',
    body: 'Kde se cítíte bezpečně.',
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

        <section className="surface-card mb-14 p-8 md:mb-16 md:p-10">
          <h2 className="text-h3-mobile font-bold uppercase text-tynec-black md:text-h3-desktop">
            Chcete být u toho?
          </h2>
          <p className="mt-4 max-w-xl text-tynec-black/75">
            Poznejte náš program a podpořte kampaň. Každá zpětná vazba i sdílení mezi sousedy pomáhá.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/program"
              className="btn-primary-campaign"
            >
              Náš program
            </Link>
            <Link
              href="/podporte-nas"
              className="btn-secondary-campaign"
            >
              Podpořte nás
            </Link>
          </div>
        </section>

        {/* Hodnoty */}
        <section aria-labelledby="hodnoty-heading" className="max-w-5xl">
          <h2
            id="hodnoty-heading"
            className="mb-3 text-h2-mobile font-bold uppercase text-tynec-black md:text-h2-desktop"
          >
            Naše hodnoty
          </h2>
          <p className="mb-8 max-w-2xl text-tynec-black/70">
            Týnec, v němž chceme žít — střípky obce, na kterou míříme:
          </p>
          <ol className="grid list-none grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {hodnoty.map((h, index) => (
              <li
                key={h.title}
                className="card-elevated flex flex-col gap-4 p-6 sm:p-7 md:gap-5"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex shrink-0 rounded-xl bg-primary/10 p-2.5">
                    <h.Icon className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                      {String(index + 1).padStart(2, '0')} — {h.title}
                    </p>
                    <p className="mt-2 text-base leading-[1.65] text-tynec-black/85 md:text-lg">
                      {h.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
