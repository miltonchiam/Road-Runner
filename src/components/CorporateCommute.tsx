import React, { useState } from 'react';
import { 
  Building2, 
  Receipt, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  Download, 
  FileText, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { DEFAULT_CORPORATE_PROFILE } from '../data/mobilityData';

interface CorporateCommuteProps {
  onOpenCanvas: () => void;
  onBookRide: () => void;
}

export const CorporateCommute: React.FC<CorporateCommuteProps> = ({
  onOpenCanvas,
  onBookRide,
}) => {
  const [profile, setProfile] = useState(DEFAULT_CORPORATE_PROFILE);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const remainingBalance = profile.monthlyAllowanceSgd - profile.usedThisMonthSgd;
  const percentUsed = Math.round((profile.usedThisMonthSgd / profile.monthlyAllowanceSgd) * 100);

  const corporateTrips = [
    {
      id: 'corp-101',
      date: 'Today, 8:42 AM',
      from: 'Tanjong Pagar',
      to: '1 Raffles Place (CBD)',
      operator: 'ComfortDelGro Zig',
      amountSgd: 18.20,
      code: 'VERTEX-OT-481',
      status: 'Auto-Approved',
      purpose: 'Morning Client Strategy Session',
    },
    {
      id: 'corp-102',
      date: 'Yesterday, 8:15 PM',
      from: '1 Raffles Place',
      to: 'Serangoon North Ave 1',
      operator: 'Grab JustGrab',
      amountSgd: 24.50,
      code: 'VERTEX-OT-479',
      status: 'Auto-Approved',
      purpose: 'Overtime Commute (Post 8:00 PM Policy)',
    },
    {
      id: 'corp-103',
      date: '10 Nov, 2:30 PM',
      from: 'Vertex HQ',
      to: 'Changi Airport T3',
      operator: 'Tada Standard',
      amountSgd: 27.80,
      code: 'VERTEX-AIR-102',
      status: 'Auto-Approved',
      purpose: 'Regional Investor Airport Transfer',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Corporate Employee Benefit */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
              <Building2 className="w-4 h-4 text-rose-400" />
              <span>Corporate Commute Portal</span>
              <span className="text-slate-500">·</span>
              <span>B2B Direct Sales Channel</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {profile.companyName} Commute Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Unified ride booking across Zig, Grab, Tada and Gojek charged directly to your employer's pre-approved commute budget.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-3 border border-slate-700 text-xs">
            <div className="text-right">
              <div className="text-slate-400 text-[10px]">Employee Status</div>
              <div className="font-bold text-emerald-400">{profile.employeeName} · {profile.department}</div>
            </div>
            <button
              onClick={onOpenCanvas}
              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-lg text-xs cursor-pointer transition-colors"
            >
              BMC Model
            </button>
          </div>
        </div>
      </div>

      {/* Allowance & Policy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Allowance Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
            Monthly Commute Allowance
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
            S${profile.monthlyAllowanceSgd.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            S${remainingBalance.toFixed(2)} remaining this calendar month
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{percentUsed}% Utilised</span>
              <span>S${profile.usedThisMonthSgd.toFixed(2)} Spent</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all"
                style={{ width: `${percentUsed}%` }}
              />
            </div>
          </div>
        </div>

        {/* Corporate Policy Checker */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
            Company Commute Policy
          </div>
          <div className="space-y-2 mt-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Overtime home trips after 8:00 PM 100% covered</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Client meetings & airport transfers covered</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Auto-applies lowest fare from aggregator</span>
            </div>
          </div>
        </div>

        {/* Quick Action Book */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              1-Tap Corporate Dispatch
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Select any ride and charge directly to Vertex Capital billing code with automated PDF receipt creation.
            </p>
          </div>

          <div className="pt-3">
            <button
              onClick={onBookRide}
              className="w-full min-h-[44px] py-2 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-xs rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Book Ride Under Corporate Account</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Corporate Trips Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recent Corporate Commutes
            </h3>
            <p className="text-xs text-slate-500">
              Consolidated billing records across Grab, Zig, and Tada.
            </p>
          </div>

          <button
            onClick={() => setShowReceiptModal(true)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Billing Code</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Fare (SGD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              {corporateTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 whitespace-nowrap">{trip.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{trip.from} → {trip.to}</div>
                    <div className="text-[11px] text-slate-400">{trip.purpose}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">{trip.operator}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-500">{trip.code}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="w-3 h-3" />
                      {trip.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-right font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                    S${trip.amountSgd.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Statement Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-500" />
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Corporate Tax Invoice Generated
                </h4>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl text-xs space-y-2 font-mono">
              <div className="text-slate-500">INVOICE: RR-SG-2026-8812</div>
              <div className="text-slate-500">CLIENT: Vertex Capital Partners SG</div>
              <div className="text-slate-500">PERIOD: November 2026</div>
              <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-2 pt-2" />
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>3 Approved Trips</span>
                <span>S$70.50</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Singapore GST (9%)</span>
                <span>S$6.35</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total Reimbursed to Road Runner</span>
                <span>S$76.85</span>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="flex-1 min-h-[44px] py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Tax invoice CSV downloaded successfully.');
                  setShowReceiptModal(false);
                }}
                className="flex-1 min-h-[44px] py-2 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV / PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
