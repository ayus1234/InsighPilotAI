"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { apiClient } from "@/lib/api";
import { SimulationResult } from "@/lib/types";
import { formatCurrencyThousands, formatCurrencyMillions, formatPercent, formatPoints } from "@/lib/formatters";
import { Cpu, CheckCircle2, ArrowRight, Sliders, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function RecommendationsPage() {
  const [sliderVal, setSliderVal] = useState<number>(90.0);
  const [simulation, setSimulation] = useState<SimulationResult>({
    scenario_name: "Atlanta DC Inventory Optimization",
    region: "NA-East",
    input_availability_pct: 90.0,
    baseline_availability_pct: 79.4,
    availability_delta_pts: 10.6,
    projected_recovery_usd: 341422.91,
    projected_total_revenue_usd: 14541422.96,
    projected_margin_impact_pts: 1.4,
    confidence_score: 91,
    assumptions: ["Linear elasticity ratio 0.73"],
    timestamp: new Date().toISOString(),
  });

  const handleSliderChange = async (newVal: number) => {
    setSliderVal(newVal);
    try {
      const res = await apiClient.simulateInventoryAvailability(newVal, "NA-East");
      setSimulation(res);
    } catch (e) {
      console.warn("Simulation call failed, computing client fallback:", e);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona="CFO" onPersonaChange={() => {}} breadcrumb="Recommendations & Simulation" />
        <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full">
                  Prescriptive Interventions
                </span>
                <span className="text-xs font-mono text-on-surface-variant">Total Opportunity: +$757.6K</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-on-surface">
                Action Levers & Deterministic What-If Simulation
              </h1>
            </div>
            <Link
              href="/briefing"
              className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
            >
              <span>Export Executive Briefing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Recommendations Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="glass-panel rounded-xl p-5 border-primary/40 shadow-glow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-primary bg-primary-container/30 border border-primary/40 px-2 py-0.5 rounded uppercase">
                    Priority 1 • Critical
                  </span>
                  <span className="text-xs font-mono font-bold text-success">+1.2 pts Margin</span>
                </div>
                <h3 className="font-display font-bold text-base text-on-surface mb-2">
                  Emergency Inter-Facility Inventory Transfer
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Reallocate 3,200 units of SKU-8821 from Chicago Central DC to Atlanta DC via expedited freight to restore regional stock levels.
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-4">
                  <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70">Recovery</div>
                    <div className="font-bold text-primary">+$484K</div>
                  </div>
                  <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70">Confidence</div>
                    <div className="font-bold text-on-surface">91% HIGH</div>
                  </div>
                  <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70">Timeframe</div>
                    <div className="font-bold text-secondary">14 Days</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-5 border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-secondary bg-secondary-container/30 border border-secondary/40 px-2 py-0.5 rounded uppercase">
                    Priority 2 • High
                  </span>
                  <span className="text-xs font-mono font-bold text-success">+0.6 pts Margin</span>
                </div>
                <h3 className="font-display font-bold text-base text-on-surface mb-2">
                  Targeted Distributor Recovery Outreach
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Deploy dedicated account representatives with delivery guarantees to capture 29 deferred distributor purchase orders.
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-4">
                  <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70">Recovery</div>
                    <div className="font-bold text-primary">+$180K</div>
                  </div>
                  <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70">Confidence</div>
                    <div className="font-bold text-on-surface">85% HIGH</div>
                  </div>
                  <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                    <div className="text-[10px] text-on-surface-variant/70">Timeframe</div>
                    <div className="font-bold text-secondary">21 Days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live What-If Simulation Sandbox */}
          <div className="glass-panel rounded-xl p-6 border-primary/30 bg-gradient-to-r from-primary-container/10 via-surface-container to-surface">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-5">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-base text-on-surface">
                  Deterministic What-If Simulation Sandbox
                </h3>
              </div>
              <span className="text-xs font-mono text-primary font-bold">
                Backend Elasticity Engine Active
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant">Atlanta DC Inventory Availability:</span>
                  <span className="font-extrabold text-primary text-base">{sliderVal.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="100"
                  step="0.5"
                  value={sliderVal}
                  onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-surface-dim rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant/70">
                  <span>Baseline: 79.4%</span>
                  <span>Target: 90.0%</span>
                  <span>Max: 100.0%</span>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1">Projected Recovery</div>
                  <div className="font-display font-extrabold text-lg text-primary">
                    {formatCurrencyThousands(simulation.projected_recovery_usd)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1">Projected Revenue</div>
                  <div className="font-display font-extrabold text-lg text-on-surface">
                    {formatCurrencyMillions(simulation.projected_total_revenue_usd)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1">Margin Lift</div>
                  <div className="font-display font-extrabold text-lg text-success">
                    {formatPoints(simulation.projected_margin_impact_pts)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
