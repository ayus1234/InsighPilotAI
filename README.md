# InsightPilot AI

> **Enterprise Decision-Intelligence Platform**  
> Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai  
> **Status:** Production-Grade Working Prototype — End-to-End Multi-Agent Decision Intelligence Pipeline

---

InsightPilot AI is an enterprise decision-intelligence platform that automates the transition from descriptive anomaly detection to prescriptive action. Traditional dashboards reveal *what* changed, but investigating *why* it changed requires manually joining siloed enterprise systems. InsightPilot AI combines **PostgreSQL persistence**, **deterministic analytics**, **LangGraph multi-agent orchestration**, and a **capability-aware multi-model AI layer (Groq + Gemini)** to investigate anomalies, verify empirical evidence, explain causal drivers, prioritize interventions, and simulate What-If scenarios.

---

## 1. Core Architectural Principle: Strict Quantitative Truth Boundary

```text
PostgreSQL / SQLAlchemy Persistence
                 │
                 ▼
Deterministic Analytical Engines (Python)
(Revenue • Drivers • Evidence Lineage • Confidence • Recommendations • Simulation)
                 │
                 ▼ [Authoritative Quantitative Truth]
     LangGraph Orchestration Pipeline
                 │
                 ▼ [Grounded Context Assembly]
        AI Provider Router
         ├── Groq (High-Speed Business Reasoning & Executive Synthesis)
         └── Gemini (Multimodal Vision & Visual Document Analysis)
                 │
                 ▼ [Post-Generation Grounding Validator]
       Next.js + TypeScript UI (7 Connected Screens)
```

**Cardinal Rule**: Large Language Models (LLMs) **never** generate, calculate, or alter quantitative business metrics (Revenue, Variances, Driver Contributions, Confidence Scores, Evidence Hashes, Simulation Recovery). Quantitative truth is computed strictly by deterministic engines from normalized PostgreSQL tables. LLMs provide grounded multi-agent reasoning, persona adaptation, and executive synthesis over verified evidence.

---

## 2. Technical Stack

| Layer | Technologies | Role |
| :--- | :--- | :--- |
| **Frontend UI** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts | Interactive 7-screen presentation layer with glassmorphism aesthetics and live API feeds |
| **API Layer** | FastAPI, Pydantic v2, Uvicorn, Python 3.13 | High-performance async REST API with standardized schema contracts |
| **Persistence Layer** | PostgreSQL, SQLAlchemy 2.0 ORM, Alembic, SQLite fallback | Normalized enterprise tables (12,322+ revenue records, 13,710+ inventory snapshots, etc.) |
| **Agent Orchestration** | LangGraph (`StateGraph`) | Multi-agent investigation workflow with conditional confidence & abstention routing |
| **Reasoning Engine** | Groq SDK (`llama-3.3-70b-versatile`) | Ultra-fast structured business reasoning, executive synthesis, and persona narratives |
| **Multimodal Engine** | Google GenAI SDK (`gemini-2.5-flash`) | Visual analysis, chart interpretation, and multimodal evidence processing |
| **Deterministic Analytics** | NumPy, Python Standard Library | Exact variance math, driver decomposition, SHA-256 evidence lineage, Monte Carlo elasticity |

---

## 3. Multi-Model AI Provider & Failover Architecture

InsightPilot AI utilizes **capability-based routing** with request-level dual key pool failover:

```text
                          AI Task Arrives
                                 │
                                 ▼
                     Task Classification & Capability
                                 │
        ┌────────────────────────┴────────────────────────┐
        ▼                                                 ▼
[Business Reasoning / Synthesis]               [Multimodal / Vision]
        │                                                 │
        ▼                                                 ▼
   Groq Pool 1                                      Gemini Pool 1
        │ (Rate limit / Quota)                            │ (Rate limit / Quota)
        ▼                                                 ▼
   Groq Pool 2                                      Gemini Pool 2
        │ (Both unavailable)                              │ (Both unavailable)
        ▼                                                 ▼
Cross-Provider Fallback (Gemini Pool 1/2)          Graceful Degradation Notice
```

- **Groq Primary**: Fast reasoning, executive synthesis, persona adaptation (CFO vs. Regional Sales Manager), decision narratives.
- **Gemini Primary**: Multimodal vision, chart analysis, screenshot understanding, document intelligence.
- **Graceful Degradation**: If all external AI providers are offline, deterministic analytics complete seamlessly and generate grounded rule-based synthesis without crashing.

---

## 4. The 7 Connected Product Screens

1. **Executive Command Center (`/`)**: High-level anomaly detection, multi-period KPI cards, sparklines, regional overview ($15.43\text{M} \to \$14.20\text{M}$, $-7.97\%$).
2. **AI Investigation Activity (`/investigation`)**: Live agentic timeline, multi-step node execution traces, telemetry tracking, persona selector.
3. **Root Cause Investigation (`/root-cause`)**: Ranked causal driver contribution bars (Atlanta Stockout $43.2\%$, SKU-8821 $26.7\%$, PO Deferrals $18.8\%$, Horizon Pricing $11.3\%$).
4. **Decision Graph (`/decision-graph`)**: Interactive topological graph linking KPI Anomaly $\to$ Drivers $\to$ Evidence $\to$ Levers $\to$ Outcomes.
5. **Evidence Explorer (`/evidence`)**: Cryptographically verified empirical records with 5-layer lineage traces and SHA-256 verification hashes.
6. **Recommendations & What-If Simulation (`/recommendations`)**: Ranked interventions (Atlanta transfer $+\$484\text{K}$) and live inventory availability slider ($79.4\% \to 90\% \to +\$341.4\text{K}$).
7. **Executive Briefing (`/briefing`)**: Boardroom-ready slide presentation (Situation, Diagnosis, Evidence, Action Plan, Projected ROI).

---

## 5. Getting Started & Installation

### Prerequisites
- Python 3.11+ (Python 3.13 recommended)
- Node.js 18+ and npm

### 1. Clone & Set Up Environment
```bash
git clone https://github.com/ayus1234/InsighPilotAI.git
cd InsighPilotAI

# Create and activate Python virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Configure your optional Gemini and Groq API keys:
```env
GEMINI_API_KEY_1=your_gemini_key_here
GEMINI_API_KEY_2=your_secondary_gemini_key_here
GROQ_API_KEY_1=your_groq_key_here
GROQ_API_KEY_2=your_secondary_groq_key_here
```

### 3. Initialize & Seed Database
```bash
python scripts/seed_db.py
```

### 4. Run Backend & Frontend Servers
**Terminal 1 (FastAPI Backend):**
```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 (Next.js Frontend):**
```bash
cd frontend/next-app
npm install
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 6. Verification & Test Suite

Run the full automated test suite (133+ tests passing with 100% regression coverage):
```bash
# Run all Python tests
python tests/validate_dataset.py
python -m unittest discover -s tests -p "test_*.py" -v

# Run Next.js production build check
cd frontend/next-app
npm run build
```

---

## 7. Security & Compliance Boundary
- **Zero Secret Exposure**: API keys are loaded strictly from environment variables and never logged or exposed to the client.
- **Deterministic Immutability**: LLM prompts receive read-only grounded contexts.
- **Calibrated Abstention**: Investigations below 65% analytical confidence trigger mandatory abstention to prevent speculative assertions.

---

## License
MIT License. Developed for the Accenture Innovation Challenge 2026.
