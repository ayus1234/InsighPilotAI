"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import {
  GitFork,
  ArrowRight,
  ShieldCheck,
  Database,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Cpu,
  ExternalLink,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { formatCurrencyThousands, formatPercent, formatConfidence } from "@/lib/formatters";

interface GraphNode {
  id: string;
  column: number;
  columnTitle: string;
  title: string;
  type: "KPI" | "DRIVER" | "EVIDENCE" | "MECHANISM" | "ACTION" | "OUTCOME";
  category: string;
  primaryMetric: string;
  secondaryMetric?: string;
  confidence: number;
  description: string;
  status: "CRITICAL" | "HIGH" | "VERIFIED" | "ACTIVE" | "SUCCESS";
  evidenceId?: string;
  linkedParents: string[];
  linkedChildren: string[];
  hash?: string;
}

export default function DecisionGraphPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("drv-1");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const nodes: GraphNode[] = [
    // Column 1: KPI Anomaly
    {
      id: "kpi-1",
      column: 1,
      columnTitle: "1. KPI Anomaly",
      title: "North America East Revenue",
      type: "KPI",
      category: "Finance",
      primaryMetric: "$14.20M",
      secondaryMetric: "-$1.23M (-7.97%)",
      confidence: 100,
      description: "Q3 actual revenue was $14.20M against a baseline of $15.43M, triggering an enterprise critical anomaly alert.",
      status: "CRITICAL",
      linkedParents: [],
      linkedChildren: ["drv-1", "drv-2", "drv-3", "drv-4"],
    },

    // Column 2: Decomposition Drivers
    {
      id: "drv-1",
      column: 2,
      columnTitle: "2. Causal Drivers",
      title: "Atlanta DC Stockout",
      type: "DRIVER",
      category: "Supply Chain",
      primaryMetric: "43.2% Share",
      secondaryMetric: "-$550K Impact",
      confidence: 94,
      description: "Depleted inventory for SKU-8821 across 14 consecutive days created acute regional order backlogs.",
      status: "CRITICAL",
      evidenceId: "EVID_ERP_ATL_STOCKOUT_001",
      linkedParents: ["kpi-1"],
      linkedChildren: ["evid-1", "evid-2", "mech-1"],
    },
    {
      id: "drv-2",
      column: 2,
      columnTitle: "2. Causal Drivers",
      title: "SKU-8821 Volume Contraction",
      type: "DRIVER",
      category: "Commercial Sales",
      primaryMetric: "26.7% Share",
      secondaryMetric: "-$340K Impact",
      confidence: 89,
      description: "High margin flagship product volume dropped 8.5% across Tier-1 East territory retail accounts.",
      status: "HIGH",
      evidenceId: "EVID_CRM_SKU8821_SALES_004",
      linkedParents: ["kpi-1"],
      linkedChildren: ["evid-1", "mech-1"],
    },
    {
      id: "drv-3",
      column: 2,
      columnTitle: "2. Causal Drivers",
      title: "Distributor PO Deferral",
      type: "DRIVER",
      category: "Distribution Channel",
      primaryMetric: "18.8% Share",
      secondaryMetric: "-$240K Impact",
      confidence: 85,
      description: "29 delayed purchase orders deferred by Tier-1 distributors due to stockout delivery uncertainty.",
      status: "HIGH",
      evidenceId: "EVID_CRM_PO_DEF_006",
      linkedParents: ["kpi-1"],
      linkedChildren: ["evid-3", "mech-2"],
    },
    {
      id: "drv-4",
      column: 2,
      columnTitle: "2. Causal Drivers",
      title: "Competitor Horizon Promo",
      type: "DRIVER",
      category: "Market Competition",
      primaryMetric: "11.3% Share",
      secondaryMetric: "-$144K Impact",
      confidence: 78,
      description: "Competitor launched 15% discount campaign in East territory, exerting price elasticity pressure.",
      status: "HIGH",
      evidenceId: "EVID_MKT_HORIZON_PROMO_008",
      linkedParents: ["kpi-1"],
      linkedChildren: ["evid-4", "mech-2"],
    },

    // Column 3: Verified Empirical Evidence
    {
      id: "evid-1",
      column: 3,
      columnTitle: "3. Verified Evidence",
      title: "SAP ERP Inventory Telemetry",
      type: "EVIDENCE",
      category: "Supply Chain",
      primaryMetric: "14 Days Zero Stock",
      secondaryMetric: "SKU-8821 Depletion",
      confidence: 94,
      description: "Cryptographic ERP extract confirming zero inventory at Atlanta DC between Aug 10 and Aug 24.",
      status: "VERIFIED",
      evidenceId: "EVID_ERP_ATL_STOCKOUT_001",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      linkedParents: ["drv-1", "drv-2"],
      linkedChildren: ["mech-1", "act-1"],
    },
    {
      id: "evid-2",
      column: 3,
      columnTitle: "3. Verified Evidence",
      title: "Zendesk Support Escalations",
      type: "EVIDENCE",
      category: "Commercial Sales",
      primaryMetric: "+310% Tickets",
      secondaryMetric: "142 Backlog Reports",
      confidence: 89,
      description: "Customer service CRM telemetry logging unfulfilled order complaints from key regional accounts.",
      status: "VERIFIED",
      evidenceId: "EVID_ZENDESK_ATL_DELAY_003",
      hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      linkedParents: ["drv-1"],
      linkedChildren: ["mech-1", "act-1"],
    },
    {
      id: "evid-3",
      column: 3,
      columnTitle: "3. Verified Evidence",
      title: "EDI Purchase Order Telemetry",
      type: "EVIDENCE",
      category: "Distribution Channel",
      primaryMetric: "29 Deferred POs",
      secondaryMetric: "Delayed Releases",
      confidence: 85,
      description: "EDI gateway logs confirming distributor PO holds due to unconfirmed fulfillment dispatch dates.",
      status: "VERIFIED",
      evidenceId: "EVID_CRM_PO_DEF_006",
      hash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
      linkedParents: ["drv-3"],
      linkedChildren: ["mech-2", "act-2"],
    },
    {
      id: "evid-4",
      column: 3,
      columnTitle: "3. Verified Evidence",
      title: "Competitor Market Intelligence",
      type: "EVIDENCE",
      category: "Market Competition",
      primaryMetric: "-15% Promo Rate",
      secondaryMetric: "Horizon Scrape",
      confidence: 78,
      description: "Automated shelf-monitoring scrape corroborating promotional discount across East regional retailers.",
      status: "VERIFIED",
      evidenceId: "EVID_MKT_HORIZON_PROMO_008",
      hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      linkedParents: ["drv-4"],
      linkedChildren: ["mech-2"],
    },

    // Column 4: Causal Mechanism
    {
      id: "mech-1",
      column: 4,
      columnTitle: "4. Causal Mechanics",
      title: "Warehouse Depletion Cascade",
      type: "MECHANISM",
      category: "Supply Chain",
      primaryMetric: "79.4% Avail.",
      secondaryMetric: "Bottleneck",
      confidence: 93,
      description: "Stock depletion prevented order fulfillment, cascading directly into retail out-of-stock and lost sales volume.",
      status: "CRITICAL",
      linkedParents: ["evid-1", "evid-2"],
      linkedChildren: ["act-1"],
    },
    {
      id: "mech-2",
      column: 4,
      columnTitle: "4. Causal Mechanics",
      title: "Channel Confidence Erosion",
      type: "MECHANISM",
      category: "Distribution Channel",
      primaryMetric: "29 Orders Held",
      secondaryMetric: "Pipeline Friction",
      confidence: 86,
      description: "Uncertain delivery lead times caused distributors to pause purchase orders and consider alternative brands.",
      status: "HIGH",
      linkedParents: ["evid-3", "evid-4"],
      linkedChildren: ["act-2"],
    },

    // Column 5: Strategic Action Levers
    {
      id: "act-1",
      column: 5,
      columnTitle: "5. Recommended Actions",
      title: "Emergency Stock Transfer",
      type: "ACTION",
      category: "Supply Chain",
      primaryMetric: "+$484K Recovery",
      secondaryMetric: "Priority 1 • 14 Days",
      confidence: 91,
      description: "Reallocate 3,200 units of SKU-8821 from Chicago Central DC to Atlanta DC via expedited freight.",
      status: "ACTIVE",
      linkedParents: ["mech-1"],
      linkedChildren: ["out-1"],
    },
    {
      id: "act-2",
      column: 5,
      columnTitle: "5. Recommended Actions",
      title: "Targeted Distributor Outreach",
      type: "ACTION",
      category: "Distribution Channel",
      primaryMetric: "+$180K Recovery",
      secondaryMetric: "Priority 2 • 21 Days",
      confidence: 85,
      description: "Deploy commercial reps with priority delivery guarantees to capture 29 deferred distributor purchase orders.",
      status: "ACTIVE",
      linkedParents: ["mech-2"],
      linkedChildren: ["out-1"],
    },

    // Column 6: Predicted Outcome
    {
      id: "out-1",
      column: 6,
      columnTitle: "6. Predicted Outcome",
      title: "Projected Fiscal Recovery",
      type: "OUTCOME",
      category: "Finance",
      primaryMetric: "+$757.6K",
      secondaryMetric: "$14.54M Projected Rev",
      confidence: 91,
      description: "Deterministic elasticity model projects +$757.6K recovery and +1.4 pts gross margin improvement.",
      status: "SUCCESS",
      linkedParents: ["act-1", "act-2"],
      linkedChildren: [],
    },
  ];

  const filteredNodes = selectedCategory === "ALL"
    ? nodes
    : nodes.filter((n) => n.category === selectedCategory || n.column === 1 || n.column === 6);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  const columns = [
    { num: 1, title: "1. KPI Anomaly" },
    { num: 2, title: "2. Causal Drivers" },
    { num: 3, title: "3. Verified Evidence" },
    { num: 4, title: "4. Causal Mechanics" },
    { num: 5, title: "5. Action Levers" },
    { num: 6, title: "6. Predicted Outcome" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          persona="CFO"
          onPersonaChange={() => {}}
          breadcrumb="Decision Graph"
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5" />
                  6-Column Causal Topology
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  Grounded Decision Lineage: KPI → Drivers → Evidence → Mechanics → Actions → Outcome
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
                Enterprise Decision Graph
              </h1>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
              {["ALL", "Supply Chain", "Commercial Sales", "Distribution Channel", "Market Competition"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all text-[11px] whitespace-nowrap font-semibold ${
                    selectedCategory === cat
                      ? "bg-primary text-background border-primary shadow-glow font-bold"
                      : "bg-surface-dim border-outline-variant text-on-surface-variant hover:border-primary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 6-Column Interactive Graph Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 overflow-x-auto pb-4">
            {columns.map((col) => {
              const colNodes = filteredNodes.filter((n) => n.column === col.num);
              return (
                <div key={col.num} className="space-y-3 min-w-[180px]">
                  {/* Column Header */}
                  <div className="text-[11px] font-mono font-bold text-on-surface-variant/80 uppercase tracking-wider px-1 pb-1 border-b border-outline-variant/60">
                    {col.title}
                  </div>

                  {/* Node Cards in this Column */}
                  <div className="space-y-3">
                    {colNodes.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      const isRelated =
                        selectedNode.linkedParents.includes(node.id) ||
                        selectedNode.linkedChildren.includes(node.id);

                      let statusBadge = "border-outline-variant bg-surface-dim";
                      if (node.status === "CRITICAL") statusBadge = "border-error/50 bg-error-container/20 text-error";
                      if (node.status === "HIGH") statusBadge = "border-secondary/50 bg-secondary-container/20 text-secondary";
                      if (node.status === "VERIFIED") statusBadge = "border-primary/50 bg-primary-container/20 text-primary";
                      if (node.status === "ACTIVE") statusBadge = "border-primary/50 bg-primary-container/20 text-primary";
                      if (node.status === "SUCCESS") statusBadge = "border-success/50 bg-success-container/20 text-success";

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`glass-panel rounded-xl p-3.5 border transition-all cursor-pointer relative ${
                            isSelected
                              ? "border-primary ring-2 ring-primary bg-primary-container/15 shadow-glow scale-[1.02]"
                              : isRelated
                              ? "border-primary/60 bg-surface-dim/90 ring-1 ring-primary/30"
                              : "border-outline-variant/80 hover:border-primary/40 opacity-90 hover:opacity-100"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border font-bold truncate max-w-[110px] text-on-surface-variant bg-surface-container">
                              {node.category}
                            </span>
                            <span className="text-[9px] font-mono text-on-surface-variant font-bold">
                              {node.confidence}%
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-xs text-on-surface line-clamp-2 mb-2">
                            {node.title}
                          </h4>

                          <div className="font-mono text-xs font-extrabold text-primary mb-0.5">
                            {node.primaryMetric}
                          </div>

                          {node.secondaryMetric && (
                            <div className="font-mono text-[10px] text-on-surface-variant/80 truncate">
                              {node.secondaryMetric}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Node Detailed Inspector */}
          <div className="glass-panel rounded-xl p-6 border-primary/40 bg-gradient-to-r from-primary-container/10 via-surface-container to-surface">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded">
                    {selectedNode.columnTitle} • {selectedNode.type}
                  </span>
                  <span className="text-[10px] font-mono text-secondary bg-secondary-container/20 px-2 py-0.5 rounded">
                    Category: {selectedNode.category}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-on-surface">
                  {selectedNode.title}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right font-mono">
                  <div className="font-display font-extrabold text-xl text-primary">
                    {selectedNode.primaryMetric}
                  </div>
                  <div className="text-xs text-on-surface-variant font-bold">
                    Confidence: {formatConfidence(selectedNode.confidence)}
                  </div>
                </div>

                {selectedNode.evidenceId && (
                  <Link
                    href={`/evidence?q=${encodeURIComponent(selectedNode.evidenceId)}`}
                    className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-glow"
                  >
                    <span>View Evidence</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                  Node Analysis & Description
                </div>
                <p className="text-xs text-on-surface leading-relaxed">{selectedNode.description}</p>

                {selectedNode.hash && (
                  <div className="p-2.5 rounded bg-surface-dim border border-outline-variant font-mono text-[10px] text-on-surface-variant">
                    <span className="text-primary font-bold">SHA-256 Hash: </span>
                    <span className="break-all">{selectedNode.hash}</span>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1.5 font-bold">Upstream Influences</div>
                  {selectedNode.linkedParents.length > 0 ? (
                    <div className="space-y-1">
                      {selectedNode.linkedParents.map((pid) => (
                        <div
                          key={pid}
                          onClick={() => setSelectedNodeId(pid)}
                          className="text-primary hover:underline cursor-pointer truncate"
                        >
                          → {nodes.find((n) => n.id === pid)?.title || pid}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-on-surface-variant/50">Root node (None)</span>
                  )}
                </div>

                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant mb-1.5 font-bold">Downstream Impacts</div>
                  {selectedNode.linkedChildren.length > 0 ? (
                    <div className="space-y-1">
                      {selectedNode.linkedChildren.map((cid) => (
                        <div
                          key={cid}
                          onClick={() => setSelectedNodeId(cid)}
                          className="text-success hover:underline cursor-pointer truncate"
                        >
                          → {nodes.find((n) => n.id === cid)?.title || cid}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-on-surface-variant/50">Terminal node</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
