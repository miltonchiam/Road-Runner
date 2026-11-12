export type SegmentFilter = 'all' | 'working_adults' | 'tourists' | 'corporates';

export type CanvasBlockId = 
  | 'key_partners'
  | 'key_activities'
  | 'key_resources'
  | 'value_propositions'
  | 'customer_relationships'
  | 'channels'
  | 'customer_segments'
  | 'cost_structure'
  | 'revenue_streams';

export interface StickyNote {
  id: string;
  blockId: CanvasBlockId;
  content: string;
  color: 'blue' | 'yellow' | 'peach' | 'pink' | 'green' | 'teal';
  segmentTag?: 'working_adults' | 'tourists' | 'corporates' | 'all';
  author?: string;
  dateAdded?: string;
}

export type OperatorName = 'Grab' | 'Gojek' | 'Zig' | 'Tada' | 'Ryde';

export interface RideOption {
  id: string;
  operator: OperatorName;
  serviceName: string;
  vehicleType: string;
  basePrice: number;
  surgeMultiplier: number;
  finalPrice: number;
  etaMinutes: number;
  driverRating: number;
  driverName: string;
  licensePlate: string;
  distanceKm: number;
  tags: {
    isCheapest?: boolean;
    isFastest?: boolean;
    petFriendly?: boolean;
    wheelchairFriendly?: boolean;
    highRated?: boolean;
    silentRide?: boolean;
  };
  commissionRate: number; // e.g. 0.05 (5% commission for Road Runner)
  operatorColor: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: 'economy' | 'local_news' | 'tech' | 'hobbies' | 'travel';
  source: string;
  readTimeMinutes: number;
  publishTime: string;
  audioDurationSec?: number;
  keyTakeaway: string;
  isDailyCommutePick?: boolean;
}

export interface TouristRoute {
  id: string;
  name: string;
  area: string;
  durationHours: number;
  bestTravelTime: string;
  trafficInsiderTip: string;
  stops: string[];
  estimatedTotalTaxiSgd: number;
  recommendedOperator: OperatorName;
  photoKeyword: string;
}

export interface EsimPlan {
  id: string;
  name: string;
  dataAllowance: string;
  validityDays: number;
  priceSgd: number;
  speed: string;
  provider: string;
  affiliateCommissionSgd: number;
  popular?: boolean;
}

export interface CorporateProfile {
  companyName: string;
  employeeName: string;
  department: string;
  monthlyAllowanceSgd: number;
  usedThisMonthSgd: number;
  eligibleForOtCommute: boolean;
}
