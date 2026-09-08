import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Bell,
  ChevronDown,
  Layers,
  ShoppingBag,
  Store,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Server,
  Activity,
  X,
  ArrowRight,
} from 'lucide-react';
import { PortalMode } from '../types';

interface HeaderProps {
  currentMode: PortalMode;
  onSelectMode: (mode: PortalMode) => void;
  onOpenRLSModal: () => void;
  onOpenCommandPalette: () => void;
  alertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  onOpenRLSModal,
  onOpenCommandPalette,
  alertCount,
}) => {
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getPortalLabel = () => {
    switch (currentMode) {
      case 'admin':
        return 'Admin Portal';
      case 'customer':
        return 'Customer Marketplace';
      case 'store':
        return 'Store Partner Portal';
      case 'architecture':
        return 'System Architecture';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="w-full px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Left: Brand & Portal Selector */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onSelectMode('admin')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0f4c5c] flex items-center justify-center text-white font-bold shadow-xs group-hover:bg-[#0c3c49] transition-colors">
              <span className="text-sm tracking-tight flex items-center">
                <svg
                  className="w-5 h-5 text-emerald-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                  <path d="m8.5 8.5 7 7" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-[#0f4c5c]">
                generic<span className="text-emerald-700">Med</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                {currentMode === 'admin' ? 'Admin' : currentMode.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 mx-1 hidden md:block" />

          {/* Portal Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
              title="Switch view/portal"
            >
              <span className="text-slate-500 font-medium">PORTAL:</span>
              <span className="text-slate-900">{getPortalLabel()}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isPortalDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsPortalDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select System Portal
                  </div>
                  <button
                    onClick={() => {
                      onSelectMode('admin');
                      setIsPortalDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors ${
                      currentMode === 'admin' ? 'bg-emerald-50/60 font-semibold text-[#0f4c5c]' : 'text-slate-700'
                    }`}
                  >
                    <Sliders className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900">Governance & Regulatory Command</div>
                      <div className="text-[11px] text-slate-500">Bioequivalence, Anomaly Radar & Store Audits</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectMode('customer');
                      setIsPortalDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors ${
                      currentMode === 'customer' ? 'bg-emerald-50/60 font-semibold text-[#0f4c5c]' : 'text-slate-700'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900">Customer Price Comparison & Commerce</div>
                      <div className="text-[11px] text-slate-500">Compare Brand vs Generic, Cart & Orders (PRD P0)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectMode('store');
                      setIsPortalDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors ${
                      currentMode === 'store' ? 'bg-emerald-50/60 font-semibold text-[#0f4c5c]' : 'text-slate-700'
                    }`}
                  >
                    <Store className="w-4 h-4 mt-0.5 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900">Medical Store / Pharmacy Partner</div>
                      <div className="text-[11px] text-slate-500">Catalog Inventory & Dispatch Orders Queue</div>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      onSelectMode('architecture');
                      setIsPortalDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors ${
                      currentMode === 'architecture' ? 'bg-emerald-50/60 font-semibold text-[#0f4c5c]' : 'text-slate-700'
                    }`}
                  >
                    <Layers className="w-4 h-4 mt-0.5 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900">System Architecture Diagram Explorer</div>
                      <div className="text-[11px] text-slate-500">Inspect Multi-Tenant Layers, IAM & Data Flows</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Multi-Tenant Row-Level Security Badge (as seen on Image 1) */}
          <button
            onClick={onOpenRLSModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
            title="Inspect Row-Level Security Isolation"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multi-Tenant Isolation:</span>
            <span className="font-semibold text-emerald-700">Active (Row-Level Security)</span>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-xs text-slate-500 cursor-pointer transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Search medicines, tenants, pricing anomalies...</span>
            </div>
            <kbd className="hidden md:inline-flex text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 shadow-2xs">
              cmd+k
            </kbd>
          </div>
        </div>

        {/* Right: SLA, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* SLA Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-600 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Services 99.98% SLA</span>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="View Alerts & Telemetry"
            >
              <Bell className="w-4 h-4" />
              {alertCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {alertCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Active Telemetry Alerts ({alertCount})</span>
                    <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                      Real-time
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                    <div className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-1.5 text-rose-600 font-semibold mb-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Flash Dump Alert (Store #TN-882)</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Metformin 500mg listed at $0.08 (88% below baseline $0.65). Possible batch expiry.
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">2 mins ago • Cluster South-02</span>
                    </div>

                    <div className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-1.5 text-amber-600 font-semibold mb-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Suppressed Search (Store #TN-419)</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Rosuvastatin 10mg listed at $9.50 (240% above price ceiling $2.80).
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">4 mins ago • Cluster West-09</span>
                    </div>

                    <div className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-1.5 text-blue-600 font-semibold mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Store Verification Ready</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        HealthCare Plus Pharmacy submitted license #PH-2026-9901 for review.
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">15 mins ago • Midwest-01</span>
                    </div>
                  </div>
                  <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                    <button
                      onClick={() => {
                        onSelectMode('admin');
                        setShowNotifications(false);
                      }}
                      className="text-xs font-semibold text-[#0f4c5c] hover:underline flex items-center justify-center gap-1 w-full"
                    >
                      <span>Open Operations Radar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-emerald-300">
              SC
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">Dr. Sarah Chen</div>
              <div className="text-[10px] text-slate-500 leading-tight">Chief Regulatory Officer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
