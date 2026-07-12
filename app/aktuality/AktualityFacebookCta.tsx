"use client";

import { TrackedFacebookOutbound } from "@/components/CampaignMeasuredLinks";
import { FACEBOOK_URL } from "@/lib/social";

export function AktualityFacebookCta() {
  return (
    <div className="mt-16 rounded-2xl border border-gray-100 bg-white p-8 text-center md:p-12">
      <h2 className="type-h3 mb-4">
        Sledujte nás na Facebooku
      </h2>
      <p className="mb-8 text-tynec-black/75">
        Nejrychlejší zprávy a sdílení najdete na našem facebookovém profilu.
      </p>
      <TrackedFacebookOutbound
        href={FACEBOOK_URL}
        placement="aktuality_facebook_cta"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary-solid"
      >
        Otevřít Facebook
      </TrackedFacebookOutbound>
    </div>
  );
}
