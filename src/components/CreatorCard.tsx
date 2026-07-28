import React from 'react';
import { Creator, LanguageCode } from '../types';
import { TrendingUp, CheckCircle2, Bookmark, Layers, Eye, Users, Percent, Volume2, Award, ShieldCheck, Flame } from 'lucide-react';
import { translations } from '../data/translations';

interface CreatorCardProps {
  creator: Creator;
  onViewDetails: (creator: Creator) => void;
  onToggleShortlist: (creator: Creator) => void;
  isShortlisted: boolean;
  onToggleCompare: (creator: Creator) => void;
  isCompared: boolean;
  lang: LanguageCode;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  onViewDetails,
  onToggleShortlist,
  isShortlisted,
  onToggleCompare,
  isCompared,
  lang,
}) => {
  const t = translations[lang] || translations.es;

  // Social Platform Color Accent Mapping
  const getPlatformStyle = (platform: string) => {
    switch (platform) {
      case 'TikTok':
        return 'bg-slate-950 text-blue-400 border-slate-700';
      case 'Instagram':
        return 'bg-linear-to-r from-purple-600 via-pink-600 to-amber-500 text-white border-pink-500';
      case 'YouTube':
        return 'bg-red-600 text-white border-red-700';
      case 'Twitch':
        return 'bg-purple-700 text-white border-purple-800';
      case 'Facebook':
        return 'bg-blue-600 text-white border-blue-700';
      case 'Kick':
        return 'bg-blue-600 text-white border-blue-500';
      default:
        return 'bg-slate-800 text-blue-400 border-slate-700';
    }
  };

  // Text-To-Speech Speech Synthesis for Accessibility
  const speakCreatorInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${creator.name}. País: ${creator.country}. Red social principal: ${creator.primaryPlatform}. Creador verificado con ${(creator.totalFollowers / 1000000).toFixed(1)} millones de seguidores totales. Rango de edad: ${creator.ageRange || 'Joven adulto'}. Categoría: ${creator.category}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Format Market Value
  const formattedMarketValue = creator.marketValueEur >= 1000000 
    ? `€${(creator.marketValueEur / 1000000).toFixed(1)}M`
    : `€${(creator.marketValueEur / 1000).toFixed(0)}K`;

  // Format Followers
  const formattedFollowers = creator.totalFollowers >= 1000000
    ? `${(creator.totalFollowers / 1000000).toFixed(1)}M`
    : `${(creator.totalFollowers / 1000).toFixed(0)}K`;

  // Traffic Light Indicator
  const trafficLightColor = creator.brandRating?.trafficLight === 'red' 
    ? 'bg-red-500 text-white' 
    : creator.brandRating?.trafficLight === 'yellow'
    ? 'bg-amber-400 text-slate-950'
    : 'bg-blue-600 text-white font-black';

  return (
    <div className="group bg-white rounded-2xl border-2 border-slate-300 hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* Top Header Bar with High Visibility Country Flag */}
      <div>
        <div className="bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
          
          {/* Prominent Country Flag Badge */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 px-3 py-1 rounded-xl shadow-xs">
            <span className="text-xl leading-none">{creator.flagEmoji}</span>
            <span className="text-white font-extrabold text-xs sm:text-sm tracking-wide">
              {creator.country}
            </span>
          </div>

          {/* Social Platform Accent Chip */}
          <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border shadow-xs ${getPlatformStyle(creator.primaryPlatform)}`}>
            {creator.primaryPlatform}
          </span>
        </div>

        {/* Profile Card Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            
            {/* Avatar & Name */}
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-300 shadow-md group-hover:scale-105 transition-transform"
                />
                {creator.verified && (
                  <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs" title="Métricas Auditadas Verificadas">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-50" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                  {creator.name}
                </h3>
                <p className="text-xs text-slate-500 font-bold font-mono">{creator.handle}</p>
                
                <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md border border-slate-300">
                    {creator.category}
                  </span>
                  {creator.ageRange && (
                    <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-300">
                      {creator.ageRange}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Audio Button for Visually Impaired Users & Shortlist */}
            <div className="flex items-center gap-1">
              <button
                onClick={speakCreatorInfo}
                className="p-2 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 border border-slate-300 transition-colors cursor-pointer"
                title={t.listenAudio}
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleShortlist(creator)}
                className={`p-2 rounded-xl text-xs border border-slate-300 transition-colors cursor-pointer ${
                  isShortlisted
                    ? 'bg-blue-50 text-blue-800 font-bold border-blue-300'
                    : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title={isShortlisted ? 'Quitar de Mi Selección' : 'Añadir a Mi Selección'}
              >
                <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-blue-600 text-blue-600' : ''}`} />
              </button>
            </div>

          </div>

          {/* Brand Rating Traffic Light Badge (Semáforo) */}
          <div className="mt-4 bg-slate-50 border border-slate-300 rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${creator.brandRating?.trafficLight === 'green' ? 'bg-blue-600 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="text-xs font-extrabold text-slate-800">
                Valoración Marcas:
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-2xs ${trafficLightColor}`}>
              {creator.brandRating?.trafficLight === 'green' ? '🔵 100% Cumplimiento' : '🟡 Aceptable'}
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-3 bg-slate-900 text-white rounded-xl p-3 grid grid-cols-3 gap-2 text-center border border-slate-800">
            
            {/* ACV */}
            <div className="border-r border-slate-800 pr-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Audiencia ACV</span>
              <span className="text-sm font-black text-blue-400 font-mono mt-0.5 block">
                {creator.acv >= 1000 ? `${(creator.acv / 1000).toFixed(1)}K` : creator.acv}
              </span>
            </div>

            {/* Followers */}
            <div className="border-r border-slate-800 px-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Seguidores</span>
              <span className="text-sm font-black text-white font-mono mt-0.5 block">
                {formattedFollowers}
              </span>
            </div>

            {/* Engagement */}
            <div className="pl-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Engagement</span>
              <span className="text-sm font-black text-amber-400 font-mono mt-0.5 block">
                {creator.engagementRate}%
              </span>
            </div>

          </div>

          {/* Value / Post Rate */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-700 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
            <span className="font-bold text-blue-900">Tarifa Post / Reel:</span>
            <span className="font-black text-blue-800 font-mono text-sm">
              ${creator.sponsorshipRates.sponsoredPost.toLocaleString()} USD
            </span>
          </div>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 bg-slate-100 border-t border-slate-300 flex items-center justify-between gap-2">
        <button
          onClick={() => onToggleCompare(creator)}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
            isCompared
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isCompared ? 'Comparando' : 'Comparar'}</span>
        </button>

        <button
          onClick={() => onViewDetails(creator)}
          className="flex-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer border border-slate-300"
        >
          <span>Ver Media Kit & Perfil</span>
        </button>
      </div>

    </div>
  );
};
