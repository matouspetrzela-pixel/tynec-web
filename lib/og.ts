import { SITE_URL } from '@/lib/site';

/** Zdrojový brand asset (zeleno‑červené logo na bílém) — `public/images/brand-logo-pro-tynec-srdcem.png`. */
export const BRAND_LOGO_SOURCE = '/images/brand-logo-pro-tynec-srdcem.png' as const;

/** Čtvercový OG — Google často ořezává náhled ve vyhledávání na čtverec. */
export const OG_SHARE_IMAGE_SQUARE = '/images/og-pro-tynec-srdcem-square.jpg' as const;
export const OG_SHARE_IMAGE_SQUARE_WIDTH = 1200;
export const OG_SHARE_IMAGE_SQUARE_HEIGHT = 1200;

/** Landscape OG pro Facebook / Twitter large card. */
export const OG_SHARE_IMAGE = '/images/og-pro-tynec-srdcem.jpg' as const;
export const OG_SHARE_WIDTH = 1200;
export const OG_SHARE_HEIGHT = 630;

export const OG_SHARE_ALT = 'Pro Týnec srdcem — logo';

export const OG_SHARE_IMAGE_SQUARE_URL = `${SITE_URL}${OG_SHARE_IMAGE_SQUARE}` as const;
export const OG_SHARE_IMAGE_URL = `${SITE_URL}${OG_SHARE_IMAGE}` as const;

/** Pořadí pro metadata: čtverec první (SERP), landscape pro sdílení. */
export const OG_SHARE_METADATA_IMAGES = [
  {
    url: OG_SHARE_IMAGE_SQUARE,
    width: OG_SHARE_IMAGE_SQUARE_WIDTH,
    height: OG_SHARE_IMAGE_SQUARE_HEIGHT,
    alt: OG_SHARE_ALT,
  },
  {
    url: OG_SHARE_IMAGE,
    width: OG_SHARE_WIDTH,
    height: OG_SHARE_HEIGHT,
    alt: OG_SHARE_ALT,
  },
] as const;
