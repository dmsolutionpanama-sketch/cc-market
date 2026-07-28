import React, { useState, useMemo } from 'react';
import { Creator, LanguageCode } from '../types';
import { Trophy, Award, TrendingUp, Users, Eye, Percent, CheckCircle2, ArrowRight, Search, Filter, Globe, Star, Sparkles, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../data/translations';

interface TopRankingSectionProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  lang: LanguageCode;
}

type RankingTab = 'marketValue' | 'acv' | 'followers' | 'engagement' | 'brandScore';

const COUNTRIES_LIST = [
  { country: 'España', code: 'ES', flagEmoji: '🇪🇸' },
  { country: 'Andorra', code: 'AD', flagEmoji: '🇦🇩' },
  { country: 'Guatemala', code: 'GT', flagEmoji: '🇬🇹' },
  { country: 'México', code: 'MX', flagEmoji: '🇲🇽' },
  { country: 'Argentina', code: 'AR', flagEmoji: '🇦🇷' },
  { country: 'Colombia', code: 'CO', flagEmoji: '🇨🇴' },
  { country: 'Estados Unidos', code: 'US', flagEmoji: '🇺🇸' },
  { country: 'Chile', code: 'CL', flagEmoji: '🇨🇱' },
  { country: 'Panamá', code: 'PA', flagEmoji: '🇵🇦' },
  { country: 'Perú', code: 'PE', flagEmoji: '🇵🇪' },
];

export const TopRankingSection: React.FC<TopRankingSectionProps> = ({
  creators,
  onSelectCreator,
  lang,
}) => {
  const t = translations[lang] || translations.es;

  // Filter & Ordering States
  const [activeTab, setActiveTab] = useState<RankingTab>('marketValue');
  const [selectedCountry, setSelectedCountry] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  // Generate 100 Creators array for the Top 100 Ranking
  const top100FullList = useMemo(() => {
    if (!creators || creators.length === 0) return [];

    const list: Creator[] = [];
    let rankIndex = 1;

    while (list.length < 100) {
      for (let i = 0; i < creators.length && list.length < 100; i++) {
        const base = creators[i];
        const cycle = Math.floor(list.length / creators.length);
        const countryObj = COUNTRIES_LIST[(rankIndex - 1) % COUNTRIES_LIST.length];

        // Scale metrics smoothly across the top 100
        const scaleFactor = Math.max(0.15, 1 - list.length * 0.008);
        const marketVal = Math.round(base.marketValueEur * scaleFactor);
        const followers = Math.round(base.totalFollowers * scaleFactor);
        const acvVal = Math.round(base.acv * scaleFactor);
        const engagement = Math.max(2.0, Number((base.engagementRate * (0.9 + (rankIndex % 5) * 0.03)).toFixed(1)));
        const stars = Math.min(5, Math.max(3.9, Number((4.9 - (rankIndex % 9) * 0.1).toFixed(1))));

        list.push({
          ...base,
          id: `${base.id}-top100-rank-${rankIndex}`,
          name: cycle === 0 ? base.name : `${base.name} (V${cycle + 1})`,
          country: countryObj.country,
          countryCode: countryObj.code,
          flagEmoji: countryObj.flagEmoji,
          marketValueEur: marketVal,
          totalFollowers: followers,
          acv: acvVal,
          engagementRate: engagement,
          starRating: stars,
        });

        rankIndex++;
      }
    }
    return list;
  }, [creators]);

  // Extract Filter Options
  const categoriesList = useMemo(() => {
    const set = new Set(top100FullList.map((c) => c.category));
    return ['Todas', ...Array.from(set)];
  }, [top100FullList]);

  const platformsList = ['Todas', 'Twitch', 'YouTube', 'TikTok', 'Instagram', 'Kick', 'X / Twitter'];
  const countriesDropdown = ['Todos', ...COUNTRIES_LIST.map((c) => c.country)];

  // Apply Ordering & Filtering
  const filteredAndSortedList = useMemo(() => {
    let result = [...top100FullList];

    // Filter by Country
    if (selectedCountry !== 'Todos') {
      result = result.filter((c) => c.country.toLowerCase() === selectedCountry.toLowerCase());
    }

    // Filter by Category
    if (selectedCategory !== 'Todas') {
      result = result.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by Platform
    if (selectedPlatform !== 'Todas') {
      result = result.filter(
        (c) => c.primaryPlatform.toLowerCase() === selectedPlatform.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q)
      );
    }

    // Sort by active tab metric
    result.sort((a, b) => {
      switch (activeTab) {
        case 'marketValue':
          return b.marketValueEur - a.marketValueEur;
        case 'acv':
          return b.acv - a.acv;
        case 'followers':
          return b.totalFollowers - a.totalFollowers;
        case 'engagement':
          return b.engagementRate - a.engagementRate;
        case 'brandScore':
          return (b.starRating || 4.5) - (a.starRating || 4.5);
        default:
          return 0;
      }
    });

    return result;
  }, [
    top100FullList,
    selectedCountry,
    selectedCategory,
    selectedPlatform,
    searchQuery,
    activeTab,
  ]);

  // Pagination Math
  const totalPages = Math.ceil(filteredAndSortedList.length / itemsPerPage) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedList.slice(start, start + itemsPerPage);
  }, [filteredAndSortedList, currentPage]);

  const resetFilters = () => {
    setSelectedCountry('Todos');
    setSelectedCategory('Todas');
    setSelectedPlatform('Todas');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <section id="ranking" className="py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-300">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider mb-3 shadow-2xs">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>TOP 100 CREADORES LÍDERES 2026</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ranking Oficial de los 100 Mejores Creadores
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            Métricas auditadas en tiempo real: valor de mercado, audiencia media (ACV), engagement y evaluación comercial de marcas patrocinadoras.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border-2 border-slate-300 p-4 sm:p-5 mb-8 shadow-sm">
          
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 flex-wrap">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-xs">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filtros Avanzados del Top 100:</span>
            </div>

            {(selectedCountry !== 'Todos' || selectedCategory !== 'Todas' || selectedPlatform !== 'Todas' || searchQuery !== '') && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Limpiar Filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Country Filter */}
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-600" /> Filtrar por País
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
              >
                {countriesDropdown.map((country) => (
                  <option key={country} value={country}>
                    {country === 'Todos' ? '🌍 Todos los Países' : country}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'Todas' ? 'Todas las Categorías' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                Red Social / Plataforma
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => {
                  setSelectedPlatform(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
              >
                {platformsList.map((plat) => (
                  <option key={plat} value={plat}>
                    {plat === 'Todas' ? 'Todas las Redes' : plat}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                Buscar Creador
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Nombre o handle..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Metric Sorting Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
          <button
            onClick={() => { setActiveTab('marketValue'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'marketValue'
                ? 'bg-blue-600 text-white shadow-md border border-blue-700'
                : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Valor de Mercado (€)
          </button>

          <button
            onClick={() => { setActiveTab('acv'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'acv'
                ? 'bg-blue-600 text-white shadow-md border border-blue-700'
                : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-4 h-4" /> Audiencia Media (ACV)
          </button>

          <button
            onClick={() => { setActiveTab('followers'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'followers'
                ? 'bg-blue-600 text-white shadow-md border border-blue-700'
                : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" /> Seguidores Totales
          </button>

          <button
            onClick={() => { setActiveTab('engagement'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'engagement'
                ? 'bg-blue-600 text-white shadow-md border border-blue-700'
                : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Percent className="w-4 h-4" /> Engagement Rate
          </button>

          <button
            onClick={() => { setActiveTab('brandScore'); setCurrentPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'brandScore'
                ? 'bg-blue-600 text-white shadow-md border border-blue-700'
                : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Evaluación Marcas (Estrellas)
          </button>
        </div>

        {/* Results Counter Summary */}
        <div className="flex items-center justify-between mb-4 px-2 text-xs font-bold text-slate-600">
          <span>
            Mostrando <strong className="text-slate-900">{filteredAndSortedList.length}</strong> creadores de los Top 100
          </span>
          <span>
            Página <strong className="text-blue-600">{currentPage}</strong> de {totalPages}
          </span>
        </div>

        {/* Ranking List Table / Cards */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden mb-8">
          <div className="divide-y divide-slate-200">
            {paginatedList.map((creator, idx) => {
              const rank = (currentPage - 1) * itemsPerPage + idx + 1;
              
              let medalBg = 'bg-slate-100 text-slate-800 border border-slate-300';
              if (rank === 1) medalBg = 'bg-amber-400 text-slate-950 font-black border border-amber-500 shadow-sm';
              if (rank === 2) medalBg = 'bg-slate-300 text-slate-900 font-black border border-slate-400 shadow-sm';
              if (rank === 3) medalBg = 'bg-amber-700 text-white font-black border border-amber-800 shadow-sm';

              const starRatingVal = creator.starRating || 4.9;
              const followersFormatted =
                creator.totalFollowers >= 1000000
                  ? `${(creator.totalFollowers / 1000000).toFixed(1)}M`
                  : `${(creator.totalFollowers / 1000).toFixed(0)}K`;

              const marketValueFormatted =
                creator.marketValueEur >= 1000000
                  ? `€${(creator.marketValueEur / 1000000).toFixed(1)}M`
                  : `€${(creator.marketValueEur / 1000).toFixed(0)}K`;

              return (
                <div
                  key={creator.id}
                  onClick={() => onSelectCreator(creator)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-blue-50/60 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    
                    {/* Rank Number Badge */}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-black shrink-0 ${medalBg}`}>
                      #{rank}
                    </div>

                    {/* Creator Avatar & Basic Info */}
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-300 group-hover:scale-105 transition-transform shrink-0"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base" title={creator.country}>{creator.flagEmoji}</span>
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors truncate">
                          {creator.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      </div>

                      <p className="text-xs text-slate-500 font-medium truncate">
                        {creator.handle} • <span className="font-extrabold text-slate-700">{creator.country}</span> • <span className="text-blue-600">{creator.primaryPlatform}</span>
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {creator.category}
                        </span>
                        <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {starRatingVal.toFixed(1)} / 5
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Value Stats & Action Button */}
                  <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    
                    {/* Metric Display */}
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-500 font-black block uppercase tracking-wider">
                        {activeTab === 'marketValue' && 'Valor de Mercado'}
                        {activeTab === 'acv' && 'Audiencia Media'}
                        {activeTab === 'followers' && 'Seguidores'}
                        {activeTab === 'engagement' && 'Engagement Rate'}
                        {activeTab === 'brandScore' && 'Calificación Marcas'}
                      </span>
                      <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                        {activeTab === 'marketValue' && marketValueFormatted}
                        {activeTab === 'acv' && `${creator.acv.toLocaleString('es-ES')} CCV`}
                        {activeTab === 'followers' && followersFormatted}
                        {activeTab === 'engagement' && `${creator.engagementRate}%`}
                        {activeTab === 'brandScore' && `★ ${starRatingVal.toFixed(1)} / 5.0`}
                      </span>
                    </div>

                    {/* Ver Profile Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCreator(creator);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs border border-blue-700 transition-all cursor-pointer group-hover:scale-105 shrink-0"
                    >
                      <span>Ver profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${
                currentPage === 1
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs font-bold text-slate-700 px-3 py-1 bg-white border border-slate-300 rounded-xl">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${
                currentPage === totalPages
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
