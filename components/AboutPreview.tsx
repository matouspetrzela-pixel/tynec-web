import React from 'react';

export const AboutPreview: React.FC = () => {
  const pillars = [
    {
      title: 'Tradice',
      description:
        'Podpora folklóru, hodů a spolkového života, který dělá naši obec živou a jedinečnou.',
    },
    {
      title: 'Rozvoj',
      description:
        'Moderní infrastruktura, oprava chodníků a péče o veřejná prostranství s důrazem na estetiku.',
    },
    {
      title: 'Otevřenost',
      description:
        'Radnice, která komunikuje s občany, naslouchá jejich potřebám a hospodaří transparentně.',
    },
    {
      title: 'Vize 2026',
      description:
        'Dlouhodobá koncepce rozvoje obce s ohledem na budoucí generace a udržitelnost.',
    },
  ];

  return (
    <section className="section-padding border-t border-slate-200/60 bg-white">
      <div className="container mx-auto max-w-6xl">

        {/* Citát s červenou dekorativní linkou */}
        <blockquote className="reveal mb-16 rounded-2xl border border-slate-200/70 bg-slate-50/40 py-8 pl-8 pr-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_18px_44px_-22px_rgba(15,23,42,0.08)] md:mb-20 md:pl-10 md:pr-8">
          <p
            className="border-l-[3px] border-primary pl-6 font-semibold italic leading-snug tracking-tight text-tynec-black"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 2.1rem)' }}
          >
            &bdquo;Nejde o politiku &mdash; jde o obec, ve které žijeme.&ldquo;
          </p>
          <cite className="mt-3 block text-sm font-medium not-italic text-tynec-gray">
            Pro Týnec srdcem, kandidátka 2026
          </cite>
        </blockquote>

        {/* Popis hnutí */}
        <div className="reveal mb-14 md:mb-20">
          <p className="w-full text-pretty text-lg leading-[1.65] text-tynec-black/85 md:text-xl">
            Jsme sdružení nezávislých kandidátů a aktivních občanů. Naším cílem není politikaření,
            ale koncepční rozvoj Velkého Týnce, Vsiska a Čechovic. Známe historii naší obce, vážíme
            si jejich dominant a chceme tvořit její budoucnost.
          </p>
        </div>

        {/* Pilíře s čísly */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="card-elevated reveal p-8"
            >
              <h3 className="mb-4 text-xl font-bold uppercase text-tynec-black md:text-2xl">
                {pillar.title}
              </h3>
              <p className="text-tynec-black/75">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
