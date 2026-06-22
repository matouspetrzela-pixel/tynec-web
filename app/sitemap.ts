import type { MetadataRoute } from 'next';
import { AKTUALITY } from '@/lib/aktuality';
import { getRevealedCandidates } from '@/lib/candidates';
import { SITE_URL } from '@/lib/site';

const staticRoutes = ['', '/o-nas', '/program', '/kandidati', '/podporte-nas', '/aktuality'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...getRevealedCandidates().map((candidate) => ({
      url: `${SITE_URL}/kandidati/${candidate.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...AKTUALITY.map((a) => ({
      url: `${SITE_URL}/aktuality/${a.id}`,
      lastModified: new Date(a.datum),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
