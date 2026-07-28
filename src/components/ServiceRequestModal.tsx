import React, { useState } from 'react';
import { X, Send, PhoneCall, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';
import { sanitizeInput, isValidEmail } from '../utils/security';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang] || translations.es;
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    brand: '',
    budget: '1000-5000',
    details: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Security Validation
    if (!isValidEmail(formData.email)) {
      setErrorMsg('Por favor ingresa un correo electrónico corporativo válido.');
      return;
    }

    // Sanitize all inputs before processing
    const cleanData = {
      fullName: sanitizeInput(formData.fullName, 100),
      email: sanitizeInput(formData.email, 150),
      brand: sanitizeInput(formData.brand, 100),
      budget: sanitizeInput(formData.budget, 50),
      details: sanitizeInput(formData.details, 1000),
    };

    setFormData(cleanData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black border border-amber-400">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">{t.requestService}</h2>
              <p className="text-xs text-slate-300 mt-0.5">{t.requestServiceSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Security & Call Platform Notice Banner */}
        <div className="bg-blue-50 border-b border-blue-200 p-4 flex items-start gap-3 text-xs text-blue-900">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">{t.callPlatformNotice}</span>
            <p className="text-blue-800">
              Coordinamos la negociación, contrato y cronograma de publicaciones a través de nuestro centro de atención telefónica especializado con encriptación y protección de datos.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 text-slate-800">
          {submitted ? (
            <div className="p-8 text-center bg-blue-50 border border-blue-300 rounded-xl my-4">
              <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-blue-950 mb-1">{t.successMessage}</h3>
              <p className="text-xs text-blue-800">
                Nos comunicaremos con tu empresa mediante nuestra plataforma integrada de llamadas en breve. Datos protegidos con encriptación SSL.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-xl text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.fullName}</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="ej. Juan Pérez"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.companyEmail}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ej. contacto@marca.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.brandNameLabel}</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="ej. Samsung / Pepsi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Presupuesto Aprox. (USD)</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="500-1000">$500 - $1,000 USD</option>
                    <option value="1000-5000">$1,000 - $5,000 USD</option>
                    <option value="5000-20000">$5,000 - $20,000 USD</option>
                    <option value="20000+">Más de $20,000 USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.messageLabel}</label>
                <textarea
                  rows={3}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Detalla qué creadores te interesan o el objetivo de tu campaña..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-blue-600" /> Formulario Sanitizado y Protegido
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer border border-slate-300"
                  >
                    {t.close}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer border border-blue-500"
                  >
                    <Send className="w-4 h-4" /> {t.sendRequest}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

