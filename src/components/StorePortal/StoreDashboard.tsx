import React, { useState } from 'react';
import {
  Store,
  Package,
  Plus,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Clock,
  ShieldCheck,
  Edit2,
  Save,
  UserPlus,
  KeyRound,
} from 'lucide-react';
import { UserProfile } from '../../types';

interface StoreDashboardProps {
  currentUser?: UserProfile | null;
  onOpenAuth?: (tab?: 'login' | 'register') => void;
}

export const StoreDashboard: React.FC<StoreDashboardProps> = ({
  currentUser,
  onOpenAuth,
}) => {
  const [inventory, setInventory] = useState([
    {
      id: 'INV-101',
      name: 'Atorva 20mg (Atorvastatin)',
      stock: 140,
      price: 2.10,
      baselinePrice: 2.15,
      brandEquivalent: 'Lipitor 20mg ($14.50)',
      syncStatus: 'SYNCED',
      lastUpdated: '1m ago',
    },
    {
      id: 'INV-102',
      name: 'Moxikind-CV 625 (Amox + Clav)',
      stock: 85,
      price: 3.40,
      baselinePrice: 3.45,
      brandEquivalent: 'Augmentin 625mg ($12.80)',
      syncStatus: 'SYNCED',
      lastUpdated: '4m ago',
    },
    {
      id: 'INV-103',
      name: 'Clopilet 75mg (Clopidogrel)',
      stock: 62,
      price: 4.25,
      baselinePrice: 4.30,
      brandEquivalent: 'Plavix 75mg ($22.40)',
      syncStatus: 'SYNCED',
      lastUpdated: '12m ago',
    },
    {
      id: 'INV-104',
      name: 'Metformin 500mg SR',
      stock: 210,
      price: 0.65,
      baselinePrice: 0.68,
      brandEquivalent: 'Glucophage 500mg ($4.80)',
      syncStatus: 'SYNCED',
      lastUpdated: '18m ago',
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [guardrailWarning, setGuardrailWarning] = useState<string | null>(null);

  const startEdit = (item: typeof inventory[0]) => {
    setEditingId(item.id);
    setEditPrice(item.price);
    setEditStock(item.stock);
    setGuardrailWarning(null);
  };

  const handlePriceChange = (val: number, baseline: number) => {
    setEditPrice(val);
    const variance = ((val - baseline) / baseline) * 100;
    if (variance < -35) {
      setGuardrailWarning(
        `Warning: $${val.toFixed(2)} is ${Math.abs(variance).toFixed(0)}% below regional baseline ($${baseline.toFixed(2)}). This will trigger the Price Anomaly Radar "Flash Dump" flag and quarantine the listing!`
      );
    } else if (variance > 35) {
      setGuardrailWarning(
        `Warning: $${val.toFixed(2)} is ${variance.toFixed(0)}% above regional baseline ($${baseline.toFixed(2)}). This exceeds regional price ceilings and will be suppressed in customer search.`
      );
    } else {
      setGuardrailWarning(null);
    }
  };

  const saveEdit = (id: string) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: editPrice, stock: editStock, syncStatus: 'SYNCED', lastUpdated: 'Just now' } : item
      )
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase mb-1">
            <Store className="w-4 h-4" />
            <span>
              PARTNER PORTAL / TENANT: {currentUser?.tenantOrStoreName || '#TN-B-7740 (MetroGeneric Chemist)'}
              {currentUser?.licenseNumber && ` • Lic: ${currentUser.licenseNumber}`}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Pharmacy Inventory & Local Dispensing Console
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as <strong>{currentUser?.name || 'Authorized Pharmacist'}</strong> ({currentUser?.roleTitle || 'Superintendent Pharmacist'}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAuth && (
            <button
              onClick={() => onOpenAuth('register')}
              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-600" />
              <span>Register New Store / Branch</span>
            </button>
          )}
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>PostgreSQL RLS Partition: Isolated</span>
          </span>
        </div>
      </div>

      {/* Store SLA Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Delivery SLA</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">98.2%</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Tier 1 Partner Standard</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Average Dispatch Time</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">28m</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Target &lt; 35m</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Anomaly Violations</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">0 Active</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Clean guardrail history</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Redis Inventory Sync</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">0.8ms</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Real-time cache freshness</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-slate-900">Your Store's Active Generic Inventory</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">4 SKUs Managed</span>
        </div>

        {/* Guardrail Warning Banner if triggered */}
        {guardrailWarning && (
          <div className="p-3.5 bg-amber-50 border-b border-amber-200 text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Automated Price Guardrail Warning</div>
              <div className="text-[11px]">{guardrailWarning}</div>
            </div>
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {inventory.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                      {item.id}
                    </span>
                  </div>
                  <div className="text-slate-500 text-xs">
                    Originator Reference: <strong className="text-slate-700">{item.brandEquivalent}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Baseline Median: ${item.baselinePrice.toFixed(2)} • Last Synced: {item.lastUpdated}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {isEditing ? (
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Stock Units</span>
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(Number(e.target.value))}
                          className="w-20 px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Your Price ($)</span>
                        <input
                          type="number"
                          step="0.05"
                          value={editPrice}
                          onChange={(e) => handlePriceChange(Number(e.target.value), item.baselinePrice)}
                          className="w-24 px-2 py-1 border border-slate-300 rounded font-mono text-xs font-bold text-slate-900"
                        />
                      </div>
                      <button
                        onClick={() => saveEdit(item.id)}
                        className="p-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 mt-3.5 shadow-2xs"
                        title="Save Changes"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Stock Available</div>
                        <div className="font-mono font-bold text-slate-800 text-sm">{item.stock} Units</div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Listing Price</div>
                        <div className="font-mono font-extrabold text-emerald-700 text-base">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Edit Price and Stock"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
