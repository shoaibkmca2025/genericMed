import React from 'react';
import { X, CheckCircle2, ShieldCheck, FileCheck, Building, UserCheck } from 'lucide-react';
import { StoreOnboardingItem } from '../../types';

interface StoreDocsModalProps {
  store: StoreOnboardingItem | null;
  onClose: () => void;
  onAuthorize: (id: string) => void;
}

export const StoreDocsModal: React.FC<StoreDocsModalProps> = ({ store, onClose, onAuthorize }) => {
  if (!store) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-blue-700">
                Partner Licensing & Regulatory Dossier
              </div>
              <h3 className="text-base font-extrabold text-slate-900">{store.storeName}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Official Pharmacy Drug License</span>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {store.licenseNumber} (VALID)
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Verified with State Board of Pharmacy registry database. Permitted for Schedule H, H1 and generic prescription dispensing.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">Credential Verification Checklist</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <div>
                    <div className="font-semibold text-slate-800">State Pharmacy Board License</div>
                    <div className="text-[11px] text-slate-500">Registration #2026-9901-SPB</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-700">VALIDATED</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <div>
                    <div className="font-semibold text-slate-800">GST & Tax Entity Verification</div>
                    <div className="text-[11px] text-slate-500">Federal TIN / EIN Verified • 0 Low Value Rate (LVR) flags</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-700">CLEAN</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <div>
                    <div className="font-semibold text-slate-800">Pharmacist-in-Charge Council ID</div>
                    <div className="text-[11px] text-slate-500">Dr. Robert Vance, PharmD ({store.pharmacistCouncilId})</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-700">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Automated Background Check Passed:</span> Zero historical drug recall violations or disciplinary suspensions recorded in FDA MedWatch.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
          {store.status === 'Awaiting Verification' && (
            <button
              onClick={() => {
                onAuthorize(store.id);
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0f4c5c] hover:bg-[#0c3c49] shadow-xs"
            >
              Authorize & Issue API Partition Token
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
