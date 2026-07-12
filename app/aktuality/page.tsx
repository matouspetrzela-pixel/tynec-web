import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { AKTUALITY } from '@/lib/aktuality';
import { AktualitaCard } from '@/components/AktualityCard';
import { PageSectionHeader } from '@/components/PageSectionHeader';

export const metadata: Metadata = {
  title: 'Aktuality',
  description:
    'Novinky, zprávy a materiály Pro Týnec srdcem — sledujte přípravy na komunální volby 2026.',
};

/** 4 sloupce × 3 řady na velkém displeji */
const ITEMS_PER_PAGE = 12;

// ─── stránkování ─────────────────────────────────────────────────────────────

/**
 * Vrátí seznam čísel stránek a '...' pro elipsy.
 * Příklad pro stránku 5 z 20: [1, '...', 4, 5, 6, '...', 20]
 */
function buildPageList(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | '...')[] = [];
  const addPage = (n: number) => {
    if (!pages.includes(n)) pages.push(n);
  };

  addPage(1);
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    addPage(i);
  }
  if (current < total - 2) pages.push('...');
  addPage(total);

  return pages;
}

function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;
  const pages = buildPageList(current, total);

  const linkClass = (active: boolean) =>
    [
      'inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors duration-200',
      active
        ? 'bg-primary text-white shadow-sm'
        : 'border border-gray-200 bg-white text-tynec-black/80 hover:border-primary/40 hover:text-primary',
    ].join(' ');

  return (
    <nav
      aria-label="Stránkování"
      className="mt-12 flex flex-wrap items-center justify-center gap-1.5"
    >
      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex h-9 w-9 items-center justify-center text-sm text-tynec-black/40"
            aria-hidden
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={p === 1 ? '/aktuality' : `/aktuality?strana=${p}`}
            className={linkClass(p === current)}
            aria-current={p === current ? 'page' : undefined}
            scroll={false}
          >
            {p}
          </Link>
        ),
      )}

      {/* Tlačítko Další */}
      {current < total && (
        <Link
          href={`/aktuality?strana=${current + 1}`}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-tynec-black/80 transition-colors hover:border-primary/40 hover:text-primary"
          scroll={false}
        >
          Další
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      )}
    </nav>
  );
}

// ─── stránka ─────────────────────────────────────────────────────────────────

export default function AktualityPage({
  searchParams,
}: {
  searchParams: { strana?: string };
}) {
  const sorted = [...AKTUALITY].sort((a, b) => b.datum.localeCompare(a.datum));

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const rawPage = parseInt(searchParams.strana ?? '1', 10);
  const currentPage = Number.isNaN(rawPage)
    ? 1
    : Math.min(Math.max(1, rawPage), totalPages);

  const pageItems = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">

        <PageSectionHeader
          className="mb-16 max-w-3xl"
          eyebrow="Volby 2026"
          title="Aktuality"
          intro="Zprávy, materiály a informace z dění Pro Týnec srdcem."
          introClassName="text-pretty"
        />

        {/* Obsah */}
        {sorted.length === 0 ? (
          /* Prázdný stav */
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-8 py-20 text-center">
            <CalendarDays className="mb-4 h-10 w-10 text-tynec-gray/40" strokeWidth={1.5} />
            <h2 className="type-h3 mb-2 text-tynec-black/60">
              Brzy zde najdete první aktuality
            </h2>
            <p className="max-w-sm text-sm text-tynec-black/45">
              Průběžně zde budeme zveřejňovat novinky, letáky, dokumenty a videa z příprav na komunální volby 2026.
            </p>
          </div>
        ) : (
          <>
            {/* Mřížka karet */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {pageItems.map((item) => (
                <AktualitaCard key={item.id} item={item} />
              ))}
            </div>

            {/* Stránkování */}
            <Pagination current={currentPage} total={totalPages} />
          </>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-gray-100 bg-white p-8 text-center md:p-12">
          <h2 className="type-h3 mb-4">
            Sledujte nás na Facebooku
          </h2>
          <p className="mb-8 text-tynec-black/75">
            Nejrychlejší zprávy a sdílení najdete na našem facebookovém profilu.
          </p>
          <a
            href="https://www.facebook.com/protynecsrdcem"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-solid"
          >
            Otevřít Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
