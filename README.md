# InsightPilot AI

> **Enterprise Decision-Intelligence Prototype**  
> Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai  
> **Status:** Working Prototype — Complete End-to-End Decision Intelligence Pipeline

---

InsightPilot AI is an enterprise decision-intelligence platform that automates the transition from descriptive anomaly detection to prescriptive action. Traditional dashboards reveal *what* changed, but investigating *why* it changed requires manually joining siloed enterprise systems. InsightPilot AI decomposes metric movements, traces findings to cryptographically verified evidence, generates persona-grounded AI explanations with Google Gemini, prioritizes prescriptive interventions, and runs deterministic what-if simulations.

---

## The Problem

Traditional Business Intelligence dashboards suffer from three critical bottlenecks:
1. **Descriptive Limitation:** Dashboards display metric variance (e.g., revenue drops 8%) but cannot explain root causes across complex multi-echelon supply chains and sales channels.
2. **Investigation Latency:** Root cause discovery requires data analysts to spend days manually correlating ERP tables, CRM tickets, EDI order logs, and market scraping feeds.
3. **Action Uncertainty:** Decision-makers lack calibrated, risk-bounded forecasting tools to model the revenue recovery and margin trade-offs of corrective actions before deployment.

---

## The Solution: Core Workflow

```text
Investigate ───► Explain ───► Recommend ───► Simulate
```

1. **Investigate:** Automatically detects anomalies and deterministically decomposes KPI variance into mathematically ranked causal drivers.
2. **Explain:** Synthesizes multi-factor findings using grounded Google Gemini reasoning tailored to executive personas (CFO, Regional Sales Manager).
3. **Recommend:** Ranks constraint-aware, high-impact operational interventions backed by verified empirical evidence.
4. **Simulate:** Executes deterministic counterfactual what-if elasticity modeling to project revenue and margin recovery.

---

## Core Capabilities

- **Deterministic KPI Analytics:** Authoritative multi-period variance calculation, baseline state extraction, and multidimensional breakdowns.
- **Mathematical Driver Ranking:** Multi-factor contribution scoring ($43.2\%$ Atlanta DC Stockout, $26.7\%$ SKU-8821 Volume, $18.8\%$ Order Deferral, $11.3\%$ Competitor Pricing).
- **Interactive Decision Graph:** 6-column presentation topology linking KPIs → Causal Drivers → Empirical Evidence → Action Levers → Projected Outcomes.
- **Evidence & Lineage Engine:** 9 cryptographically verified empirical evidence nodes linking ERP logs, Zendesk support tickets, CRM purchase orders, and market scrapes with 5-layer lineage tracking.
- **Confidence & Abstention Framework:** Explicit confidence scoring ($89\%$ overall) with calibrated abstention boundaries ($<65\%$) that suppress speculative causal assertions when telemetry is insufficient.
- **Persona-Aware Insights:** Dynamic narrative tailoring for **CFO** (financial exposure, margin, EBITDA) and **Regional Sales Manager** (distribution logistics, stockouts, customer fulfillment) without altering underlying quantitative truth.
- **Prescriptive Recommendation Engine:** Ranked action levers (Priority 1: Emergency Inventory Transfer, Priority 2: Distributor Recovery Outreach) with time horizons and recovery estimates.
- **Deterministic What-If Simulation:** Live supply-chain elasticity engine modeling recovery across availability scenarios ($79.4\% \rightarrow 90.0\% \rightarrow +\$341.4\text{K}$ projected revenue recovery).
- **Boardroom Executive Briefing:** 5-section executive slide deck (Situation, Diagnosis, Evidence, Recommendation, Expected Impact) ready for executive decision-making.

---

## Technical Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   Synthetic Enterprise Datasets                        │
│   (ERP Inventory, Sales, Margin, Support CRM, EDI Orders, Market Intel) │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│            Authoritative Deterministic Engines (Python)                │
│    • KPI Analytics Engine       • Evidence & Lineage Validator         │
│    • Driver Decomposition       • Prescriptive Recommendation Engine   │
│    • Confidence Scorer          • Supply Chain Simulation Engine       │
└──────────────────┬───────────────────────────────┬─────────────────────┘
                   │                               │
                   │ (Authoritative Truth)         │ (Structured Context)
                   ▼                               ▼
┌──────────────────────────────────────┐   ┌─────────────────────────────┐
│       FastAPI REST Endpoints         │   │   Grounded Gemini Layer     │
│   • /api/v1/kpis                     │   │   • Structured Explanations │
│   • /api/v1/investigations/{id}      │   │   • Persona Adaptation      │
│   • /api/v1/evidence/{id}            │   │   • Grounding Validator     │
│   • /api/v1/recommendations/{id}     │   │   • Abstention Boundary     │
│   • /api/v1/simulations/run          │   └──────────────┬──────────────┘
│   • /api/v1/ai/explain/{id}          │                  │ (Validated Narrative)
└──────────────────┬───────────────────┘                  │
                   │                                      │
                   └───────────────────┬──────────────────┘
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  7-Screen Stitch Executive UI Platform                 │
│   1. Executive Command Center         5. Evidence Explorer             │
│   2. AI Investigation Activity        6. Recommendations & What-If     │
│   3. Root Cause Investigation         7. Executive Decision Briefing   │
│   4. Interactive Decision Graph                                        │
└────────────────────────────────────────────────────────────────────────┘
```

> **Critical Architectural Contract:**
> - **Deterministic Python engines are the sole authority for all quantitative numbers** (KPIs, variances, driver contributions, dollar impacts, confidence ratings, and simulation math).
> - **Google Gemini is isolated behind server-side APIs** to provide contextual reasoning, synthesis, and narrative explanation grounded strictly on pre-computed evidence.

---

## Locked Demonstration Scenario

- **KPI:** North America East Revenue (`north_america_east_revenue`)
- **Period Comparison:** 2026-Q2 ($\$15.43\text{M}$) $\rightarrow$ 2026-Q3 ($\$14.20\text{M}$)
- **Total Variance:** $-\$1.23\text{M}$ ($-7.97\% \approx -8.0\%$)
- **Primary Decomposed Drivers:**
  1. **Atlanta DC Stockout:** $43.2\%$ contribution ($-\$550\text{K}$, $94\%$ confidence)
  2. **SKU-8821 Sales Volume:** $26.7\%$ contribution ($-\$340\text{K}$, $89\%$ confidence)
  3. **Distributor Orders Deferral:** $18.8\%$ contribution ($-\$240\text{K}$, $85\%$ confidence)
  4. **Competitor Horizon Pricing:** $11.3\%$ contribution ($-\$144\text{K}$, $78\%$ confidence)
- **Deterministic Recommendations:**
  - **Emergency Inventory Transfer:** $+\$484\text{K}$ recovery, $91\%$ confidence, 14-day execution.
  - **Distributor Recovery Outreach:** $+\$180\text{K}$ recovery, $85\%$ confidence, 21-day execution.
- **Live What-If Simulation:**
  - **Baseline Availability:** $79.4\%$
  - **Target Scenario:** $90.0\%$
  - **Projected Recovery:** $+\$341.4\text{K}$ ($\$14.54\text{M}$ revenue, $+1.4\text{ pts}$ margin, $91\%$ confidence).

---

## Technology Stack

- **Backend:** Python 3.10+, FastAPI, Uvicorn, Pydantic v2, HTTPX, python-dotenv
- **AI Intelligence:** Google GenAI SDK (`gemini-2.5-flash`), server-side prompt versioning, structured JSON schema validation, evidence grounding validator
- **Frontend:** Semantic HTML5, Tailwind CSS CDN (Material 3 Dark tokens), Vanilla JavaScript (ES Modules), Material Symbols Outlined, Manrope & Inter Typography
- **Testing:** Python `unittest` suite (109 unit, integration, and UI contract tests), dataset schema validator

---

## Repository Structure

```text
insightpilot-ai/
├── backend/
│   └── app/
│       ├── main.py                  # FastAPI application entrypoint & middleware
│       ├── config.py                # App configuration & CORS settings
│       ├── schemas.py               # Pydantic API response contracts
│       ├── routes/                  # Modular API endpoints (kpis, investigations, etc.)
│       └── services/                # Backend services & GeminiService
├── analytics/                       # Deterministic KPI & driver decomposition engines
├── evidence/                        # Evidence extraction, ranking, validation & lineage
├── recommendations/                 # Prescriptive recommendation engine
├── simulation/                      # Supply chain what-if elasticity engine
├── ai/                              # Prompt templates & grounding validator
├── data/
│   ├── raw/                         # 9 synthetic enterprise CSV datasets
│   ├── schemas/                     # JSON schema definitions
│   └── DATASET_README.md            # Dataset specification documentation
├── frontend/
│   ├── api/client.js                # Browser fetch API client
│   ├── state/store.js               # Persona-aware state store & caching
│   ├── utils/formatters.js          # Financial & metric formatters
│   └── config/config.js             # API base URL configuration
├── stitch_insightpilot_ai_executive_platform/
│   ├── executive_command_center_v3_optimized_hierarchy/   # Screen 1
│   ├── ai_investigation_activity_v2/                       # Screen 2
│   ├── root_cause_investigation_v2/                        # Screen 3
│   ├── decision_graph_v4_final_presentation_view/         # Screen 4
│   ├── evidence_explorer_v2/                               # Screen 5
│   ├── recommendations_simulation_v3_decision_ready/       # Screen 6
│   └── executive_briefing_v3_boardroom_ready/              # Screen 7
├── tests/                           # 109 unit, integration & UI contract tests
├── docs/
│   ├── DEMO_FLOW.md                 # 10-step boardroom walkthrough guide
│   ├── ROUND2_REQUIREMENTS.md       # Round 2 technical architecture spec
│   └── architecture/                # Data contracts & economic reconciliation
├── requirements.txt                 # Minimal Python dependencies
├── .env.example                     # Environment template (no secrets)
└── README.md                        # Root product documentation
```

---

## Running Locally

### 1. Prerequisites
- Python 3.10+
- Optional: Google Gemini API key (system gracefully runs in offline deterministic mode if key is omitted).

### 2. Setup Environment
```bash
# Clone the repository
git clone https://github.com/ayus1234/InsighPilotAI.git
cd InsighPilotAI

# Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment (optional)
cp .env.example .env
```

### 3. Start Backend Server (Port 8000)
```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```
- API Documentation: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/v1/health`

### 4. Start Frontend Server (Port 8080)
In a separate terminal:
```bash
python -m http.server 8080
```
- Open in browser:
```text
http://localhost:8080/stitch_insightpilot_ai_executive_platform/executive_command_center_v3_optimized_hierarchy/code.html
```

---

## Running Test Suites

Execute the comprehensive test suite across all subsystems:

```bash
# 1. Validate dataset integrity
python tests/validate_dataset.py

# 2. Run unit and integration tests
python -m unittest discover -s tests/analytics -p "test_*.py" -v
python -m unittest discover -s tests/evidence -p "test_*.py" -v
python -m unittest discover -s tests/ai -p "test_*.py" -v
python -m unittest discover -s tests/recommendations -p "test_*.py" -v
python -m unittest discover -s tests/simulation -p "test_*.py" -v
python -m unittest discover -s tests/api -p "test_*.py" -v
```
**Result:** 109 / 109 tests passing (100%).

---

## Demonstration Walkthrough

For a step-by-step presentation script covering the entire 7-screen executive flow, see [DEMO_FLOW.md](docs/DEMO_FLOW.md).

---

## Project Status

This repository is an evaluation prototype developed for the **Accenture Innovation Challenge 2026 (Track 3 — BusinessIntelligence.ai)**.
