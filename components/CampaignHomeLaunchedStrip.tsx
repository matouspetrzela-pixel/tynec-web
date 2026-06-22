import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const launched = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';

/**
 * Po zveřejnění Programu a Kandidátů — rychlé rozcestí pod hero bez skrolování.
 */
export function CampaignHomeLaunchedStrip() {
  if (!launched) return null;

  return (
    <div
      role="region"
      aria-label="Odkazy na program, kandidáty a aktuality"
      className="border-y border-primary/15 bg-[linear-gradient(90deg,rgba(196,30,37,0.06)_0%,rgba(248,250,252,0.92)_42%,rgba(248,250,252,1)_100%)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-tynec-black/85 md:text-[0.8rem]">
          Program i kandidáti jsou zveřejněni · zůstaneme u vás v Aktualitách napříč sezonou kampaně
        </p>
        <nav
          aria-label="Rychlé odkazy"
          className="flex flex-wrap items-center gap-2 md:justify-end md:gap-3"
        >
          {[
            { href: '/program', label: 'Program 2026' },
            { href: '/kandidati', label: 'Kandidáti' },
            { href: '/aktuality', label: 'Aktuality' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-0.5 rounded-lg border border-tynec-black/10 bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-tynec-black transition-colors hover:border-primary hover:text-primary"
            >
              {label}
              <ChevronRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
