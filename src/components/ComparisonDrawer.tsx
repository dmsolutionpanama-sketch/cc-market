import React from 'react';
import { Creator } from '../types';
import { X, Layers, Trash2, ArrowRight, CheckCircle2, TrendingUp, Users, Eye, Percent, DollarSign } from 'lucide-react';

interface ComparisonDrawerProps {
  creators: Creator[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromCompare: (creatorId: string) => void;
  onClearComparison: () => void;
  onViewDetails: (creator: Creator) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  creators,
  isOpen,
  onClose,
  onRemoveFromCompare,
  onClearComparison,
  onViewDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="font-extrabold text-lg text-white">
              Matriz Comparativa de Creadores ({creators.length}/3)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {creators.length > 0 && (
              <button
                onClick={onClearComparison}
                className="text-xs text-slate-400 hover:text-rose-400 font-semibold px-2 py-1 rounded hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Matrix Table */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1">
          {creators.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Layers className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-base text-slate-800">No has seleccionado creadores para comparar</p>
              <p className="text-xs text-slate-500 mt-1">
                Haz clic en "Comparar" en las tarjetas de creadores para contrastar sus métricas frente a frente.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              
              {/* Header row with creator avatars */}
              <div className="grid grid-cols-4 gap-4 border-b border-slate-200 pb-4 items-end">
                <div className="font-bold text-xs uppercase text-slate-400 tracking-wider">
                  Métrica / Creador
                </div>

                {creators.map((c) => (
                  <div key={c.id} className="relative bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                    <button
                      onClick={() => onRemoveFromCompare(c.id)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Quitar"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-14 h-14 rounded-full object-cover mx-auto border-2 border-slate-200 mb-2"
                    />
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm">{c.flagEmoji}</span>
                      <h4 className="font-bold text-slate-900 text-sm truncate">{c.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">{c.handle}</p>
                    
                    <button
                      onClick={() => {
                        onClose();
                        onViewDetails(c);
                      }}
                      className="mt-2 text-[10px] bg-slate-900 text-white hover:bg-slate-800 px-2.5 py-1 rounded-md font-semibold w-full cursor-pointer"
                    >
                      Ver Perfil
                    </button>
                  </div>
                ))}

                {/* Empty slots placeholders */}
                {Array.from({ length: 3 - creators.length }).map((_, i) => (
                  <div key={i} className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-slate-400 flex flex-col items-center justify-center min-h-[140px]">
                    <span className="text-xs font-semibold">+ Añadir Creador</span>
                  </div>
                ))}
              </div>

              {/* Matrix Rows */}
              <div className="divide-y divide-slate-100 text-xs">
                
                {/* Row: Valor de Mercado */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Valor de Mercado
                  </div>
                  {creators.map((c) => (
                    <div key={c.id} className="text-center font-mono font-black text-slate-900 text-sm">
                      €{(c.marketValueEur / 1000000).toFixed(1)}M
                    </div>
                  ))}
                </div>

                {/* Row: Audiencia Media (ACV) */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center bg-slate-50/50">
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-600" /> ACV (Audiencia Media)
                  </div>
                  {creators.map((c) => (
                    <div key={c.id} className="text-center font-mono font-extrabold text-slate-900">
                      {c.acv.toLocaleString('es-ES')}
                    </div>
                  ))}
                </div>

                {/* Row: Seguidores Totales */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-600" /> Seguidores Totales
                  </div>
                  {creators.map((c) => (
                    <div key={c.id} className="text-center font-mono font-extrabold text-slate-900">
                      {(c.totalFollowers / 1000000).toFixed(1)}M
                    </div>
                  ))}
                </div>

                {/* Row: Engagement Rate */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center bg-slate-50/50">
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald-600" /> Engagement Rate
                  </div>
                  {creators.map((c) => (
                    <div key={c.id} className="text-center font-mono font-extrabold text-emerald-700">
                      {c.engagementRate}%
                    </div>
                  ))}
                </div>

                {/* Row: Tarifa Post Estimada */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600" /> Tarifa Post Estimada
                  </div>
                  {creators.map((c) => (
                    <div key={c.id} className="text-center font-mono font-bold text-slate-900">
                      €{c.sponsorshipRates.sponsoredPost.toLocaleString('es-ES')}
                    </div>
                  ))}
                </div>

                {/* Row: Categoría & País */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center bg-slate-50/50">
                  <div className="font-semibold text-slate-700">Categoría & País</div>
                  {creators.map((c) => (
                    <div key={c.id} className="text-center text-slate-800 font-medium">
                      {c.category} ({c.country})
                    </div>
                  ))}
                </div>

                {/* Row: Top Edad Audiencia */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-slate-700">Top Rango Edad Audiencia</div>
                  {creators.map((c) => (
                    <div key={c.id} className="text-center text-slate-800 font-semibold bg-white border border-slate-200 py-1 rounded">
                      {c.demographics.topAgeGroup} años
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Cerrar Comparador
          </button>
        </div>

      </div>
    </div>
  );
};
