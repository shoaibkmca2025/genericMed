import React from 'react';
import { BadgeCheck, Store, ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StoreOnboardingItem } from '../../types';

interface PartnerVerificationViewProps {
  stores: StoreOnboardingItem[];
  onAuthorizeStore: (id: string) => void;
  onOpenStoreDocs: (store: StoreOnboardingItem) => void;
}

export const PartnerVerificationView: React.FC<PartnerVerificationViewProps> = ({
  stores,
  onAuthorizeStore,
  onOpenStoreDocs,
}) => {
  return (
    <div className="space-y-5 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase mb-1">
            <BadgeCheck className="w-4 h-4 text-emerald-700" />
            <span>FR-VEN-01 Compliance Workflow</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Partner & Store Verification Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Validate pharmacy drug licenses, tax credentials, and pharmacist-in-charge registration before issuing RLS tenant tokens.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Active Licensed Tenants</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">1,420</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">100% compliant with state pharmacy boards</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Pending Verification</div>
          <div className="text-2xl font-extrabold font-mono text-amber-700 mt-1">
            {stores.filter((s) => s.status === 'Awaiting Verification').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Dossiers submitted for regulatory signoff</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Average Onboarding Time</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">3.4 hrs</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Automated API verification with state boards</div>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="font-bold text-slate-900">Registered Pharmacy Tenant Applicants</span>
          <span className="text-[11px] font-mono text-slate-500">Showing {stores.length} store records</span>
        </div>

        <div className="divide-y divide-slate-100">
          {stores.map((store) => (
            <div key={store.id} className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">{store.storeName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {store.licenseNumber}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                    Cluster: {store.cluster}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      store.status === 'Tier 1 Partner'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {store.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-1 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>State Board: <strong className="text-slate-800">{store.stateBoardLicense}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tax TIN/EIN: <strong className="text-slate-800">{store.gstTaxCredentials}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Pharmacist ID: <strong className="text-slate-800">{store.pharmacistCouncilId}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-0.5">
                  <span>Delivery SLA: {store.deliverySla}%</span>
                  <span>•</span>
                  <span>Fulfillment Rate: {store.fulfillmentRate}%</span>
                  <span>•</span>
                  <span>Dispatch SLA: {store.avgDispatchTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenStoreDocs(store)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold shadow-2xs"
                >
                  Inspect Regulatory Docs
                </button>
                {store.status === 'Awaiting Verification' ? (
                  <button
                    onClick={() => onAuthorizeStore(store.id)}
                    className="px-4 py-2 rounded-lg bg-[#0f4c5c] hover:bg-[#0c3c49] text-white font-bold shadow-xs"
                  >
                    Authorize Tenant
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    Active Tenant Token
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
