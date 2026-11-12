import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Dog, 
  Accessibility, 
  VolumeX, 
  Sparkles, 
  AlertCircle, 
  Check, 
  ChevronRight,
  ShieldCheck,
  TrendingDown,
  Info
} from 'lucide-react';
import { SG_LOCATIONS, OPERATOR_METADATA } from '../data/mobilityData';
import { OperatorName, RideOption } from '../types';

interface RideComparatorProps {
  isPeakHour: boolean;
  onOpenNews: () => void;
  onOpenCanvas: () => void;
}

export const RideComparator: React.FC<RideComparatorProps> = ({
  isPeakHour,
  onOpenNews,
  onOpenCanvas,
}) => {
  const [pickupId, setPickupId] = useState<string>('loc-1'); // Raffles Place
  const [dropoffId, setDropoffId] = useState<string>('loc-2'); // Changi Airport T3
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest'>('cheapest');
  
  // Personalization filters from BMC
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);
  const [filterWheelchair, setFilterWheelchair] = useState(false);
  const [filterQuietRide, setFilterQuietRide] = useState(false);

  // Booking modal state
  const [selectedRide, setSelectedRide] = useState<RideOption | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'matching' | 'confirmed'>('idle');

  const pickup = useMemo(() => SG_LOCATIONS.find(l => l.id === pickupId) || SG_LOCATIONS[0], [pickupId]);
  const dropoff = useMemo(() => SG_LOCATIONS.find(l => l.id === dropoffId) || SG_LOCATIONS[1], [dropoffId]);

  const handleSwapLocations = () => {
    setPickupId(dropoffId);
    setDropoffId(pickupId);
  };

  // Base distance calculation heuristic
  const estimatedDistanceKm = useMemo(() => {
    if (pickupId === dropoffId) return 2.0;
    // Changi airport trips are longer
    if (pickupId === 'loc-2' || dropoffId === 'loc-2') return 19.8;
    if (pickupId === 'loc-5' || dropoffId === 'loc-5') return 14.5;
    if (pickupId === 'loc-7' || dropoffId === 'loc-7') return 16.2;
    return 7.5;
  }, [pickupId, dropoffId]);

  // Generate real-time ride options from all 5 operators
  const rideOptions: RideOption[] = useMemo(() => {
    const surge = isPeakHour ? 1.45 : 1.0;
    const baseDistRate = estimatedDistanceKm * 1.35;

    const rawRides: RideOption[] = [
      {
        id: 'grab-justgrab',
        operator: 'Grab',
        serviceName: 'JustGrab (Nearest Car/Taxi)',
        vehicleType: 'Sedan / Hatchback (4 Seater)',
        basePrice: Math.round((14 + baseDistRate) * 10) / 10,
        surgeMultiplier: surge,
        finalPrice: Math.round((14 + baseDistRate) * surge * 10) / 10,
        etaMinutes: isPeakHour ? 6 : 3,
        driverRating: 4.88,
        driverName: 'Wei Kang Tan',
        licensePlate: 'SLA 4821 K',
        distanceKm: estimatedDistanceKm,
        tags: {
          petFriendly: false,
          wheelchairFriendly: false,
          highRated: false,
          silentRide: true,
        },
        commissionRate: 0.04,
        operatorColor: OPERATOR_METADATA.Grab.color,
      },
      {
        id: 'zig-flat',
        operator: 'Zig',
        serviceName: 'ComfortDelGro Flat Fare Taxi',
        vehicleType: 'Hyundai Ioniq / Toyota Prius',
        basePrice: Math.round((13.5 + baseDistRate * 0.95) * 10) / 10,
        // Zig has regulated flat meter, much lower surge during peak hours!
        surgeMultiplier: isPeakHour ? 1.15 : 1.0,
        finalPrice: Math.round((13.5 + baseDistRate * 0.95) * (isPeakHour ? 1.15 : 1.0) * 10) / 10,
        etaMinutes: isPeakHour ? 4 : 4,
        driverRating: 4.92,
        driverName: 'Uncle Raymond Lee',
        licensePlate: 'SHA 9932 P',
        distanceKm: estimatedDistanceKm,
        tags: {
          petFriendly: true,
          wheelchairFriendly: true,
          highRated: true,
          silentRide: true,
        },
        commissionRate: 0.045,
        operatorColor: OPERATOR_METADATA.Zig.color,
      },
      {
        id: 'gojek-gocar',
        operator: 'Gojek',
        serviceName: 'GoCar Standard',
        vehicleType: 'Toyota Corolla / Honda Shuttle',
        basePrice: Math.round((13.2 + baseDistRate) * 10) / 10,
        surgeMultiplier: surge,
        finalPrice: Math.round((13.2 + baseDistRate) * surge * 10) / 10,
        etaMinutes: isPeakHour ? 7 : 5,
        driverRating: 4.85,
        driverName: 'Ahmad Faiz',
        licensePlate: 'SMF 1120 D',
        distanceKm: estimatedDistanceKm,
        tags: {
          petFriendly: false,
          wheelchairFriendly: false,
          highRated: false,
          silentRide: true,
        },
        commissionRate: 0.04,
        operatorColor: OPERATOR_METADATA.Gojek.color,
      },
      {
        id: 'tada-eco',
        operator: 'Tada',
        serviceName: 'Tada Standard (Zero-Commission Fare)',
        vehicleType: 'BYD e6 / Electric Sedan',
        basePrice: Math.round((12.8 + baseDistRate * 0.98) * 10) / 10,
        // Tada does not have aggressive platform surge
        surgeMultiplier: isPeakHour ? 1.1 : 1.0,
        finalPrice: Math.round((12.8 + baseDistRate * 0.98) * (isPeakHour ? 1.1 : 1.0) * 10) / 10,
        etaMinutes: isPeakHour ? 8 : 6,
        driverRating: 4.95,
        driverName: 'Devanathan K.',
        licensePlate: 'SLX 7419 M',
        distanceKm: estimatedDistanceKm,
        tags: {
          petFriendly: true,
          wheelchairFriendly: true,
          highRated: true,
          silentRide: true,
        },
        commissionRate: 0.035,
        operatorColor: OPERATOR_METADATA.Tada.color,
      },
      {
        id: 'ryde-x',
        operator: 'Ryde',
        serviceName: 'RydeX Private Car',
        vehicleType: 'Mazda 3 / Nissan Sylphy',
        basePrice: Math.round((13.8 + baseDistRate * 0.92) * 10) / 10,
        surgeMultiplier: isPeakHour ? 1.25 : 1.0,
        finalPrice: Math.round((13.8 + baseDistRate * 0.92) * (isPeakHour ? 1.25 : 1.0) * 10) / 10,
        etaMinutes: isPeakHour ? 5 : 5,
        driverRating: 4.91,
        driverName: 'Desmond Tan',
        licensePlate: 'SNA 3381 B',
        distanceKm: estimatedDistanceKm,
        tags: {
          petFriendly: true,
          wheelchairFriendly: false,
          highRated: true,
          silentRide: true,
        },
        commissionRate: 0.04,
        operatorColor: OPERATOR_METADATA.Ryde.color,
      },
    ];

    // Identify cheapest and fastest
    let minPrice = Infinity;
    let minEta = Infinity;
    rawRides.forEach(r => {
      if (r.finalPrice < minPrice) minPrice = r.finalPrice;
      if (r.etaMinutes < minEta) minEta = r.etaMinutes;
    });

    return rawRides.map(r => ({
      ...r,
      tags: {
        ...r.tags,
        isCheapest: r.finalPrice === minPrice,
        isFastest: r.etaMinutes === minEta,
      }
    }));
  }, [isPeakHour, estimatedDistanceKm]);

  // Filter based on user preferences
  const filteredRides = useMemo(() => {
    return rideOptions.filter(ride => {
      if (filterTopRated && !ride.tags.highRated) return false;
      if (filterPetFriendly && !ride.tags.petFriendly) return false;
      if (filterWheelchair && !ride.tags.wheelchairFriendly) return false;
      if (filterQuietRide && !ride.tags.silentRide) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') {
        return a.finalPrice - b.finalPrice;
      }
      return a.etaMinutes - b.etaMinutes;
    });
  }, [rideOptions, filterTopRated, filterPetFriendly, filterWheelchair, filterQuietRide, sortBy]);

  const cheapestRide = useMemo(() => {
    return [...rideOptions].sort((a, b) => a.finalPrice - b.finalPrice)[0];
  }, [rideOptions]);

  const fastestRide = useMemo(() => {
    return [...rideOptions].sort((a, b) => a.etaMinutes - b.etaMinutes)[0];
  }, [rideOptions]);

  const handleStartBooking = (ride: RideOption) => {
    setSelectedRide(ride);
    setBookingStatus('matching');
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Value Banner: Peak Hour & Smart Optimization */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Real-Time Singapore Ride Aggregator</span>
              <span className="text-slate-500">·</span>
              <span>5 Operators Connected</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Compare Zig, Grab, Gojek, Tada & Ryde
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Always get the cheapest fare and shortest wait time. Personalize for top-rated, pet-friendly, or wheelchair-ready rides.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/90 rounded-xl p-3 border border-slate-700/80 text-xs">
            <div className="text-right">
              <div className="text-slate-400 text-[11px]">Today's Best Save</div>
              <div className="font-bold text-emerald-400 text-sm tabular-nums">
                Save S${(fastestRide.finalPrice - cheapestRide.finalPrice).toFixed(2)} on this trip
              </div>
            </div>
            <button
              onClick={onOpenCanvas}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors cursor-pointer text-xs"
            >
              BMC Model
            </button>
          </div>
        </div>

        {/* Peak hour advice ticker */}
        {isPeakHour && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2.5 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>AM Peak Congestion Active:</strong> Grab & Gojek surge is at 1.45x. ComfortDelGro Zig & Tada are currently <strong>S$3.50 – S$6.00 cheaper</strong> with zero extra wait.
            </span>
          </div>
        )}
      </div>

      {/* Origin & Destination Search Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Pickup */}
          <div className="md:col-span-5 relative">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pickup Point</span>
            </label>
            <div className="relative">
              <select
                value={pickupId}
                onChange={(e) => setPickupId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                {SG_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[11px] text-slate-400 truncate mt-1">
              {pickup.address}
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center py-1 md:py-0">
            <button
              onClick={handleSwapLocations}
              title="Swap pickup and destination"
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-5 relative">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Destination</span>
            </label>
            <div className="relative">
              <select
                value={dropoffId}
                onChange={(e) => setDropoffId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                {SG_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[11px] text-slate-400 truncate mt-1">
              {dropoff.address}
            </div>
          </div>

        </div>

        {/* Quick Route Shortcuts */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-slate-500 dark:text-slate-400 shrink-0 font-medium">Popular SG Routes:</span>
          <button
            onClick={() => { setPickupId('loc-1'); setDropoffId('loc-2'); }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            Raffles Place → Changi Airport T3
          </button>
          <button
            onClick={() => { setPickupId('loc-4'); setDropoffId('loc-3'); }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            ION Orchard → Marina Bay Sands
          </button>
          <button
            onClick={() => { setPickupId('loc-6'); setDropoffId('loc-1'); }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            One-North → CBD
          </button>
          <button
            onClick={() => { setPickupId('loc-1'); setDropoffId('loc-5'); }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            CBD → Sentosa Island
          </button>
        </div>
      </div>

      {/* Filter and Personalization Controls (Directly from BMC Sticky Notes!) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Sort Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setSortBy('cheapest')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              sortBy === 'cheapest'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Cheapest First</span>
          </button>

          <button
            onClick={() => setSortBy('fastest')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              sortBy === 'fastest'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Fastest ETA First</span>
          </button>
        </div>

        {/* BMC Personalization Features */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterTopRated(!filterTopRated)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
              filterTopRated
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterTopRated ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>4.9+★ Drivers</span>
          </button>

          <button
            onClick={() => setFilterPetFriendly(!filterPetFriendly)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
              filterPetFriendly
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Dog className="w-3.5 h-3.5" />
            <span>Pet Friendly</span>
          </button>

          <button
            onClick={() => setFilterWheelchair(!filterWheelchair)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
              filterWheelchair
                ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span>Wheelchair</span>
          </button>

          <button
            onClick={() => setFilterQuietRide(!filterQuietRide)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
              filterQuietRide
                ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Quiet Ride</span>
          </button>
        </div>
      </div>

      {/* Operator Comparison Cards Grid */}
      <div className="space-y-3">
        {filteredRides.map((ride) => {
          const meta = OPERATOR_METADATA[ride.operator];
          return (
            <div
              key={ride.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md ${
                ride.tags.isCheapest
                  ? 'border-emerald-400/80 dark:border-emerald-500/60 ring-1 ring-emerald-400/30'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left: Operator Branding & Service Details */}
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg shrink-0 shadow-sm"
                    style={{ backgroundColor: meta.color }}
                  >
                    {meta.logoLetter}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base text-slate-900 dark:text-white">
                        {ride.operator}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {ride.serviceName}
                      </span>

                      {ride.tags.isCheapest && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                          <TrendingDown className="w-3 h-3" />
                          Cheapest
                        </span>
                      )}

                      {ride.tags.isFastest && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3" />
                          Fastest Pick
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>{ride.vehicleType}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-amber-500 font-medium">
                        <Star className="w-3 h-3 fill-amber-500" />
                        {ride.driverRating.toFixed(2)}
                      </span>
                      <span>·</span>
                      <span>Driver: {ride.driverName}</span>
                    </div>

                    {/* Features list */}
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                      {ride.tags.petFriendly && (
                        <span className="flex items-center gap-1">
                          <Dog className="w-3 h-3 text-emerald-600" /> Pet Ready
                        </span>
                      )}
                      {ride.tags.wheelchairFriendly && (
                        <span className="flex items-center gap-1">
                          <Accessibility className="w-3 h-3 text-blue-600" /> Accessible
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-slate-400" /> Direct API Booking
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Fare, ETA, and Book Action */}
                <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight font-mono">
                      S${ride.finalPrice.toFixed(2)}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {ride.etaMinutes} mins away
                      </span>
                      {ride.surgeMultiplier > 1.0 && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded">
                          {ride.surgeMultiplier}x surge
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Platform fee S${(ride.finalPrice * ride.commissionRate).toFixed(2)} absorbed
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartBooking(ride)}
                    className="min-h-[44px] px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-sm rounded-xl transition-transform active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Ride</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}

        {filteredRides.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="text-slate-700 dark:text-slate-300 font-medium">No rides matched your active filters</div>
            <div className="text-xs text-slate-500 mt-1">Try disabling pet-friendly or wheelchair filter to see more operators.</div>
            <button
              onClick={() => {
                setFilterTopRated(false);
                setFilterPetFriendly(false);
                setFilterWheelchair(false);
                setFilterQuietRide(false);
              }}
              className="mt-3 px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Commute Companion Teaser */}
      <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-blue-950 dark:text-blue-200">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Commute News Mode:</strong> While you ride to {dropoff.name}, read our curated 3-minute economy and tech digest.
          </span>
        </div>
        <button
          onClick={onOpenNews}
          className="font-semibold text-blue-700 dark:text-blue-300 hover:underline shrink-0 cursor-pointer"
        >
          Open Commute News Feed →
        </button>
      </div>

      {/* Booking Simulation Drawer / Modal */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base"
                  style={{ backgroundColor: selectedRide.operatorColor }}
                >
                  {selectedRide.operator[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {bookingStatus === 'matching' ? 'Connecting to Operator...' : 'Ride Dispatched!'}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedRide.operator} · {selectedRide.serviceName}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-slate-900 dark:text-white tabular-nums font-mono">
                  S${selectedRide.finalPrice.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-500">Fixed Fare</div>
              </div>
            </div>

            {bookingStatus === 'matching' ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Negotiating direct dispatch with {selectedRide.operator} API
                </div>
                <div className="text-xs text-slate-500">
                  Finding nearest available driver near {pickup.name}...
                </div>
              </div>
            ) : (
              <div className="py-4 space-y-4">
                {/* Route recap */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-500">From:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{pickup.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-slate-500">To:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{dropoff.name}</span>
                  </div>
                </div>

                {/* Driver information */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200">
                      {selectedRide.driverName.split(' ')[0][0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {selectedRide.driverName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {selectedRide.licensePlate} · {selectedRide.vehicleType}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs justify-end">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      {selectedRide.driverRating.toFixed(2)}
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      Arriving in {selectedRide.etaMinutes} mins
                    </div>
                  </div>
                </div>

                {/* BMC Revenue Stream Highlight */}
                <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40 p-3 rounded-xl text-xs text-teal-900 dark:text-teal-300">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                    <span>Business Model Verification:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Road Runner takes a <strong>4.0% operator referral commission</strong> (S${(selectedRide.finalPrice * 0.04).toFixed(2)}) directly from {selectedRide.operator}. The commuter pays exact meter with zero markup.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => setSelectedRide(null)}
                className="flex-1 min-h-[44px] py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>

              {bookingStatus === 'confirmed' && (
                <button
                  onClick={() => {
                    setSelectedRide(null);
                    onOpenNews();
                  }}
                  className="flex-1 min-h-[44px] py-2.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Start Commute News</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
