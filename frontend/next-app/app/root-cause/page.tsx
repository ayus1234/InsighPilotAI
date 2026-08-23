"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { apiClient } from "@/lib/api";
import { InvestigationResponse, PersonaType, DriverRecord } from "@/lib/types";
import {
  formatCurrencyThousands,
  formatCurrencyMillions,
  formatPercent,
  formatConfidence,
} from "@/lib/formatters";
import {
  ListOrdered,
  GitFork,
  ArrowRight,
  Database,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ChevronRight,
  CheckCircle,
  Sliders,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function RootCausePage() {
  const [persona, setPersona] = useState<PersonaType>("CFO");
  const [data, setData] = useState<InvestigationResponse | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("atlanta_dc_stockout");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .getInvestigation("north_america_east_revenue", "NA-East", "2026-Q2", "2026-Q3")
      .then((res) => {
        setData(res);
        if (res.drivers && res.drivers.length > 0) {
          setSelectedDriverId(res.drivers[0].driver_id);
        }
      })
      .catch((e) => console.warn("Failed to load investigation:", e))
      .finally(() => setLoading(false));
  }, []);

  const drivers: DriverRecord[] = data?.drivers || [
    {
      driver_id: "atlanta_dc_stockout",
      driver_name: "Atlanta DC Stockout",
      rank: 1,
      contribution_pct: 43.2,
      impact_usd: -550000,
      confidence_score: 94,
      confidence_level: "HIGH",
      supporting_evidence_ids: ["EVID_ERP_ATL_STOCKOUT_001", "EVID_ZENDESK_ATL_DELAY_003"],
      controllability: "HIGH",
      category: "Supply Chain",
    },
    {
      driver_id: "sku_8821_sales_volume",
      driver_name: "SKU-8821 Sales Volume Contraction",
      rank: 2,
      contribution_pct: 26.7,
      impact_usd: -340000,
      confidence_score: 89,
      confidence_level: "HIGH",
      supporting_evidence_ids: ["EVID_CRM_SKU8821_SALES_004"],
      controllability: "MEDIUM",
      category: "Commercial Sales",
    },
    {
      driver_id: "distributor_orders",
      driver_name: "Distributor Purchase Order Deferral",
      rank: 3,
      contribution_pct: 18.8,
      impact_usd: -240000,
      confidence_score: 85,
      confidence_level: "HIGH",
      supporting_evidence_ids: ["EVID_CRM_PO_DEF_006"],
      controllability: "MEDIUM",
      category: "Distribution Channel",
    },
    {
      driver_id: "competitor_horizon_pricing",
      driver_name: "Competitor Horizon Pricing Pressure",
      rank: 4,
      contribution_pct: 11.3,
      impact_usd: -144000,
      confidence_score: 78,
      confidence_level: "MEDIUM",
      supporting_evidence_ids: ["EVID_MKT_HORIZON_PROMO_008"],
      controllability: "LOW",
      category: "Market Competition",
    },
  ];

  const selectedDriver = drivers.find((d) => d.driver_id === selectedDriverId) || drivers[0];

  const driverDescriptions: Record<string, { summary: string; operationalContext: string; mitigation: string }> = {
    atlanta_dc_stockout: {
      summary: "Stockouts in high-velocity SKUs dropped regional availability to 79.4% across 14 consecutive business days.",
      operationalContext: "ERP warehouse inventory feeds confirm zero inventory for flagship SKU-8821. Zendesk support recorded a 310% surge in unfulfilled order complaints.",
      mitigation: "Execute Emergency Inter-Facility Stock Transfer of 3,200 units from Chicago Central DC to Atlanta DC via expedited freight.",
    },
    sku_8821_sales_volume: {
      summary: "Flagship high-margin enterprise SKU experienced an 8.5% contraction in unit shipments across East territory.",
      operationalContext: "Commercial CRM records indicate direct correlation with warehouse stock depletion, leading Tier-1 accounts to pause reorders.",
      mitigation: "Deploy account executives with priority fulfillment guarantees to capture delayed commercial orders.",
    },
    distributor_orders: {
      summary: "29 major regional distributor purchase orders were deferred past the Q3 delivery window.",
      operationalContext: "EDI gateway telemetry shows PO status flagged as 'Supplier Delivery Delay', shifting revenue recognition into subsequent quarters.",
      mitigation: "Offer temporary volume rebates and dedicated dispatch coordination to secure immediate order releases.",
    },
    competitor_horizon_pricing: {
      summary: "Competitor Horizon Foods launched a 15% promotional discount across East Coast retail grocery channels.",
      operationalContext: "Automated competitor market scrape feeds detected price-matching pressure impacting regional sell-through elasticity.",
      mitigation: "Implement targeted point-of-sale promotions on bundle SKUs rather than engaging in direct margin-diluting price wars.",
    },
  };

  const selectedInfo = driverDescriptions[selectedDriver.driver_id] || driverDescriptions.atlanta_dc_stockout;

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          persona={persona}
          onPersonaChange={setPersona}
          breadcrumb="Root Cause Diagnosis"
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-error font-bold uppercase tracking-widest bg-error-container/20 border border-error/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Shortfall: -$1.23M (-7.97%)
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  North America East • 2026-Q3 vs 2026-Q2 Baseline
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
                Root Cause Multi-Factor Decomposition
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/decision-graph"
                className="px-4 py-2 bg-surface-container border border-primary/40 hover:bg-primary/10 text-primary rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                <GitFork className="w-4 h-4" />
                <span>Decision Graph</span>
              </Link>
              <Link
                href="/recommendations"
                className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
              >
                <span>Action Levers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Diagnostic Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Total Explored Deficit</div>
              <div className="font-display font-extrabold text-xl text-error">-$1.23M</div>
              <div className="text-[10px] font-mono text-on-surface-variant/70">$15.43M → $14.20M</div>
            </div>
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Explained Variance</div>
              <div className="font-display font-extrabold text-xl text-primary">100.0%</div>
              <div className="text-[10px] font-mono text-primary font-bold">4 Independent Drivers</div>
            </div>
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Average Confidence</div>
              <div className="font-display font-extrabold text-xl text-on-surface">86.5%</div>
              <div className="text-[10px] font-mono text-success font-bold">Deterministic Rigor</div>
            </div>
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Actionable Levers</div>
              <div className="font-display font-extrabold text-xl text-success">3 of 4</div>
              <div className="text-[10px] font-mono text-success font-bold">High / Med Controllability</div>
            </div>
          </div>

          {/* Drivers Grid + Interactive Deep Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Drivers List (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                  Ranked Explanatory Factors
                </span>
                <span className="text-[11px] font-mono text-on-surface-variant/70">Click driver to inspect</span>
              </div>

              {drivers.map((drv) => {
                const isSelected = selectedDriverId === drv.driver_id;
                return (
                  <div
                    key={drv.driver_id}
                    onClick={() => setSelectedDriverId(drv.driver_id)}
                    className={`glass-panel rounded-xl p-5 border transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary-container/10 ring-1 ring-primary/40 shadow-glow"
                        : "border-outline-variant hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-primary-container/30 border border-primary/40 flex items-center justify-center font-mono text-xs font-bold text-primary">
                          #{drv.rank}
                        </span>
                        <h4 className="font-display font-bold text-sm text-on-surface">{drv.driver_name}</h4>
                      </div>
                      <span className="font-mono text-xs font-extrabold text-error">
                        {formatCurrencyThousands(drv.impact_usd)}
                      </span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full bg-surface-dim h-2.5 rounded-full overflow-hidden my-3 border border-outline-variant/60">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${drv.contribution_pct}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                        <div className="text-[10px] text-on-surface-variant/70">Contribution</div>
                        <div className="font-bold text-primary">{formatPercent(drv.contribution_pct)}</div>
                      </div>
                      <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                        <div className="text-[10px] text-on-surface-variant/70">Confidence</div>
                        <div className="font-bold text-on-surface">{formatConfidence(drv.confidence_score)}</div>
                      </div>
                      <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                        <div className="text-[10px] text-on-surface-variant/70">Category</div>
                        <div className="font-bold text-secondary truncate">{drv.category}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Driver Inspection Panel (6 cols) */}
            <div className="lg:col-span-6 glass-panel rounded-xl p-6 border-primary/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded">
                        Rank #{selectedDriver.rank} Driver
                      </span>
                      <span className="text-[10px] font-mono text-secondary bg-secondary-container/20 px-2 py-0.5 rounded">
                        {selectedDriver.category}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-on-surface">
                      {selectedDriver.driver_name}
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-error font-extrabold text-lg">
                      {formatCurrencyThousands(selectedDriver.impact_usd)}
                    </div>
                    <div className="text-primary text-xs font-bold">
                      {formatPercent(selectedDriver.contribution_pct)} of total
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Finding Summary
                    </div>
                    <p className="text-xs text-on-surface leading-relaxed">{selectedInfo.summary}</p>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Operational Context & Telemetry
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{selectedInfo.operationalContext}</p>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-bold text-primary uppercase tracking-wider mb-1.5">
                      Recommended Strategic Mitigation
                    </div>
                    <p className="text-xs text-on-surface leading-relaxed p-3 rounded-lg bg-surface-dim border border-primary/30">
                      {selectedInfo.mitigation}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Corroborating Evidence Nodes ({selectedDriver.supporting_evidence_ids.length})
                    </div>
                    <div className="space-y-2">
                      {selectedDriver.supporting_evidence_ids.map((evId) => (
                        <div
                          key={evId}
                          className="p-3 rounded-lg bg-surface-dim border border-outline-variant flex items-center justify-between text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            <Database className="w-3.5 h-3.5 text-primary" />
                            <span className="text-primary font-bold">{evId}</span>
                          </div>
                          <Link
                            href={`/evidence?q=${encodeURIComponent(evId)}`}
                            className="text-primary hover:text-primary-dark font-semibold flex items-center gap-1 text-[11px]"
                          >
                            <span>Inspect Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                <span className="text-xs font-mono text-on-surface-variant">
                  Controllability: <strong className="text-on-surface">{selectedDriver.controllability}</strong>
                </span>
                <Link
                  href="/recommendations"
                  className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
                >
                  <span>View Levers & What-If</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
