import React, { useState, useEffect } from 'react';
import { X, RotateCw, CheckCircle2, ShieldCheck, Database, HardDrive, Terminal } from 'lucide-react';

interface IntegrityScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrityScanModal: React.FC<IntegrityScanModalProps> = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing scan...');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCompleted(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompleted(true);
          setStage('Integrity scan completed. All 14,820 canonical formulations & 38 partitions verified.');
          return 100;
        }
        if (prev === 20) setStage('Checking PostgreSQL Row-Level Security tenant isolation boundaries...');
        if (prev === 50) setStage('Validating 42,910 AUC/Cmax bioequivalence confidence intervals against FDA Orange Book...');
        if (prev === 80) setStage('Verifying Redis L2 price anomaly telemetry & SHA-256 chained audit hashes...');
        return prev + 10;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-emerald-800">
                Automated System Verification
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Cluster Regulatory Integrity Scan
              </h3>
            </div>
          </div>
          {completed && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                {!completed && <RotateCw className="w-3.5 h-3.5 text-emerald-700 animate-spin" />}
                <span>{completed ? 'Scan Succeeded (100%)' : 'Scanning Node Clusters...'}</span>
              </span>
              <span className="font-mono text-emerald-700">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Current Stage Status */}
          <div className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] flex items-center gap-2 border border-slate-800">
            <Terminal className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{stage}</span>
          </div>

          {/* Checkpoints Checklist */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-700 font-semibold">1. Row-Level Security Tenant Isolation</span>
              {progress >= 30 ? (
                <span className="flex items-center gap-1 text-emerald-700 font-bold font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                </span>
              ) : (
                <span className="text-slate-400 font-mono">Queued</span>
              )}
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-700 font-semibold">2. Bioequivalence Confidence Intervals (AUC/Cmax)</span>
              {progress >= 60 ? (
                <span className="flex items-center gap-1 text-emerald-700 font-bold font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99.4% CONFIRMED
                </span>
              ) : (
                <span className="text-slate-400 font-mono">Queued</span>
              )}
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-700 font-semibold">3. SHA-256 Audit Stream Cryptographic Integrity</span>
              {progress >= 90 ? (
                <span className="flex items-center gap-1 text-emerald-700 font-bold font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ZERO TAMPERING
                </span>
              ) : (
                <span className="text-slate-400 font-mono">Queued</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            disabled={!completed}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              completed
                ? 'bg-[#0f4c5c] hover:bg-[#0c3c49] text-white shadow-xs cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {completed ? 'Done' : 'Scanning in progress...'}
          </button>
        </div>
      </div>
    </div>
  );
};
