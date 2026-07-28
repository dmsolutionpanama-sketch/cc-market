import React, { useState, useMemo } from 'react';
import { Header, SectionType } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { AdvancedFilters } from './components/AdvancedFilters';
import { PartnersBanner } from './components/PartnersBanner';
import { TrendingCreatorsSection } from './components/TrendingCreatorsSection';
import { TopRankingSection } from './components/TopRankingSection';
import { NewsSection } from './components/NewsSection';
import { CreatorCard } from './components/CreatorCard';
import { CreatorDetailModal } from './components/CreatorDetailModal';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { ShortlistModal } from './components/ShortlistModal';
import { creatorsMockData } from './data/creators';
import { Creator, FilterState, LanguageCode } from './types';
import { Search, Sparkles, FilterX, ShieldCheck, Lock, Eye, TrendingUp, Newspaper, Award, Building2 } from 'lucide-react';
import { translations } from './data/translations';
import { sanitizeInput } from './utils/security';

const initialFilterState: FilterState = {
  searchQuery: '',
  platform: 'All',
  category: 'All',
  acvRange: 'All',
  followersRange: 'All',
  marketValueRange: 'All',
  country: 'All',
  ageRange: 'All',
  verifiedOnly: false,
  sortBy: 'marketValue',
  sortOrder: 'desc',
};

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('es');
  const t = translations[lang] || translations.es;

  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isListRevealed, setIsListRevealed] = useState(false);
  
  // Active Section for In-Page Navigation (_self)
  const [activeSection, setActiveSection] = useState<SectionType>('catalog');

  // Modals & Drawers state
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [shortlist, setShortlist] = useState<Creator[]>([]);
  const [comparisonList, setComparisonList] = useState<Creator[]>([]);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isServiceRequestOpen, setIsServiceRequestOpen] = useState(false);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim() !== '') count++;
    if (filters.platform !== 'All') count++;
    if (filters.category !== 'All') count++;
    if (filters.acvRange !== 'All') count++;
    if (filters.followersRange !== 'All') count++;
    if (filters.marketValueRange !== 'All') count++;
    if (filters.country !== 'All') count++;
    if (filters.ageRange && filters.ageRange !== 'All') count++;
    if (filters.verifiedOnly) count++;
    return count;
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    // Sanitize search query string if present
    if (newFilters.searchQuery !== undefined) {
      newFilters.searchQuery = sanitizeInput(newFilters.searchQuery, 100);
    }
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setIsListRevealed(false);
  };

  // Filter and Sort creators logic
  const filteredCreators = useMemo(() => {
    return creatorsMockData.filter((creator) => {
      // Search query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const nameMatch = creator.name.toLowerCase().includes(query);
        const handleMatch = creator.handle.toLowerCase().includes(query);
        const categoryMatch = creator.category.toLowerCase().includes(query);
        const platformMatch = creator.primaryPlatform.toLowerCase().includes(query);
        const countryMatch = creator.country.toLowerCase().includes(query);
        const tagsMatch = creator.tags.some((t) => t.toLowerCase().includes(query));

        if (!nameMatch && !handleMatch && !categoryMatch && !platformMatch && !countryMatch && !tagsMatch) {
          return false;
        }
      }

      // Platform
      if (filters.platform !== 'All') {
        const hasPlatform = creator.primaryPlatform === filters.platform ||
          creator.platforms.some((p) => p.platform === filters.platform);
        if (!hasPlatform) return false;
      }

      // Category
      if (filters.category !== 'All' && creator.category !== filters.category) {
        return false;
      }

      // Age Range
      if (filters.ageRange && filters.ageRange !== 'All' && creator.ageRange !== filters.ageRange) {
        return false;
      }

      // ACV Range
      if (filters.acvRange !== 'All') {
        if (filters.acvRange === '0-1k' && creator.acv >= 1000) return false;
        if (filters.acvRange === '1k-5k' && (creator.acv < 1000 || creator.acv >= 5000)) return false;
        if (filters.acvRange === '5k-20k' && (creator.acv < 5000 || creator.acv >= 20000)) return false;
        if (filters.acvRange === '20k-50k' && (creator.acv < 20000 || creator.acv >= 50000)) return false;
        if (filters.acvRange === '50k+' && creator.acv < 50000) return false;
      }

      // Followers Range
      if (filters.followersRange !== 'All') {
        const f = creator.totalFollowers;
        if (filters.followersRange === '<100k' && f >= 100000) return false;
        if (filters.followersRange === '100k-500k' && (f < 100000 || f >= 500000)) return false;
        if (filters.followersRange === '500k-2M' && (f < 500000 || f >= 2000000)) return false;
        if (filters.followersRange === '2M-10M' && (f < 2000000 || f >= 10000000)) return false;
        if (filters.followersRange === '10M+' && f < 10000000) return false;
      }

      // Market Value Range
      if (filters.marketValueRange !== 'All') {
        const mv = creator.marketValueEur;
        if (filters.marketValueRange === '<100k' && mv >= 100000) return false;
        if (filters.marketValueRange === '100k-1M' && (mv < 100000 || mv >= 1000000)) return false;
        if (filters.marketValueRange === '1M-5M' && (mv < 1000000 || mv >= 5000000)) return false;
        if (filters.marketValueRange === '5M+' && mv < 5000000) return false;
      }

      // Country
      if (filters.country !== 'All' && creator.country !== filters.country) {
        return false;
      }

      // Verified Only
      if (filters.verifiedOnly && !creator.verified) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'marketValue') {
        return b.marketValueEur - a.marketValueEur;
      }
      if (filters.sortBy === 'acv') {
        return b.acv - a.acv;
      }
      if (filters.sortBy === 'followers') {
        return b.totalFollowers - a.totalFollowers;
      }
      if (filters.sortBy === 'engagement') {
        return b.engagementRate - a.engagementRate;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filters]);

  // Shortlist handlers
  const handleToggleShortlist = (creator: Creator) => {
    setShortlist((prev) => {
      const exists = prev.some((c) => c.id === creator.id);
      if (exists) {
        return prev.filter((c) => c.id !== creator.id);
      } else {
        return [...prev, creator];
      }
    });
  };

  // Compare handlers (max 3)
  const handleToggleCompare = (creator: Creator) => {
    setComparisonList((prev) => {
      const exists = prev.some((c) => c.id === creator.id);
      if (exists) {
        return prev.filter((c) => c.id !== creator.id);
      } else {
        if (prev.length >= 3) {
          alert("Puedes comparar un máximo de 3 creadores simultáneamente.");
          return prev;
        }
        return [...prev, creator];
      }
    });
  };

  // Should show main catalog grid?
  const shouldDisplayList = isListRevealed || filters.searchQuery.trim() !== '' || activeFilterCount > 0;

  const handleSelectCreatorByName = (name: string) => {
    const found = creatorsMockData.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setSelectedCreator(found);
    } else {
      handleFilterChange({ searchQuery: name });
      setIsListRevealed(true);
    }
  };

  // Render Catalog Content Block
  const renderCatalogContent = () => (
    <div>
      {/* Results Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-300">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Catálogo de Creadores Auditados</span>
            {shouldDisplayList && (
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                {filteredCreators.length} resultados
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Métricas de audiencia en vivo, engagement verificado y semáforo de cumplimiento comercial.
          </p>
        </div>

        {shouldDisplayList && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Ordenar por:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="marketValue">Mayor Valor de Mercado (€)</option>
              <option value="acv">Mayor Audiencia Media (ACV)</option>
              <option value="followers">Seguidores Totales</option>
              <option value="engagement">Engagement Rate (%)</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        )}
      </div>

      {/* Hidden List Locked Prompt or Active Grid */}
      {!shouldDisplayList ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 shadow-xs">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-inner border border-slate-200">
            <Lock className="w-10 h-10" />
          </div>

          <h3 className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
            Listado de Creadores Oculto
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
            Escribe el nombre de un creador en el buscador o activa la exploración completa para ver todos los perfiles auditados.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsListRevealed(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 border border-slate-300"
            >
              <Eye className="w-4 h-4" />
              <span>{t.exploreAll} ({creatorsMockData.length} Creadores)</span>
            </button>
          </div>
        </div>
      ) : filteredCreators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onViewDetails={(c) => setSelectedCreator(c)}
              onToggleShortlist={handleToggleShortlist}
              isShortlisted={shortlist.some((s) => s.id === creator.id)}
              onToggleCompare={handleToggleCompare}
              isCompared={comparisonList.some((c) => c.id === creator.id)}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-300 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-200">
            <FilterX className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">No se encontraron creadores</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            No hay resultados que coincidan exactamente con tu búsqueda. Prueba con otros filtros o explora la lista completa.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 px-4 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Header with Navigation Menu (_self Navigation) */}
      <Header
        shortlist={shortlist}
        comparisonList={comparisonList}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenServiceRequest={() => setIsServiceRequestOpen(true)}
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onLangChange={setLang}
        totalCreatorsCount={creatorsMockData.length}
      />

      {/* Main Container - Renders Active Section Inline (_self Page View) */}
      <main className="flex-1 flex flex-col">
        
        {/* Search Engine & Filters (Visible on Catalog and Trending views) */}
        {(activeSection === 'catalog' || activeSection === 'trending') && (
          <>
            <HeroSearch
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              showAdvancedFilters={showAdvancedFilters}
              onToggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
              activeFilterCount={activeFilterCount}
              totalResults={filteredCreators.length}
              isListRevealed={isListRevealed}
              onRevealListToggle={() => setIsListRevealed(!isListRevealed)}
              lang={lang}
            />

            <AdvancedFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              isOpen={showAdvancedFilters}
              lang={lang}
            />
          </>
        )}

        {/* Section View Routing (_self) */}
        <div className="flex-1">
          {activeSection === 'catalog' && (
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderCatalogContent()}
            </div>
          )}

          {activeSection === 'trending' && (
            <TrendingCreatorsSection
              creators={creatorsMockData}
              onSelectCreator={(c) => setSelectedCreator(c)}
              lang={lang}
            />
          )}

          {activeSection === 'news' && (
            <NewsSection
              lang={lang}
              onSelectCreatorByName={(name) => handleSelectCreatorByName(name)}
            />
          )}

          {activeSection === 'ranking' && (
            <TopRankingSection
              creators={creatorsMockData}
              onSelectCreator={(c) => setSelectedCreator(c)}
              lang={lang}
            />
          )}

          {activeSection === 'partners' && (
            <div className="py-12 bg-white">
              <PartnersBanner lang={lang} />
            </div>
          )}
        </div>
      </main>

      {/* Creator Detail Modal */}
      <CreatorDetailModal
        creator={selectedCreator}
        onClose={() => setSelectedCreator(null)}
        onToggleShortlist={handleToggleShortlist}
        isShortlisted={selectedCreator ? shortlist.some((s) => s.id === selectedCreator.id) : false}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedCreator ? comparisonList.some((c) => c.id === selectedCreator.id) : false}
        lang={lang}
        onOpenServiceRequest={() => setIsServiceRequestOpen(true)}
      />

      {/* Service Request & Call Center Modal */}
      <ServiceRequestModal
        isOpen={isServiceRequestOpen}
        onClose={() => setIsServiceRequestOpen(false)}
        lang={lang}
      />

      {/* Comparison Drawer Modal */}
      <ComparisonDrawer
        creators={comparisonList}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onRemoveFromCompare={(id) => setComparisonList((prev) => prev.filter((c) => c.id !== id))}
        onClearComparison={() => setComparisonList([])}
        onViewDetails={(c) => setSelectedCreator(c)}
      />

      {/* Shortlist Modal */}
      <ShortlistModal
        shortlist={shortlist}
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
        onRemoveFromShortlist={(id) => setShortlist((prev) => prev.filter((c) => c.id !== id))}
        onClearShortlist={() => setShortlist([])}
      />

      {/* Security Protection Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-300 py-10 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-xl shadow-md border border-blue-500">
              CC
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base">CC-Market 2026</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Plataforma de valoración, métricas y contratación de creadores de contenido.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Seguridad Verificada: Protección contra XSS, sanitización de datos & encriptación SSL.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-700 font-bold flex-wrap justify-center">
            <button onClick={() => { setActiveSection('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">Catálogo</button>
            <button onClick={() => { setActiveSection('trending'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">Virales & Redes</button>
            <button onClick={() => { setActiveSection('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">Noticias</button>
            <button onClick={() => { setActiveSection('ranking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">Líderes</button>
            <button onClick={() => { setActiveSection('partners'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">Patrocinadores</button>
          </div>
        </div>
      </footer>

    </div>
  );
}

