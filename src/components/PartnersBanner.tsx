import React, { useState } from 'react';
import { industryPartners, creatorsMockData } from '../data/creators';
import { ShieldCheck, Award, Building2, Search, Star, Users, ArrowRight, Eye, Check, Sparkles } from 'lucide-react';
import { Creator, LanguageCode, BrandPartner } from '../types';
import { translations } from '../data/translations';

interface PartnersBannerProps {
  creators?: Creator[];
  onSelectCreator?: (creator: Creator) => void;
  lang?: LanguageCode;
}

export const PartnersBanner: React.FC<PartnersBannerProps> = ({
  creators = creatorsMockData,
  onSelectCreator,
  lang = 'es',
}) => {
  const t = translations[lang] || translations.es;

  // Selected Brand State (Defaults to 'Samsung' or first brand)
  const [selectedBrand, setSelectedBrand] = useState<BrandPartner>(industryPartners[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Extract all categories
  const categories = ['Todas', ...Array.from(new Set(industryPartners.map((p) => p.category)))];

  // Filter partners by search and category
  const filteredPartners = industryPartners.filter((partner) => {
    const matchesCategory = selectedCategory === 'Todas' || partner.category === selectedCategory;
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Find creators associated with selected brand
  const getCreatorsForBrand = (brandName: string): { creator: Creator; campaignInfo?: string }[] => {
    const term = brandName.toLowerCase();

    // 1. Direct matches in brandWorkHistory, recentBrands, or brandRating
    const matched: { creator: Creator; campaignInfo?: string }[] = [];

    creators.forEach((c) => {
      let foundInfo = '';

      // Check brandWorkHistory
      if (c.brandWorkHistory) {
        const historyMatch = c.brandWorkHistory.find(
          (b) => b.brandName.toLowerCase().includes(term) || term.includes(b.brandName.toLowerCase())
        );
        if (historyMatch) {
          foundInfo = `${historyMatch.campaignType} (${historyMatch.year})`;
        }
      }

      // Check recentBrands
      if (!foundInfo && c.recentBrands) {
        const recentMatch = c.recentBrands.find(
          (b) => b.toLowerCase().includes(term) || term.includes(b.toLowerCase())
        );
        if (recentMatch) {
          foundInfo = `Campaña comercial verificada`;
        }
      }

      // Check reviews
      if (!foundInfo && c.brandRating?.reviews) {
        const reviewMatch = c.brandRating.reviews.find(
          (r) => r.brandName.toLowerCase().includes(term) || term.includes(r.brandName.toLowerCase())
        );
        if (reviewMatch) {
          foundInfo = `Campaña auditada - "100% Satisfacción"`;
        }
      }

      if (foundInfo) {
        matched.push({ creator: c, campaignInfo: foundInfo });
      }
    });

    // 2. If fewer than 2 matched creators, complement with top creators matching category or general portfolio
    if (matched.length < 3) {
      const existingIds = new Set(matched.map((m) => m.creator.id));
      const categoryTerm = selectedBrand.category.toLowerCase();

      creators.forEach((c) => {
        if (!existingIds.has(c.id)) {
          const isCategoryMatch =
            c.category.toLowerCase().includes(categoryTerm) ||
            categoryTerm.includes(c.category.toLowerCase());
          
          if (isCategoryMatch) {
            matched.push({
              creator: c,
              campaignInfo: `Campaña en categoría ${selectedBrand.category}`,
            });
            existingIds.add(c.id);
          }
        }
      });

      // Fill up to at least 3 with top creators if still needed
      if (matched.length < 3) {
        creators.forEach((c) => {
          if (!existingIds.has(c.id) && matched.length < 4) {
            matched.push({
              creator: c,
              campaignInfo: `Creador recomendado para ${selectedBrand.name}`,
            });
            existingIds.add(c.id);
          }
        });
      }
    }

    return matched;
  };

  const brandCreators = getCreatorsForBrand(selectedBrand.name);

  return (
    <section id="partners" className="py-10 bg-slate-50 text-slate-900 min-h-[600px]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-black mb-3">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>DIRECTORIO DE PATROCINADORES & MARCAS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Marcas Aliadas y Creadores Vinculados
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-normal">
            Haz clic en cualquier marca patrocinadora para explorar los creadores que han ejecutado campañas auditadas y con resultados verificados.
          </p>
        </div>

        {/* Category Filters & Search */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-300 shadow-xs">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 whitespace-nowrap scrollbar-none">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Categoría:
            </span>
            {categories.slice(0, 7).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar marca o industria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Brands Grid (Logos) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Logos de Marcas Patrocinadoras ({filteredPartners.length})
            </span>
            <span className="text-xs text-slate-500">
              Selecciona una marca para ver sus creadores
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredPartners.map((partner) => {
              const isSelected = selectedBrand.name === partner.name;
              return (
                <button
                  key={partner.name}
                  onClick={() => setSelectedBrand(partner)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[100px] relative group ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105 z-10 ring-4 ring-blue-500/20'
                      : 'bg-white hover:bg-blue-50/50 text-slate-900 border-slate-300 hover:border-blue-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between w-full mb-2">
                    <span
                      className={`text-xs sm:text-sm font-black tracking-tight font-mono block leading-tight ${
                        isSelected ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'
                      }`}
                    >
                      {partner.logo}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div>
                    <span
                      className={`text-[10px] font-bold block truncate ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {partner.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Creator List Section for Selected Brand */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 shadow-xl">
          
          {/* Active Brand Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm tracking-tight font-mono shadow-md border border-slate-700 shrink-0">
                {selectedBrand.logo.substring(0, 6)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Creadores de {selectedBrand.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-black border border-blue-300">
                    {selectedBrand.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  {brandCreators.length} creadores destacados vinculados a campañas y activaciones de {selectedBrand.name}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Campañas Auditadas & Verificadas</span>
            </div>
          </div>

          {/* Creators Grid with "Ver profile" Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCreators.map(({ creator, campaignInfo }) => {
              const stars = creator.brandRating?.starRating || creator.starRating || 4.9;
              const followersFormatted =
                creator.totalFollowers >= 1000000
                  ? `${(creator.totalFollowers / 1000000).toFixed(1)}M`
                  : `${(creator.totalFollowers / 1000).toFixed(0)}K`;

              return (
                <div
                  key={creator.id}
                  className="bg-slate-50 rounded-2xl border-2 border-slate-300 hover:border-blue-500 p-5 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    {/* Creator Header */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-300 group-hover:scale-105 transition-transform shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-slate-900 text-base truncate">
                            {creator.name}
                          </h4>
                          <span title={creator.country}>{creator.flagEmoji}</span>
                        </div>

                        <p className="text-xs text-slate-500 font-bold truncate">
                          {creator.handle} • <span className="text-blue-600">{creator.primaryPlatform}</span>
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {stars.toFixed(1)} / 5.0
                          </span>
                          <span className="text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                            {creator.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Context Badge */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs mb-4">
                      <span className="font-extrabold text-slate-800 block mb-0.5">
                        Histórico con {selectedBrand.name}:
                      </span>
                      <p className="text-slate-600 font-medium italic text-[11px]">
                        "{campaignInfo || 'Colaboraciones comerciales de alto impacto'}"
                      </p>
                    </div>

                    {/* Followers & Value Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Seguidores</span>
                        <span className="text-xs font-black text-slate-900 font-mono">{followersFormatted}</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Engagement</span>
                        <span className="text-xs font-black text-emerald-600 font-mono">{creator.engagementRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* "Ver profile" Button */}
                  <button
                    onClick={() => onSelectCreator && onSelectCreator(creator)}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-blue-700 group-hover:scale-[1.02]"
                  >
                    <Eye className="w-4 h-4 text-white" />
                    <span>Ver profile</span>
                  </button>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
