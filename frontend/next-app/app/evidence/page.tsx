"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import {
  FileSearch,
  Database,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  GitFork,
  ExternalLink,
  ChevronRight,
  X,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { formatConfidence, formatPercent } from "@/lib/formatters";

interface EvidenceItem {
  id: string;
  system: string;
  recordId: string;
  domain: "ERP Inventory" | "Commercial CRM" | "Zendesk Support" | "Market Intelligence";
  type: string;
  finding: string;
  timestamp: string;
  freshnessHours: number;
  method: string;
  contributionPct: number;
  confidenceScore: number;
  driverLinkage: string;
  driverId: string;
  hash: string;
  lineage: {
    pipeline: string;
    sourceTable: string;
    queryHash: string;
    lastRun: string;
    dataQualityScore: number;
    steps: string[];
  };
}

function EvidenceContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [activeLineageItem, setActiveLineageItem] = useState<EvidenceItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const evidenceItems: EvidenceItem[] = [
    {
      id: "EVID_ERP_ATL_STOCKOUT_001",
      system: "SAP S/4HANA ERP",
      recordId: "INV-SNAP-21971",
      domain: "ERP Inventory",
      type: "Inventory Snapshot Telemetry",
      finding: "14 consecutive days of zero available inventory for SKU-8821 at Atlanta DC (Aug 10 - Aug 24, 2026).",
      timestamp: "2026-08-24 06:00:00 UTC",
      freshnessHours: 2.4,
      method: "Deterministic Inventory Aggregation",
      contributionPct: 43.2,
      confidenceScore: 94,
      driverLinkage: "Atlanta DC Stockout",
      driverId: "atlanta_dc_stockout",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      lineage: {
        pipeline: "ETL_SAP_WAREHOUSE_DAILY_V3",
        sourceTable: "ERP_PROD.INVENTORY_DAILY_SNAPSHOTS",
        queryHash: "0x8f2a91b4e3c1782d",
        lastRun: "2026-08-24 06:15:00 UTC",
        dataQualityScore: 99.8,
        steps: [
          "Ingest raw SAP inventory level snapshots via RFC connector.",
          "Filter by facility: 'DC-ATL-04' and product hierarchy: 'SKU-8821'.",
          "Calculate stockout duration and compute unfulfilled order delta.",
          "Generate SHA-256 cryptographic verification digest.",
        ],
      },
    },
    {
      id: "EVID_ERP_CHI_SURPLUS_002",
      system: "SAP S/4HANA ERP",
      recordId: "INV-SNAP-21985",
      domain: "ERP Inventory",
      type: "Facility Inventory Balancing",
      finding: "Chicago Central DC holds 4,800 surplus units of SKU-8821 (142% of safety target), confirming stock transfer feasibility.",
      timestamp: "2026-08-24 06:00:00 UTC",
      freshnessHours: 2.4,
      method: "Facility Buffer Variance Modeling",
      contributionPct: 38.0,
      confidenceScore: 92,
      driverLinkage: "Atlanta DC Stockout",
      driverId: "atlanta_dc_stockout",
      hash: "f4a1c55398fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b999",
      lineage: {
        pipeline: "ETL_SAP_FACILITY_BALANCE_V2",
        sourceTable: "ERP_PROD.WAREHOUSE_FACILITY_BUFFERS",
        queryHash: "0x3e1f90a2c5b7618a",
        lastRun: "2026-08-24 06:30:00 UTC",
        dataQualityScore: 99.5,
        steps: [
          "Ingest facility safety buffer configurations from SAP APO.",
          "Calculate current buffer delta vs optimal replenishment threshold.",
          "Verify surplus SKU-8821 available for immediate reallocation.",
        ],
      },
    },
    {
      id: "EVID_ZENDESK_ATL_DELAY_003",
      system: "Zendesk Enterprise CRM",
      recordId: "ZD-TKT-AGG-9921",
      domain: "Zendesk Support",
      type: "Customer Support Escalations",
      finding: "+310% surge in unfulfilled order and late delivery tickets originating from East territory accounts during the disruption window.",
      timestamp: "2026-08-24 08:30:00 UTC",
      freshnessHours: 1.2,
      method: "NLP Topic Clustering & Ticket Trend Modeling",
      contributionPct: 35.5,
      confidenceScore: 89,
      driverLinkage: "Atlanta DC Stockout",
      driverId: "atlanta_dc_stockout",
      hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      lineage: {
        pipeline: "STREAM_ZENDESK_SUPPORT_SIGNALS",
        sourceTable: "CRM_ANALYTICS.SUPPORT_ESCALATIONS",
        queryHash: "0x7a81c49b2f0e914d",
        lastRun: "2026-08-24 08:35:00 UTC",
        dataQualityScore: 98.9,
        steps: [
          "Stream support tickets classified under 'Delivery / Fulfillment Failure'.",
          "Geotag complaints to East distributor billing accounts.",
          "Cluster anomaly timestamps against ERP stockout timeline.",
        ],
      },
    },
    {
      id: "EVID_CRM_SKU8821_SALES_004",
      system: "Salesforce CRM",
      recordId: "SF-OPP-EAST-8821",
      domain: "Commercial CRM",
      type: "Commercial Sales Opportunity Tracking",
      finding: "East territory gross sales for SKU-8821 dropped from $3.95M in Q2 to $3.61M in Q3 (-$340K shortfall).",
      timestamp: "2026-08-23 23:59:00 UTC",
      freshnessHours: 8.5,
      method: "Closed-Won Opportunity Cohort Variance",
      contributionPct: 26.7,
      confidenceScore: 89,
      driverLinkage: "SKU-8821 Sales Volume Contraction",
      driverId: "sku_8821_sales_volume",
      hash: "d9e8f7a6b5c43210feebda9876543210abcdef0123456789abcdef0123456789",
      lineage: {
        pipeline: "ETL_SFDC_SALES_PERFORMANCE",
        sourceTable: "SFDC_PROD.OPPORTUNITY_LINE_ITEMS",
        queryHash: "0x12a9c4fe7890bd23",
        lastRun: "2026-08-24 01:00:00 UTC",
        dataQualityScore: 99.2,
        steps: [
          "Ingest closed-won sales contract line items by territory and SKU.",
          "Aggregate regional quarterly revenue comparisons.",
          "Reconcile SFDC numbers against authoritative SAP general ledger.",
        ],
      },
    },
    {
      id: "EVID_CRM_RETAIL_DEMAND_005",
      system: "Salesforce CRM",
      recordId: "SF-RETAIL-DEM-104",
      domain: "Commercial CRM",
      type: "Account Demand Signal Tracking",
      finding: "Underlying customer retail demand for SKU-8821 remained strong (+3.2% POS scan rate), confirming failure was supply-driven.",
      timestamp: "2026-08-24 07:00:00 UTC",
      freshnessHours: 3.1,
      method: "POS Sell-Through Telemetry Synthesis",
      contributionPct: 24.1,
      confidenceScore: 87,
      driverLinkage: "SKU-8821 Sales Volume Contraction",
      driverId: "sku_8821_sales_volume",
      hash: "11223344556677889900aabbccddeeff00112233445566778899aabbccddeeff",
      lineage: {
        pipeline: "ETL_RETAIL_POS_SCAN_V2",
        sourceTable: "COMMERCIAL_DWH.POS_SCAN_AGGREGATES",
        queryHash: "0x5b3e91ca820f4d17",
        lastRun: "2026-08-24 07:15:00 UTC",
        dataQualityScore: 98.7,
        steps: [
          "Ingest syndicated retail point-of-sale scanner data.",
          "Normalize volume velocity against historical promotional weeks.",
          "Confirm zero structural decline in end-consumer brand demand.",
        ],
      },
    },
    {
      id: "EVID_CRM_PO_DEF_006",
      system: "EDI Order Management",
      recordId: "EDI-PO-DEF-88291",
      domain: "Commercial CRM",
      type: "B2B Purchase Order Lifecycle",
      finding: "29 delayed purchase orders ($240K total value) from Tier-1 East regional distributors with status 'Fulfillment On Hold'.",
      timestamp: "2026-08-24 05:00:00 UTC",
      freshnessHours: 4.2,
      method: "EDI 850 Order Status State Machine Audit",
      contributionPct: 18.8,
      confidenceScore: 85,
      driverLinkage: "Distributor Purchase Order Deferral",
      driverId: "distributor_orders",
      hash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
      lineage: {
        pipeline: "ETL_EDI_ORDER_TRACKING_REALTIME",
        sourceTable: "SUPPLY_CHAIN.EDI_PURCHASE_ORDERS",
        queryHash: "0x98cf210a34be7601",
        lastRun: "2026-08-24 05:15:00 UTC",
        dataQualityScore: 99.6,
        steps: [
          "Stream EDI 850 inbound purchase order records.",
          "Track hold flags and delivery window expiration dates.",
          "Cross-reference buyer accounts with East regional distributor registry.",
        ],
      },
    },
    {
      id: "EVID_DIST_CONTRACT_AUDIT_007",
      system: "EDI Order Management",
      recordId: "EDI-CONTRACT-TERMS-44",
      domain: "Commercial CRM",
      type: "Distributor SLA Compliance Audit",
      finding: "Distributor contracts permit cancellation after 21 days of fulfillment hold; currently at Day 12 of grace period.",
      timestamp: "2026-08-24 05:30:00 UTC",
      freshnessHours: 3.9,
      method: "Contractual SLA Risk Modeling",
      contributionPct: 16.5,
      confidenceScore: 84,
      driverLinkage: "Distributor Purchase Order Deferral",
      driverId: "distributor_orders",
      hash: "77889900aabbccddeeff0011223344556677889900aabbccddeeff0011223344",
      lineage: {
        pipeline: "ETL_CONTRACT_SLA_RISK_AUDIT",
        sourceTable: "LEGAL_OPS.DISTRIBUTOR_SLAS",
        queryHash: "0x44a1b89ef2017cd3",
        lastRun: "2026-08-24 05:45:00 UTC",
        dataQualityScore: 99.1,
        steps: [
          "Parse master distributor service agreement terms.",
          "Calculate remaining business days before contract penalty triggers.",
          "Flag high-risk accounts for executive account outreach.",
        ],
      },
    },
    {
      id: "EVID_MKT_HORIZON_PROMO_008",
      system: "Competitive Intel Engine",
      recordId: "MKT-SCRAPE-HORIZON-08",
      domain: "Market Intelligence",
      type: "Web Scrape & Promotion Telemetry",
      finding: "Horizon Foods launched a 15% discount campaign across 18 regional grocery chains in East territory during Q3.",
      timestamp: "2026-08-23 18:00:00 UTC",
      freshnessHours: 14.5,
      method: "Automated Shelf-Price Scraping & OCR Catalog Audit",
      contributionPct: 11.3,
      confidenceScore: 78,
      driverLinkage: "Competitor Horizon Pricing Pressure",
      driverId: "competitor_horizon_pricing",
      hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      lineage: {
        pipeline: "SCRAPER_COMPETITIVE_PRICING_V4",
        sourceTable: "MARKET_INTEL.COMPETITOR_PROMOTIONS",
        queryHash: "0x6f901ab34e2c8791",
        lastRun: "2026-08-23 18:30:00 UTC",
        dataQualityScore: 96.4,
        steps: [
          "Scrape promotional circulars and e-commerce pricing across top East retailers.",
          "OCR discount terms and match against competitor SKU catalogue.",
          "Calculate elasticity cross-price impact on regional sales volumes.",
        ],
      },
    },
    {
      id: "EVID_MKT_SHARE_SHIFT_009",
      system: "Competitive Intel Engine",
      recordId: "MKT-SHARE-EAST-Q3",
      domain: "Market Intelligence",
      type: "Syndicated Panel Market Share",
      finding: "Horizon Foods captured 0.8% temporary market share shift in secondary retail channels during the Atlanta DC stockout window.",
      timestamp: "2026-08-23 20:00:00 UTC",
      freshnessHours: 12.8,
      method: "Syndicated Nielsen / IRI Share Panel Synthesis",
      contributionPct: 9.8,
      confidenceScore: 76,
      driverLinkage: "Competitor Horizon Pricing Pressure",
      driverId: "competitor_horizon_pricing",
      hash: "3344556677889900aabbccddeeff0011223344556677889900aabbccddeeff00",
      lineage: {
        pipeline: "ETL_SYNDICATED_MARKET_PANEL",
        sourceTable: "MARKET_INTEL.MARKET_SHARE_QUARTERLY",
        queryHash: "0x2e8f19a4bc0391d8",
        lastRun: "2026-08-23 20:30:00 UTC",
        dataQualityScore: 97.2,
        steps: [
          "Ingest syndicated panel data for East territory packaged goods.",
          "Compute category velocity shifts during brand stockout weeks.",
          "Isolate temporary substitution effects from structural brand churn.",
        ],
      },
    },
  ];

  const handleCopyHash = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = evidenceItems.filter((ev) => {
    const matchesSearch =
      ev.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.finding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.driverLinkage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain === "ALL" || ev.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              9 Cryptographically Verified Evidence Nodes
            </span>
            <span className="text-xs font-mono text-on-surface-variant">
              Deterministic Lineage & SHA-256 Audit Trail Active
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
            Empirical Evidence & Lineage Explorer
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Evidence ID, driver, or keyword..."
            className="bg-surface-dim border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none w-72 md:w-80 transition-all font-mono"
          />
        </div>
      </div>

      {/* Domain Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
        {["ALL", "ERP Inventory", "Commercial CRM", "Zendesk Support", "Market Intelligence"].map((dom) => {
          const count =
            dom === "ALL"
              ? evidenceItems.length
              : evidenceItems.filter((e) => e.domain === dom).length;
          return (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg border transition-all text-xs whitespace-nowrap font-semibold flex items-center gap-1.5 ${
                selectedDomain === dom
                  ? "bg-primary text-background border-primary shadow-glow font-bold"
                  : "bg-surface-dim border-outline-variant text-on-surface-variant hover:border-primary/40"
              }`}
            >
              <span>{dom}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedDomain === dom ? "bg-background text-primary" : "bg-surface-container text-on-surface-variant"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            className="glass-panel rounded-xl p-5 border-outline-variant hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-primary bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded truncate">
                  {ev.id}
                </span>
                <span className="text-[11px] font-mono font-bold text-success bg-success-container/20 px-2 py-0.5 rounded shrink-0">
                  {ev.confidenceScore}% HIGH
                </span>
              </div>

              <div className="text-[11px] font-mono text-on-surface-variant mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1 truncate">
                  <Database className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="truncate">{ev.system}</span>
                </div>
                <span className="text-[10px] text-on-surface-variant/70 shrink-0">{ev.freshnessHours}h ago</span>
              </div>

              <p className="text-xs text-on-surface leading-relaxed mb-4">{ev.finding}</p>

              <div className="p-2.5 rounded-lg bg-surface-dim border border-outline-variant mb-4 text-xs font-mono">
                <div className="text-[10px] text-on-surface-variant/70 mb-0.5">Linked Causal Driver</div>
                <Link
                  href={`/root-cause`}
                  className="font-bold text-primary hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>{ev.driverLinkage}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant/70">
                <span className="truncate max-w-[190px]">Hash: {ev.hash.slice(0, 16)}...</span>
                <button
                  onClick={() => handleCopyHash(ev.hash, ev.id)}
                  className="p-1 hover:text-primary transition-colors"
                  title="Copy SHA-256 Hash"
                >
                  {copiedId === ev.id ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <button
                onClick={() => setActiveLineageItem(ev)}
                className="w-full py-1.5 bg-surface-dim hover:bg-primary/10 border border-outline-variant hover:border-primary/40 rounded text-[11px] font-mono font-bold text-primary transition-all flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Inspect Lineage Trace</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lineage Modal Drawer */}
      {activeLineageItem && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl max-w-2xl w-full p-6 border-primary/40 shadow-glow relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveLineageItem(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-surface-dim hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded">
                Lineage Trace Audit
              </span>
              <span className="text-xs font-mono text-success font-bold">
                Quality Score: {activeLineageItem.lineage.dataQualityScore}%
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl text-on-surface mb-4">
              {activeLineageItem.id}
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant/70 mb-1">Source Pipeline</div>
                  <div className="font-bold text-primary truncate">{activeLineageItem.lineage.pipeline}</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                  <div className="text-[10px] text-on-surface-variant/70 mb-1">Source Table</div>
                  <div className="font-bold text-on-surface truncate">{activeLineageItem.lineage.sourceTable}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant">
                <div className="text-[10px] text-on-surface-variant/70 mb-1">Cryptographic Query Hash</div>
                <div className="text-secondary font-bold truncate">{activeLineageItem.lineage.queryHash}</div>
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Transformation & Validation Steps
                </div>
                <div className="space-y-2">
                  {activeLineageItem.lineage.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-surface-dim/80 border border-outline-variant/60 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded bg-primary-container/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-on-surface-variant leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-dim border border-outline-variant text-[10px] break-all">
                <span className="text-primary font-bold">Verification Digest: </span>
                <span>{activeLineageItem.hash}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant flex justify-end">
              <button
                onClick={() => setActiveLineageItem(null)}
                className="px-5 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all"
              >
                Close Audit Trace
              </button>
            </div>
          </div>
        </div>
      )}
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
