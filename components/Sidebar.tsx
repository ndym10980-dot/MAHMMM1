import React from 'react';
import { CategoryType } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activeCategory: CategoryType;
  onSelectCategory: (id: CategoryType) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory, isOpen, onCloseMobile }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-islamic-dark/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 right-0 h-full w-72 bg-islamic-dark text-islamic-base z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) shadow-[0_0_40px_rgba(0,0,0,0.5)] border-l-4 border-islamic-gold
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:translate-x-0 md:static md:block
      `}>
        {/* Header */}
        <div className="p-8 border-b border-islamic-gold/20 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-arabesque opacity-10"></div>
          <div className="w-16 h-16 bg-islamic-gold rounded-full flex items-center justify-center text-3xl mb-4 shadow-[0_0_20px_rgba(217,119,6,0.4)] z-10">
            🕌
          </div>
          <h1 className="text-2xl font-kufi font-bold text-white z-10">الموسوعة الإسلامية</h1>
          <p className="text-xs text-islamic-gold mt-2 font-serif z-10 tracking-widest">التاريخ كما لم تره من قبل</p>
        </div>

        {/* Nav Items */}
        <nav className="p-6 space-y-3 relative z-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectCategory(item.id);
                onCloseMobile();
              }}
              className={`
                w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group border
                ${activeCategory === item.id 
                  ? 'bg-gradient-to-l from-islamic-gold to-amber-700 text-white shadow-lg border-transparent scale-105' 
                  : 'border-transparent hover:bg-white/5 text-gray-300 hover:text-white hover:border-white/10'}
              `}
            >
              <span className={`text-2xl transition-transform duration-300 ${activeCategory === item.id ? 'scale-125' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className={`font-kufi text-lg ${activeCategory === item.id ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              
              {activeCategory === item.id && (
                <div className="mr-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-8 text-center border-t border-islamic-gold/10 bg-black/20">
          <p className="text-islamic-gold/60 font-kufi text-sm">موسوعة التاريخ الإسلامي</p>
          <p className="text-xs text-gray-500 mt-1 font-serif">جميع الحقوق محفوظة © 2024</p>
        </div>
      </aside>
    </>
  );
};
