"use client";

import React from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { Activity, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function InvestigationActivityPage() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona="CFO" onPersonaChange={() => {}} breadcrumb="AI Investigation Activity" />
        <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Multi-Agent Pipeline Active
                </span>
                <span className="text-xs font-mono text-on-surface-variant">Investigation ID: INV-2026-NAE-001</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-on-surface">
                Autonomous AI Investigation Activity
              </h1>
            </div>
            <Link
              href="/root-cause"
              className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
            >
              <span>View Diagnostic Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-panel rounded-xl p-6 border-primary/30">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-6">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-base text-on-surface">
                  Multi-Agent Orchestration Log
                </h3>
              </div>
              <span className="text-xs font-mono text-success bg-success-container/20 border border-success/30 px-3 py-1 rounded-full font-bold">
                SYSTEM STATUS: MISSION ACCOMPLISHED (89.0% Confidence)
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "01",
                  agent: "Anomaly Detection Agent",
                  status: "Completed",
                  desc: "Detected -7.97% (-$1.23M) revenue shortfall in North America East region across Q3.",
                  time: "10:42:01 AM",
                },
                {
                  step: "02",
                  agent: "Root Cause Decomposition Agent",
                  status: "Completed",
                  desc: "Decomposed variance into 4 distinct causal drivers: Atlanta DC stockout (43.2%), SKU-8821 volume (26.7%), PO deferral (18.8%), and Competitor pricing (11.3%).",
                  time: "10:42:04 AM",
                },
                {
                  step: "03",
                  agent: "Evidence Verification Agent",
                  status: "Completed",
                  desc: "Corroborated findings against 9 verified records across ERP inventory, Zendesk support CRM, EDI purchase orders, and market scrapes.",
                  time: "10:42:06 AM",
                },
                {
                  step: "04",
                  agent: "Prescriptive Recommendation Agent",
                  status: "Completed",
                  desc: "Synthesized 2 prioritized interventions (Emergency Stock Transfer +$484K, Distributor Outreach +$180K).",
                  time: "10:42:08 AM",
                },
              ].map((log) => (
                <div
                  key={log.step}
                  className="p-4 rounded-lg bg-surface-dim border border-outline-variant flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-primary-container/30 border border-primary/40 flex items-center justify-center font-mono text-xs font-bold text-primary shrink-0">
                      {log.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-on-surface">{log.agent}</span>
                        <span className="text-[10px] font-mono text-success bg-success-container/20 px-2 py-0.5 rounded">
                          {log.status}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{log.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-on-surface-variant/60 shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
