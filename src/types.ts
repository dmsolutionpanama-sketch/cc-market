export type Platform = 'Twitch' | 'YouTube' | 'TikTok' | 'Instagram' | 'Kick' | 'Podcast' | 'Facebook';

export type Category = 
  | 'Gaming' 
  | 'Moda y Estilo' 
  | 'Tech & Gadgets' 
  | 'Lifestyle' 
  | 'Educación' 
  | 'Deportes' 
  | 'Podcast' 
  | 'Entretenimiento'
  | 'Finanzas'
  | 'Reviews & Humor';

export type LanguageCode = 'es' | 'en' | 'pt' | 'fr' | 'de';

export interface DemographicData {
  gender: { male: number; female: number; other: number };
  topAgeGroup: string; // e.g., '18-24'
  ageBreakdown: { range: string; percentage: number }[];
  topCountries: { country: string; code: string; percentage: number }[];
}

export interface ValuationHistory {
  year: string;
  valueInMillions: number;
}

export interface BrandPartner {
  name: string;
  logo: string;
  category: string;
  bgColor?: string;
  textColor?: string;
}

export interface BrandWorkHistoryItem {
  brandName: string;
  durationMonths: string; // e.g. "6 meses", "12 meses"
  campaignType: string;   // e.g. "Embajador de Marca", "Pack 3 Stories & Reel"
  year: string;           // e.g. "2025 - 2026"
  satisfaction: 'Excelente' | 'Muy Bueno' | 'Bueno';
}

export interface BrandReview {
  brandName: string;
  rating: 'green' | 'yellow' | 'red'; // Traffic light rating
  comment: string;
  date: string;
  verifiedBrand: boolean;
}

export interface BrandRatingData {
  trafficLight?: 'green' | 'yellow' | 'red';
  statusText: string;
  commitmentScore: number; // e.g. 98%
  starRating?: number; // e.g. 4.9 out of 5
  totalReviews?: number;
  totalCampaigns: number;
  reviews: BrandReview[];
}

export interface MediaKitPackage {
  title: string;
  priceUSD: number;
  description: string;
  deliverables: string[];
  popular?: boolean;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  ageRange?: string; // e.g. "21 - 25 años"
  primaryPlatform: Platform;
  platforms: {
    platform: Platform;
    followers: string;
    followersCount: number;
    url: string;
  }[];
  category: Category;
  tags: string[];
  
  // Key metrics
  marketValueEur: number; // e.g. 18500000 -> 18.5M
  marketValueChangePct: number; // e.g. +8.5%
  acv: number; // Average Concurrent Viewers
  totalFollowers: number; // Total combined followers
  engagementRate: number; // Percentage e.g. 5.8
  verified: boolean;
  auditedStatus: 'Verified Audit' | 'Rising Star' | 'Top Tier';
  
  // Trending info
  isTrending?: boolean;
  trendingReason?: string; // e.g. "Viral TikTok 86.4M vistas"

  // Rate Card estimates
  sponsorshipRates: {
    sponsoredPost: number;
    videoIntegration: number;
    monthlyAmbassador: number;
  };
  mediaKitPacks?: MediaKitPackage[];

  // Brand History & Rating (5 Estrellas 1 a 5)
  starRating?: number; // e.g. 4.9
  reviewCount?: number; // e.g. 48
  brandWorkHistory?: BrandWorkHistoryItem[];
  brandRating?: BrandRatingData;

  // Additional detail stats
  monthlyViews: number;
  avgLikesPerPost: number;
  demographics: DemographicData;
  valuationHistory: ValuationHistory[];
  recentBrands: string[];
  bio: string;
  joinedYear: number;
}

export type CreatorApprovalStatus = 'approved' | 'pending' | 'rejected';

export interface PaymentDetails {
  paymentType: 'bank_transfer' | 'paypal' | 'zelle_yappi';
  bankName?: string;
  accountNumber?: string;
  ibanSwift?: string;
  accountHolderName: string;
  taxIdOrRuc: string; // Cédula, RUC, DNI o Tax ID
  paypalEmail?: string;
  phoneZelleYappi?: string;
  country: string;
}

export interface CreatorUserAccount {
  id: string;
  email: string;
  password?: string;
  creatorId: string;
  status: CreatorApprovalStatus;
  disclaimerAccepted: boolean;
  disclaimerAcceptedAt?: string;
  paymentDetails: PaymentDetails;
  registeredAt: string;
  updatedAt: string;
}

export interface AuthUserSession {
  isLoggedIn: boolean;
  role: 'creator' | 'admin' | 'brand';
  isBrandValidated?: boolean;
  brandName?: string;
  userAccount?: CreatorUserAccount;
  creatorProfile?: Creator;
}

export interface CreatorNewsItem {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  creatorId?: string;
  creatorName?: string;
  imageUrl: string;
  readTime: string;
  source?: string;
  sourceLogo?: string;
  externalUrl?: string;
  isRssLive?: boolean;
  fullContent?: string;
}

export interface FilterState {
  searchQuery: string;
  platform: Platform | 'All';
  category: Category | 'All';
  acvRange: 'All' | '0-1k' | '1k-5k' | '5k-20k' | '20k-50k' | '50k+';
  followersRange: 'All' | '<100k' | '100k-500k' | '500k-2M' | '2M-10M' | '10M+';
  marketValueRange: 'All' | '<100k' | '100k-1M' | '1M-5M' | '5M+';
  country: string | 'All';
  ageRange: string | 'All';
  verifiedOnly: boolean;
  sortBy: 'marketValue' | 'acv' | 'followers' | 'engagement' | 'name';
  sortOrder: 'asc' | 'desc';
}

