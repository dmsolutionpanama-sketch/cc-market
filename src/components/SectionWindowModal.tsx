import React from 'react';
import { X, ShieldCheck, Maximize2, Sparkles } from 'lucide-react';

interface SectionWindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const SectionWindowModal: React.FC<SectionWindowModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border-2 border-slate-300 overflow-hidden flex flex-col my-auto">
        
        {/* Window Top Bar (Estilo Ventana Especializada) */}
        <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Window Control Dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} title="Cerrar Ventana"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            </div>

            {icon && (
              <div className="p-2 rounded-xl bg-slate-800 text-blue-400 border border-slate-700">
                {icon}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">{title}</h2>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Ventana de Sección
                </span>
              </div>
              {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Protegido & Auditado</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer ml-2"
              title="Cerrar Ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Window Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 text-slate-900">
          {children}
        </div>

        {/* Window Footer */}
        <div className="px-5 py-3 bg-white border-t border-slate-300 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>CC-Market Ventana de Análisis 2026 • Datos en Tiempo Real</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-lg transition-colors cursor-pointer border border-slate-700"
          >
            Cerrar Ventana
          </button>
        </div>

      </div>
    </div>
  );
};
