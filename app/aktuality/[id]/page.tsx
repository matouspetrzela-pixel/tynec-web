import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileDown,
  Video,
} from 'lucide-react';
import { AKTUALITY, type Aktualita } from '@/lib/aktuality';
import {
  TYP_META,
  formatDatumDlouhe,
  pickThumb,
  renderTextWithMarkdownLinks,
} from '@/components/AktualityCard';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import { SITE_URL } from '@/lib/site';

interface Props {
  params: { id: string };
}

/** Statické cesty pro všechny aktuality (SSG). */
export function generateStaticParams() {
  return AKTUALITY.map((a) => ({ id: a.id }));
}

const isImagePath = (s?: string) =>
  s ? /\.(jpe?g|png|webp|gif)$/i.test(s) : false;

/** Dynamické meta tagy a OG náhled — krásné sdílení na Facebooku. */
export function generateMetadata({ params }: Props): Metadata {
  const item = AKTUALITY.find((a) => a.id === params.id);
  if (!item) {
    return {
      title: 'Aktualita nenalezena',
    };
  }

  const og =
    (item.obrazek && isImagePath(item.obrazek) ? item.obrazek : null) ??
    (item.soubor && isImagePath(item.soubor) ? item.soubor : null) ??
    '/images/9000.jpg';

  return {
    title: item.nadpis,
    description: item.perex ?? item.nadpis,
    alternates: {
      canonical: `/aktuality/${item.id}`,
    },
    openGraph: {
      title: item.nadpis,
      description: item.perex ?? item.nadpis,
      url: `${SITE_URL}/aktuality/${item.id}`,
      type: 'article',
      publishedTime: item.datum,
      images: [
        {
          url: og,
          alt: item.nadpis,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.nadpis,
      description: item.perex ?? item.nadpis,
      images: [og],
    },
  };
}

export default function AktualitaDetailPage({ params }: Props) {
  const item = AKTUALITY.find((a) => a.id === params.id);
  if (!item) notFound();

  const meta = TYP_META[item.typ];
  const Icon = meta.Icon;

  // Pořadí podle data (nejnovější první) — pro „Novější / Starší"
  const sorted = [...AKTUALITY].sort((a, b) => b.datum.localeCompare(a.datum));
  const idx = sorted.findIndex((a) => a.id === item.id);
  const newer: Aktualita | null = idx > 0 ? sorted[idx - 1] : null;
  const older: Aktualita | null =
    idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

  const shareUrl = `${SITE_URL}/aktuality/${item.id}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const heroSrc = pickThumb(item);

  const obsahOdstavce = item.obsah
    ? item.obsah
        .trim()
        .split(/\n\n+/)
        .map((blok) => blok.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="pb-20 pt-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Zpět na výpis — sticky na mobilu (vždy při ruce při skrolu), na desktopu normální tlačítko */}
        <div className="sticky top-[calc(70px+env(safe-area-inset-top,0px))] z-30 -mx-4 mb-6 border-b border-gray-100 bg-white/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:-mx-6 sm:px-6 md:static md:top-auto md:z-auto md:mx-0 md:mb-10 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0">
          <Link
            href="/aktuality"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-white px-4 py-2.5 text-sm font-bold uppercase tracking-[0.1em] text-primary shadow-sm transition-all hover:-translate-x-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:px-5 md:py-3"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            Zpět na aktuality
          </Link>
        </div>

        {/* Hlavička */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${meta.color}`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {meta.label}
            </span>
            <time
              dateTime={item.datum}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-tynec-gray"
            >
              <CalendarDays className="h-4 w-4" aria-hidden />
              {formatDatumDlouhe(item.datum)}
            </time>
          </div>

          <h1 className="mt-5 text-h1-mobile font-bold leading-tight text-tynec-black md:text-h1-desktop">
            {item.nadpis}
          </h1>
        </header>

        {/* Náhled — hero obrázek v plné velikosti, zachovává poměr stran (žádný ořez).
            Mobil:  max 65 % výšky okna  (čtvercový obrázek nezabere celý viewport).
            Desktop: max 480 px na výšku (omezuje čtvercové grafiky, bannery se přizpůsobí poměrem). */}
        {heroSrc && (
          <figure className="mb-10 flex justify-center">
            <Image
              src={heroSrc}
              alt={item.nadpis}
              width={item.obrazekSirka ?? 1200}
              height={item.obrazekVyska ?? 800}
              className="h-auto max-h-[65vh] w-auto max-w-full rounded-2xl bg-slate-100 object-contain md:max-h-[480px]"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </figure>
        )}

        {/* Text článku */}
        <div className="space-y-5 text-lg leading-8 text-tynec-black/85">
          {item.perex && (
            <p className="text-xl font-medium leading-9 text-tynec-black">
              {renderTextWithMarkdownLinks(item.perex)}
            </p>
          )}
          {obsahOdstavce.map((blok, i) => (
            <p key={`p-${i}`}>{renderTextWithMarkdownLinks(blok)}</p>
          ))}
        </div>

        {/* Akce ke stažení / přehrání */}
        {(item.soubor || item.odkaz) && (
          <div className="mt-10 flex flex-wrap gap-3">
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

            {item.soubor && isImagePath(item.soubor) && (
              <a
                href={item.soubor}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/10"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Zobrazit v plné velikosti
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
        )}

        {/* Sdílet — na mobilu plná šířka FB tlačítka (pohodlnější palcem) */}
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-tynec-gray">
            Líbí se vám článek? Sdílejte
          </span>
          <a
            href={fbShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#145EC8] sm:w-auto sm:py-2.5"
          >
            <FacebookBrandIcon className="h-4 w-4" />
            Sdílet na Facebooku
          </a>
        </div>

        {/* Předchozí / další */}
        {(newer || older) && (
          <nav
            aria-label="Mezi aktualitami"
            className="mt-12 grid gap-4 border-t border-gray-100 pt-8 sm:grid-cols-2"
          >
            {newer ? (
              <Link
                href={`/aktuality/${newer.id}`}
                className="group flex flex-col gap-1 rounded-xl border border-gray-100 bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-tynec-gray">
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                  Novější
                </span>
                <span className="line-clamp-2 text-base font-bold text-tynec-black transition-colors group-hover:text-primary">
                  {newer.nadpis}
                </span>
              </Link>
            ) : (
              <span aria-hidden />
            )}

            {older ? (
              <Link
                href={`/aktuality/${older.id}`}
                className="group flex flex-col items-end gap-1 rounded-xl border border-gray-100 bg-white p-5 text-right transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-tynec-gray">
                  Starší
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="line-clamp-2 text-base font-bold text-tynec-black transition-colors group-hover:text-primary">
                  {older.nadpis}
                </span>
              </Link>
            ) : (
              <span aria-hidden />
            )}
          </nav>
        )}

        {/* Velké tlačítko zpět dole — na mobilu plná šířka, na desktopu vystředěné */}
        <div className="mt-12 border-t border-gray-100 pt-10 sm:flex sm:justify-center">
          <Link
            href="/aktuality"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto md:text-base"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            Zpět na všechny aktuality
          </Link>
        </div>
      </div>
    </article>
  );
}
