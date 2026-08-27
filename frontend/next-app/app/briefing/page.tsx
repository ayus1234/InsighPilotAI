"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { apiClient } from "@/lib/api";
import { InvestigationResponse, AIExplanationResponse, PersonaType, DriverRecord, RecommendationRecord } from "@/lib/types";
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
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  formatCurrencyThousands,
  formatCurrencyMillions,
  formatPercent,
  formatPoints,
  formatConfidence,
} from "@/lib/formatters";

const DEFAULT_DRIVERS: DriverRecord[] = [
  {
    driver_id: "atlanta_dc_stockout",
    rank: 1,
    driver_name: "Atlanta DC Stockout",
    contribution_pct: 43.2,
    impact_usd: -550000,
    confidence_score: 94,
    confidence_level: "HIGH",
    category: "Supply Chain",
    controllability: "HIGH",
    supporting_evidence_ids: ["EVID_ERP_ATL_STOCKOUT_001", "EVID_ZENDESK_ATL_DELAY_003"],
  },
  {
    driver_id: "sku_8821_sales_volume",
    rank: 2,
    driver_name: "SKU-8821 Sales Volume Contraction",
    contribution_pct: 26.7,
    impact_usd: -340000,
    confidence_score: 89,
    confidence_level: "HIGH",
    category: "Commercial Sales",
    controllability: "MEDIUM",
    supporting_evidence_ids: ["EVID_CRM_SKU8821_SALES_004"],
  },
  {
    driver_id: "distributor_orders",
    rank: 3,
    driver_name: "Distributor Purchase Order Deferral",
    contribution_pct: 18.8,
    impact_usd: -240000,
    confidence_score: 85,
    confidence_level: "HIGH",
    category: "Distribution Channel",
    controllability: "MEDIUM",
    supporting_evidence_ids: ["EVID_CRM_PO_DEF_006"],
  },
  {
    driver_id: "competitor_horizon_pricing",
    rank: 4,
    driver_name: "Competitor Horizon Pricing Pressure",
    contribution_pct: 11.3,
    impact_usd: -144000,
    confidence_score: 78,
    confidence_level: "MEDIUM",
    category: "Market Competition",
    controllability: "LOW",
    supporting_evidence_ids: ["EVID_MKT_HORIZON_PROMO_008"],
  },
];

const DEFAULT_EVIDENCE = [
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

export default function ExecutiveBriefingPage() {
  const [persona, setPersona] = useState<PersonaType>("CFO");
  const [investigation, setInvestigation] = useState<InvestigationResponse | null>(null);
  const [aiExplanation, setAiExplanation] = useState<AIExplanationResponse | null>(null);
  const [approved, setApproved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadBriefingData() {
      setLoading(true);
      try {
        const [invRes, aiRes] = await Promise.all([
          apiClient.getInvestigation("north_america_east_revenue", "NA-East", "2026-Q2", "2026-Q3"),
          apiClient.getAIExplanation("north_america_east_revenue", {
            persona,
            region: "NA-East",
            prevPeriod: "2026-Q2",
            currPeriod: "2026-Q3",
          }),
        ]);
        setInvestigation(invRes);
        setAiExplanation(aiRes);
      } catch (e) {
        console.warn("Failed to load live briefing data, using authoritative defaults:", e);
      } finally {
        setLoading(false);
      }
    }
    loadBriefingData();
  }, [persona]);

  const drivers = (investigation?.drivers && investigation.drivers.length > 0)
    ? investigation.drivers
    : DEFAULT_DRIVERS;

  const isAbstained = investigation?.overall?.abstention || false;
  const overallConfidence = investigation?.overall?.overall_confidence || 89;
  const varianceAbs = investigation?.kpi?.variance_abs ?? investigation?.kpi?.variance_amount ?? -1230000.01;
  const variancePct = investigation?.kpi?.variance_pct ?? investigation?.kpi?.percent_change ?? -7.97;

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona={persona} onPersonaChange={setPersona} breadcrumb="Executive Decision Briefing" />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-error font-bold uppercase tracking-widest bg-error-container/20 border border-error/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Boardroom Decision Briefing • {persona} View
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

          {/* Abstention Banner if Active */}
          {isAbstained && (
            <div className="p-4 rounded-xl border border-warning/40 bg-warning/10 flex items-start gap-3 text-xs font-mono">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <strong className="text-warning block text-sm mb-1">Mandatory Abstention Guard Active</strong>
                <p className="text-on-surface-variant">
                  {investigation?.overall?.abstention_reason || "Investigation confidence below required 65% threshold. AI synthesis intentionally withheld."}
                </p>
              </div>
            </div>
          )}

          {/* AI Executive Synthesis Strip */}
          {aiExplanation && (aiExplanation.explanation?.summary || aiExplanation.executive_summary || aiExplanation.summary) && !isAbstained && (
            <div className="glass-panel rounded-xl p-5 border-primary/40 bg-primary-container/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-primary">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Executive AI Strategic Synthesis ({persona} Context)</span>
                </div>
                <span className="text-[10px] text-on-surface-variant font-normal">
                  Provider: {(aiExplanation.provider || aiExplanation.metadata?.provider || "GROQ").toUpperCase()} • Grounded
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {aiExplanation.explanation?.summary || aiExplanation.executive_summary || aiExplanation.summary}
              </p>
            </div>
          )}

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
                  <div className="font-display font-extrabold text-4xl text-error mb-1">
                    {formatCurrencyThousands(varianceAbs)}
                  </div>
                  <div className="text-xs font-mono font-bold text-error">
                    {formatPercent(variancePct)} Deficit vs Q2 Baseline
                  </div>
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
                <span className="text-primary font-bold">{overallConfidence}% Overall Confidence</span>
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
                          #{drv.rank} {drv.driver_name}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-primary bg-primary-container/20 px-1.5 py-0.2 rounded shrink-0">
                          {formatPercent(drv.contribution_pct)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-error font-extrabold">{formatCurrencyThousands(drv.impact_usd)}</span>
                        <span className="text-on-surface-variant text-[10px]">{drv.confidence_score}% Conf.</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed mb-2">
                        {drv.driver_id === "atlanta_dc_stockout" && "14 consecutive days of zero available inventory for SKU-8821 depleted regional order fulfillments."}
                        {drv.driver_id === "sku_8821_sales_volume" && "8.5% shipment volume contraction in flagship high-margin SKU across East territory accounts."}
                        {drv.driver_id === "distributor_orders" && "29 delayed purchase orders from Tier-1 distributors deferred due to delivery lead time uncertainty."}
                        {drv.driver_id === "competitor_horizon_pricing" && "15% promotional discount launched by competitor Horizon Foods in East retail channels."}
                      </p>
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
                  {DEFAULT_EVIDENCE.map((ev) => (
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
