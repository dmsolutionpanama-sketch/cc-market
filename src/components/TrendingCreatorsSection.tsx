import React from 'react';
import { Creator, LanguageCode } from '../types';
import { Flame, Eye, ArrowRight, Volume2, Play, ExternalLink, Share2, Sparkles, TrendingUp } from 'lucide-react';
import { translations } from '../data/translations';

interface TrendingCreatorsSectionProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  lang: LanguageCode;
}

// Sample viral post screenshots / content captures matching creators
const creatorPostPreviews: Record<string, { imageUrl: string; postTitle: string; publishDate: string; reachBadge: string }> = {
  'creator-juanjo': {
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    postTitle: '🔥 Clip Viral en TikTok: Desafío de Tendencia & Reacciones en Vivo',
    publishDate: 'Hace 3 días',
    reachBadge: '86.4M Vistas'
  },
  'creator-kathya': {
    imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=800',
    postTitle: '🏐 Voleibol Profesional & Rutina de Alto Rendimiento',
    publishDate: 'Hace 5 días',
    reachBadge: '4.2M Vistas (60 días)'
  },
  'creator-augusto': {
    imageUrl: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800',
    postTitle: '✨ Lookbook Urbano & Combinación de Tendencias 2026',
    publishDate: 'Hace 2 días',
    reachBadge: '100K Vistas Promedio'
  },
  'creator-ibai': {
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    postTitle: '🏆 Evento de Entretenimiento Masivo & Récord de Espectadores Concurrentes',
    publishDate: 'Ayer',
    reachBadge: '3.4M ACV en Vivo'
  },
  'creator-rivers': {
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c6232662000?auto=format&fit=crop&q=80&w=800',
    postTitle: '🥊 Transmisión Especial La Velada & Highlights de Combate',
    publishDate: 'Hace 4 días',
    reachBadge: '2.1M ACV'
  },
  'creator-alejo': {
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    postTitle: '📱 Review Auditada de Nuevos Dispositivos Inteligentes',
    publishDate: 'Hace 6 días',
    reachBadge: '850K Vistas'
  }
};

export const TrendingCreatorsSection: React.FC<TrendingCreatorsSectionProps> = ({
  creators,
  onSelectCreator,
  lang,
}) => {
  const t = translations[lang] || translations.es;
  const trendingList = creators.filter((c) => c.isTrending);

  const speakCreatorInfo = (creator: Creator, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${creator.name} de ${creator.country}. Creador en tendencia en ${creator.primaryPlatform}. Más de ${(creator.totalFollowers / 1000000).toFixed(1)} millones de seguidores. Destacado por: ${creator.trendingReason || 'Alto alcance viral'}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (trendingList.length === 0) return null;

  return (
    <section id="trending" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 border-b border-slate-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-red-600 animate-bounce" /> {t.trendingCreators}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Creadores Referidos por Publicaciones Virales & Redes
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Monitoreo en tiempo real de publicaciones con mayor impacto, retención de audiencia y contenido patrocinado de mayor rendimiento.
            </p>
          </div>

          <div className="text-xs text-slate-600 font-medium bg-white px-3 py-2 rounded-xl border border-slate-300 shadow-xs">
            📰 Formato Blog de Noticias • 2 creadores por fila
          </div>
        </div>

        {/* Trending Cards Grid - 2 per row (Horizontal Blog Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trendingList.map((creator) => {
            const preview = creatorPostPreviews[creator.id] || {
              imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
              postTitle: `🔥 Publicación Viral en ${creator.primaryPlatform}`,
              publishDate: 'Reciente',
              reachBadge: `${(creator.monthlyViews / 1000000).toFixed(1)}M Vistas`
            };

            return (
              <article
                key={creator.id}
                onClick={() => onSelectCreator(creator)}
                className="group bg-white rounded-2xl border-2 border-slate-300 hover:border-blue-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col sm:flex-row min-h-[220px]"
              >
                {/* Left/Top Media Preview Frame (Screenshot/Capture style) */}
                <div className="sm:w-5/12 relative bg-slate-900 overflow-hidden shrink-0 group-hover:brightness-105 transition-all">
                  <img
                    src={preview.imageUrl}
                    alt={preview.postTitle}
                    className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                  {/* Top Left Social Network Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white font-extrabold text-[11px] backdrop-blur-md border border-white/20 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>{creator.primaryPlatform}</span>
                  </div>

                  {/* Top Right Flag */}
                  <div className="absolute top-3 right-3 text-lg drop-shadow-md">
                    {creator.flagEmoji}
                  </div>

                  {/* Center Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <div className="w-11 h-11 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg border border-white/30">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Reach Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    <span className="flex items-center gap-1 text-amber-300">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> {preview.reachBadge}
                    </span>
                    <span className="text-slate-300 font-normal text-[10px]">{preview.publishDate}</span>
                  </div>
                </div>

                {/* Right/Bottom Content Area (News Blog Layout) */}
                <div className="sm:w-7/12 p-5 flex flex-col justify-between bg-white">
                  <div>
                    
                    {/* Header: Creator Info */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-xs"
                        />
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                            {creator.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-mono font-medium">{creator.handle}</p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => speakCreatorInfo(creator, e)}
                        className="p-1.5 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-lg transition-colors shrink-0 border border-slate-300"
                        title={t.listenAudio}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Post Title / Headline */}
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug mb-2 group-hover:text-blue-700">
                      {preview.postTitle}
                    </h4>

                    {/* Trending Reason Box */}
                    {creator.trendingReason && (
                      <p className="text-[11px] text-slate-600 bg-slate-50 border border-slate-300 p-2 rounded-xl mb-3 line-clamp-2">
                        <strong className="text-blue-700 font-bold">Por qué es tendencia:</strong> {creator.trendingReason}
                      </p>
                    )}

                    {/* Stats Summary Bar */}
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-semibold">Seguidores</span>
                        <strong className="font-mono text-slate-900 text-xs font-bold">
                          {(creator.totalFollowers / 1000000).toFixed(1)}M
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-semibold">Valor de Mercado</span>
                        <strong className="font-mono text-blue-700 text-xs font-bold">
                          €{(creator.marketValueEur / 1000000).toFixed(2)}M
                        </strong>
                      </div>
                    </div>

                  </div>

                  {/* Footer Action */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold text-blue-600 group-hover:text-blue-700">
                    <span>Ver Captura, Media Kit & Tarifas</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
