import React, { useState } from 'react';
import { 
  X, ShieldCheck, CheckCircle2, AlertCircle, Eye, 
  Search, UserCheck, UserX, CreditCard, Star, FileText, 
  Calendar, RefreshCw, ChevronRight, Lock, Sparkles, Filter
} from 'lucide-react';
import { Creator, CreatorUserAccount, CreatorApprovalStatus } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: CreatorUserAccount[];
  creators: Creator[];
  onToggleCreatorStatus: (accountId: string, newStatus: CreatorApprovalStatus) => void;
  onOpenCreatorDetail: (creator: Creator) => void;
  onDeleteAccount?: (accountId: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  accounts,
  creators,
  onToggleCreatorStatus,
  onOpenCreatorDetail,
  onDeleteAccount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedAccDetail, setSelectedAccDetail] = useState<{ acc: CreatorUserAccount; creator: Creator } | null>(null);

  if (!isOpen) return null;

  // Stats calculation
  const totalAccounts = accounts.length;
  const pendingCount = accounts.filter(a => a.status === 'pending').length;
  const approvedCount = accounts.filter(a => a.status === 'approved').length;
  const rejectedCount = accounts.filter(a => a.status === 'rejected').length;

  // Filtered Accounts
  const filteredList = accounts.filter((acc) => {
    const creator = creators.find((c) => c.id === acc.creatorId);
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch = 
      acc.email.toLowerCase().includes(searchLower) ||
      (creator && (
        creator.name.toLowerCase().includes(searchLower) ||
        creator.handle.toLowerCase().includes(searchLower) ||
        creator.country.toLowerCase().includes(searchLower)
      ));

    const matchesStatus = statusFilter === 'all' || acc.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Admin Header */}
        <div className="bg-purple-900 text-white px-6 py-4 flex items-center justify-between border-b border-purple-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-purple-950 flex items-center justify-center font-black text-xl shadow-md">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">Panel Administrador CC-Market</h2>
                <span className="text-[10px] bg-amber-400 text-purple-950 font-black px-2 py-0.5 rounded-full uppercase">
                  Gestión & Auditoría
                </span>
              </div>
              <p className="text-xs text-purple-200 font-medium">
                Revisión de perfiles solicitantes, alta y baja en catálogo, y validación de cuentas bancarias.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-purple-800 text-purple-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Header Cards */}
        <div className="bg-slate-100 p-4 border-b border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          
          <button
            onClick={() => setStatusFilter('all')}
            className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
              statusFilter === 'all' ? 'bg-purple-950 text-white border-purple-900 shadow-sm' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-[10px] font-black uppercase block opacity-75">
              Total Registrados
            </span>
            <span className="text-xl font-black">{totalAccounts}</span>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
              statusFilter === 'pending' ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-[10px] font-black uppercase block opacity-75">
              Pendientes de Alta
            </span>
            <span className="text-xl font-black text-amber-600 flex items-center gap-1">
              <span>{pendingCount}</span>
              {pendingCount > 0 && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('approved')}
            className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
              statusFilter === 'approved' ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-[10px] font-black uppercase block opacity-75">
              Dados de Alta (Activos)
            </span>
            <span className="text-xl font-black text-emerald-600">{approvedCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('rejected')}
            className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
              statusFilter === 'rejected' ? 'bg-red-600 text-white border-red-700 shadow-sm' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-[10px] font-black uppercase block opacity-75">
              Dados de Baja (Inactivos)
            </span>
            <span className="text-xl font-black text-red-600">{rejectedCount}</span>
          </button>

        </div>

        {/* Filter and Search Toolbar */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar creador por nombre, email o handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600">Filtrar Estado:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 cursor-pointer"
            >
              <option value="all">Todos ({totalAccounts})</option>
              <option value="pending">Pendiente de Alta ({pendingCount})</option>
              <option value="approved">Dado de Alta / Activo ({approvedCount})</option>
              <option value="rejected">Dado de Baja / Inactivo ({rejectedCount})</option>
            </select>
          </div>

        </div>

        {/* Table / List of Registered Creators */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {filteredList.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <UserX className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-black text-slate-700">No se encontraron creadores</h3>
              <p className="text-xs text-slate-500">Prueba ajustando el término de búsqueda o el filtro de estado.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredList.map((acc) => {
                const creator = creators.find((c) => c.id === acc.creatorId);
                const isApproved = acc.status === 'approved';
                const isRejected = acc.status === 'rejected';
                const isPending = acc.status === 'pending';

                return (
                  <div 
                    key={acc.id}
                    className="p-4 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-2xl shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
                  >
                    
                    {/* Left Creator Info */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <img
                        src={creator?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                        alt={creator?.name || 'Creador'}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-200 shrink-0 shadow-xs"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm text-slate-900 truncate">
                            {creator?.name || 'Creador Sin Nombre'}
                          </h4>
                          <span className="text-xs font-bold text-blue-600">
                            {creator?.handle}
                          </span>
                          <span className="text-xs">{creator?.flagEmoji} {creator?.country}</span>
                        </div>

                        <div className="text-xs text-slate-500 font-medium flex items-center gap-3 mt-0.5 flex-wrap">
                          <span>Email: <strong className="text-slate-800">{acc.email}</strong></span>
                          <span>•</span>
                          <span>Categoría: <strong className="text-slate-800">{creator?.category}</strong></span>
                          <span>•</span>
                          <span>Seguidores: <strong className="text-slate-800">{(creator?.totalFollowers || 0).toLocaleString()}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-black">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          DADO DE ALTA (ACTIVO)
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black animate-pulse">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          PENDIENTE DE REVISIÓN
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 border border-red-300 rounded-full text-xs font-black">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                          DADO DE BAJA (INACTIVO)
                        </span>
                      )}
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                      
                      {/* Button: Ver Expediente & Banco */}
                      <button
                        onClick={() => setSelectedAccDetail({ acc, creator: creator! })}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-extrabold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-300"
                        title="Ver datos de pago, cédula y disclaimer aceptado"
                      >
                        <FileText className="w-3.5 h-3.5 text-purple-700" />
                        <span>Expediente</span>
                      </button>

                      {/* Action Button: Dar de Alta (Approve) */}
                      {!isApproved && (
                        <button
                          onClick={() => onToggleCreatorStatus(acc.id, 'approved')}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Dar de Alta</span>
                        </button>
                      )}

                      {/* Action Button: Dar de Baja (Reject / Deactivate) */}
                      {!isRejected && (
                        <button
                          onClick={() => onToggleCreatorStatus(acc.id, 'rejected')}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                        >
                          <UserX className="w-3.5 h-3.5" />
                          <span>Dar de Baja</span>
                        </button>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Detailed Account Expediente Drawer Modal */}
        {selectedAccDetail && (
          <div className="absolute inset-0 bg-slate-900/90 z-20 p-6 flex items-center justify-center overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-6 border-2 border-slate-300 shadow-2xl space-y-5 my-auto max-h-[88vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">
                      Expediente de Creador & Datos Bancarios
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedAccDetail.creator?.name} ({selectedAccDetail.acc.email})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAccDetail(null)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Banking & Intermediary Payment Details */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300 space-y-3">
                <h4 className="text-xs font-black uppercase text-purple-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Datos de Pago para Intermediación CC-Market</span>
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium block">Método de Cobro:</span>
                    <strong className="text-slate-900 uppercase">{selectedAccDetail.acc.paymentDetails.paymentType}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium block">Cédula / RUC / Tax ID:</span>
                    <strong className="text-slate-900">{selectedAccDetail.acc.paymentDetails.taxIdOrRuc || 'No especificado'}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium block">Titular de la Cuenta:</span>
                    <strong className="text-slate-900">{selectedAccDetail.acc.paymentDetails.accountHolderName}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium block">Banco:</span>
                    <strong className="text-slate-900">{selectedAccDetail.acc.paymentDetails.bankName || 'N/A'}</strong>
                  </div>

                  <div className="col-span-2">
                    <span className="text-slate-500 font-medium block">Número de Cuenta / IBAN:</span>
                    <strong className="text-slate-900 font-mono text-sm bg-white px-2 py-1 rounded border border-slate-200 block mt-0.5">
                      {selectedAccDetail.acc.paymentDetails.accountNumber || selectedAccDetail.acc.paymentDetails.paypalEmail || selectedAccDetail.acc.paymentDetails.phoneZelleYappi || 'Sin datos'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Disclaimer & Audit Verification */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-2 font-black text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Disclaimer & Términos Aceptados</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  El usuario aceptó expresamente el acuerdo de veracidad de métricas e intermediación de pagos de CC-Market.
                </p>
                <div className="text-[10px] text-emerald-600 font-medium pt-1">
                  Registrado el: {new Date(selectedAccDetail.acc.registeredAt).toLocaleString()}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedAccDetail(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs"
                >
                  Cerrar Expediente
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
