/** Klíč a hodnoty souhlasu s analytickými cookies (localStorage). */

export const COOKIE_CONSENT_KEY = 'pts_cookie_consent';

export type CookieConsentValue = 'accepted' | 'rejected';

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw === 'accepted' || raw === 'rejected') return raw;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function writeCookieConsent(value: CookieConsentValue): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}
