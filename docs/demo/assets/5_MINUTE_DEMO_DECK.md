# 5-Minute Technical Deep-Dive Slide Deck Specification

> **Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai**  
> *Technical jury presentation deck supporting the 5-minute (300-second) architecture evaluation.*

---

## 📊 Deck Overview

* **Target Audience:** Technical Evaluation Committee & Architecture Review Judges
* **Presentation Format:** Slide Presentation + Interactive UI Walkthrough + Terminal/API Highlights
* **Target Duration:** 300 Seconds (5:00)
* **Theme:** High-density technical architecture, dark-mode glassmorphism (`#0B0F19`, `#38BDF8`, `#10B981`)

---

## 📑 Slide-by-Slide Technical Specification

### Slide 1: Technical Hero & System Architecture
* **Timing:** `0:00 – 0:25` (25s)
* **Slide Title:** **InsightPilot AI: Grounded Agentic Decision Intelligence**
* **Visual Diagram:** 5-Layer Architectural Blueprint (Data $\to$ Deterministic Math $\to$ LangGraph $\to$ AI Routing $\to$ Dynamic Next.js UI)
* **Core Technical Principle:**
  > *"Deterministic systems own quantitative truth. LangGraph orchestrates investigation. AI explains grounded facts."*

---

### Slide 2: The Enterprise Problem & BI Investigation Gap
* **Timing:** `0:25 – 0:50` (25s)
* **Slide Title:** **The Enterprise BI Dilemma: Latency vs Hallucination**
* **Content:**
  - Traditional BI limitation: Descriptive reporting requiring 2–3 weeks of manual cross-system analyst queries
  - GenAI chatbot limitation: Non-deterministic math, missing audit trails, and financial hallucination risks
  - InsightPilot solution: Deterministic variance attribution backed by agentic multi-model orchestration

---

### Slide 3: Enterprise Data Tier & Telemetry Ingestion
* **Timing:** `0:50 – 1:15` (25s)
* **Slide Title:** **Layer 1: Enterprise Schema Contracts & Cryptographic Lineage**
* **Technical Highlights:**
  - 8 Schema-validated datasets: ERP Invoices (12,322 rows), WMS Inventory (13,710 snapshots), CRM Sales, EDI Orders, Support Tickets, Communications, Market Intel
  - Primary key uniqueness, non-null guarantees, and referential integrity across 5 master dimensions
  - SHA-256 hash generation for every ingested source record

---

### Slide 4: Deterministic Analytics & Normalization Engine
* **Timing:** `1:15 – 1:40` (25s)
* **Slide Title:** **Layer 2: Exact Period-over-Period Variance & Driver Math**
* **Technical Highlights:**
  - Baseline Revenue (2026-Q2): `$15,430,000.06` | Current Revenue (2026-Q3): `$14,200,000.05`
  - Net Variance: `-$1,230,000.01` (`-7.97%`, `CRITICAL_NEGATIVE_VARIANCE`)
  - Normalized Causal Driver Attribution (100.0% parity):
    * Atlanta DC Stockout: `43.2%` (`-$550,000.00` impact / `94%` confidence)
    * Horizon Foods Price War: `26.1%` (`-$332,000.00` impact)
    * Distributor Order Deferrals: `18.4%` (`-$234,000.00` impact)
    * Premium SKU Mix Shift: `12.3%` (`-$156,000.00` impact)

---

### Slide 5: LangGraph 11-Node Investigation State Machine
* **Timing:** `1:40 – 2:10` (30s)
* **Slide Title:** **Layer 3: LangGraph Multi-Agent Orchestration Lifecycle**
* **Visual Diagram:**
```text
[load_kpi] ──► [calc_movement] ──► [identify_drivers] ──► [retrieve_evidence] ──► [validate_evidence]
     ▲                                                                                    │
     │                                                                                    ▼
[recommendations] ◄── [executive_synthesis] ◄── [ai_invocation] ◄── [route_capability] ◄── [calc_confidence]
                                                                                          │
                                                                   (Confidence < 65%) ──► [ABSTAIN GATE]
```
* **Key Mechanisms:** Immutable state transitions, conditional confidence edge, millisecond-precision telemetry.

---

### Slide 6: Multi-Tier AI Provider Routing & Failover Matrix
* **Timing:** `2:10 – 2:35` (25s)
* **Slide Title:** **Layer 4: Capability-Aware Routing & 5-Tier Resilient Failover**
* **Routing Architecture:**
  - Standard Reasoning: `Groq Pool 1 (LLaMA 3.3 70B)` $\to$ `Groq Pool 2` $\to$ `Gemini Pool 1 (2.5 Flash)` $\to$ `Gemini Pool 2` $\to$ `Deterministic Fallback`
  - Multimodal Vision: `Gemini Pool 1` $\to$ `Gemini Pool 2` $\to$ `Deterministic Fallback`
  - Zero Credential Leakage: Logical pool masking (`groq_pool_1`) protects API keys across all logs and client payloads.

---

### Slide 7: Cryptographic Evidence Lineage & Auditability
* **Timing:** `2:35 – 3:00` (25s)
* **Slide Title:** **Cryptographic Evidence Verification & Audit Trails**
* **Technical Highlights:**
  - 5-Layer Lineage: `Source System` $\to$ `Entity Table` $\to$ `Record ID` $\to$ `Field Attribution` $\to$ `SHA-256 Digest`
  - Real-world evidence nodes: `EVD-INV-001` (Atlanta WMS 79.4% stockout), `EVD-MKT-001` (15% competitor price drop), `EVD-ORD-001` (29 deferred POs)

---

### Slide 8: 6-Factor Deterministic Confidence & Abstention
* **Timing:** `3:00 – 3:25` (25s)
* **Slide Title:** **Responsible AI: Multi-Factor Confidence & Mandatory Abstention**
* **Mathematical Formula:**
  $$\text{Score} = 0.25 \cdot \text{Sufficiency} + 0.20 \cdot \text{Quality} + 0.20 \cdot \text{Coverage} + 0.15 \cdot \text{Corroboration} + 0.10 \cdot \text{Lineage} + 0.10 \cdot \text{Consistency}$$
* **Threshold Policies:**
  - $\ge 80\%$: `HIGH` Confidence (Canonical: `89%`)
  - $65\%–79\%$: `MEDIUM` Confidence (Caution Banner)
  - $< 65\%$: `LOW` Confidence $\to$ **Mandatory Abstention** (LLM generation suppressed, safe diagnostic graph rendered)

---

### Slide 9: Dynamic 6-Column Decision Graph Topology
* **Timing:** `3:25 – 3:55` (30s)
* **Slide Title:** **Layer 5: Dynamic 6-Column Decision Graph**
* **Topology:** 14 Nodes, 17 Directed Edges across 6 structural columns:
```text
Col 1: KPI Anomaly  (NA-East Revenue -$1.23M)
Col 2: Drivers      (Atlanta Stockout, Price War, Order Deferrals, SKU Mix)
Col 3: Evidence     (Inventory Logs, Market Reports, EDI POs)
Col 4: Mechanisms   (Regional Supply Disruption, Price Competition, Working Capital)
Col 5: Actions      (Charlotte Stock Transfer, Target Promo, Payment Terms)
Col 6: Outcomes     (+$484K Recovery, Market Share Defense, Cash Flow Stabilization)
```

---

### Slide 10: Prescriptive Recommendations & Simulation Sandbox
* **Timing:** `3:55 – 4:25` (30s)
* **Slide Title:** **Prescriptive Levers & Deterministic What-If Simulation**
* **Technical Highlights:**
  - Priority 1 Action Lever: Charlotte Hub $\to$ Atlanta DC Stock Transfer (20,000 Units / `+$484,000.00` Target / 14-Day Window)
  - Simulation Elasticity Engine: Linear inventory-to-revenue elasticity model with bounded inputs ($[0\%, 100\%]$)
  - Canonical Result: Improving availability from `79.4%` to `90.0%` yields an exact modeled recovery of `+$341,422.91` and `+0.72%` margin recovery.

---

### Slide 11: Persona Dual-View & Invariance Guarantee
* **Timing:** `4:25 – 4:45` (20s)
* **Slide Title:** **Role-Tailored Synthesis: CFO vs Regional Sales Manager**
* **Technical Highlights:**
  - CFO Persona: Financial exposure, EBITDA impact, margin preservation, capital reallocation
  - Sales Manager Persona: Facility availability, distributor PO fulfillment, SKU volume, transfer logistics
  - Invariance Guarantee: All quantitative calculations, evidence hashes, and simulation outputs are 100% identical.

---

### Slide 12: Verification Suite, Enterprise ROI & Conclusion
* **Timing:** `4:45 – 5:00` (15s)
* **Slide Title:** **Verification, Business Impact & Summary**
* **Summary Metrics:**
  - Verification: `174/174 Tests Passed (100%)`, `10/10 Static Routes Compiled`
  - Commercial ROI: `$484K+` immediate recovery, `95%` faster triage time, `0%` hallucination risk
  - Closing Statement: *"InsightPilot AI establishes the new standard for actionable, grounded, and defensible enterprise decision intelligence."*
