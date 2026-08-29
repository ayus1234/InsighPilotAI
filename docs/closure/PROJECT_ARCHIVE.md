# InsightPilot AI — Permanent Project Archive & Codebase Map

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Authoritative Directory Catalog & Evaluator Codebase Map  

---

## 🗂️ Complete Codebase & Documentation Architecture

```text
================================================================================
                    INSIGHTPILOT AI — REPOSITORY DIRECTORY MAP
================================================================================
```

### 1. Data Tier & Schemas
- **Purpose:** Ingests and validates 8 normalized enterprise datasets across 43,000+ records.
- **Directory:** `data/` (`data/raw/`, `data/schemas/`)
- **Key Files:** `revenue.csv`, `inventory.csv`, `sales.csv`, `margin.csv`, `distributor_orders.csv`, `support_tickets.csv`, `distributor_communications.csv`, `market_intelligence.csv`.
- **Validation:** `tests/validate_dataset.py` (6/6 schema and referential integrity checks).

### 2. Deterministic Analytics Engine
- **Purpose:** Computes 100% variance attribution, root-cause waterfall, and confidence scoring in pure Python.
- **Directory:** `analytics/`
- **Key Files:** `kpi_engine.py`, `driver_engine.py`, `confidence_engine.py`, `recommendations.py`, `data_loader.py`.

### 3. Cryptographic Evidence & Lineage
- **Purpose:** Generates 64-character SHA-256 hashes for empirical evidence records across ERP, CRM, and WMS.
- **Directory:** `evidence/`
- **Key Files:** `evidence_engine.py`, `evidence_retriever.py`, `lineage.py`, `evidence_validator.py`.

### 4. Supply Chain Simulation Engine
- **Purpose:** Models What-If inventory availability adjustments and linear revenue elasticity ($32,209.71/pt).
- **Directory:** `simulation/`
- **Key Files:** `simulation_engine.py`.

### 5. AI Orchestration, Safety & Routing
- **Purpose:** Manages 11-node LangGraph lifecycle, Groq/Gemini multi-model routing, and regex grounding validation.
- **Directory:** `ai/`
- **Key Files:** `ai/orchestration/state_graph.py`, `ai/client.py`, `ai/validator.py`, `ai/decision_graph/generator.py`, `ai/providers/`.

### 6. Backend API Gateway
- **Purpose:** FastAPI ASGI gateway providing 11 RESTful endpoints with OWASP security headers and correlation logging.
- **Directory:** `backend/app/`
- **Key Files:** `main.py`, `logging.py`, `security.py`, `errors.py`, `routes/`, `schemas/`.

### 7. Frontend Web Application
- **Purpose:** Next.js 14 App Router dashboard with 7 executive screens and 10 pre-rendered static routes.
- **Directory:** `frontend/next-app/`
- **Key Files:** `app/page.tsx` (Command Center), `app/root-cause/page.tsx`, `app/investigation/page.tsx`, `app/decision-graph/page.tsx`, `app/evidence/page.tsx`, `app/recommendations/page.tsx`, `app/briefing/page.tsx`.

### 8. Master Architecture Documentation
- **Purpose:** Comprehensive blueprints, mathematical models, and entity relationship diagrams.
- **Directory:** `docs/architecture/`
- **Key Files:** `MASTER_ARCHITECTURE.md`, `README.md`.

### 9. Engineering Quality & Maintainability Hub
- **Purpose:** Code hygiene reviews, 12-factor maintainability assessment, and technical debt register.
- **Directory:** `docs/engineering/`
- **Key Files:** `ENGINEERING_QUALITY_AUDIT.md`, `MAINTAINABILITY_ASSESSMENT.md`, `TECHNICAL_DEBT_REGISTER.md`, `README.md`.

### 10. Portfolio & Showcase Hub
- **Purpose:** Recruiter fast path, technical case study, and evaluator-friendly feature showcase.
- **Directory:** `docs/portfolio/`
- **Key Files:** `RECRUITER_OVERVIEW.md`, `CASE_STUDY.md`, `TECHNICAL_WALKTHROUGH.md`, `FEATURE_SHOWCASE.md`, `README.md`.

### 11. Career & Interview Hub
- **Purpose:** Role-tailored resume bullets, 16-topic technical storybook, 5 STAR stories, 30-question stress-test bank.
- **Directory:** `docs/career/`
- **Key Files:** `RESUME_PROJECT_BULLETS.md`, `TECHNICAL_INTERVIEW_STORYBOOK.md`, `SYSTEM_DESIGN_INTERVIEW_GUIDE.md`, `README.md`.

### 12. Operations & Cloud Deployment Hub
- **Purpose:** Render and Vercel cloud deployment runbooks, health probes, and handoff sign-offs.
- **Directory:** `docs/operations/`
- **Key Files:** `RENDER_DEPLOYMENT_RUNBOOK.md`, `VERCEL_DEPLOYMENT_RUNBOOK.md`, `ENVIRONMENT_READINESS_AUDIT.md`, `README.md`.

### 13. Competition Submission & Pitch Deck Hub
- **Purpose:** Final competition package, 12-slide pitch deck specification, demo video storyboard, judge defense transcripts.
- **Directories:** `docs/submission/`, `docs/presentation/`, `docs/demo/`, `docs/rehearsal/`.

### 14. Project Closure & Permanent Handoff Hub
- **Purpose:** Navigation integrity audit, long-term handoff manual, final state register, and closure report.
- **Directory:** `docs/closure/`
- **Key Files:** `LONG_TERM_HANDOFF.md`, `PROJECT_MAINTENANCE_AND_EVOLUTION.md`, `FINAL_PROJECT_STATE.md`, `README.md`.
