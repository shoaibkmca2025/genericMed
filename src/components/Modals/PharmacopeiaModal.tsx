import React from 'react';
import { X, BookOpen, CheckCircle, Scale, ShieldAlert, Award } from 'lucide-react';

interface PharmacopeiaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PharmacopeiaModal: React.FC<PharmacopeiaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0f4c5c] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-emerald-700">
                FR-COMP-01 Regulatory Benchmark
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Pharmacopeia Bioequivalence & Substitution Standards
              </h3>
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
        <div className="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
          <p className="text-slate-600 leading-relaxed">
            In accordance with FDA Orange Book regulations, EMA guideline CPMP/EWP/QWP/1401/98 Rev. 1, and the genericMed Product Requirements Document (FR-COMP-01), two medicinal products containing the same active substance are considered <strong>bioequivalent</strong> if their bioavailabilities after administration in the same molar dose lie within acceptable predefined limits.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>AUC (Extent of Absorption)</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                The 90% confidence interval for the ratio of the generic product to the reference originator product must fall completely within the bioequivalence interval of <strong>80.00% - 125.00%</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-700" />
                <span>Cmax (Peak Plasma Concentration)</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Cmax reflects rate of absorption. Acceptance criteria require standard 90% CI between <strong>80.00% - 125.00%</strong>, strictly governed across all canonical pairs.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <h4 className="font-bold text-slate-900">Therapeutic Equivalence Ratings Allowed on genericMed</h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">AB - Products meeting bioequivalence requirements:</span>
                <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  APPROVED (AUTOMATIC PAIRING)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">BX - Specific data insufficient for equivalence:</span>
                <span className="font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  BLOCKED (DISALLOW IN COMPARISON)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Narrow Therapeutic Index (NTI) Drugs:</span>
                <span className="font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  TIGHT 90.00% - 111.11% REQUIRED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0f4c5c] hover:bg-[#0c3c49]"
          >
            I Understand Standards
          </button>
        </div>
      </div>
    </div>
  );
};
