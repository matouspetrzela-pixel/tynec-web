import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CampaignLogo } from '@/components/CampaignLogo';
import { CANDIDATES, getCandidateBySlug } from '@/lib/candidates';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

/** Statické params pro všechny kandidáty (SSG). */
export function generateStaticParams() {
  return CANDIDATES.map((c) => ({ slug: c.slug }));
}

/** Dynamické meta tagy dle kandidáta. */
export function generateMetadata({ params }: Props): Metadata {
  const candidate = getCandidateBySlug(params.slug);
  if (!candidate) return {};
  return {
    title: `${candidate.name} – Pro Týnec srdcem`,
    description: candidate.heartPriority,
  };
}

export default function CandidateProfilePage({ params }: Props) {
  const candidate = getCandidateBySlug(params.slug);
  if (!candidate) notFound();

  return (
    <div className="pb-20 pt-10">
      <div className="container mx-auto max-w-4xl px-6">

        {/* Zpět */}
        <Link
          href="/kandidati"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-tynec-gray transition-colors hover:text-tynec-black"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Všichni kandidáti
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[320px_1fr] md:gap-14 lg:grid-cols-[360px_1fr]">

          {/* Fotka */}
          <div className="flex flex-col gap-5">
            <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              {candidate.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs uppercase tracking-[0.2em] text-tynec-gray/50">
                  Foto 2026
                </span>
              )}
            </div>

            {/* Pořadí na kandidátní listině */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-5 py-4">
              <span className="text-2xl font-black text-primary">#{candidate.id}</span>
              <span className="text-sm font-semibold uppercase tracking-[0.1em] text-tynec-gray">
                Kandidátní listina 2026
              </span>
            </div>
          </div>

          {/* Profil */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
              Volby 2026
            </p>
            <h1 className="mt-3 text-h1-mobile font-bold text-tynec-black md:text-h1-desktop">
              {candidate.name}
            </h1>

            {candidate.position && (
              <p className="mt-2 text-lg font-medium text-tynec-gray">
                {candidate.position}
              </p>
            )}

            {/* Srdcová priorita */}
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-6">
              <CampaignLogo variant="inline" className="mt-0.5 h-5 w-auto shrink-0 object-contain object-left" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                  Srdcová priorita
                </p>
                <p className="mt-1 text-base font-medium text-tynec-black md:text-lg">
                  {candidate.heartPriority}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-8">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
                {candidate.gender === 'female' ? 'O kandidátce' : 'O kandidátovi'}
              </h2>
              {candidate.bio ? (
                <p className="text-tynec-black/80 leading-relaxed">{candidate.bio}</p>
              ) : (
                <p className="italic text-tynec-gray/60">
                  Profil bude doplněn.
                </p>
              )}
            </div>

            {/* Osobní priority */}
            {candidate.priorities && candidate.priorities.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-tynec-gray">
                  Priority
                </h2>
                <ul className="space-y-2">
                  {candidate.priorities.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-tynec-black/80">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 border-t border-gray-100 pt-8">
              <Link
                href="/podporte-nas"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-primary-hover"
              >
                Podpořte nás
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
