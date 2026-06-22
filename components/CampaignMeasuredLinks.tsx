"use client";

import Link from "next/link";
import React from "react";
import { GA_EVENTS, sendGaEvent } from "@/lib/analytics";

/** Umístění CTA — zobrazí se jako parametr `placement` v GA4 / Explorations. */
export type MeasurementPlacement =
  | "header_desktop"
  | "header_mobile"
  | "footer_facebook"
  | "footer_email"
  | "footer_podporte_nav"
  | "hero_facebook_strip"
  | "podporte_intro_facebook"
  | "podporte_intro_email"
  | "podporte_help_card"
  | "program_page_cta"
  | "kandidat_detail_cta"
  | "aktuality_facebook_cta"
  | "home_campaign_journey"
  | "home_campaign_journey_podporte";

type PodporteProps = {
  placement: MeasurementPlacement | string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function TrackedPodporteLink({
  placement,
  className,
  children,
  onClick,
}: PodporteProps) {
  return (
    <Link
      href="/podporte-nas"
      className={className}
      onClick={(event) => {
        sendGaEvent(GA_EVENTS.CTA_PODPORTE, { placement });
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

type OutboundAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placement: MeasurementPlacement | string;
  href: string;
};

export function TrackedFacebookOutbound({
  placement,
  href,
  className,
  children,
  onClick,
  ...rest
}: OutboundAnchorProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        sendGaEvent(GA_EVENTS.CTA_FACEBOOK, { placement });
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function TrackedEmailOutbound({
  placement,
  href,
  className,
  children,
  onClick,
  ...rest
}: OutboundAnchorProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        sendGaEvent(GA_EVENTS.CTA_EMAIL, { placement });
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

type HeroNavProps = {
  href: string;
  /** Cesta jako textový štítek (např. /program) pro filtrování v GA4. */
  link_path: string;
  className?: string;
  children: React.ReactNode;
};

export function TrackedHeroNavLink({
  href,
  link_path,
  className,
  children,
}: HeroNavProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        sendGaEvent(GA_EVENTS.CTA_HERO_LINK, { link_path })
      }
    >
      {children}
    </Link>
  );
}
