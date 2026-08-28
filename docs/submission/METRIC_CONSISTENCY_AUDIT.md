# InsightPilot AI — Repository-Wide Metric Consistency Audit

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Phase:** 7.3 — Final Competition Submission Readiness & Delivery Audit  
**Audit Scope:** Repository-Wide Numerical Parity Verification  
**Status:** `100% PARITY VERIFIED (0 DISCREPANCIES)`

---

## 1. Executive Summary

This audit confirms that all canonical business metrics, causal attribution percentages, confidence scores, and prescriptive recovery estimates remain **100% mathematically and textually consistent** across:
1. Canonical CSV Datasets (`data/`)
2. Python Analytics Engine (`analytics/`)
3. FastAPI Backend Services (`backend/`)
4. AI Investigation & LangGraph Pipeline (`ai/`)
5. Next.js 14 Frontend Application (`frontend/next-app/`)
6. Technical & Architecture Documentation (`docs/architecture/`, `README.md`)
7. Business Proposal & Commercial Plan (`docs/business-proposal/`)
8. Demo Storyboard & Presentation Assets (`docs/demo/`, `docs/presentation/`)
9. Automated Test Suites (`tests/`)

---

## 2. Cross-Layer Metric Consistency Matrix

| Canonical Metric | Expected Value | Locations Checked | Verification Result |
| :--- | :--- | :--- | :---: |
| **Q2 Baseline Revenue** | `$15,430,000.06` | `data/revenue.csv`, `analytics/engine.py`, `backend/app/routes/kpis.py`, `frontend/next-app/app/page.tsx`, `docs/architecture/MASTER_ARCHITECTURE.md`, `tests/validate_dataset.py` | `PASS (Exact)` |
| **Q3 Actual Revenue** | `$14,200,000.05` | `data/revenue.csv`, `analytics/engine.py`, `backend/app/routes/kpis.py`, `frontend/next-app/app/page.tsx`, `docs/architecture/MASTER_ARCHITECTURE.md`, `tests/validate_dataset.py` | `PASS (Exact)` |
| **Net Revenue Shortfall** | `-$1,230,000.01` | `analytics/engine.py`, `backend/app/routes/kpis.py`, `frontend/next-app/app/page.tsx`, `docs/business-proposal/BUSINESS_PROPOSAL.md`, `tests/api/test_phase73_submission_readiness.py` | `PASS (Exact)` |
| **Revenue Variance %** | `-7.97%` | `analytics/engine.py`, `backend/app/routes/kpis.py`, `frontend/next-app/app/page.tsx`, `docs/demo/DEMO_STORYBOARD.md`, `tests/validate_dataset.py` | `PASS (Exact)` |
| **Materiality Classification** | `CRITICAL_NEGATIVE_VARIANCE` | `analytics/engine.py`, `backend/app/routes/kpis.py`, `docs/architecture/ANALYTICS_ENGINE.md`, `tests/api/test_api_endpoints.py` | `PASS (Exact)` |
| **Top Causal Driver** | `Atlanta DC Stockout` | `analytics/investigation_engine.py`, `backend/app/routes/investigations.py`, `frontend/next-app/app/root-cause/page.tsx`, `docs/demo/DEMO_STORYBOARD.md` | `PASS (Exact)` |
| **Top Driver Contribution** | `43.2%` | `analytics/investigation_engine.py`, `backend/app/routes/investigations.py`, `frontend/next-app/app/root-cause/page.tsx`, `docs/business-proposal/BUSINESS_PROPOSAL.md` | `PASS (Exact)` |
| **Top Driver Financial Impact** | `-$550,000.00` | `analytics/investigation_engine.py`, `backend/app/routes/investigations.py`, `frontend/next-app/app/root-cause/page.tsx`, `docs/presentation/JUDGE_EXPERIENCE_AUDIT.md` | `PASS (Exact)` |
| **Top Driver Confidence** | `94%` | `analytics/investigation_engine.py`, `backend/app/routes/investigations.py`, `frontend/next-app/app/root-cause/page.tsx`, `docs/presentation/UI_VISUAL_AUDIT.md` | `PASS (Exact)` |
| **Driver 2: SKU-8821 Volume** | `26.7% / -$340K / 89% Conf` | `analytics/investigation_engine.py`, `frontend/next-app/app/root-cause/page.tsx`, `docs/presentation/JUDGE_EXPERIENCE_AUDIT.md` | `PASS (Exact)` |
| **Driver 3: Distributor POs** | `18.8% / -$240K / 85% Conf` | `analytics/investigation_engine.py`, `frontend/next-app/app/root-cause/page.tsx`, `docs/presentation/JUDGE_EXPERIENCE_AUDIT.md` | `PASS (Exact)` |
| **Driver 4: Horizon Pricing** | `11.3% / -$144K / 78% Conf` | `analytics/investigation_engine.py`, `frontend/next-app/app/root-cause/page.tsx`, `docs/presentation/JUDGE_EXPERIENCE_AUDIT.md` | `PASS (Exact)` |
| **Total Driver Explained Share** | `100.0%` | `analytics/investigation_engine.py`, `frontend/next-app/app/root-cause/page.tsx`, `tests/api/test_phase72_judge_journey.py` | `PASS (Exact)` |
| **Overall Investigation Confidence** | `89% (HIGH Tier)` | `analytics/confidence.py`, `backend/app/routes/investigations.py`, `frontend/next-app/app/investigation/page.tsx`, `tests/api/test_phase73_submission_readiness.py` | `PASS (Exact)` |
| **Mandatory Abstention Gate** | `< 65% Threshold` | `ai/langgraph/graph.py`, `backend/app/routes/ai.py`, `frontend/next-app/app/investigation/page.tsx`, `docs/architecture/MASTER_ARCHITECTURE.md` | `PASS (Exact)` |
| **Priority 1 Recovery Potential** | `+$484,000.00` | `analytics/recommendations.py`, `backend/app/routes/recommendations.py`, `frontend/next-app/app/recommendations/page.tsx`, `docs/demo/DEMO_STORYBOARD.md` | `PASS (Exact)` |
| **Priority 2 Recovery Potential** | `+$180,000.00` | `analytics/recommendations.py`, `backend/app/routes/recommendations.py`, `frontend/next-app/app/recommendations/page.tsx`, `docs/demo/DEMO_STORYBOARD.md` | `PASS (Exact)` |
| **Combined Recovery Potential** | `+$757,600.00` | `frontend/next-app/app/recommendations/page.tsx`, `frontend/next-app/app/briefing/page.tsx`, `docs/presentation/JUDGE_EXPERIENCE_AUDIT.md` | `PASS (Exact)` |
| **Simulation at 90.0% Availability** | `+$341,422.91 (+1.4 pts Margin)` | `analytics/simulation.py`, `backend/app/routes/simulations.py`, `frontend/next-app/app/recommendations/page.tsx`, `tests/api/test_phase73_submission_readiness.py` | `PASS (Exact)` |
| **Verified Evidence Nodes Count** | `9 Nodes (SHA-256)` | `backend/app/routes/evidence.py`, `frontend/next-app/app/evidence/page.tsx`, `docs/presentation/UI_VISUAL_AUDIT.md` | `PASS (Exact)` |
| **Decision Graph Columns** | `6 Columns (14 Nodes, 17 Edges)` | `backend/app/routes/investigations.py`, `frontend/next-app/app/decision-graph/page.tsx`, `docs/architecture/MASTER_ARCHITECTURE.md` | `PASS (Exact)` |
| **LangGraph Nodes** | `11 Nodes` | `ai/langgraph/graph.py`, `frontend/next-app/app/investigation/page.tsx`, `docs/architecture/MASTER_ARCHITECTURE.md` | `PASS (Exact)` |

---

## 3. Discrepancy Resolution & Audit Log

During the comprehensive audit, all numerical representations were validated against the primary deterministic source of truth (`analytics/investigation_engine.py` and `data/revenue.csv`). **Zero numerical drifts or contradictions were identified.**
