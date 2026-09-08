import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Database,
  Cpu,
  Radio,
  Server,
  Terminal,
  Lock,
  Zap,
  CheckCircle2,
  ExternalLink,
  ArrowDown,
  ArrowRight,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'gateway' | 'services' | 'cache' | 'database' | 'audit'>('database');

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase mb-1">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>PRD & SYSTEM ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            genericMed Multi-Tenant System Architecture
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end blueprint illustrating client ingress, algorithmic microservices, Redis L2 caching, and PostgreSQL Row-Level Security (RLS).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Architecture v4.19 Certified</span>
          </span>
        </div>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Layer Diagram (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Layer 1: Client Interfaces */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-400">1. Client Applications Layer</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="font-bold text-slate-800">Customer Marketplace</div>
                <div className="text-[10px] text-slate-500">React 19 / Tailwind / SPA</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="font-bold text-slate-800">Pharmacy Partner Console</div>
                <div className="text-[10px] text-slate-500">Inventory Sync & Pricing</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="font-bold text-slate-800">Regulatory Command Center</div>
                <div className="text-[10px] text-slate-500">Bioequivalence Governance</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 2: API Gateway & Security Ingress */}
          <div
            onClick={() => setActiveLayer('gateway')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeLayer === 'gateway'
                ? 'border-emerald-500 bg-emerald-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase font-bold text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>2. API Gateway & Security Ingress Layer</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Rate Limits: 10,000 req/min</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">Cloudflare WAF</div>
                <div className="text-[10px] text-slate-400">DDoS & Bot Mitigation</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">Kong Gateway</div>
                <div className="text-[10px] text-slate-400">JWT / Tenant Routing</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">IAM & RBAC Filter</div>
                <div className="text-[10px] text-slate-400">Inject app.current_tenant_id</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 3: Microservices Core */}
          <div
            onClick={() => setActiveLayer('services')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeLayer === 'services'
                ? 'border-emerald-500 bg-emerald-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase font-bold text-emerald-800 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>3. Algorithmic Domain Microservices Layer</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Node Cluster: us-east-04</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">Bioequivalence Engine</div>
                <div className="text-[10px] text-slate-400">FDA Orange Book Sync</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">Price Arbitrage Engine</div>
                <div className="text-[10px] text-slate-400">±35% Anomaly Radar</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">Tenant Verification</div>
                <div className="text-[10px] text-slate-400">State Drug Board Verifier</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 4: Caching & Message Queue */}
          <div
            onClick={() => setActiveLayer('cache')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeLayer === 'cache'
                ? 'border-emerald-500 bg-emerald-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase font-bold text-amber-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>4. High-Throughput Caching & Streaming Bus</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Latency: 0.8ms</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">Redis Cluster (L2 Cache)</div>
                <div className="text-[10px] text-slate-400">Real-time store pricing & inventory lookups</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                <div className="font-bold">Apache Kafka Event Bus</div>
                <div className="text-[10px] text-slate-400">Price anomaly event stream & telemetry queue</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 5: Storage & Multi-Tenant RLS */}
          <div
            onClick={() => setActiveLayer('database')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeLayer === 'database'
                ? 'border-emerald-500 bg-emerald-50/20 shadow-xs ring-1 ring-emerald-400'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase font-bold text-emerald-800 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-700" />
                <span>5. Multi-Tenant Persistence & Row-Level Security (RLS)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">STRICT PARTITIONING</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[10px] mt-2 leading-relaxed">
              CREATE POLICY tenant_isolation_policy ON regional_inventory FOR ALL USING (tenant_id = current_setting('app.current_tenant_id'));
            </div>
          </div>

          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 6: Section 18 HIPAA Audit Stream */}
          <div
            onClick={() => setActiveLayer('audit')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeLayer === 'audit'
                ? 'border-emerald-500 bg-emerald-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>6. Immutable Audit Stream & Compliance Ledger</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">SHA-256 Chained Hash</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Cryptographically signs every clinical signoff, price freeze, and partner license authorization.
            </div>
          </div>
        </div>

        {/* Deep Dive Specification Details (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-emerald-800 font-mono">
                Component Specification
              </div>
              <h3 className="text-base font-extrabold text-slate-900 capitalize">
                {activeLayer === 'database'
                  ? 'Multi-Tenant PostgreSQL & RLS'
                  : activeLayer === 'gateway'
                  ? 'API Gateway & Ingress Security'
                  : activeLayer === 'services'
                  ? 'Domain Microservices Engine'
                  : activeLayer === 'cache'
                  ? 'Redis L2 Cache & Kafka Bus'
                  : 'SHA-256 Immutable Audit Ledger'}
              </h3>
            </div>

            {activeLayer === 'database' && (
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  <strong>Shared Database, Isolated Tables:</strong> Every pharmacy tenant shares the same PostgreSQL tables (e.g. <code>regional_inventory</code>, <code>tenant_orders</code>).
                </p>
                <p>
                  <strong>Zero Cross-Tenant Leakage:</strong> Enforced by Postgres kernel-level Row-Level Security policies. Queries automatically inject <code>tenant_id</code> verified by the signed IAM JWT.
                </p>
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px]">
                  <strong>PRD Requirement NFR-SEC-01:</strong> 100% tenant isolation with automated tamper detection.
                </div>
              </div>
            )}

            {activeLayer === 'services' && (
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  <strong>Bioequivalence Matching:</strong> Integrates daily with FDA Orange Book and EMA CPMP guidelines to calculate 90% CI for AUC and Cmax.
                </p>
                <p>
                  <strong>Autonomous Price Radar:</strong> Evaluates regional median prices across a ±35% guardrail window to identify flash dumps or price-gouging.
                </p>
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px]">
                  <strong>PRD Requirement FR-COMP-01:</strong> Regulatory consensus and clinical board signoff queues.
                </div>
              </div>
            )}

            {activeLayer === 'cache' && (
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  <strong>Redis L2 Cache:</strong> Caches customer search results and pricing tables with a 5-minute TTL.
                </p>
                <p>
                  <strong>Kafka Ingestion Bus:</strong> Streams 1,420 pharmacy store price updates asynchronously without overwhelming the core database.
                </p>
              </div>
            )}

            {activeLayer === 'gateway' && (
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  <strong>JWT Extraction:</strong> Extracts cryptographic identity, pharmacist license credentials, and assigned tenant cluster.
                </p>
                <p>
                  <strong>Rate Limiting:</strong> Enforces 10,000 req/min for web clients and 60 req/min for third-party automated scrapers.
                </p>
              </div>
            )}

            {activeLayer === 'audit' && (
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  <strong>HIPAA Section 18 Compliance:</strong> Every administrative alteration to formulations, store authorizations, or pricing freezes creates an immutable hashed record.
                </p>
                <p>
                  <strong>Proof of Non-Repudiation:</strong> Hashes are chained with previous block headers to prevent retroactive modifications.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
