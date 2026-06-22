"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Props = { measurementId: string };

/**
 * Odesílá page_view při každé klientské navigaci (App Router).
 * První script v layoutu má send_page_view: false, aby nedocházelo k dvojímu počítání.
 */
export function GoogleAnalytics({ measurementId }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") return;

    const q = searchParams?.toString();
    const pagePath = pathname + (q ? `?${q}` : "");

    window.gtag("config", measurementId, {
      page_path: pagePath,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}
