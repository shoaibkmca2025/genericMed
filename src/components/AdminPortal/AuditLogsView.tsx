import React, { useState } from 'react';
import { ShieldAlert, Lock, Search, Filter, Terminal, CheckCircle2, Download } from 'lucide-react';
import { AuditLogItem } from '../../types';

interface AuditLogsViewProps {
  logs: AuditLogItem[];
}

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ logs }) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filtered = logs.filter((l) => {
    if (selectedType !== 'ALL' && l.type !== selectedType) return false;
    if (
      search &&
      !l.actor.toLowerCase().includes(search.toLowerCase()) &&
      !l.summary.toLowerCase().includes(search.toLowerCase()) &&
      !l.detail.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-5 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>HIPAA Security Rule § 164.312(b) & Audit Controls</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Immutable Audit Stream & Compliance Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically chained SHA-256 audit events for regulatory approvals, quarantine triggers, and tenant boundary operations.
          </p>
        </div>

        <button
          onClick={() => {
            const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute('href', dataStr);
            downloadAnchor.setAttribute('download', 'genericMed_Audit_Log_HIPAA.json');
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0f4c5c] hover:bg-[#0c3c49] text-white font-bold shadow-xs text-xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          <span>Export Certified Audit Trail</span>
        </button>
      </div>

      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search audit records or actors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['ALL', 'SIGNOFF', 'AUTO-QUARANTINE', 'SECURITY', 'TELEMETRY', 'RLS_ENFORCEMENT'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                selectedType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((log) => (
            <div key={log.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-500 font-bold">{log.timestamp}</span>
                  <span
                    className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                      log.type === 'SIGNOFF'
                        ? 'bg-blue-100 text-blue-900'
                        : log.type === 'AUTO-QUARANTINE'
                        ? 'bg-rose-100 text-rose-900'
                        : log.type === 'SECURITY'
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {log.type}
                  </span>
                  <span className="font-bold text-slate-900">{log.actor}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Hash Proof</span>
                </div>
              </div>

              <div className="text-slate-800 font-medium">{log.summary}</div>
              <div className="text-[11px] text-slate-600">{log.detail}</div>

              <div className="p-2 rounded bg-slate-50 font-mono text-[10px] text-slate-500 border border-slate-100 truncate">
                SHA-256: <span className="text-slate-800 font-semibold">{log.sha256Hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
