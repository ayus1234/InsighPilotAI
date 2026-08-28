# InsightPilot AI — Technical Portfolio Case Study

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Author:** Ayush & Engineering Team  
**Focus:** Enterprise Decision Intelligence, Multi-Agent Orchestration & Deterministic Analytics  

---

## 1. The Challenge: Bridging the "Analysis-to-Action" Gap

Modern enterprises generate petabytes of transactional telemetry across Enterprise Resource Planning (ERP), Customer Relationship Management (CRM), Warehouse Management Systems (WMS), and Point-of-Sale (POS) systems. When critical business metrics suddenly deteriorate—such as a **-$1.23M (-7.97%) quarterly revenue contraction**—executive teams face a fundamental operational challenge:

1. **Information Fragmentation:** Data resides in siloed databases with conflicting schemas and identifiers.
2. **Analysis Latency:** Cross-functional correlation takes 2 to 4 weeks of manual SQL querying and spreadsheet reconciliation.
3. **Speculative Decision Making:** By the time traditional BI dashboards highlight an anomaly, the revenue is lost, and intervention proposals lack empirical proof or financial elasticity modeling.

InsightPilot AI was engineered to automate this entire investigation lifecycle, reducing diagnostic and remediation latency from **weeks to seconds**.

---

## 2. Why Traditional BI & Chatbots Are Insufficient

| Diagnostic Tier | Traditional BI Dashboards (e.g., PowerBI, Tableau) | Generic Chatbots (e.g., ChatGPT, Copilot) | InsightPilot AI Decision Intelligence |
| :--- | :--- | :--- | :--- |
| **Primary Question** | *"What happened?"* (Descriptive) | *"What do you think happened?"* (Speculative) | *"Why did it happen, what proves it, and what should we do?"* (Prescriptive) |
| **Root-Cause Analysis** | Manual filtering and slicing | Statistical correlation or hallucination | **Deterministic multi-factor variance decomposition (100% explained)** |
| **Numerical Integrity** | High (SQL queries) | **Zero (LLMs hallucinate arithmetic)** | **Absolute (Python analytics own 100% of calculations)** |
| **Evidence Verification**| Indirect (raw charts) | None (unverifiable citations) | **SHA-256 cryptographic lineage linked to source records** |
| **Action & Simulation** | Static reports | Text suggestions without impact models | **Prioritized recovery levers with What-If elasticity curves** |

---

## 3. The InsightPilot AI Approach

InsightPilot AI enforces a strict three-tier architectural philosophy:

> **"Deterministic systems own quantitative truth. LangGraph orchestrates investigation. AI explains grounded facts."**

1. **Deterministic Analytics Core:** Pure Python computation engines ingest normalized enterprise records, calculate exact variances, rank causal drivers, evaluate statistical confidence, and model simulation elasticity.
2. **LangGraph Agentic Workflow:** An 11-node state graph orchestrates multi-step investigative reasoning, managing state transitions, evidence accumulation, and persona-specific framing.
3. **Capability-Aware AI Layer:** High-throughput LLMs (Groq LLaMA 3.3 70B and Google Gemini 2.5 Flash) receive strictly structured, pre-calculated analytical context. Their role is restricted to translating empirical findings into executive narratives. If an AI provider is unavailable or confidence falls below 65%, the system abstains or engages deterministic template fallback.

---

## 4. System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. DYNAMIC PRESENTATION & CONSUMPTION LAYER                                 │
│    Next.js 14 (App Router) • 7 Executive Screens • Lucid Data Visualizations │
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 4. CAPABILITY-AWARE AI ROUTING & SAFETY LAYER                               │
│    Multi-Pool Router (Groq/Gemini) • Grounding Validator • Abstention Gate   │
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 3. AGENTIC ORCHESTRATION PIPELINE LAYER                                     │
│    LangGraph 11-Node StateGraph • Replay Lifecycle • Telemetry Observer     │
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 2. DETERMINISTIC ANALYTICS & INFERENCE LAYER                                │
│    KPI Engine • Driver Engine • Evidence Engine • Confidence • Simulation     │
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 1. ENTERPRISE DATA & TELEMETRY LAYER                                        │
│    8 Validated CSV Schemas • 43K+ Rows • SHA-256 Lineage Generator          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Deterministic Analytics Engine

The quantitative core operates independently of external AI services:
- **KPI Anomaly Detection:** Compares baseline period ($15,430,000.06) to current actuals ($14,200,000.05), flagging variances exceeding `-3.0%`.
- **Driver Decomposition:** Evaluates sub-dimensional contributions across facilities, SKUs, and distributors, attributing:
  1. `Atlanta DC Stockout`: **43.2% contribution** / **-$550,000.00 impact** (94% confidence)
  2. `SKU-8821 Volume Contraction`: **26.7% contribution** / **-$340,000.00 impact** (89% confidence)
  3. `Distributor PO Deferrals`: **18.8% contribution** / **-$240,000.00 impact** (85% confidence)
  4. `Competitor Horizon Pricing`: **11.3% contribution** / **-$144,000.00 impact** (78% confidence)
  - **Total Explained Variance:** `100.0%`
  - **Overall Analytical Confidence:** `89% HIGH`

---

## 6. AI Investigation Orchestration (LangGraph)

The investigation lifecycle is managed as an immutable 11-node state graph:
```text
detect_anomaly -> decompose_variance -> isolate_drivers -> fetch_evidence
-> corroborate_sources -> assess_confidence -> verify_lineage -> generate_decision_graph
-> prioritize_actions -> simulate_recovery -> synthesize_briefing
```
State snapshots are recorded at each node, enabling complete replayability, deterministic regression testing, and real-time observability telemetry.

---

## 7. SHA-256 Cryptographic Evidence Lineage

Every diagnostic claim is supported by empirical records sourced from ERP inventory snapshots, CRM ticket logs, distributor purchase orders, and competitor pricing scrapers. Each evidence node generates a unique 64-character SHA-256 hash:
$$\text{Digest} = \text{SHA-256}(\text{source\_system} \parallel \text{timestamp} \parallel \text{record\_payload})$$
This guarantees data provenance and ensures auditability in regulated enterprise environments.

---

## 8. Responsible AI & Abstention Design

- **Mandatory Abstention Gate:** If multi-source corroboration yields an aggregate confidence score below **65%**, the AI agent is programmatically blocked from generating conclusions and explicitly flags the anomaly for human review.
- **Grounding Validator:** AI responses are regex-scanned and validated against the deterministic payload. If an LLM attempts to generate an ungrounded dollar figure or driver ranking, the output is rejected.
- **Zero Secrets & Masked Logs:** PII and API keys are completely isolated from client bundles and log outputs.

---

## 9. Decision Intelligence & Dynamic Decision Graph

Rather than presenting disjointed tables, InsightPilot AI constructs a dynamic 6-column topological DAG (14 nodes, 17 edges):
1. **Metric Anomaly:** Target revenue drop
2. **Causal Drivers:** 4 ranked factors
3. **Empirical Evidence:** 9 corroborated records
4. **Business Mechanisms:** Operational failure modes
5. **Action Levers:** Controllable interventions
6. **Predicted Outcomes:** Financial and operational impact

---

## 10. What-If Simulation Engine

InsightPilot AI provides an interactive elasticity sandbox based on empirical facility recovery dynamics:
- **Baseline Availability:** 79.4% (during Atlanta stockout)
- **Target Availability Scenario:** 90.0% (+10.6% recovery delta)
- **Projected Revenue Recovery:** **+$341,422.91** ($32,209.71 per percentage point)
- **Gross Margin Lift:** **+1.4 percentage points**
- **Action Priority 1:** Emergency inventory transfer (3,200 units Chicago $\to$ Atlanta, 14 days, **+$484,000.00** recovery).

---

## 11. Executive User Experience (Next.js 14)

The frontend features 7 executive screens styled with modern glassmorphism, responsive data grids, and dark-mode visuals:
1. **`/` Executive Command Center:** KPI status cards, anomaly alerts, and data source health.
2. **`/root-cause` Waterfall Decomposition:** 4-factor waterfall chart with percentage contributions.
3. **`/investigation` LangGraph Trace:** Real-time state machine inspector with node latencies.
4. **`/decision-graph` Topological Graph:** Interactive 6-column SVG node-edge network.
5. **`/evidence` Evidence Explorer:** Filterable cards with SHA-256 badges and raw source payloads.
6. **`/recommendations` Action & Simulation:** Action priority cards and real-time What-If slider.
7. **`/briefing` Executive Narrative:** Persona-tailored board briefing (CFO vs Sales VP).

---

## 12. Engineering Challenges & Solutions

| Challenge | Engineering Solution |
| :--- | :--- |
| **LLM Arithmetic Hallucination** | Built pure Python deterministic calculation engines; LLMs are restricted to narrative synthesis. |
| **AI Provider Rate Limits & Outages** | Implemented multi-pool capability routing (Groq + Gemini) with automatic deterministic template fallback. |
| **Cross-Dataset Referential Integrity** | Enforced strict JSON schema contracts and pre-flight validation across all 8 CSV tables (43,000+ rows). |
| **Frontend State Synchronization** | Pre-rendered 10 static routes in Next.js 14 with client-side reactive state management. |

---

## 13. Key Design Decisions

1. **Why LangGraph over Autonomous Agent Loops?**  
   Autonomous agent loops (e.g. ReAct / AutoGPT) suffer from non-deterministic execution paths and infinite loop risks. LangGraph enforces a predictable, directed acyclic graph (DAG) with validated state transitions.
2. **Why SHA-256 for Evidence?**  
   Cryptographic hashing ensures data immutability, enabling strict compliance audits in enterprise finance workflows.
3. **Why Dual LLM Providers?**  
   Groq LLaMA 3.3 70B provides ultra-low latency (&lt;500ms) for real-time investigation, while Google Gemini 2.5 Flash provides high-context reasoning for executive summaries.

---

## 14. Validation Strategy

The project maintains an exhaustive automated verification pipeline:
- **Dataset Validation Suite:** 6/6 checks verifying schema alignment, PK uniqueness, referential integrity, and signal bounds.
- **Backend Test Suite:** **259 unit, integration, and contract tests** passing with 0 failures.
- **Frontend Static Compilation:** 10/10 pre-rendered static routes compiled in Next.js 14.
- **Zero Drift:** 100% parity across all canonical metrics.

---

## 15. Limitations

- **Current Scope:** Optimized for structured tabular enterprise data (ERP, CRM, WMS, POS); unstructured documents (PDFs, contracts) are processed via extracted metadata records.
- **Single-Tenant Deployment:** Currently configured as a single-organization deployment model; multi-tenant RBAC is planned for future enterprise releases.

---

## 16. What Was Learned

- **Decoupling Math from Language:** The most reliable AI architectures treat LLMs as semantic communication interfaces, never calculation engines.
- **Predictable State Machines:** Deterministic DAG orchestration is vastly superior to unbounded agent loops for mission-critical business intelligence.
- **Trust Through Verifiability:** Executives adopt AI recommendations only when accompanied by cryptographic evidence and sensitivity models.

---

## 17. Future Evolution

- **Real-Time Streaming Ingestion:** Apache Kafka integration for sub-second anomaly detection.
- **Automated ERP Write-Back:** Bi-directional webhooks to trigger SAP/NetSuite purchase orders directly from approved recommendations.
- **Multi-Modal Evidence:** OCR and computer vision ingestion for warehouse bill-of-lading scans.
