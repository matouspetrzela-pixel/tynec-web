import React from 'react';
import { Hero, HERO_LCP_PRELOAD } from '@/components/Hero';
import { ProgramGrid } from '@/components/ProgramGrid';
import { AboutPreview } from '@/components/AboutPreview';
import { CandidatesGrid } from '@/components/CandidatesGrid';

const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href={HERO_LCP_PRELOAD.href}
        // Responsive preload (DOM: imagesrcset / imagesizes)
        {...{
          imageSrcSet: HERO_LCP_PRELOAD.imageSrcSet,
          imageSizes: HERO_LCP_PRELOAD.imageSizes,
        }}
        fetchPriority="high"
      />
      <Hero />
      {launched && (
        <>
          <ProgramGrid />
          <AboutPreview />
          <CandidatesGrid limit={11} showTitle={true} />
        </>
      )}
    </>
  );
}
