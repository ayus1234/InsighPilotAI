"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import {
  FileText,
  Printer,
  CheckCircle,
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Database,
  Layers,
  Clock,
  UserCheck,
  Zap,
  Check,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  formatCurrencyThousands,
  formatCurrencyMillions,
  formatPercent,
  formatPoints,
  formatConfidence,
} from "@/lib/formatters";

export default function ExecutiveBriefingPage() {
  const [approved, setApproved] = useState<boolean>(false);

  const drivers = [
    {
      rank: 1,
      name: "Atlanta DC Stockout",
      share: 43.2,
      impact: -550000,
      confidence: 94,
      category: "Supply Chain",
      summary: "14 consecutive days of zero available inventory for SKU-8821 depleted regional order fulfillments.",
    },
    {
      rank: 2,
      name: "SKU-8821 Sales Volume Contraction",
      share: 26.7,
      impact: -340000,
      confidence: 89,
      category: "Commercial Sales",
      summary: "8.5% shipment volume contraction in flagship high-margin SKU across East territory accounts.",
    },
    {
      rank: 3,
      name: "Distributor Purchase Order Deferral",
      share: 18.8,
      impact: -240000,
      confidence: 85,
      category: "Distribution Channel",
      summary: "29 delayed purchase orders from Tier-1 distributors deferred due to delivery lead time uncertainty.",
    },
    {
      rank: 4,
      name: "Competitor Horizon Pricing Pressure",
      share: 11.3,
      impact: -144000,
      confidence: 78,
      category: "Market Competition",
      summary: "15% promotional discount launched by competitor Horizon Foods in East retail channels.",
    },
  ];

  const evidence = [
    {
      id: "EVID_ERP_ATL_STOCKOUT_001",
      system: "SAP S/4HANA ERP",
      finding: "14 consecutive days zero inventory at Atlanta DC.",
      confidence: 94,
      hash: "e3b0c442...991b7852b855",
    },
    {
      id: "EVID_ZENDESK_ATL_DELAY_003",
      system: "Zendesk Support CRM",
      finding: "+310% surge in order fulfillment escalations.",
      confidence: 89,
      hash: "8f434346...b2dc327aa4",
    },
    {
      id: "EVID_CRM_PO_DEF_006",
      system: "EDI Order Management",
      finding: "29 delayed distributor purchase orders ($240K total value).",
      confidence: 85,
      hash: "ca978112...807785afee48bb",
    },
    {
      id: "EVID_MKT_HORIZON_PROMO_008",
      system: "Competitive Intel Engine",
      finding: "15% promo discount detected across 18 regional chains.",
      confidence: 78,
      hash: "4b227777...531fcacdabf8a",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona="CFO" onPersonaChange={() => {}} breadcrumb="Executive Decision Briefing" />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-error font-bold uppercase tracking-widest bg-error-container/20 border border-error/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Boardroom Decision Briefing
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  Fiscal Period: 2026-Q3 vs 2026-Q2 Baseline
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
                Executive Decision Briefing: NA East Revenue Decline
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-surface-container border border-outline-variant hover:bg-surface-bright/20 text-on-surface rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Briefing</span>
              </button>
              <button
                onClick={() => setApproved(true)}
                disabled={approved}
                className={`px-5 py-2 font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                  approved
                    ? "bg-success-container/30 border border-success/40 text-success cursor-default"
                    : "bg-primary text-background hover:bg-primary-dark shadow-glow"
                }`}
              >
                {approved ? <Check className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                <span>{approved ? "Interventions Approved & Dispatched" : "Approve Strategic Actions"}</span>
              </button>
            </div>
          </div>

          {/* Section 1 & 2: Situation & Diagnosis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1. Situation (4 cols) */}
            <div className="lg:col-span-4 glass-panel rounded-xl p-6 border-outline-variant flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant flex items-center justify-between">
                  <span>1. Situation Summary</span>
                  <span className="text-error font-bold">Critical</span>
                </div>

                <div className="my-4">
                  <div className="text-xs font-mono text-on-surface-variant mb-1">Total Fiscal Shortfall</div>
                  <div className="font-display font-extrabold text-4xl text-error mb-1">-$1.23M</div>
                  <div className="text-xs font-mono font-bold text-error">-7.97% Deficit vs Q2 Baseline</div>
                </div>

                <div className="space-y-2 text-xs font-mono pt-3 border-t border-outline-variant/40">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Q2 Baseline:</span>
                    <span className="font-bold text-on-surface">$15.43M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Q3 Actual:</span>
                    <span className="font-bold text-error">$14.20M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Territory:</span>
                    <span className="font-bold text-primary">North America East</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed mt-4 pt-3 border-t border-outline-variant/30">
                Revenue contraction triggered automatic executive escalation. Anomaly isolated to supply chain fulfillment bottlenecks and commercial timing shifts.
              </p>
            </div>

            {/* 2. Diagnosis (8 cols) */}
            <div className="lg:col-span-8 glass-panel rounded-xl p-6 border-outline-variant">
              <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant flex items-center justify-between">
                <span>2. Multi-Factor Causal Diagnosis (100% Explained)</span>
                <span className="text-primary font-bold">86.5% Avg Confidence</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {drivers.map((drv) => (
                  <div
                    key={drv.rank}
                    className="p-3.5 rounded-lg bg-surface-dim border border-outline-variant flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-on-surface truncate">
                          #{drv.rank} {drv.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-primary bg-primary-container/20 px-1.5 py-0.2 rounded shrink-0">
                          {formatPercent(drv.share)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-error font-extrabold">{formatCurrencyThousands(drv.impact)}</span>
                        <span className="text-on-surface-variant text-[10px]">{drv.confidence}% Conf.</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed mb-2">{drv.summary}</p>
                    </div>

                    <div className="text-[10px] font-mono text-secondary pt-1.5 border-t border-outline-variant/30">
                      Category: {drv.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3 & 4: Evidence & Interventions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 3. Verified Evidence (5 cols) */}
            <div className="lg:col-span-5 glass-panel rounded-xl p-6 border-outline-variant flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant flex items-center justify-between">
                  <span>3. Verified Evidence Audit</span>
                  <span className="text-success font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SHA-256 Validated
                  </span>
                </div>

                <div className="space-y-2.5">
                  {evidence.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 rounded-lg bg-surface-dim border border-outline-variant text-xs font-mono"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-primary font-bold">{ev.id}</span>
                        <span className="text-success font-bold text-[10px]">{ev.confidence}% HIGH</span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mb-1 font-sans">{ev.finding}</div>
                      <div className="text-[10px] text-on-surface-variant/60 truncate">Hash: {ev.hash}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex justify-between items-center text-[11px] font-mono">
                <span className="text-on-surface-variant">9 total nodes in audit trail</span>
                <Link href="/evidence" className="text-primary hover:underline font-semibold flex items-center gap-1">
                  <span>Full Lineage</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 4. Strategic Actions & Recovery (7 cols) */}
            <div className="lg:col-span-7 glass-panel rounded-xl p-6 border-primary/40 bg-gradient-to-r from-primary-container/15 via-surface-container to-surface flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-primary uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant flex items-center justify-between">
                  <span>4. Strategic Action Plan & Recovery Potential</span>
                  <span className="text-success font-bold">+$757.6K Total Pool</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-surface-dim border border-primary/30 shadow-glow">
                    <div className="text-[10px] font-mono font-bold text-primary uppercase mb-1">
                      Action 1 • Priority Critical
                    </div>
                    <h4 className="font-display font-bold text-sm text-on-surface mb-2">
                      Emergency Inter-Facility Stock Transfer
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                      Transfer 3,200 units of SKU-8821 from Chicago Central DC to Atlanta DC via expedited freight.
                    </p>
                    <div className="flex justify-between items-center font-mono text-xs pt-2 border-t border-outline-variant/40">
                      <span className="text-primary font-bold">+$484K Recovery</span>
                      <span className="text-on-surface-variant text-[11px]">14 Days • 91% Conf.</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] font-mono font-bold text-secondary uppercase mb-1">
                      Action 2 • High Priority
                    </div>
                    <h4 className="font-display font-bold text-sm text-on-surface mb-2">
                      Targeted Distributor Outreach
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                      Deploy account executives with guaranteed delivery windows to capture 29 deferred distributor POs.
                    </p>
                    <div className="flex justify-between items-center font-mono text-xs pt-2 border-t border-outline-variant/40">
                      <span className="text-primary font-bold">+$180K Recovery</span>
                      <span className="text-on-surface-variant text-[11px]">21 Days • 85% Conf.</span>
                    </div>
                  </div>
                </div>

                {/* Outcome Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 text-center font-mono pt-3 border-t border-outline-variant/40">
                  <div className="p-2.5 rounded-lg bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70 mb-0.5">Combined Recovery</div>
                    <div className="font-display font-extrabold text-base text-primary">+$757.6K</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70 mb-0.5">Projected Revenue</div>
                    <div className="font-display font-extrabold text-base text-on-surface">$14.54M</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70 mb-0.5">Gross Margin Lift</div>
                    <div className="font-display font-extrabold text-base text-success">+1.4 pts</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/30 text-[11px] font-mono text-on-surface-variant flex justify-between">
                <span>Deterministic Elasticity Engine: Confirmed 91% Confidence</span>
                <Link href="/recommendations" className="text-primary hover:underline font-semibold flex items-center gap-1">
                  <span>Interactive Sandbox</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
