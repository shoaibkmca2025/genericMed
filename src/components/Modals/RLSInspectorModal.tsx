import React, { useState } from 'react';
import { X, ShieldCheck, Database, Key, Check, Server, Terminal, Lock } from 'lucide-react';

interface RLSInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RLSInspectorModal: React.FC<RLSInspectorModalProps> = ({ isOpen, onClose }) => {
  const [selectedTenant, setSelectedTenant] = useState<string>('TN-B-7740');
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const testTenantQuery = (tenantId: string) => {
    setTestResult(
      `[SIMULATION SUCCESS] SET LOCAL app.current_tenant_id = '${tenantId}';\n` +
      `SELECT * FROM regional_inventory WHERE store_id = '${tenantId}';\n` +
      `Row count: 180 records retrieved.\n` +
      `Cross-tenant rows filtered out by PostgreSQL RLS: 141,820 records from 37 other tenants safely blocked.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-emerald-800">
                PostgreSQL Security Subsystem
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Multi-Tenant Row-Level Security (RLS) Telemetry
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
          {/* Architecture Architecture Note */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Database className="w-5 h-5 text-[#0f4c5c] shrink-0 mt-0.5" />
            <div className="space-y-1 text-slate-600">
              <span className="font-bold text-slate-900 text-xs">Shared Database + Row-Level Security Strategy</span>
              <p>
                All 1,420 pharmacy store tenants share the primary PostgreSQL cluster. Strict cryptographic tenant isolation is enforced at the database engine kernel level using PostgreSQL RLS policies, ensuring zero cross-tenant data exposure.
              </p>
            </div>
          </div>

          {/* DDL Policy Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-700 font-bold">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-500" />
                <span>Active Database RLS DDL Policy (Enforced on table <code>regional_inventory</code>)</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                ENFORCED: 100%
              </span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
{`-- Enable Row Level Security on the inventory table
ALTER TABLE regional_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE regional_inventory FORCE ROW LEVEL SECURITY;

-- Cryptographic isolation policy verified by IAM JWT
CREATE POLICY tenant_isolation_policy ON regional_inventory
    AS RESTRICTIVE
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id', true));

-- Indexed partition constraint
CREATE INDEX idx_inventory_tenant_rls ON regional_inventory (tenant_id, medicine_id);`}
            </pre>
          </div>

          {/* Interactive Isolation Test Console */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Simulate Tenant Context API Token Injection</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                Test query isolation
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedTenant}
                onChange={(e) => {
                  setSelectedTenant(e.target.value);
                  setTestResult(null);
                }}
                className="bg-white border border-slate-300 text-slate-800 text-xs font-mono rounded-lg px-3 py-2 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="TN-B-7740">Tenant #TN-B-7740 (MetroGeneric Chemist)</option>
                <option value="TN-882">Tenant #TN-882 (Apollo Metro Hub)</option>
                <option value="TN-B-9901">Tenant #TN-B-9901 (HealthCare Plus Pharmacy)</option>
                <option value="TN-419">Tenant #TN-419 (Guardian Express)</option>
              </select>

              <button
                onClick={() => testTenantQuery(selectedTenant)}
                className="px-4 py-2 rounded-lg bg-[#0f4c5c] hover:bg-[#0c3c49] text-white text-xs font-bold shadow-xs transition-all"
              >
                Execute Isolated Sandbox Query
              </button>
            </div>

            {testResult && (
              <pre className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] whitespace-pre-wrap border border-slate-800">
                {testResult}
              </pre>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-mono">
            <Key className="w-3.5 h-3.5 text-emerald-700" />
            <span>Node: us-east-clinical-04 / JWT Token Hash: SHA-256 Valid</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-200"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
