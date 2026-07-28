import React, { useState } from 'react';
import { Creator, LanguageCode } from '../types';
import { 
  X, CheckCircle2, TrendingUp, Users, Eye, Percent, DollarSign, 
  MapPin, Globe, Calendar, Award, Volume2, ShieldCheck, 
  Send, Bookmark, Layers, PhoneCall, Sparkles, AlertTriangle, Check
} from 'lucide-react';
import { translations } from '../data/translations';

interface CreatorDetailModalProps {
  creator: Creator | null;
  onClose: () => void;
  onToggleShortlist: (creator: Creator) => void;
  isShortlisted: boolean;
  onToggleCompare: (creator: Creator) => void;
  isCompared: boolean;
  lang: LanguageCode;
  onOpenServiceRequest: () => void;
}

export const CreatorDetailModal: React.FC<CreatorDetailModalProps> = ({
  creator,
  onClose,
  onToggleShortlist,
  isShortlisted,
  onToggleCompare,
  isCompared,
  lang,
  onOpenServiceRequest,
}) => {
  const t = translations[lang] || translations.es;
  const [proposalSent, setProposalSent] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    brandName: '',
    email: '',
    budget: '1000-5000',
    message: '',
  });

  if (!creator) return null;

  const speakCreatorInfo = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${creator.name} de ${creator.country}. Creador verificado en ${creator.primaryPlatform} con ${(creator.totalFollowers / 1000000).toFixed(1)} millones de seguidores. Rango de edad: ${creator.ageRange || 'Joven adulto'}. Categoría: ${creator.category}. Calificación de marcas: 100% de cumplimiento. ${creator.bio}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSent(true);
    setTimeout(() => {
      setProposalSent(false);
      setShowProposalForm(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-slate-950 text-white p-5 sm:p-7 relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-full bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pr-10">
            <div className="flex items-center gap-4">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-blue-500 shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* High Visibility Country Flag Badge */}
                  <span className="bg-slate-800 border border-slate-700 text-white px-3 py-1 rounded-xl text-sm font-extrabold flex items-center gap-1.5 shadow-xs">
                    <span className="text-xl leading-none">{creator.flagEmoji}</span>
                    <span>{creator.country}</span>
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{creator.name}</h2>
                  <CheckCircle2 className="w-6 h-6 text-blue-400 fill-blue-950" />
                </div>

                <p className="text-slate-400 text-sm font-mono mt-1 font-bold">{creator.handle}</p>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-3 py-0.5 rounded-lg text-xs font-bold">
                    {creator.category}
                  </span>
                  {creator.ageRange && (
                    <span className="bg-slate-800 text-slate-300 px-3 py-0.5 rounded-lg text-xs font-semibold">
                      Edad: {creator.ageRange}
                    </span>
                  )}
                  <span className="bg-slate-800 text-slate-300 px-3 py-0.5 rounded-lg text-xs font-semibold">
                    Red Principal: {creator.primaryPlatform}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Speech Synthesis Button & Valuation */}
            <div className="flex flex-col items-start sm:items-end gap-2">
              <button
                onClick={speakCreatorInfo}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-blue-400 hover:text-white font-extrabold text-xs flex items-center gap-2 border border-slate-700 transition-all cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>{t.listenAudio}</span>
              </button>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-left sm:text-right min-w-[170px]">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">
                  Valor de Mercado
                </span>
                <span className="text-2xl font-black text-blue-400 font-mono">
                  €{(creator.marketValueEur / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Bio Overview */}
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 sm:p-5">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 mb-1.5">
              Biografía & Perfil de Creador
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {creator.bio}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block">Audiencia ACV</span>
              <span className="text-2xl font-black text-blue-400 font-mono mt-1 block">
                {creator.acv >= 1000 ? `${(creator.acv / 1000).toFixed(1)}K` : creator.acv}
              </span>
              <span className="text-[10px] text-slate-400">Espectadores en vivo</span>
            </div>

            <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block">Seguidores Totales</span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">
                {(creator.totalFollowers / 1000000).toFixed(1)}M
              </span>
              <span className="text-[10px] text-slate-400">Multi-redes</span>
            </div>

            <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block">Engagement Rate</span>
              <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
                {creator.engagementRate}%
              </span>
              <span className="text-[10px] text-slate-400">Interacción auditada</span>
            </div>

            <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block">Vistas Mensuales</span>
              <span className="text-2xl font-black text-blue-400 font-mono mt-1 block">
                {(creator.monthlyViews / 1000000).toFixed(1)}M
              </span>
              <span className="text-[10px] text-slate-400">Impacto estimado</span>
            </div>
          </div>

          {/* Semáforo de Valoración por Marcas (Traffic Light Rating) */}
          <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-base">{t.brandTrafficLight}</h3>
              </div>
              <span className="px-3 py-1 bg-blue-600 text-white font-black text-xs rounded-full uppercase tracking-wider border border-blue-500">
                {creator.brandRating?.statusText || '🔵 100% Cumplimiento Garantizado'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse shrink-0"></div>
                <div>
                  <span className="text-xs font-bold text-blue-950 block">{t.highCommitment}</span>
                  <span className="text-[11px] text-blue-800">Entregables a tiempo, alto ROI.</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-400 shrink-0"></div>
                <div>
                  <span className="text-xs font-bold text-amber-950 block">{t.mediumCommitment}</span>
                  <span className="text-[11px] text-amber-800">Cumplimiento en margen estándar.</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 shrink-0"></div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{t.underReview}</span>
                  <span className="text-[11px] text-slate-600">Proceso de auditoría.</span>
                </div>
              </div>
            </div>

            {/* Brand Reviews List */}
            {creator.brandRating?.reviews && creator.brandRating.reviews.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Opiniones Verificadas de Marcas:</span>
                {creator.brandRating.reviews.map((rev, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs flex justify-between items-start gap-3">
                    <div>
                      <span className="font-extrabold text-slate-900">{rev.brandName}:</span>
                      <p className="text-slate-700 italic mt-0.5">"{rev.comment}"</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded shrink-0 border border-blue-200">
                      🔵 Verificado
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Histórico de Trabajo con Marcas y Tiempo de Ocupación */}
          {creator.brandWorkHistory && creator.brandWorkHistory.length > 0 && (
            <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-300">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-base">{t.brandHistory}</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                      <th className="p-2.5 rounded-l-lg">Marca</th>
                      <th className="p-2.5">Tiempo Ocupado</th>
                      <th className="p-2.5">Tipo de Campaña</th>
                      <th className="p-2.5">Período</th>
                      <th className="p-2.5 rounded-r-lg">Valoración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {creator.brandWorkHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-extrabold text-slate-900">{item.brandName}</td>
                        <td className="p-2.5 text-blue-700 font-bold font-mono">{item.durationMonths}</td>
                        <td className="p-2.5 text-slate-700">{item.campaignType}</td>
                        <td className="p-2.5 text-slate-500 font-mono">{item.year}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded border border-blue-200">
                            {item.satisfaction}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Media Kit Packages & Rate Cards */}
          {creator.mediaKitPacks && creator.mediaKitPacks.length > 0 && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <h3 className="font-extrabold text-white text-base">{t.rateCardPacks}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {creator.mediaKitPacks.map((pack, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      pack.popular
                        ? 'bg-slate-800 border-blue-500 ring-2 ring-blue-500/30'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div>
                      {pack.popular && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white font-black text-[10px] rounded uppercase tracking-wider mb-2 inline-block">
                          ★ Más Popular
                        </span>
                      )}
                      <h4 className="font-extrabold text-white text-sm mb-1">{pack.title}</h4>
                      <p className="text-xs text-slate-300 mb-3">{pack.description}</p>

                      <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                        {pack.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold">Precio Oficial:</span>
                      <span className="text-lg font-black text-blue-400 font-mono">
                        ${pack.priceUSD} USD
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Request & Calling Platform Banner */}
          <div className="bg-amber-500 text-slate-950 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-amber-400">
            <div>
              <h4 className="font-black text-base flex items-center gap-2">
                <PhoneCall className="w-5 h-5" /> {t.requestService}
              </h4>
              <p className="text-xs font-semibold text-slate-900 mt-1 max-w-xl">
                {t.requestServiceSubtitle}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenServiceRequest();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md border border-slate-800"
            >
              Solicitar Cotización por Llamada
            </button>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(creator)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isCompared
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isCompared ? 'En Comparador' : 'Añadir a Comparar'}</span>
            </button>

            <button
              onClick={() => onToggleShortlist(creator)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isShortlisted
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-white' : ''}`} />
              <span>{isShortlisted ? 'En Selección' : 'Guardar'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 font-extrabold text-xs rounded-xl cursor-pointer border border-slate-700"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};
