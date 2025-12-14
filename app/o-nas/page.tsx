import React from 'react';

export default function ONasPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-h1-mobile md:text-h1-desktop font-bold uppercase mb-6">
            <span className="text-tynec-black">O </span>
            <span className="text-tynec-red">nás</span>
          </h1>
          <div className="w-24 h-1 bg-tynec-red mx-auto"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg md:text-xl text-tynec-gray leading-relaxed">
              Jsme sdružení nezávislých kandidátů a aktivních občanů, kteří spojuje láska k Velkému Týnci,
              Vsisku a Čechovicím. Naším cílem není politikaření, ale koncepční rozvoj naší obce
              s respektem k tradici a historii.
            </p>

            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-tynec-black uppercase mt-12 mb-6">
              Naše hodnoty
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="p-6 border border-gray-200">
                <h3 className="text-h3-mobile md:text-h3-desktop font-bold text-tynec-black uppercase mb-4">
                  Tradice
                </h3>
                <p className="text-tynec-gray">
                  Podpora folklóru, hodů a spolkového života, který dělá naši obec živou a jedinečnou.
                  Respektujeme historii a identity jednotlivých částí obce.
                </p>
              </div>

              <div className="p-6 border border-gray-200">
                <h3 className="text-h3-mobile md:text-h3-desktop font-bold text-tynec-black uppercase mb-4">
                  Rozvoj
                </h3>
                <p className="text-tynec-gray">
                  Moderní infrastruktura, oprava chodníků a péče o veřejná prostranství s důrazem na estetiku
                  a kvalitu života obyvatel.
                </p>
              </div>

              <div className="p-6 border border-gray-200">
                <h3 className="text-h3-mobile md:text-h3-desktop font-bold text-tynec-black uppercase mb-4">
                  Otevřenost
                </h3>
                <p className="text-tynec-gray">
                  Radnice, která komunikuje s občany, naslouchá jejich potřebám a hospodaří transparentně
                  s veřejnými financemi.
                </p>
              </div>

              <div className="p-6 border border-gray-200">
                <h3 className="text-h3-mobile md:text-h3-desktop font-bold text-tynec-black uppercase mb-4">
                  Vize 2026
                </h3>
                <p className="text-tynec-gray">
                  Dlouhodobá koncepce rozvoje obce s ohledem na budoucí generace, udržitelnost
                  a kvalitu života všech obyvatel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
