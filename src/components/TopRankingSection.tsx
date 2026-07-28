import React, { useState } from 'react';
import { Creator, LanguageCode } from '../types';
import { Trophy, Award, TrendingUp, Users, Eye, Percent, CheckCircle2, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';

interface TopRankingSectionProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  lang: LanguageCode;
}

type RankingTab = 'marketValue' | 'acv' | 'followers' | 'engagement' | 'brandScore';

export const TopRankingSection: React.FC<TopRankingSectionProps> = ({
  creators,
  onSelectCreator,
  lang,
}) => {
  const t = translations[lang] || translations.es;
  const [activeTab, setActiveTab] = useState<RankingTab>('marketValue');

  const getSortedCreators = () => {
    const list = [...creators];
    switch (activeTab) {
      case 'marketValue':
        return list.sort((a, b) => b.marketValueEur - a.marketValueEur).slice(0, 5);
      case 'acv':
        return list.sort((a, b) => b.acv - a.acv).slice(0, 5);
      case 'followers':
        return list.sort((a, b) => b.totalFollowers - a.totalFollowers).slice(0, 5);
      case 'engagement':
        return list.sort((a, b) => b.engagementRate - a.engagementRate).slice(0, 5);
      case 'brandScore':
        return list.sort((a, b) => (b.brandRating?.commitmentScore || 0) - (a.brandRating?.commitmentScore || 0)).slice(0, 5);
      default:
        return list.slice(0, 5);
    }
  };

  const topList = getSortedCreators();

  return (
    <section id="ranking" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4 text-amber-600" /> {t.topRanking}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Líderes de Mercado y Métricas Auditadas 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Clasificación oficial basada en alcance directo, engagement verificado y satisfacción de patrocinadores.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          <button
            onClick={() => setActiveTab('marketValue')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'marketValue'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-blue-400" /> Valor de Mercado
          </button>

          <button
            onClick={() => setActiveTab('acv')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'acv'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-4 h-4 text-blue-400" /> Audiencia Media (ACV)
          </button>

          <button
            onClick={() => setActiveTab('followers')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'followers'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-blue-400" /> Seguidores
          </button>

          <button
            onClick={() => setActiveTab('engagement')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'engagement'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Percent className="w-4 h-4 text-blue-400" /> Engagement Rate
          </button>

          <button
            onClick={() => setActiveTab('brandScore')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'brandScore'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-blue-400" /> Valoración Marcas 🔵
          </button>
        </div>

        {/* Ranking Table / List Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden">
          <div className="divide-y divide-slate-200">
            {topList.map((creator, idx) => {
              const rank = idx + 1;
              let medalBg = 'bg-slate-100 text-slate-700 border border-slate-300';
              if (rank === 1) medalBg = 'bg-amber-400 text-slate-950 font-black border border-amber-500';
              if (rank === 2) medalBg = 'bg-slate-300 text-slate-900 font-black border border-slate-400';
              if (rank === 3) medalBg = 'bg-amber-700 text-white font-black border border-amber-800';

              return (
                <div
                  key={creator.id}
                  onClick={() => onSelectCreator(creator)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Rank Badge */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shadow-xs ${medalBg}`}>
                      #{rank}
                    </div>

                    {/* Avatar & Info */}
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-300 group-hover:scale-105 transition-transform"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{creator.flagEmoji}</span>
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                          {creator.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-50" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {creator.handle} • {creator.country} • {creator.category}
                      </p>
                    </div>
                  </div>

                  {/* Value Column */}
                  <div className="flex items-center gap-4 sm:gap-8 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">
                        {activeTab === 'marketValue' && 'Valor de Mercado'}
                        {activeTab === 'acv' && 'Audiencia Media'}
                        {activeTab === 'followers' && 'Seguidores Totales'}
                        {activeTab === 'engagement' && 'Tasa de Engagement'}
                        {activeTab === 'brandScore' && 'Cumplimiento Marcas'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                        {activeTab === 'marketValue' && `€${(creator.marketValueEur / 1000000).toFixed(1)}M`}
                        {activeTab === 'acv' && `${creator.acv.toLocaleString('es-ES')} CCV`}
                        {activeTab === 'followers' && `${(creator.totalFollowers / 1000000).toFixed(1)}M`}
                        {activeTab === 'engagement' && `${creator.engagementRate}%`}
                        {activeTab === 'brandScore' && `🔵 ${creator.brandRating?.commitmentScore || 99}%`}
                      </span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all hidden sm:block" />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
