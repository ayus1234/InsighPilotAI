# InsightPilot AI — Career Portfolio Case Study

**Project:** InsightPilot AI  
**Author / Developer:** Ayus  
**Track:** Enterprise Decision Intelligence, AI Engineering & Full-Stack Systems Architecture  
**Repository:** [https://github.com/ayus1234/InsighPilotAI](https://github.com/ayus1234/InsighPilotAI)  
**Status:** `PORTFOLIO VERIFIED — 271+ PASSING AUTOMATED TESTS`

---

## 1. Project Overview & Context

InsightPilot AI is a production-grade enterprise decision-intelligence platform that bridges the gap between descriptive anomaly detection and prescriptive operational action. 

Built as an advanced entry for the **Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)**, the system solves a fundamental breakdown in enterprise business intelligence: traditional BI tools tell executives *what* happened (e.g., revenue dropped 7.97%), but investigating *why* requires weeks of manual cross-dataset correlation across ERP, CRM, WMS, and EDI logs. Generic GenAI chatbots attempt to answer these questions by hallucinating numbers without verifiable audit trails or deterministic grounding.

InsightPilot AI introduces a three-tier architecture that combines **deterministic analytics engines**, **LangGraph multi-agent orchestration**, **SHA-256 cryptographic evidence lineage**, and a **calibrated confidence-based abstention guard (<65%)** to deliver auditable, hallucination-free executive briefings.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FOUNDATIONAL ARCHITECTURAL INVARIANT                  │
│                                                                             │
│  "Deterministic systems own quantitative truth. LangGraph orchestrates      │
│   investigation. AI explains grounded facts."                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The Problem Statement

In enterprise supply chains and distribution networks:
- **Diagnostic Latency:** Identifying the root causes of quarterly revenue variances typically takes 2 to 4 weeks of ad-hoc SQL querying and manual spreadsheet reconciliation.
- **LLM Hallucination Risk in Finance:** Large Language Models fail at strict enterprise arithmetic. LLMs generate plausible but mathematically incorrect financial calculations and driver rankings when fed raw tables.
- **Evidentiary Traceability Gap:** Executive teams cannot execute multi-hundred-thousand dollar supply chain actions (e.g., emergency freight transfers) based on black-box AI outputs without verifiable data provenance.

---

## 3. Why Traditional BI & Chatbots Were Insufficient

| Approach | What It Delivers | Where It Fails |
| :--- | :--- | :--- |
| **Traditional Dashboards (Tableau / PowerBI)** | Static charts showing metric drops (e.g. NA-East Revenue: -$1.23M). | Zero automated cross-system correlation; leaves root-cause diagnosis to manual human effort. |
| **Naive GenAI Chatbots (RAG over Text/SQL)** | Fluent natural language summaries. | Arithmetic hallucinations, ungrounded causal claims, lack of cryptographic provenance. |
| **InsightPilot AI (Deterministic + LangGraph)** | Automated 100% variance attribution + SHA-256 lineage + role-tailored briefing. | Combines exact mathematical precision with multi-agent orchestration and safety guards. |

---

## 4. System Architecture

InsightPilot AI is structured into 5 decoupled operational layers:

```text
Layer 5: Presentation & Action Sandbox ── Next.js 14 App Router, 7 Executive Screens, Glassmorphism UI
Layer 4: AI Routing & Grounding Safety ── Multi-Pool Router (Groq/Gemini), Grounding Regex Validator, <65% Abstention Gate
Layer 3: Agentic Orchestration ────────── LangGraph 11-Node StateGraph Lifecycle, Telemetry & Replay
Layer 2: Deterministic Analytics ──────── Pure Python Variance, Driver Attribution, Confidence & Simulation Engines
Layer 1: Enterprise Data & Lineage ────── 8 Validated CSV Schemas (43,000+ rows), SHA-256 Hash Digest Generator
```

---

## 5. My Engineering Contributions

As the sole developer and systems architect of InsightPilot AI, I designed and implemented:
1. **Deterministic Analytics Core (`analytics/`):** Pure Python variance decomposition calculating 100.0% variance allocation without external math drift.
2. **LangGraph StateGraph Workflow (`ai/orchestration/`):** 11-node state machine managing multi-step investigation, hypothesis testing, and fallback transitions.
3. **Cryptographic Lineage Engine (`evidence/`):** Automated 64-character SHA-256 hash generator creating immutable audit trails across 9 empirical records.
4. **Safety & Grounding Validator (`ai/validator.py`):** Regex-based post-generation interceptor enforcing that LLM narratives only reference verified facts.
5. **Full-Stack Application (`backend/` & `frontend/next-app/`):** FastAPI ASGI gateway with OWASP security headers, structured JSON correlation logging (`X-Request-ID`), and Next.js 14 frontend with 10 pre-rendered static routes.
6. **Automated Quality Pipeline (`tests/`):** 271+ unit, integration, and contract tests with 100% pass rates.

---

## 6. Deterministic Analytics Engine

All quantitative analysis is executed deterministically in pure Python before any AI service is invoked:
- **Baseline Period:** 2026-Q2 NA-East Revenue = `$15,430,000.06`
- **Target Period:** 2026-Q3 NA-East Revenue = `$14,200,000.05`
- **Net Revenue Variance:** `-$1,230,000.01` (`-7.97%`, `CRITICAL_NEGATIVE_VARIANCE`)
- **Mutually Exclusive Driver Attribution:**
  1. `Atlanta DC Stockout`: `43.2%` share / `-$550,000.00` impact / `94%` confidence
  2. `SKU-8821 Volume Contraction`: `26.7%` share / `-$340,000.00` impact / `89%` confidence
  3. `Distributor PO Deferrals`: `18.8%` share / `-$240,000.00` impact / `85%` confidence
  4. `Competitor Horizon Pricing`: `11.3%` share / `-$144,000.00` impact / `78%` confidence
  - **Total Explained Variance:** `100.0%` (Sum of drivers = `-$1,230,000.00` / $0.01 rounding boundary)

---

## 7. LangGraph Multi-Agent Investigation Workflow

The investigation lifecycle is governed by an 11-node LangGraph `StateGraph`:
1. `initialize_investigation`: Ingests KPI anomaly context.
2. `fetch_kpi_metadata`: Retrieves metric definitions and materiality thresholds.
3. `decompose_variance`: Executes deterministic driver attribution.
4. `retrieve_evidence`: Queries ERP, CRM, WMS, and EDI records.
5. `verify_lineage`: Generates 64-character SHA-256 digests.
6. `score_confidence`: Computes corroboration scores (89% HIGH).
7. `evaluate_abstention_gate`: Evaluates score against the `<65%` threshold.
8. `synthesize_narrative`: Formats grounded natural language summary.
9. `generate_decision_graph`: Constructs 6-column topological DAG (14 nodes, 17 edges).
10. `prescribe_actions`: Ranks operational levers and What-If elasticity models.
11. `finalize_investigation`: Emits immutable state payload with correlation metadata.

---

## 8. Evidence Lineage & Cryptographic Verification

Every empirical finding is bound to a verified data record with a SHA-256 cryptographic hash:
- Example: `EVID_ERP_ATL_STOCKOUT_001` $\to$ `a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0`
- Lineage links the anomaly directly to WMS inventory snapshots (Atlanta availability dropping to 79.4% during Aug 1-19, 2026), 29 deferred distributor POs, and 67 customer escalation tickets.

---

## 9. Responsible AI, Confidence Scoring & Abstention Gate

- **Confidence Engine:** Evaluates multi-source corroboration strength, data completeness, and consistency, producing an aggregate score of **89% HIGH**.
- **Mandatory Abstention Gate:** If confidence falls below **65%**, the AI is programmatically blocked from generating autonomous conclusions and must output:
  > *"Analytical confidence (XX%) is below the mandatory 65% threshold. Automated synthesis withheld. Escalating to human analyst."*

---

## 10. Prescriptive Recommendation Engine

- **Priority 1 Action:** Emergency Stock Transfer (Chicago DC $\to$ Atlanta DC, 3,200 units, 14-day SLA, 91% confidence, modeled financial recovery: `+$484,000.00`).
- **Priority 2 Action:** Targeted Promotional Rebate (SKU-8821 Volume Rebound, 5% rebate, modeled recovery: `+$185,000.00`).
- **Priority 3 Action:** Distributor Expedited Credit Terms (PO Release, modeled recovery: `+$88,600.00`).
- **Total Modeled Recovery Pool:** `+$757,600.00`

---

## 11. What-If Supply Chain Elasticity Simulation

The simulation sandbox models the financial impact of operational inventory adjustments:
- **Baseline Availability:** 79.4%
- **Target Simulated Availability:** 90.0%
- **Simulated Recovery:** `+$341,422.91`
- **Simulated Gross Margin Lift:** `+1.4 percentage points`
- **Elasticity Rate:** `$32,209.71` per percentage point improvement

---

## 12. Frontend Product Experience

A modern Next.js 14 App Router interface with 7 executive screens:
1. `/` — Executive Command Center & Anomaly Triage
2. `/root-cause` — Waterfall Variance Decomposition
3. `/investigation` — Interactive LangGraph Trace Visualizer
4. `/decision-graph` — Dynamic 6-Column Topological DAG
5. `/evidence` — SHA-256 Cryptographic Evidence Explorer
6. `/recommendations` — Prescriptive Levers & What-If Elasticity Slider
7. `/briefing` — Role-Tailored CFO Executive Decision Brief

---

## 13. Testing, Verification & Quality Engineering

- **Dataset Validation:** `python tests/validate_dataset.py` $\to$ 6/6 checks passing across 43,000+ rows.
- **Backend Test Suite:** `python -m unittest discover -s tests -t . -p "test_*.py"` $\to$ **271/271 tests passing (100%)**.
- **Frontend Build:** `npm run build` $\to$ **10/10 static pages pre-rendered** (`○ Static`) with zero lint/type errors.

---

## 14. Key Engineering Trade-offs & Decisions

| Decision | Chosen Approach | Alternative Considered | Rationale |
| :--- | :--- | :--- | :--- |
| **Math Execution** | Pure Python calculation | LLM function calling / Code Interpreter | Guarantees zero arithmetic hallucination, deterministic repeatability, and sub-millisecond execution. |
| **Agent Orchestration** | LangGraph StateGraph | Autonomous ReAct loops | LangGraph provides explicit state persistence, inspectable node transitions, and reproducible execution paths. |
| **Model Routing** | Capability-aware multi-pool router | Single vendor dependency | Distributes load between Groq (sub-second inference) and Gemini (large context), with zero-downtime deterministic fallback. |
| **Lineage Auditability** | SHA-256 hashing | Database auto-increment IDs | Cryptographic hashes guarantee tamper-evident data provenance across disparate source systems. |

---

## 15. Limitations & Future Production Roadmap

### Current Prototype Scope:
- Ingests normalized CSV datasets (43,000+ records) rather than live database connectors.
- Multi-tenancy and user role-based access control (RBAC) are modeled at the API contract layer.
- Single-organization enterprise scope.

### Production Roadmap:
- Real-time Kafka / CDC streaming ingestion.
- Enterprise SSO (SAML 2.0 / OAuth2) and row-level security.
- Distributed Celery / Redis background workers for billion-row enterprise datasets.
