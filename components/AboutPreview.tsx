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
    <section className="border-t border-gray-100 bg-white section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-14 text-center md:mb-20">
          <h2 className="mb-6 text-h2-mobile font-bold uppercase text-tynec-black md:text-h2-desktop">
            Srdcem Pro Velký Týnec
          </h2>
          <div className="mx-auto mb-10 h-1 w-20 bg-gray-300" />
          <p className="mx-auto max-w-3xl text-tynec-black/80 md:text-xl">
            Jsme sdružení nezávislých kandidátů a aktivních občanů. Naším cílem není politikaření,
            ale koncepční rozvoj Velkého Týnce, Vsiska a Čechovic. Známe historii naší obce,
            vážíme si jejich dominant a chceme tvořit její budoucnost.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-8 transition-colors duration-300 hover:border-gray-200"
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
