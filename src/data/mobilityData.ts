import { RideOption, NewsArticle, TouristRoute, EsimPlan, CorporateProfile } from '../types';

export interface LocationPoint {
  id: string;
  name: string;
  category: 'cbd' | 'airport' | 'shopping' | 'tourist' | 'tech' | 'residential';
  address: string;
  popular?: boolean;
}

export const SG_LOCATIONS: LocationPoint[] = [
  { id: 'loc-1', name: 'Raffles Place (CBD)', category: 'cbd', address: '1 Raffles Place, Singapore 048616', popular: true },
  { id: 'loc-2', name: 'Changi Airport Terminal 3', category: 'airport', address: '65 Airport Boulevard, Singapore 819663', popular: true },
  { id: 'loc-3', name: 'Marina Bay Sands', category: 'tourist', address: '10 Bayfront Avenue, Singapore 018956', popular: true },
  { id: 'loc-4', name: 'ION Orchard', category: 'shopping', address: '2 Orchard Turn, Singapore 238801', popular: true },
  { id: 'loc-5', name: 'Sentosa Beach Station', category: 'tourist', address: '50 Beach View, Sentosa, Singapore 098604', popular: true },
  { id: 'loc-6', name: 'One-North Fusionopolis', category: 'tech', address: '1 Fusionopolis Way, Singapore 138632', popular: false },
  { id: 'loc-7', name: 'Jurong East Bus & MRT', category: 'residential', address: 'Jurong Gateway Road, Singapore 608531', popular: false },
  { id: 'loc-8', name: 'Bugis Junction', category: 'shopping', address: '200 Victoria Street, Singapore 188021', popular: true },
  { id: 'loc-9', name: 'VivoCity Harbourfront', category: 'shopping', address: '1 HarbourFront Walk, Singapore 098585', popular: false },
  { id: 'loc-10', name: 'Gardens by the Bay', category: 'tourist', address: '18 Marina Gardens Dr, Singapore 018953', popular: true },
];

export const OPERATOR_METADATA = {
  Grab: {
    color: '#00B14F',
    textColor: '#ffffff',
    tagline: 'JustGrab / GrabCar Premium',
    logoLetter: 'G',
    bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  Gojek: {
    color: '#00AA13',
    textColor: '#ffffff',
    tagline: 'GoCar / GoCar XL',
    logoLetter: 'Gj',
    bgBadge: 'bg-green-50 text-green-800 border-green-200',
  },
  Zig: {
    color: '#002F6C',
    textColor: '#ffffff',
    tagline: 'ComfortDelGro Yellow/Blue Cab',
    logoLetter: 'Z',
    bgBadge: 'bg-blue-50 text-blue-900 border-blue-200',
  },
  Tada: {
    color: '#FF6000',
    textColor: '#ffffff',
    tagline: 'Zero-Commission Driver Network',
    logoLetter: 'T',
    bgBadge: 'bg-amber-50 text-amber-900 border-amber-200',
  },
  Ryde: {
    color: '#E01A4F',
    textColor: '#ffffff',
    tagline: 'RydeX / Carpool & Private',
    logoLetter: 'R',
    bgBadge: 'bg-rose-50 text-rose-900 border-rose-200',
  },
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Singapore Q4 GDP Accelerates on Manufacturing and High-Tech Exports',
    summary: 'Strong expansion in biomedical and electronics sectors boosts economic outlook heading into the new fiscal year.',
    category: 'economy',
    source: 'The Business Times',
    readTimeMinutes: 3,
    publishTime: '22 mins ago',
    audioDurationSec: 180,
    keyTakeaway: 'Economic momentum remains resilient with financial services outpacing regional averages.',
    isDailyCommutePick: true,
  },
  {
    id: 'news-2',
    title: 'LTA Rolls Out Smart Traffic Flow Optimisation on CTE and AYE Corridors',
    summary: 'New dynamic lane-use algorithm aims to trim average peak-hour travel times by up to 14% across central arteries.',
    category: 'local_news',
    source: 'CNA Singapore',
    readTimeMinutes: 2,
    publishTime: '45 mins ago',
    audioDurationSec: 120,
    keyTakeaway: 'Expect smoother merging near Braddell and Moulmein flyovers this morning.',
    isDailyCommutePick: true,
  },
  {
    id: 'news-3',
    title: 'Southeast Asia Tech Hubs See Influx of Deep-Tech and AI Venture Funds',
    summary: 'Over US$1.8B committed to local tech accelerators in clean mobility, logistics automation, and cloud intelligence.',
    category: 'tech',
    source: 'Tech in Asia',
    readTimeMinutes: 4,
    publishTime: '1 hour ago',
    audioDurationSec: 240,
    keyTakeaway: 'Mobility aggregators and autonomous dispatch are key areas of investor interest.',
  },
  {
    id: 'news-4',
    title: 'Best Hidden Coffee Roasters and Weekend Running Trails in Tiong Bahru',
    summary: 'From heritage art-deco architecture to single-origin cold brews: our curated guide to refreshing urban walks.',
    category: 'hobbies',
    source: 'SG Magazine',
    readTimeMinutes: 3,
    publishTime: '2 hours ago',
    audioDurationSec: 160,
    keyTakeaway: 'Great spots for casual catch-ups within 10 minutes of Outram Park.',
  },
  {
    id: 'news-5',
    title: 'Insider Tips: Navigating Marina Bay and Sentosa Like a Local',
    summary: 'Avoid peak taxi surcharges by booking multi-operator comparisons during shift handover windows between 4:30 PM and 5:30 PM.',
    category: 'travel',
    source: 'Road Runner Travel Desk',
    readTimeMinutes: 2,
    publishTime: '3 hours ago',
    audioDurationSec: 110,
    keyTakeaway: 'ComfortDelGro Zig flat fares often beat surge pricing at Sentosa Gateway during weekends.',
    isDailyCommutePick: true,
  },
];

export const TOURIST_ROUTES: TouristRoute[] = [
  {
    id: 'tr-1',
    name: 'Singapore Modern Icons & Skyway',
    area: 'Marina Bay & Civic District',
    durationHours: 4,
    bestTravelTime: '9:30 AM or 5:30 PM (Avoid 8-9 AM CTE rush)',
    trafficInsiderTip: 'Bayfront Avenue experiences minor slowdowns after 6:00 PM for the Spectra light show. Drop off at MBS Tower 3 for instant curb access.',
    stops: ['Merlion Park', 'National Gallery Singapore', 'Marina Bay Sands SkyPark', 'Gardens by the Bay Flower Dome'],
    estimatedTotalTaxiSgd: 24.50,
    recommendedOperator: 'Zig',
    photoKeyword: 'skyline',
  },
  {
    id: 'tr-2',
    name: 'Multicultural Heritage & Hawker Trail',
    area: 'Chinatown, Kampong Glam & Little India',
    durationHours: 5,
    bestTravelTime: '11:00 AM (Ideal for lunch hawker crawl)',
    trafficInsiderTip: 'South Bridge Road and Haji Lane are strictly pedestrian-friendly; set drop-off at Maxwell Food Centre or Sultan Mosque taxi stand.',
    stops: ['Buddha Tooth Relic Temple', 'Maxwell Hawker Centre', 'Arab Street & Sultan Mosque', 'Tekka Centre Little India'],
    estimatedTotalTaxiSgd: 28.00,
    recommendedOperator: 'Grab',
    photoKeyword: 'heritage',
  },
  {
    id: 'tr-3',
    name: 'Island Escapade & Beachfront Sunset',
    area: 'HarbourFront & Sentosa Island',
    durationHours: 6,
    bestTravelTime: '2:30 PM (Beat Sentosa Gateway surcharge rush)',
    trafficInsiderTip: 'Sentosa gantry entry fee is waived for registered hotel guests or booking via official ride apps.',
    stops: ['VivoCity Boardwalk', 'Resorts World Sentosa', 'Palawan Beach Hanging Bridge', 'Tanjong Beach Club'],
    estimatedTotalTaxiSgd: 32.50,
    recommendedOperator: 'Tada',
    photoKeyword: 'island',
  },
];

export const ESIM_PLANS: EsimPlan[] = [
  {
    id: 'esim-3d',
    name: 'Singapore Explorer 3-Day',
    dataAllowance: '5 GB High-Speed 5G',
    validityDays: 3,
    priceSgd: 8.50,
    speed: '5G Ultra (Singtel Network)',
    provider: 'Singtel Global Connect',
    affiliateCommissionSgd: 1.70,
  },
  {
    id: 'esim-7d',
    name: 'Singapore Unlimited 7-Day',
    dataAllowance: 'Unlimited Data (15GB 5G High Speed)',
    validityDays: 7,
    priceSgd: 16.00,
    speed: '5G Ultra Low-Latency',
    provider: 'Airalo SG Partner',
    affiliateCommissionSgd: 3.20,
    popular: true,
  },
  {
    id: 'esim-15d',
    name: 'Regional SE Asia 15-Day',
    dataAllowance: '20 GB (SG + MY + TH)',
    validityDays: 15,
    priceSgd: 29.00,
    speed: 'Multi-Telco 5G Roaming',
    provider: 'Nomad Global Pass',
    affiliateCommissionSgd: 5.80,
  },
];

export const DEFAULT_CORPORATE_PROFILE: CorporateProfile = {
  companyName: 'Vertex Capital Partners SG',
  employeeName: 'Milton Chiam',
  department: 'Product & Strategy',
  monthlyAllowanceSgd: 400.00,
  usedThisMonthSgd: 142.50,
  eligibleForOtCommute: true,
};
