import React from 'react';
import { CampaignHomeJourney } from '@/components/CampaignHomeJourney';
import { CampaignHomeLaunchedStrip } from '@/components/CampaignHomeLaunchedStrip';
import { Hero } from '@/components/Hero';
import { ProgramGrid } from '@/components/ProgramGrid';
import { AboutPreview } from '@/components/AboutPreview';
import { CandidatesGrid } from '@/components/CandidatesGrid';

const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';

export default function Home() {
  return (
    <>
      <Hero />
      {launched && <CampaignHomeLaunchedStrip />}
      {!launched && <CampaignHomeJourney />}
      {launched && (
        <>
          <ProgramGrid />
          <AboutPreview />
          <CandidatesGrid limit={12} showTitle={true} />
        </>
      )}
    </>
  );
}
