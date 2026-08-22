"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { Database, ShieldCheck, Search } from "lucide-react";

function EvidenceContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const evidenceItems = [
    {
      id: "EVID_ERP_ATL_STOCKOUT_001",
      system: "ERP Database (SAP/Oracle)",
      metric: "Atlanta DC Stockout Duration",
      finding: "14 consecutive days of zero inventory for SKU-8821 at Atlanta DC.",
      confidence: "94% HIGH",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    },
    {
      id: "EVID_ZENDESK_ATL_DELAY_003",
      system: "Zendesk Support CRM",
      metric: "Order Fulfillment Tickets",
      finding: "+310% surge in unfulfilled order tickets during disruption window.",
      confidence: "89% HIGH",
      hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    },
    {
      id: "EVID_CRM_PO_DEF_006",
      system: "EDI Order Management",
      metric: "Distributor PO Deferrals",
      finding: "29 delayed purchase orders from Tier-1 East regional distributors.",
      confidence: "85% HIGH",
      hash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    },
    {
      id: "EVID_MKT_HORIZON_PROMO_008",
      system: "Competitor Market Scrape",
      metric: "Promotional Pricing Pressure",
      finding: "15% discount campaign launched by Horizon Foods in East territory.",
      confidence: "78% MED",
      hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    },
  ];

  const filtered = evidenceItems.filter(
    (ev) =>
      ev.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.finding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.system.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              9 Cryptographically Verified Nodes
            </span>
            <span className="text-xs font-mono text-on-surface-variant">SHA-256 Audit Hashes Active</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-on-surface">
            Empirical Evidence & Lineage Explorer
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by Evidence ID (e.g. EVID_ERP...)"
            className="bg-surface-dim border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none w-72 transition-all font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            className="glass-panel rounded-xl p-5 border-outline-variant hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-primary bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded">
                  {ev.id}
                </span>
                <span className="text-[11px] font-mono font-bold text-success bg-success-container/20 px-2 py-0.5 rounded">
                  {ev.confidence}
                </span>
              </div>
              <div className="text-[11px] font-mono text-on-surface-variant mb-3 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-secondary" />
                <span>Source: {ev.system}</span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed mb-4">{ev.finding}</p>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 font-mono text-[10px] text-on-surface-variant/60 truncate">
              Hash: {ev.hash}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function EvidenceExplorerPage() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar persona="CFO" onPersonaChange={() => {}} breadcrumb="Evidence Explorer" />
        <Suspense fallback={<div className="p-8 font-mono text-xs text-on-surface-variant">Loading Evidence Explorer...</div>}>
          <EvidenceContent />
        </Suspense>
      </div>
    </div>
  );
}
