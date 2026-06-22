'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Ear, MessageCircle, Sparkles } from 'lucide-react';
import {
  TrackedFacebookOutbound,
  TrackedPodporteLink,
} from '@/components/CampaignMeasuredLinks';
import { EMAIL, FACEBOOK_URL } from '@/lib/social';

/**
 * Domovská kampanová vrstva ve fázi před úplným LAUNCH:
 * vysvětlí proces, hodnoty a jasně vede na O nás, Aktuality, Facebook.
 */
export function CampaignHomeJourney() {
  return (
    <section
      aria-labelledby="kampan-domu-heading"
      className="border-t border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fc_52%,#f3f6fb_100%)] pb-16 pt-14 md:pb-22 md:pt-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Kampaně v souladu s komunálou 2026
          </p>
          <div className="mx-auto mt-3 h-[3px] w-10 bg-primary" />
          <h2
            id="kampan-domu-heading"
            className="mt-4 text-pretty text-h2-mobile font-bold uppercase tracking-tight text-tynec-black md:text-h2-desktop"
          >
            Cesta k Volbám: nejdříve posloucháme Velký Týnec — pak společně nastavujeme přístup
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-tynec-black/80 md:text-xl">
            Web nevznikl jen kvůli hezkým sloganům. Chceme, aby komunální politika znala vaše problémy
            dřív, než vám ji někdo vnutí jako hotovku. Aktuality sledujeme týdně — Facebook používáme
            k rozhovoru, ne jen k oznámením.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          <article className="surface-card flex flex-col rounded-2xl border border-slate-200/70 p-6 sm:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.1] text-primary">
              <Ear className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-tynec-black">
              Naslouchání v terénu
            </h3>
            <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-tynec-black/[0.78]">
              Témata jako parkování, spolky, školní okolí nebo způsob, jakým se lidé dozvídají o plánu
              obce bereme jako práci — sbíráme příklady anonymně i na setkáních bez mikrofonu a
              pózy.
            </p>
          </article>

          <article className="surface-card flex flex-col rounded-2xl border border-slate-200/70 p-6 sm:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.1] text-primary">
              <MessageCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-tynec-black">
              Otevřená komunikace
            </h3>
            <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-tynec-black/[0.78]">
              Zastupitelstvo není „tabule jmen“ — všední péče vidíte z ulice každý den.
              Transparentnost neslibujeme jako kouzlo — chceme, aby městys komunikoval s předstihem a
              srozumitelně.
            </p>
          </article>

          <article className="surface-card flex flex-col rounded-2xl border border-slate-200/70 p-6 sm:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.1] text-primary">
              <Sparkles className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-tynec-black">
              Co přijde později na web
            </h3>
            <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-tynec-black/[0.78]">
              Stránky <strong className="font-semibold text-tynec-black/90">Program</strong> a{' '}
              <strong className="font-semibold text-tynec-black/90">Kandidáti</strong> aktivujeme
              v pravý část sezony — teprve až vyústí naslouchání v ustálené priority. Rozhodnutě to
              nebude jen PDF pro oko.
            </p>
          </article>
        </div>

        <ol className="mt-12 rounded-2xl border border-primary/15 bg-white/80 px-5 py-6 shadow-sm sm:mt-14 sm:px-8 sm:py-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-tynec-gray">
            Jednoduchý rytmus komunikace vedení kampaně
          </p>
          <div className="grid gap-4 md:grid-cols-4 md:gap-6">
            {[
              {
                step: '1',
                title: 'Kdo jsme — O nás',
                body: 'Hodnoty a důvod vstupovat do komunálu už dnes najdete jasně napsané.',
              },
              {
                step: '2',
                title: 'Aktuality & Facebook',
                body: 'Shrnujeme téma za témate doplněných reakcí souseda — zpětně čteme komentáře.',
              },
              {
                step: '3',
                title: 'Setkávání bez scénáře',
                body:
                  'Káva v malém kruhu, vaše vlastní témata z ulice či sídliště — termíny a místa dáváme vědět na Facebooku.',
              },
              {
                step: '4',
                title: 'Před podzim',
                body: 'Vyladěný výsledek vstupuje do struktury „Program“ před volební termín.',
              },
            ].map((item) => (
              <li key={item.step} className="relative flex gap-3 md:flex-col md:gap-2">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-black text-white"
                  aria-hidden
                >
                  {item.step}
                </span>
                <div>
                  <p className="font-bold text-tynec-black">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-tynec-black/72">{item.body}</p>
                </div>
              </li>
            ))}
          </div>
        </ol>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Link
            href="/o-nas"
            className="btn-primary-sheen inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.1em]"
          >
            Poznat nás lépe — O&nbsp;nás
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/aktuality"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-tynec-black/88 bg-transparent px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.1em] text-tynec-black transition-colors hover:border-primary hover:text-primary"
          >
            Co právě publikujeme
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <TrackedFacebookOutbound
            href={FACEBOOK_URL}
            placement="home_campaign_journey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-primary/35 bg-primary/5 px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:bg-primary/10"
          >
            Jdeme řešit věci i na FB
          </TrackedFacebookOutbound>
          <TrackedPodporteLink
            placement="home_campaign_journey_podporte"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.1em] text-tynec-black/85 transition-colors hover:border-primary hover:text-primary"
          >
            Chcete nás podpořit
          </TrackedPodporteLink>
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed text-tynec-gray md:mt-10">
          Přímé dotazy bez dramat na{' '}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-primary hover:underline">
            {EMAIL}
          </a>{' '}
          — rádi odpovíme bez zbytečné byrokracie.
        </p>
      </div>
    </section>
  );
}
