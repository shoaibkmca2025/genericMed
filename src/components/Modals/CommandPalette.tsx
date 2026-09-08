import React, { useState, useEffect } from 'react';
import { Search, X, Pill, Store, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { BioequivalentPair, PriceAnomalyAlert, StoreOnboardingItem } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  pairs: BioequivalentPair[];
  anomalies: PriceAnomalyAlert[];
  stores: StoreOnboardingItem[];
  onSelectPair: (pair: BioequivalentPair) => void;
  onNavigateMode: (mode: 'admin' | 'customer' | 'store' | 'architecture') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  pairs,
  anomalies,
  stores,
  onSelectPair,
  onNavigateMode,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPairs = pairs.filter(
    (p) =>
      p.brandedName.toLowerCase().includes(query.toLowerCase()) ||
      p.genericName.toLowerCase().includes(query.toLowerCase()) ||
      p.activeMoiety.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAnomalies = anomalies.filter(
    (a) =>
      a.storeName.toLowerCase().includes(query.toLowerCase()) ||
      a.medicineName.toLowerCase().includes(query.toLowerCase()) ||
      a.cluster.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStores = stores.filter(
    (s) =>
      s.storeName.toLowerCase().includes(query.toLowerCase()) ||
      s.licenseNumber.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
        {/* Search Input */}
        <div className="p-3.5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search medicines, canonical pairs, stores, anomaly alerts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 text-xs">
          {/* Quick Portal Switch */}
          <div className="p-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
              Portals & Navigation
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  onNavigateMode('admin');
                  onClose();
                }}
                className="p-2 rounded-lg text-left hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Governance & Ops Admin</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  onNavigateMode('customer');
                  onClose();
                }}
                className="p-2 rounded-lg text-left hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Customer Marketplace</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  onNavigateMode('store');
                  onClose();
                }}
                className="p-2 rounded-lg text-left hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Pharmacy Partner Portal</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  onNavigateMode('architecture');
                  onClose();
                }}
                className="p-2 rounded-lg text-left hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>System Architecture Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Medicines & Pairs */}
          {filteredPairs.length > 0 && (
            <div className="p-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                Canonical Pairs & Formulations ({filteredPairs.length})
              </div>
              {filteredPairs.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectPair(p);
                    onClose();
                  }}
                  className="p-2 rounded-lg hover:bg-emerald-50/70 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Pill className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">
                        {p.brandedName} {p.brandedDosage} → {p.genericName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {p.activeMoiety} • {p.bioequivalenceMatch}% Match • {p.savingsPercent}% Savings
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    ${p.genericPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Anomalies */}
          {filteredAnomalies.length > 0 && (
            <div className="p-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                Price Telemetry Alerts ({filteredAnomalies.length})
              </div>
              {filteredAnomalies.map((a) => (
                <div
                  key={a.id}
                  onClick={() => {
                    onNavigateMode('admin');
                    onClose();
                  }}
                  className="p-2 rounded-lg hover:bg-rose-50/70 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">
                        {a.storeName} ({a.cluster})
                      </div>
                      <div className="text-[11px] text-slate-500">{a.medicineName}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                    {a.type}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Stores */}
          {filteredStores.length > 0 && (
            <div className="p-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                Store Onboarding Records ({filteredStores.length})
              </div>
              {filteredStores.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onNavigateMode('admin');
                    onClose();
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Store className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">{s.storeName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{s.licenseNumber} • {s.cluster}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Navigate with mouse or keyboard</span>
          <span>Press <kbd className="font-mono bg-white px-1 py-0.5 rounded border">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
