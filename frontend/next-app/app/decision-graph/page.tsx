"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { GitFork, ArrowRight, ShieldCheck, Database, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DecisionGraphPage() {
  const [selectedNode, setSelectedNode] = useState<string>("driver-1");

  const nodes = [
    {
      id: "kpi-1",
      title: "North America East Revenue",
      type: "KPI Anomaly",
      val: "$14.20M (-7.97%)",
      color: "border-error/50 bg-error-container/10",
      desc: "Gross revenue contraction of -$1.23M in 2026-Q3 vs $15.43M Q2 baseline.",
    },
    {
      id: "driver-1",
      title: "Atlanta DC Stockout",
      type: "Primary Causal Driver",
      val: "43.2% (-$550K)",
      color: "border-primary/50 bg-primary-container/20",
      desc: "Stockouts in high-velocity SKUs dropped regional availability to 79.4%.",
    },
    {
      id: "evidence-1",
      title: "ERP Inventory Snapshot",
      type: "Empirical Evidence",
      val: "INV-SNAP-21971",
      color: "border-secondary/50 bg-secondary-container/20",
      desc: "Cryptographically verified ERP extract corroborating depletion.",
    },
    {
      id: "action-1",
      title: "Emergency Stock Transfer",
      type: "Prescriptive Lever",
      val: "+$484K Recovery",
      color: "border-success/50 bg-success-container/20",
      desc: "Inter-facility transfer from Chicago Central with priority expedited freight.",
    },
    {
      id: "outcome-1",
      title: "Projected Recovery",
      type: "Simulation Outcome",
      val: "+$341.4K (90% Avail)",
      color: "border-primary/50 bg-primary-container/20",
      desc: "Deterministic elasticity model projecting $14.54M revenue recovery.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona="CFO" onPersonaChange={() => {}} breadcrumb="Decision Graph" />
        <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full">
                  6-Column Presentation Topology
                </span>
                <span className="text-xs font-mono text-on-surface-variant">Validated Confidence: 89.0%</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-on-surface">
                Interactive Enterprise Decision Graph
              </h1>
            </div>
            <Link
              href="/recommendations"
              className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
            >
              <span>Review Levers & Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Graph Pipeline View */}
          <div className="glass-panel rounded-xl p-6 border-primary/30 relative overflow-hidden">
            <div className="text-xs font-mono text-on-surface-variant mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Causal Chain: KPI Anomaly → Drivers → Evidence → Interventions → Forecasted Outcome</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {nodes.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNode(n.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${n.color} ${
                    selectedNode === n.id ? "ring-2 ring-primary shadow-glow scale-[1.02]" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1">
                    {n.type}
                  </div>
                  <h4 className="font-display font-bold text-sm text-on-surface mb-2">{n.title}</h4>
                  <div className="text-xs font-mono font-extrabold text-primary mb-2">{n.val}</div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
