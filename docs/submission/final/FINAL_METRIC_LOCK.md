# InsightPilot AI — Final Competition Metric Lock

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Authoritative Canonical Invariants & Metric Parity Lock  
**Status:** `LOCKED & IMMUTABLE`

---

## 1. Locked Canonical Metric Registry

| Metric Name | Exact Locked Value | Authoritative Repository Source | Reference Documents |
| :--- | :---: | :--- | :--- |
| **Baseline Revenue (2026-Q2)** | `$15,430,000.06` | `data/revenue.csv`, `analytics/engine.py` | `README.md`, `MASTER_ARCHITECTURE.md` |
| **Actual Revenue (2026-Q3)** | `$14,200,000.05` | `data/revenue.csv`, `analytics/engine.py` | `README.md`, `MASTER_ARCHITECTURE.md` |
| **Net Revenue Variance** | `-$1,230,000.01` | `analytics/engine.py`, `tests/validate_dataset.py` | `FINAL_SUBMISSION_PACKAGE.md` |
| **Percentage Variance** | `-7.97%` | `analytics/engine.py` | `FINAL_3_MINUTE_VIDEO_SCRIPT.md` |
| **Materiality Classification** | `CRITICAL_NEGATIVE_VARIANCE` | `analytics/engine.py` (Threshold: $\le -3.00\%$) | `DATA_CONTRACTS.md` |
| **Primary Root Cause** | `Atlanta DC Stockout` | `analytics/investigation_engine.py` | `MASTER_COMPETITION_NARRATIVE.md` |
| **Primary Driver Contribution** | `43.2%` | `analytics/investigation_engine.py` | `FINAL_COMPETITION_PITCH_DECK.md` |
| **Primary Driver Financial Impact**| `-$550,000.00` | `analytics/investigation_engine.py` | `FINAL_3_MINUTE_VIDEO_SCRIPT.md` |
| **Primary Driver Confidence** | `94%` | `analytics/investigation_engine.py` | `JUDGE_SIMULATION_PLAYBOOK.md` |
| **Secondary Driver 1 (SKU-8821)**| `26.7%` / `-$340,000.00` / `89%` | `analytics/investigation_engine.py` | `METRIC_CONSISTENCY_AUDIT.md` |
| **Secondary Driver 2 (Deferrals)**| `18.8%` / `-$240,000.00` / `85%` | `analytics/investigation_engine.py` | `METRIC_CONSISTENCY_AUDIT.md` |
| **Secondary Driver 3 (Horizon)** | `11.3%` / `-$144,000.00` / `78%` | `analytics/investigation_engine.py` | `METRIC_CONSISTENCY_AUDIT.md` |
| **Total Explained Variance Share**| `100.0%` | `analytics/investigation_engine.py` | `ANALYTICS_ENGINE.md` |
| **Investigation Confidence** | `89% HIGH` | `analytics/confidence.py` | `AI_SAFETY_QA.md` |
| **Mandatory Abstention Gate** | `<65%` | `ai/langgraph/graph.py` | `SECURITY.md`, `AI_SAFETY_QA.md` |
| **Priority 1 Action Recovery** | `+$484,000.00` | `analytics/recommendations.py` | `FINAL_SUBMISSION_PACKAGE.md` |
| **Priority 2 Action Recovery** | `+$180,000.00` | `analytics/recommendations.py` | `BUSINESS_DEFENSE_PLAYBOOK.md` |
| **Total Recovery Pool** | `+$757,600.00` | `docs/business-proposal/FINANCIAL_ANALYSIS.md` | `CLAIM_VALIDATION_MATRIX.md` |
| **Simulation Benchmark (90.0%)** | `+$341,422.91` | `analytics/simulation.py` | `FINAL_COMPETITION_PITCH_DECK.md` |
| **Simulation Gross Margin Lift** | `+1.40 percentage points` | `analytics/simulation.py` ($32,209.71/pt) | `FINANCIAL_ANALYSIS.md` |
| **Decision Graph Structure** | `6 Columns (14 Nodes, 17 Edges)` | `backend/app/routes/investigations.py` | `MASTER_ARCHITECTURE.md` |
| **LangGraph Pipeline Lifecycle**| `11 Nodes` | `ai/langgraph/graph.py` | `TECHNICAL_DEFENSE_PLAYBOOK.md` |
| **Evidence Repository Lineage** | `9 Nodes with SHA-256 Hashes` | `backend/app/services/evidence_service.py` | `UI_VISUAL_AUDIT.md` |

---

## 2. Invariant Protection Rule

No code change, prompt template edit, or documentation update may alter any locked value above. All values are tested deterministically in `tests/api/test_phase73_submission_readiness.py`, `tests/api/test_phase74_submission_assets.py`, `tests/api/test_phase75_judge_rehearsal.py`, and `tests/api/test_phase76_final_submission.py`.
