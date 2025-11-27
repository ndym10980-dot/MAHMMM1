import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { EntityCard } from './components/EntityCard';
import { DetailModal } from './components/DetailModal';
import { CategoryType, HistoricalEntity } from './types';
import { DATA_LIBRARY } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(CategoryType.PROPHETS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<HistoricalEntity | null>(null);

  // Filter Data
  const filteredData = DATA_LIBRARY.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.includes(searchQuery) || item.shortDesc.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleEntityClick = (entity: HistoricalEntity) => {
    setSelectedEntity(entity);
  };

  return (
    <div className="min-h-screen flex bg-[#fdf6e3]">
      
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-arabesque opacity-5 pointer-events-none z-0"></div>

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-islamic-gold/30 px-6 py-4 flex items-center justify-between shadow-sm z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-islamic-dark hover:bg-islamic-gold/10 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-2xl md:text-3xl font-kufi font-bold text-islamic-dark hidden sm:block">
              {activeCategory === CategoryType.PROPHETS && 'قصص الأنبياء والرسل'}
              {activeCategory === CategoryType.SAHABA && 'سير الصحابة الكرام'}
              {activeCategory === CategoryType.BATTLES && 'أيام الله: الغزوات'}
              {activeCategory === CategoryType.SCHOLARS && 'أعلام الهدى ومصابيح الدجى'}
            </h2>
          </div>

          <div className="relative w-full max-w-md mr-4">
            <input 
              type="text"
              placeholder="ابحث في الموسوعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 rounded-full border-2 border-islamic-gold/20 bg-white/50 focus:bg-white focus:border-islamic-gold focus:ring-4 focus:ring-islamic-gold/10 outline-none transition-all font-serif placeholder-gray-400"
            />
            <div className="absolute left-4 top-3 text-islamic-gold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Category Description Banner */}
            <div className="mb-10 bg-gradient-to-l from-islamic-dark to-islamic-primary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-arabesque opacity-10"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-kufi font-bold mb-4 text-islamic-gold">
                         {activeCategory === CategoryType.PROPHETS && 'خير من وطأ الثرى'}
                         {activeCategory === CategoryType.SAHABA && 'جيل القرآن الفريد'}
                         {activeCategory === CategoryType.BATTLES && 'فتوحات غيرت مجرى التاريخ'}
                         {activeCategory === CategoryType.SCHOLARS && 'ورثة الأنبياء'}
                    </h1>
                    <p className="text-lg opacity-90 font-serif leading-relaxed max-w-3xl">
                        {activeCategory === CategoryType.PROPHETS && 'استكشف قصص الأنبياء والمرسلين، وكيف واجهوا الصعاب لتبليغ رسالة التوحيد للبشرية جمعاء.'}
                        {activeCategory === CategoryType.SAHABA && 'تعرف على سير الرجال والنساء الذين حملوا الأمانة بعد رسول الله صلى الله عليه وسلم ونشروا النور في الآفاق.'}
                        {activeCategory === CategoryType.BATTLES && 'تاريخ المعارك الفاصلة التي أعز الله بها الإسلام ورسخ بها دعائم الدولة الإسلامية.'}
                        {activeCategory === CategoryType.SCHOLARS && 'سير العلماء الأجلاء الذين حفظوا الدين ودونوا العلوم وأفنوا أعمارهم في خدمة الشريعة.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredData.map((entity) => (
                <EntityCard 
                  key={entity.id} 
                  entity={entity} 
                  onClick={() => handleEntityClick(entity)}
                />
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-60">
                <div className="text-6xl mb-4 grayscale">📜</div>
                <p className="text-2xl text-islamic-dark font-kufi">لا توجد نتائج في هذا القسم</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-islamic-gold hover:text-islamic-dark underline underline-offset-4 transition-colors font-serif"
                >
                  عرض جميع المحتويات
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedEntity && (
        <DetailModal 
          entity={selectedEntity} 
          onClose={() => setSelectedEntity(null)}
        />
      )}
    </div>
  );
};

export default App;
