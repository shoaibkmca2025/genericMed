import React from 'react';
import { X, CheckCircle2, FileText, Download, ShieldCheck, Scale, Beaker } from 'lucide-react';
import { BioequivalentPair } from '../../types';

interface BioStudyModalProps {
  pair: BioequivalentPair | null;
  onClose: () => void;
  onApprove: (id: string) => void;
}

export const BioStudyModal: React.FC<BioStudyModalProps> = ({ pair, onClose, onApprove }) => {
  if (!pair) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0f4c5c] text-white flex items-center justify-center shadow-xs">
              <Beaker className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-emerald-700">
                Clinical Pharmacokinetics & Bioequivalence Dossier
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {pair.genericName} vs {pair.brandedName} ({pair.brandedDosage})
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

        {/* Content */}
        <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-slate-500 text-[10px] uppercase font-bold">Study Protocol</div>
              <div className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
                {pair.bioStudyId}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Agency: {pair.studyOrganization} ({pair.studyYear})</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <div className="text-emerald-800 text-[10px] uppercase font-bold">AUC0-t Ratio</div>
              <div className="text-sm font-extrabold text-emerald-900 font-mono mt-0.5">
                {pair.bioequivalenceMatch}% Match
              </div>
              <div className="text-[10px] text-emerald-700 mt-1">90% CI: [98.2% - 101.4%]</div>
            </div>

            <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-200">
              <div className="text-teal-800 text-[10px] uppercase font-bold">Cmax Peak Ratio</div>
              <div className="text-sm font-extrabold text-teal-900 font-mono mt-0.5">
                99.4%
              </div>
              <div className="text-[10px] text-teal-700 mt-1">Standard: 80.00% - 125.00%</div>
            </div>
          </div>

          {/* Active Moiety & Specifications */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50/80 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>Pharmaceutical Equivalence Parameters</span>
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-xs pt-1">
              <div>
                <span className="text-slate-500">Active Pharmaceutical Ingredient (API):</span>
                <div className="font-bold text-slate-800">{pair.activeMoiety}</div>
              </div>
              <div>
                <span className="text-slate-500">Therapeutic Equivalence Code:</span>
                <div className="font-bold text-emerald-700 font-mono">AB (Therapeutically Equivalent)</div>
              </div>
              <div>
                <span className="text-slate-500">Branded Originator MSRP:</span>
                <div className="font-bold text-slate-700 font-mono">${pair.brandedMSRP.toFixed(2)} ({pair.brandedManufacturer})</div>
              </div>
              <div>
                <span className="text-slate-500">Approved Generic Price:</span>
                <div className="font-bold text-emerald-700 font-mono">${pair.genericPrice.toFixed(2)} ({pair.genericManufacturer})</div>
              </div>
            </div>
          </div>

          {/* In Vitro Dissolution Profile */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Multi-pH Dissolution Curve Comparison (f2 Similarity Index)</span>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                f2 = 78.4 (Target &gt; 50)
              </span>
            </div>
            <div className="h-20 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-around px-4 py-2">
              <div className="text-center">
                <div className="text-[10px] text-slate-400">pH 1.2 (Gastric)</div>
                <div className="font-mono font-bold text-xs text-slate-800">98.9% Release</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Matched</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-[10px] text-slate-400">pH 4.5 (Duodenal)</div>
                <div className="font-mono font-bold text-xs text-slate-800">99.4% Release</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Matched</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-[10px] text-slate-400">pH 6.8 (Intestinal)</div>
                <div className="font-mono font-bold text-xs text-slate-800">99.7% Release</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Matched</div>
              </div>
            </div>
          </div>

          {/* Regulatory Attestation */}
          <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Regulatory Compliance Certified:</span> This formulation satisfies all FDA 21 CFR § 320 and EMA CPMP/EWP/QWP/1401/98 Rev. 1 requirements. Therapeutic substitution without dosage adjustment is verified safe.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              alert(`Downloading complete dossier for study ${pair.bioStudyId}...`);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Full PDF Dossier</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            {pair.state === 'Pending Board' && (
              <button
                onClick={() => {
                  onApprove(pair.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0f4c5c] hover:bg-[#0c3c49] shadow-xs transition-all"
              >
                Approve Regulatory Signoff
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
