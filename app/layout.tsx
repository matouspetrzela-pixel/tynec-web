import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tynec-web.vercel.app'),
  title: {
    default: 'Pro Týnec Srdcem — Komunální volby 2026',
    template: '%s | Pro Týnec Srdcem',
  },
  description:
    'Politické hnutí Pro Týnec Srdcem. Rozum do rozvoje, srdce do komunity. Komunální volby 9.–10. října 2026.',
  keywords: ['Pro Týnec Srdcem', 'komunální volby 2026', 'Velký Týnec', 'zastupitelé', 'obecní volby'],
  openGraph: {
    siteName: 'Pro Týnec Srdcem',
    locale: 'cs_CZ',
    type: 'website',
    title: 'Pro Týnec Srdcem — Komunální volby 2026',
    description:
      'Politické hnutí Pro Týnec Srdcem. Rozum do rozvoje, srdce do komunity. Komunální volby 9.–10. října 2026.',
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
    title: 'Pro Týnec Srdcem — Komunální volby 2026',
    description: 'Rozum do rozvoje, srdce do komunity. Volby 9.–10. října 2026.',
    images: ['/images/9000.jpg'],
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
        <main className="min-h-screen pt-[70px] md:pt-[77px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
