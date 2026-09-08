import React from 'react';
import { Building, ShieldCheck, Database, Server, Key, Lock, AlertCircle, RefreshCw } from 'lucide-react';

export const TenantManagementView: React.FC = () => {
  const tenants = [
    {
      id: 'TN-B-7740',
      name: 'MetroGeneric Chemist',
      cluster: 'Chicago Hub (Cluster #04)',
      status: 'ACTIVE',
      inventoryRows: 1840,
      isolation: 'RLS ENFORCED',
      lastPing: '3s ago',
      apiKeyStatus: 'ROTATED (DAY 14)',
    },
    {
      id: 'TN-882',
      name: 'Apollo Metro Hub',
      cluster: 'Midwest Central (Cluster #11)',
      status: 'ACTIVE',
      inventoryRows: 2410,
      isolation: 'RLS ENFORCED',
      lastPing: '1s ago',
      apiKeyStatus: 'HEALTHY',
    },
    {
      id: 'TN-419',
      name: 'Guardian Express Pharmacy',
      cluster: 'East Coast Corridor (Cluster #02)',
      status: 'TELEMETRY_FLAGGED',
      inventoryRows: 920,
      isolation: 'RLS ENFORCED',
      lastPing: '8s ago',
      apiKeyStatus: 'HEALTHY',
    },
    {
      id: 'TN-B-9901',
      name: 'HealthCare Plus Pharmacy',
      cluster: 'Boston Metro (Cluster #07)',
      status: 'PROVISIONING',
      inventoryRows: 0,
      isolation: 'PENDING_SIGNOFF',
      lastPing: 'Connecting...',
      apiKeyStatus: 'GENERATING',
    },
  ];

  return (
    <div className="space-y-5 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase mb-1">
            <Building className="w-4 h-4 text-emerald-700" />
            <span>PostgreSQL Multi-Tenant Sharding & Partitioning</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Tenant Management & Isolation Control
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervise database partitioning, Row-Level Security tenant keys, and isolation boundary health across 38 regional clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Zero Data Leakage Detected</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Total Pharmacy Tenants</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">1,420</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Distributed in 38 clusters</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Active Isolated Tables</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">12</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">RLS enabled & forced on all</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">JWT Partition Tokens</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">1,420</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Rotated bi-weekly</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Cross-Tenant Violations</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">0</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Strict RLS kernel block</div>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="font-bold text-slate-900">Configured Pharmacy Tenants</span>
          <span className="text-[11px] font-mono text-slate-500">PostgreSQL Tenant Contexts</span>
        </div>

        <div className="divide-y divide-slate-100">
          {tenants.map((t) => (
            <div key={t.id} className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                    {t.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    {t.status}
                  </span>
                </div>
                <div className="text-slate-600 text-xs">
                  Cluster: <strong>{t.cluster}</strong> • Dedicated Rows: <strong className="font-mono">{t.inventoryRows.toLocaleString()}</strong>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span>Heartbeat: {t.lastPing}</span>
                  <span>•</span>
                  <span>API Key: {t.apiKeyStatus}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-200">
                  {t.isolation}
                </span>
                <button
                  onClick={() => alert(`Regenerating tenant token and resetting RLS partition cache for ${t.id}...`)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold shadow-2xs text-xs"
                >
                  Rotate Key
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
