import React from 'react';
import { CreatorNewsItem, LanguageCode } from '../types';
import { creatorNewsMockData } from '../data/creators';
import { Newspaper, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

interface NewsSectionProps {
  lang: LanguageCode;
  onSelectCreatorByName?: (name: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ lang, onSelectCreatorByName }) => {
  const t = translations[lang] || translations.es;

  return (
    <section id="news" className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-300 text-xs font-black uppercase tracking-wider mb-2">
              <Newspaper className="w-4 h-4 text-blue-700" /> {t.newsSection}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tendencias del Mercado & Casos de Éxito de Marcas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Análisis, acuerdos publicitarios y novedades sobre los creadores más influyentes.
            </p>
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creatorNewsMockData.map((item) => (
            <article
              key={item.id}
              className="bg-slate-50 rounded-2xl border-2 border-slate-300 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-blue-500"
            >
              <div>
                {/* News Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 sm:px-5 py-3 bg-white border-t border-slate-300 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">{item.author}</span>
                {item.creatorName && onSelectCreatorByName && (
                  <button
                    onClick={() => onSelectCreatorByName(item.creatorName!)}
                    className="font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver {item.creatorName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
