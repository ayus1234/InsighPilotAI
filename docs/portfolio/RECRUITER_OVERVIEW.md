# InsightPilot AI — Recruiter & Reviewer Quick Overview

**Reading Time:** ~2 minutes  
**Target Roles:** Full-Stack Engineers, AI/ML Engineers, Product Architects, Technical Recruiters  
**Repository:** [github.com/ayus1234/InsighPilotAI](https://github.com/ayus1234/InsighPilotAI)  

---

## ⚡ 10 Quick Answers for Technical Reviewers

### 1. What did you build?
**InsightPilot AI** — an enterprise decision-intelligence platform that automates the transition from business anomaly detection (e.g. quarterly revenue drops) to root-cause attribution, cryptographic evidence verification, and simulation-backed action recommendations.

### 2. What problem does it solve?
Traditional BI tools show **what** happened (descriptive charts) but leave root-cause investigation to weeks of manual SQL querying. Generic AI chatbots hallucinate numbers. InsightPilot AI diagnoses **why** it happened and prescribes **how to fix it** in seconds with 100% mathematical precision.

### 3. What technologies did you use?
- **Backend:** Python 3.11+, FastAPI (ASGI), Pydantic v2, Uvicorn, SQLite/PostgreSQL
- **AI Orchestration:** LangGraph (11-Node StateGraph), Groq (LLaMA 3.3 70B), Google Gemini (2.5 Flash)
- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Glassmorphism UI
- **Testing & Quality:** Python `unittest`, Next.js static build, JSON Schema validation, SHA-256 lineage

### 4. What is technically challenging about it?
Eliminating LLM arithmetic hallucinations by completely decoupling quantitative calculations (pure Python engines) from natural language narrative generation (LLMs). Managing complex multi-system data reconciliation across 43,000+ records and orchestrating an 11-step state machine with fault-tolerant failovers.

### 5. What makes the AI architecture trustworthy?
- **Deterministic Truth Lock:** 100% of financial figures, variances, and driver rankings are computed deterministically.
- **Mandatory Abstention Gate:** The AI programmatically abstains from generating advice if evidence confidence drops below **65%**.
- **Cryptographic Provenance:** Every evidence item carries a verifiable 64-character SHA-256 hash linked to raw source tables.

### 6. What parts demonstrate strong Software Engineering?
- Clean layered architecture separating data, analytics, orchestration, AI safety, and presentation.
- 259 passing automated unit, integration, and contract tests (100% pass rate).
- OWASP security headers (`nosniff`, `DENY`, `no-store`), sanitized error taxonomy, and zero secrets in git.
- Fully automated dataset validation suite checking 8 entity schemas and referential integrity.

### 7. What parts demonstrate strong AI/ML Engineering?
- Capability-aware multi-pool routing between Groq and Gemini with automatic rate-limit and outage failover.
- Multi-agent state orchestration using LangGraph with complete state replayability.
- Strict post-generation grounding validators that reject unanchored claims.

### 8. What parts demonstrate strong Product Thinking?
- Built a 7-screen executive workflow matching the real cognitive journey of a CFO or VP of Supply Chain.
- Interactive What-If simulation slider showing financial elasticity ($32.2K recovery per percentage point).
- Role-tailored narrative synthesis (CFO board view vs Regional Sales view).

### 9. How was it validated?
Validated on a canonical benchmark scenario ($15.43M $\to$ $14.20M revenue anomaly, Atlanta DC stockout 43.2% driver) with **259 unit/integration tests**, **6/6 dataset checks**, and **10/10 Next.js static pages**.

### 10. What should a reviewer inspect first?
Inspect the architecture in [`docs/portfolio/TECHNICAL_WALKTHROUGH.md`](./TECHNICAL_WALKTHROUGH.md) and run the local app.

---

## 🚀 "Start Here in 5 Minutes" Reviewer Journey

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: Clone & Run Local Prototype (2 mins)                                │
│   git clone https://github.com/ayus1234/InsighPilotAI.git                   │
│   pip install -r requirements.txt && uvicorn backend.app.main:app --port 8000│
│   cd frontend/next-app && npm install && npm run dev (http://localhost:3000)│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: Explore the 7-Screen Product Flow (2 mins)                          │
│   1. /               -> Executive Command Center (Anomaly Detection)        │
│   2. /root-cause     -> 4-Factor Waterfall Decomposition (100% Explained)   │
│   3. /investigation  -> 11-Node LangGraph State Execution Trace             │
│   4. /decision-graph -> 6-Column Dynamic DAG (14 Nodes, 17 Edges)           │
│   5. /evidence       -> 9 Empirical Records with SHA-256 Lineage            │
│   6. /recommendations-> Action Prioritization & What-If Simulation Sandbox  │
│   7. /briefing       -> Role-Tailored Executive Briefing Narrative          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: Review Technical Deep-Dives (1 min)                                 │
│   • Technical Architecture: docs/portfolio/TECHNICAL_WALKTHROUGH.md         │
│   • Complete Case Study:    docs/portfolio/CASE_STUDY.md                    │
│   • Feature Showcase:       docs/portfolio/FEATURE_SHOWCASE.md              │
└─────────────────────────────────────────────────────────────────────────────┘
```
