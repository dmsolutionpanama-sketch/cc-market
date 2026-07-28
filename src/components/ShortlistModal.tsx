import React, { useState } from 'react';
import { Creator } from '../types';
import { Bookmark, X, Trash2, Download, Printer, Check, DollarSign, Users, Eye, Sparkles, Send } from 'lucide-react';

interface ShortlistModalProps {
  shortlist: Creator[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromShortlist: (creatorId: string) => void;
  onClearShortlist: () => void;
}

export const ShortlistModal: React.FC<ShortlistModalProps> = ({
  shortlist,
  isOpen,
  onClose,
  onRemoveFromShortlist,
  onClearShortlist,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  // Aggregated calculations
  const totalFollowersCount = shortlist.reduce((sum, c) => sum + c.totalFollowers, 0);
  const totalACV = shortlist.reduce((sum, c) => sum + c.acv, 0);
  const totalPostBudget = shortlist.reduce((sum, c) => sum + c.sponsorshipRates.sponsoredPost, 0);
  const totalIntegrationBudget = shortlist.reduce((sum, c) => sum + c.sponsorshipRates.videoIntegration, 0);

  const handleExportCSV = () => {
    if (shortlist.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nombre,Handle,Plataforma,Categoria,Pais,Seguidores,ACV_Media,Valor_Mercado_EUR,Tarifa_Post_EUR\n";
    
    shortlist.forEach((c) => {
      csvContent += `"${c.name}","${c.handle}","${c.primaryPlatform}","${c.category}","${c.country}",${c.totalFollowers},${c.acv},${c.marketValueEur},${c.sponsorshipRates.sponsoredPost}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Informe_Creadores_CreatorMarket_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            <h2 className="font-extrabold text-lg text-white">
              Mi Selección & Planificador de Campaña ({shortlist.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {shortlist.length > 0 && (
              <button
                onClick={onClearShortlist}
                className="text-xs text-slate-400 hover:text-rose-400 font-semibold px-2 py-1 rounded hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Vaciar Lista
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {shortlist.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Bookmark className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-base text-slate-800">No has guardado ningún creador en tu selección</p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Haz clic en el icono de marcador en la tarjeta de un creador para guardarlo aquí y calcular estimaciones de alcance y presupuesto para tu marca.
              </p>
            </div>
          ) : (
            <>
              {/* Campaign Totals Summary Box */}
              <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 border border-slate-800 shadow-md">
                <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Métricas Acumuladas de Campaña
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 font-semibold block">Alcance Combinado</span>
                    <span className="text-xl font-extrabold font-mono text-white mt-0.5 block">
                      {(totalFollowersCount / 1000000).toFixed(1)}M
                    </span>
                    <span className="text-[10px] text-slate-400">Seguidores totales</span>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 font-semibold block">Audiencia Directo (ACV)</span>
                    <span className="text-xl font-extrabold font-mono text-emerald-400 mt-0.5 block">
                      {totalACV.toLocaleString('es-ES')}
                    </span>
                    <span className="text-[10px] text-slate-400">CCV simultáneos</span>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 font-semibold block">Presupuesto Post (1x c/u)</span>
                    <span className="text-xl font-extrabold font-mono text-amber-400 mt-0.5 block">
                      €{totalPostBudget.toLocaleString('es-ES')}
                    </span>
                    <span className="text-[10px] text-slate-400">Fee total estimado</span>
                  </div>
                </div>
              </div>

              {/* Creators Shortlist List */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">
                  Creadores Seleccionados ({shortlist.length})
                </h3>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {shortlist.map((c) => (
                    <div key={c.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{c.flagEmoji}</span>
                            <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                            <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">
                              {c.primaryPlatform}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono">{c.handle} • {c.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-right">
                        <div className="hidden sm:block">
                          <span className="text-[10px] text-slate-400 uppercase block font-sans">ACV</span>
                          <span className="font-bold text-slate-900">{c.acv.toLocaleString('es-ES')}</span>
                        </div>

                        <div className="hidden sm:block">
                          <span className="text-[10px] text-slate-400 uppercase block font-sans">Fee Post</span>
                          <span className="font-bold text-emerald-700">€{c.sponsorshipRates.sponsoredPost.toLocaleString('es-ES')}</span>
                        </div>

                        <button
                          onClick={() => onRemoveFromShortlist(c.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Quitar de lista"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer with Exports */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExportCSV}
              disabled={shortlist.length === 0}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                shortlist.length > 0
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> ¡CSV Generado!
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> Exportar Informe (CSV)
                </>
              )}
            </button>

            <button
              onClick={handlePrintPDF}
              disabled={shortlist.length === 0}
              className={`px-3 py-2 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer ${
                shortlist.length > 0
                  ? 'bg-white text-slate-800 border-slate-300 hover:bg-slate-200'
                  : 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
            >
              <Printer className="w-3.5 h-3.5" /> Imprimir / PDF
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs rounded-lg cursor-pointer"
          >
            Aceptar / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
