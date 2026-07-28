import React, { useState } from 'react';
import { 
  X, Lock, Mail, User, ShieldCheck, CheckCircle2, AlertCircle, 
  CreditCard, Building2, Globe, Sparkles, Check, ChevronRight, 
  KeyRound, ArrowRight, UserPlus, LogIn, FileText
} from 'lucide-react';
import { Creator, CreatorUserAccount, PaymentDetails, CreatorApprovalStatus } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'creator' | 'admin', email: string, creatorId?: string) => void;
  onRegisterCreator: (
    newAccount: CreatorUserAccount, 
    newCreator: Creator
  ) => void;
  existingAccounts: CreatorUserAccount[];
  existingCreators: Creator[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onRegisterCreator,
  existingAccounts,
  existingCreators
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Register Form State
  const [regStep, setRegStep] = useState<number>(1);
  const [regError, setRegError] = useState<string>('');

  // Step 1: Account & Profile
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [handle, setHandle] = useState('@');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [country, setCountry] = useState('Panamá');
  const [category, setCategory] = useState<any>('Entretenimiento');
  const [bio, setBio] = useState('');

  // Step 2: Social Media & Follower Metrics
  const [igFollowers, setIgFollowers] = useState('');
  const [ttFollowers, setTtFollowers] = useState('');
  const [ytFollowers, setYtFollowers] = useState('');
  const [fbFollowers, setFbFollowers] = useState('');

  // Step 3: Media Kit & Rates
  const [sponsoredPostRate, setSponsoredPostRate] = useState(300);
  const [videoIntegrationRate, setVideoIntegrationRate] = useState(750);
  const [monthlyAmbassadorRate, setMonthlyAmbassadorRate] = useState(3000);
  const [packageTitle, setPackageTitle] = useState('Pack Promo Especial Reels + Stories');
  const [packagePrice, setPackagePrice] = useState(650);
  const [packageDeliverables, setPackageDeliverables] = useState('1 Reel HD, 3 Stories con enlace directo, mención de marca');

  // Step 4: Payment Details for Intermediary Payouts
  const [paymentType, setPaymentType] = useState<'bank_transfer' | 'paypal' | 'zelle_yappi'>('bank_transfer');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ibanSwift, setIbanSwift] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [taxIdOrRuc, setTaxIdOrRuc] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [phoneZelleYappi, setPhoneZelleYappi] = useState('');

  // Step 5: Disclaimer & Terms
  const [acceptDisclaimer, setAcceptDisclaimer] = useState(false);

  if (!isOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    // Check Admin Login (admin / admin)
    if (isAdminMode || cleanEmail === 'admin') {
      if (cleanPassword === 'admin') {
        onLoginSuccess('admin', 'admin@ccmarket.com');
        onClose();
        return;
      } else {
        setLoginError('Contraseña de administrador incorrecta. Usa: admin');
        return;
      }
    }

    // Check Registered Creator Accounts
    const matchedAcc = existingAccounts.find(
      (acc) => acc.email.toLowerCase() === cleanEmail
    );

    if (matchedAcc) {
      if (matchedAcc.password && matchedAcc.password !== cleanPassword) {
        setLoginError('Contraseña incorrecta. Por favor verifica tus credenciales.');
        return;
      }
      onLoginSuccess('creator', matchedAcc.email, matchedAcc.creatorId);
      onClose();
      return;
    }

    // Check if email matches handle of existing creators (Demo auto-login)
    const matchedCreator = existingCreators.find(
      (c) => c.handle.toLowerCase().replace('@', '') === cleanEmail.replace('@', '')
    );

    if (matchedCreator) {
      onLoginSuccess('creator', `${matchedCreator.handle.replace('@', '')}@ccmarket.com`, matchedCreator.id);
      onClose();
      return;
    }

    setLoginError('No se encontró una cuenta con ese correo. Por favor regístrate en "Crear Cuenta".');
  };

  // Social Login Mock Helper
  const handleSocialLogin = (providerName: string) => {
    // Demo auto creator session for social login
    const demoEmail = `creador_${providerName.toLowerCase()}@ccmarket.com`;
    onLoginSuccess('creator', demoEmail, existingCreators[0]?.id || 'creator-yenvideo');
    onClose();
  };

  // Handle Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!acceptDisclaimer) {
      setRegError('Debes aceptar el Disclaimer y Términos de Intermediación de CC-Market para continuar.');
      return;
    }

    if (!email.trim() || !password.trim() || !fullName.trim() || !handle.trim()) {
      setRegError('Por favor completa todos los campos requeridos del perfil.');
      return;
    }

    const creatorId = `creator-${Date.now()}`;
    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;

    // Parse followers
    const parseNum = (str: string) => {
      if (!str) return 0;
      const clean = str.toUpperCase().trim();
      if (clean.endsWith('M')) return parseFloat(clean) * 1000000;
      if (clean.endsWith('K')) return parseFloat(clean) * 1000;
      return parseInt(clean) || 1000;
    };

    const igNum = parseNum(igFollowers) || 50000;
    const ttNum = parseNum(ttFollowers);
    const ytNum = parseNum(ytFollowers);
    const fbNum = parseNum(fbFollowers);

    const totalFollowersCount = igNum + ttNum + ytNum + fbNum;

    // Build Platforms array
    const platforms: any[] = [];
    if (igFollowers || igNum > 0) {
      platforms.push({
        platform: 'Instagram',
        followers: igFollowers || '50K',
        followersCount: igNum,
        url: `https://instagram.com/${cleanHandle.replace('@', '')}`
      });
    }
    if (ttFollowers) {
      platforms.push({
        platform: 'TikTok',
        followers: ttFollowers,
        followersCount: ttNum,
        url: `https://tiktok.com/@${cleanHandle.replace('@', '')}`
      });
    }
    if (ytFollowers) {
      platforms.push({
        platform: 'YouTube',
        followers: ytFollowers,
        followersCount: ytNum,
        url: `https://youtube.com/@${cleanHandle.replace('@', '')}`
      });
    }

    // Build Creator Profile (Set default 5 star rating for validated creators)
    const newCreatorProfile: Creator = {
      id: creatorId,
      name: fullName,
      handle: cleanHandle,
      avatar: avatarUrl.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      country: country,
      countryCode: country === 'Panamá' ? 'PA' : country === 'Nicaragua' ? 'NI' : country === 'Venezuela' ? 'VE' : 'ES',
      flagEmoji: country === 'Panamá' ? '🇵🇦' : country === 'Nicaragua' ? '🇳🇮' : country === 'Venezuela' ? '🇻🇪' : '🌍',
      primaryPlatform: 'Instagram',
      platforms: platforms.length > 0 ? platforms : [
        { platform: 'Instagram', followers: igFollowers || '50K', followersCount: igNum, url: `https://instagram.com/${cleanHandle.replace('@', '')}` }
      ],
      category: category,
      tags: [category, country, 'Creador Registrado', 'Verificado CC-Market'],
      marketValueEur: Math.round(totalFollowersCount * 2.5),
      marketValueChangePct: 15.0,
      acv: Math.round(totalFollowersCount * 0.05),
      totalFollowers: totalFollowersCount,
      engagementRate: 8.5,
      verified: true,
      auditedStatus: 'Verified Audit',
      starRating: 5.0, // 5 Estrellas
      reviewCount: 1,
      isTrending: true,
      trendingReason: '✨ Creador recién registrado con perfil auditado y tarifa activa',
      sponsorshipRates: {
        sponsoredPost: Number(sponsoredPostRate),
        videoIntegration: Number(videoIntegrationRate),
        monthlyAmbassador: Number(monthlyAmbassadorRate)
      },
      mediaKitPacks: [
        {
          title: packageTitle,
          priceUSD: Number(packagePrice),
          description: 'Paquete de contenido personalizado para marcas anunciantes.',
          deliverables: packageDeliverables.split(',').map(s => s.trim()),
          popular: true
        }
      ],
      brandWorkHistory: [],
      brandRating: {
        trafficLight: 'green',
        statusText: '5.0 ⭐ Valoración Máxima de Registro Inicial',
        commitmentScore: 100,
        starRating: 5.0,
        totalReviews: 1,
        totalCampaigns: 1,
        reviews: [
          { brandName: 'CC-Market Intermediary', rating: 'green', comment: 'Cuenta creada y datos de pago validados correctamente.', date: new Date().toISOString().split('T')[0], verifiedBrand: true }
        ]
      },
      monthlyViews: totalFollowersCount * 8,
      avgLikesPerPost: Math.round(totalFollowersCount * 0.08),
      demographics: {
        gender: { male: 50, female: 48, other: 2 },
        topAgeGroup: '18-24',
        ageBreakdown: [
          { range: '18-24', percentage: 55 },
          { range: '25-34', percentage: 35 },
          { range: '35+', percentage: 10 }
        ],
        topCountries: [
          { country: country, code: 'PA', percentage: 80 },
          { country: 'Otros', code: 'ALL', percentage: 20 }
        ]
      },
      valuationHistory: [
        { year: '2026', valueInMillions: parseFloat((totalFollowersCount * 0.0025).toFixed(2)) || 0.5 }
      ],
      recentBrands: ['CC-Market Verified'],
      bio: bio || `Creador de contenido verificado en ${category} desde ${country}.`,
      joinedYear: 2026
    };

    // Payment details
    const paymentDetails: PaymentDetails = {
      paymentType,
      bankName,
      accountNumber,
      ibanSwift,
      accountHolderName: accountHolderName || fullName,
      taxIdOrRuc,
      paypalEmail,
      phoneZelleYappi,
      country
    };

    // Build Creator User Account with pending approval status
    const newAccount: CreatorUserAccount = {
      id: `acc-${Date.now()}`,
      email: email.trim().toLowerCase(),
      password: password.trim(),
      creatorId: creatorId,
      status: 'pending', // Pending Admin Approval (Dar de Alta / Baja)
      disclaimerAccepted: true,
      disclaimerAcceptedAt: new Date().toISOString(),
      paymentDetails,
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onRegisterCreator(newAccount, newCreatorProfile);
    onLoginSuccess('creator', newAccount.email, newAccount.creatorId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-xl shadow-md">
              CC
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                <span>Portal de Acceso CC-Market</span>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full uppercase border border-blue-400/40">
                  Creadores & Admin
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Actualiza tu perfil, métricas, media kit y datos bancarios de pago.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector: Iniciar Sesión vs Crear Cuenta */}
        <div className="bg-slate-100 p-2 border-b border-slate-300 flex items-center justify-center gap-2 shrink-0">
          <button
            onClick={() => {
              setActiveTab('login');
              setIsAdminMode(false);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              activeTab === 'login' && !isAdminMode
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Iniciar Sesión</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('register');
              setIsAdminMode(false);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              activeTab === 'register'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Crear Cuenta (Creador)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('login');
              setIsAdminMode(true);
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
              isAdminMode
                ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                : 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300'
            }`}
            title="Ingreso para administradores CC-Market"
          >
            <KeyRound className="w-4 h-4 text-amber-300" />
            <span>Admin</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* LOGIN TAB CONTENT */}
          {activeTab === 'login' && (
            <div className="space-y-6 max-w-md mx-auto">
              
              {isAdminMode ? (
                <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-2xl text-purple-900 text-xs">
                  <div className="flex items-center gap-2 font-black mb-1 text-sm">
                    <ShieldCheck className="w-4 h-4 text-purple-700" />
                    <span>Acceso al Panel de Administración</span>
                  </div>
                  <p className="text-purple-700">
                    Ingresa con tus credenciales de administrador para gestionar las solicitudes de creadores, dar de alta o de baja perfiles y revisar datos de intermediación.
                  </p>
                  <div className="mt-2 font-mono text-[11px] bg-purple-100 px-2 py-1 rounded border border-purple-200 inline-block font-bold">
                    Credenciales Demo: Usuario: <strong className="text-purple-900">admin</strong> | Contraseña: <strong className="text-purple-900">admin</strong>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-black text-slate-900 text-center mb-1">
                    ¡Bienvenido Creador!
                  </h3>
                  <p className="text-xs text-slate-500 text-center">
                    Ingresa a tu panel para actualizar tu perfil, métricas auditadas, media kit y datos bancarios.
                  </p>
                </div>
              )}

              {/* Social Login Buttons (Google / Gmail, Apple, etc.) */}
              {!isAdminMode && (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block text-center">
                    Iniciar sesión rápida con:
                  </span>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Google')}
                      className="px-3 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.74-2.09-6.68-4.91H1.21v3.15C3.2 21.3 7.31 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.21C.44 8.1 0 9.99 0 12s.44 3.9 1.21 5.44l4.11-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.2 2.7 1.21 6.56l4.11 3.15c.94-2.82 3.58-4.96 6.68-4.96z"/>
                      </svg>
                      <span>Google / Gmail</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Apple')}
                      className="px-3 py-2.5 bg-black hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.67-.82 1.13-1.96.99-3.11-1 .04-2.22.67-2.93 1.5-.64.74-1.19 1.92-1.04 3.05 1.12.09 2.26-.58 2.98-1.44z"/>
                      </svg>
                      <span>Apple ID</span>
                    </button>
                  </div>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 bg-white px-2">
                      O usa tu correo electrónico
                    </div>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    {isAdminMode ? 'Usuario Administrador' : 'Correo Electrónico o Handle (@)'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder={isAdminMode ? 'Ej: admin' : 'ejemplo@correo.com o @tuusuario'}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-black text-xs text-white flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isAdminMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <span>{isAdminMode ? 'Ingresar como Administrador' : 'Iniciar Sesión'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 text-center">
                ¿Aún no tienes cuenta registrada?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setIsAdminMode(false);
                  }}
                  className="font-black text-blue-600 hover:underline cursor-pointer"
                >
                  Regístrate aquí gratis
                </button>
              </div>

            </div>
          )}

          {/* REGISTER TAB CONTENT */}
          {activeTab === 'register' && (
            <div className="space-y-6">
              
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Registro Oficial de Creadores Auditados
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Formulario de Registro e Intermediación CC-Market
                </h3>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Sube tus datos, métricas de redes sociales y cuenta bancaria para recibir pagos directos por campañas contratadas.
                </p>
              </div>

              {/* Step Navigation Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRegStep(1)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    regStep === 1 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  1. Perfil
                </button>
                <button
                  type="button"
                  onClick={() => setRegStep(2)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    regStep === 2 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  2. Redes
                </button>
                <button
                  type="button"
                  onClick={() => setRegStep(3)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    regStep === 3 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  3. Media Kit
                </button>
                <button
                  type="button"
                  onClick={() => setRegStep(4)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    regStep === 4 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  4. Pagos
                </button>
                <button
                  type="button"
                  onClick={() => setRegStep(5)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    regStep === 5 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  5. Disclaimer
                </button>
              </div>

              {/* Multi-step Registration Form */}
              <form onSubmit={handleRegisterSubmit} className="space-y-4">

                {/* STEP 1: DATOS PERSONALES & PERFIL */}
                {regStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Paso 1: Información Personal y de Cuenta
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Yen Video o Joshua Blake"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Handle Principal (@) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: @yenvideo"
                          value={handle}
                          onChange={(e) => setHandle(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="tu@correo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Contraseña de Acceso *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          País de Residencia
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
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
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
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
                        URL de Foto de Perfil (Avatar)
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                        Biografía Corta / Presentación
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Cuéntanos brevemente sobre tu contenido y audiencia..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setRegStep(2)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Siguiente: Redes Sociales & Métricas</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: REDES SOCIALES & MÉTRICAS */}
                {regStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Paso 2: Métricas de Redes Sociales
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Seguidores en Instagram *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 1.3M o 120K"
                          value={igFollowers}
                          onChange={(e) => setIgFollowers(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Seguidores en TikTok
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: 800K o 10.1M"
                          value={ttFollowers}
                          onChange={(e) => setTtFollowers(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Suscriptores en YouTube
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: 450K"
                          value={ytFollowers}
                          onChange={(e) => setYtFollowers(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Seguidores en Facebook
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: 95K"
                          value={fbFollowers}
                          onChange={(e) => setFbFollowers(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRegStep(1)}
                        className="flex-1 py-2.5 bg-slate-200 text-slate-800 rounded-xl font-extrabold text-xs cursor-pointer hover:bg-slate-300"
                      >
                        Atrás
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegStep(3)}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Siguiente: Media Kit & Tarifas</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: MEDIA KIT & TARIFAS */}
                {regStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Paso 3: Tarifas Estimadas & Media Kit
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Post Patrocinado (USD)
                        </label>
                        <input
                          type="number"
                          value={sponsoredPostRate}
                          onChange={(e) => setSponsoredPostRate(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Reel / Video (USD)
                        </label>
                        <input
                          type="number"
                          value={videoIntegrationRate}
                          onChange={(e) => setVideoIntegrationRate(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                          Embajador Mensual (USD)
                        </label>
                        <input
                          type="number"
                          value={monthlyAmbassadorRate}
                          onChange={(e) => setMonthlyAmbassadorRate(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                        />
                      </div>
                    </div>

                    {/* Paquete Personalizado Media Kit */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-300 space-y-3">
                      <span className="text-[11px] font-black uppercase text-blue-700 block">
                        📦 Paquete Destacado de Media Kit
                      </span>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                          Título del Paquete
                        </label>
                        <input
                          type="text"
                          value={packageTitle}
                          onChange={(e) => setPackageTitle(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                          Precio Total del Paquete (USD)
                        </label>
                        <input
                          type="number"
                          value={packagePrice}
                          onChange={(e) => setPackagePrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                          Entregables Incluidos (Separados por coma)
                        </label>
                        <input
                          type="text"
                          value={packageDeliverables}
                          onChange={(e) => setPackageDeliverables(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRegStep(2)}
                        className="flex-1 py-2.5 bg-slate-200 text-slate-800 rounded-xl font-extrabold text-xs cursor-pointer hover:bg-slate-300"
                      >
                        Atrás
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegStep(4)}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Siguiente: Datos de Pago</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: DATOS DE PAGO E INTERMEDIACIÓN */}
                {regStep === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl text-blue-900 text-xs flex items-start gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Intermediación de Pagos Directos CC-Market:</strong>
                        <p className="text-[11px] text-blue-800 mt-0.5">
                          CC-Market actúa como intermediario seguro reteniendo los fondos de las marcas y transfiriéndote directo a tu cuenta de banco, PayPal o Yappi/Zelle una vez cumplidos los entregables.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                        Método de Pago Preferido
                      </label>
                      <select
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                      >
                        <option value="bank_transfer">🏦 Transferencia Bancaria (ACH / IBAN / SWIFT)</option>
                        <option value="paypal">💳 PayPal</option>
                        <option value="zelle_yappi">📱 Zelle / Yappi Panamá</option>
                      </select>
                    </div>

                    {paymentType === 'bank_transfer' && (
                      <div className="space-y-3 bg-slate-50 p-3 rounded-2xl border border-slate-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                              Nombre del Banco *
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: Banco General, BAC, Banistmo, Banesco"
                              value={bankName}
                              onChange={(e) => setBankName(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                              Número de Cuenta *
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: 04-01-98-123456"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                              Nombre del Titular de la Cuenta *
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: Juan Pérez"
                              value={accountHolderName}
                              onChange={(e) => setAccountHolderName(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                              Cédula / RUC / Tax ID *
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: 8-888-8888 o RUC-123"
                              value={taxIdOrRuc}
                              onChange={(e) => setTaxIdOrRuc(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                            IBAN / SWIFT (Opcional para transferencias internacionales)
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: PA123456789..."
                            value={ibanSwift}
                            onChange={(e) => setIbanSwift(e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                          />
                        </div>
                      </div>
                    )}

                    {paymentType === 'paypal' && (
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-300">
                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                          Correo de Cuenta PayPal *
                        </label>
                        <input
                          type="email"
                          placeholder="tu_paypal@correo.com"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>
                    )}

                    {paymentType === 'zelle_yappi' && (
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-300">
                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                          Teléfono o Correo Registrado en Zelle / Yappi Panamá *
                        </label>
                        <input
                          type="text"
                          placeholder="+507 6000-0000 o correo Zelle"
                          value={phoneZelleYappi}
                          onChange={(e) => setPhoneZelleYappi(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                        />
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRegStep(3)}
                        className="flex-1 py-2.5 bg-slate-200 text-slate-800 rounded-xl font-extrabold text-xs cursor-pointer hover:bg-slate-300"
                      >
                        Atrás
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegStep(5)}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Siguiente: Aceptar Disclaimer & Términos</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: DISCLAIMER & FINAL SUBMIT */}
                {regStep === 5 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Paso 5: Términos Legal & Disclaimer de Validación
                    </h4>

                    {/* Disclaimer Box */}
                    <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-300 text-xs text-slate-700 space-y-3 max-h-48 overflow-y-auto">
                      <div className="flex items-center gap-2 font-black text-slate-900 border-b border-slate-200 pb-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>DISCLAIMER Y ACUERDO DE INTERMEDIACIÓN CC-MARKET</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        1. <strong>Veracidad de Métricas:</strong> Declaro que los datos de seguidores, engagement y métricas ingresadas corresponden fielmente a mis cuentas oficiales auditables de redes sociales.
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        2. <strong>Intermediación Financiera:</strong> Autorizo a CC-Market a actuar como intermediario financiero para la recepción de pagos de marcas anunciantes y la posterior transferencia a mi cuenta bancaria configurada.
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        3. <strong>Proceso de Alta y Revisión:</strong> Entiendo que mi perfil ingresará en estado de <em>Validación Pendiente</em> para revisión del equipo de Administración de CC-Market antes de quedar oficialmente publicado en el catálogo público y rankings de la plataforma.
                      </p>
                    </div>

                    <label className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-300 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={acceptDisclaimer}
                        onChange={(e) => setAcceptDisclaimer(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        He leído y acepto expresamente el Disclaimer, los Términos de Servicio y el Proceso de Intermediación de Pagos de CC-Market.
                      </span>
                    </label>

                    {regError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{regError}</span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setRegStep(4)}
                        className="flex-1 py-3 bg-slate-200 text-slate-800 rounded-xl font-extrabold text-xs cursor-pointer hover:bg-slate-300"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        disabled={!acceptDisclaimer}
                        className={`flex-1 py-3 rounded-xl font-black text-xs text-white flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                          acceptDisclaimer ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completar Registro & Enviar a Validación</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
