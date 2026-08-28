# FastAPI REST API Readiness & Contract Audit

> **Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai**  
> *Technical API audit verifying schema contracts, error handling, persona invariance, and competition endpoints.*

---

## 🌐 Endpoint Surface Audit Matrix

All endpoints operate under the standard API prefix (`/api/v1`) and enforce typed Pydantic v2 schemas:

```text
┌────────┬──────────────────────────────────────────┬─────────────────────────────┬───────────┐
│ METHOD │ ROUTE PATTERN                            │ RESPONSE SCHEMA CONTRACT    │ STATUS    │
├────────┼──────────────────────────────────────────┼─────────────────────────────┼───────────┤
│ GET    │ /api/v1/kpis                             │ List[KPISummary]            │ ✅ PASS   │
│ GET    │ /api/v1/kpis/{id}                        │ KPIDetail                   │ ✅ PASS   │
│ GET    │ /api/v1/investigations/{id}              │ InvestigationResult         │ ✅ PASS   │
│ GET    │ /api/v1/investigations/{id}/decision-gr  │ DecisionGraphResponse       │ ✅ PASS   │
│ GET    │ /api/v1/investigations/{id}/langgraph-tr │ LangGraphTraceResponse      │ ✅ PASS   │
│ GET    │ /api/v1/evidence/{id}                    │ EvidenceRecord              │ ✅ PASS   │
│ GET    │ /api/v1/evidence/{id}/lineage            │ EvidenceLineageResponse     │ ✅ PASS   │
│ GET    │ /api/v1/recommendations/{kpi_id}         │ RecommendationResponse      │ ✅ PASS   │
│ POST   │ /api/v1/simulations/run                  │ SimulationResponse          │ ✅ PASS   │
│ POST   │ /api/v1/ai/explain                       │ AIExplanationResponse       │ ✅ PASS   │
│ GET    │ /api/v1/demo/investigation/{kpi_id}      │ CompetitionDemoResponse     │ ✅ PASS   │
│ GET    │ /api/v1/demo/replay/{kpi_id}             │ InvestigationReplayResponse │ ✅ PASS   │
│ GET    │ /api/v1/demo/readiness                   │ SubmissionReadinessResponse │ ✅ PASS   │
└────────┴──────────────────────────────────────────┴─────────────────────────────┴───────────┘
```

---

## 🔒 Security, Invariance & Error Handling Audits

1. **Deterministic Parity & Invariance:**
   - Evaluated `/api/v1/investigations/north_america_east_revenue` across multiple requests.
   - Result: Baseline `$15,430,000.06`, Actual `$14,200,000.05`, Variance `-$1,230,000.01` (`-7.97%`), Driver 1 `43.2%` (`-$550,000.00`), Confidence `89%`.
   - Invariance verified: 100% numerical identity across all calls.
2. **Dual-Persona Invariance:**
   - Querying with `persona=cfo` vs `persona=regional_sales_manager` adapts narrative text while preserving identical financial metrics and driver allocations.
3. **Resilient Error Handling:**
   - Querying unknown KPI IDs returns structured 404 responses (`{"detail": "KPI not found"}`) without unhandled 500 exceptions.
   - Bounded simulation inputs (e.g. availability $> 100\%$ or $< 0\%$) return 422 validation errors.
4. **Secret Isolation:**
   - Responses never expose API tokens or private headers.
