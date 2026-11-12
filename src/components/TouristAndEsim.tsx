import React, { useState } from 'react';
import { 
  Compass, 
  Wifi, 
  MapPin, 
  Clock, 
  QrCode, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { TOURIST_ROUTES, ESIM_PLANS, OPERATOR_METADATA } from '../data/mobilityData';
import { TouristRoute, EsimPlan } from '../types';

interface TouristAndEsimProps {
  onBookRideToStop: (stopName: string) => void;
  onOpenCanvas: () => void;
}

export const TouristAndEsim: React.FC<TouristAndEsimProps> = ({
  onBookRideToStop,
  onOpenCanvas,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<EsimPlan | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handleBuyEsim = (plan: EsimPlan) => {
    setSelectedPlan(plan);
    setIsPurchasing(true);
    setPurchaseComplete(false);
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseComplete(true);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner: Singapore Tourist Concierge */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 mb-1">
              <Compass className="w-4 h-4 text-pink-400" />
              <span>Singapore Tourist & Expat Guide</span>
              <span className="text-slate-500">·</span>
              <span>Fair Ride Rates & High-Speed eSIM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Explore Singapore Without Surge Surprises
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Curated itineraries, expressway congestion advisories, and instant partner 5G data eSIM passes so you never lose connection.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-3 border border-slate-700 text-xs">
            <div>
              <div className="text-slate-400 text-[10px]">Airport & CBD Channel</div>
              <div className="font-semibold text-white">Changi T1-T4 Arrival Kiosks</div>
            </div>
            <button
              onClick={onOpenCanvas}
              className="px-2.5 py-1 bg-pink-600 hover:bg-pink-500 text-white font-medium rounded-lg text-xs cursor-pointer transition-colors"
            >
              BMC Segment
            </button>
          </div>
        </div>
      </div>

      {/* Part 1: Curated Singapore Tourist Routes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Personalised Singapore Tourist Routes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hand-picked landmarks with optimal departure windows to beat rush-hour expressway traffic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {TOURIST_ROUTES.map((route) => {
            const operatorMeta = OPERATOR_METADATA[route.recommendedOperator];
            return (
              <div
                key={route.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-500">{route.area}</span>
                    <span className="flex items-center gap-1 font-mono text-slate-600 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5" />
                      {route.durationHours} hrs
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    {route.name}
                  </h4>

                  {/* Best time tag */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-2.5 text-xs mb-3">
                    <span className="font-bold">Recommended Departure: </span>
                    {route.bestTravelTime}
                  </div>

                  {/* Insider traffic advice */}
                  <div className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 rounded-xl p-2.5 text-xs mb-3.5">
                    <div className="font-bold flex items-center gap-1 mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Local Traffic Tip:</span>
                    </div>
                    {route.trafficInsiderTip}
                  </div>

                  {/* Stops list */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Itinerary Stops
                    </div>
                    {route.stops.map((stop, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">{stop}</span>
                        </div>
                        <button
                          onClick={() => onBookRideToStop(stop)}
                          className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          Book Ride
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer price & recommendation */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400">Est. Total Ride Fares</div>
                    <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                      ~S${route.estimatedTotalTaxiSgd.toFixed(2)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Best Operator</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: operatorMeta.color }} />
                      {route.recommendedOperator}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Part 2: Travel eSIM Marketplace (BMC Revenue Stream!) */}
      <section className="bg-gradient-to-br from-teal-500/5 via-slate-50 to-blue-500/5 dark:from-teal-950/20 dark:via-slate-900 dark:to-blue-950/20 border border-teal-200/60 dark:border-teal-900/40 rounded-3xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">
              <Wifi className="w-4 h-4 text-teal-600" />
              <span>Third-Party Partner Revenue Stream</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Instant Singapore 5G Travel eSIM
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              From our digital anchor platform. Instant QR activation, zero physical SIM swapping, pre-configured for seamless ride booking upon landing at Changi Airport.
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 rounded-xl text-xs text-teal-900 dark:text-teal-300 shrink-0">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">BMC Monetization</div>
            <div className="font-bold text-teal-700 dark:text-teal-400">20% Affiliate RevShare per Sign-Up</div>
          </div>
        </div>

        {/* eSIM Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ESIM_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                plan.popular
                  ? 'border-teal-500 shadow-md ring-1 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 right-4 bg-teal-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {plan.provider}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {plan.name}
                </h4>

                <div className="my-3">
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                    S${plan.priceSgd.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-500">Valid for {plan.validityDays} days</div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pb-4">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span className="font-medium">{plan.dataAllowance}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>{plan.speed}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Instant QR code email & push</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-teal-700 dark:text-teal-400 font-medium mb-2">
                  Road Runner earns S${plan.affiliateCommissionSgd.toFixed(2)} on activation
                </div>

                <button
                  onClick={() => handleBuyEsim(plan)}
                  className="w-full min-h-[44px] py-2 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-xs rounded-xl transition-transform active:scale-95 shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Activate eSIM Pass</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* eSIM Activation Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="text-center">
              {isPurchasing ? (
                <div className="py-8 space-y-3">
                  <div className="w-12 h-12 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Generating Instant eSIM Profile...
                  </h4>
                  <p className="text-xs text-slate-500">
                    Registering with Singapore telco roaming gateway
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                      {selectedPlan.name} Ready!
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Scan the QR code below on your iPhone / Android device to install the profile in 10 seconds.
                    </p>
                  </div>

                  {/* QR Box mockup */}
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-44 h-44 mx-auto flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-slate-900 dark:bg-white p-2 rounded-lg flex items-center justify-center">
                      <div className="w-full h-full bg-slate-100 dark:bg-slate-900 grid grid-cols-4 gap-1 p-1">
                        <div className="bg-slate-900 dark:bg-white" />
                        <div className="bg-slate-900 dark:bg-white" />
                        <div className="bg-slate-200 dark:bg-slate-800" />
                        <div className="bg-slate-900 dark:bg-white" />
                        <div className="bg-slate-900 dark:bg-white" />
                        <div className="bg-slate-200 dark:bg-slate-800" />
                        <div className="bg-slate-900 dark:bg-white" />
                        <div className="bg-slate-900 dark:bg-white" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-2">SM-DP+ SG-GATEWAY</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-left text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Plan:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Data Allowance:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedPlan.dataAllowance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Charged:</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">S${selectedPlan.priceSgd.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="w-full min-h-[44px] py-2.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs rounded-xl cursor-pointer hover:bg-slate-800 transition-colors"
                  >
                    Done & Return to Routes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
