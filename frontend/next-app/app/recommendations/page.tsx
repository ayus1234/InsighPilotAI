"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { apiClient } from "@/lib/api";
import { RecommendationsResponse, SimulationResult, RecommendationRecord } from "@/lib/types";
import {
  formatCurrencyThousands,
  formatCurrencyMillions,
  formatPercent,
  formatPoints,
  formatConfidence,
} from "@/lib/formatters";
import {
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sliders,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  UserCheck,
  Check,
  Send,
  AlertCircle,
  FileCheck,
  Sparkles,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function RecommendationsPage() {
  const [sliderVal, setSliderVal] = useState<number>(90.0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [dispatched, setDispatched] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<RecommendationRecord[]>([]);

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
    assumptions: [
      "Linear inventory-to-revenue elasticity ratio of 0.73.",
      "Constant retail POS end-consumer brand demand baseline.",
      "Expedited freight transit latency of 48 hours Chicago → Atlanta.",
    ],
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    apiClient
      .getRecommendations("north_america_east_revenue", "NA-East")
      .then((res) => {
        if (res.recommendations && res.recommendations.length > 0) {
          setRecommendations(res.recommendations);
        }
      })
      .catch((e) => console.warn("Failed to load recommendations:", e));
  }, []);

  const handleSliderChange = async (newVal: number) => {
    setSliderVal(newVal);
    setIsSimulating(true);
    try {
      const res = await apiClient.simulateInventoryAvailability(newVal, "NA-East");
      setSimulation(res);
    } catch (e) {
      // Deterministic client fallback matching the backend elasticity equation
      const delta = newVal - 79.4;
      const rec = Math.max(0, delta * 32209.71);
      setSimulation({
        scenario_name: "Atlanta DC Inventory Optimization",
        region: "NA-East",
        input_availability_pct: newVal,
        baseline_availability_pct: 79.4,
        availability_delta_pts: parseFloat(delta.toFixed(1)),
        projected_recovery_usd: rec,
        projected_total_revenue_usd: 14200000.05 + rec,
        projected_margin_impact_pts: parseFloat((delta * 0.132).toFixed(1)),
        confidence_score: 91,
        assumptions: ["Linear elasticity ratio 0.73"],
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const defaultRecommendations = [
    {
      id: "REC-001",
      priority: "Priority 1 • Critical Action",
      title: "Emergency Inter-Facility Stock Transfer",
      category: "Supply Chain / Logistics",
      targetDriver: "Atlanta DC Stockout",
      recoveryUSD: 484000,
      marginLift: 1.2,
      timeframe: "14 Days",
      confidence: 91,
      owner: "VP Global Supply Chain & Logistics",
      description:
        "Reallocate 3,200 units of flagship SKU-8821 from Chicago Central DC to Atlanta DC via expedited freight to restore regional inventory availability from 79.4% to >90%.",
      levers: [
        "Issue expedited stock transfer order (STO-9921) from Chicago Central warehouse.",
        "Authorize dedicated team-driver freight with 48-hour delivery window.",
        "Configure automated replenishment reorder points at Atlanta DC to 1,200 safety units.",
      ],
    },
    {
      id: "REC-002",
      priority: "Priority 2 • High Action",
      title: "Targeted Distributor Recovery Outreach",
      category: "Commercial Channels",
      targetDriver: "Distributor Purchase Order Deferral",
      recoveryUSD: 180000,
      marginLift: 0.6,
      timeframe: "21 Days",
      confidence: 85,
      owner: "Director Commercial Accounts (East Territory)",
      description:
        "Deploy dedicated commercial account managers with priority delivery guarantees to capture 29 deferred distributor purchase orders before the quarterly close.",
      levers: [
        "Deploy account executives with verified delivery schedule commitments.",
        "Provide temporary 2.5% promotional freight rebate on deferred purchase orders.",
        "Establish EDI status webhook alerts for key distributor purchasing managers.",
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          persona="CFO"
          onPersonaChange={() => {}}
          breadcrumb="Recommendations & What-If Simulation"
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  Prescriptive Interventions Active
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  Total Financial Opportunity: +$757.6K • 2 Action Levers
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
                Strategic Action Plan & What-If Simulation
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDispatched(true)}
                disabled={dispatched}
                className={`px-4 py-2 font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                  dispatched
                    ? "bg-success-container/30 border border-success/40 text-success cursor-default"
                    : "bg-surface-container border border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                {dispatched ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                <span>{dispatched ? "Workflows Dispatched" : "Dispatch Actions"}</span>
              </button>
              <Link
                href="/briefing"
                className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow active:scale-[0.98]"
              >
                <span>Executive Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Strategic Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="glass-panel rounded-2xl p-6 border-primary/30 shadow-glow flex flex-col justify-between bg-gradient-to-br from-surface-container via-surface to-surface-dim"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-primary bg-primary-container/25 border border-primary/30 px-2.5 py-0.5 rounded uppercase">
                      {rec.priority}
                    </span>
                    <span className="text-xs font-mono font-bold text-success">
                      +{rec.marginLift} pts Margin Lift
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-on-surface mb-2">
                    {rec.title}
                  </h3>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {rec.description}
                  </p>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-mono mb-5">
                    <div className="p-3 rounded-xl bg-surface-dim border border-outline-variant">
                      <div className="text-[10px] text-on-surface-variant/70 mb-0.5">Projected Recovery</div>
                      <div className="font-display font-extrabold text-lg text-primary">{formatCurrencyThousands(rec.recoveryUSD)}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-dim border border-outline-variant">
                      <div className="text-[10px] text-on-surface-variant/70 mb-0.5">Confidence</div>
                      <div className="font-display font-extrabold text-lg text-on-surface">{rec.confidence}%</div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-dim border border-outline-variant">
                      <div className="text-[10px] text-on-surface-variant/70 mb-0.5">Timeframe</div>
                      <div className="font-display font-extrabold text-lg text-secondary">{rec.timeframe}</div>
                    </div>
                  </div>

                  {/* Levers List */}
                  <div className="space-y-2 mb-4">
                    <div className="text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                      Prescribed Action Steps:
                    </div>
                    {rec.levers.map((lever, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-surface-dim/80 border border-outline-variant/60 flex items-start gap-2.5 text-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="text-on-surface-variant text-[11px] leading-relaxed">{lever}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-secondary" />
                    <span>Owner: <strong className="text-on-surface">{rec.owner}</strong></span>
                  </div>
                  <span className="text-primary font-bold">Active</span>
                </div>
              </div>
            ))}
          </div>

          {/* Deterministic What-If Simulation Sandbox */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 border-primary/40 bg-gradient-to-r from-primary-container/15 via-surface-container to-surface shadow-glow">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-outline-variant gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-glow">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-on-surface">
                    Deterministic What-If Simulation Engine
                  </h3>
                  <p className="text-xs font-mono text-on-surface-variant">
                    Evaluates elasticity recovery curves over Atlanta DC inventory availability
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-primary bg-primary-container/20 border border-primary/30 px-3 py-1 rounded-full font-bold self-start md:self-auto">
                Elasticity Ratio: 0.73 • Deterministic Math
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Slider Controls (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface font-semibold">Target Inventory Availability:</span>
                  <span className="font-display font-extrabold text-3xl text-primary">{sliderVal.toFixed(1)}%</span>
                </div>

                <input
                  type="range"
                  min="75"
                  max="100"
                  step="0.5"
                  value={sliderVal}
                  onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                  className="w-full h-3 bg-surface-dim rounded-lg appearance-none cursor-pointer accent-primary border border-outline-variant"
                />

                <div className="flex justify-between text-[11px] font-mono text-on-surface-variant/80">
                  <span>Baseline: 79.4%</span>
                  <span className="text-primary font-bold">Benchmark Target: 90.0%</span>
                  <span>Full Recovery: 100.0%</span>
                </div>

                {/* Assumptions */}
                <div className="pt-3 border-t border-outline-variant/40 space-y-1 text-[11px] font-mono text-on-surface-variant/70">
                  <div className="font-bold text-on-surface-variant mb-1">Model Invariants & Assumptions:</div>
                  {simulation.assumptions.map((a, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulation Output Cards (6 cols) */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-3.5 text-center font-mono">
                <div className="p-4 rounded-xl bg-surface-dim border border-primary/30 shadow-glow flex flex-col justify-between">
                  <div className="text-[10px] text-on-surface-variant mb-1 uppercase font-bold">Projected Recovery</div>
                  <div className="font-display font-extrabold text-xl md:text-2xl text-primary my-2">
                    {formatCurrencyThousands(simulation.projected_recovery_usd)}
                  </div>
                  <div className="text-[10px] text-primary/80 font-bold">
                    +{(simulation.availability_delta_pts ?? 0) > 0 ? simulation.availability_delta_pts : 0} pts Avail
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant flex flex-col justify-between">
                  <div className="text-[10px] text-on-surface-variant mb-1 uppercase font-bold">Projected Revenue</div>
                  <div className="font-display font-extrabold text-xl md:text-2xl text-on-surface my-2">
                    {formatCurrencyMillions(simulation.projected_total_revenue_usd)}
                  </div>
                  <div className="text-[10px] text-on-surface-variant/70">vs $14.20M Q3</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant flex flex-col justify-between">
                  <div className="text-[10px] text-on-surface-variant mb-1 uppercase font-bold">Gross Margin Lift</div>
                  <div className="font-display font-extrabold text-xl md:text-2xl text-success my-2">
                    {formatPoints(simulation.projected_margin_impact_pts)}
                  </div>
                  <div className="text-[10px] text-success font-bold">{simulation.confidence_score}% Conf.</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
