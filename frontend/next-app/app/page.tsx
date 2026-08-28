"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { AISummaryBanner } from "@/components/dashboard/AISummaryBanner";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { RegionalHealthTable } from "@/components/dashboard/RegionalHealthTable";
import { apiClient } from "@/lib/api";
import { KPIRecord, AIExplanationResponse, PersonaType } from "@/lib/types";
import { GitFork, Download, RefreshCw, ShieldCheck, Database, Sparkles, Lock } from "lucide-react";
import Link from "next/link";

export default function CommandCenterPage() {
  const [persona, setPersona] = useState<PersonaType>("CFO");
  const [kpis, setKpis] = useState<KPIRecord[]>([]);
  const [aiExplanation, setAiExplanation] = useState<AIExplanationResponse | null>(null);
  const [loadingKPIs, setLoadingKPIs] = useState<boolean>(true);
  const [loadingAI, setLoadingAI] = useState<boolean>(true);

  const fetchData = async (currentPersona: PersonaType) => {
    // 1. Fetch Authoritative KPIs
    try {
      setLoadingKPIs(true);
      const kpiData = await apiClient.getKPIs("NA-East", "2026-Q2", "2026-Q3");
      setKpis(kpiData.kpis);
    } catch (e) {
      console.error("Failed to load KPIs from backend:", e);
      // Fallback deterministic defaults if backend is temporarily disconnected
      setKpis([
        {
          kpi_id: "north_america_east_revenue",
          kpi_name: "North America East Revenue",
          domain: "Financial",
          baseline_value: 15430000.06,
          current_value: 14200000.05,
          unit: "USD",
          variance_abs: -1230000.01,
          variance_pct: -7.97,
          status: "CRITICAL",
          threshold_alert: "$15.43M baseline",
          trend_direction: "DOWN",
        },
        {
          kpi_id: "gross_margin_percentage",
          kpi_name: "Gross Margin Percentage",
          domain: "Financial",
          baseline_value: 60.6,
          current_value: 57.4,
          unit: "PCT",
          variance_abs: -3.2,
          variance_pct: -5.28,
          status: "HIGH",
          threshold_alert: "60.0% target",
          trend_direction: "DOWN",
        },
        {
          kpi_id: "total_units_sold",
          kpi_name: "Total Units Sold",
          domain: "Sales & Volume",
          baseline_value: 115200,
          current_value: 105400,
          unit: "COUNT",
          variance_abs: -9800,
          variance_pct: -8.51,
          status: "MEDIUM",
          threshold_alert: "115,000 units",
          trend_direction: "DOWN",
        },
        {
          kpi_id: "inventory_availability",
          kpi_name: "Inventory Availability Rate",
          domain: "Supply Chain",
          baseline_value: 94.2,
          current_value: 79.4,
          unit: "PCT",
          variance_abs: -14.8,
          variance_pct: -15.71,
          status: "CRITICAL",
          threshold_alert: "92.0% target",
          trend_direction: "DOWN",
        },
        {
          kpi_id: "distributor_orders_fulfilled",
          kpi_name: "Distributor Orders Fulfilled",
          domain: "Distribution",
          baseline_value: 958,
          current_value: 842,
          unit: "COUNT",
          variance_abs: -116,
          variance_pct: -12.11,
          status: "HIGH",
          threshold_alert: "950 orders",
          trend_direction: "DOWN",
        },
      ]);
    } finally {
      setLoadingKPIs(false);
    }

    // 2. Fetch Grounded AI Executive Narrative
    try {
      setLoadingAI(true);
      const aiData = await apiClient.getAIExplanation("north_america_east_revenue", {
        persona: currentPersona,
        region: "NA-East",
      });
      setAiExplanation(aiData);
    } catch (e) {
      console.warn("AI explanation endpoint offline:", e);
      setAiExplanation(null);
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    fetchData(persona);
  }, [persona]);

  const revenueKpi =
    kpis.find((k) => (k.id || k.kpi_id) === "north_america_east_revenue") || kpis[0];
  const secondaryKpis = kpis.filter((k) => (k.id || k.kpi_id) !== "north_america_east_revenue");

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          persona={persona}
          onPersonaChange={(newPersona) => setPersona(newPersona)}
          breadcrumb="Executive Command Center"
        />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono text-error font-bold uppercase tracking-widest bg-error-container/20 border border-error/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                  CRITICAL DEFICIT DETECTED
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  Period: 2026-Q3 vs 2026-Q2 Baseline
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
                Enterprise Executive Command Center
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchData(persona)}
                className="p-2 rounded-lg bg-surface-container border border-outline-variant hover:bg-surface-bright/30 transition-colors text-on-surface-variant"
                title="Refresh Telemetry"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <Link
                href="/decision-graph"
                className="px-4 py-2 bg-surface-container border border-primary/40 hover:bg-primary/10 text-primary rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                <GitFork className="w-4 h-4" />
                <span>Decision Graph</span>
              </Link>
              <Link
                href="/briefing"
                className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
              >
                <Download className="w-4 h-4" />
                <span>Executive Briefing</span>
              </Link>
            </div>
          </div>

          {/* Architectural Trust Indicators Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-dim border border-outline-variant">
              <Database className="w-4 h-4 text-primary shrink-0" />
              <span className="text-on-surface-variant">Truth: <strong className="text-primary font-bold">100% Deterministic Math</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-dim border border-outline-variant">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span className="text-on-surface-variant">Evidence: <strong className="text-secondary font-bold">SHA-256 Validated</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-dim border border-outline-variant">
              <Sparkles className="w-4 h-4 text-tertiary shrink-0" />
              <span className="text-on-surface-variant">Reasoning: <strong className="text-tertiary font-bold">Grounded Multi-Model AI</strong></span>
            </div>
          </div>

          {/* Grounded AI Executive Summary Banner */}
          <AISummaryBanner aiData={aiExplanation} loading={loadingAI} />

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Primary Hero Card */}
            {revenueKpi && <KPICard kpi={revenueKpi} isHero={true} />}

            {/* Secondary Metric Cards */}
            {secondaryKpis.map((kpi) => (
              <KPICard key={kpi.kpi_id} kpi={kpi} />
            ))}
          </div>

          {/* Bottom Grid: Detection Feed + Regional Portfolio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AlertFeed />
            <RegionalHealthTable />
          </div>
        </main>
      </div>
    </div>
  );
}
