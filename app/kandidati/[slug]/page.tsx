import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { TrackedPodporteLink } from '@/components/CampaignMeasuredLinks';
import { CampaignLogo } from '@/components/CampaignLogo';
import { CandidatePortrait } from '@/components/CandidatePortrait';
import { CandidateListNumber } from '@/components/CandidateListNumber';
import { CANDIDATES, getCandidateBySlug, isCandidateRevealed } from '@/lib/candidates';
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
  if (!candidate || !isCandidateRevealed(candidate)) return {};
  return {
    title: `${candidate.name} – Pro Týnec srdcem`,
    description: candidate.heartPriority,
  };
}

export default function CandidateProfilePage({ params }: Props) {
  const candidate = getCandidateBySlug(params.slug);
  if (!candidate || !isCandidateRevealed(candidate)) notFound();

  const medallionBody =
    'text-base leading-[1.75] text-tynec-black/85 sm:text-[1.0625rem] sm:leading-[1.8] lg:text-lg lg:leading-[1.85]';

  return (
    <div className="pb-20 pt-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">

        {/* Zpět */}
        <Link
          href="/kandidati"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-tynec-gray transition-colors hover:text-tynec-black md:mb-10"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Všichni kandidáti
        </Link>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(240px,30%)_minmax(0,1fr)] md:items-start md:gap-10 lg:gap-12 xl:grid-cols-[minmax(280px,26%)_minmax(0,1fr)]">

          {/* Fotka */}
          <div className="group mx-auto flex w-full max-w-[18rem] flex-col gap-5 md:mx-0 md:max-w-none">
            <div className="relative w-full">
              <CandidatePortrait
                photo={candidate.photo}
                name={candidate.name}
                variant="detail"
                portraitWebpTune={candidate.portraitWebpTune}
                portraitObjectPosition={candidate.portraitObjectPosition}
                className="w-full"
              />
              <CandidateListNumber number={candidate.gridSlot} variant="detail" />
            </div>

            <div className="rounded-xl border border-gray-100 bg-white px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-[0.1em] text-tynec-gray">
                Kandidátní listina 2026
              </span>
            </div>
          </div>

          {/* Profil */}
          <div className="min-w-0">
            <p className="type-eyebrow">Volby 2026</p>
            <div className="page-header__rule" aria-hidden />
            <h1 className="type-h1 mt-3 text-balance">
              {candidate.name}
            </h1>

            {/* Srdcová priorita */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 sm:mt-8 sm:p-6">
              <CampaignLogo variant="inline" className="mt-0.5 h-5 w-auto shrink-0 object-contain object-left" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                  Srdcová priorita
                </p>
                <p className="mt-1 text-base font-medium text-tynec-black sm:text-lg">
                  {candidate.heartPriority}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 sm:mt-8">
              <h2 className="type-eyebrow mb-3 sm:mb-4">
                {candidate.gender === 'female' ? 'O kandidátce' : 'O kandidátovi'}
              </h2>
              {candidate.bio ? (
                <div className={`space-y-4 sm:space-y-5 ${medallionBody}`}>
                  {candidate.bio.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-pretty">{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="italic text-tynec-gray/60">
                  Profil bude doplněn.
                </p>
              )}
            </div>

            {/* Osobní priority */}
            {candidate.priorities && candidate.priorities.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <h2 className="type-eyebrow mb-3 sm:mb-4">
                  Priority
                </h2>
                <ul className="space-y-3 sm:space-y-4">
                  {candidate.priorities.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className={`text-pretty ${medallionBody}`}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {candidate.profileClosing && (
              <p className={`mt-6 text-pretty sm:mt-8 ${medallionBody}`}>
                {candidate.profileClosing}
              </p>
            )}

            {/* CTA */}
            <div className="mt-10 border-t border-gray-100 pt-8">
              <TrackedPodporteLink
                placement="kandidat_detail_cta"
                className="btn-primary-solid"
              >
                Podpořte nás
              </TrackedPodporteLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
