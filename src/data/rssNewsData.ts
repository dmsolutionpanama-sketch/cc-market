import { CreatorNewsItem } from '../types';

export interface RssFeedSource {
  id: string;
  name: string;
  rssUrl: string;
  websiteUrl: string;
  category: string;
  logo: string;
}

export const GLOBAL_RSS_SOURCES: RssFeedSource[] = [
  {
    id: 'tubefilter',
    name: 'Tubefilter',
    rssUrl: 'https://www.tubefilter.com/feed/',
    websiteUrl: 'https://www.tubefilter.com',
    category: 'Creator Economy',
    logo: '🎬 Tubefilter',
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch Creators',
    rssUrl: 'https://techcrunch.com/category/media/feed/',
    websiteUrl: 'https://techcrunch.com',
    category: 'Tech & Plataformas',
    logo: '⚡ TechCrunch',
  },
  {
    id: 'dexerto',
    name: 'Dexerto Streaming',
    rssUrl: 'https://www.dexerto.com/feed/',
    websiteUrl: 'https://www.dexerto.com',
    category: 'Gaming & Twitch',
    logo: '🎮 Dexerto',
  },
  {
    id: 'youtube-blog',
    name: 'YouTube Official Blog',
    rssUrl: 'https://blog.youtube/news-and-events/rss/',
    websiteUrl: 'https://blog.youtube',
    category: 'YouTube Updates',
    logo: '▶ YouTube Blog',
  },
  {
    id: 'rest-of-world',
    name: 'Rest of World Media',
    rssUrl: 'https://restofworld.org/feed/',
    websiteUrl: 'https://restofworld.org',
    category: 'Global Digital',
    logo: '🌐 Rest of World',
  },
  {
    id: 'cc-market',
    name: 'CC-Market Editorial',
    rssUrl: 'https://ccmarket.creadores/rss.xml',
    websiteUrl: 'https://ccmarket.creadores',
    category: 'Casos de Éxito',
    logo: '🔵 CC-Market',
  },
];

export const HISTORICAL_RSS_NEWS: CreatorNewsItem[] = [
  {
    id: 'rss-1',
    title: 'MrBeast invierte $100M en nuevos estudios de producción y firma acuerdo global con Amazon Prime',
    summary: 'El creador con mayor número de suscriptores del mundo amplía su infraestructura de producción en Carolina del Norte para lanzar su reality show de escala internacional.',
    author: 'Tubefilter Staff',
    date: '28 Jul 2026',
    category: 'Creator Economy',
    creatorName: 'MrBeast',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Tubefilter',
    sourceLogo: '🎬 Tubefilter',
    externalUrl: 'https://www.tubefilter.com/2026/07/mrbeast-prime-video-production-studio',
  },
  {
    id: 'rss-2',
    title: 'Twitch actualiza sus políticas de ingresos por suscripción e incentivos para streamers top',
    summary: 'La plataforma del grupo Amazon elimina el tope de ingresos del programa de socios 70/30 para creadores que alcancen más de 350 puntos de suscripción activos.',
    author: 'Dexerto Gaming',
    date: '28 Jul 2026',
    category: 'Gaming & Twitch',
    creatorName: 'Ibai Llanos',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com/es/streaming/twitch-partner-plus-program-updates',
  },
  {
    id: 'rss-3',
    title: 'YouTube Shorts supera los 70 mil millones de visualizaciones diarias e introduce compras nativas',
    summary: 'La funcionalidad de monetización directa en Shorts permite a marcas y creadores etiquetar productos en vivo con tasas de conversión superiores al 4.2%.',
    author: 'TechCrunch Media',
    date: '27 Jul 2026',
    category: 'Tech & Plataformas',
    creatorName: 'Luisito Comunica',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min lectura',
    source: 'TechCrunch',
    sourceLogo: '⚡ TechCrunch',
    externalUrl: 'https://techcrunch.com/2026/07/youtube-shorts-shopping-features',
  },
  {
    id: 'rss-4',
    title: 'Juanjo Llovera y Kathya Vásquez revolucionan las campañas en pareja en Centroamérica',
    summary: 'Con una audiencia combinada superior a los 1.9M de seguidores, la dupla presenta paquetes de patrocinio conjunto con alcance auditado de 86M de vistas.',
    author: 'Redacción CC-Market',
    date: '27 Jul 2026',
    category: 'Casos de Éxito',
    creatorName: 'Juanjo Llovera',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores/noticias/juanjo-llovera-kathya-vasquez-campanas',
  },
  {
    id: 'rss-5',
    title: 'TikTok anuncia fondo de $2,000M para incentivar a creadores de contenido educativo y ciencia',
    summary: 'El nuevo "STEM Creator Fund" compensará directamente a divulgadores científicos y educadores por cada 1,000 visualizaciones calificadas en vídeo horizontal.',
    author: 'Variety Digital',
    date: '26 Jul 2026',
    category: 'Tech & Plataformas',
    creatorName: 'Javier Santaolalla',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Variety',
    sourceLogo: '🎭 Variety',
    externalUrl: 'https://variety.com/2026/digital/news/tiktok-stem-creator-fund',
  },
  {
    id: 'rss-6',
    title: 'Ibai Llanos batirá récords en La Velada del Año VI con patrocinios que superan los €12M',
    summary: 'Marcas de automoción, telefonía y bebidas energéticas firman acuerdos exclusivos para el evento de entretenimiento en streaming más visto del planeta.',
    author: 'Forbes Creator Economy',
    date: '26 Jul 2026',
    category: 'Eventos & Entretenimiento',
    creatorName: 'Ibai Llanos',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min lectura',
    source: 'Forbes',
    sourceLogo: '💼 Forbes',
    externalUrl: 'https://forbes.es/business/velada-del-ano-patrocinios-ibai',
  },
  {
    id: 'rss-7',
    title: 'El auge del UGC en Latinoamérica: Las marcas destinan el 35% de su presupuesto a microcreadores',
    summary: 'Estudio de mercado revela que las publicaciones auténticas de creadores de menos de 100K seguidores generan un ROI de inversión publicitaria de 4.8x.',
    author: 'Marketing Brew',
    date: '25 Jul 2026',
    category: 'Estrategia de Marcas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Marketing Brew',
    sourceLogo: '☕ Marketing Brew',
    externalUrl: 'https://www.marketingbrew.com/stories/ugc-latam-micro-creators-roi',
  },
  {
    id: 'rss-8',
    title: 'Augusto Morales alcanza los 517K seguidores en TikTok con tendencias de moda masculina',
    summary: 'El creador guatemalteco consolida su posición como referente de moda y lifestyle con promedios de vista de hasta 100K por publicación auditada.',
    author: 'Tendencias Digitales',
    date: '25 Jul 2026',
    category: 'Moda & Lifestyle',
    creatorName: 'Augusto Morales',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800',
    readTime: '2 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores/noticias/augusto-morales-moda-tiktok',
  },

  // Page 2 Historical RSS
  {
    id: 'rss-9',
    title: 'Alejo Reviews supera los 4M de impresiones en Instagram Reels analizando tecnología de consumo',
    summary: 'Su formato transparente de análisis de smartphones y laptops se posiciona como el favorito de marcas globales como Samsung y Mercado Libre.',
    author: 'Análisis de Mercado',
    date: '24 Jul 2026',
    category: 'Tech & Reviews',
    creatorName: 'Alejo Reviews',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores/noticias/alejo-reviews-analisis-tech',
  },
  {
    id: 'rss-10',
    title: 'Kick lanza programa de retención de talentos ofreciendo contratos multianuales sin exclusividad',
    summary: 'La plataforma verde intensifica su competencia frente a Twitch firmando a creadores destacados de habla hispana con garantías de ingresos fijos.',
    author: 'Dexerto Gaming',
    date: '24 Jul 2026',
    category: 'Gaming & Twitch',
    creatorName: 'AuronPlay',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com/es/streaming/kick-streamer-incentive-program',
  },
  {
    id: 'rss-11',
    title: 'YouTube integra herramientas de Inteligencia Artificial para doblaje automático multilingüe',
    summary: 'La nueva función "Aloud" impulsada por Gemini permite a los creadores traducir y doblar sus vídeos a más de 20 idiomas manteniendo el timbre vocal original.',
    author: 'YouTube Official Blog',
    date: '23 Jul 2026',
    category: 'YouTube Updates',
    creatorName: 'El Rubius',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min lectura',
    source: 'YouTube Blog',
    sourceLogo: '▶ YouTube Blog',
    externalUrl: 'https://blog.youtube/news-and-events/aloud-ai-dubbing-expansion',
  },
  {
    id: 'rss-12',
    title: 'SammyyArriaga combina música country e innovación Web3 con patrocinio de marcas automotrices',
    summary: 'El cantautor y creador miamense de origen cubano recauda más de $800K vendiendo pases VIP digitales para sus giras por Estados Unidos.',
    author: 'Rest of World Media',
    date: '23 Jul 2026',
    category: 'Global Digital',
    creatorName: 'SammyyArriaga',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Rest of World',
    sourceLogo: '🌐 Rest of World',
    externalUrl: 'https://restofworld.org/2026/sammyy-arriaga-country-creator-tech',
  },
  {
    id: 'rss-13',
    title: 'Las agencias de Media Kits reportan un incremento del 42% en contrataciones directas sin intermediarios',
    summary: 'Los datos auditados de audiencia en tiempo real reemplazan a las presentaciones estáticas en PDF para agilizar negociaciones entre marcas y creadores.',
    author: 'Tubefilter Staff',
    date: '22 Jul 2026',
    category: 'Creator Economy',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Tubefilter',
    sourceLogo: '🎬 Tubefilter',
    externalUrl: 'https://www.tubefilter.com/2026/07/media-kit-automation-growth',
  },
  {
    id: 'rss-14',
    title: 'The Grefg organiza los Premios ESLAND V en México con asistencia confirmada de más de 20,000 fans',
    summary: 'La gran gala de creadores de contenido de la comunidad hispanohablante tendrá lugar en la Ciudad de México con más de 15 marcas globales como patrocinadores oficiales.',
    author: 'Dexerto Gaming',
    date: '22 Jul 2026',
    category: 'Eventos & Entretenimiento',
    creatorName: 'TheGrefg',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com/es/esports/premios-esland-mexico-grefg',
  },
  {
    id: 'rss-15',
    title: 'Meta presenta "Meta AI Studio for Creators": Clones digitales para responder comentarios y DMs',
    summary: 'Instagram permite a los creadores entrenar modelos de IA con su propio tono de voz y estilo para interactuar con su comunidad de forma automatizada.',
    author: 'TechCrunch Media',
    date: '21 Jul 2026',
    category: 'Tech & Plataformas',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min lectura',
    source: 'TechCrunch',
    sourceLogo: '⚡ TechCrunch',
    externalUrl: 'https://techcrunch.com/2026/07/meta-ai-studio-creator-clones',
  },
  {
    id: 'rss-16',
    title: 'El Semáforo de Marcas en CC-Market certifica a más de 120 creadores con métricas de 100% cumplimiento',
    summary: 'Marcas como Pepsi, McDonald’s y Toyota consultan la plataforma diariamente para seleccionar perfiles verificados antes de lanzar sus campañas trimestrales.',
    author: 'Auditoría CC-Market',
    date: '21 Jul 2026',
    category: 'Casos de Éxito',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores/noticias/semaforo-marcas-certificacion',
  },

  // Page 3 Historical RSS
  {
    id: 'rss-17',
    title: 'Luzu Games regresa a la creación de contenido activo con una serie colaborativa en Minecraft',
    summary: 'El legendario youtuber español reúne a más de 50 streamers de primera línea en una producción que supera los 15M de reproducciones acumuladas en su primera semana.',
    author: 'Dexerto Gaming',
    date: '20 Jul 2026',
    category: 'Gaming & Twitch',
    creatorName: 'Luzu',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com/es/entretenimiento/luzu-games-regreso-minecraft',
  },
  {
    id: 'rss-18',
    title: 'Spotify amplía las funciones de monetización para videopodcasts en España y Latinoamérica',
    summary: 'Los podcasters podrán insertar anuncios dinámicos y ofrecer suscripciones de pago directo para episodios exclusivos con bajas comisiones por transacción.',
    author: 'Tubefilter Staff',
    date: '20 Jul 2026',
    category: 'Creator Economy',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Tubefilter',
    sourceLogo: '🎬 Tubefilter',
    externalUrl: 'https://www.tubefilter.com/2026/07/spotify-video-podcast-monetization-latam',
  },
  {
    id: 'rss-19',
    title: 'Kenia Os firma acuerdo millonario con marcas globales de belleza para su línea "Kenia Os Beauty"',
    summary: 'La cantante y creadora mexicana posiciona sus productos en más de 500 tiendas físicas tras promociones virales en TikTok e Instagram.',
    author: 'Variety Digital',
    date: '19 Jul 2026',
    category: 'Moda & Lifestyle',
    creatorName: 'Kenia Os',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Variety',
    sourceLogo: '🎭 Variety',
    externalUrl: 'https://variety.com/2026/music/news/kenia-os-beauty-expansion',
  },
  {
    id: 'rss-20',
    title: 'El fenómeno del Vtubing se expande en habla hispana con crecimientos superiores al 180% anual',
    summary: 'Agencias de representación abren divisiones dedicadas exclusivamente a avatares virtuales con audiencias de alta fidelización y poder adquisitivo.',
    author: 'Rest of World Media',
    date: '19 Jul 2026',
    category: 'Global Digital',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min lectura',
    source: 'Rest of World',
    sourceLogo: '🌐 Rest of World',
    externalUrl: 'https://restofworld.org/2026/spanish-vtubers-growth-boom',
  },
  {
    id: 'rss-21',
    title: 'YouTube Shopping habilita afiliación directa para creadores de contenido en España y México',
    summary: 'Los canales calificados podrán ganar comisiones automáticas por ventas generadas a través de enlaces integrados en la pantalla del vídeo.',
    author: 'YouTube Official Blog',
    date: '18 Jul 2026',
    category: 'YouTube Updates',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'YouTube Blog',
    sourceLogo: '▶ YouTube Blog',
    externalUrl: 'https://blog.youtube/news-and-events/youtube-shopping-affiliate-program',
  },
  {
    id: 'rss-22',
    title: 'Rubius y la Kings League expanden la liga a Norteamérica con partidos transmitidos en vivo',
    summary: 'La Kings League Americas bate récord de audiencia en Twitch con picos superiores a 1.2M de espectadores simultáneos en su jornada inaugural.',
    author: 'Dexerto Gaming',
    date: '18 Jul 2026',
    category: 'Gaming & Twitch',
    creatorName: 'El Rubius',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com/es/entretenimiento/kings-league-americas-rubius',
  },
  {
    id: 'rss-23',
    title: 'Plataformas de gestión de derechos de autor refuerzan la protección de contenidos con marcas de agua invisibles',
    summary: 'Nuevas tecnologías de fingerprinting digital permiten identificar resubidas no autorizadas en TikTok y Reels en menos de 60 segundos.',
    author: 'TechCrunch Media',
    date: '17 Jul 2026',
    category: 'Tech & Plataformas',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'TechCrunch',
    sourceLogo: '⚡ TechCrunch',
    externalUrl: 'https://techcrunch.com/2026/07/content-copyright-fingerprinting-creators',
  },
  {
    id: 'rss-24',
    title: 'Marcas de consumo masivo incrementan sus presupuestos de patrocinios con creadores locales en un 50%',
    summary: 'La autenticidad y cercanía de los creadores regionales superan a las campañas de publicidad tradicional en métricas de recuerdo de marca.',
    author: 'Marketing Brew',
    date: '17 Jul 2026',
    category: 'Estrategia de Marcas',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Marketing Brew',
    sourceLogo: '☕ Marketing Brew',
    externalUrl: 'https://www.marketingbrew.com/stories/fmcg-sponsorship-creator-budgets',
  },
];

/**
 * Interleave articles from different sources while maintaining dates,
 * so adjacent cards come from different publishers for maximum visual dynamism!
 */
export function interleaveAndSortByDate(items: CreatorNewsItem[]): CreatorNewsItem[] {
  if (!items || items.length === 0) return [];

  // Group items by date or sort by date
  const copy = [...items];

  // Group items by source
  const sourcesMap = new Map<string, CreatorNewsItem[]>();
  copy.forEach((item) => {
    const src = item.source || 'General';
    if (!sourcesMap.has(src)) {
      sourcesMap.set(src, []);
    }
    sourcesMap.get(src)!.push(item);
  });

  const sourceKeys = Array.from(sourcesMap.keys());
  const result: CreatorNewsItem[] = [];
  let sourceIdx = 0;

  // Round-robin selection across sources to maximize site diversity
  while (result.length < copy.length) {
    let addedInRound = false;

    for (let i = 0; i < sourceKeys.length; i++) {
      const currentSrcKey = sourceKeys[(sourceIdx + i) % sourceKeys.length];
      const srcList = sourcesMap.get(currentSrcKey);

      if (srcList && srcList.length > 0) {
        result.push(srcList.shift()!);
        addedInRound = true;
      }
    }

    sourceIdx = (sourceIdx + 1) % Math.max(1, sourceKeys.length);
    if (!addedInRound) break;
  }

  return result;
}

/**
 * Helper function to fetch live RSS items via rss2json API proxy,
 * falling back gracefully to HISTORICAL_RSS_NEWS.
 */
export async function fetchLiveRssNews(): Promise<CreatorNewsItem[]> {
  try {
    const rssUrls = [
      'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.tubefilter.com%2Ffeed%2F',
      'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Fcategory%2Fmedia%2Ffeed%2F',
    ];

    const responses = await Promise.allSettled(
      rssUrls.map((u) => fetch(u).then((res) => res.json()))
    );

    const liveItems: CreatorNewsItem[] = [];

    responses.forEach((res, index) => {
      if (res.status === 'fulfilled' && res.value && res.value.status === 'ok' && Array.isArray(res.value.items)) {
        const feedMeta = res.value.feed;
        const sourceName = index === 0 ? 'Tubefilter' : 'TechCrunch';
        const sourceLogo = index === 0 ? '🎬 Tubefilter' : '⚡ TechCrunch';

        res.value.items.slice(0, 10).forEach((item: any, i: number) => {
          const rawDesc = item.description || item.content || '';
          const cleanSummary = rawDesc.replace(/<[^>]+>/g, '').slice(0, 180) + '...';
          const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : '28 Jul 2026';

          let imgUrl = item.thumbnail || item.enclosure?.link;
          if (!imgUrl) {
            imgUrl = index === 0 
              ? 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
              : 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800';
          }

          liveItems.push({
            id: `live-rss-${index}-${i}-${Date.now()}`,
            title: item.title,
            summary: cleanSummary,
            author: item.author || sourceName,
            date: pubDate,
            category: index === 0 ? 'Creator Economy' : 'Tech & Plataformas',
            imageUrl: imgUrl,
            readTime: '3 min lectura',
            source: sourceName,
            sourceLogo: sourceLogo,
            externalUrl: item.link || feedMeta?.link,
            isRssLive: true,
          });
        });
      }
    });

    if (liveItems.length > 0) {
      const merged = [...liveItems, ...HISTORICAL_RSS_NEWS];
      return interleaveAndSortByDate(merged);
    }
  } catch (err) {
    console.warn('RSS live fetch fallback to historical data:', err);
  }

  return interleaveAndSortByDate(HISTORICAL_RSS_NEWS);
}
