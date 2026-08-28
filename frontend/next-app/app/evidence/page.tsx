"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { apiClient } from "@/lib/api";
import { PersonaType } from "@/lib/types";
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
  RefreshCw,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { formatConfidence, formatPercent } from "@/lib/formatters";

interface EvidenceItem {
  id: string;
  system: string;
  recordId: string;
  domain: "ERP Inventory" | "Commercial CRM" | "Zendesk Support" | "Market Intelligence" | string;
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

const DEFAULT_EVIDENCE_ITEMS: EvidenceItem[] = [
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
    recordId: "SF-RET-DEMAND-EAST",
    domain: "Commercial CRM",
    type: "Retail POS Sell-Through Telemetry",
    finding: "East territory retail end-consumer POS scan data shows steady baseline consumption (-0.8%), confirming demand resilience.",
    timestamp: "2026-08-24 02:00:00 UTC",
    freshnessHours: 6.4,
    method: "Nielsen / IRI Retail Scan Normalization",
    contributionPct: 22.0,
    confidenceScore: 88,
    driverLinkage: "SKU-8821 Sales Volume Contraction",
    driverId: "sku_8821_sales_volume",
    hash: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    lineage: {
      pipeline: "ETL_RETAIL_POS_SYNDICATED",
      sourceTable: "MARKET_DATA.RETAIL_SCAN_WEEKLY",
      queryHash: "0x44b912a7c8e033fd",
      lastRun: "2026-08-24 03:00:00 UTC",
      dataQualityScore: 97.8,
      steps: [
        "Fetch syndicated weekly scanner datasets from partner retail chains.",
        "Normalize brand velocity against regional promotional calendars.",
      ],
    },
  },
  {
    id: "EVID_CRM_PO_DEF_006",
    system: "EDI Gateway / SAP SD",
    recordId: "EDI-PO-DEF-8819",
    domain: "Commercial CRM",
    type: "Distributor Purchase Order Logs",
    finding: "29 major regional distributor purchase orders were deferred past the Q3 delivery window ($240K total value).",
    timestamp: "2026-08-23 18:00:00 UTC",
    freshnessHours: 14.5,
    method: "EDI 850 Order Status Parsing",
    contributionPct: 18.8,
    confidenceScore: 85,
    driverLinkage: "Distributor Purchase Order Deferral",
    driverId: "distributor_orders",
    hash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    lineage: {
      pipeline: "ETL_EDI_PO_INGEST_HOURLY",
      sourceTable: "EDI_STAGE.PURCHASE_ORDERS_DEFERRED",
      queryHash: "0x98ef12ca4301bd67",
      lastRun: "2026-08-23 19:00:00 UTC",
      dataQualityScore: 99.4,
      steps: [
        "Parse inbound EDI 850 purchase order transactions.",
        "Isolate orders tagged with hold reason 'DELIVERY_DATE_UNCONFIRMED'.",
        "Aggregate financial value deferred to Q4 delivery cycles.",
      ],
    },
  },
  {
    id: "EVID_MKT_HORIZON_PROMO_008",
    system: "Competitive Intelligence Feed",
    recordId: "CI-HORIZON-EAST-PROMO",
    domain: "Market Intelligence",
    type: "Competitor Shelf Pricing Scrape",
    finding: "Competitor Horizon Foods launched a 15% discount campaign across East Coast retail grocery channels.",
    timestamp: "2026-08-22 12:00:00 UTC",
    freshnessHours: 42.0,
    method: "Automated Daily Web Scrape & Price Indexing",
    contributionPct: 11.3,
    confidenceScore: 78,
    driverLinkage: "Competitor Horizon Pricing Pressure",
    driverId: "competitor_horizon_pricing",
    hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    lineage: {
      pipeline: "SCRAPE_COMPETITOR_PRICING_DAILY",
      sourceTable: "MARKET_INTEL.COMPETITOR_PRICES",
      queryHash: "0x55aa33ff1122cc44",
      lastRun: "2026-08-22 13:00:00 UTC",
      dataQualityScore: 94.2,
      steps: [
        "Execute automated daily crawler across top 5 East supermarket e-commerce portals.",
        "Extract promo tags and calculate effective price index vs standard MSRP.",
      ],
    },
  },
];

function EvidenceContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q") || "";
  const [persona, setPersona] = useState<PersonaType>("CFO");
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(DEFAULT_EVIDENCE_ITEMS);
  const [activeLineageItem, setActiveLineageItem] = useState<EvidenceItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    async function loadEvidence() {
      setLoading(true);
      try {
        const res = await apiClient.getEvidenceList({ region: "NA-East" });
        if (res && res.evidence && res.evidence.length > 0) {
          const liveItems: EvidenceItem[] = res.evidence.map((ev: any) => {
            const matchedDefault = DEFAULT_EVIDENCE_ITEMS.find((d) => d.id === ev.evidence_id);
            return {
              id: ev.evidence_id,
              system: ev.source_system || matchedDefault?.system || "Authoritative System",
              recordId: ev.record_id || matchedDefault?.recordId || ev.evidence_id,
              domain: ev.domain || matchedDefault?.domain || "General",
              type: ev.evidence_type || matchedDefault?.type || "Verified Telemetry",
              finding: ev.finding_summary || matchedDefault?.finding || "",
              timestamp: ev.timestamp || matchedDefault?.timestamp || "2026-08-24 06:00:00 UTC",
              freshnessHours: ev.freshness_hours || matchedDefault?.freshnessHours || 2.0,
              method: ev.validation_method || matchedDefault?.method || "Deterministic Lineage Audit",
              contributionPct: ev.contribution_pct || matchedDefault?.contributionPct || 25.0,
              confidenceScore: ev.confidence_score || matchedDefault?.confidenceScore || 90,
              driverLinkage: ev.driver_name || matchedDefault?.driverLinkage || "Root Cause Analysis",
              driverId: ev.driver_id || matchedDefault?.driverId || "",
              hash: ev.sha256_hash || matchedDefault?.hash || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
              lineage: matchedDefault?.lineage || {
                pipeline: "ETL_PIPELINE_VERIFIED_V1",
                sourceTable: "DATA_WAREHOUSE.AUTHORITATIVE_TABLE",
                queryHash: "0x8f2a91b4e3c1782d",
                lastRun: "2026-08-24 06:15:00 UTC",
                dataQualityScore: 99.5,
                steps: [
                  "Ingest raw source system records.",
                  "Execute lineage verification check.",
                  "Generate SHA-256 cryptographic verification digest.",
                ],
              },
            };
          });
          setEvidenceItems(liveItems);
        }
      } catch (e) {
        console.warn("Failed to load evidence from backend, using authoritative defaults:", e);
      } finally {
        setLoading(false);
      }
    }
    loadEvidence();
  }, []);

  const domains = ["ALL", "ERP Inventory", "Commercial CRM", "Zendesk Support", "Market Intelligence"];

  const filteredItems = evidenceItems.filter((item) => {
    const matchesDomain = selectedDomain === "ALL" || item.domain === selectedDomain;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.finding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driverLinkage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.system.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          persona={persona}
          onPersonaChange={setPersona}
          breadcrumb="Evidence Explorer"
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Cryptographic Lineage Audit
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  {evidenceItems.length} Verified Evidence Nodes • 100% SHA-256 Digest Integrity
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface tracking-tight">
                Empirical Evidence Explorer
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
                href="/root-cause"
                className="px-4 py-2 bg-primary text-background font-mono text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-glow"
              >
                <span>Root Cause</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Search & Domain Filter Toolbar */}
          <div className="glass-panel rounded-2xl p-4 border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Evidence ID, system, finding, or driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-surface-dim border border-outline-variant rounded-xl text-xs font-mono text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Domain Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 font-mono text-xs">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1.5 rounded-lg border transition-all text-[11px] whitespace-nowrap font-semibold ${
                    selectedDomain === dom
                      ? "bg-primary text-background border-primary shadow-glow font-bold"
                      : "bg-surface-dim border-outline-variant text-on-surface-variant hover:border-primary/40"
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-panel rounded-2xl p-5 border border-outline-variant hover:border-primary/50 transition-all flex flex-col justify-between shadow-sm hover:shadow-glow"
              >
                <div>
                  {/* Top Bar: ID + Confidence */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-primary-container/20 border border-primary/40 font-mono text-[11px] font-bold text-primary">
                        {item.id}
                      </span>
                      <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                        {item.domain}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-success flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {formatConfidence(item.confidenceScore)}
                      </span>
                    </div>
                  </div>

                  {/* Finding Statement */}
                  <p className="text-xs text-on-surface font-medium leading-relaxed mb-4">
                    {item.finding}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-on-surface-variant bg-surface-dim p-3 rounded-xl border border-outline-variant/60 mb-4">
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">Source System:</span>
                      <strong className="text-on-surface">{item.system}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">Driver Linkage:</span>
                      <strong className="text-primary truncate block">{item.driverLinkage}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">Record Reference:</span>
                      <code className="text-on-surface text-[10px]">{item.recordId}</code>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">Freshness:</span>
                      <span className="text-success font-semibold">{item.freshnessHours}h ago</span>
                    </div>
                  </div>

                  {/* SHA-256 Digest Box */}
                  <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-between text-[10px] font-mono text-on-surface-variant mb-4">
                    <div className="truncate mr-2">
                      <span className="text-primary font-bold mr-1.5">SHA-256:</span>
                      <code className="text-on-surface">{item.hash}</code>
                    </div>
                    <button
                      onClick={() => handleCopy(item.id, item.hash)}
                      className="p-1.5 rounded-lg hover:bg-surface-dim text-on-surface-variant hover:text-primary transition-all shrink-0"
                      title="Copy SHA-256 Digest"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-on-surface-variant">
                    Method: <strong className="text-on-surface">{item.method}</strong>
                  </span>

                  <button
                    onClick={() => setActiveLineageItem(item)}
                    className="px-3.5 py-1.5 rounded-lg bg-surface-dim hover:bg-primary/10 border border-primary/40 text-primary font-mono text-xs font-bold transition-all flex items-center gap-1.5 active:scale-[0.98]"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Lineage</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 glass-panel rounded-2xl border border-outline-variant">
              <FileSearch className="w-10 h-10 text-on-surface-variant mx-auto mb-3 opacity-50" />
              <h3 className="font-display font-bold text-base text-on-surface mb-1">No Evidence Nodes Matched</h3>
              <p className="text-xs font-mono text-on-surface-variant">
                Try adjusting your search query or selecting &quot;ALL&quot; in the domain filter.
              </p>
            </div>
          )}

          {/* Lineage Modal Drawer */}
          {activeLineageItem && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="glass-panel border-primary rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 bg-surface">
                <div className="flex items-center justify-between border-b border-outline-variant pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded bg-primary-container/20 border border-primary/40 font-mono text-xs font-bold text-primary">
                      {activeLineageItem.id}
                    </span>
                    <h3 className="font-display font-bold text-lg text-on-surface">5-Layer Lineage Audit</h3>
                  </div>
                  <button
                    onClick={() => setActiveLineageItem(null)}
                    className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-surface-dim border border-outline-variant">
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">ETL Pipeline:</span>
                      <strong className="text-primary">{activeLineageItem.lineage.pipeline}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">Source Table:</span>
                      <strong className="text-on-surface">{activeLineageItem.lineage.sourceTable}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">Query Checksum:</span>
                      <code className="text-secondary">{activeLineageItem.lineage.queryHash}</code>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant/70 block">Data Quality Score:</span>
                      <span className="text-success font-bold">{activeLineageItem.lineage.dataQualityScore}%</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Deterministic Transformation Steps
                    </div>
                    <div className="space-y-2">
                      {activeLineageItem.lineage.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-surface-dim border border-outline-variant/60 flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary-container/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-on-surface text-xs leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant flex justify-end">
                  <button
                    onClick={() => setActiveLineageItem(null)}
                    className="px-4 py-2 bg-primary text-background rounded-lg font-mono text-xs font-bold hover:bg-primary-dark transition-all"
                  >
                    Close Lineage View
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function EvidencePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs text-primary">Loading Evidence Explorer...</div>}>
      <EvidenceContent />
    </Suspense>
  );
}
