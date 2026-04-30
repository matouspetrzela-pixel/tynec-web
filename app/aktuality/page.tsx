import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, FileDown, Image as ImageIcon, Video, CalendarDays, ExternalLink, ChevronRight, ChevronDown } from 'lucide-react';
import { AKTUALITY, type Aktualita, type AktualitaTyp } from '@/lib/aktuality';

export const metadata: Metadata = {
  title: 'Aktuality',
  description:
    'Novinky, zprávy a materiály Pro Týnec srdcem — sledujte přípravy na komunální volby 2026.',
};

/** 4 sloupce × 3 řady na velkém displeji */
const ITEMS_PER_PAGE = 12;

// ─── helpers ────────────────────────────────────────────────────────────────

/** Štítek na náhledu: 30. 04. 2026 */
function formatDatumBadge(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const day = String(d).padStart(2, '0');
  const month = String(m).padStart(2, '0');
  return `${day}. ${month}. ${y}`;
}

const TYP_META: Record<
  AktualitaTyp,
  { label: string; color: string; Icon: React.ElementType }
> = {
  clanek: {
    label: 'Článek',
    color: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
    Icon: FileText,
  },
  pdf: {
    label: 'PDF',
    color: 'bg-red-50 text-red-700 ring-1 ring-red-100',
    Icon: FileDown,
  },
  letak: {
    label: 'Leták',
    color: 'bg-green-50 text-green-700 ring-1 ring-green-100',
    Icon: ImageIcon,
  },
  video: {
    label: 'Video',
    color: 'bg-purple-50 text-purple-700 ring-1 ring-purple-100',
    Icon: Video,
  },
};

// ─── karta aktuality ─────────────────────────────────────────────────────────

function AktualitaCard({ item }: { item: Aktualita }) {
  const meta = TYP_META[item.typ];
  const Icon = meta.Icon;
  const hasExpandableContent = Boolean(item.perex || item.obsah);

  const isImage = (s?: string) =>
    s ? /\.(jpe?g|png|webp|gif)$/i.test(s) : false;

  const thumbSrc =
    item.obrazek && isImage(item.obrazek)
      ? item.obrazek
      : item.soubor && isImage(item.soubor)
        ? item.soubor
        : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md">
      <details className="group/dtl flex flex-1 flex-col" open={!hasExpandableContent}>
        <summary
          className={[
            'list-none marker:content-none [&::-webkit-details-marker]:hidden',
            hasExpandableContent ? 'cursor-pointer' : 'cursor-default',
          ].join(' ')}
        >
          {/* Náhled + datum dole vlevo (jako úřední rozcestník aktualit) */}
          <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200/90 sm:h-48">
            {thumbSrc ? (
              <Image
                src={thumbSrc}
                alt={item.nadpis}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center pt-2">
                <Icon className="h-14 w-14 text-slate-300/90" strokeWidth={1.25} aria-hidden />
              </div>
            )}

            {/* Datum vložení — překryvný štítek */}
            <div className="absolute bottom-3 left-3 z-[2] rounded-lg bg-black/70 px-3 py-1.5 shadow-md backdrop-blur-[2px]">
              <time
                dateTime={item.datum}
                className="text-[13px] font-bold tracking-tight text-white"
              >
                {formatDatumBadge(item.datum)}
              </time>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-7">
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${meta.color}`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {meta.label}
              </span>
            </div>

            <h2 className="text-lg font-bold leading-snug text-blue-900 sm:text-xl">
              {item.nadpis}
            </h2>

            {hasExpandableContent && (
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-primary">
                Číst více
                <ChevronDown
                  className="h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-open/dtl:rotate-180"
                  aria-hidden
                />
              </div>
            )}
          </div>
        </summary>

        {(item.perex || item.obsah) && (
          <div className="space-y-4 border-t border-gray-100 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
            {item.perex && (
              <p className="text-base leading-8 text-tynec-black/85 sm:text-[1.075rem]">
                {item.perex}
              </p>
            )}
            {item.obsah &&
              item.obsah
                .trim()
                .split(/\n\n+/)
                .map((blok) => blok.trim())
                .filter(Boolean)
                .map((blok, i) => (
                  <p
                    key={`${item.id}-obsah-${i}`}
                    className="text-base leading-8 text-tynec-black/85 sm:text-[1.075rem]"
                  >
                    {blok}
                  </p>
                ))}
          </div>
        )}

        {/* Akce */}
        <div className="mt-auto px-6 pb-6 sm:px-7 sm:pb-7">
          <div className="flex flex-wrap gap-3.5">
          {item.soubor && /\.pdf$/i.test(item.soubor) && (
            <a
              href={item.soubor}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/10"
            >
              <FileDown className="h-4 w-4" aria-hidden />
              Stáhnout PDF
            </a>
          )}

          {item.soubor && isImage(item.soubor) && (
            <a
              href={item.soubor}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/10"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Zobrazit leták
            </a>
          )}

          {item.odkaz && item.typ === 'video' && (
            <a
              href={item.odkaz}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/10"
            >
              <Video className="h-4 w-4" aria-hidden />
              Přehrát video
            </a>
          )}

          {item.odkaz && item.typ !== 'video' && (
            <a
              href={item.odkaz}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/10"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Otevřít odkaz
            </a>
          )}
          </div>
        </div>
      </details>
    </article>
  );
}

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
  // Seřadit sestupně dle data (nejnovější první)
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

        {/* Záhlaví */}
        <header className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
            Volby 2026
          </p>
          <div className="mt-3 h-[3px] w-10 bg-primary" />
          <h1 className="mt-4 text-h1-mobile font-bold uppercase text-tynec-black md:text-h1-desktop">
            Aktuality
          </h1>
          <p className="mt-6 text-pretty text-lg text-tynec-black/80 md:text-xl">
            Zprávy, materiály a informace z dění Pro Týnec srdcem.
          </p>
        </header>

        {/* Obsah */}
        {sorted.length === 0 ? (
          /* Prázdný stav */
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-8 py-20 text-center">
            <CalendarDays className="mb-4 h-10 w-10 text-tynec-gray/40" strokeWidth={1.5} />
            <h2 className="mb-2 text-lg font-bold uppercase tracking-tight text-tynec-black/60">
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
          <h2 className="mb-4 text-h3-mobile font-bold uppercase text-tynec-black md:text-h3-desktop">
            Sledujte nás na Facebooku
          </h2>
          <p className="mb-8 text-tynec-black/75">
            Nejrychlejší zprávy a sdílení najdete na našem facebookovém profilu.
          </p>
          <a
            href="https://www.facebook.com/protynecsrdcem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover md:text-base"
          >
            Otevřít Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
