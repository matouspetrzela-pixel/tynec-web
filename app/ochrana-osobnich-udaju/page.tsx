import type { Metadata } from 'next';
import Link from 'next/link';
import { PageSectionHeader } from '@/components/PageSectionHeader';
import { EMAIL } from '@/lib/social';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů',
  description:
    'Informace o zpracování osobních údajů a cookies na webu Pro Týnec srdcem.',
  alternates: {
    canonical: '/ochrana-osobnich-udaju',
  },
};

export default function OchranaOsobnichUdajuPage() {
  return (
    <div className="pb-20 pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <PageSectionHeader
          className="mb-10"
          eyebrow="Právní informace"
          title="Ochrana osobních údajů"
        />

        <div className="space-y-8 text-base leading-relaxed text-tynec-black/80">
          <section className="space-y-3">
            <h2 className="type-h3 text-tynec-black">Správce údajů</h2>
            <p>
              Správcem osobních údajů zpracovávaných prostřednictvím webu{' '}
              <a
                href={SITE_URL}
                className="font-medium text-tynec-black underline underline-offset-2 hover:text-primary"
              >
                {SITE_URL.replace('https://', '')}
              </a>{' '}
              je politické hnutí Pro Týnec srdcem.
            </p>
            <p>
              Kontakt:{' '}
              <a
                href={`mailto:${EMAIL}`}
                className="font-medium text-tynec-black underline underline-offset-2 hover:text-primary"
              >
                {EMAIL}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-tynec-black">Jaké údaje zpracováváme</h2>
            <p>
              Web slouží především k informování o kampani. Pokud nás kontaktujete
              e-mailem, zpracujeme údaje, které nám sami pošlete (zejména e-mailovou
              adresu a obsah zprávy), abychom mohli odpovědět.
            </p>
            <p>
              Na webu neprovozujeme uživatelské účty ani formuláře, které by
              vyžadovaly registraci.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-tynec-black">Cookies a Google Analytics</h2>
            <p>
              Po vašem souhlasu používáme službu Google Analytics 4 (Google Ireland
              Limited / Google LLC) k anonymnímu měření návštěvnosti webu — například
              počet zobrazení stránek a odkud návštěvníci přicházejí. Účelem je
              zlepšovat srozumitelnost a dosah kampaně.
            </p>
            <p>
              Bez souhlasu se analytické cookies neukládají a měření neběží. Svůj
              dříve udělený souhlas můžete změnit smazáním dat webu v prohlížeči
              (localStorage) a opětovným výběrem v liště, nebo nám napište na
              kontaktní e-mail.
            </p>
            <p>
              Právní základ pro analytické cookies je váš souhlas (čl. 6 odst. 1
              písm. a GDPR). Souhlas můžete kdykoli odvolat, aniž by to ovlivnilo
              zákonnost zpracování před odvoláním.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-tynec-black">Doba uchování</h2>
            <p>
              E-mailovou komunikaci uchováváme jen po dobu nutnou k vyřízení
              požadavku. Údaje z Google Analytics se řídí nastavením retenční doby
              ve službě Google Analytics (zpravidla v řádu měsíců).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-tynec-black">Vaše práva</h2>
            <p>
              Máte právo na přístup k údajům, jejich opravu či výmaz, omezení
              zpracování, námitku proti zpracování a na podání stížnosti u Úřadu
              pro ochranu osobních údajů (
              <a
                href="https://www.uoou.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-tynec-black underline underline-offset-2 hover:text-primary"
              >
                uoou.cz
              </a>
              ).
            </p>
          </section>

          <p className="text-sm text-tynec-black/55">
            Poslední aktualizace: 30. 7. 2026. ·{' '}
            <Link
              href="/"
              className="underline underline-offset-2 hover:text-tynec-black"
            >
              Zpět na úvod
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
