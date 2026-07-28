import React from 'react';
import { 
  ShieldCheck, Search, Newspaper, Award, Building2, 
  Bookmark, Layers, PhoneCall, User, LogIn, CheckCircle2, Sparkles 
} from 'lucide-react';
import { SectionType } from './Header';
import { LanguageCode } from '../types';

interface FooterProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onOpenShortlist: () => void;
  shortlistCount: number;
  onOpenComparison: () => void;
  comparisonCount: number;
  onOpenServiceRequest: () => void;
  onOpenAuthModal: () => void;
  lang: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({
  activeSection,
  onSelectSection,
  onOpenShortlist,
  shortlistCount,
  onOpenComparison,
  comparisonCount,
  onOpenServiceRequest,
  onOpenAuthModal,
}) => {
  const handleNavClick = (section: SectionType) => {
    onSelectSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-12">
      
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-2xl shadow-lg border border-blue-400 shrink-0">
            CC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-xl tracking-tight">
                CC-<span className="text-blue-500">Market</span>
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-black uppercase">
                2026 Audit
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Plataforma líder en auditoría, valoración y contratación directa de Creadores de Contenido.
            </p>
          </div>
        </div>

        {/* Security & Encriptation Badge */}
        <div className="flex items-center gap-2.5 text-emerald-300 bg-emerald-950/60 px-4 py-2.5 rounded-2xl border border-emerald-500/30 text-xs font-bold shadow-inner">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Plataforma 100% Auditada & Encriptada • Protección SSL & Sanitización Anti-XSS
          </span>
        </div>

      </div>

      {/* Complete Horizontal Navigation Menu Section */}
      <div className="bg-slate-900/60 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Navegación Principal del Sistema
          </span>

          {/* Full Horizontal Navigation Menu */}
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-extrabold">
            
            <button
              onClick={() => handleNavClick('catalog')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'catalog'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-4 h-4 text-blue-400" />
              <span>Catálogo</span>
            </button>

            <button
              onClick={() => handleNavClick('news')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'news'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Newspaper className="w-4 h-4 text-blue-400" />
              <span>Noticias</span>
            </button>

            <button
              onClick={() => handleNavClick('ranking')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'ranking'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-blue-400" />
              <span>Top Ranking</span>
            </button>

            <button
              onClick={() => handleNavClick('partners')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'partners'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Partners</span>
            </button>

            {shortlistCount > 0 && (
              <button
                onClick={onOpenShortlist}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700"
              >
                <Bookmark className="w-4 h-4 text-blue-400" />
                <span>Mi Selección</span>
                <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {shortlistCount}
                </span>
              </button>
            )}

            <button
              onClick={onOpenComparison}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700"
            >
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Comparador</span>
              {comparisonCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {comparisonCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenServiceRequest}
              className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5 border border-amber-500/40"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Solicitar Servicio</span>
            </button>

            <button
              onClick={onOpenAuthModal}
              className="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all cursor-pointer flex items-center gap-1.5 border border-blue-500/40"
            >
              <LogIn className="w-4 h-4 text-blue-400" />
              <span>Acceso Creadores / Admin</span>
            </button>

          </nav>
        </div>
      </div>

      {/* Copyright Bar at the Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs font-bold text-slate-400">
        <p className="tracking-wide">
          © {new Date().getFullYear()} <span className="text-white font-extrabold tracking-wider">D&M Solution Ecosystem</span>. Todos los derechos reservados.
        </p>
      </div>

    </footer>
  );
};
