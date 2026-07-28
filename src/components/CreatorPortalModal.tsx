import React, { useState } from 'react';
import { 
  X, User, ShieldCheck, CheckCircle2, AlertCircle, 
  CreditCard, Edit3, Save, Eye, Camera, RefreshCw, 
  Sparkles, DollarSign, ExternalLink, Globe, FileText
} from 'lucide-react';
import { Creator, CreatorUserAccount, PaymentDetails } from '../types';

interface CreatorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAccount: CreatorUserAccount;
  creatorProfile: Creator;
  onUpdateCreatorProfile: (updatedProfile: Creator, updatedPayment?: PaymentDetails) => void;
  onOpenDetailModal: (creator: Creator) => void;
}

export const CreatorPortalModal: React.FC<CreatorPortalModalProps> = ({
  isOpen,
  onClose,
  userAccount,
  creatorProfile,
  onUpdateCreatorProfile,
  onOpenDetailModal
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'rates' | 'payment'>('profile');
  const [saveSuccess, setSaveSuccess] = useState<string>('');

  // Editable Profile Form State
  const [name, setName] = useState(creatorProfile.name);
  const [handle, setHandle] = useState(creatorProfile.handle);
  const [avatar, setAvatar] = useState(creatorProfile.avatar);
  const [bio, setBio] = useState(creatorProfile.bio);
  const [country, setCountry] = useState(creatorProfile.country);
  const [category, setCategory] = useState(creatorProfile.category);

  // Editable Followers State
  const [igFollowers, setIgFollowers] = useState(
    creatorProfile.platforms.find(p => p.platform === 'Instagram')?.followers || '100K'
  );
  const [ttFollowers, setTtFollowers] = useState(
    creatorProfile.platforms.find(p => p.platform === 'TikTok')?.followers || ''
  );
  const [ytFollowers, setYtFollowers] = useState(
    creatorProfile.platforms.find(p => p.platform === 'YouTube')?.followers || ''
  );

  // Editable Rates State
  const [sponsoredPost, setSponsoredPost] = useState(creatorProfile.sponsorshipRates.sponsoredPost);
  const [videoIntegration, setVideoIntegration] = useState(creatorProfile.sponsorshipRates.videoIntegration);
  const [monthlyAmbassador, setMonthlyAmbassador] = useState(creatorProfile.sponsorshipRates.monthlyAmbassador);

  // Editable Media Kit Package
  const primaryPack = creatorProfile.mediaKitPacks?.[0] || {
    title: 'Pack Especial Reel + Stories',
    priceUSD: 850,
    description: 'Exposición masiva a la audiencia.',
    deliverables: ['1 Reel de alta calidad', '3 Stories con enlace direct']
  };
  const [packTitle, setPackTitle] = useState(primaryPack.title);
  const [packPrice, setPackPrice] = useState(primaryPack.priceUSD);
  const [packDeliverables, setPackDeliverables] = useState(primaryPack.deliverables.join(', '));

  // Editable Payment Details
  const pDetails = userAccount.paymentDetails || {
    paymentType: 'bank_transfer',
    bankName: 'Banco General',
    accountNumber: '04-01-98-000000',
    accountHolderName: creatorProfile.name,
    taxIdOrRuc: '8-888-8888',
    country: creatorProfile.country
  };

  const [paymentType, setPaymentType] = useState(pDetails.paymentType);
  const [bankName, setBankName] = useState(pDetails.bankName || '');
  const [accountNumber, setAccountNumber] = useState(pDetails.accountNumber || '');
  const [accountHolderName, setAccountHolderName] = useState(pDetails.accountHolderName || creatorProfile.name);
  const [taxIdOrRuc, setTaxIdOrRuc] = useState(pDetails.taxIdOrRuc || '');
  const [paypalEmail, setPaypalEmail] = useState(pDetails.paypalEmail || '');
  const [phoneZelleYappi, setPhoneZelleYappi] = useState(pDetails.phoneZelleYappi || '');

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Re-calculate followers
    const parseNum = (str: string) => {
      if (!str) return 0;
      const clean = str.toUpperCase().trim();
      if (clean.endsWith('M')) return parseFloat(clean) * 1000000;
      if (clean.endsWith('K')) return parseFloat(clean) * 1000;
      return parseInt(clean) || 50000;
    };

    const igNum = parseNum(igFollowers);
    const ttNum = parseNum(ttFollowers);
    const ytNum = parseNum(ytFollowers);
    const totalCount = (igNum || 50000) + ttNum + ytNum;

    const updatedPlatforms: any[] = [];
    if (igFollowers) {
      updatedPlatforms.push({
        platform: 'Instagram',
        followers: igFollowers,
        followersCount: igNum || 50000,
        url: `https://instagram.com/${handle.replace('@', '')}`
      });
    }
    if (ttFollowers) {
      updatedPlatforms.push({
        platform: 'TikTok',
        followers: ttFollowers,
        followersCount: ttNum,
        url: `https://tiktok.com/@${handle.replace('@', '')}`
      });
    }
    if (ytFollowers) {
      updatedPlatforms.push({
        platform: 'YouTube',
        followers: ytFollowers,
        followersCount: ytNum,
        url: `https://youtube.com/@${handle.replace('@', '')}`
      });
    }

    const updatedCreator: Creator = {
      ...creatorProfile,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      avatar: avatar.trim() || creatorProfile.avatar,
      bio,
      country,
      category,
      platforms: updatedPlatforms.length > 0 ? updatedPlatforms : creatorProfile.platforms,
      totalFollowers: totalCount,
      sponsorshipRates: {
        sponsoredPost: Number(sponsoredPost),
        videoIntegration: Number(videoIntegration),
        monthlyAmbassador: Number(monthlyAmbassador)
      },
      mediaKitPacks: [
        {
          title: packTitle,
          priceUSD: Number(packPrice),
          description: 'Paquete especial actualizado por el creador.',
          deliverables: packDeliverables.split(',').map(s => s.trim()),
          popular: true
        }
      ]
    };

    const updatedPayment: PaymentDetails = {
      paymentType,
      bankName,
      accountNumber,
      accountHolderName,
      taxIdOrRuc,
      paypalEmail,
      phoneZelleYappi,
      country
    };

    onUpdateCreatorProfile(updatedCreator, updatedPayment);
    setSaveSuccess('¡Perfil, métricas y datos de pago actualizados correctamente!');
    setTimeout(() => setSaveSuccess(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={avatar || creatorProfile.avatar}
              alt={name}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">{name}</h2>
                <span className="text-xs font-bold text-slate-400">{handle}</span>
              </div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <span>Portal de Gestión de Creador</span>
                <span className="text-slate-600">•</span>
                <span>{userAccount.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetailModal(creatorProfile)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Ficha Pública</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-700">Estado de Cuenta & Catálogo:</span>
            {userAccount.status === 'approved' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-black text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                DADO DE ALTA (ACTIVO EN CATÁLOGO)
              </span>
            ) : userAccount.status === 'rejected' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300 font-black text-xs">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                DADO DE BAJA / INACTIVO
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                PENDIENTE DE VALIDACIÓN POR ADMINISTRACIÓN
              </span>
            )}
          </div>

          <div className="text-[11px] font-bold text-slate-500">
            Rating: ⭐ <strong className="text-slate-900">5.0 / 5.0</strong>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 font-extrabold text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === 'profile' ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Perfil & Redes</span>
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`py-3 flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === 'rates' ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Tarifas & Media Kit</span>
          </button>

          <button
            onClick={() => setActiveTab('payment')}
            className={`py-3 flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === 'payment' ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Datos Bancarios (Pago Directo)</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {saveSuccess && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-900 text-xs font-black flex items-center gap-2 shadow-xs animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{saveSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">

            {/* TAB 1: PERFIL Y REDES */}
            {activeTab === 'profile' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="relative shrink-0">
                    <img
                      src={avatar || creatorProfile.avatar}
                      alt={name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow-xs">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      URL de Foto de Perfil (Avatar)
                    </label>
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Nombre Público
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Handle (@)
                    </label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      País de Residencia
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      <option value="Panamá">🇵🇦 Panamá</option>
                      <option value="Nicaragua">🇳🇮 Nicaragua</option>
                      <option value="Venezuela">🇻🇪 Venezuela</option>
                      <option value="El Salvador">🇸🇻 El Salvador</option>
                      <option value="Guatemala">🇬🇹 Guatemala</option>
                      <option value="España">🇪🇸 España</option>
                      <option value="México">🇲🇽 México</option>
                      <option value="Estados Unidos">🇺🇸 Estados Unidos</option>
                      <option value="Colombia">🇨🇴 Colombia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Categoría Principal
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      <option value="Entretenimiento">Entretenimiento</option>
                      <option value="Reviews & Humor">Reviews & Humor</option>
                      <option value="Moda y Estilo">Moda y Estilo</option>
                      <option value="Deportes">Deportes</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Tech & Gadgets">Tech & Gadgets</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Biografía / Descripción Auditada
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                {/* Followers per platform */}
                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-700">
                    Métricas de Seguidores por Red Social
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Instagram Followers
                      </label>
                      <input
                        type="text"
                        value={igFollowers}
                        onChange={(e) => setIgFollowers(e.target.value)}
                        placeholder="Ej: 1.3M"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        TikTok Followers
                      </label>
                      <input
                        type="text"
                        value={ttFollowers}
                        onChange={(e) => setTtFollowers(e.target.value)}
                        placeholder="Ej: 800K"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        YouTube Followers
                      </label>
                      <input
                        type="text"
                        value={ytFollowers}
                        onChange={(e) => setYtFollowers(e.target.value)}
                        placeholder="Ej: 450K"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: TARIFAS Y MEDIA KIT */}
            {activeTab === 'rates' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-amber-900 text-xs">
                  <strong>💡 Consejo de Tarifas:</strong> Las marcas anunciantes contratan directamente estos precios en USD. Procura mantener tus valores actualizados para acelerar las propuestas de marcas.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Post Patrocinado ($ USD)
                    </label>
                    <input
                      type="number"
                      value={sponsoredPost}
                      onChange={(e) => setSponsoredPost(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Reel / Video ($ USD)
                    </label>
                    <input
                      type="number"
                      value={videoIntegration}
                      onChange={(e) => setVideoIntegration(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                      Embajador Mensual ($ USD)
                    </label>
                    <input
                      type="number"
                      value={monthlyAmbassador}
                      onChange={(e) => setMonthlyAmbassador(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                {/* Pack Media Kit Custom */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300 space-y-3">
                  <h4 className="text-xs font-black uppercase text-blue-700">
                    📦 Configuración de Paquete Promocional Destacado
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre del Paquete
                    </label>
                    <input
                      type="text"
                      value={packTitle}
                      onChange={(e) => setPackTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Precio USD del Paquete
                    </label>
                    <input
                      type="number"
                      value={packPrice}
                      onChange={(e) => setPackPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Entregables Incluidos (Separados por coma)
                    </label>
                    <input
                      type="text"
                      value={packDeliverables}
                      onChange={(e) => setPackDeliverables(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: DATOS BANCARIOS */}
            {activeTab === 'payment' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl text-blue-900 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Tus datos bancarios se mantienen 100% encriptados y solo se utilizan para depositar las ganancias de las campañas contratadas a través de CC-Market.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Método de Cobro Preferido
                  </label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="bank_transfer">🏦 Transferencia Bancaria Directa (ACH / IBAN / SWIFT)</option>
                    <option value="paypal">💳 PayPal</option>
                    <option value="zelle_yappi">📱 Zelle / Yappi Panamá</option>
                  </select>
                </div>

                {paymentType === 'bank_transfer' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Banco
                        </label>
                        <input
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Número de Cuenta
                        </label>
                        <input
                          type="text"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nombre del Titular
                        </label>
                        <input
                          type="text"
                          value={accountHolderName}
                          onChange={(e) => setAccountHolderName(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Cédula / RUC / ID
                        </label>
                        <input
                          type="text"
                          value={taxIdOrRuc}
                          onChange={(e) => setTaxIdOrRuc(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentType === 'paypal' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Correo de PayPal
                    </label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>
                )}

                {paymentType === 'zelle_yappi' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teléfono o Correo Registrado en Zelle / Yappi
                    </label>
                    <input
                      type="text"
                      value={phoneZelleYappi}
                      onChange={(e) => setPhoneZelleYappi(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>
                )}

              </div>
            )}

            {/* Save Button */}
            <div className="border-t border-slate-200 pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs cursor-pointer transition-all"
              >
                Cerrar
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
