# InsightPilot AI — Final 5-Minute Technical Deep-Dive Demo Script (300s)

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Extended Technical Deep-Dive Script & Architecture Walkthrough  
**Total Target Runtime:** `300 Seconds (5:00)`  
**Audience:** Technical Judges, Enterprise Architects & Evaluators

---

## 5-Minute Technical Demonstration Structure

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        5-MINUTE TECHNICAL DEMONSTRATION STRUCTURE                      │
│                                                                                        │
│ 0:00–0:35  [Part 1]  The Architectural Division of Labor & Master Narrative            │
│ 0:35–1:15  [Part 2]  Command Center & Time-Series Materiality Math (/)                 │
│ 1:15–1:55  [Part 3]  11-Node LangGraph State Graph & Confidence Engine (/investigation)│
│ 1:55–2:35  [Part 4]  4-Factor Decomposition & Normalization Math (/root-cause)         │
│ 2:35–3:15  [Part 5]  Cryptographic SHA-256 Lineage & Grounding Validator (/evidence)   │
│ 3:15–4:00  [Part 6]  6-Column Causal Topology & Prescriptive Levers (/decision-graph)  │
│ 4:00–4:35  [Part 7]  What-If Simulation Sandbox & Elasticity Modeling (/recommendations│
│ 4:35–5:00  [Part 8]  Persona Invariance, Security Hardening & Conclusion (/briefing)   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Time-Stamped Technical Walkthrough

### PART 1: THE ARCHITECTURAL DIVISION OF LABOR (0:00 – 0:35 | 35s)
- **Visual:** Architecture Diagram (Slide 3 & 5 of Pitch Deck).
- **Narration:**  
  *"Judges, most enterprise AI failures stem from asking LLMs to perform arithmetic and multi-table queries directly. InsightPilot AI establishes a strict architectural division of labor: our deterministic Python analytics engine computes 100% of quantitative truth; an 11-node LangGraph pipeline orchestrates cross-silo data retrieval and safety gating; and multi-model AI explains pre-verified analytical truth with post-generation grounding validation."*

---

### PART 2: COMMAND CENTER & DETERMINISTIC MATERIALITY (0:35 – 1:15 | 40s)
- **Visual:** Executive Command Center (`/`).
- **UI Route:** `http://localhost:3000/`
- **Presenter Action:** Inspect the Hero KPI Card; hover over sparkline tooltips; show regional health matrix.
- **Narration:**  
  *"On the Command Center, our time-series engine ingests relational ERP data and evaluates period-over-period variance. In 2026-Q3, North America East revenue dropped from $15,430,000.06 to $14,200,000.05—a -$1,230,000.01 or -7.97% drop. Because the variance exceeds our -3.00% materiality threshold, the system flags it as CRITICAL_NEGATIVE_VARIANCE and initiates an automated multi-agent investigation."*

---

### PART 3: 11-NODE LANGGRAPH & 6-FACTOR CONFIDENCE (1:15 – 1:55 | 40s)
- **Visual:** AI Investigation Activity (`/investigation`).
- **UI Route:** `http://localhost:3000/investigation`
- **Presenter Action:** Scroll through the 11 nodes; point out the deterministic nodes versus safety guards and AI orchestration nodes.
- **Narration:**  
  *"The investigation executes through an 11-node LangGraph state machine. Nodes 1 through 5 handle deterministic baseline loading, variance calculation, driver ranking, and SHA-256 evidence validation. Node 6 evaluates our 6-factor confidence engine—scoring sample size, cross-source corroboration, and data freshness to yield an 89% HIGH confidence score. If confidence is below 65%, our safety guard immediately halts generative reasoning to prevent hallucinations."*

---

### PART 4: 4-FACTOR DECOMPOSITION & NORMALIZATION (1:55 – 2:35 | 40s)
- **Visual:** Root Cause Diagnosis (`/root-cause`).
- **UI Route:** `http://localhost:3000/root-cause`
- **Presenter Action:** Expand the Atlanta DC Stockout card; inspect the contribution percentage and financial impact metrics.
- **Narration:**  
  *"Our causal decomposition engine isolates 4 ranked factors explaining 100% of the variance. Atlanta DC stockout is the primary driver, accounting for 43.2% or -$550,000 of the deficit at 94% driver confidence. SKU-8821 volume contraction contributed 26.7% or -$340,000, distributor PO deferrals 18.8% or -$240,000, and competitor promotional discounting 11.3% or -$144,000."*

---

### PART 5: SHA-256 EVIDENCE LINEAGE & GROUNDING VALIDATION (2:35 – 3:15 | 40s)
- **Visual:** Empirical Evidence Explorer (`/evidence`).
- **UI Route:** `http://localhost:3000/evidence`
- **Presenter Action:** Open the 5-layer lineage drawer on `EVID_ERP_ATL_STOCKOUT_001`; copy the SHA-256 hash.
- **Narration:**  
  *"InsightPilot AI provides complete cryptographic auditability. Each of our 9 evidence records carries an immutable 64-character SHA-256 verification hash generated from source tables across SAP ERP, Salesforce CRM, and Zendesk. When the LLM generates an explanation, our post-generation validator verifies that every cited claim maps to a verified evidence ID, guaranteeing zero hallucinated entities."*

---

### PART 6: 6-COLUMN CAUSAL TOPOLOGY & ACTION LEVERS (3:15 – 4:00 | 45s)
- **Visual:** Decision Graph (`/decision-graph`) and Recommendations (`/recommendations`).
- **UI Route:** `http://localhost:3000/decision-graph` $\to$ `http://localhost:3000/recommendations`
- **Presenter Action:** Navigate the 6-column graph; transition to recommendations page and inspect Priority 1 action card.
- **Narration:**  
  *"Our 6-column Decision Graph bridges the gap between diagnostic intelligence and executive execution. It maps the anomaly across 14 nodes and 17 edges—linking KPI deficits through causal mechanics directly to prescriptive action levers. Our recommendation engine generates prioritized interventions: Priority 1 executes an emergency transfer of 3,200 units from Chicago to Atlanta, unlocking $484,000 in recovery, while Priority 2 targets distributor outreach to recover $180,000."*

---

### PART 7: WHAT-IF SIMULATION & ELASTICITY MODELING (4:00 – 4:35 | 35s)
- **Visual:** What-If Simulation Sandbox (`/recommendations`).
- **UI Route:** `http://localhost:3000/recommendations`
- **Presenter Action:** Drag availability slider from 79.4% to 90.0%; inspect the real-time elasticity calculation.
- **Narration:**  
  *"In our interactive simulation sandbox, executives can test business decisions before deploying capital. Raising inventory availability from 79.4% to 90.0% deterministically models a +$341,422.91 revenue recovery and a +1.40 percentage point gross margin lift based on empirical availability elasticity ($32,209.71 per percentage point)."*

---

### PART 8: PERSONA INVARIANCE, SECURITY & CONCLUSION (4:35 – 5:00 | 25s)
- **Visual:** Executive Decision Briefing (`/briefing`).
- **UI Route:** `http://localhost:3000/briefing`
- **Presenter Action:** Toggle between CFO and Regional Sales Manager personas; trigger the "Approve Strategic Actions" sign-off.
- **Narration:**  
  *"The executive briefing synthesizes the investigation for boardroom sign-off. Persona switching adapts narrative framing for the CFO or Sales Manager without altering the quantitative math. With 196/196 passing automated tests and zero credential leakage, InsightPilot AI delivers autonomous, verifiable decision intelligence. Thank you."*
