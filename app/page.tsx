import React from 'react';
import { Hero } from '@/components/Hero';
import { AboutPreview } from '@/components/AboutPreview';
import { CandidatesGrid } from '@/components/CandidatesGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <CandidatesGrid limit={12} showTitle={true} />
    </>
  );
}
