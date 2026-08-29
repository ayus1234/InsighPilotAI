# InsightPilot AI — Evaluator 5-Minute Fast Path Guide

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Evaluator Quick-Start, Codebase Map & Inspection Blueprint  
**Reading Time:** 5 Minutes  

---

## ⏱️ The 5-Minute Evaluator Journey

Welcome! If you are evaluating InsightPilot AI for the Accenture Innovation Challenge or reviewing this repository for technical hiring, follow this concise path:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       5-MINUTE EVALUATOR DISCOVERY PATH                     │
│                                                                             │
│  1. Executive Summary  ──▶ 2. Architecture  ──▶ 3. Deterministic Analytics  │
│         (Minute 1)             (Minute 2)                 (Minute 3)        │
│                                                                             │
│  4. LangGraph Agentic  ──▶ 5. Verification Pipeline & Local Reproduction    │
│         (Minute 4)                                (Minute 5)                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Minute 1: The Core Problem & Value Proposition
- **The Problem:** When quarterly revenue deviates (-7.97%), finding *why* across ERP, CRM, and WMS takes weeks of manual SQL. Standard LLMs hallucinate numbers when asked to analyze raw metrics.
- **The Solution:** InsightPilot AI combines **deterministic Python analytics** (owns quantitative truth), **LangGraph multi-agent orchestration** (coordinates the investigation), and **grounded LLMs** (synthesizes structured text).
- **Core Document:** [`docs/portfolio/RECRUITER_OVERVIEW.md`](../portfolio/RECRUITER_OVERVIEW.md) or [`docs/portfolio/CASE_STUDY.md`](../portfolio/CASE_STUDY.md).

---

### Minute 2: Master Architecture
- **Where is it?** [`docs/architecture/MASTER_ARCHITECTURE.md`](../architecture/MASTER_ARCHITECTURE.md).
- **5-Tier Structure:**
  1. Data Layer (`data/`): 8 CSV schemas (43,000+ rows) validated by `tests/validate_dataset.py`.
  2. Analytics Engine (`analytics/`): 100% variance attribution, 4-factor root cause, confidence scoring.
  3. Evidence Layer (`evidence/`): 9 empirical records carrying 64-character SHA-256 digests.
  4. AI Layer (`ai/`): 11-node LangGraph StateGraph with Groq/Gemini routing and &lt;65% abstention gate.
  5. Presentation Layer (`backend/app/` + `frontend/next-app/`): FastAPI ASGI + Next.js 14 glassmorphic UI.

---

### Minute 3: Deterministic Analytics & Evidence Lineage
- **Where is the math?**
  - KPI Engine: [`analytics/kpi_engine.py`](../../analytics/kpi_engine.py)
  - Driver Attribution: [`analytics/driver_engine.py`](../../analytics/driver_engine.py)
  - Calibrated Confidence: [`analytics/confidence_engine.py`](../../analytics/confidence_engine.py)
  - Supply Chain Simulation: [`simulation/simulation_engine.py`](../../simulation/simulation_engine.py)
- **Where is cryptographic provenance?**
  - SHA-256 Hasher: [`evidence/evidence_engine.py`](../../evidence/evidence_engine.py)
  - Lineage Tracer: [`evidence/lineage.py`](../../evidence/lineage.py)

---

### Minute 4: LangGraph Multi-Agent Orchestration & Safety
- **Where is LangGraph?** [`ai/orchestration/state_graph.py`](../../ai/orchestration/state_graph.py).
- **How does it stay safe?**
  - Capability-Aware Multi-Pool Router: [`ai/client.py`](../../ai/client.py) (Groq LLaMA 3.3 70B $\to$ Gemini 2.5 Flash $\to$ Local Fallback).
  - Regex Grounding Validator: [`ai/validator.py`](../../ai/validator.py).
  - Dynamic 6-Column Decision Graph: [`ai/decision_graph/generator.py`](../../ai/decision_graph/generator.py).

---

### Minute 5: Automated Verification & Reproduction
Run these 3 commands in your terminal to reproduce all verified claims:

```bash
# 1. Validate dataset integrity (6/6 checks passing)
python tests/validate_dataset.py

# 2. Run full backend test discovery (287+ tests passing)
python -m unittest discover -s tests -t . -p "test_*.py"

# 3. Build Next.js production bundle (10/10 static pages pre-rendered)
cd frontend/next-app && npm run build
```

---

## 📌 Summary: Implemented vs Pending Actions

- **🟢 100% Implemented & Tested:** Deterministic variance math, LangGraph 11-node graph, SHA-256 evidence hashing, FastAPI backend, Next.js 14 frontend, 287 automated tests.
- **🟡 Modeled / Simulated:** What-If inventory elasticity ($32.2K recovery/pt) and prescriptive recovery actions (+$484K).
- **🟠 Pending External Owner Actions:** Demo video recording, pitch deck PDF export, live cloud linking, and final portal submission.
