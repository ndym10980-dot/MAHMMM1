import React from 'react';
import { HistoricalEntity } from '../types';

interface DetailModalProps {
  entity: HistoricalEntity;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ entity, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-islamic-dark/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-[#fdf6e3] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border-4 border-double border-islamic-gold/40 animate-[fadeIn_0.3s_ease-out]">
        
        {/* Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-arabesque mix-blend-multiply"></div>

        {/* Decorative Header */}
        <div className="sticky top-0 z-10 bg-[#fdf6e3] border-b border-islamic-gold/20 pb-4 pt-6 px-8 flex justify-between items-start shadow-sm">
           <div className="flex-1">
             <span className="text-islamic-gold font-kufi text-sm tracking-widest block mb-1">
                {entity.category === 'PROPHETS' ? 'من قصص الأنبياء' : 
                 entity.category === 'SAHABA' ? 'من سير الصحابة' : 
                 entity.category === 'BATTLES' ? 'من أيام الله' : 'من سير الأعلام'}
             </span>
             <h2 className="text-4xl font-kufi font-bold text-islamic-dark drop-shadow-sm">{entity.name}</h2>
           </div>
           <button 
             onClick={onClose}
             className="mr-4 text-islamic-dark/50 hover:text-islamic-gold transition-colors p-2 hover:bg-islamic-gold/10 rounded-full"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 relative z-0">
          
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Quick Stats Card */}
            <div className="w-full md:w-1/3 bg-white/50 border border-islamic-gold/20 rounded-lg p-6 h-fit">
               <div className="mb-6">
                 <h4 className="font-kufi text-islamic-gold mb-2 text-lg">التاريخ</h4>
                 <p className="font-serif text-xl text-islamic-dark font-bold">{entity.dates}</p>
               </div>
               <div>
                 <h4 className="font-kufi text-islamic-gold mb-2 text-lg">المكانة</h4>
                 <p className="font-serif text-lg text-gray-700 leading-relaxed">{entity.significance}</p>
               </div>
            </div>

            {/* Main Description */}
            <div className="w-full md:w-2/3">
              <h3 className="font-kufi text-2xl text-islamic-dark mb-4 border-b-2 border-islamic-gold/20 pb-2 inline-block">السيرة والقصة</h3>
              <p className="font-serif text-xl text-gray-800 leading-10 text-justify whitespace-pre-line">
                {entity.fullDescription}
              </p>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-islamic-primary/5 rounded-2xl p-8 border border-islamic-primary/10">
            <h3 className="font-kufi text-2xl text-islamic-dark mb-6 flex items-center gap-3">
              <span className="text-3xl">✨</span>
              <span>أبرز المناقب والأحداث</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entity.achievements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-islamic-gold/10 hover:border-islamic-gold/40 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 bg-islamic-dark text-islamic-gold rounded-full flex items-center justify-center font-bold font-serif shadow-md border border-islamic-gold">
                    {idx + 1}
                  </span>
                  <span className="font-serif text-lg text-gray-800 pt-1">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Footer Decoration */}
        <div className="h-4 bg-gradient-to-r from-islamic-dark via-islamic-gold to-islamic-dark"></div>
      </div>
    </div>
  );
};
