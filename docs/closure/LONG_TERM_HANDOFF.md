# InsightPilot AI — Long-Term Project Handoff Manual

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Authoritative Long-Term Maintenance, Architecture & Ownership Guide  
**Status:** `PERMANENT HANDOFF DOCUMENT`

---

## 📖 1. Project Purpose & Core Problem

InsightPilot AI is an enterprise decision-intelligence platform built to eliminate diagnostic latency in supply chains and distribution networks. When a critical business metric deviates (e.g. quarterly revenue drops -7.97%), traditional BI dashboards show *that* it dropped, but identifying *why* requires weeks of manual cross-dataset SQL queries. Generic GenAI chatbots attempt to answer these questions by hallucinating numbers without audit trails.

InsightPilot AI automates root-cause diagnosis into 4 ranked causal drivers, computes 64-character SHA-256 cryptographic evidence digests, enforces a &lt;65% confidence abstention safety guard, and provides What-If simulation modeling in an interactive Next.js 14 executive interface.

---

## 🏛️ 2. Architectural Philosophy & Invariants

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FOUNDATIONAL ARCHITECTURAL INVARIANT                  │
│                                                                             │
│  "Deterministic systems own quantitative truth. LangGraph orchestrates      │
│   investigation. AI explains grounded facts."                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Deterministic Primacy:** Large Language Models (LLMs) are strictly forbidden from calculating financial variances, ranking drivers, generating evidence citations, or modeling simulations.
- **Agentic Orchestration:** LangGraph manages an 11-node state graph to structure reasoning, hypothesis testing, and fallback routing.
- **Grounded Explanation:** LLMs act solely as structured natural language synthesizers bounded by validated context.

---

## 🔍 3. Subsystem Architectural Overview

1. **Data Layer (`data/`):** Ingests 8 normalized CSV datasets (43,000+ records across `revenue.csv`, `inventory.csv`, `sales.csv`, `margin.csv`, `distributor_orders.csv`, `support_tickets.csv`, `distributor_communications.csv`, `market_intelligence.csv`) validated against strict JSON schemas.
2. **Deterministic Analytics (`analytics/`):** Pure Python calculation engines executing variance decomposition, 4-factor root-cause attribution, and confidence scoring.
3. **Evidence & Lineage (`evidence/`):** Generates 64-character SHA-256 cryptographic hashes for each of the 9 empirical evidence records.
4. **Simulation Engine (`simulation/`):** Models supply chain inventory availability elasticity ($32,209.71 per percentage point recovery).
5. **AI Orchestration & Safety (`ai/`):** LangGraph 11-node StateGraph, Groq LLaMA 3.3 / Gemini 2.5 capability-aware router, post-generation regex validator, and &lt;65% confidence abstention gate.
6. **API Gateway (`backend/app/`):** FastAPI ASGI gateway with OWASP security headers, `X-Request-ID` correlation telemetry, and global error shielding.
7. **Frontend Web Application (`frontend/next-app/`):** Next.js 14 App Router, React 18, Glassmorphic UI with 10 pre-rendered static pages and 7 executive screens.

---

## 🚀 4. How to Run the Project Locally

### A. Prerequisites
- **Python:** 3.11 or higher
- **Node.js:** 18.x or higher

### B. Backend Execution
```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Start FastAPI server (runs out-of-the-box in deterministic fallback mode without external API keys)
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```
- API Health Probe: `http://127.0.0.1:8000/health`
- 12-Subsystem Readiness: `http://127.0.0.1:8000/api/v1/demo/readiness`
- Interactive Swagger Docs: `http://127.0.0.1:8000/docs`

### C. Frontend Execution
```bash
cd frontend/next-app

# 1. Install Node.js dependencies
npm install

# 2. Start Next.js development server
npm run dev
```
- Web Application: `http://localhost:3000`

---

## 🧪 5. How to Verify the Project

Execute the 3-step zero-drift verification pipeline:

```bash
# Step 1: Validate dataset integrity (6/6 checks passing)
python tests/validate_dataset.py

# Step 2: Run full automated regression suite (279+ tests passing)
python -m unittest discover -s tests -t . -p "test_*.py"

# Step 3: Build Next.js production bundle (10/10 static routes passing)
cd frontend/next-app && npm run build
```

---

## 🔒 6. Canonical Truth Boundaries & Locked Metrics

Future maintainers MUST preserve the following canonical invariants:
- **Revenue Anomaly:** `$15,430,000.06` $\to$ `$14,200,000.05` (`-$1,230,000.01` / `-7.97%`)
- **Primary Root Cause:** `Atlanta DC Stockout` (`43.2%` share / `-$550,000.00` impact / `94%` confidence)
- **Analytical Confidence:** `89% HIGH`
- **Mandatory Abstention Boundary:** `<65%`
- **Priority 1 Action Recovery:** `+$484,000.00` (14-day SLA)
- **What-If Simulation:** `79.4%` $\to$ `90.0%` availability yields `+$341,422.91` recovery and `+1.4 pts` margin lift ($32,209.71/pt)
- **Combined Recovery Pool:** `+$757,600.00`
- **Decision Graph:** 6 columns, 14 nodes, 17 edges
- **LangGraph Lifecycle:** 11-node state graph
- **Evidence Lineage:** 9 empirical records with SHA-256 cryptographic digests

---

## 🛡️ 7. Core Safety Boundaries

1. **Mandatory Abstention Gate:** If confidence falls below 65%, `analytics/confidence_engine.py` triggers an automated block, preventing the AI from drawing conclusions.
2. **Post-Generation Grounding Validator:** `ai/validator.py` regex-validates all numerical figures and evidence IDs before returning responses.
3. **Zero Secret Leakage:** Global exception handlers in `backend/app/errors.py` intercept unhandled errors, ensuring no stack traces or server paths are leaked.
4. **SHA-256 Lineage:** Evidence records cannot be altered without changing their 64-character hash digest.

---

## 🔧 8. Maintenance & Troubleshooting Guidelines

### Updating Dependencies:
- Backend: Update `requirements.txt` and run `python -m unittest discover -s tests -t . -p "test_*.py"` to ensure zero contract breaks.
- Frontend: Update `package.json` and run `npm run build` to verify static page pre-rendering.

### Adding New KPIs or Drivers:
- Register the KPI in `analytics/kpi_engine.py`.
- Define the driver decomposition logic in `analytics/driver_engine.py`.
- Add test coverage in `tests/api/`.

### Troubleshooting:
- **Port 8000 in use:** Run `uvicorn backend.app.main:app --port 8001` and update `NEXT_PUBLIC_API_URL`.
- **External AI Rate Limits (429):** The router automatically fails over to secondary pools or deterministic templates (`FallbackSynthesizer`).
