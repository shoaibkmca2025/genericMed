import React from 'react';
import {
  FileText,
  Radio,
  BadgeCheck,
  PackageCheck,
  MessageSquare,
  ShieldAlert,
  Building,
  Cpu,
  Settings,
  Server,
} from 'lucide-react';

export type AdminTab =
  | 'catalog'
  | 'price-radar'
  | 'partner-verification'
  | 'orders'
  | 'reviews'
  | 'audit-logs'
  | 'tenant-mgmt'
  | 'api-limits'
  | 'settings';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  pendingSignoffsCount?: number;
  activeAnomaliesCount?: number;
  pendingStoreCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingSignoffsCount = 3,
  activeAnomaliesCount = 18,
  pendingStoreCount = 2,
}) => {
  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
      <div className="py-4 px-3 space-y-6 overflow-y-auto">
        {/* CORE GOVERNANCE */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Core Governance
          </div>
          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectTab('catalog')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'catalog'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className={`w-4 h-4 ${currentTab === 'catalog' ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>Catalog & Equivalence</span>
              </div>
              {pendingSignoffsCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                  {pendingSignoffsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('price-radar')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'price-radar'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Radio className={`w-4 h-4 ${currentTab === 'price-radar' ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
                <span>Price Anomaly Radar</span>
              </div>
              {activeAnomaliesCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold">
                  {activeAnomaliesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('partner-verification')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'partner-verification'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BadgeCheck className={`w-4 h-4 ${currentTab === 'partner-verification' ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>Partner & Store Verification</span>
              </div>
              {pendingStoreCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">
                  {pendingStoreCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* OPERATIONS */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Operations
          </div>
          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectTab('orders')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'orders'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <PackageCheck className={`w-4 h-4 ${currentTab === 'orders' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Orders & Fulfillment</span>
            </button>

            <button
              onClick={() => onSelectTab('reviews')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'reviews'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${currentTab === 'reviews' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Review Moderation</span>
            </button>

            <button
              onClick={() => onSelectTab('audit-logs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'audit-logs'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className={`w-4 h-4 ${currentTab === 'audit-logs' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Audit & Compliance Logs</span>
            </button>
          </nav>
        </div>

        {/* MULTI-TENANT CONFIG */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Multi-Tenant Config
          </div>
          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectTab('tenant-mgmt')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'tenant-mgmt'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Building className={`w-4 h-4 ${currentTab === 'tenant-mgmt' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Tenant Management</span>
            </button>

            <button
              onClick={() => onSelectTab('api-limits')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'api-limits'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Cpu className={`w-4 h-4 ${currentTab === 'api-limits' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>API & Rate Limits</span>
            </button>

            <button
              onClick={() => onSelectTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'settings'
                  ? 'bg-white text-[#0f4c5c] shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Settings className={`w-4 h-4 ${currentTab === 'settings' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>System Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Node info (exact match from Image 1) */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-100/70">
        <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs text-[11px] font-mono text-slate-600">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Clinical Node: US-East</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Cluster: <span className="text-slate-600">rls-hipaa-04</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
