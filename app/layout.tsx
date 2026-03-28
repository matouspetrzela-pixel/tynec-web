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
  title: "Pro Velký Týnec - Komunální volby 2026",
  description:
    "Politické hnutí Pro Velký Týnec. Spojujeme tradici s moderním rozvojem. Společně pro naši obec, společně pro vás.",
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
        <main className="min-h-screen pt-[88px] md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
