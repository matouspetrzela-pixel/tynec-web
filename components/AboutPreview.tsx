import React from 'react';

export const AboutPreview: React.FC = () => {
  const pillars = [
    {
      title: 'Tradice',
      description: 'Podpora folklóru, hodů a spolkového života, který dělá naši obec živou a jedinečnou.',
    },
    {
      title: 'Rozvoj',
      description: 'Moderní infrastruktura, oprava chodníků a péče o veřejná prostranství s důrazem na estetiku.',
    },
    {
      title: 'Otevřenost',
      description: 'Radnice, která komunikuje s občany, naslouchá jejich potřebám a hospodaří transparentně.',
    },
    {
      title: 'Vize 2026',
      description: 'Dlouhodobá koncepce rozvoje obce s ohledem na budoucí generace a udržitelnost.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-h2-mobile md:text-h2-desktop font-bold uppercase mb-6">
            <span className="text-tynec-black">Srdcem pro </span>
            <span className="text-tynec-red">Týnec</span>
          </h2>
          <div className="w-24 h-1 bg-tynec-red mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-tynec-gray max-w-3xl mx-auto leading-relaxed">
            Jsme sdružení nezávislých kandidátů a aktivních občanů. Naším cílem není politikaření,
            ale koncepční rozvoj Velkého Týnce, Vsiska a Čechovic. Známe historii naší obce,
            vážíme si jejich dominant a chceme tvořit její budoucnost.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 hover:border-tynec-red transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-xl md:text-2xl font-bold text-tynec-black uppercase mb-4">
                {pillar.title}
              </h3>
              <p className="text-sm md:text-base text-tynec-gray leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
