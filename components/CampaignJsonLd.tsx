import {
  OG_SHARE_ALT,
  OG_SHARE_IMAGE_SQUARE_HEIGHT,
  OG_SHARE_IMAGE_SQUARE_URL,
  OG_SHARE_IMAGE_SQUARE_WIDTH,
} from '@/lib/og';
import { SITE_URL } from '@/lib/site';
import { EMAIL, FACEBOOK_URL } from '@/lib/social';

const organizationLogo = {
  '@type': 'ImageObject' as const,
  url: OG_SHARE_IMAGE_SQUARE_URL,
  width: OG_SHARE_IMAGE_SQUARE_WIDTH,
  height: OG_SHARE_IMAGE_SQUARE_HEIGHT,
  caption: OG_SHARE_ALT,
};

/** Strukturovaná data Organization + WebSite pro vyhledávače a sdílení. */
export function CampaignJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Pro Týnec srdcem',
        url: SITE_URL,
        logo: organizationLogo,
        description:
          'Nezávislí kandidáti do obecního zastupitelstva obce Velký Týnec. Komunální volby 2026.',
        email: EMAIL,
        foundingLocation: {
          '@type': 'Place',
          name: 'Velký Týnec',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Velký Týnec',
        },
        sameAs: [FACEBOOK_URL],
      },
      {
        '@type': 'WebSite',
        name: 'Pro Týnec srdcem',
        url: SITE_URL,
        publisher: {
          '@type': 'Organization',
          name: 'Pro Týnec srdcem',
          url: SITE_URL,
          logo: organizationLogo,
        },
        inLanguage: 'cs-CZ',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
