import React, { useState, useEffect, useMemo } from 'react';
import { CreatorNewsItem, LanguageCode } from '../types';
import { 
  HISTORICAL_RSS_NEWS, 
  GLOBAL_RSS_SOURCES, 
  fetchLiveRssNews, 
  interleaveAndSortByDate 
} from '../data/rssNewsData';
import { 
  Newspaper, Calendar, Clock, ArrowRight, Sparkles, Rss, ExternalLink, 
  RefreshCw, Filter, Search, ChevronLeft, ChevronRight, Globe, Shuffle, CheckCircle2 
} from 'lucide-react';
import { translations } from '../data/translations';

interface NewsSectionProps {
  lang: LanguageCode;
  onSelectCreatorByName?: (name: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ lang, onSelectCreatorByName }) => {
  const t = translations[lang] || translations.es;

  // News State initialized with interleaved diverse historical feeds
  const [newsList, setNewsList] = useState<CreatorNewsItem[]>(() => 
    interleaveAndSortByDate(HISTORICAL_RSS_NEWS)
  );
  const [isLoadingRss, setIsLoadingRss] = useState<boolean>(false);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);

  // Filters & Pagination State
  const [selectedSource, setSelectedSource] = useState<string>('Todas');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Strictly 8 items per page as requested

  // Fetch Live RSS on mount or manual button refresh
  const handleRefreshRss = async () => {
    setIsLoadingRss(true);
    const liveNews = await fetchLiveRssNews();
    setNewsList(liveNews);
    setIsLoadingRss(false);
    setIsLiveActive(true);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleRefreshRss();
  }, []);

  // Action: Shuffle Sources Randomly for extra dynamic variety
  const handleShuffleNews = () => {
    setNewsList((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return interleaveAndSortByDate(shuffled);
    });
    setCurrentPage(1);
  };

  // Category Options
  const categoriesList = useMemo(() => {
    const set = new Set(newsList.map((item) => item.category));
    return ['Todas', ...Array.from(set)];
  }, [newsList]);

  // Source Options
  const sourcesList = useMemo(() => {
    const set = new Set(newsList.map((item) => item.source || 'General'));
    return ['Todas', ...Array.from(set)];
  }, [newsList]);

  // Filtering Logic
  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const itemSource = item.source || 'General';
      const matchesSource =
        selectedSource === 'Todas' ||
        itemSource.toLowerCase() === selectedSource.toLowerCase();
      const matchesCategory =
        selectedCategory === 'Todas' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.creatorName && item.creatorName.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q));

      return matchesSource && matchesCategory && matchesSearch;
    });
  }, [newsList, selectedSource, selectedCategory, searchQuery]);

  // Pagination Math
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage) || 1;
  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(start, start + itemsPerPage);
  }, [filteredNews, currentPage]);

  const handleResetFilters = () => {
    setSelectedSource('Todas');
    setSelectedCategory('Todas');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Open news article in new window/tab (_blank) or target page
  const handleOpenArticle = (url?: string) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="news" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-300 min-h-[700px]">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-black uppercase tracking-wider mb-2 shadow-2xs">
              <Rss className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>FEEDS RSS DE NOTICIAS DE CREADORES EN VIVO & HISTÓRICO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Noticias & Tendencias Globales del Creator Economy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal">
              Flujo dinámico e intercalado por fecha desde las principales fuentes internacionales: Tubefilter, TechCrunch, Dexerto, Forbes, YouTube Blog y CC-Market.
            </p>
          </div>

          {/* Action Buttons: Refresh RSS & Random Shuffle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleShuffleNews}
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs flex items-center gap-2 shadow-xs border border-slate-300 transition-all cursor-pointer shrink-0"
              title="Mezclar aleatoriamente el orden de las fuentes RSS"
            >
              <Shuffle className="w-4 h-4 text-purple-600" />
              <span>Mezclar Fuentes</span>
            </button>

            {isLiveActive && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Feeds En Vivo</span>
              </span>
            )}

            <button
              onClick={handleRefreshRss}
              disabled={isLoadingRss}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm border border-blue-700 transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingRss ? 'animate-spin' : ''}`} />
              <span>{isLoadingRss ? 'Cargando Feeds...' : 'Actualizar Feeds RSS'}</span>
            </button>
          </div>
        </div>

        {/* Global RSS Sources Pill Carousel */}
        <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-300 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
              Fuentes Oficiales RSS Monitoreadas:
            </span>
            {selectedSource !== 'Todas' && (
              <button
                onClick={() => setSelectedSource('Todas')}
                className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Ver todas las fuentes
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => {
                setSelectedSource('Todas');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                selectedSource === 'Todas'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                  : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
              }`}
            >
              🌍 Todas las Fuentes (Intercalado)
            </button>

            {GLOBAL_RSS_SOURCES.map((src) => (
              <button
                key={src.id}
                onClick={() => {
                  setSelectedSource(src.name);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                  selectedSource === src.name
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
                }`}
              >
                {src.logo}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border-2 border-slate-300 p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Source Filter */}
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                Filtrar por Medio / Fuente
              </label>
              <select
                value={selectedSource}
                onChange={(e) => {
                  setSelectedSource(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
              >
                {sourcesList.map((src) => (
                  <option key={src} value={src}>
                    {src === 'Todas' ? '📰 Todas las Fuentes (Dinámico)' : src}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                Categoría de Noticia
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
                    {cat === 'Todas' ? '🏷️ Todas las Categorías' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                Buscar Noticia o Creador
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar titular, palabra clave o creador..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

          </div>

          {(selectedSource !== 'Todas' || selectedCategory !== 'Todas' || searchQuery !== '') && (
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Limpiar Filtros de Noticias
              </button>
            </div>
          )}
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between mb-6 px-2 text-xs font-bold text-slate-600">
          <span>
            Mostrando <strong className="text-slate-900">{paginatedNews.length}</strong> de{' '}
            <strong className="text-blue-600">{filteredNews.length}</strong> noticias intercaladas por fecha (8 por página)
          </span>
          <span>
            Página <strong className="text-blue-600">{currentPage}</strong> de {totalPages}
          </span>
        </div>

        {/* News Cards Grid - Strictly 8 Items per Page */}
        {paginatedNews.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-12 text-center my-8">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-slate-800">
              No se encontraron noticias con los filtros seleccionados
            </h3>
            <p className="text-xs text-slate-500 mt-1">Prueba cambiando la fuente RSS o limpiando la búsqueda.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-extrabold cursor-pointer hover:bg-blue-700 transition-all"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {paginatedNews.map((item) => (
              <article
                key={item.id}
                onClick={() => handleOpenArticle(item.externalUrl)}
                className="bg-white rounded-2xl border-2 border-slate-300 hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* News Image & Source Badge */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Source Logo Badge */}
                    <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white font-black text-[10px] px-2.5 py-1 rounded-lg shadow-sm border border-slate-700 uppercase tracking-wider">
                      {item.sourceLogo || item.source || 'RSS Feed'}
                    </span>

                    {/* Live Badge */}
                    {item.isRssLive && (
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase">
                        En Vivo
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    {/* Meta bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-2.5">
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" /> {item.date}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                  
                  {/* Author / Source */}
                  <span className="font-extrabold text-slate-600 truncate text-[11px]">
                    {item.author || item.source}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.creatorName && onSelectCreatorByName && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCreatorByName(item.creatorName!);
                        }}
                        className="font-extrabold text-blue-600 hover:text-blue-800 text-[10px] flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-1 rounded-md border border-blue-200 hover:bg-blue-100 transition-all"
                        title="Ver ficha del creador"
                      >
                        <span>Profile</span>
                      </button>
                    )}

                    <a
                      href={item.externalUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-extrabold text-slate-700 hover:text-blue-600 text-[11px] flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-md border border-slate-300 hover:border-blue-400 transition-all shadow-2xs"
                      title="Leer noticia completa en una página nueva (_blank)"
                    >
                      <span>Leer noticia</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </a>
                  </div>

                </div>

              </article>
            ))}
          </div>
        )}

        {/* Historical Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm">
            
            <div className="text-xs font-bold text-slate-600">
              Página <strong className="text-slate-900">{currentPage}</strong> de {totalPages} (Noticias Intercaladas por Fecha)
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1 border transition-all ${
                  currentPage === 1
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center border ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white border-blue-700 shadow-sm scale-105'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1 border transition-all ${
                  currentPage === totalPages
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 cursor-pointer'
                }`}
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
