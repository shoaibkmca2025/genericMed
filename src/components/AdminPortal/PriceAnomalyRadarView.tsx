import React, { useState } from 'react';
import { Radio, AlertTriangle, ShieldCheck, Zap, ArrowDownRight, ArrowUpRight, Search, Check, RefreshCw } from 'lucide-react';
import { PriceAnomalyAlert } from '../../types';

interface PriceAnomalyRadarViewProps {
  anomalies: PriceAnomalyAlert[];
  onToggleFreeze: (id: string) => void;
  onEnforceCap: (id: string) => void;
}

export const PriceAnomalyRadarView: React.FC<PriceAnomalyRadarViewProps> = ({
  anomalies,
  onToggleFreeze,
  onEnforceCap,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = anomalies.filter((a) => {
    if (filterType !== 'ALL' && a.type !== filterType) return false;
    if (
      searchQuery &&
      !a.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.storeName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.cluster.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 uppercase mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Autonomous Surveillance Subsystem</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Price Anomaly Radar & Arbitrage Telemetry
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Detecting flash dumps, predatory pricing spikes, and regional price-gouging across 1,420 pharmacy store tenants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-rose-800">
            {anomalies.filter((a) => a.status === 'ACTIVE_TELEMETRY').length} Active Flags
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Variance Threshold Guardrail</div>
          <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">±35.0%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Automated quarantine if price diverges beyond baseline</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Median Telemetry Latency</div>
          <div className="text-xl font-extrabold font-mono text-emerald-700 mt-1">12ms</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Redis L2 Cache synchronization across all clusters</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Auto-Quarantined Listings</div>
          <div className="text-xl font-extrabold font-mono text-amber-700 mt-1">
            {anomalies.filter((a) => a.status === 'QUARANTINED').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Suppressed from customer marketplace discovery</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Filter by medicine, store or cluster..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded-md text-xs font-semibold ${
              filterType === 'ALL' ? 'bg-[#0f4c5c] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            All ({anomalies.length})
          </button>
          <button
            onClick={() => setFilterType('FLASH_DUMP')}
            className={`px-3 py-1 rounded-md text-xs font-semibold ${
              filterType === 'FLASH_DUMP' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Flash Dumps
          </button>
          <button
            onClick={() => setFilterType('SUPPRESSED_SEARCH')}
            className={`px-3 py-1 rounded-md text-xs font-semibold ${
              filterType === 'SUPPRESSED_SEARCH' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Suppressed Searches
          </button>
          <button
            onClick={() => setFilterType('MARGIN_SPIKE')}
            className={`px-3 py-1 rounded-md text-xs font-semibold ${
              filterType === 'MARGIN_SPIKE' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Margin Spikes
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border bg-white shadow-2xs transition-all ${
              item.status === 'QUARANTINED' ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    item.iconType === 'down' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.iconType === 'down' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{item.medicineName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                      Store #{item.storeId} ({item.storeName})
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      Cluster: {item.cluster}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        item.type === 'FLASH_DUMP' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                      }`}
                    >
                      {item.type}
                    </span>
                    {item.status === 'QUARANTINED' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        AUTOMATED QUARANTINE ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="text-slate-700">
                    Listed Price:{' '}
                    <span className="font-mono font-extrabold text-rose-700 text-sm">
                      ${item.listedPrice.toFixed(2)}
                    </span>{' '}
                    vs Regional Baseline of{' '}
                    <span className="font-mono font-bold text-slate-900">${item.baselinePrice.toFixed(2)}</span>{' '}
                    <span className="font-mono font-bold text-rose-700">
                      ({item.variancePercent > 0 ? `+${item.variancePercent}%` : `${item.variancePercent}%`} variance)
                    </span>
                  </div>

                  <div className="text-slate-500 text-[11px]">
                    Reason: {item.reason} • Last Synced: {item.syncTime}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {item.type === 'FLASH_DUMP' ? (
                  <button
                    onClick={() => onToggleFreeze(item.id)}
                    className={`px-3.5 py-2 rounded-lg font-bold shadow-xs text-xs ${
                      item.status === 'QUARANTINED'
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }`}
                  >
                    {item.status === 'QUARANTINED' ? 'Lift Quarantine & Unfreeze' : 'Freeze Listing in RLS'}
                  </button>
                ) : (
                  <button
                    onClick={() => onEnforceCap(item.id)}
                    className="px-3.5 py-2 rounded-lg font-bold bg-[#0f4c5c] hover:bg-[#0c3c49] text-white shadow-xs text-xs"
                  >
                    Enforce Regional Ceiling Price
                  </button>
                )}
                <button
                  onClick={() => alert(`Simulating live communication with Store #${item.storeId}...`)}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold shadow-2xs"
                >
                  Message Partner
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
