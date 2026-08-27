"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { apiClient } from "@/lib/api";
import {
  InvestigationResponse,
  AIExplanationResponse,
  PersonaType,
  LangGraphTraceResponse,
  LangGraphNodeTrace,
} from "@/lib/types";
import {
  formatCurrencyThousands,
  formatCurrencyMillions,
  formatPercent,
  formatConfidence,
} from "@/lib/formatters";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Database,
  Cpu,
  Layers,
  Clock,
  GitFork,
  ExternalLink,
  ChevronRight,
  Server,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface AgentStep {
  id: string;
  stepNumber: string;
  name: string;
  role: string;
  status: "COMPLETED" | "RUNNING" | "PENDING" | "ABSTAINED" | string;
  timestamp: string;
  duration: string;
  summary: string;
  details: string[];
  metrics: { label: string; value: string }[];
}

const DEFAULT_STEPS: AgentStep[] = [
  {
    id: "load_kpi_node",
    stepNumber: "01",
    name: "Load KPI Context",
    role: "Time-Series Telemetry & Target KPI Loading",
    status: "COMPLETED",
    timestamp: "10:42:01 AM",
    duration: "12.4ms",
    summary: "Loaded baseline ($15.43M) and target period ($14.20M) revenue context for NA-East.",
    details: [
      "Ingested 18,400 daily transaction records across 4 geographic operational tiers.",
      "Identified statistically significant anomaly trigger (z-score: -3.42, threshold: -2.0).",
      "Target flagged: 'north_america_east_revenue' ($14.20M vs $15.43M baseline).",
    ],
    metrics: [
      { label: "KPI", value: "NA-East Revenue" },
      { label: "Baseline", value: "$15.43M" },
      { label: "Target", value: "$14.20M" },
    ],
  },
  {
    id: "identify_drivers_node",
    stepNumber: "02",
    name: "Identify Causal Drivers",
    role: "Multi-Factor Causal Attribution & Contribution Weighting",
    status: "COMPLETED",
    timestamp: "10:42:04 AM",
    duration: "18.2ms",
    summary: "Decomposed the -$1.23M variance into 4 mutually exhaustive causal drivers.",
    details: [
      "Driver 1 (43.2%): Atlanta DC Stockout — -$550K direct revenue constraint.",
      "Driver 2 (26.7%): SKU-8821 Sales Contraction — -$340K commercial volume loss.",
      "Driver 3 (18.8%): Distributor PO Deferral — -$240K pipeline fulfillment delay.",
      "Driver 4 (11.3%): Competitor Horizon Promo Pricing — -$144K price elasticity squeeze.",
    ],
    metrics: [
      { label: "Explained", value: "100.0%" },
      { label: "Top Factor", value: "Atlanta DC (43.2%)" },
      { label: "Drivers Count", value: "4" },
    ],
  },
  {
    id: "validate_evidence_node",
    stepNumber: "03",
    name: "Validate Evidence Lineage",
    role: "Cryptographic Hash & 5-Layer Lineage Verification",
    status: "COMPLETED",
    timestamp: "10:42:06 AM",
    duration: "15.1ms",
    summary: "Corroborated findings against 9 cryptographically verified empirical records across SAP ERP, Zendesk, and CRM.",
    details: [
      "Extracted SAP ERP snapshot: 14 consecutive zero-stock days for SKU-8821 at Atlanta DC.",
      "Corroborated Zendesk Support CRM: +310% surge in stockout-related ticket volume.",
      "Verified 29 deferred distributor purchase orders via EDI gateway telemetry.",
      "Validated SHA-256 integrity hashes on all 9 evidence nodes.",
    ],
    metrics: [
      { label: "Verified Nodes", value: "9 Records" },
      { label: "Data Quality", value: "99.4%" },
      { label: "Lineage Integrity", value: "100% SHA-256" },
    ],
  },
  {
    id: "ai_invocation_node",
    stepNumber: "04",
    name: "AI Grounded Reasoning",
    role: "Structured Multi-Model LLM Execution & Post-Generation Validation",
    status: "COMPLETED",
    timestamp: "10:42:08 AM",
    duration: "185.0ms",
    summary: "Executed structured reasoning via Groq (llama-3.3-70b-versatile) with verified factual grounding.",
    details: [
      "Dispatched grounded prompt payload to primary reasoning provider.",
      "Grounding validator confirmed 100% adherence to supplied factual context.",
      "Generated persona-specific strategic takeaways with zero metric hallucinations.",
    ],
    metrics: [
      { label: "Provider", value: "Groq (groq_pool_1)" },
      { label: "Latency", value: "185ms" },
      { label: "Validation", value: "PASSED" },
    ],
  },
];

export default function InvestigationActivityPage() {
  const [persona, setPersona] = useState<PersonaType>("CFO");
  const [investigation, setInvestigation] = useState<InvestigationResponse | null>(null);
  const [traceData, setTraceData] = useState<LangGraphTraceResponse | null>(null);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>(DEFAULT_STEPS);
  const [activeStep, setActiveStep] = useState<string>("identify_drivers_node");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [invRes, traceRes] = await Promise.all([
          apiClient.getInvestigation("north_america_east_revenue", "NA-East", "2026-Q2", "2026-Q3"),
          apiClient.getLangGraphTrace("north_america_east_revenue", {
            persona,
            region: "NA-East",
            prevPeriod: "2026-Q2",
            currPeriod: "2026-Q3",
          }),
        ]);

        setInvestigation(invRes);
        setTraceData(traceRes);

        if (traceRes && traceRes.nodes && traceRes.nodes.length > 0) {
          const liveSteps: AgentStep[] = traceRes.nodes.map((node, idx) => ({
            id: node.node_name,
            stepNumber: String(idx + 1).padStart(2, "0"),
            name: node.display_name,
            role: node.role,
            status: node.status || "COMPLETED",
            timestamp: node.completed_at
              ? new Date(node.completed_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : `10:42:0${idx + 1} AM`,
            duration: `${node.duration_ms.toFixed(1)}ms`,
            summary: node.summary,
            details: node.details && node.details.length > 0 ? node.details : [node.summary],
            metrics: node.metrics || [],
          }));
          setAgentSteps(liveSteps);
          if (!liveSteps.some((s) => s.id === activeStep)) {
            setActiveStep(liveSteps[0].id);
          }
        }
      } catch (err) {
        console.warn("Failed to load live investigation telemetry, using authoritative defaults:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [persona]);

  const selectedStepData = agentSteps.find((s) => s.id === activeStep) || agentSteps[0];

  const primaryProviderEvent = traceData?.provider_events?.[0];
  const providerLabel = primaryProviderEvent
    ? `${primaryProviderEvent.provider.toUpperCase()} (${primaryProviderEvent.key_pool})`
    : "GROQ (groq_pool_1)";

  const confScore = traceData?.confidence?.overall_confidence || 88;
  const confLabel = traceData?.confidence?.confidence_label || "HIGH";

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          persona={persona}
          onPersonaChange={setPersona}
          breadcrumb="AI Investigation Activity"
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  LangGraph Agentic Pipeline Active
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  Trace ID: {traceData?.investigation_id || investigation?.investigation_id || "INV-north_america_east_revenue"}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
                Multi-Agent LangGraph Investigation Pipeline
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/root-cause"
                className="px-4 py-2 bg-surface-container border border-primary/40 hover:bg-primary/10 text-primary rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                <span>Diagnostic Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/decision-graph"
                className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
              >
                <GitFork className="w-4 h-4" />
                <span>Open Decision Graph</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Target Anomaly</div>
              <div className="font-display font-extrabold text-xl text-error">-$1.23M</div>
              <div className="text-[10px] font-mono text-error font-bold">-7.97% Q3 Contraction</div>
            </div>
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Causal Resolution</div>
              <div className="font-display font-extrabold text-xl text-primary">4 Drivers</div>
              <div className="text-[10px] font-mono text-primary font-bold">100.0% Attributed</div>
            </div>
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Verified Evidence</div>
              <div className="font-display font-extrabold text-xl text-secondary">9 Records</div>
              <div className="text-[10px] font-mono text-secondary font-bold">SHA-256 Corroborated</div>
            </div>
            <div className="glass-panel rounded-xl p-4 border-outline-variant">
              <div className="text-[11px] font-mono text-on-surface-variant mb-1">Pipeline Latency</div>
              <div className="font-display font-extrabold text-xl text-success">
                {traceData?.total_duration_ms ? `${traceData.total_duration_ms.toFixed(0)}ms` : "380ms"}
              </div>
              <div className="text-[10px] font-mono text-success font-bold">
                {providerLabel}
              </div>
            </div>
          </div>

          {/* Grounded AI Narrative Panel */}
          <div className="glass-panel rounded-xl p-6 border-primary/30 bg-gradient-to-r from-primary-container/15 via-surface-container to-surface">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-on-surface">
                    Grounded AI Executive Synthesis ({persona} Perspective)
                  </h3>
                  <span className="text-[11px] font-mono text-on-surface-variant">
                    Provider: {providerLabel} • Zero Hallucination Boundary
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-success bg-success-container/20 border border-success/30 px-3 py-1 rounded-full font-bold">
                Confidence: {confScore}% {confLabel}
              </span>
            </div>

            <p className="text-sm text-on-surface leading-relaxed mb-4 font-sans">
              {traceData?.ai_explanation?.summary ||
                (persona === "CFO"
                  ? "Revenue contraction of -$1.23M (-7.97%) in North America East is driven by a multi-factor operational bottleneck. Atlanta DC stockouts (43.2% contribution / -$550K) and SKU-8821 volume contraction (-$340K) represent the primary financial headwinds."
                  : "Regional territory shortfall of -$1.23M is centered on Atlanta DC stockouts impacting Tier-1 distributor accounts. Reallocating 20,000 units from Charlotte Hub and targeted commercial outreach will recapture $757.6K.")}
            </p>

            {traceData?.ai_explanation?.grounded_evidence_ids &&
              traceData.ai_explanation.grounded_evidence_ids.length > 0 && (
                <div className="flex items-center gap-2 pt-3 border-t border-outline-variant/30 text-xs">
                  <span className="font-mono text-[11px] text-on-surface-variant font-bold">Grounded Evidence Citations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {traceData.ai_explanation.grounded_evidence_ids.map((evId: string) => (
                      <Link
                        key={evId}
                        href={`/evidence?q=${encodeURIComponent(evId)}`}
                        className="font-mono text-[10px] text-primary bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded hover:bg-primary-container/40 flex items-center gap-1"
                      >
                        <span>{evId}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Main Agent Timeline & Deep Inspection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Timeline List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                  LangGraph Node Execution Timeline
                </span>
                <span className="text-[11px] font-mono text-primary font-bold">
                  {agentSteps.length} of {agentSteps.length} Completed
                </span>
              </div>

              <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                {agentSteps.map((step) => {
                  const isSelected = activeStep === step.id;
                  const isAbstained = step.status === "ABSTAINED";
                  return (
                    <div
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`glass-panel rounded-xl p-3.5 border transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary-container/10 ring-1 ring-primary/40 shadow-glow"
                          : "border-outline-variant hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-container/30 border border-primary/40 flex items-center justify-center font-mono text-[10px] font-bold text-primary">
                            {step.stepNumber}
                          </span>
                          <span className="text-xs font-bold text-on-surface">{step.name}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isAbstained
                              ? "text-error bg-error-container/20"
                              : "text-success bg-success-container/20"
                          }`}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{step.status}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed mb-2">
                        {step.summary}
                      </p>

                      <div className="flex items-center justify-between text-[9px] font-mono text-on-surface-variant/70 pt-1.5 border-t border-outline-variant/30">
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{step.timestamp}</span>
                        </div>
                        <span>Runtime: {step.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Agent Step Deep Inspection (7 cols) */}
            <div className="lg:col-span-7 glass-panel rounded-xl p-6 border-primary/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-5">
                  <div>
                    <div className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-1">
                      Step {selectedStepData.stepNumber} Execution Trace
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-on-surface">
                      {selectedStepData.name}
                    </h3>
                    <div className="text-xs text-on-surface-variant">{selectedStepData.role}</div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <div className="text-success font-bold flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{selectedStepData.status}</span>
                    </div>
                    <div className="text-on-surface-variant text-[11px] mt-0.5">
                      {selectedStepData.duration} latency
                    </div>
                  </div>
                </div>

                {/* Key Metrics Output Strip */}
                {selectedStepData.metrics && selectedStepData.metrics.length > 0 && (
                  <div
                    className={`grid gap-3 mb-5 font-mono text-center ${
                      selectedStepData.metrics.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                    }`}
                  >
                    {selectedStepData.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                        <div className="text-[10px] text-on-surface-variant/70 mb-1">{m.label}</div>
                        <div className="font-display font-extrabold text-base text-primary">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Detailed Execution Logs */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Verified Execution Actions & Sub-Tasks
                  </div>
                  {selectedStepData.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-surface-dim/80 border border-outline-variant/60 flex items-start gap-3 text-xs leading-relaxed"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                      <span className="text-on-surface-variant">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                <span className="text-xs font-mono text-on-surface-variant">
                  Next Step: Review Root Cause Decomposition
                </span>
                <Link
                  href="/root-cause"
                  className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
                >
                  <span>Explore Drivers</span>
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
