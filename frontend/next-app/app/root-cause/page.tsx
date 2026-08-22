"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { apiClient } from "@/lib/api";
import { InvestigationResponse, PersonaType } from "@/lib/types";
import { formatCurrencyThousands, formatPercent, formatConfidence } from "@/lib/formatters";
import { ListOrdered, GitFork, ArrowRight, Database, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function RootCausePage() {
  const [persona, setPersona] = useState<PersonaType>("CFO");
  const [data, setData] = useState<InvestigationResponse | null>(null);

  useEffect(() => {
    apiClient
      .getInvestigation("north_america_east_revenue", "NA-East", "2026-Q2", "2026-Q3")
      .then(setData)
      .catch((e) => console.warn("Failed to load investigation:", e));
  }, []);

  const drivers = data?.drivers || [
    {
      driver_id: "atlanta_dc_stockout",
      driver_name: "Atlanta DC Stockout",
      rank: 1,
      contribution_pct: 43.2,
      impact_usd: -550000,
      confidence_score: 94,
      confidence_level: "HIGH",
      supporting_evidence_ids: ["EVID_ERP_ATL_STOCKOUT_001"],
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

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona={persona} onPersonaChange={setPersona} breadcrumb="Root Cause Diagnosis" />
        <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-error font-bold uppercase tracking-widest bg-error-container/20 border border-error/30 px-2.5 py-0.5 rounded-full">
                  Deficit: -$1.23M (-7.97%)
                </span>
                <span className="text-xs font-mono text-on-surface-variant">North America East</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-on-surface">
                Root Cause Multi-Factor Decomposition
              </h1>
            </div>
            <Link
              href="/decision-graph"
              className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
            >
              <GitFork className="w-4 h-4" />
              <span>Explore Decision Graph</span>
            </Link>
          </div>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {drivers.map((drv) => (
              <div
                key={drv.driver_id}
                className="glass-panel rounded-xl p-5 border-outline-variant hover:border-primary/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary-container/30 border border-primary/40 flex items-center justify-center font-mono text-xs font-bold text-primary">
                        #{drv.rank}
                      </span>
                      <span className="text-xs font-semibold text-on-surface">{drv.driver_name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-error">
                      {formatCurrencyThousands(drv.impact_usd)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-surface-dim h-2 rounded-full overflow-hidden mb-3 border border-outline-variant">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${drv.contribution_pct}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono mb-4">
                    <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                      <div className="text-on-surface-variant/70 text-[10px]">Contribution</div>
                      <div className="font-bold text-primary">{formatPercent(drv.contribution_pct)}</div>
                    </div>
                    <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                      <div className="text-on-surface-variant/70 text-[10px]">Confidence</div>
                      <div className="font-bold text-on-surface">{formatConfidence(drv.confidence_score)}</div>
                    </div>
                    <div className="p-2 rounded bg-surface-dim border border-outline-variant">
                      <div className="text-on-surface-variant/70 text-[10px]">Controllability</div>
                      <div className="font-bold text-secondary">{drv.controllability}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                    <Database className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-[11px]">{drv.supporting_evidence_ids?.[0] || "EVID_VERIFIED"}</span>
                  </div>
                  <Link
                    href={`/evidence?q=${encodeURIComponent(drv.supporting_evidence_ids?.[0] || "")}`}
                    className="text-[11px] font-mono text-primary hover:text-primary-dark flex items-center gap-1 font-semibold"
                  >
                    <span>View Evidence</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
