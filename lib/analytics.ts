/**
 * Odesílání vlastních GA4 událostí přes gtag (stejné měření jako v layout.tsx).
 *
 * Klíčové události v GA4: Administrátor → Události → počkej na názvy v tabulce,
 * pak Administrátor → Klíčové události a pověz jako konverzi např.:
 * `cta_podporte`, `cta_facebook`, `cta_email`, případně `support_card_nav`, `cta_hero_link`.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_EVENTS = {
  CTA_PODPORTE: "cta_podporte",
  CTA_FACEBOOK: "cta_facebook",
  CTA_EMAIL: "cta_email",
  SUPPORT_CARD_NAV: "support_card_nav",
  CTA_HERO_LINK: "cta_hero_link",
} as const;

type GaParamValue = string | number | boolean | undefined;

export function sendGaEvent(
  eventName: string,
  params?: Record<string, GaParamValue>,
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
  if (typeof window.gtag !== "function") return;

  const filtered =
    params &&
    Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined),
    );

  window.gtag("event", eventName, filtered ?? {});
}
