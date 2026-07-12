import React from 'react';
import type { Metadata } from 'next';
import { TrackedPodporteLink } from '@/components/CampaignMeasuredLinks';
import { CampaignLogo } from '@/components/CampaignLogo';
import {
  PROGRAM_CLOSING_BLOCKS,
  PROGRAM_PAGE_HEADING,
  PROGRAM_PRIORITIES,
} from '@/lib/program';
import { PageSectionHeader } from '@/components/PageSectionHeader';

export const metadata: Metadata = {
  title: 'Program 2026',
  description:
    'Obecný volební program Pro Týnec srdcem pro komunální volby 2026: osm priorit pro Velký Týnec — od naslouchání občanům po odpovědné hospodaření, služby, bezpečnost a zelenou budoucnost.',
};

export default function ProgramPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">

        <PageSectionHeader
          className="mb-16"
          eyebrow="Volby 2026"
          title={PROGRAM_PAGE_HEADING}
          titleClassName="max-w-none text-balance leading-[1.08]"
        />

        {/* Programové oblasti */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PROGRAM_PRIORITIES.map((item, i) => {
            const Icon = item.Icon;
            return (
              <article
                key={item.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-gray-200"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 select-none font-black leading-none text-tynec-black/[0.045]"
                  style={{ fontSize: '5rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mb-5">
                  <Icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                </div>
                <h2 className="type-h3 leading-tight">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-tynec-black/75">{item.intro}</p>
              </article>
            );
          })}

          <article className="flex h-full items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-8">
            <CampaignLogo
              variant="header"
              className="mx-auto h-auto w-full max-w-[280px] object-contain"
            />
          </article>
        </div>

        {/* Závěrečný blok — dva sloupce ve stejné výšce */}
        <section
          className="mt-16 overflow-hidden rounded-2xl border border-gray-100 bg-white"
          aria-labelledby="program-closing-heading"
        >
          <h2 id="program-closing-heading" className="sr-only">
            Setkání s občany a zpětná vazba
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch">
            {PROGRAM_CLOSING_BLOCKS.map((block, index) => {
              const Icon = block.Icon;
              return (
                <article
                  key={block.title}
                  className={`flex h-full flex-col p-8 md:p-10 ${
                    index === 0 ? 'border-b border-gray-100 md:border-b-0 md:border-r' : ''
                  }`}
                >
                  <div className="mb-5 flex h-7 items-center">
                    <Icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="type-h3 min-h-[2.75rem] leading-tight md:min-h-[3rem]">
                    {block.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-tynec-black/75">{block.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-gray-100 bg-white p-8 text-center md:p-12">
          <h2 className="type-h3 mb-4">
            Máte nápad nebo připomínku?
          </h2>
          <p className="mb-8 text-tynec-black/75">
            Program tvoříme společně s vámi. Napište nám, co vás v obci trápí nebo co byste chtěli
            změnit.
          </p>
          <TrackedPodporteLink
            placement="program_page_cta"
            className="btn-primary-solid"
          >
            Podpořte nás
          </TrackedPodporteLink>
        </div>
      </div>
    </div>
  );
}
