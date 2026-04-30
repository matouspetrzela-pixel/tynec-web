import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, Mail } from 'lucide-react';
import { Megaphone, Share2, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { EMAIL, FACEBOOK_URL } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Podpořte nás',
  description:
    'Podpořte kampaň Pro Týnec srdcem a sledujte aktuality na Facebooku před komunálními volbami 2026.',
};

type HelpCard = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  Icon: LucideIcon;
};

const HELP_CARDS: HelpCard[] = [
  {
    title: 'Sledujte aktuality',
    body: 'Buďte u dění v kampani a mějte přehled o konkrétních krocích pro Velký Týnec.',
    ctaLabel: 'Přejít na Facebook',
    ctaHref: FACEBOOK_URL,
    Icon: Megaphone,
  },
  {
    title: 'Sdílejte mezi sousedy',
    body: 'Pomozte šířit informace dál. Každé doporučení mezi známými má velký dopad.',
    ctaLabel: 'Naši kandidáti',
    ctaHref: '/kandidati',
    Icon: Share2,
  },
  {
    title: 'Zapojte se osobně',
    body: 'Zajímají nás vaše podněty. Přidejte svůj pohled k programu, který vzniká pro obec.',
    ctaLabel: 'Volební program',
    ctaHref: '/program',
    Icon: Users,
  },
];

export default function PodporteNasPage() {
  return (
    <div className="bg-white pb-20 pt-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="surface-panel p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
            <header className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                Zapojte se s námi
              </p>
              <div className="mt-3 h-[3px] w-12 bg-primary" />
              <h1 className="mt-5 text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-tynec-black">
                Podpořte nás
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-tynec-black/80 md:text-xl">
                Každá podpora pomáhá. Sledujte kampaň, sdílejte ji a buďte u toho, když rozhodujeme o
                budoucnosti obce.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:gap-3.5">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base font-medium text-tynec-black/80 transition-colors hover:text-primary md:text-lg"
                  aria-label="Sledujte nás na Facebooku"
                >
                  <FacebookBrandIcon className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
                  <span className="font-semibold text-tynec-black">Sledujte nás</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-3 text-base font-medium text-tynec-black/80 transition-colors hover:text-primary md:text-lg"
                >
                  <Mail className="h-5 w-5 shrink-0 md:h-6 md:w-6" aria-hidden />
                  <span>
                    Kontakt: <span className="font-semibold text-tynec-black">{EMAIL}</span>
                  </span>
                </a>
              </div>
            </header>

            <aside className="relative rounded-2xl border border-slate-200/85 bg-gradient-to-br from-white to-slate-50/65 p-6 sm:p-7 lg:p-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Komunální volby 2026
              </div>
              <p
                className="mt-5 font-black leading-[0.9] tracking-tight text-tynec-black"
                style={{ fontSize: 'clamp(2.35rem, 5.2vw, 3.8rem)' }}
              >
                9.–10.
                <br />
                října 2026
              </p>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-tynec-black/75 md:text-lg">
                Váš hlas rozhoduje o tom, jak bude obec vypadat v příštích letech.
              </p>
              <p className="mt-7 text-sm uppercase tracking-[0.1em] text-tynec-gray">
                Společně pro moderní a funkční Velký Týnec
              </p>
            </aside>
          </div>
        </section>
        <section className="surface-card mt-12 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                Zapojení
              </p>
              <h2 className="mt-2 text-h3-mobile font-bold uppercase tracking-tight text-tynec-black md:text-h3-desktop">
                Jak můžete pomoci
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-tynec-black/65">
              Tři jednoduché kroky, které pomůžou dostat naši vizi k dalším lidem v obci.
            </p>
          </div>
          <div className="mt-7 grid divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {HELP_CARDS.map((item) => {
              const isExternal = item.ctaHref.startsWith('http');
              return (
                <article
                  key={item.title}
                  className="py-6 md:px-7 md:py-2 first:pt-0 last:pb-0 md:first:pl-0 md:first:pt-2 md:last:pr-0 md:last:pb-2"
                >
                  <item.Icon className="h-6 w-6 text-primary" strokeWidth={2} aria-hidden />
                  <h3 className="mt-4 text-base font-bold uppercase tracking-tight text-tynec-black">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tynec-black/75">{item.body}</p>
                  <div className="mt-5">
                    {isExternal ? (
                      <a
                        href={item.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold uppercase tracking-[0.1em] text-primary hover:text-primary-hover"
                      >
                        {item.ctaLabel}
                      </a>
                    ) : (
                      <Link
                        href={item.ctaHref}
                        className="text-sm font-semibold uppercase tracking-[0.1em] text-primary hover:text-primary-hover"
                      >
                        {item.ctaLabel}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
