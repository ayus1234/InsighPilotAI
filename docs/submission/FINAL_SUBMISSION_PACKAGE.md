# InsightPilot AI — Final Competition Submission Package

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Project:** InsightPilot AI  
**Document:** Master Evaluator-Facing Submission Package  
**Status:** `READY FOR FINAL SUBMISSION`

---

## 1. Executive Project Summary

**InsightPilot AI** is an enterprise-grade Decision Intelligence and Agentic AI system that transforms reactive business intelligence dashboards into autonomous, evidence-grounded root cause diagnosis, decision graphs, and prescriptive simulation.

### Foundational Principle:
> **"Deterministic systems own quantitative truth.  
> LangGraph orchestrates investigation.  
> AI explains grounded facts."**

Traditional BI dashboards inform executives *what* happened, leaving cross-functional root cause triage to weeks of manual correlation. Generic LLM systems attempt to explain *why*, but frequently hallucinate mathematical calculations and lack verifiable auditability. 

**InsightPilot AI bridges this gap:** deterministic Python engines compute 100% of mathematical truth; an 11-node LangGraph multi-agent pipeline orchestrates data retrieval and safety gating; and multi-model AI (Gemini 2.5 Flash and Groq Llama 3.3 70B) generates persona-tailored executive synthesis with post-generation citation validation.

---

## 2. Key Technical Differentiators

| Capability | Traditional BI (Power BI / Tableau) | Generic LLM Chatbots | InsightPilot AI |
| :--- | :--- | :--- | :--- |
| **Root Cause Diagnosis** | Manual triage (2–3 weeks) | Hallucinates unverified causes | **Autonomous & Deterministic (~30s)** |
| **Mathematical Accuracy** | High (Manual formulas) | Low (Prone to arithmetic errors) | **100% Deterministic Python Math** |
| **Evidence Auditability** | Disconnected data tables | None (Black-box generation) | **SHA-256 Cryptographic Lineage (9 Nodes)** |
| **Investigation Orchestration** | None | Ad-hoc single prompts | **11-Node LangGraph State Graph** |
| **AI Safety & Abstention** | N/A | Generates ungrounded text | **Mandatory Abstention Gate (&lt;65%)** |
| **Prescriptive Action Levers** | None | Generic text advice | **Quantified Action Levers (+$484K)** |
| **What-If Simulation** | Static parameters | None | **Real-Time Elasticity Modeling (+$341.4K)** |

---

## 3. Canonical Demonstration Scenario & Verified Metrics

- **Target KPI:** North America East Revenue (`north_america_east_revenue`)
- **Baseline Period (2026-Q2):** `$15,430,000.06`
- **Target Period (2026-Q3):** `$14,200,000.05`
- **Net Variance:** `-$1,230,000.01` (`-7.97%`, `CRITICAL_NEGATIVE_VARIANCE`)
- **Primary Causal Driver:** Atlanta DC Stockout (`43.2%` share / `-$550,000.00` impact / `94%` confidence)
- **Secondary Drivers:** SKU-8821 Volume Contraction (`26.7%`), Distributor PO Deferrals (`18.8%`), Horizon Pricing (`11.3%`)
- **Total Explained Variance:** `100.0%`
- **Analytical Confidence:** `89% HIGH` (Abstention Gate calibrated at `<65%`)
- **Priority 1 Action Lever:** Emergency stock transfer from Chicago $\to$ Atlanta (`+$484,000.00` recovery, 14-day SLA)
- **What-If Simulation Benchmark:** `79.4%` $\to$ `90.0%` inventory availability yields `+$341,422.91` recovery and `+1.4 pts` gross margin lift ($32,209.71 per percentage point)
- **Combined Recovery Opportunity:** `+$757,600.00`
- **Enterprise ROI Benchmark:** `4.8x – 7.2x` first-year ROI against $240K ARR

---

## 4. Master Navigation & Evaluator Entry Points

| Evaluator Goal | Document / Entry Point | Description |
| :--- | :--- | :--- |
| **5-Minute Evaluation** | [`JUDGE_QUICKSTART.md`](./JUDGE_QUICKSTART.md) | High-level system overview, core principles, and 7-screen route map. |
| **Live Product Demo** | [`http://localhost:3000`](http://localhost:3000) | Running prototype across all 7 competition screens. |
| **Pitch Deck Specification** | [`../presentation/FINAL_COMPETITION_PITCH_DECK.md`](../presentation/FINAL_COMPETITION_PITCH_DECK.md) | 12-slide executive presentation specification and Q&A playbook. |
| **Demo Video Scripts** | [`../demo/FINAL_3_MINUTE_VIDEO_SCRIPT.md`](../demo/FINAL_3_MINUTE_VIDEO_SCRIPT.md) | Time-stamped 180s video script with exact narration and UI actions. |
| **Master Architecture** | [`../architecture/MASTER_ARCHITECTURE.md`](../architecture/MASTER_ARCHITECTURE.md) | Deep-dive technical blueprint across all 12 subsystems. |
| **Business Proposal** | [`../business-proposal/BUSINESS_PROPOSAL.md`](../business-proposal/BUSINESS_PROPOSAL.md) | Comprehensive commercial strategy, market sizing, and unit economics. |
| **Clean Reproduction** | [`REPRODUCIBILITY_GUIDE.md`](./REPRODUCIBILITY_GUIDE.md) | 4-step clean clone and setup blueprint. |
| **Final Delivery Matrix** | [`FINAL_DELIVERY_MATRIX.md`](./FINAL_DELIVERY_MATRIX.md) | Submission asset status and verification tracking. |
