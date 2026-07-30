'use client';

import Script from 'next/script';
import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from '@/lib/cookie-consent';

type Props = {
  measurementId: string;
};

/**
 * Lišta souhlasu s analytickými cookies + načtení GA4 až po přijetí.
 */
export function CookieConsent({ measurementId }: Props) {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readCookieConsent());
    setReady(true);
  }, []);

  const accept = useCallback(() => {
    writeCookieConsent('accepted');
    setConsent('accepted');
  }, []);

  const reject = useCallback(() => {
    writeCookieConsent('rejected');
    setConsent('rejected');
  }, []);

  if (!ready) return null;

  return (
    <>
      {consent === 'accepted' && measurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', { send_page_view: false });
            `}
          </Script>
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={measurementId} />
          </Suspense>
        </>
      ) : null}

      {consent === null ? (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-tynec-black/95 p-4 text-white shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0 flex-1">
              <p
                id="cookie-consent-title"
                className="text-sm font-semibold tracking-tight"
              >
                Cookies a měření návštěvnosti
              </p>
              <p
                id="cookie-consent-desc"
                className="mt-1.5 text-sm leading-relaxed text-white/70"
              >
                Používáme Google Analytics jen pro anonymní statistiky návštěvnosti.
                Bez vašeho souhlasu se analytické cookies neukládají.{' '}
                <Link
                  href="/ochrana-osobnich-udaju"
                  className="underline underline-offset-2 transition-colors hover:text-white"
                >
                  Více v ochraně osobních údajů
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={reject}
                className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center rounded-lg border border-white/40 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Odmítnout
              </button>
              <button
                type="button"
                onClick={accept}
                className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center rounded-lg border border-white/40 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Souhlasím
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
