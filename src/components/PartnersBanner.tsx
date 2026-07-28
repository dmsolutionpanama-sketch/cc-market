import React from 'react';
import { industryPartners } from '../data/creators';
import { ShieldCheck, Award } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface PartnersBannerProps {
  lang?: LanguageCode;
}

export const PartnersBanner: React.FC<PartnersBannerProps> = ({ lang = 'es' }) => {
  const t = translations[lang] || translations.es;

  // Duplicate list to achieve continuous infinite marquee loop
  const doublePartners = [...industryPartners, ...industryPartners];

  return (
    <section id="partners" className="py-8 bg-white border-t border-slate-200 text-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-700">
            {t.sponsorsTitle}
          </span>
        </div>
        <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Marcas activas en el histórico de trabajo de nuestros creadores
        </div>
      </div>

      {/* Infinite Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 bg-slate-50 border-y border-slate-200">
        
        {/* Left/Right Gradient Mask for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex items-center gap-6 sm:gap-10">
          {doublePartners.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="shrink-0 px-5 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer hover:border-emerald-500"
            >
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="font-black text-sm tracking-tight font-mono block leading-none text-slate-900">
                  {partner.logo}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
