import React from 'react';

interface CandidateCardProps {
  name?: string;
  role?: string;
  age?: string;
  photo?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  name = 'Jméno Příjmení',
  role = 'Profese',
  age = 'XX let',
  photo,
}) => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden hover:border-tynec-red hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
      {/* Photo Placeholder */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">Foto kandidáta</span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-bold text-tynec-black mb-1">
          {name}
        </h3>
        <p className="text-sm text-tynec-gray">
          {role}, {age}
        </p>
      </div>
    </div>
  );
};
