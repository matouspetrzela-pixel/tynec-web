import React from 'react';
import type { Metadata } from 'next';
import { CalendarDays, Mail } from 'lucide-react';
import { FacebookBrandIcon } from '@/components/FacebookBrandIcon';
import {
  TrackedEmailOutbound,
  TrackedFacebookOutbound,
} from '@/components/CampaignMeasuredLinks';
import { EMAIL, FACEBOOK_URL } from '@/lib/social';
import { SupportHelpCardsSection } from './SupportHelpCardsSection';

export const metadata: Metadata = {
  title: 'Podpořte nás',
  description:
    'Sdílení, sledování a dobrovolná podpora kampaně Pro Týnec srdcem do obecního zastupitelstva 2026. Děkujeme každému sousedy.',
};

export default function PodporteNasPage() {
  return (
    <div className="bg-white pb-20 pt-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="surface-panel p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
            <header className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tynec-gray">
                Zapojte se s námi
              </p>
              <div className="mt-3 h-[3px] w-12 bg-primary" />
              <h1 className="mt-5 text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-tynec-black">
                Podpořte nás
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-tynec-black/80 md:text-xl">
                Každá podpora pomáhá. Sledujte kampaň, sdílejte ji a buďte u toho, když rozhodujeme o
                budoucnosti obce.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:gap-3.5">
                <TrackedFacebookOutbound
                  href={FACEBOOK_URL}
                  placement="podporte_intro_facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base font-medium text-tynec-black/80 transition-colors hover:text-primary md:text-lg"
                  aria-label="Sledujte nás na Facebooku"
                >
                  <FacebookBrandIcon className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
                  <span className="font-semibold text-tynec-black">Sledujte nás na Facebooku</span>
                </TrackedFacebookOutbound>
                <TrackedEmailOutbound
                  href={`mailto:${EMAIL}`}
                  placement="podporte_intro_email"
                  className="inline-flex items-center gap-3 text-base font-medium text-tynec-black/80 transition-colors hover:text-primary md:text-lg"
                >
                  <Mail className="h-5 w-5 shrink-0 md:h-6 md:w-6" aria-hidden />
                  <span>
                    Kontakt: <span className="font-semibold text-tynec-black">{EMAIL}</span>
                  </span>
                </TrackedEmailOutbound>
              </div>
            </header>

            <aside className="relative rounded-2xl border border-slate-200/85 bg-gradient-to-br from-white to-slate-50/65 p-6 sm:p-7 lg:p-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Komunální volby 2026
              </div>
              <p
                className="mt-5 font-black leading-[0.9] tracking-tight text-tynec-black"
                style={{ fontSize: 'clamp(2.35rem, 5.2vw, 3.8rem)' }}
              >
                9.–10.
                <br />
                října 2026
              </p>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-tynec-black/75 md:text-lg">
                Váš hlas rozhoduje o tom, jak bude obec vypadat v příštích letech.
              </p>
              <p className="mt-7 max-w-xs text-sm leading-relaxed text-tynec-gray">
                Komunál má vyhovět všednímu životu všech sousedicích generací — ne hluku velké politiky v
                televizi.
              </p>
            </aside>
          </div>
        </section>

        <SupportHelpCardsSection />
      </div>
    </div>
  );
}
