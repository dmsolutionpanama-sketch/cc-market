import { Creator, BrandPartner, CreatorNewsItem } from '../types';

export const creatorsMockData: Creator[] = [
  {
    id: 'creator-augusto',
    name: 'Augusto Morales',
    handle: '@augustomorales',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    country: 'Guatemala',
    countryCode: 'GT',
    flagEmoji: '🇬🇹',
    ageRange: '20 - 24 años',
    primaryPlatform: 'TikTok',
    platforms: [
      { platform: 'TikTok', followers: '517K', followersCount: 517000, url: 'https://tiktok.com/@augustomorales' },
      { platform: 'Instagram', followers: '65.6K', followersCount: 65600, url: 'https://instagram.com/augustomorales' },
      { platform: 'Facebook', followers: '4K', followersCount: 4000, url: 'https://facebook.com/augustomorales' },
    ],
    category: 'Moda y Estilo',
    tags: ['Outfits', 'Lifestyle', 'Trends', 'Moda Masculina'],
    marketValueEur: 1250000,
    marketValueChangePct: 15.8,
    acv: 32000,
    totalFollowers: 586600,
    engagementRate: 8.4,
    verified: true,
    auditedStatus: 'Verified Audit',
    isTrending: true,
    trendingReason: '🔥 Vistas TikTok 40-100K promedio & Altas interacciones IG Reels',
    sponsorshipRates: {
      sponsoredPost: 250,
      videoIntegration: 320,
      monthlyAmbassador: 1800,
    },
    mediaKitPacks: [
      {
        title: 'Set de Historias Instagram',
        priceUSD: 150,
        description: 'Secuencia directa para posicionamiento de marca e impacto visual.',
        deliverables: ['3 Historias consecutivas', 'Etiqueta directa', 'Sticker de enlace / CTA']
      },
      {
        title: 'Instagram Reels Video',
        priceUSD: 280,
        description: 'Video dinámico con promedio de 25K-40K vistas.',
        deliverables: ['1 Reel optimizado HD', 'Uso de audio en tendencia', 'Mención en pie de foto']
      },
      {
        title: 'Video TikTok Exclusivo',
        priceUSD: 320,
        description: 'Publicación en TikTok con alcance promedio de 40K-100K reproducciones.',
        deliverables: ['1 Video de alta producción', 'Trends & Hasthags optimizados', 'Link en Bio por 48h'],
        popular: true
      },
      {
        title: 'Carrusel de Fotos Instagram',
        priceUSD: 250,
        description: 'Carrusel fotográfico de alta estética mostrando el producto en uso.',
        deliverables: ['1 Post carrusel (3-5 fotos)', 'Tag de producto', 'Mención de marca']
      }
    ],
    brandWorkHistory: [
      { brandName: 'Zara Man', durationMonths: '6 meses', campaignType: 'Lookbooks de Temporada', year: '2025 - 2026', satisfaction: 'Excelente' },
      { brandName: 'Adidas Originals', durationMonths: '4 meses', campaignType: 'Lanzamiento de Sneakers', year: '2025', satisfaction: 'Excelente' },
      { brandName: 'Pull&Bear', durationMonths: '8 meses', campaignType: 'Outfits & Trends', year: '2024 - 2025', satisfaction: 'Excelente' }
    ],
    brandRating: {
      trafficLight: 'green',
      statusText: 'Excelente Cumplimiento (100% On-time)',
      commitmentScore: 99,
      totalCampaigns: 14,
      reviews: [
        { brandName: 'Zara Man', rating: 'green', comment: 'Altísima calidad estética y puntualidad en entregables.', date: '2026-02-10', verifiedBrand: true },
        { brandName: 'Adidas', rating: 'green', comment: 'Gran retorno de engagement en audiencia joven.', date: '2025-11-18', verifiedBrand: true }
      ]
    },
    monthlyViews: 4500000,
    avgLikesPerPost: 45000,
    demographics: {
      gender: { male: 42, female: 56, other: 2 },
      topAgeGroup: '18-24',
      ageBreakdown: [
        { range: '13-17', percentage: 22 },
        { range: '18-24', percentage: 58 },
        { range: '25-34', percentage: 16 },
        { range: '35+', percentage: 4 }
      ],
      topCountries: [
        { country: 'Guatemala', code: 'GT', percentage: 48 },
        { country: 'El Salvador', code: 'SV', percentage: 22 },
        { country: 'México', code: 'MX', percentage: 18 },
        { country: 'Honduras', code: 'HN', percentage: 12 }
      ]
    },
    valuationHistory: [
      { year: '2023', valueInMillions: 0.3 },
      { year: '2024', valueInMillions: 0.6 },
      { year: '2025', valueInMillions: 0.9 },
      { year: '2026', valueInMillions: 1.25 }
    ],
    recentBrands: ['Zara Man', 'Adidas Originals', 'Pull&Bear', 'Toyota'],
    bio: 'Creador de contenido enfocado en Outfits, Lifestyle y tendencias digitales con alto impacto visual en audiencias jóvenes de Centroamérica.',
    joinedYear: 2021
  },
  {
    id: 'creator-kathya',
    name: 'Kathya Vásquez',
    handle: '@kbvasquezm',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    country: 'El Salvador',
    countryCode: 'SV',
    flagEmoji: '🇸🇻',
    ageRange: '25 - 30 años',
    primaryPlatform: 'TikTok',
    platforms: [
      { platform: 'TikTok', followers: '124.3K', followersCount: 124300, url: 'https://tiktok.com/@kbvasquezm' },
      { platform: 'Instagram', followers: '55.4K', followersCount: 55400, url: 'https://instagram.com/kbvasquezm' },
    ],
    category: 'Deportes',
    tags: ['Voleibol', 'Fitness', 'Lifestyle', 'Deporte Femenino', 'Contenido de Valor'],
    marketValueEur: 1850000,
    marketValueChangePct: 22.4,
    acv: 48000,
    totalFollowers: 179700,
    engagementRate: 9.6,
    verified: true,
    auditedStatus: 'Verified Audit',
    isTrending: true,
    trendingReason: '🔥 4.2M vistas acumuladas TikTok (60 días) & Crecimiento orgánico sostenido',
    sponsorshipRates: {
      sponsoredPost: 200,
      videoIntegration: 400,
      monthlyAmbassador: 1800,
    },
    mediaKitPacks: [
      {
        title: 'Paquete 1 (1 Reel + 1 Post + 1 Secuencia Stories)',
        priceUSD: 750,
        description: 'Estrategia integral multiplataforma para posicionamiento de marca.',
        deliverables: ['1 TikTok/Reel', '1 Post en colaboración', '1 Secuencia de stories (2 stories)'],
        popular: true
      },
      {
        title: 'Paquete 2 (2 Reels/TikToks + 1 Secuencia Stories)',
        priceUSD: 900,
        description: 'Mayor frecuencia de impacto para campañas de lanzamiento.',
        deliverables: ['2 TikToks / Reels', '1 Secuencia de stories (2 stories)']
      },
      {
        title: 'Paquete Cobertura Eventos y Activaciones',
        priceUSD: 200,
        description: 'Presencia en vivo en eventos corporativos y deportivos.',
        deliverables: ['Asistencia presencial al evento', 'Secuencia de stories (3 stories)']
      },
      {
        title: 'Tarifario Pareja / Kathya + Juanjo Llovera',
        priceUSD: 1200,
        description: 'Colaboración combinada alcanzando más de 1.9M de seguidores.',
        deliverables: ['2 TikToks o Reels colaborativos', '1 Post en colaboración', '2 Sets de historias por cuenta']
      }
    ],
    brandWorkHistory: [
      { brandName: 'Samsung', durationMonths: '12 meses', campaignType: 'Ecosistema Galaxy & Tech', year: '2025 - 2026', satisfaction: 'Excelente' },
      { brandName: 'McDonald’s', durationMonths: '6 meses', campaignType: 'Activaciones & Promociones', year: '2025', satisfaction: 'Excelente' },
      { brandName: 'Pollo Campero', durationMonths: '8 meses', campaignType: 'Campañas de Verano y Familia', year: '2025', satisfaction: 'Excelente' },
      { brandName: 'Dove', durationMonths: '6 meses', campaignType: 'Cuidado Personal Femenino', year: '2024 - 2025', satisfaction: 'Excelente' },
      { brandName: 'Gatorade', durationMonths: '10 meses', campaignType: 'Embajadora Deportiva', year: '2024 - 2025', satisfaction: 'Excelente' },
      { brandName: 'Steren', durationMonths: '5 meses', campaignType: 'Gadgets & Estilo de Vida', year: '2024', satisfaction: 'Excelente' },
      { brandName: 'Puma Energy', durationMonths: '6 meses', campaignType: 'Cobertura de Eventos', year: '2024', satisfaction: 'Excelente' }
    ],
    brandRating: {
      trafficLight: 'green',
      statusText: '100% Cumplimiento Garantizado por Marcas',
      commitmentScore: 100,
      totalCampaigns: 22,
      reviews: [
        { brandName: 'Samsung', rating: 'green', comment: 'Excelente creadora, genera contenido genuino con altísimo alcance.', date: '2026-01-15', verifiedBrand: true },
        { brandName: 'Pollo Campero', rating: 'green', comment: 'Entregables a tiempo y gran respuesta de interacción del público.', date: '2025-12-04', verifiedBrand: true },
        { brandName: 'Dove', rating: 'green', comment: 'Alineación perfecta con los valores de la marca.', date: '2025-08-20', verifiedBrand: true }
      ]
    },
    monthlyViews: 4200000,
    avgLikesPerPost: 45000,
    demographics: {
      gender: { male: 44, female: 56, other: 0 },
      topAgeGroup: '18-24',
      ageBreakdown: [
        { range: '13-17', percentage: 15 },
        { range: '18-24', percentage: 56 },
        { range: '25-34', percentage: 22 },
        { range: '35+', percentage: 7 }
      ],
      topCountries: [
        { country: 'El Salvador', code: 'SV', percentage: 68 },
        { country: 'Guatemala', code: 'GT', percentage: 14 },
        { country: 'Honduras', code: 'HN', percentage: 10 },
        { country: 'Estados Unidos', code: 'US', percentage: 8 }
      ]
    },
    valuationHistory: [
      { year: '2023', valueInMillions: 0.5 },
      { year: '2024', valueInMillions: 0.9 },
      { year: '2025', valueInMillions: 1.4 },
      { year: '2026', valueInMillions: 1.85 }
    ],
    recentBrands: ['Samsung', 'Pollo Campero', 'Dove', 'Steren', 'Eucerin', 'Puma Energy', 'DoradoBet', 'McDonald’s', 'Pedigree', 'Siman', 'Gatorade', 'Lipton', 'Banco Atlántida', 'Uno'],
    bio: 'Atleta, voleibolista y creadora de contenido enfocado en deportes, posicionamiento de marca y hábitos saludables con alta conversión publicitaria.',
    joinedYear: 2020
  },
  {
    id: 'creator-alejo',
    name: 'Alejo Reviews',
    handle: '@alejo_reviews',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    country: 'Argentina',
    countryCode: 'AR',
    flagEmoji: '🇦🇷',
    ageRange: '24 - 28 años',
    primaryPlatform: 'TikTok',
    platforms: [
      { platform: 'TikTok', followers: '168.1K', followersCount: 168100, url: 'https://tiktok.com/@alejo_reviews' },
      { platform: 'Instagram', followers: '65K', followersCount: 65000, url: 'https://instagram.com/alejo_reviews' },
    ],
    category: 'Reviews & Humor',
    tags: ['Tech Reviews', 'Publicista', 'Fútbol', 'Humor', 'Recomendaciones'],
    marketValueEur: 2100000,
    marketValueChangePct: 18.5,
    acv: 55000,
    totalFollowers: 233100,
    engagementRate: 10.2,
    verified: true,
    auditedStatus: 'Verified Audit',
    isTrending: true,
    trendingReason: '🚀 4,045,712 visualizaciones en Instagram (60 días) & 7.2M likes en TikTok',
    sponsorshipRates: {
      sponsoredPost: 300,
      videoIntegration: 600,
      monthlyAmbassador: 2400,
    },
    mediaKitPacks: [
      {
        title: 'Paquete de Colaboración Principal',
        priceUSD: 600,
        description: 'Publicación simultánea con máxima exposición en Instagram y TikTok.',
        deliverables: [
          '1 Reel en Instagram (con réplica directa en TikTok)',
          '2 Historias interactivas en Instagram (con sticker de enlace o mención)'
        ],
        popular: true
      },
      {
        title: 'Combo IG Completo',
        priceUSD: 450,
        description: 'Post patrocinado + Story 3 frames + Reel exclusivo.',
        deliverables: ['1 Post dedicado en Feed', '1 Reel de alta retención', '3 Frames de historia']
      }
    ],
    brandWorkHistory: [
      { brandName: 'Samsung Argentina', durationMonths: '8 meses', campaignType: 'Reviews Ecosistema Tech', year: '2025 - 2026', satisfaction: 'Excelente' },
      { brandName: 'Mercado Libre', durationMonths: '6 meses', campaignType: 'E-Commerce Trends', year: '2025', satisfaction: 'Excelente' },
      { brandName: 'Adidas Argentina', durationMonths: '5 meses', campaignType: 'Calzado & Deporte', year: '2024 - 2025', satisfaction: 'Excelente' }
    ],
    brandRating: {
      trafficLight: 'green',
      statusText: '100% Retorno Comprobado & Producción Impecable',
      commitmentScore: 98,
      totalCampaigns: 18,
      reviews: [
        { brandName: 'Samsung', rating: 'green', comment: 'Aumentó directamente el tráfico hacia nuestro e-commerce.', date: '2026-02-01', verifiedBrand: true },
        { brandName: 'Mercado Libre', rating: 'green', comment: 'Humor inteligente y mensaje de marca claro.', date: '2025-11-20', verifiedBrand: true }
      ]
    },
    monthlyViews: 5200000,
    avgLikesPerPost: 68000,
    demographics: {
      gender: { male: 62, female: 36, other: 2 },
      topAgeGroup: '18-24',
      ageBreakdown: [
        { range: '13-17', percentage: 18 },
        { range: '18-24', percentage: 54 },
        { range: '25-34', percentage: 22 },
        { range: '35+', percentage: 6 }
      ],
      topCountries: [
        { country: 'Argentina', code: 'AR', percentage: 64 },
        { country: 'Uruguay', code: 'UY', percentage: 12 },
        { country: 'Chile', code: 'CL', percentage: 12 },
        { country: 'México', code: 'MX', percentage: 12 }
      ]
    },
    valuationHistory: [
      { year: '2023', valueInMillions: 0.6 },
      { year: '2024', valueInMillions: 1.1 },
      { year: '2025', valueInMillions: 1.6 },
      { year: '2026', valueInMillions: 2.1 }
    ],
    recentBrands: ['Samsung', 'Mercado Libre', 'Adidas', 'Speed Unlimited', 'Ray-Ban'],
    bio: 'Publicista y creador digital enfocado en reseñas honestas, tecnología, fútbol y humor de alta viralidad.',
    joinedYear: 2021
  },
  {
    id: 'creator-juanjo',
    name: 'Juanjo Llovera',
    handle: '@juanjo_llovera',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    country: 'El Salvador',
    countryCode: 'SV',
    flagEmoji: '🇸🇻',
    ageRange: '28 - 32 años',
    primaryPlatform: 'TikTok',
    platforms: [
      { platform: 'TikTok', followers: '1.6M', followersCount: 1600000, url: 'https://tiktok.com/@juanjo_llovera' },
      { platform: 'Instagram', followers: '350K', followersCount: 350000, url: 'https://instagram.com/juanjollovera' },
      { platform: 'YouTube', followers: '85K', followersCount: 85000, url: 'https://youtube.com/@juanjollovera' },
    ],
    category: 'Entretenimiento',
    tags: ['Humor', 'Fitness', 'Vlogs', 'Bromas', 'Cameos Fernanfloo', 'Collabs Pareja'],
    marketValueEur: 4800000,
    marketValueChangePct: 30.0,
    acv: 180000,
    totalFollowers: 2035000,
    engagementRate: 11.5,
    verified: true,
    auditedStatus: 'Top Tier',
    isTrending: true,
    trendingReason: '📈 +86.4M vistas TikTok (30 días), 22.3M alcance IG y colaboraciones exclusivas con Fernanfloo',
    sponsorshipRates: {
      sponsoredPost: 450,
      videoIntegration: 1100,
      monthlyAmbassador: 4500,
    },
    mediaKitPacks: [
      {
        title: 'TikTok + Reel Combo Explosivo',
        priceUSD: 1500,
        description: 'La máxima exposición posible en el mercado centroamericano.',
        deliverables: ['1 Video TikTok principal', '1 Reel de réplica en Instagram', 'Mención de marca y hashtag patrocinado'],
        popular: true
      },
      {
        title: 'Cameo Especial con Fernanfloo',
        priceUSD: 6500,
        description: 'Aparición directa de Fernanfloo en el video de Juanjo Llovera con reposteo.',
        deliverables: [
          '1 TikTok colaborativo con Fernanfloo',
          'Repost en Reels de Juanjo',
          'Libertad creativa 100%',
          'Permiso para que la marca comparta el video en historias'
        ]
      },
      {
        title: 'Cobertura Activaciones & Eventos',
        priceUSD: 550,
        description: 'Visita presencial del creador con equipo profesional (Sony A6000 / Canon R6 / Fotógrafo).',
        deliverables: ['Visita presencial de 2 horas máx', 'Secuencia de 3 stories', 'Galería fotográfica profesional']
      },
      {
        title: 'Paquete Unboxing Pro',
        priceUSD: 500,
        description: 'Revisión y experiencia de desempaque detallada.',
        deliverables: ['Guión técnico personalizado para unboxing', 'Secuencia de 3 stories totales']
      }
    ],
    brandWorkHistory: [
      { brandName: 'Pepsi', durationMonths: '12 meses', campaignType: 'Embajador Principal', year: '2025 - 2026', satisfaction: 'Excelente' },
      { brandName: 'Burger King', durationMonths: '10 meses', campaignType: 'Lanzamientos de Menú & Bromas', year: '2025', satisfaction: 'Excelente' },
      { brandName: 'Davivienda', durationMonths: '6 meses', campaignType: 'Banca Digital & Sorteos', year: '2025', satisfaction: 'Excelente' },
      { brandName: 'Volkswagen', durationMonths: '8 meses', campaignType: 'Test Drive & Lifestyle', year: '2024 - 2025', satisfaction: 'Excelente' },
      { brandName: 'Taco Bell', durationMonths: '6 meses', campaignType: 'Promociones & Trends', year: '2024', satisfaction: 'Excelente' },
      { brandName: 'Texaco', durationMonths: '8 meses', campaignType: 'Campaña de Combustibles & Viajes', year: '2024 - 2025', satisfaction: 'Excelente' },
      { brandName: 'Stella Artois', durationMonths: '5 meses', campaignType: 'Eventos Premium', year: '2024', satisfaction: 'Excelente' }
    ],
    brandRating: {
      trafficLight: 'green',
      statusText: '🟢 Liderazgo en Ventas & Tasa de Retención del 99%',
      commitmentScore: 99,
      totalCampaigns: 35,
      reviews: [
        { brandName: 'Pepsi', rating: 'green', comment: 'Respuesta masiva en punto de venta y más de 10M de reproducciones.', date: '2026-02-12', verifiedBrand: true },
        { brandName: 'Burger King', rating: 'green', comment: 'Humor original que conecta perfectamente con la generación Z.', date: '2025-11-30', verifiedBrand: true }
      ]
    },
    monthlyViews: 86400000,
    avgLikesPerPost: 380000,
    demographics: {
      gender: { male: 59, female: 40, other: 1 },
      topAgeGroup: '18-24',
      ageBreakdown: [
        { range: '13-17', percentage: 18 },
        { range: '18-24', percentage: 52 },
        { range: '25-34', percentage: 22 },
        { range: '35+', percentage: 8 }
      ],
      topCountries: [
        { country: 'El Salvador', code: 'SV', percentage: 48 },
        { country: 'Guatemala', code: 'GT', percentage: 18 },
        { country: 'Honduras', code: 'HN', percentage: 14 },
        { country: 'México', code: 'MX', percentage: 12 }
      ]
    },
    valuationHistory: [
      { year: '2023', valueInMillions: 1.2 },
      { year: '2024', valueInMillions: 2.5 },
      { year: '2025', valueInMillions: 3.8 },
      { year: '2026', valueInMillions: 4.8 }
    ],
    recentBrands: [
      'Volkswagen', 'Davivienda', 'Burger King', 'Stella Artois', 'Taco Bell', 'Pepsi', 
      'Metrocentro', 'Sostengo', 'Huawei', 'Texaco', 'Pandora', 'Plaza Futura'
    ],
    bio: 'Creador número 1 de comedia, vlogs y fitness en El Salvador. Colaborador frecuente de Fernanfloo y Kathya Vásquez.',
    joinedYear: 2018
  },
  {
    id: 'creator-ibai',
    name: 'Ibai Llanos',
    handle: '@ibai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    country: 'España',
    countryCode: 'ES',
    flagEmoji: '🇪🇸',
    ageRange: '28 - 32 años',
    primaryPlatform: 'Twitch',
    platforms: [
      { platform: 'Twitch', followers: '15.8M', followersCount: 15800000, url: 'https://twitch.tv/ibai' },
      { platform: 'YouTube', followers: '11.2M', followersCount: 11200000, url: 'https://youtube.com/ibai' },
      { platform: 'TikTok', followers: '18.5M', followersCount: 18500000, url: 'https://tiktok.com/@ibai' },
      { platform: 'Instagram', followers: '10.4M', followersCount: 10400000, url: 'https://instagram.com/ibaillanos' },
    ],
    category: 'Entretenimiento',
    tags: ['Eventos', 'Kings League', 'La Velada del Año', 'Just Chatting', 'Esports'],
    marketValueEur: 18500000,
    marketValueChangePct: 12.4,
    acv: 82500,
    totalFollowers: 55900000,
    engagementRate: 7.2,
    verified: true,
    auditedStatus: 'Top Tier',
    isTrending: true,
    trendingReason: '🏆 Organizador de La Velada del Año IV y Récord histórico de audiencia en Twitch',
    sponsorshipRates: {
      sponsoredPost: 25000,
      videoIntegration: 45000,
      monthlyAmbassador: 150000,
    },
    brandWorkHistory: [
      { brandName: 'Spotify', durationMonths: '24 meses', campaignType: 'Sponsor Oficial Kings League', year: '2024 - 2026', satisfaction: 'Excelente' },
      { brandName: 'Cupra', durationMonths: '18 meses', campaignType: 'Embajador Global', year: '2024 - 2025', satisfaction: 'Excelente' },
      { brandName: 'Logitech G', durationMonths: '36 meses', campaignType: 'Partner Técnico', year: '2023 - 2026', satisfaction: 'Excelente' }
    ],
    brandRating: {
      trafficLight: 'green',
      statusText: '🟢 Top 1 Mundial en Retorno y Cobertura de Medios',
      commitmentScore: 100,
      totalCampaigns: 48,
      reviews: [
        { brandName: 'Cupra', rating: 'green', comment: 'Impacto global incomparable en audiencias jóvenes y deportividad.', date: '2026-01-20', verifiedBrand: true },
        { brandName: 'Spotify', rating: 'green', comment: 'Récord de impresiones e integración de marca perfecta.', date: '2025-10-15', verifiedBrand: true }
      ]
    },
    monthlyViews: 45000000,
    avgLikesPerPost: 380000,
    demographics: {
      gender: { male: 68, female: 30, other: 2 },
      topAgeGroup: '18-24',
      ageBreakdown: [
        { range: '13-17', percentage: 15 },
        { range: '18-24', percentage: 48 },
        { range: '25-34', percentage: 27 },
        { range: '35+', percentage: 10 }
      ],
      topCountries: [
        { country: 'España', code: 'ES', percentage: 42 },
        { country: 'México', code: 'MX', percentage: 22 },
        { country: 'Argentina', code: 'AR', percentage: 16 },
        { country: 'Colombia', code: 'CO', percentage: 11 }
      ]
    },
    valuationHistory: [
      { year: '2022', valueInMillions: 9.8 },
      { year: '2023', valueInMillions: 12.5 },
      { year: '2024', valueInMillions: 15.2 },
      { year: '2025', valueInMillions: 16.8 },
      { year: '2026', valueInMillions: 18.5 }
    ],
    recentBrands: ['Logitech', 'Spotify', 'Mahou', 'Cupra', 'Doritos', 'PepsiCo'],
    bio: 'Presentador, creador de contenido y cofundador de KOI y Kings League. Organizador del evento en vivo más visto en la historia de internet.',
    joinedYear: 2014
  },
  {
    id: 'creator-rivers',
    name: 'Samy Rivers',
    handle: '@rivers_gg',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    country: 'México',
    countryCode: 'MX',
    flagEmoji: '🇲🇽',
    ageRange: '24 - 27 años',
    primaryPlatform: 'Twitch',
    platforms: [
      { platform: 'Twitch', followers: '6.4M', followersCount: 6400000, url: 'https://twitch.tv/rivers_gg' },
      { platform: 'TikTok', followers: '8.1M', followersCount: 8100000, url: 'https://tiktok.com/@rivers_gg' },
      { platform: 'YouTube', followers: '3.8M', followersCount: 3800000, url: 'https://youtube.com/rivers_gg' },
      { platform: 'Instagram', followers: '7.2M', followersCount: 7200000, url: 'https://instagram.com/samyrivers' },
    ],
    category: 'Gaming',
    tags: ['Pio FC', 'Kings League', 'Warzone', 'Lifestyle'],
    marketValueEur: 9200000,
    marketValueChangePct: 18.2,
    acv: 38500,
    totalFollowers: 25500000,
    engagementRate: 8.9,
    verified: true,
    auditedStatus: 'Verified Audit',
    isTrending: true,
    trendingReason: '👑 Presidenta de PIO FC & Líder de audiencias femeninas en español',
    sponsorshipRates: {
      sponsoredPost: 14000,
      videoIntegration: 26000,
      monthlyAmbassador: 85000,
    },
    brandWorkHistory: [
      { brandName: 'Red Bull México', durationMonths: '12 meses', campaignType: 'Atleta de Contenido', year: '2025 - 2026', satisfaction: 'Excelente' },
      { brandName: 'Puma', durationMonths: '8 meses', campaignType: 'Equipación de PIO FC', year: '2025', satisfaction: 'Excelente' }
    ],
    brandRating: {
      trafficLight: 'green',
      statusText: '🟢 Excelente Cumplimiento y Fidelidad Comunitaria',
      commitmentScore: 97,
      totalCampaigns: 26,
      reviews: [
        { brandName: 'Red Bull', rating: 'green', comment: 'Gran arrastre de público joven e identificación con los deportes.', date: '2026-01-22', verifiedBrand: true }
      ]
    },
    monthlyViews: 28000000,
    avgLikesPerPost: 310000,
    demographics: {
      gender: { male: 54, female: 44, other: 2 },
      topAgeGroup: '18-24',
      ageBreakdown: [
        { range: '13-17', percentage: 18 },
        { range: '18-24', percentage: 55 },
        { range: '25-34', percentage: 22 },
        { range: '35+', percentage: 5 }
      ],
      topCountries: [
        { country: 'México', code: 'MX', percentage: 58 },
        { country: 'España', code: 'ES', percentage: 18 },
        { country: 'Estados Unidos', code: 'US', percentage: 12 },
        { country: 'Colombia', code: 'CO', percentage: 7 }
      ]
    },
    valuationHistory: [
      { year: '2022', valueInMillions: 2.1 },
      { year: '2023', valueInMillions: 4.8 },
      { year: '2024', valueInMillions: 6.9 },
      { year: '2025', valueInMillions: 8.1 },
      { year: '2026', valueInMillions: 9.2 }
    ],
    recentBrands: ['Red Bull', 'Puma', 'Samsung', 'L’Oréal Paris'],
    bio: 'Presidenta de PIO FC en Kings League y Queens League. Una de las streamer femeninas más influyentes del mundo.',
    joinedYear: 2020
  },
  {
    id: 'creator-luisito',
    name: 'Luisito Comunica',
    handle: '@luisitocomunica',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    country: 'México',
    countryCode: 'MX',
    flagEmoji: '🇲🇽',
    ageRange: '30 - 35 años',
    primaryPlatform: 'YouTube',
    platforms: [
      { platform: 'YouTube', followers: '43.2M', followersCount: 43200000, url: 'https://youtube.com/luisitocomunica' },
      { platform: 'Instagram', followers: '33.8M', followersCount: 33800000, url: 'https://instagram.com/luisitocomunica' },
      { platform: 'TikTok', followers: '17.4M', followersCount: 17400000, url: 'https://tiktok.com/@luisitocomunica' },
    ],
    category: 'Lifestyle',
    tags: ['Viajes', 'Gastronomía', 'Emprendimiento', 'Vlogs'],
    marketValueEur: 22400000,
    marketValueChangePct: 6.5,
    acv: 125000,
    totalFollowers: 94400000,
    engagementRate: 5.4,
    verified: true,
    auditedStatus: 'Top Tier',
    sponsorshipRates: {
      sponsoredPost: 32000,
      videoIntegration: 65000,
      monthlyAmbassador: 180000,
    },
    brandWorkHistory: [
      { brandName: 'Corona', durationMonths: '12 meses', campaignType: 'Embajador de Viajes', year: '2025', satisfaction: 'Excelente' },
      { brandName: 'American Express', durationMonths: '24 meses', campaignType: 'Tarjetas Premium', year: '2024 - 2026', satisfaction: 'Excelente' }
    ],
    brandRating: {
      trafficLight: 'green',
      statusText: '🟢 Credibilidad Internacional Absoluta',
      commitmentScore: 99,
      totalCampaigns: 60,
      reviews: [
        { brandName: 'American Express', rating: 'green', comment: 'Conversión inmediata en segmento de alto valor.', date: '2025-11-10', verifiedBrand: true }
      ]
    },
    monthlyViews: 82000000,
    avgLikesPerPost: 650000,
    demographics: {
      gender: { male: 52, female: 46, other: 2 },
      topAgeGroup: '25-34',
      ageBreakdown: [
        { range: '13-17', percentage: 10 },
        { range: '18-24', percentage: 38 },
        { range: '25-34', percentage: 39 },
        { range: '35+', percentage: 13 }
      ],
      topCountries: [
        { country: 'México', code: 'MX', percentage: 32 },
        { country: 'Colombia', code: 'CO', percentage: 18 },
        { country: 'Argentina', code: 'AR', percentage: 14 },
        { country: 'Estados Unidos', code: 'US', percentage: 12 }
      ]
    },
    valuationHistory: [
      { year: '2022', valueInMillions: 16.0 },
      { year: '2023', valueInMillions: 18.2 },
      { year: '2024', valueInMillions: 19.8 },
      { year: '2025', valueInMillions: 21.0 },
      { year: '2026', valueInMillions: 22.4 }
    ],
    recentBrands: ['Corona', 'Pillofon', 'Uber Eats', 'American Express'],
    bio: 'Youtuber de viajes más grande de habla hispana, empresario y creador de contenido cultural y de aventura.',
    joinedYear: 2012
  }
];

export const industryPartners: BrandPartner[] = [
  { name: 'Samsung', logo: 'SAMSUNG', category: 'Tecnología & Móviles', bgColor: 'bg-blue-900', textColor: 'text-white' },
  { name: 'Pollo Campero', logo: 'POLLO CAMPERO', category: 'Alimentos', bgColor: 'bg-amber-600', textColor: 'text-white' },
  { name: 'Dove', logo: 'DOVE', category: 'Cuidado Personal', bgColor: 'bg-sky-700', textColor: 'text-white' },
  { name: 'Steren', logo: 'STEREN', category: 'Electrónica', bgColor: 'bg-cyan-600', textColor: 'text-white' },
  { name: 'Eucerin', logo: 'EUCERIN', category: 'Dermocosmética', bgColor: 'bg-red-800', textColor: 'text-white' },
  { name: 'Puma Energy', logo: 'PUMA ENERGY', category: 'Energía', bgColor: 'bg-red-600', textColor: 'text-white' },
  { name: 'DoradoBet', logo: 'DORADOBET', category: 'Entretenimiento', bgColor: 'bg-yellow-600', textColor: 'text-black' },
  { name: 'McDonald’s', logo: 'MCDONALD\'S', category: 'Restaurantes', bgColor: 'bg-red-700', textColor: 'text-yellow-300' },
  { name: 'Pedigree', logo: 'PEDIGREE', category: 'Mascotas', bgColor: 'bg-yellow-500', textColor: 'text-red-900' },
  { name: 'Siman', logo: 'SIMAN', category: 'Tiendas por Departamento', bgColor: 'bg-rose-900', textColor: 'text-white' },
  { name: 'Gatorade', logo: 'GATORADE', category: 'Bebidas Deportivas', bgColor: 'bg-orange-600', textColor: 'text-white' },
  { name: 'Lipton', logo: 'LIPTON', category: 'Bebidas', bgColor: 'bg-yellow-400', textColor: 'text-red-800' },
  { name: 'Banco Atlántida', logo: 'BANCO ATLÁNTIDA', category: 'Banca', bgColor: 'bg-red-900', textColor: 'text-white' },
  { name: 'UNO Gasolineras', logo: 'UNO', category: 'Energía', bgColor: 'bg-blue-800', textColor: 'text-white' },
  { name: 'Volkswagen', logo: 'VOLKSWAGEN', category: 'Automotriz', bgColor: 'bg-indigo-950', textColor: 'text-white' },
  { name: 'Davivienda', logo: 'DAVIVIENDA', category: 'Banca', bgColor: 'bg-red-600', textColor: 'text-white' },
  { name: 'Burger King', logo: 'BURGER KING', category: 'Restaurantes', bgColor: 'bg-amber-800', textColor: 'text-yellow-400' },
  { name: 'Stella Artois', logo: 'STELLA ARTOIS', category: 'Bebidas', bgColor: 'bg-emerald-900', textColor: 'text-amber-300' },
  { name: 'Taco Bell', logo: 'TACO BELL', category: 'Restaurantes', bgColor: 'bg-purple-800', textColor: 'text-white' },
  { name: 'Pepsi', logo: 'PEPSI', category: 'Bebidas', bgColor: 'bg-blue-600', textColor: 'text-white' },
  { name: 'Metrocentro', logo: 'METROCENTRO', category: 'Centros Comerciales', bgColor: 'bg-slate-800', textColor: 'text-teal-400' },
  { name: 'Sostengo', logo: 'SOSTENGO', category: 'Insurtech', bgColor: 'bg-violet-700', textColor: 'text-white' },
  { name: 'Huawei', logo: 'HUAWEI', category: 'Tecnología', bgColor: 'bg-red-700', textColor: 'text-white' },
  { name: 'Texaco', logo: 'TEXACO', category: 'Energía', bgColor: 'bg-red-600', textColor: 'text-white' },
  { name: 'Pandora', logo: 'PANDORA', category: 'Joyería', bgColor: 'bg-stone-800', textColor: 'text-pink-300' },
  { name: 'Plaza Futura', logo: 'PLAZA FUTURA', category: 'Centros Comerciales', bgColor: 'bg-emerald-800', textColor: 'text-white' },
];

export const creatorNewsMockData: CreatorNewsItem[] = [
  {
    id: 'news-1',
    title: 'Juanjo Llovera y Kathya Vásquez revolucionan las campañas en pareja en Centroamérica',
    summary: 'Con una audiencia combinada superior a los 1.9M de seguidores, la dupla de creadores salvadoreños presenta paquetes conjuntos que garantizan más de 86M de vistas mensuales.',
    author: 'Redacción CC-Market',
    date: 'Hace 2 días',
    category: 'Estrategia de Marcas',
    creatorId: 'creator-juanjo',
    creatorName: 'Juanjo Llovera',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    readTime: '3 min lectura'
  },
  {
    id: 'news-2',
    title: 'Augusto Morales alcanza los 517K seguidores en TikTok con tendencias de Outfits masculinos',
    summary: 'El creador guatemalteco consolida su posición como referente de moda y lifestyle en la región con promedios de vista de hasta 100K por publicación.',
    author: 'Tendencias Digitales',
    date: 'Ayer',
    category: 'Moda & Lifestyle',
    creatorId: 'creator-augusto',
    creatorName: 'Augusto Morales',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
    readTime: '2 min lectura'
  },
  {
    id: 'news-3',
    title: 'Alejo Reviews supera los 4 millones de impresiones en Instagram Reels con marcas tech',
    summary: 'Su enfoque transparente de análisis de producto se posiciona como el favorito de marcas como Samsung y Mercado Libre en el cono sur.',
    author: 'Análisis de Mercado',
    date: 'Hace 3 días',
    category: 'Tech & Reviews',
    creatorId: 'creator-alejo',
    creatorName: 'Alejo Reviews',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    readTime: '4 min lectura'
  },
  {
    id: 'news-4',
    title: 'Semáforo de Marcas en CC-Market: El 98% de los creadores destacados mantiene calificación verde',
    summary: 'Marcas internacionales como Pepsi, Samsung y McDonald’s valoran positivamente el cumplimiento de entregables y métricas de conversión en la plataforma.',
    author: 'Auditoría CC-Market',
    date: 'Hoy',
    category: 'Métricas & Valoración',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    readTime: '5 min lectura'
  }
];
