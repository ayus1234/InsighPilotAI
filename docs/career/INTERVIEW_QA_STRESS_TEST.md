# InsightPilot AI — Technical Interview Stress-Test Q&A (30 Questions)

**Project:** InsightPilot AI  
**Author / Candidate:** Ayus  
**Document:** 30 Challenging Technical, Architectural & AI Safety Defense Questions  

---

## 🎯 30 Technical Interview Defense Scenarios

```text
================================================================================
                    INTERVIEW STRESS-TEST QUESTION BANK
================================================================================
```

### 1. "How do you guarantee that your variance calculations never suffer from floating-point rounding errors?"
- **Answer:** We execute all arithmetic using Python's standard `round(val, 2)` formatting and integer cents representations where needed, explicitly validating that driver contributions sum to 100.0% ($\pm 0.01$ rounding boundary).
- **Evidence:** `analytics/driver_engine.py`.
- **Overclaim to Avoid:** Do not claim using arbitrary-precision financial libraries like `decimal.Decimal` unless explicitly imported.
- **Follow-up:** "What happens if a driver has a negative contribution in a positive variance scenario?"
- **Deeper Answer:** The engine isolates directional movements, separating offsetting factors from additive drivers.

---

### 2. "Why use LangGraph instead of a standard sequential pipeline if your steps are mostly fixed?"
- **Answer:** LangGraph provides first-class state persistence, inspectable node transitions, conditional branching (e.g. routing to the abstention gate when confidence is &lt;65%), and structured replayability that standard linear scripts lack.
- **Evidence:** `ai/orchestration/state_graph.py`.
- **Overclaim to Avoid:** Don't claim the graph is an infinitely self-modifying autonomous agent.
- **Follow-up:** "How do you test individual LangGraph nodes in isolation?"
- **Deeper Answer:** Each node is a pure function taking `InvestigationState` and returning updates; unit tests pass mocked dictionaries to test node transformations independently.

---

### 3. "How does the SHA-256 evidence hashing prevent data tampering?"
- **Answer:** When an evidence record is retrieved, its canonical fields are sorted, serialized to JSON, and hashed using SHA-256. If a record in the database is modified, its hash changes, failing validation against the cited digest.
- **Evidence:** `evidence/evidence_engine.py`.
- **Overclaim to Avoid:** Don't claim it's a blockchain or distributed ledger; it's a cryptographic digest for data provenance.
- **Follow-up:** "Where are the digests stored?"
- **Deeper Answer:** Embedded in the evidence objects returned by the API and stored in state for downstream validation.

---

### 4. "What happens if the Groq API goes down and Gemini rate limits simultaneously?"
- **Answer:** The capability-aware router catches the exceptions, logs the provider failures, and activates `FallbackSynthesizer`, which serves pre-validated deterministic natural language templates with zero downtime.
- **Evidence:** `ai/providers/fallback_provider.py`, `backend/app/routes/`.
- **Overclaim to Avoid:** Don't claim infinite cloud redundancy without mentioning the local fallback.
- **Follow-up:** "Does the user know they are seeing a fallback?"
- **Deeper Answer:** Yes, response metadata includes `"provider": "deterministic_fallback"` and `"degraded_mode": true`.

---

### 5. "How is your confidence score calibrated?"
- **Answer:** It is a weighted heuristic combining data completeness (0.25), multi-source corroboration (0.35 across ERP/WMS/CRM), time-series continuity (0.20), and variance coverage (0.20), yielding an empirical 89% score on our benchmark scenario.
- **Evidence:** `analytics/confidence_engine.py`.
- **Overclaim to Avoid:** Don't claim it was trained with Bayesian posterior optimization.
- **Follow-up:** "Why is the abstention threshold set at 65%?"
- **Deeper Answer:** In enterprise operations, decisions requiring emergency freight reallocation require at least 2 corroborating data systems; below 65%, corroboration is insufficient.

---

### 6. "How does your regex grounding validator work in detail?"
- **Answer:** It extracts all monetary strings, percentages, and `EVID_*` IDs from the generated text and checks that every extracted entity exists in the input JSON payload. If any foreign metric is detected, the response is rejected.
- **Evidence:** `ai/validator.py`.
- **Overclaim to Avoid:** Don't say it does deep semantic entailment; it's an exact entity extraction guardrail.
- **Follow-up:** "Could an LLM hallucinate a non-numerical causal explanation that passes regex?"
- **Deeper Answer:** Yes, which is why prompts use strict few-shot constraints and why future iterations can integrate NLI (Natural Language Inference) models.

---

### 7. "How do you model What-If supply chain elasticity?"
- **Answer:** It uses a linear recovery model: $\text{Recovery} = (\text{Target Availability} - \text{Baseline Availability}) \times \text{Elasticity Coefficient}$, where the coefficient is calibrated from historical stockout losses ($32,209.71 per percentage point).
- **Evidence:** `simulation/simulation_engine.py`.
- **Overclaim to Avoid:** Don't claim it simulates multi-echelon non-linear stochastic queuing.
- **Follow-up:** "How are user inputs validated?"
- **Deeper Answer:** Pydantic validators reject availability values &lt;0% or &gt;100% and ensure target availability is greater than baseline.

---

### 8. "How does the frontend achieve sub-100ms first load times?"
- **Answer:** Next.js 14 pre-renders all 10 core routes as static HTML/JS bundles (`○ Static`), resulting in an `87.5 kB` shared JavaScript payload that loads instantly from edge CDNs.
- **Evidence:** `frontend/next-app/package.json`, Next.js build trace.
- **Overclaim to Avoid:** Don't claim server-side SSR caching on static exports.
- **Follow-up:** "How does dynamic data get rendered?"
- **Deeper Answer:** Client-side React components fetch from FastAPI endpoints with loading skeletons and local fallback cache.

---

### 9. "What is the structure of your 6-column Decision Graph?"
- **Answer:** It is a directed acyclic graph with 14 nodes and 17 edges spanning 6 columns: 1) Metric Anomaly $\to$ 2) Primary Driver $\to$ 3) Operational Cause $\to$ 4) Empirical Evidence $\to$ 5) Recommended Action $\to$ 6) Financial Outcome.
- **Evidence:** `ai/decision_graph/generator.py`, `frontend/next-app/app/decision-graph/page.tsx`.
- **Overclaim to Avoid:** Don't claim it's a dynamic GNN (Graph Neural Network).
- **Follow-up:** "How do you prevent circular references?"
- **Deeper Answer:** The topology is strictly unidirectional from column $i$ to column $i+1$.

---

### 10. "How do you test for secret leakage across git history and logs?"
- **Answer:** We enforce `.gitignore` rules, run automated tests checking that no API keys appear in environment files, logs, or static bundles, and verify that error handlers mask sensitive internal exceptions.
- **Evidence:** `SECURITY.md`, `tests/api/test_phase84_security_performance.py`.
- **Overclaim to Avoid:** Don't say you run proprietary enterprise DLP scanners.
- **Follow-up:** "What happens if a user submits an API key in a query parameter?"
- **Deeper Answer:** FastAPI middleware sanitizes request query strings before structured JSON logging.

---

### 11–30. Rapid Technical Stress Questions & Answers
11. **Q:** "How many CSV datasets exist?" **A:** 8 normalized CSVs containing 43,000+ records (`data/raw/`).
12. **Q:** "What is the primary driver?" **A:** Atlanta DC Stockout (43.2% contribution, -$550K impact).
13. **Q:** "What is the baseline vs target revenue?" **A:** $15.43M (2026-Q2) $\to$ $14.20M (2026-Q3), -$1.23M (-7.97%).
14. **Q:** "What is Priority 1 action recovery?" **A:** +$484,000.00 (Emergency stock transfer from Chicago to Atlanta).
15. **Q:** "What is the total recovery pool?" **A:** +$757,600.00 across all 3 recommended operational levers.
16. **Q:** "How many tests exist?" **A:** 271+ automated tests in `tests/` with 100% pass rate.
17. **Q:** "What is the API framework?" **A:** FastAPI with Pydantic v2 and ASGI middleware.
18. **Q:** "What security headers are used?" **A:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Cache-Control: no-store`.
19. **Q:** "How are requests correlated?" **A:** `X-Request-ID` injected in headers and structured JSON logs.
20. **Q:** "What LLMs are integrated?" **A:** Groq LLaMA 3.3 70B and Google Gemini 2.5 Flash.
21. **Q:** "What is the Next.js version?" **A:** Next.js 14.2 (App Router) with React 18 and Tailwind CSS.
22. **Q:** "How many static pages are built?" **A:** 10 static routes pre-rendered.
23. **Q:** "How does degraded mode work?" **A:** Returns deterministic calculations and template narratives when LLMs are offline.
24. **Q:** "Is the database currently multi-tenant?" **A:** Modeled at schema level; PostgreSQL multi-tenant partitioning is in production roadmap.
25. **Q:** "How long does the full test suite take?" **A:** ~140 seconds for all 271 unit, integration, and E2E tests.
26. **Q:** "What are the 4 ranked drivers?" **A:** Atlanta Stockout (43.2%), SKU-8821 Contraction (26.7%), PO Deferrals (18.8%), Competitor Horizon Pricing (11.3%).
27. **Q:** "What is the margin lift in simulation?" **A:** +1.4 percentage points when availability increases to 90.0%.
28. **Q:** "What is the LangGraph node count?" **A:** 11 nodes in the investigation state machine.
29. **Q:** "What is the Decision Graph node/edge count?" **A:** 14 nodes and 17 edges across 6 columns.
30. **Q:** "Where is this project deployed?" **A:** Validated locally and in pre-production; cloud runbooks prepared for Render and Vercel.
