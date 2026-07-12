import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CampaignJsonLd } from "@/components/CampaignJsonLd";
import {
  OG_SHARE_IMAGE_SQUARE,
  OG_SHARE_METADATA_IMAGES,
} from "@/lib/og";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A1A1A",
};

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  applicationName: 'Pro Týnec srdcem',
  title: {
    default: 'Pro Týnec srdcem — Komunální volby 2026',
    template: '%s | Pro Týnec srdcem',
  },
  description:
    'Politické hnutí Pro Týnec srdcem. Rozum do rozvoje, srdce do komunity. Komunální volby 9.–10. října 2026.',
  keywords: ['Pro Týnec srdcem', 'komunální volby 2026', 'Velký Týnec', 'zastupitelé', 'obecní volby'],
  openGraph: {
    siteName: 'Pro Týnec srdcem',
    locale: 'cs_CZ',
    type: 'website',
    url: SITE_URL,
    title: 'Pro Týnec srdcem — Komunální volby 2026',
    description:
      'Politické hnutí Pro Týnec srdcem. Rozum do rozvoje, srdce do komunity. Komunální volby 9.–10. října 2026.',
    images: [...OG_SHARE_METADATA_IMAGES],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Týnec srdcem — Komunální volby 2026',
    description: 'Rozum do rozvoje, srdce do komunity. Volby 9.–10. října 2026.',
    images: [OG_SHARE_IMAGE_SQUARE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className={inter.className}>
        <CampaignJsonLd />
        <Header />
        <main className="pt-[calc(var(--header-height)+env(safe-area-inset-top,0px))]">
          {children}
        </main>
        <Footer />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
