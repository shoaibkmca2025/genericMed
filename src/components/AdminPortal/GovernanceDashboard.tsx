import React, { useState } from 'react';
import {
  ShieldCheck,
  RotateCw,
  Download,
  FlaskConical,
  ArrowLeftRight,
  Store,
  Radio,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ExternalLink,
  Zap,
  Check,
  AlertOctagon,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import {
  BioequivalentPair,
  PriceAnomalyAlert,
  StoreOnboardingItem,
  AuditLogItem,
} from '../../types';

interface GovernanceDashboardProps {
  pairs: BioequivalentPair[];
  onApprovePair: (id: string) => void;
  anomalies: PriceAnomalyAlert[];
  onToggleFreezeAnomaly: (id: string) => void;
  onEnforceCapAnomaly: (id: string) => void;
  stores: StoreOnboardingItem[];
  onAuthorizeStore: (id: string) => void;
  auditLogs: AuditLogItem[];
  onRunIntegrityScan: () => void;
  onExportCompliance: () => void;
  onOpenBioStudyModal: (pair: BioequivalentPair) => void;
  onOpenStoreDocsModal: (store: StoreOnboardingItem) => void;
  onOpenPharmacopeiaModal: () => void;
}

export const GovernanceDashboard: React.FC<GovernanceDashboardProps> = ({
  pairs,
  onApprovePair,
  anomalies,
  onToggleFreezeAnomaly,
  onEnforceCapAnomaly,
  stores,
  onAuthorizeStore,
  auditLogs,
  onRunIntegrityScan,
  onExportCompliance,
  onOpenBioStudyModal,
  onOpenStoreDocsModal,
  onOpenPharmacopeiaModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<'deviation' | 'savings' | 'confidence'>('deviation');

  const categories = [
    'All Categories',
    'Cardiovascular',
    'Antibiotics',
    'Antidiabetics',
    '• High Priority',
  ];

  const filteredPairs = pairs.filter((pair) => {
    if (selectedCategory === 'All Categories') return true;
    if (selectedCategory === '• High Priority') return pair.highPriority;
    return pair.category === selectedCategory;
  });

  const pendingSignoffCount = pairs.filter((p) => p.state === 'Pending Board').length;
  const activeTelemetryCount = anomalies.filter((a) => a.status !== 'RESOLVED').length;

  return (
    <div className="space-y-5">
      {/* Top Banner / Subheader */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider text-emerald-800 uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>REGULATORY & OPERATIONAL COMMAND / NODE: US-EAST-CLINICAL-04</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Governance & Bioequivalence Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Real-time regulatory consensus, tenant isolation surveillance, and autonomous price arbitrage telemetry.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>RLS Multi-Tenant:</span>
            <span className="font-mono text-emerald-700 font-bold">STRICT ENFORCED</span>
          </div>

          <button
            onClick={onRunIntegrityScan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs transition-all active:scale-98"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Run Integrity Scan</span>
          </button>

          <button
            onClick={onExportCompliance}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f4c5c] hover:bg-[#0c3c49] text-white text-xs font-semibold shadow-xs transition-all active:scale-98"
          >
            <Download className="w-3.5 h-3.5 text-emerald-300" />
            <span>Export Compliance Trail</span>
          </button>
        </div>
      </div>

      {/* Top 5 Metric KPI Cards (exact match from Image 1) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1: Canonical Formulations */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>CANONICAL FORMULATIONS</span>
            <FlaskConical className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              14,820
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
              +284
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
            <span>Pending Board Review</span>
            <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 rounded text-[10px]">
              Stage 2 FDA/EMA
            </span>
          </div>
        </div>

        {/* Card 2: Bioequivalent Pairs */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>BIOEQUIVALENT PAIRS</span>
            <ArrowLeftRight className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              42,910
            </span>
            <span className="text-xs font-semibold text-slate-500 font-mono">
              99.4%
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
            <span>Confidence Index</span>
            <span className="font-mono font-semibold text-slate-700">AUC/Cmax ±2%</span>
          </div>
        </div>

        {/* Card 3: Active Pharmacy Tenants */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>ACTIVE PHARMACY TENANTS</span>
            <Store className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              1,420
            </span>
            <span className="text-xs font-semibold text-slate-500">Stores</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
            <span>38 Regional Clusters</span>
            <span className="font-semibold text-emerald-700">100% RLS Valid</span>
          </div>
        </div>

        {/* Card 4: Price Anomaly Radar */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>PRICE ANOMALY RADAR</span>
            <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-2xl font-extrabold text-rose-600 tracking-tight font-mono">
              18
            </span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded font-mono">
              Urgent Flags
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
            <span>Margin Spikes (Last 1h)</span>
            <span className="font-bold text-rose-600 font-mono">3 Critical</span>
          </div>
        </div>

        {/* Card 5: Patient Savings Index */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>PATIENT SAVINGS INDEX</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-2xl font-extrabold text-emerald-700 tracking-tight font-mono">
              68.4%
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              ↑ 3.2%
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
            <span>vs Originator MSRP</span>
            <span className="font-mono font-bold text-slate-800">Avg $42/rx</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Center Table (2 cols) & Right Column (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Center Main Column (7 of 12 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card 1: Catalog & Bioequivalence Governance Queue */}
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-emerald-700" />
                    <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Catalog & Bioequivalence Governance Queue
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reviewing canonical formulations, bioequivalence ratios, and therapeutic substitution safety criteria.
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200 self-start sm:self-auto font-mono">
                  {pendingSignoffCount} Pending Signoff
                </span>
              </div>

              {/* Filter Tabs & Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#0f4c5c] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <span>Sorted by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="deviation">Deviation Score ↓</option>
                    <option value="savings">Arbitrage Savings %</option>
                    <option value="confidence">Bioequivalence Match</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-2.5 px-4">Canonical Pair (Branded / Generic)</th>
                    <th className="py-2.5 px-3">Active Moiety & Bio Study</th>
                    <th className="py-2.5 px-3">Bioequivalence (AUC/Cmax)</th>
                    <th className="py-2.5 px-3">Price Arbitrage</th>
                    <th className="py-2.5 px-4 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPairs.map((pair) => (
                    <tr
                      key={pair.id}
                      className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                      onClick={() => onOpenBioStudyModal(pair)}
                    >
                      {/* Canonical Pair */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-xs">
                              {pair.brandedName} {pair.brandedDosage}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                              {pair.brandedManufacturer}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-800 font-medium pl-2">
                            <span className="text-slate-300">↳</span>
                            <span className="font-bold text-xs">
                              {pair.genericName} {pair.genericDosage}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 border border-blue-100 font-medium">
                              {pair.genericManufacturer}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Active Moiety & Study */}
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">
                          {pair.activeMoiety}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                          <span>Study: {pair.bioStudyId}</span>
                          <Eye className="w-3 h-3 text-slate-400 group-hover:text-emerald-700" />
                        </div>
                      </td>

                      {/* Bioequivalence Ratio */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                pair.bioequivalenceMatch >= 99.5
                                  ? 'bg-emerald-600'
                                  : 'bg-teal-600'
                              }`}
                              style={{ width: `${pair.bioequivalenceMatch}%` }}
                            />
                          </div>
                          <span className="font-bold font-mono text-xs text-slate-800">
                            {pair.bioequivalenceMatch === 100 ? '100% Bioeq' : `${pair.bioequivalenceMatch}% Match`}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {pair.aucCmaxRatio}
                        </div>
                      </td>

                      {/* Price Arbitrage */}
                      <td className="py-3 px-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-slate-400 line-through text-xs font-mono">
                            ${pair.brandedMSRP.toFixed(2)}
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm font-mono">
                            ${pair.genericPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-[10px] font-bold text-emerald-700 font-mono">
                          {pair.savingsPercent}% savings
                        </div>
                      </td>

                      {/* State Badge & Quick Signoff */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex flex-col items-end gap-1">
                          {pair.state === 'Pending Board' ? (
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                                Pending Board
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onApprovePair(pair.id);
                                }}
                                className="px-2 py-0.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold shadow-2xs"
                                title="Approve bioequivalence group"
                              >
                                Signoff
                              </button>
                            </div>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span>Verified & Active</span>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footnote */}
            <div className="p-3 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-600 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-700 font-bold">FR-COMP-01</span>
                <span>
                  Regulatory Standard: ±5% 90% Confidence Interval for AUC & Cmax bioequivalence compliance.
                </span>
              </div>
              <button
                onClick={onOpenPharmacopeiaModal}
                className="text-emerald-800 hover:text-emerald-950 font-bold hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Review Pharmacopeia Specifications</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Price Anomaly Radar & Inventory Freshness */}
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Price Anomaly Radar & Inventory Freshness
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        {activeTelemetryCount} Active Telemetry Alerts
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Algorithmic variance threshold: ±35% from regional weighted median price.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center gap-1 text-[#0f4c5c] font-semibold">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Redis L2 Cache Freshness:</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800">99.94% &lt; 5 mins ago</span>
                </div>
              </div>
            </div>

            {/* Anomaly Alerts List */}
            <div className="p-4 space-y-3">
              {anomalies.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    alert.status === 'QUARANTINED'
                      ? 'bg-amber-50/40 border-amber-200'
                      : alert.type === 'FLASH_DUMP'
                      ? 'bg-rose-50/30 border-rose-200'
                      : 'bg-orange-50/30 border-orange-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          alert.iconType === 'down'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {alert.iconType === 'down' ? (
                          <ArrowDownRight className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">
                            Store #{alert.storeId} ({alert.storeName})
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700 font-semibold">
                            Tenant Cluster: {alert.cluster}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                              alert.type === 'FLASH_DUMP'
                                ? 'bg-rose-600 text-white'
                                : 'bg-amber-600 text-white'
                            }`}
                          >
                            {alert.type === 'FLASH_DUMP' ? 'FLASH DUMP WARNING' : 'SUPPRESSED SEARCH'}
                          </span>
                        </div>

                        <div className="text-xs text-slate-800">
                          <span className="font-semibold">{alert.medicineName}</span> listed at{' '}
                          <span className="font-bold font-mono text-rose-700">
                            ${alert.listedPrice.toFixed(2)}
                          </span>{' '}
                          ({Math.abs(alert.variancePercent)}% {alert.variancePercent < 0 ? 'below regional baseline of' : 'above price ceiling of'}{' '}
                          <span className="font-mono">${alert.baselinePrice.toFixed(2)}</span>)
                        </div>

                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1">
                            <AlertOctagon className="w-3 h-3 text-amber-500" />
                            <span>Trigger: {alert.reason}</span>
                          </span>
                          <span>•</span>
                          <span className="font-mono text-slate-400">Sync: {alert.syncTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {alert.type === 'FLASH_DUMP' ? (
                        <>
                          <button
                            onClick={() => onToggleFreezeAnomaly(alert.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                              alert.status === 'QUARANTINED'
                                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                                : 'bg-rose-600 hover:bg-rose-700 text-white'
                            }`}
                          >
                            {alert.status === 'QUARANTINED' ? 'Unfreeze Listing' : 'Freeze Listing'}
                          </button>
                          <button
                            onClick={() => alert(`Contacting ${alert.storeName} on secure partner channel...`)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs"
                          >
                            Contact Store
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => alert(`Inspecting Pricing Model algorithms for cluster ${alert.cluster}...`)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs"
                          >
                            Inspect Pricing Model
                          </button>
                          <button
                            onClick={() => onEnforceCapAnomaly(alert.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f4c5c] hover:bg-[#0c3c49] text-white shadow-2xs"
                          >
                            Enforce Cap
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Radar Footer Status */}
            <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-slate-600 gap-1">
              <div>
                RLS Filter: <span className="font-semibold text-slate-800">tenant_id isolation enforced</span> for all 1,420 regional inventory streams.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">Heartbeat: OK</span>
                <span>•</span>
                <span className="text-slate-500">LATENCY: 12ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 of 12 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card A: Store Onboarding Queue (exact from Image 1) */}
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Store Onboarding Queue
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
                FR-VEN-01
              </span>
            </div>

            <div className="p-4 space-y-4">
              {/* Store 1: HealthCare Plus */}
              <div className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/20 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      HealthCare Plus Pharmacy
                    </h4>
                    <div className="text-[11px] font-mono text-slate-500">
                      License: #PH-2026-9901
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    Awaiting Verification
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>State Pharmacy Board License</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700">
                      VALIDATED
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>GST & Federal Tax Credentials</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700">
                      CLEAN (0 LVR)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Pharmacist-in-Charge Council ID</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700">
                      ACTIVE (ID #8904)
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-100 flex items-center justify-between">
                  <button
                    onClick={() => onAuthorizeStore(stores[0].id)}
                    className="px-3 py-1.5 rounded-lg bg-[#0f4c5c] hover:bg-[#0c3c49] text-white text-xs font-bold shadow-2xs"
                  >
                    Authorize Tenant
                  </button>
                  <button
                    onClick={() => onOpenStoreDocsModal(stores[0])}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                  >
                    Inspect Docs
                  </button>
                </div>
              </div>

              {/* Store 2: MetroGeneric Chemist */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      MetroGeneric Chemist
                    </h4>
                    <div className="text-[11px] font-mono text-slate-500">
                      Tenant ID: #TN-B-7740 • Chicago Hub
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                    Tier 1 Partner
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded bg-white border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500">Delivery SLA</div>
                    <div className="font-mono font-extrabold text-slate-900 text-sm">
                      98.2%
                    </div>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500">Fulfillment</div>
                    <div className="font-mono font-extrabold text-slate-900 text-sm">
                      99.1%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Avg Dispatch Time: 28m</span>
                  <span className="font-semibold text-emerald-700">0 Anomaly Violations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Immutable Audit Stream (exact from Image 1) */}
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Immutable Audit Stream
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500">
                Section 18 HIPAA Log
              </span>
            </div>

            <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto divide-y divide-slate-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="pt-2.5 first:pt-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      {log.timestamp}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                        log.type === 'SIGNOFF'
                          ? 'bg-blue-100 text-blue-900'
                          : log.type === 'AUTO-QUARANTINE'
                          ? 'bg-rose-100 text-rose-900'
                          : log.type === 'SECURITY'
                          ? 'bg-purple-100 text-purple-900'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {log.type}
                    </span>
                  </div>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    <span className="font-bold text-slate-900">{log.actor}</span> {log.summary}.
                  </p>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {log.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Audit Stream Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1 text-slate-600 font-mono">
                <Lock className="w-3 h-3 text-emerald-700" />
                <span>SHA-256 Chained Hash</span>
              </div>
              <button
                onClick={() => alert('Opening live syslog socket stream on node rls-hipaa-04...')}
                className="font-bold text-[#0f4c5c] hover:underline flex items-center gap-1"
              >
                <span>Live Syslog →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar (exact match from Image 1) */}
      <div className="pt-3 pb-1 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Cloud: AWS us-east-1 (Operational)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">🗄️</span>
            <span className="font-medium text-slate-700">PostgreSQL RLS: Synchronized</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500">⚡</span>
            <span className="font-mono font-medium text-slate-700">Redis L2 Cache: 0.8ms</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Environment: Production-SaaS Build: v4.19.2-prod-ec3a
        </div>
      </div>
    </div>
  );
};
