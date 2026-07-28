import React from 'react';
import { TrendingUp, Layers, Bookmark, PhoneCall, Globe, CheckCircle2, Search, Newspaper, Award, Building2, ShieldCheck } from 'lucide-react';
import { Creator, LanguageCode } from '../types';
import { translations } from '../data/translations';

export type SectionType = 'catalog' | 'trending' | 'ranking' | 'news' | 'partners';

interface HeaderProps {
  shortlist: Creator[];
  comparisonList: Creator[];
  onOpenShortlist: () => void;
  onOpenComparison: () => void;
  onOpenServiceRequest: () => void;
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  lang: LanguageCode;
  onLangChange: (lang: LanguageCode) => void;
  totalCreatorsCount: number;
}

const langOptions: { code: LanguageCode; flag: string; label: string }[] = [
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'pt', flag: '🇵🇹', label: 'Português' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
];

export const Header: React.FC<HeaderProps> = ({
  shortlist,
  comparisonList,
  onOpenShortlist,
  onOpenComparison,
  onOpenServiceRequest,
  activeSection,
  onSelectSection,
  lang,
  onLangChange,
  totalCreatorsCount,
}) => {
  const t = translations[lang] || translations.es;

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-300 shadow-xs">
      
      {/* Ticker Bar */}
      <div className="bg-slate-100 text-slate-700 text-xs py-1.5 px-4 overflow-x-auto whitespace-nowrap border-b border-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-[12px] font-medium">
            <span className="flex items-center gap-1.5 font-bold text-blue-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              CC-MARKET INDEX 2026
            </span>
            <span className="text-slate-300">|</span>
            <span>
              Creadores Auditados: <strong className="text-slate-900">{totalCreatorsCount}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Seguridad & Encriptación SSL 100% Protegido
            </span>
          </div>

          <div className="flex items-center gap-3 text-[12px] text-slate-600 hidden lg:flex">
            <span className="flex items-center gap-1 text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Plataforma de Llamadas y Negociación Directa
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo CC-Market */}
          <button 
            onClick={() => onSelectSection('catalog')}
            className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
              CC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-2xl tracking-tight font-sans">
                  CC-<span className="text-blue-600">Market</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Creadores
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium -mt-0.5">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Navigation Links - Flat Clean Text Navigation (No rounded bubbles) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-extrabold text-slate-700">
            <button
              onClick={() => onSelectSection('catalog')}
              className={`py-2 transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
                activeSection === 'catalog'
                  ? 'border-blue-600 text-blue-600 font-black'
                  : 'border-transparent hover:text-blue-600 text-slate-700'
              }`}
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Catálogo</span>
            </button>

            <button
              onClick={() => onSelectSection('news')}
              className={`py-2 transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
                activeSection === 'news'
                  ? 'border-blue-600 text-blue-600 font-black'
                  : 'border-transparent hover:text-blue-600 text-slate-700'
              }`}
            >
              <Newspaper className="w-4 h-4 text-blue-600" />
              <span>Noticias</span>
            </button>

            <button
              onClick={() => onSelectSection('ranking')}
              className={`py-2 transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
                activeSection === 'ranking'
                  ? 'border-blue-600 text-blue-600 font-black'
                  : 'border-transparent hover:text-blue-600 text-slate-700'
              }`}
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span>Top Ranking</span>
            </button>

            <button
              onClick={() => onSelectSection('partners')}
              className={`py-2 transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
                activeSection === 'partners'
                  ? 'border-blue-600 text-blue-600 font-black'
                  : 'border-transparent hover:text-blue-600 text-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Partners</span>
            </button>
          </nav>

          {/* Right Controls: Language Selector, Service Request & Shortlist */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-100 border border-slate-300 rounded-xl px-2 py-1.5">
              <Globe className="w-4 h-4 text-slate-500 mr-1.5" />
              <select
                value={lang}
                onChange={(e) => onLangChange(e.target.value as LanguageCode)}
                className="bg-transparent text-slate-900 font-bold text-xs focus:outline-none cursor-pointer pr-1"
              >
                {langOptions.map((lo) => (
                  <option key={lo.code} value={lo.code} className="bg-white text-slate-900">
                    {lo.flag} {lo.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Shortlist / Bookmark Button */}
            <button
              onClick={onOpenShortlist}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center gap-2 border border-slate-300 transition-all cursor-pointer"
              title="Ver creadores guardados"
            >
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">Selección</span>
              <span className="w-5 h-5 bg-blue-600 text-white font-black text-[11px] rounded-full flex items-center justify-center">
                {shortlist.length}
              </span>
            </button>

            {/* Service Request / Hire Button - Primary CTA at the end */}
            <button
              onClick={onOpenServiceRequest}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Solicitar Servicio</span>
            </button>

          </div>

        </div>

        {/* Mobile Quick Navigation Bar */}
        <div className="lg:hidden pb-3 flex items-center gap-4 overflow-x-auto whitespace-nowrap font-extrabold text-xs border-t border-slate-200 pt-2">
          <button
            onClick={() => onSelectSection('catalog')}
            className={`py-1 flex items-center gap-1.5 cursor-pointer border-b-2 ${
              activeSection === 'catalog' ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-700'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-blue-600" /> Catálogo
          </button>
          <button
            onClick={() => onSelectSection('news')}
            className={`py-1 flex items-center gap-1.5 cursor-pointer border-b-2 ${
              activeSection === 'news' ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-700'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-blue-600" /> Noticias
          </button>
          <button
            onClick={() => onSelectSection('ranking')}
            className={`py-1 flex items-center gap-1.5 cursor-pointer border-b-2 ${
              activeSection === 'ranking' ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-700'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-blue-600" /> Top Ranking
          </button>
          <button
            onClick={() => onSelectSection('partners')}
            className={`py-1 flex items-center gap-1.5 cursor-pointer border-b-2 ${
              activeSection === 'partners' ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-600" /> Partners
          </button>
        </div>

      </div>
    </header>
  );
};

