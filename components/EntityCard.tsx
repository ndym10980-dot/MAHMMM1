import React from 'react';
import { HistoricalEntity } from '../types';

interface EntityCardProps {
  entity: HistoricalEntity;
  onClick: () => void;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#fefcf5] rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl border border-[#e5d0ac]"
    >
      {/* Ornate Frame Effect */}
      <div className="absolute inset-1 border border-[#e5d0ac] border-opacity-50 rounded-lg pointer-events-none m-1"></div>
      
      {/* Header Pattern */}
      <div className="h-24 bg-islamic-dark relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-arabesque bg-repeat"></div>
        <div className="z-10 w-14 h-14 bg-islamic-base rounded-full border-2 border-islamic-gold flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 text-islamic-dark">
          {entity.category === 'PROPHETS' && '🕌'}
          {entity.category === 'SAHABA' && '✨'}
          {entity.category === 'BATTLES' && '⚔️'}
          {entity.category === 'SCHOLARS' && '📜'}
        </div>
      </div>

      <div className="p-6 pt-8 text-center relative">
        <h3 className="text-2xl font-kufi font-bold text-islamic-dark mb-3 group-hover:text-islamic-gold transition-colors">
          {entity.name}
        </h3>
        
        <div className="w-16 h-1 bg-islamic-gold/30 mx-auto mb-4 rounded-full"></div>

        <p className="text-gray-600 text-sm leading-relaxed font-serif line-clamp-3 mb-6">
          {entity.shortDesc}
        </p>

        <button className="px-6 py-2 border border-islamic-gold text-islamic-gold font-kufi text-sm rounded-full hover:bg-islamic-gold hover:text-white transition-all duration-300">
          اقرأ السيرة
        </button>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-islamic-gold/40 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-islamic-gold/40 rounded-bl-lg"></div>
    </div>
  );
};
