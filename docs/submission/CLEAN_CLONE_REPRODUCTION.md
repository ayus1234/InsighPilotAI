# Clean Clone Reproduction Guide for Evaluators

> **Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai**  
> *Deterministic step-by-step reproduction guide for competition evaluators cloning InsightPilot AI from scratch.*

---

## 🎯 Objective & Prerequisites

This guide guarantees that an evaluator cloning the repository for the first time can successfully configure, validate, launch, and interact with the complete system in **under 5 minutes**.

### Minimum System Prerequisites:
* **Operating System:** Linux, macOS, or Windows 10/11
* **Python Runtime:** Python 3.11 or Python 3.13 (Python 3.13 recommended)
* **Node.js Runtime:** Node.js 18.x or Node.js 20.x with `npm`
* **Git:** Version 2.30+

---

## 🚀 10-Step Reproduction Workflow

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    10-STEP EVALUATOR REPRODUCTION FLOW                      │
├─────────────────────────┬──────────────────────────┬────────────────────────┤
│ 1. Clone Repository     │ 4. Configure .env        │ 7. Launch FastAPI      │
│ 2. Create Virtual Env   │ 5. Validate Datasets     │ 8. Install Frontend    │
│ 3. Install Python Deps  │ 6. Run Regression Tests  │ 9. Verify Next.js Build│
│                         │                          │ 10. Launch Next.js App │
└─────────────────────────┴──────────────────────────┴────────────────────────┘
```

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/ayus1234/InsighPilotAI.git
cd InsighPilotAI
```
* **Expected Outcome:** Repository cloned cleanly with all root folders (`backend/`, `frontend/`, `ai/`, `analytics/`, `data/`, `docs/`, `tests/`).

---

### Step 2: Create Python Virtual Environment
```bash
# On Linux/macOS:
python3 -m venv .venv
source .venv/bin/activate

# On Windows (PowerShell / Command Prompt):
python -m venv .venv
.venv\Scripts\activate
```
* **Expected Outcome:** Active virtual environment indicated by `(.venv)` in the terminal prompt.

---

### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```
* **Expected Outcome:** `fastapi`, `uvicorn`, `pydantic`, `numpy`, `sqlalchemy`, `python-dotenv`, `google-genai`, and `groq` install with zero compilation errors.

---

### Step 4: Configure Environment Template
```bash
cp .env.example .env
```
* **Notes:**
  - The default `.env.example` comes pre-configured with `sqlite:///data/insightpilot.db` and fallback defaults.
  - Adding real `GROQ_API_KEY_1` or `GEMINI_API_KEY_1` enables live cloud LLM reasoning; if omitted, the system operates seamlessly in **Deterministic Grounded Fallback Mode** with zero crashes.

---

### Step 5: Validate Enterprise Datasets
```bash
python tests/validate_dataset.py
```
* **Expected Outcome:**
```text
======================================================================
ALL DATASET VALIDATION CHECKS PASSED SUCCESSFULLY! (100% HEALTHY)
======================================================================
```
* **Verified:** 8 Schema contracts, primary key uniqueness, referential integrity across 5 dimensions, and the canonical `-7.97%` revenue drop signal.

---

### Step 6: Execute Automated Test Suite (174 Tests)
```bash
python -m unittest discover -s tests -t . -p "test_*.py" -v
```
* **Expected Outcome:**
```text
Ran 174 tests in ~35-45s
OK
```
* **Coverage:** Unit, integration, failover scenarios A–E, responsible AI abstention, Decision Graph topology, and simulation bounds.

---

### Step 7: Launch FastAPI Backend Server
```bash
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
* **Verification:** Open browser to `http://localhost:8000/docs` (Swagger UI) or query `GET http://localhost:8000/health` (`{"status": "healthy"}`).

---

### Step 8: Install Frontend Dependencies
```bash
cd frontend/next-app
npm install
```
* **Expected Outcome:** Next.js 14, React 18, Tailwind CSS, Lucide Icons, and Recharts dependencies installed cleanly.

---

### Step 9: Verify Next.js Production Build
```bash
npm run build
```
* **Expected Outcome:**
```text
✓ Compiled successfully
✓ Generating static pages (10/10)
```
* **Verified:** All 10 routes compile to static/prerendered production artifacts without TypeScript or lint errors.

---

### Step 10: Launch Next.js Interactive Web Application
```bash
npm run dev
```
* **Interactive Portal:** Open `http://localhost:3000` in Google Chrome or Microsoft Edge.
* **Ready for Evaluation:** Explore all 7 connected screens, trigger the canonical investigation, pan the 6-column Decision Graph, drag the simulation slider, and toggle the CFO vs Regional Sales Manager persona view.
