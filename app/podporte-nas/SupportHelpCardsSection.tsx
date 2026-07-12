"use client";

import Link from "next/link";
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Megaphone, Share2, Users } from "lucide-react";
import {
  TrackedFacebookOutbound,
} from "@/components/CampaignMeasuredLinks";
import { GA_EVENTS, sendGaEvent } from "@/lib/analytics";
import { FACEBOOK_URL } from "@/lib/social";

type HelpCard = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  Icon: LucideIcon;
};

const HELP_CARDS: HelpCard[] = [
  {
    title: "Sledujte aktuality",
    body: "Buďte u dění v kampani a mějte přehled o konkrétních krocích pro Velký Týnec.",
    ctaLabel: "Přejít na Facebook",
    ctaHref: FACEBOOK_URL,
    Icon: Megaphone,
  },
  {
    title: "Sdílejte mezi sousedy",
    body: "Pomozte šířit informace dál. Každé doporučení mezi známými má velký dopad.",
    ctaLabel: "Naši kandidáti",
    ctaHref: "/kandidati",
    Icon: Share2,
  },
  {
    title: "Zapojte se osobně",
    body: "Zajímají nás vaše podněty. Přidejte svůj pohled k programu, který vzniká pro obec.",
    ctaLabel: "Volební program",
    ctaHref: "/program",
    Icon: Users,
  },
];

export function SupportHelpCardsSection() {
  return (
    <section className="surface-card mt-12 p-6 md:p-8">
      <div>
        <h2 className="text-h3-mobile font-bold uppercase tracking-tight text-tynec-black md:text-h3-desktop">
          Jak můžete pomoci
        </h2>
      </div>
      <div className="mt-7 grid divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {HELP_CARDS.map((item) => {
          const isExternal = item.ctaHref.startsWith("http");
          return (
            <article
              key={item.title}
              className="py-6 md:px-7 md:py-2 first:pt-0 last:pb-0 md:first:pl-0 md:first:pt-2 md:last:pr-0 md:last:pb-2"
            >
              <item.Icon className="h-6 w-6 text-primary" strokeWidth={2} aria-hidden />
              <h3 className="mt-4 text-base font-bold uppercase tracking-tight text-tynec-black">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-tynec-black/75">{item.body}</p>
              <div className="mt-5">
                {isExternal ? (
                  <TrackedFacebookOutbound
                    href={item.ctaHref}
                    placement="podporte_help_card"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold uppercase tracking-[0.1em] text-primary hover:text-primary-hover"
                  >
                    {item.ctaLabel}
                  </TrackedFacebookOutbound>
                ) : (
                  <Link
                    href={item.ctaHref}
                    className="text-sm font-semibold uppercase tracking-[0.1em] text-primary hover:text-primary-hover"
                    onClick={() =>
                      sendGaEvent(GA_EVENTS.SUPPORT_CARD_NAV, {
                        card_title: item.title,
                        link_path: item.ctaHref,
                      })
                    }
                  >
                    {item.ctaLabel}
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
