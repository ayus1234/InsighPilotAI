# InsightPilot AI — Technical Architecture & Lifecycle Walkthrough

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** End-to-End System Request Lifecycle & Internal Architecture  

---

## 1. The 11-Stage Request Lifecycle

InsightPilot AI processes business disruptions through a synchronized 11-stage pipeline that transitions from raw tabular transactions to executive boardroom briefs:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. DATA INGESTION & SCHEMAS (analytics/data_loader.py)                      │
│    Loads 8 validated CSV datasets (43,000+ rows) with strict type validation│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. KPI ANOMALY TRIAGE (analytics/kpi_engine.py)                             │
│    Detects North America East Revenue drop: $15.43M -> $14.20M (-7.97%)     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. ROOT-CAUSE ATTRIBUTION (analytics/driver_engine.py)                      │
│    Decomposes variance into 4 mutually exclusive ranked drivers (100% total)│
│    1. Atlanta DC Stockout: 43.2% / -$550,000.00 / 94% confidence            │
│    2. SKU-8821 Volume Drop: 26.7% / -$340,000.00 / 89% confidence          │
│    3. Distributor PO Deferrals: 18.8% / -$240,000.00 / 85% confidence       │
│    4. Competitor Horizon Pricing: 11.3% / -$144,000.00 / 78% confidence     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. EMPIRICAL EVIDENCE RETRIEVAL (analytics/evidence_engine.py)              │
│    Fetches 9 corroborating records from ERP, CRM, WMS, and Market Intel     │
│    Generates 64-character SHA-256 cryptographic lineage hashes              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. CONFIDENCE SCORING & ABSTENTION GATE (analytics/confidence_engine.py)    │
│    Evaluates cross-source corroboration (89% HIGH confidence)               │
│    Enforces mandatory abstention gate (<65% threshold triggers abstention)  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. LANGGRAPH AGENTIC ORCHESTRATION (ai_service/orchestration/state_graph.py)│
│    Executes 11-node StateGraph managing investigation state transitions     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 7. GROUNDED AI NARRATIVE SYNTHESIS (ai_service/llm_router.py)               │
│    Dispatches pre-calculated payload to Groq (LLaMA 70B) / Gemini (Flash)   │
│    Grounding Validator verifies zero arithmetic drift; engages fallback if  │
│    providers are unconfigured or rate-limited                               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 8. DECISION GRAPH TOPOLOGY GENERATION (analytics/decision_graph_engine.py)  │
│    Constructs 6-column DAG (14 nodes, 17 edges) mapping cause -> outcome    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 9. ACTION RECOMMENDATION PRIORITIZATION (analytics/recommendation_engine.py)│
│    Prescribes Priority 1 Emergency Stock Transfer (+$484K recovery, 14 days)│
│    and Priority 2 Distributor Outreach (+$180K recovery)                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 10. WHAT-IF ELASTICITY SIMULATION (analytics/simulation_engine.py)          │
│     Models availability sensitivity: 79.4% -> 90.0% yields +$341,422.91     │
│     revenue recovery ($32,209.71/pt) and +1.4% gross margin lift            │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 11. ROLE-TAILORED EXECUTIVE BRIEFING (ai_service/briefing_synthesizer.py)   │
│     Synthesizes 10-beat storyboard narrative for CFO boardroom presentation │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Deep Dive: Key Architectural Components

### A. Deterministic Analytics Engine (`analytics/`)
- `kpi_engine.py`: Computes historical baseline vs. current period movements with variance percentages and materiality thresholds.
- `driver_engine.py`: Performs multi-dimensional variance attribution across facilities, SKUs, and distributors, guaranteeing mathematical closure (sum of contributions = 100.0%).
- `evidence_engine.py`: Ingests operational logs and computes cryptographic SHA-256 hashes:
  $$\text{Hash} = \text{SHA-256}(\text{source} \parallel \text{timestamp} \parallel \text{entity\_id} \parallel \text{metric\_value})$$
- `confidence_engine.py`: Calibrates multi-source corroboration scores based on data recency, sample size, and cross-system alignment.
- `simulation_engine.py`: Evaluates supply chain elasticity models deterministically without stochastic drift.

### B. AI Orchestration & Multi-Pool Router (`ai_service/`)
- `state_graph.py`: Implements an 11-node LangGraph `StateGraph` maintaining immutable investigation state snapshots.
- `llm_router.py`: Capability-aware multi-provider router supporting Groq LLaMA 3.3 70B (primary low-latency pool) and Google Gemini 2.5 Flash (high-context synthesis pool) with automatic HTTP 429 rate-limit failover.
- `grounding_validator.py`: Programmatic safety interceptor that scans LLM responses to verify that all referenced dollar amounts, percentages, and driver names strictly exist in the deterministic payload.
- `fallback_synthesizer.py`: Guaranteed zero-downtime template-based synthesis engine when external AI keys are unavailable.

### C. FastAPI Backend Gateway (`backend/app/`)
- `main.py`: ASGI application entry point registering CORS, security headers, correlation middleware, and API routers.
- `logging.py`: Structured JSON telemetry with `X-Request-ID` tracing and latency measurement (`X-Response-Time-Ms`).
- `security.py`: OWASP-compliant security headers middleware injecting `nosniff`, `DENY`, `strict-origin`, and `Cache-Control: no-store`.

### D. Next.js 14 Web Frontend (`frontend/next-app/`)
- Pre-renders 10 static routes (`○ Static`) using Next.js 14 App Router.
- Shared First Load JS bundle footprint of `87.5 kB`.
- Component architecture featuring dynamic SVG Decision Graph, interactive What-If sliders, and filterable evidence cards.
