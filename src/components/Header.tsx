import React from 'react';
import { TrendingUp, Layers, Bookmark, PhoneCall, Globe, CheckCircle2 } from 'lucide-react';
import { Creator, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  shortlist: Creator[];
  comparisonList: Creator[];
  onOpenShortlist: () => void;
  onOpenComparison: () => void;
  onOpenServiceRequest: () => void;
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
              Creadores en Catálogo: <strong className="text-slate-900">{totalCreatorsCount}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-700 font-semibold">
              🔥 Destacado: Juanjo Llovera (86.4M Vistas TikTok) & Kathya Vásquez (Samsung)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[12px] text-slate-600 hidden lg:flex">
            <span className="flex items-center gap-1 text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Plataforma Integrada de Llamadas y Coordinación
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo CC-Market */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md border border-slate-300 group-hover:scale-105 transition-transform">
              CC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-2xl tracking-tight font-sans">
                  CC-<span className="text-blue-600">Market</span>
                </span>
                <span className="text-[11px] font-extrabold uppercase bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-300">
                  Creadores
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium -mt-0.5">
                {t.tagline}
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-bold text-slate-700">
            <a href="#search" className="hover:text-blue-600 transition-colors">
              Catálogo
            </a>
            <a href="#trending" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-blue-600" /> Tendencias
            </a>
            <a href="#ranking" className="hover:text-blue-600 transition-colors">
              Top Rankings
            </a>
            <a href="#news" className="hover:text-blue-600 transition-colors">
              Noticias
            </a>
            <a href="#partners" className="hover:text-blue-600 transition-colors">
              Patrocinadores
            </a>
          </nav>

          {/* Right Controls: Language Selector, Call Request & Drawers */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-100 border border-slate-300 rounded-xl px-2 py-1">
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

            {/* Service Request / Hire Button */}
            <button
              onClick={onOpenServiceRequest}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-sm border border-slate-300 transition-all cursor-pointer whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden sm:inline">Solicitar Servicio</span>
            </button>

            {/* Compare Button */}
            <button
              onClick={onOpenComparison}
              disabled={comparisonList.length === 0}
              className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                comparisonList.length > 0
                  ? 'bg-slate-100 text-slate-900 border-blue-500 hover:bg-slate-200 cursor-pointer'
                  : 'bg-slate-100/50 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden md:inline">Comparar</span>
              {comparisonList.length > 0 && (
                <span className="w-5 h-5 bg-blue-600 text-white font-black text-[10px] rounded-full flex items-center justify-center">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Shortlist Button */}
            <button
              onClick={onOpenShortlist}
              className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm border border-slate-300 transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden md:inline">Selección</span>
              <span className="w-5 h-5 bg-white text-blue-800 font-extrabold text-[11px] rounded-full flex items-center justify-center">
                {shortlist.length}
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
