import React, { useState } from 'react';
import { Creator, LanguageCode } from '../types';
import { 
  X, CheckCircle2, TrendingUp, Users, Eye, Percent, DollarSign, 
  MapPin, Globe, Calendar, Award, Volume2, ShieldCheck, 
  Send, Bookmark, Layers, PhoneCall, Sparkles, AlertTriangle, Check, Star, ExternalLink, Lock, Building2, FileText
} from 'lucide-react';
import { translations } from '../data/translations';
import { SocialPlatformIcon } from './SocialPlatformIcon';

interface CreatorDetailModalProps {
  creator: Creator | null;
  onClose: () => void;
  onToggleShortlist: (creator: Creator) => void;
  isShortlisted: boolean;
  onToggleCompare?: (creator: Creator) => void;
  isCompared?: boolean;
  lang: LanguageCode;
  onOpenServiceRequest: () => void;
  isBrandValidated?: boolean;
  onValidateBrand?: () => void;
}

export const CreatorDetailModal: React.FC<CreatorDetailModalProps> = ({
  creator,
  onClose,
  onToggleShortlist,
  isShortlisted,
  lang,
  onOpenServiceRequest,
  isBrandValidated = false,
  onValidateBrand,
}) => {
  const t = translations[lang] || translations.es;
  const [selectedUserRating, setSelectedUserRating] = useState<number>(
    creator?.brandRating?.starRating || creator?.starRating || 4.9
  );
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  if (!creator) return null;

  const handleRateCreator = (stars: number) => {
    setSelectedUserRating(stars);
    setRatingSubmitted(true);
    setTimeout(() => setRatingSubmitted(false), 3000);
  };

  const speakCreatorInfo = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${creator.name} de ${creator.country}. Creador verificado en ${creator.primaryPlatform} con ${(creator.totalFollowers / 1000000).toFixed(1)} millones de seguidores. Calificación de marcas: ${selectedUserRating.toFixed(1)} de 5 estrellas. ${creator.bio}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
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
                  {(() => {
                    const primaryP = creator.platforms?.find(p => p.platform === creator.primaryPlatform);
                    return (
                      <a
                        href={primaryP?.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                        title={`Abrir ${creator.primaryPlatform}`}
                      >
                        <SocialPlatformIcon platform={creator.primaryPlatform} size="xs" />
                        <span>{creator.primaryPlatform}</span>
                        <ExternalLink className="w-3 h-3 text-blue-400" />
                      </a>
                    );
                  })()}
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
          
          {/* Biografía Overview */}
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 sm:p-5">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 mb-1.5">
              Biografía & Perfil de Creador
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {creator.bio}
            </p>
          </div>

          {/* 1) AUDIENCIA Y MÉTRICAS PRINCIPALES */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 mb-2">
              1. Audiencia y Métricas Auditadas
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 block">Audiencia ACV</span>
                <span className="text-2xl font-black text-blue-400 font-mono mt-1 block">
                  {creator.acv >= 1000 ? `${(creator.acv / 1000).toFixed(1)}K` : creator.acv}
                </span>
                <span className="text-[10px] text-slate-400">Espectadores simultáneos</span>
              </div>

              <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 block">Seguidores Totales</span>
                <span className="text-2xl font-black text-white font-mono mt-1 block">
                  {(creator.totalFollowers / 1000000).toFixed(1)}M
                </span>
                <span className="text-[10px] text-slate-400">Multi-plataforma</span>
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
          </div>

          {/* 2) CALIFICACIÓN Y EVALUACIONES DE MARCAS */}
          <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-slate-900 text-base">2. Calificación por Marcas (1 a 5 Estrellas)</h3>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-lg border border-amber-300 flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Score Promedio: {selectedUserRating.toFixed(1)} / 5.0</span>
              </span>
            </div>

            {/* Interactive Rating Component */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Selecciona tu Calificación (1 al 5)</h4>
                  <p className="text-xs text-slate-600">Haz clic en las estrellas para evaluar el cumplimiento comercial de este creador.</p>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starIdx) => {
                    const active = (hoverRating || selectedUserRating) >= starIdx;
                    return (
                      <button
                        key={starIdx}
                        type="button"
                        onMouseEnter={() => setHoverRating(starIdx)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => handleRateCreator(starIdx)}
                        className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                        title={`Calificar ${starIdx} estrella${starIdx > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            active ? 'text-amber-500 fill-amber-400' : 'text-slate-300 fill-slate-100'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {ratingSubmitted && (
                <div className="mt-2.5 p-2 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold text-center animate-fade-in">
                  ✓ ¡Gracias! Tu calificación de {selectedUserRating} estrella(s) ha sido registrada exitosamente.
                </div>
              )}
            </div>

            {/* Brand Reviews List */}
            {creator.brandRating?.reviews && creator.brandRating.reviews.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Opiniones Verificadas de Marcas:</span>
                {creator.brandRating.reviews.map((rev, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs flex justify-between items-start gap-3">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        ))}
                        <span className="font-extrabold text-slate-900 ml-1">{rev.brandName}</span>
                      </div>
                      <p className="text-slate-700 italic">"{rev.comment}"</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded shrink-0 border border-blue-200">
                      ★ Verificado
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Histórico de Trabajo con Marcas */}
            {creator.brandWorkHistory && creator.brandWorkHistory.length > 0 && (
              <div className="pt-3 border-t border-slate-300">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-amber-500" />
                  <h4 className="font-extrabold text-slate-900 text-sm">Histórico de Trabajos con Empresas</h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                        <th className="p-2">Marca</th>
                        <th className="p-2">Tiempo Ocupado</th>
                        <th className="p-2">Tipo de Campaña</th>
                        <th className="p-2">Período</th>
                        <th className="p-2">Valoración</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {creator.brandWorkHistory.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2 font-extrabold text-slate-900">{item.brandName}</td>
                          <td className="p-2 text-blue-700 font-bold font-mono">{item.durationMonths}</td>
                          <td className="p-2 text-slate-700">{item.campaignType}</td>
                          <td className="p-2 text-slate-500 font-mono">{item.year}</td>
                          <td className="p-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded border border-blue-200 text-[10px]">
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
          </div>

          {/* 3) TARIFA OCULTA Y MEDIA KIT (SOLO PARA MARCAS VALIDADAS) */}
          {isBrandValidated ? (
            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-500 shadow-xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="font-black text-white text-base sm:text-lg">3. Tarifas Oficiales & Media Kit (Vista Marca Validada)</h3>
                    <p className="text-xs text-emerald-400 font-medium">✓ Acceso concedido a la estructura de precios autorizada por el creador.</p>
                  </div>
                </div>
                <span className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider shrink-0 shadow-xs">
                  Empresa Verificada
                </span>
              </div>

              {/* Individual Sponsorship Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Post / Reel Patrocinado</span>
                  <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                    ${creator.sponsorshipRates.sponsoredPost.toLocaleString()} USD
                  </span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Integración en Video HD</span>
                  <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                    ${creator.sponsorshipRates.videoIntegration.toLocaleString()} USD
                  </span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Embajador Mensual</span>
                  <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                    ${creator.sponsorshipRates.monthlyAmbassador.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Media Kit Packages */}
              {creator.mediaKitPacks && creator.mediaKitPacks.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-extrabold text-sm text-slate-300 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Paquetes de Media Kit
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {creator.mediaKitPacks.map((pack, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border flex flex-col justify-between ${
                          pack.popular
                            ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/30'
                            : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <div>
                          {pack.popular && (
                            <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded uppercase tracking-wider mb-2 inline-block">
                              ★ Recomendado
                            </span>
                          )}
                          <h4 className="font-extrabold text-white text-sm mb-1">{pack.title}</h4>
                          <p className="text-xs text-slate-300 mb-3">{pack.description}</p>

                          <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                            {pack.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-bold">Tarifa Empresa:</span>
                          <span className="text-lg font-black text-emerald-400 font-mono">
                            ${pack.priceUSD} USD
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-950 border-2 border-slate-800 text-white rounded-2xl p-6 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm mb-3">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>3. Tarifas y Media Kit Oficial Reservados para Marcas Validadas</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-4 font-medium leading-relaxed">
                Para proteger la confidencialidad de las alianzas comerciales, todas las empresas deben ser validadas bajo nuestro estándar de verificación previo a visualizar los costos exactos y paquetes de Media Kit.
              </p>
              {onValidateBrand && (
                <button
                  type="button"
                  onClick={onValidateBrand}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md border border-blue-400 cursor-pointer inline-flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>🔓 Validar Empresa / Modo Marca</span>
                </button>
              )}
            </div>
          )}

          {/* 4) REDES SOCIALES AL FINAL DEL PROFILE */}
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 sm:p-5">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 mb-2">
              4. Canales & Redes Sociales Directas
            </h4>
            {creator.platforms && creator.platforms.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {creator.platforms.map((plat, pIdx) => (
                  <a
                    key={pIdx}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-white hover:bg-blue-600 hover:text-white border border-slate-300 text-slate-800 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-2xs group cursor-pointer"
                  >
                    <SocialPlatformIcon platform={plat.platform} size="sm" />
                    <span>{plat.platform}</span>
                    <span className="text-slate-500 group-hover:text-white/90 text-xs font-mono font-bold">
                      ({plat.followers})
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No hay enlaces sociales adicionales configurados.</p>
            )}
          </div>

          {/* Service Request Banner */}
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
              onClick={() => onToggleShortlist(creator)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 border transition-all cursor-pointer ${
                isShortlisted
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-white' : 'text-blue-600'}`} />
              <span>{isShortlisted ? 'Guardado en Selección' : 'Guardar en Mi Selección'}</span>
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
