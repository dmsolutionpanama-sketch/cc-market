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
    fullContent: `El fenómeno global de la creación de contenido, Jimmy Donaldson (conocido mundialmente como MrBeast), ha anunciado formalmente el despliegue de una inversión histórica de $100 millones de dólares destinada a expandir sus complejos de producción cinematográfica y digital en Carolina del Norte.

Esta ambiciosa expansión estratégica responde al acuerdo multimillonario alcanzado con Amazon Prime Video para la producción de "Beast Games", un formato de reality competitivo a escala masiva que reunirá a más de 1,000 participantes compitiendo por un premio acumulado sin precedentes en la industria del entretenimiento digital.

**Puntos Clave de la Noticia:**
• Construcción de 5 nuevos sets de grabación inmersivos con tecnología LED volumen y soporte técnico para transmisiones simultáneas en 4K.
• Contratación de más de 250 profesionales de la industria de la televisión y el cine tradicional para optimizar los procesos de edición y postproducción.
• Integración de marcas globales patrocinadoras dentro de los desafíos de la serie sin interrumpir la narrativa orgánica del espectáculo.

Este movimiento consolida la tendencia de transición de los creadores de contenido nativos digitales hacia las grandes plataformas de streaming OTT, redefiniendo los estándares de presupuestos y alcance de la Creator Economy.`,
    author: 'Tubefilter Staff',
    date: '28 Jul 2026',
    category: 'Creator Economy',
    creatorName: 'MrBeast',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Tubefilter',
    sourceLogo: '🎬 Tubefilter',
    externalUrl: 'https://www.tubefilter.com',
  },
  {
    id: 'rss-2',
    title: 'Twitch actualiza sus políticas de ingresos por suscripción e incentivos para streamers top',
    summary: 'La plataforma del grupo Amazon elimina el tope de ingresos del programa de socios 70/30 para creadores que alcancen más de 350 puntos de suscripción activos.',
    fullContent: `En una medida ampliamente celebrada por la comunidad global de transmisión en vivo, Twitch ha hecho pública la reestructuración completa del programa Partner Plus, eliminando el histórico límite de $100,000 en el reparto de ingresos del 70/30 a favor de los streamers.

A partir de este trimestre, cualquier creador que mantenga un mínimo de 350 puntos de suscripción recurrentes durante tres meses consecutivos retendrá el 70% de todos los ingresos generados por suscripciones de pago y regalo, sin importar el monto total acumulado.

**Novedades Principales del Programa:**
• Umbral reducido a 100 puntos de suscripción para acceder al nivel inicial de reparto 60/40.
• Pagos automatizados en moneda local para streamers en América Latina y España en un plazo máximo de 15 días hábiles.
• Nuevas métricas de incentivos por bloques publicitarios opcionales sin penalizaciones en la visibilidad del canal.

Streamers de renombre como Ibai Llanos y AuronPlay destacaron que esta decisión brinda mayor estabilidad económica a los equipos de producción independientes y fortalece la competitividad de Twitch frente a alternativas como Kick y YouTube Gaming.`,
    author: 'Dexerto Gaming',
    date: '28 Jul 2026',
    category: 'Gaming & Twitch',
    creatorName: 'Ibai Llanos',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com',
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
    externalUrl: 'https://techcrunch.com',
    fullContent: `YouTube ha revelado en su informe trimestral que los vídeos en formato vertical Shorts han alcanzado la cifra récord de 70,000 millones de reproducciones diarias en todo el planeta. Acompañando este hito de tráfico, la compañía oficializó la integración de herramientas de comercio electrónico nativo directamente en la interfaz de reproducción.

Con esta actualización, los creadores pueden vincular productos físicos y digitales mediante etiquetas interactivas situadas en el margen inferior de la pantalla. Los usuarios pueden concretar sus compras utilizando Google Pay sin salir de la aplicación ni pausar el contenido.

**Impacto para las Marcas y Creadores:**
• Creadores hispanohablantes como Luisito Comunica reportan incrementos de hasta 3x en comisiones por afiliación.
• Analíticas en tiempo real de tasa de clics (CTR), tiempo de retención e ingresos brutos por cada vídeo corto publicado.
• Algoritmo optimizado para recomendar contenido comercial basado en los intereses manifestados por el espectador.`,
  },
  {
    id: 'rss-4',
    title: 'Juanjo Llovera y Kathya Vásquez revolucionan las campañas en pareja en Centroamérica',
    summary: 'Con una audiencia combinada superior a los 1.9M de seguidores, la dupla presenta paquetes de patrocinio conjunto con alcance auditado de 86M de vistas.',
    fullContent: `La dupla de creadores guatemaltecos Juanjo Llovera y Kathya Vásquez se posiciona como una de las alianzas más codiciadas por anunciantes multinacionales en la región centroamericana. A través del modelo de 'Campañas Co-Branded', la pareja ha diseñado un formato publicitario unificado que abarca canales cruzados en TikTok, Instagram Reels y YouTube.

Las auditorías de métricas realizadas a través de la plataforma CC-Market destacan una tasa de engagement promedio del 8.4%, una cifra que triplica la media del sector de estilo de vida y entretenimieno regional.

**Factores de Éxito Comercial:**
• Combinación estratégica de audiencias complementarias (moda, viajes, comedia y vida cotidiana).
• Contratos trimestrales de embajaduría de marca con seguimiento en vivo de conversiones y enlaces rastreables.
• Alta transparencia en la divulgación de colaboraciones, lo que refuerza la confianza y retención del público.`,
    author: 'Redacción CC-Market',
    date: '27 Jul 2026',
    category: 'Casos de Éxito',
    creatorName: 'Juanjo Llovera',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores',
  },
  {
    id: 'rss-5',
    title: 'TikTok anuncia fondo de $2,000M para incentivar a creadores de contenido educativo y ciencia',
    summary: 'El nuevo "STEM Creator Fund" compensará directamente a divulgadores científicos y educadores por cada 1,000 visualizaciones calificadas en vídeo horizontal.',
    fullContent: `Con el objetivo de fomentar el aprendizaje de calidad dentro de la plataforma, TikTok ha anunciado la creación del "STEM Creator Fund", un fondo dotado con $2,000 millones de dólares para los próximos tres años, dirigido exclusivamente a creadores de contenido enfocado en Ciencia, Tecnología, Ingeniería y Matemáticas.

El programa introduce una tarifa fija por cada mil reproducciones calificadas (RPM) para vídeos que superen los 60 segundos de duración e incorporen explicaciones verificadas por comités académicos independientes.

Divulgadores de prestigio como el físico y creador Javier Santaolalla han valorado positivamente la iniciativa, destacando que "este tipo de incentivos dignifica la labor de los educadores digitales y estimula la producción de contenido de alto valor para las nuevas generaciones".`,
    author: 'Variety Digital',
    date: '26 Jul 2026',
    category: 'Tech & Plataformas',
    creatorName: 'Javier Santaolalla',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Variety',
    sourceLogo: '🎭 Variety',
    externalUrl: 'https://variety.com',
  },
  {
    id: 'rss-6',
    title: 'Ibai Llanos batirá récords en La Velada del Año VI con patrocinios que superan los €12M',
    summary: 'Marcas de automoción, telefonía y bebidas energéticas firman acuerdos exclusivos para el evento de entretenimiento en streaming más visto del planeta.',
    fullContent: `La sexta edición de La Velada del Año organizada por el streamer español Ibai Llanos promete romper todos los récords históricos de facturación y audiencia en la historia de la transmisión en directo. Según cifras confirmadas por los organizadores, los ingresos garantizados por patrocinadores comerciales han sobrepasado por primera vez la barrera de los 12 millones de euros.

El evento, que se celebrará en un estadio de fútbol de máxima capacidad, contará con la presencia de artistas internacionales de primer nivel y combates entre creadores de contenido de España, Latinoamérica y Estados Unidos.

**Datos de Patrocinio y Comercialización:**
• Integración de marcas de tecnología con activaciones interactivas en tiempo real durante los descansos.
• Derechos de transmisión en exclusiva en Twitch con señal limpia de distribución a más de 50 canales internacionales de retransmisión autorizada.
• Venta total de entradas en taquilla lograda en menos de 18 minutos tras el lanzamiento de las localidades.`,
    author: 'Forbes Creator Economy',
    date: '26 Jul 2026',
    category: 'Eventos & Entretenimiento',
    creatorName: 'Ibai Llanos',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min lectura',
    source: 'Forbes',
    sourceLogo: '💼 Forbes',
    externalUrl: 'https://forbes.es',
  },
  {
    id: 'rss-7',
    title: 'El auge del UGC en Latinoamérica: Las marcas destinan el 35% de su presupuesto a microcreadores',
    summary: 'Estudio de mercado revela que las publicaciones auténticas de creadores de menos de 100K seguidores generan un ROI de inversión publicitaria de 4.8x.',
    fullContent: `El Contenido Generado por Usuarios (UGC por sus siglas en inglés) se ha consolidado como el pilar fundamental de las estrategias de marketing digital en América Latina. Un reciente estudio llevado a cabo por agencias de análisis de medios confirma que las marcas de consumo masivo han redistribuido más del 35% de sus presupuestos digitales hacia contrataciones directas con micro y nano creadores.

A diferencia de las campañas tradicionales de gran escala, los vídeos estilo "testimonio real" grabados con smartphones ofrecen mayores niveles de empatía y conversión en compras efectivas.

**Resultados clave del estudio:**
• Retorno promedio sobre la inversión publicitaria (ROAS) de 4.8 dólares generados por cada dólar invertido en UGC.
• Disminución del 40% en el coste por adquisición de clientes (CAC) en comparación con anuncios estáticos tradicionales.
• Mayor flexibilidad de las marcas para probar múltiples variaciones de creativos en campañas hipersegmentadas.`,
    author: 'Marketing Brew',
    date: '25 Jul 2026',
    category: 'Estrategia de Marcas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Marketing Brew',
    sourceLogo: '☕ Marketing Brew',
    externalUrl: 'https://www.marketingbrew.com',
  },
  {
    id: 'rss-8',
    title: 'Augusto Morales alcanza los 517K seguidores en TikTok con tendencias de moda masculina',
    summary: 'El creador guatemalteco consolida su posición como referente de moda y lifestyle con promedios de vista de hasta 100K por publicación auditada.',
    fullContent: `El creador de contenido guatemalteco Augusto Morales ha superado la marca de los 517,000 seguidores en TikTok, consolidándose como uno de los perfiles masculinos de moda y estilo de vida con mayor crecimiento orgánico en la región centroamericana.

Su propuesta de contenido abarca desde consejos de vestimenta accesible, combinaciones de colores según la temporada, hasta reseñas de fragancias y accesorios. Las analíticas verificadas muestran una tasa de retención superior al 68% en la audiencia joven de entre 18 y 32 años.

Marcas internacionales de vestuario y cuidado personal han formalizado alianzas de patrocinio a largo plazo, destacando la nitidez de su producción visual y el carisma genuino en la interacción con sus seguidores.`,
    author: 'Tendencias Digitales',
    date: '25 Jul 2026',
    category: 'Moda & Lifestyle',
    creatorName: 'Augusto Morales',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800',
    readTime: '2 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores',
  },
  {
    id: 'rss-9',
    title: 'Alejo Reviews supera los 4M de impresiones en Instagram Reels analizando tecnología de consumo',
    summary: 'Su formato transparente de análisis de smartphones y laptops se posiciona como el favorito de marcas globales como Samsung y Mercado Libre.',
    fullContent: `El influyente analista tecnológico Alejo Reviews ha cerrado el mes alcanzando más de 4 millones de impresiones acumuladas en Instagram Reels y TikTok. Su enfoque pedagógico y directo para evaluar dispositivos electrónicos —sin caer en tecnicismos excesivos— ha calado profundamente en el público latinoamericano.

En sus últimos vídeos ha puesto a prueba la durabilidad de baterías, rendimiento de cámaras en condiciones de poca luz y la relación calidad-precio de nuevos dispositivos móviles.

Marcas de e-commerce y fabricantes de tecnología continúan eligiendo sus canales para pruebas de producto previas a los lanzamientos oficiales en la región.`,
    author: 'Análisis de Mercado',
    date: '24 Jul 2026',
    category: 'Tech & Reviews',
    creatorName: 'Alejo Reviews',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores',
  },
  {
    id: 'rss-10',
    title: 'Kick lanza programa de retención de talentos ofreciendo contratos multianuales sin exclusividad',
    summary: 'La plataforma verde intensifica su competencia frente a Twitch firmando a creadores destacados de habla hispana con garantías de ingresos fijos.',
    fullContent: `La plataforma de streaming Kick ha presentado su nuevo programa global de adquisición y retención de creadores. La iniciativa destaca por ofrecer salarios base por hora transmitida y contratos multianuales que no exigen cláusulas de exclusividad absoluta, permitiendo a los streamers emitir también en YouTube y redes sociales secundarias.

Esta flexibilidad contractual ha atraído a destacados nombres de la escena hispanohablante, quienes buscan diversificar sus fuentes de ingresos y mitigar la dependencia de algoritmos de recomendación únicos.`,
    author: 'Dexerto Gaming',
    date: '24 Jul 2026',
    category: 'Gaming & Twitch',
    creatorName: 'AuronPlay',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com',
  },
  {
    id: 'rss-11',
    title: 'YouTube integra herramientas de Inteligencia Artificial para doblaje automático multilingüe',
    summary: 'La nueva función "Aloud" impulsada por Gemini permite a los creadores traducir y doblar sus vídeos a más de 20 idiomas manteniendo el timbre vocal original.',
    fullContent: `YouTube ha anunciado el despliegue generalizado de "Aloud", la suite de herramientas basadas en inteligencia artificial de Google diseñadas para traducir y doblar pistas de audio de vídeos a más de 20 idiomas de forma automática.

La tecnología sintetiza la voz del creador original, preservando su entonación y emoción, mientras ajusta la sincronización labial mediante modelos generativos avanzados. Esto abre las puertas para que creadores en español extiendan su alcance hacia audiencias angloparlantes, asiáticas y europeas sin incurrir en elevados costes de estudio de doblaje.`,
    author: 'YouTube Official Blog',
    date: '23 Jul 2026',
    category: 'YouTube Updates',
    creatorName: 'El Rubius',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min lectura',
    source: 'YouTube Blog',
    sourceLogo: '▶ YouTube Blog',
    externalUrl: 'https://blog.youtube',
  },
  {
    id: 'rss-12',
    title: 'SammyyArriaga combines música country e innovación Web3 con patrocinio de marcas automotrices',
    summary: 'El cantautor y creador miamense de origen cubano recauda más de $800K vendiendo pases VIP digitales para sus giras por Estados Unidos.',
    fullContent: `El artista y creador de contenido SammyyArriaga continúa marcando tendencia al fusionar la música country contemporánea con herramientas de fidelización digital y coleccionables para fanáticos. A través de membresías exclusivas emitidas directamente a su comunidad, el cantante ha asegurado más de $800,000 dólares en financiación independiente para sus próximos lanzamientos discográficos y giras.

Patrocinadores de la industria automotriz y de bebidas premium han respaldado sus presentaciones en vivo, destacando el elevado compromiso de su audiencia nativa digital.`,
    author: 'Rest of World Media',
    date: '23 Jul 2026',
    category: 'Global Digital',
    creatorName: 'SammyyArriaga',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Rest of World',
    sourceLogo: '🌐 Rest of World',
    externalUrl: 'https://restofworld.org',
  },
  {
    id: 'rss-13',
    title: 'Las agencias de Media Kits reportan un incremento del 42% en contrataciones directas sin intermediarios',
    summary: 'Los datos auditados de audiencia en tiempo real reemplazan a las presentaciones estáticas en PDF para agilizar negociaciones entre marcas y creadores.',
    fullContent: `Un informe de tendencias en marketing de influencers revela que el uso de Media Kits interactivos e integrados en plataformas en la nube ha aumentado un 42% en el último año. La posibilidad de consultar métricas auditadas en tiempo real —como impresiones, alcance por país y desglose demográfico— permite a los directores de marca tomar decisiones de contratación en cuestión de minutos, eliminando largas cadenas de correos e intermediarios tradicionales.`,
    author: 'Tubefilter Staff',
    date: '22 Jul 2026',
    category: 'Creator Economy',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'Tubefilter',
    sourceLogo: '🎬 Tubefilter',
    externalUrl: 'https://www.tubefilter.com',
  },
  {
    id: 'rss-14',
    title: 'The Grefg organiza los Premios ESLAND V en México con asistencia confirmada de más de 20,000 fans',
    summary: 'La gran gala de creadores de contenido de la comunidad hispanohablante tendrá lugar en la Ciudad de México con más de 15 marcas globales como patrocinadores oficiales.',
    fullContent: `El reconocido streamer español David Cánovas (TheGrefg) ha confirmado que la quinta edición de los Premios ESLAND se llevará a cabo en la Ciudad de México. El evento rendirá homenaje a la creatividad, innovación y talento de la comunidad de streaming en español en diversas categorías seleccionadas por votación popular y jurado técnico.

Marcas líderes en tecnología, moda urbana y plataformas de telecomunicación han firmado acuerdos de patrocinio principal para esta gala que prevé congregar a más de 20,000 asistentes presenciales y millones de espectadores en directo.`,
    author: 'Dexerto Gaming',
    date: '22 Jul 2026',
    category: 'Eventos & Entretenimiento',
    creatorName: 'TheGrefg',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min lectura',
    source: 'Dexerto',
    sourceLogo: '🎮 Dexerto',
    externalUrl: 'https://www.dexerto.com',
  },
  {
    id: 'rss-15',
    title: 'Meta presenta "Meta AI Studio for Creators": Clones digitales para responder comentarios y DMs',
    summary: 'Instagram permite a los creadores entrenar modelos de IA con su propio tono de voz y estilo para interactuar con su comunidad de forma automatizada.',
    fullContent: `Meta ha anunciado el lanzamiento oficial de "AI Studio for Creators", una herramienta dentro del ecosistema de Instagram y WhatsApp que permite a los creadores de contenido desarrollar asistentes virtuales personalizados basados en su propio contenido histórico y personalidad.

Estos avatares de texto y voz pueden atender preguntas frecuentes de seguidores, recomendar contenidos antiguos y gestionar consultas comerciales iniciales de marcas interesadas en colaboraciones.`,
    author: 'TechCrunch Media',
    date: '21 Jul 2026',
    category: 'Tech & Plataformas',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min lectura',
    source: 'TechCrunch',
    sourceLogo: '⚡ TechCrunch',
    externalUrl: 'https://techcrunch.com',
  },
  {
    id: 'rss-16',
    title: 'El Semáforo de Marcas en CC-Market certifica a más de 120 creadores con métricas de 100% cumplimiento',
    summary: 'Marcas como Pepsi, McDonald’s y Toyota consultan la plataforma diariamente para seleccionar perfiles verificados antes de lanzar sus campañas trimestrales.',
    fullContent: `El sistema de evaluación y auditoría "Semáforo de Marcas" de CC-Market ha alcanzado el hito de 120 creadores certificados en verde tras cumplir al 100% con los entregables, tiempos de publicación y calidad de contenidos acordados en sus contrataciones comerciales.

Representantes de agencias internacionales han manifestado que esta herramienta ha reducido a cero el margen de incumplimiento publicitario en la región, otorgando certeza tanto a anunciantes como a los propios creadores.`,
    author: 'Auditoría CC-Market',
    date: '21 Jul 2026',
    category: 'Casos de Éxito',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min lectura',
    source: 'CC-Market Editorial',
    sourceLogo: '🔵 CC-Market',
    externalUrl: 'https://ccmarket.creadores',
  },
];

export function interleaveAndSortByDate(items: CreatorNewsItem[]): CreatorNewsItem[] {
  if (!items || items.length === 0) return [];

  const copy = [...items];
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
        const homeUrl = index === 0 ? 'https://www.tubefilter.com' : 'https://techcrunch.com';

        res.value.items.slice(0, 10).forEach((item: any, i: number) => {
          const rawDesc = item.description || item.content || '';
          const cleanSummary = rawDesc.replace(/<[^>]+>/g, '').slice(0, 200) + '...';
          const fullText = rawDesc.replace(/<[^>]+>/g, '\n\n');
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
            fullContent: fullText || cleanSummary,
            author: item.author || sourceName,
            date: pubDate,
            category: index === 0 ? 'Creator Economy' : 'Tech & Plataformas',
            imageUrl: imgUrl,
            readTime: '3 min lectura',
            source: sourceName,
            sourceLogo: sourceLogo,
            externalUrl: homeUrl,
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
