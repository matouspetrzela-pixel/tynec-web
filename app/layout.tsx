import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://protynec.cz'),
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
    url: 'https://protynec.cz',
    title: 'Pro Týnec srdcem — Komunální volby 2026',
    description:
      'Politické hnutí Pro Týnec srdcem. Rozum do rozvoje, srdce do komunity. Komunální volby 9.–10. října 2026.',
    images: [
      {
        url: '/images/9000.jpg',
        width: 1920,
        height: 1080,
        alt: 'Velký Týnec — pohled na obec',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Týnec srdcem — Komunální volby 2026',
    description: 'Rozum do rozvoje, srdce do komunity. Volby 9.–10. října 2026.',
    images: ['/images/9000.jpg'],
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
        <Header />
        <main className="min-h-screen pt-[calc(70px+env(safe-area-inset-top,0px))] md:pt-[calc(77px+env(safe-area-inset-top,0px))]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
