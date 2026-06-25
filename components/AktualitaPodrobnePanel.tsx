'use client';

import React, { useId, useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import { renderTextWithMarkdownLinks } from '@/components/AktualityCard';

type Props = {
  nadpis?: string;
  obsah: string;
};

function renderBlok(blok: string, key: string) {
  const trimmed = blok.trim();
  if (!trimmed) return null;

  const bulletLines = trimmed
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (
    bulletLines.length > 1 &&
    bulletLines.every((line) => /^[•\-]\s/.test(line))
  ) {
    return (
      <ul key={key} className="list-disc space-y-2 pl-6">
        {bulletLines.map((line, i) => (
          <li key={`${key}-li-${i}`}>
            {renderTextWithMarkdownLinks(line.replace(/^[•\-]\s*/, ''))}
          </li>
        ))}
      </ul>
    );
  }

  if (trimmed.length < 72 && !trimmed.endsWith('.')) {
    return (
      <p key={key} className="text-lg font-semibold text-tynec-black">
        {renderTextWithMarkdownLinks(trimmed)}
      </p>
    );
  }

  return (
    <p key={key}>{renderTextWithMarkdownLinks(trimmed)}</p>
  );
}

/** Rozbalovací podrobnosti článku — zůstává na stejné stránce (bez nové záložky). */
export function AktualitaPodrobnePanel({ nadpis, obsah }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const odstavce = obsah
    .trim()
    .split(/\n\n+/)
    .map((blok) => blok.trim())
    .filter(Boolean);

  return (
    <div className="mt-10 border-t border-gray-100 pt-10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/10 sm:w-auto"
      >
        <FileText className="h-4 w-4 shrink-0" aria-hidden />
        {open ? 'Skrýt podrobnosti' : 'Přečíst podrobnosti'}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="mt-8 space-y-5 text-lg leading-8 text-tynec-black/85"
        >
          {nadpis && (
            <h2 className="text-xl font-bold leading-snug text-tynec-black md:text-2xl">
              {nadpis}
            </h2>
          )}
          {odstavce.map((blok, i) => renderBlok(blok, `podrobne-${i}`))}
        </div>
      )}
    </div>
  );
}
