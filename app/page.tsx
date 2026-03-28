import React from 'react';
import { Hero } from '@/components/Hero';
import { ProgramGrid } from '@/components/ProgramGrid';
import { AboutPreview } from '@/components/AboutPreview';
import { CandidatesGrid } from '@/components/CandidatesGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramGrid />
      <AboutPreview />
      <CandidatesGrid limit={12} showTitle={true} />
    </>
  );
}
