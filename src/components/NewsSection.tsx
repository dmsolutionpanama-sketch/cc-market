import React, { useState, useEffect, useMemo } from 'react';
import { CreatorNewsItem, LanguageCode } from '../types';
import { 
  HISTORICAL_RSS_NEWS, 
  GLOBAL_RSS_SOURCES, 
  fetchLiveRssNews, 
  interleaveAndSortByDate 
} from '../data/rssNewsData';
import { 
  Newspaper, Calendar, Clock, Sparkles, Rss, ExternalLink, 
  RefreshCw, Search, ChevronLeft, ChevronRight, Shuffle, X,
  Building2, UserCheck, ShieldCheck, Share2, BookOpen
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

  // Modal Article Reader State
  const [selectedArticle, setSelectedArticle] = useState<CreatorNewsItem | null>(null);

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

  // Open external URL cleanly in new window/tab (_blank)
  const handleOpenSourceWebsite = (url?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Open internal article reader modal
  const handleReadArticleModal = (article: CreatorNewsItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedArticle(article);
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
              Flujo dinámico e intercalado por fecha desde nuestros medios y sitios amigos aliados: Tubefilter, TechCrunch, Dexerto, Forbes, YouTube Blog y CC-Market.
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
              Medios & Sitios Amigos Aliados:
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
                onClick={() => handleReadArticleModal(item)}
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
                      {item.sourceLogo || item.source || 'Sitio Amigo'}
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
                    
                    {/* Button 'Fuente' linking to the original site */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenSourceWebsite(item.externalUrl, e)}
                      className="font-extrabold text-slate-800 hover:text-blue-600 text-[10px] flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded-md border border-slate-300 hover:border-blue-400 transition-all shadow-2xs"
                      title={`Visitar portal oficial de ${item.source || 'Fuente'}`}
                    >
                      <span>Fuente</span>
                      <ExternalLink className="w-2.5 h-2.5 text-blue-600" />
                    </button>

                    {/* Button 'Leer noticia' opening the full template modal inside the site */}
                    <button
                      type="button"
                      onClick={(e) => handleReadArticleModal(item, e)}
                      className="font-extrabold text-blue-700 hover:text-blue-900 text-[11px] flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 hover:bg-blue-100 transition-all"
                      title="Leer noticia completa dentro de nuestra plantilla"
                    >
                      <span>Leer noticia</span>
                      <BookOpen className="w-3 h-3 text-blue-600" />
                    </button>
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

      {/* Full Article Internal Template Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white w-full max-w-4xl rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {selectedArticle.sourceLogo || selectedArticle.source || 'Sitio Amigo'}
                </span>
                <span className="text-xs text-slate-300 font-bold hidden sm:inline">
                  Redacción y Contenido por Equipo Aliado
                </span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Cerrar lectura"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Article Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Category & Date */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-b border-slate-200 pb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 font-black rounded-lg border border-blue-200 uppercase text-[10px]">
                  {selectedArticle.category}
                </span>
                <div className="flex items-center gap-4 font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Calendar className="w-4 h-4 text-blue-600" /> {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-4 h-4 text-slate-400" /> {selectedArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Author / Source Badge */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">
                    {selectedArticle.author || selectedArticle.source}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Equipo de Redacción de sitio amigo: <strong className="text-blue-600">{selectedArticle.source}</strong>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs max-h-96">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover max-h-96"
                />
                <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Fotografía cortesía de {selectedArticle.source || 'Sitio Amigo'}
                </div>
              </div>

              {/* Summary Lead */}
              <div className="bg-blue-50/70 border-l-4 border-blue-600 p-4 rounded-r-xl text-slate-800 font-medium text-sm leading-relaxed">
                <strong>Resumen Ejecutivo:</strong> {selectedArticle.summary}
              </div>

              {/* Full Article Content */}
              <div className="prose max-w-none text-slate-800 text-sm leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedArticle.fullContent || selectedArticle.summary}
              </div>

              {/* Creator Tag if linked */}
              {selectedArticle.creatorName && onSelectCreatorByName && (
                <div className="bg-slate-100 p-4 rounded-2xl border border-slate-300 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                      Creador Mencionado
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      {selectedArticle.creatorName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const name = selectedArticle.creatorName!;
                      setSelectedArticle(null);
                      onSelectCreatorByName(name);
                    }}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Ver Ficha del Creador</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Source Credit Box */}
              <div className="bg-slate-50 border border-slate-300 p-4 rounded-2xl text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-black text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Atribución Editorial y Derechos de Autor</span>
                </div>
                <p className="text-[11px] leading-normal text-slate-500">
                  Esta noticia ha sido adaptada y mostrada dentro de nuestra plantilla con fines informativos para la comunidad de creadores de CC-Market. El contenido original y la investigación periodística corresponden al equipo de redacción de nuestro sitio amigo y aliado <strong>{selectedArticle.source}</strong>.
                </p>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-100 px-6 py-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-600 font-bold">
                Medio Aliado: <strong className="text-slate-900">{selectedArticle.source || 'Sitio Amigo'}</strong>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Button 'Fuente' to open the original partner homepage */}
                <button
                  type="button"
                  onClick={(e) => handleOpenSourceWebsite(selectedArticle.externalUrl, e)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>Fuente</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                >
                  Cerrar Lectura
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
