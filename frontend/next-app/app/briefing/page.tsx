"use client";

import React from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { FileText, Printer, CheckCircle, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ExecutiveBriefingPage() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona="CFO" onPersonaChange={() => {}} breadcrumb="Executive Decision Briefing" />
        <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-error font-bold uppercase tracking-widest bg-error-container/20 border border-error/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Boardroom Critical Briefing
                </span>
                <span className="text-xs font-mono text-on-surface-variant">Fiscal Period: 2026-Q3</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-on-surface">
                Executive Decision Briefing: North America East Revenue Decline
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
                onClick={() => alert("Actions approved! Workflows dispatched to ERP and CRM.")}
                className="px-5 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve Interventions</span>
              </button>
            </div>
          </div>

          {/* 5-Section Boardroom Presentation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* 1. Situation */}
            <div className="md:col-span-4 glass-panel rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant">
                  1. Situation
                </h3>
                <div className="font-display font-extrabold text-4xl text-error mb-2">-$1.23M</div>
                <div className="text-xs font-mono text-error font-bold mb-4">-7.97% shortfall vs Q2 baseline</div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                North America East region experienced revenue contraction from $15.43M to $14.20M in 2026-Q3, driven by multi-layered operational disruptions.
              </p>
            </div>

            {/* 2. Diagnosis */}
            <div className="md:col-span-8 glass-panel rounded-xl p-6">
              <h3 className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant">
                2. Diagnosis (Multi-Factor Drivers)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-xs font-bold text-on-surface mb-1">1. Atlanta DC Stockout (43.2%)</div>
                  <div className="text-[11px] text-error font-mono font-bold mb-2">-$550K Impact • 94% Confidence</div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Inventory depleted to zero for key high-velocity SKUs across 14 consecutive days.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-xs font-bold text-on-surface mb-1">2. SKU-8821 Volume (26.7%)</div>
                  <div className="text-[11px] text-error font-mono font-bold mb-2">-$340K Impact • 89% Confidence</div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    High margin flagship product volume dropped 8.5% across Tier-1 retail accounts.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Evidence */}
            <div className="md:col-span-4 glass-panel rounded-xl p-6">
              <h3 className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant">
                3. Verified Evidence
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded bg-surface-dim border border-outline-variant flex justify-between">
                  <span className="text-primary">EVID_ERP_ATL_STOCKOUT_001</span>
                  <span className="text-success">94%</span>
                </div>
                <div className="p-2 rounded bg-surface-dim border border-outline-variant flex justify-between">
                  <span className="text-secondary">EVID_ZENDESK_ATL_DELAY_003</span>
                  <span className="text-success">89%</span>
                </div>
                <div className="p-2 rounded bg-surface-dim border border-outline-variant flex justify-between">
                  <span className="text-on-surface">EVID_CRM_PO_DEF_006</span>
                  <span className="text-success">85%</span>
                </div>
              </div>
            </div>

            {/* 4. Recommended Actions & Impact */}
            <div className="md:col-span-8 glass-panel rounded-xl p-6 bg-gradient-to-r from-primary-container/20 via-surface-container to-surface">
              <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-wider mb-3 pb-2 border-b border-outline-variant">
                4. Strategic Action Plan & Forecasted Recovery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1">Projected Recovery</div>
                  <div className="font-display font-extrabold text-xl text-primary">+$484K</div>
                  <div className="text-[10px] text-on-surface-variant mt-1">Emergency Transfer</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1">Total Recovery Pool</div>
                  <div className="font-display font-extrabold text-xl text-success">+$757.6K</div>
                  <div className="text-[10px] text-on-surface-variant mt-1">Combined Levers</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1">Overall Confidence</div>
                  <div className="font-display font-extrabold text-xl text-on-surface">91% HIGH</div>
                  <div className="text-[10px] text-on-surface-variant mt-1">Deterministic Model</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
