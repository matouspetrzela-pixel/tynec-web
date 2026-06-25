import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  FileText,
  FileDown,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import type { Aktualita, AktualitaTyp } from '@/lib/aktuality';

// ─── meta dle typu obsahu ────────────────────────────────────────────────────

export const TYP_META: Record<
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

// ─── helpers (sdílené se stránkou detailu) ──────────────────────────────────

/** Štítek na náhledu: 30. 04. 2026 */
export function formatDatumBadge(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const day = String(d).padStart(2, '0');
  const month = String(m).padStart(2, '0');
  return `${day}. ${month}. ${y}`;
}

const MESICE = [
  'ledna',
  'února',
  'března',
  'dubna',
  'května',
  'června',
  'července',
  'srpna',
  'září',
  'října',
  'listopadu',
  'prosince',
];

/** Dlouhé datum pro detail: „28. května 2026" */
export function formatDatumDlouhe(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}. ${MESICE[m - 1]} ${y}`;
}

/**
 * Jednoduché odkazy v textu aktuality: `[popisek](https://…)` → klikací odkaz.
 */
export function renderTextWithMarkdownLinks(text: string): React.ReactNode {
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index));
    }
    parts.push(
      <a
        key={`mdl-${key++}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
      >
        {m[1]}
      </a>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts.length ? <>{parts}</> : text;
}

const isImagePath = (s?: string) =>
  s ? /\.(jpe?g|png|webp|gif)$/i.test(s) : false;

/** Zdroj náhledu: preferovaně `obrazek`, jinak `soubor` (pokud je obrázek). */
export function pickThumb(item: Aktualita): string | null {
  if (item.obrazek && isImagePath(item.obrazek)) return item.obrazek;
  if (item.soubor && isImagePath(item.soubor)) return item.soubor;
  return null;
}

// ─── karta aktuality ─────────────────────────────────────────────────────────

/**
 * Karta aktuality — celá je klikací odkaz na detail článku
 * (`/aktuality/[id]`). U položek bez perexu / obsahu (např. samostatný leták
 * nebo přímý odkaz na video) odkazuje karta rovnou na cílový soubor / URL.
 */
export function AktualitaCard({ item }: { item: Aktualita }) {
  const meta = TYP_META[item.typ];
  const Icon = meta.Icon;

  const hasContent = Boolean(item.perex || item.obsah);
  const detailHref = `/aktuality/${item.id}`;

  let href = detailHref;
  let external = false;

  if (!hasContent) {
    if ((item.typ === 'pdf' || item.typ === 'letak') && item.soubor) {
      href = item.soubor;
      external = true;
    } else if (item.typ === 'video' && item.odkaz) {
      href = item.odkaz;
      external = true;
    } else if (item.odkaz) {
      href = item.odkaz;
      external = true;
    }
  }

  const thumbSrc = pickThumb(item);
  const thumbObjectPosition =
    item.nahledOrez === 'left'
      ? 'object-left'
      : item.nahledOrez === 'right'
        ? 'object-right'
        : 'object-center';

  /**
   * 'contain' = obrázek se vejde celý (vhodné pro čtvercové grafiky s textem na všech stranách).
   * 'cover'   = obrázek vyplní a případně ořízne (vhodné pro bannery).
   */
  const useContain = item.kartaZobrazeni === 'contain';

  const ctaLabel =
    !hasContent && item.typ === 'pdf'
      ? 'Stáhnout PDF'
      : !hasContent && item.typ === 'video'
        ? 'Přehrát video'
        : !hasContent && item.typ === 'letak'
          ? 'Zobrazit leták'
          : 'Číst více';

  const cardBody = (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md">
      {/* Náhled + datum — pevný poměr 3:2 pro jednotnou výšku v gridu */}
      <div
        className={`relative aspect-[3/2] w-full shrink-0 overflow-hidden ${
          useContain ? 'bg-[#FBF6F3]' : 'bg-slate-100'
        }`}
      >
        {thumbSrc ? (
          <Image
            src={thumbSrc}
            alt={item.nadpis}
            fill
            className={[
              useContain ? 'object-contain' : `object-cover ${thumbObjectPosition}`,
              'transition-transform duration-500',
              useContain ? '' : 'group-hover/card:scale-[1.03]',
            ].join(' ')}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center pt-2">
            <Icon
              className="h-14 w-14 text-slate-300/90"
              strokeWidth={1.25}
              aria-hidden
            />
          </div>
        )}

        <div className="absolute bottom-2 right-2 z-[2] rounded-md bg-black/65 px-2 py-0.5 shadow-sm backdrop-blur-[2px]">
          <time
            dateTime={item.datum}
            className="text-[11px] font-semibold tabular-nums tracking-tight text-white sm:text-xs"
          >
            {formatDatumBadge(item.datum)}
          </time>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
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

        {item.perex && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-tynec-black/70 sm:text-base">
            {item.perex}
          </p>
        )}

        {/* CTA — výraznější chip, aby byl na mobilu jasně vidět tap-target */}
        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-primary transition-colors group-hover/card:bg-primary group-hover/card:text-white">
            {ctaLabel}
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/card:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </article>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {cardBody}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {cardBody}
    </Link>
  );
}
