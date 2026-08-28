# InsightPilot AI — Repository Architectural Tour

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** High-Level Codebase Map & Directory Guide for Reviewers  

---

## 🗺️ High-Level Codebase Map

InsightPilot AI is organized as a clean, decoupled monorepo structured into dedicated tiers for data, analytics, AI orchestration, API routing, frontend presentation, and documentation:

```text
InsighPilotAI/
├── analytics/                 # ⚙️ Deterministic Analytics & Quantitative Engines
├── ai_service/                # 🧠 LangGraph Orchestration, Routing & Grounding Safety
├── backend/                   # 🌐 FastAPI (ASGI) REST Gateway & Middleware
│   └── app/
│       ├── routers/           # API Endpoints (KPIs, Drivers, Evidence, Graph, Recs, Sim)
│       └── schemas/           # Pydantic v2 Request/Response Data Contracts
├── frontend/                  # 💻 Next.js 14 Web Application (App Router)
│   └── next-app/
│       ├── app/               # 7 Executive Screens (/root-cause, /investigation, etc.)
│       └── components/        # Dynamic Decision Graph, Charts, Sliders, & UI
├── data/                      # 📊 Normalized Enterprise Datasets & JSON Schemas
│   ├── raw/                   # 8 CSV Files (Revenue, Inventory, Orders, Tickets, Intel)
│   └── schemas/               # JSON Schema Contracts Defining Data Boundaries
├── docs/                      # 📚 Authoritative Technical Documentation Hub
│   ├── architecture/          # Master Architecture, System Design & Schemas
│   ├── portfolio/             # 💼 Recruiter Overview, Case Study, & Showcase
│   ├── operations/            # 🚀 Cloud Deployment Runbooks, Health & Go-Live
│   ├── submission/            # 🏆 Final Competition Package & Delivery Matrix
│   ├── presentation/          # 🎯 Pitch Deck Specification & Visual Blueprint
│   ├── rehearsal/             # 🎤 Judge Simulation & Rehearsal Q&A Scripts
│   └── demo/                  # 🎬 Demo Video Scripts, Storyboards & Recording Guide
└── tests/                     # 🧪 Automated Regression & Validation Test Suite
    ├── api/                   # FastAPI Endpoints, Middleware & Phase Tests (259 Tests)
    ├── e2e/                   # End-to-End Contract & Data Flow Verification
    └── validate_dataset.py    # 6-Point CSV Schema & Referential Integrity Validator
```

---

## 🔍 Where to Inspect Key Capabilities

### 1. Quantitative Logic & Deterministic Truth
- **`analytics/`**: Contains pure Python engines. Inspect `kpi_engine.py` for anomaly detection, `driver_engine.py` for 100% variance attribution, `evidence_engine.py` for SHA-256 generation, `confidence_engine.py` for calibrated scoring, and `simulation_engine.py` for supply chain elasticity.

### 2. AI Safety, Multi-Model Routing & LangGraph
- **`ai_service/`**: Inspect `orchestration/state_graph.py` for the 11-node LangGraph lifecycle, `llm_router.py` for Groq/Gemini multi-pool failover routing, `grounding_validator.py` for hallucination defense, and `fallback_synthesizer.py` for zero-downtime deterministic synthesis.

### 3. API Gateway, Security & Telemetry
- **`backend/app/`**: Inspect `main.py` for ASGI startup, `security.py` for OWASP headers, `logging.py` for structured JSON correlation telemetry (`X-Request-ID`), and `routers/` for clean RESTful routes.

### 4. Executive Frontend Experience
- **`frontend/next-app/app/`**: Inspect `page.tsx` (Command Center), `root-cause/page.tsx` (Waterfall), `investigation/page.tsx` (LangGraph Trace), `decision-graph/page.tsx` (Dynamic DAG), `evidence/page.tsx` (Evidence Lineage), `recommendations/page.tsx` (Simulation Sandbox), and `briefing/page.tsx` (CFO Boardroom Brief).

### 5. Datasets & Schemas
- **`data/`**: Ingests 43,000+ normalized records across 8 entity schemas (`revenue.csv`, `inventory.csv`, `sales.csv`, `margin.csv`, `distributor_orders.csv`, `support_tickets.csv`, `distributor_communications.csv`, `market_intelligence.csv`).

### 6. Automated Testing & Verification
- **`tests/`**: Run `python tests/validate_dataset.py` to verify datasets or `python -m unittest discover -s tests -t . -p "test_*.py"` to execute all 259 backend test cases.
