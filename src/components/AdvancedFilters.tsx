import React from 'react';
import { FilterState, Platform, Category, LanguageCode } from '../types';
import { RotateCcw, SlidersHorizontal, ShieldCheck, Globe, Calendar, User, DollarSign, Eye, Award } from 'lucide-react';
import { translations } from '../data/translations';

interface AdvancedFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  lang: LanguageCode;
}

const categoriesList: (Category | 'All')[] = [
  'All',
  'Gaming',
  'Entretenimiento',
  'Moda y Estilo',
  'Tech & Gadgets',
  'Lifestyle',
  'Educación',
  'Deportes',
  'Podcast',
  'Finanzas',
  'Reviews & Humor',
];

const countriesList = [
  'All',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'España',
  'México',
  'Argentina',
  'Colombia',
  'Chile',
  'Estados Unidos'
];

const ageRangesList = ['All', '18 - 24 años', '25 - 30 años', '30+ años'];

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
  lang,
}) => {
  const t = translations[lang] || translations.es;

  if (!isOpen) return null;

  return (
    <div className="bg-slate-50 border-b border-slate-200 text-slate-900 py-6 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Filtros Avanzados CC-Market</h3>
          </div>
          <button
            onClick={onResetFilters}
            className="text-xs text-slate-500 hover:text-blue-600 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> {t.clearFilters}
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
          
          {/* Country Filter (Con Banderas) */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-600" /> {t.filterCountry}
            </label>
            <select
              value={filters.country}
              onChange={(e) => onFilterChange({ country: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {countriesList.map((c) => (
                <option key={c} value={c} className="bg-white text-slate-900">
                  {c === 'All' ? 'Todos los países' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Age Range Filter */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" /> {t.filterAge}
            </label>
            <select
              value={filters.ageRange}
              onChange={(e) => onFilterChange({ ageRange: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {ageRangesList.map((a) => (
                <option key={a} value={a} className="bg-white text-slate-900">
                  {a === 'All' ? 'Cualquier edad' : a}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" /> {t.filterCategory}
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value as Category | 'All' })}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">Todas las categorías</option>
              {categoriesList.filter(c => c !== 'All').map((cat) => (
                <option key={cat} value={cat} className="bg-white text-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* ACV Range */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-600" /> {t.filterACV}
            </label>
            <select
              value={filters.acvRange}
              onChange={(e) => onFilterChange({ acvRange: e.target.value as FilterState['acvRange'] })}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">Cualquier audiencia</option>
              <option value="0-1k">Menos de 1.000 CCV</option>
              <option value="1k-5k">1.000 - 5.000 CCV</option>
              <option value="5k-20k">5.000 - 20.000 CCV</option>
              <option value="20k-50k">20.000 - 50.000 CCV</option>
              <option value="50k+">Más de 50.000 CCV</option>
            </select>
          </div>

          {/* Followers Range */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" /> {t.filterFollowers}
            </label>
            <select
              value={filters.followersRange}
              onChange={(e) => onFilterChange({ followersRange: e.target.value as FilterState['followersRange'] })}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">Cualquier cifra</option>
              <option value="<100k">Menos de 100K</option>
              <option value="100k-500k">100K - 500K</option>
              <option value="500k-2M">500K - 2M</option>
              <option value="2M-10M">2M - 10M</option>
              <option value="10M+">Más de 10M</option>
            </select>
          </div>

          {/* Market Value Range */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-blue-600" /> {t.filterMarketValue}
            </label>
            <select
              value={filters.marketValueRange}
              onChange={(e) => onFilterChange({ marketValueRange: e.target.value as FilterState['marketValueRange'] })}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">Todos los rangos</option>
              <option value="<100k">Hasta €100.000</option>
              <option value="100k-1M">€100.000 - €1.000.000</option>
              <option value="1M-5M">€1M - €5M</option>
              <option value="5M+">Más de €5M</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-bold mb-1.5">
              {t.sortBy}
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="marketValue">Mayor Valor de Mercado</option>
              <option value="acv">Mayor Audiencia Media (ACV)</option>
              <option value="followers">Mayor Nº de Seguidores</option>
              <option value="engagement">Mayor Tasa de Engagement (%)</option>
              <option value="name">Nombre alfabético</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
