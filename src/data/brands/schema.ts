export type DataVerificationStatus = 'verified' | 'vendor' | 'historical' | 'unverified';

export type UnlockStatus = 'supported' | 'partial' | 'unsupported' | 'vendor_claimed' | 'untested';

export type ClientSupportMode = 'proprietary_and_third_party' | 'proprietary_only' | 'third_party' | 'unverified';

export interface BrandPlan {
  name: string;
  billingCycle: '月付' | '季付' | '半年付' | '年付' | '两年付' | '三年付' | '一次性付费';
  priceCny: number;
  monthlyEquivalentCny?: number;
  trafficGb: number | null;
  trafficDisplay: string;
  trafficReset: '每月重置' | '一次性总额' | '待核实';
  validity?: string;
  discountNote?: string;
  dataStatus: DataVerificationStatus;
  sourceNote?: string;
}

export interface SpeedTestNode {
  region: string;
  nodeName?: string;
  latencyMs: number | null;
  downloadMbps: number | null;
  uploadMbps?: number | null;
  packetLoss?: string;
  note?: string;
}

export interface BrandSpeedReport {
  hasData: boolean;
  testDate: string;
  testLocation: string;
  testEnvironment: string;
  isPeakHour: boolean;
  dataStatus: DataVerificationStatus;
  sourceLabel: string;
  summary: string;
  nodes: SpeedTestNode[];
  screenshots?: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export interface ServiceUnlockItem {
  service: 'ChatGPT' | 'Claude' | 'Gemini' | 'Netflix' | 'Disney+' | 'YouTube' | 'HBO Max' | 'TikTok' | 'Spotify';
  category: 'ai' | 'streaming';
  status: UnlockStatus;
  detail: string;
}

export interface BrandFAQ {
  question: string;
  answer: string;
}

export interface BrandProfile {
  slug: string;
  name: string;
  englishName?: string;
  aliases: string[];
  logo: string;
  cover?: string;
  accentColor: string;
  foundedYear: string;
  isPromotedPartner: boolean;
  independentRankNote: string;
  positioning: string;
  summary: string;
  lineType: 'IEPL' | 'IPLC' | 'IEPL/IPLC' | 'BGP专线' | '中转优化' | '待核实';
  lineDescription: string;
  protocols: string[];
  clientMode: ClientSupportMode;
  clientModeLabel: string;
  supportedClients: string[];
  deviceLimit: string;
  nodeCoverage: string[];
  startingMonthlyPriceCny: number | null;
  startingPriceLabel: string;
  startingPriceType: '月付' | '年付折算月均价' | '待核实';
  paymentMethods: string[];
  plans: BrandPlan[];
  speedReport: BrandSpeedReport;
  unlockMatrix: ServiceUnlockItem[];
  unlockSummaryNote: string;
  highlights: string[];
  limitations: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  riskNotes: string[];
  discrepancyNotes: string[];
  similarBrands: string[];
  relatedArticleSlugs: string[];
  faq: BrandFAQ[];
  dataStatus: DataVerificationStatus;
  sources: string[];
  verifiedDate: string;
  updatedDate: string;
  aiFocus: boolean;
  streamingFocus: boolean;
  unexpiringPlanAvailable: boolean;
}
