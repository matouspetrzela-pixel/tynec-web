import React from 'react';
import Link from 'next/link';
import { CampaignLogo } from '@/components/CampaignLogo';
import { PROGRAM_PAGE_HEADING, PROGRAM_PRIORITIES } from '@/lib/program';

type ProgramGridProps = {
  /** Zobrazit jen prvních N priorit (homepage teaser) */
  limit?: number;
  /** Odkaz na celý program pod mřížkou místo deváté karty */
  showFullProgramLink?: boolean;
};

export const ProgramGrid: React.FC<ProgramGridProps> = ({
  limit,
  showFullProgramLink = false,
}) => {
  const items = limit ? PROGRAM_PRIORITIES.slice(0, limit) : PROGRAM_PRIORITIES;
  const showLogoTile = !limit || limit >= PROGRAM_PRIORITIES.length;
  return (
    <section
      className="section-padding border-t border-slate-200/60 bg-gradient-to-b from-white via-slate-50/50 to-white"
      aria-labelledby="program-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="reveal mb-12 max-w-5xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-tynec-gray">
            Program 2026
          </p>
          <h2
            id="program-heading"
            className="mt-3 text-h2-mobile font-bold uppercase leading-[1.1] tracking-tight text-tynec-black md:text-h2-desktop"
          >
            {PROGRAM_PAGE_HEADING}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-[1.7] text-tynec-black/80 md:text-lg">
            Níže je přehled osmi hlavních priorit našeho volebního programu. Konkrétní opatření a
            podrobnosti k jednotlivým oblastem najdete v{' '}
            <Link
              href="/program"
              className="font-semibold text-tynec-black underline decoration-primary/55 underline-offset-[3px] transition-colors hover:text-primary"
            >
              plném programu
            </Link>
            .
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => {
            const Icon = item.Icon;
            return (
              <article
                key={item.title}
                className="card-elevated group/card relative flex min-h-[200px] flex-col overflow-hidden p-6 sm:min-h-0 sm:p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-2 select-none font-black leading-none"
                  style={{
                    fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                    WebkitTextStroke: '1px rgba(15, 23, 42, 0.07)',
                    color: 'rgba(15, 23, 42, 0.02)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative mb-3 sm:mb-4">
                  <Icon
                    className="h-7 w-7 shrink-0 text-primary drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <h3 className="relative text-base font-bold uppercase leading-snug tracking-tight text-tynec-black md:text-lg">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-tynec-black/75 md:text-base">
                  {item.intro}
                </p>
              </article>
            );
          })}

          {showLogoTile && (
          <Link
            href="/program"
            className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 text-left transition-all duration-300 hover:border-gray-200 sm:min-h-0"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-3 select-none font-black leading-none text-tynec-black/[0.045]"
              style={{ fontSize: '5rem' }}
            >
              09
            </span>
            <div className="mb-4">
              <div className="rounded-xl border border-gray-100 bg-white px-3 py-3">
                <CampaignLogo
                  variant="header"
                  className="mx-auto h-auto w-full max-w-[200px] object-contain"
                />
              </div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tynec-gray">
              PRO TÝNEC SRDCEM
            </p>
            <h3 className="mt-2 text-base font-bold uppercase leading-snug tracking-tight text-tynec-black md:text-lg">
              Celý program
            </h3>
            <p className="mt-auto pt-5 text-sm font-semibold text-primary">Přečíst celý program →</p>
          </Link>
          )}

          {showFullProgramLink && limit && (
            <div className="flex items-center justify-center sm:col-span-2 lg:col-span-3">
              <Link
                href="/program"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-tynec-black transition-colors hover:border-primary hover:text-primary"
              >
                Celý program — 8 priorit
                <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
