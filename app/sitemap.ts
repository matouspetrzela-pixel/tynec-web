import type { MetadataRoute } from 'next';
import { CANDIDATES } from '@/lib/candidates';

const SITE_URL = 'https://protynec.cz';

const staticRoutes = ['', '/o-nas', '/program', '/kandidati', '/podporte-nas'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...CANDIDATES.map((candidate) => ({
      url: `${SITE_URL}/kandidati/${candidate.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
