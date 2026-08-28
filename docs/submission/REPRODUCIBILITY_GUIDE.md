# InsightPilot AI — Clean-Start Reproducibility Guide

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** End-to-End Clean Clone & Setup Instructions

---

## 1. Prerequisites

- **Python:** 3.10, 3.11, or 3.12
- **Node.js:** 18.x or 20.x
- **Git:** Standard CLI
- **Operating System:** Windows, macOS, or Linux

---

## 2. Step-by-Step Clean Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/ayus1234/InsighPilotAI.git
cd InsighPilotAI
```

### Step 2: Configure Environment Variables
```bash
# Copy example configuration
cp .env.example .env
```
> **Note:** The system is fully operational and demonstrable in offline mode with deterministic grounded fallbacks even without external API keys. To enable live multi-model LLM generation, set `GROQ_API_KEY` and/or `GEMINI_API_KEY` in `.env`.

### Step 3: Set Up Python Virtual Environment & Dependencies
```bash
# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS / Linux:
# source .venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt
```

### Step 4: Set Up Next.js Frontend
```bash
cd frontend/next-app
npm install
cd ../..
```

---

## 3. Verification & Validation Commands

Execute the automated verification pipeline to confirm full system health:

### 1. Dataset Integrity Validation (6/6 checks)
```bash
python tests/validate_dataset.py
```
*Expected output: `ALL DATASET VALIDATION CHECKS PASSED SUCCESSFULLY! (100% HEALTHY)`*

### 2. Complete Test Suite (196 tests)
```bash
python -m unittest discover -s tests -t . -p "test_*.py" -v
```
*Expected output: `Ran 196 tests in ~45s - OK`*

### 3. Frontend Production Build (10 static routes)
```bash
cd frontend/next-app
npm run build
cd ../..
```
*Expected output: `✓ Generating static pages (10/10) - Compiled successfully`*

---

## 4. Running the Live Application

### Terminal 1: Start FastAPI Backend Server
```bash
# Activate virtual environment if not active
# On Windows: .venv\Scripts\activate
uvicorn backend.app.main:app --reload --port 8000
```
- **Backend API:** `http://localhost:8000`
- **Interactive Swagger Docs:** `http://localhost:8000/docs`
- **Health Check Probe:** `http://localhost:8000/health`

### Terminal 2: Start Next.js Frontend Server
```bash
cd frontend/next-app
npm run dev
```
- **Frontend Command Center:** `http://localhost:3000`
- **Root Cause Diagnosis:** `http://localhost:3000/root-cause`
- **AI Investigation Activity:** `http://localhost:3000/investigation`
- **Decision Graph:** `http://localhost:3000/decision-graph`
- **Evidence Explorer:** `http://localhost:3000/evidence`
- **Recommendations & Simulation:** `http://localhost:3000/recommendations`
- **Executive Decision Briefing:** `http://localhost:3000/briefing`
