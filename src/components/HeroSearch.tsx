import React from 'react';
import { Search, SlidersHorizontal, X, Sparkles, Filter, RefreshCw, Eye, UserCheck, Flame } from 'lucide-react';
import { FilterState, Platform, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface HeroSearchProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: () => void;
  activeFilterCount: number;
  totalResults: number;
  isListRevealed: boolean;
  onRevealListToggle: () => void;
  lang: LanguageCode;
}

const platformsList: (Platform | 'All')[] = ['All', 'TikTok', 'Instagram', 'YouTube', 'Twitch', 'Facebook', 'Podcast'];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  showAdvancedFilters,
  onToggleAdvancedFilters,
  activeFilterCount,
  totalResults,
  isListRevealed,
  onRevealListToggle,
  lang,
}) => {
  const t = translations[lang] || translations.es;

  return (
    <section id="search" className="relative pt-10 pb-8 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 border-b border-slate-300">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-extrabold mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Plataforma Oficial de Búsqueda y Análisis de Creadores</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          CC-<span className="text-blue-600">Market</span>
        </h1>
        
        {/* Subtitle */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-normal">
          {t.tagline} • Encuentra datos de audiencias, valor de mercado, tarifario de media kits y evaluación de marcas.
        </p>

        {/* Search Bar Box - Expanded Width */}
        <div className="mt-8 relative w-full max-w-5xl mx-auto">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-blue-500 p-2.5 transition-all focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10">
            <div className="pl-3.5 pr-2 text-blue-600 shrink-0">
              <Search className="w-6 h-6" />
            </div>
            
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder={t.searchPlaceholder}
              className="w-full py-3 px-2 bg-transparent text-slate-900 text-base sm:text-lg font-bold placeholder-slate-400 focus:outline-none"
            />

            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors mr-1 cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onToggleAdvancedFilters}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
                showAdvancedFilters || activeFilterCount > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md border border-slate-300'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-slate-900 text-white font-black text-[11px] rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Social Network Quick Filters */}
          <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 mr-1">{t.filterPlatform}:</span>
            {platformsList.map((p) => {
              const isActive = filters.platform === p;
              return (
                <button
                  key={p}
                  onClick={() => onFilterChange({ platform: p })}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md border border-slate-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {p === 'All' ? 'Todas' : p}
                </button>
              );
            })}
          </div>

          {/* Reveal / Explore Catalog Action */}
          <div className="mt-6 pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-300">
            <div className="text-left text-xs text-slate-700">
              <span className="font-bold text-blue-700 flex items-center gap-1.5 mb-0.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{isListRevealed || filters.searchQuery.trim() !== '' ? 'Catálogo de Creadores Auditados Visible' : 'Listado de Creadores Oculto'}</span>
              </span>
              <p className="text-slate-500">
                {isListRevealed 
                  ? `Mostrando ${totalResults} creadores con datos auditados de audiencias y tarifas en vivo.` 
                  : t.hiddenListTip}
              </p>
            </div>

            <button
              onClick={onRevealListToggle}
              className={`px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md ${
                isListRevealed
                  ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 border border-slate-300'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border border-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{isListRevealed ? 'Ocultar Catálogo' : 'Mostrar Catálogo Completo'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
