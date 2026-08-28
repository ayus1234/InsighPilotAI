# InsightPilot AI — Claim Validation Matrix & Safe Wording Guide

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Authoritative Claim Classification, Evidence Mapping & Safe Wording Guide  
**Status:** `REHEARSAL READY`

---

## 1. Classification Taxonomy

Every competition claim must be mapped to one of the following authoritative categories:
- `VERIFIED IN CODE`
- `VERIFIED IN TESTS`
- `VERIFIED IN DATA`
- `DOCUMENTED BUSINESS ASSUMPTION`
- `MODELED SCENARIO`
- `FUTURE ROADMAP`
- `UNSUPPORTED — DO NOT CLAIM`

---

## 2. Master Claim Classification & Verification Matrix

| # | Specific Claim | Rigorous Classification | Repository Evidence Source | Recommended Safe Wording | Risky Wording to Avoid |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | **-$1,230,000.01 Net Revenue Variance (-7.97%)** | `VERIFIED IN DATA` / `VERIFIED IN TESTS` | `data/revenue.csv`, `analytics/engine.py`, `tests/validate_dataset.py` | "The canonical benchmark demonstrates an exact -$1.23M (-7.97%) critical variance." | "Revenue is estimated to be down roughly 8%." |
| **2** | **Atlanta DC Stockout (43.2% / -$550K / 94% Conf)** | `VERIFIED IN CODE` / `VERIFIED IN DATA` | `analytics/investigation_engine.py`, `backend/app/routes/investigations.py` | "Causal decomposition isolates Atlanta DC stockouts as the top driver (43.2% / -$550K at 94% confidence)." | "AI discovered a stockout by scanning unstructured data." |
| **3** | **89% HIGH Investigation Confidence Score** | `VERIFIED IN CODE` / `VERIFIED IN TESTS` | `analytics/confidence.py`, `tests/unit/test_confidence_engine.py` | "Our 6-factor confidence engine evaluates analytical confidence at 89% (HIGH tier)." | "The system is 89% certain of absolute reality." |
| **4** | **65% Mandatory Abstention Safety Gate** | `VERIFIED IN CODE` / `VERIFIED IN TESTS` | `ai/langgraph/graph.py`, `tests/api/test_phase73_submission_readiness.py` | "If confidence falls below 65%, the system deliberately abstains from generative reasoning." | "The AI guarantees it will never give a wrong answer." |
| **5** | **SHA-256 Cryptographic Evidence Lineage** | `VERIFIED IN CODE` / `VERIFIED IN DATA` | `backend/app/services/evidence_service.py`, `tests/api/test_phase72_judge_journey.py` | "9 empirical evidence nodes carry immutable 64-character SHA-256 verification digests." | "Blockchain-verified decentralized evidence." |
| **6** | **+$484,000.00 Priority 1 Action Recovery** | `VERIFIED IN CODE` / `VERIFIED IN TESTS` | `analytics/recommendations.py`, `backend/app/routes/recommendations.py` | "Priority 1 prescribes an emergency stock transfer unlocking +$484K in recovery potential." | "The system guarantees $484K will hit the bank account." |
| **7** | **+$341,422.91 Simulation Recovery at 90.0%** | `MODELED SCENARIO` | `analytics/simulation.py`, `backend/app/routes/simulations.py` | "In our simulation sandbox, raising availability from 79.4% to 90.0% models a +$341.4K recovery." | "Raising availability will automatically generate $341K." |
| **8** | **+1.40 Percentage Points Gross Margin Lift** | `MODELED SCENARIO` | `analytics/simulation.py`, `docs/business-proposal/FINANCIAL_ANALYSIS.md` | "Elasticity modeling projects a +1.40 percentage point margin expansion under target availability." | "Gross margins are guaranteed to increase by 1.4%." |
| **9** | **+$757,600.00 Total Recovery Opportunity Pool** | `MODELED SCENARIO` | `docs/business-proposal/FINANCIAL_ANALYSIS.md`, `analytics/recommendations.py` | "The system identifies a total quantified recovery pool of $757,600 across operational interventions." | "We have delivered $757K in recovered cash." |
| **10** | **~95% Anomaly Triage Time Reduction** | `DOCUMENTED BUSINESS ASSUMPTION` | `docs/business-proposal/BUSINESS_PROPOSAL.md` | "Automating cross-silo correlation reduces diagnostic triage time by ~95% (weeks to seconds)." | "All enterprise operations become 95% faster." |
| **11** | **4.8x – 7.2x First-Year Enterprise ROI** | `DOCUMENTED BUSINESS ASSUMPTION` | `docs/business-proposal/FINANCIAL_ANALYSIS.md` | "Our financial model projects a 4.8x to 7.2x first-year ROI against a $240K ARR subscription." | "Our enterprise clients currently achieve a 7.2x ROI." |
| **12** | **11-Node LangGraph Multi-Agent Orchestrator** | `VERIFIED IN CODE` / `VERIFIED IN TESTS` | `ai/langgraph/graph.py`, `tests/api/test_langgraph_trace_endpoint.py` | "An 11-node LangGraph state machine orchestrates data retrieval, gating, and validation." | "An autonomous swarm of sentient AI agents." |
| **13** | **6-Column Dynamic Causal Decision Graph** | `VERIFIED IN CODE` / `VERIFIED IN TESTS` | `backend/app/routes/investigations.py`, `tests/e2e/test_decision_graph_flow.py` | "A 6-column topology connects anomalies across 14 nodes and 17 edges directly to actions." | "A static hardcoded flowchart." |
| **14** | **Zero Numerical Hallucination Architecture** | `VERIFIED IN CODE` / `VERIFIED IN TESTS` | `ai/validator.py`, `ai/service.py` | "Numerical hallucination is prevented by design because 100% of figures are pre-computed in Python." | "The LLM is 100% infallible and never makes mistakes." |
| **15** | **Automated ERP Writeback Webhooks** | `FUTURE ROADMAP` | `docs/business-proposal/IMPLEMENTATION_PLAN.md` | "On our enterprise roadmap, executive approval triggers automated SAP/Salesforce writebacks." | "The prototype automatically modifies live SAP databases." |

---

## 3. Strict Phrasing Guidelines for the Presenter

### Always Say:
- *"The deterministic analytics engine computes 100% of mathematical truth."*
- *"The 11-node LangGraph pipeline orchestrates investigation and enforces safety gates."*
- *"The multi-model AI explains pre-verified analytical truth with post-generation grounding validation."*
- *"The simulation sandbox models potential recovery based on empirical elasticity."*
- *"Our commercial proposal models a 4.8x to 7.2x first-year ROI based on benchmark scenario value."*

### Never Say:
- ❌ *"The AI never hallucinates."*
- ❌ *"We have enterprise customers running this in production."*
- ❌ *"The system guarantees $757K in recovered cash."*
- ❌ *"Our deep learning model discovered true philosophical causality."*
- ❌ *"The LLM queried the live SQL database and calculated revenue."*
