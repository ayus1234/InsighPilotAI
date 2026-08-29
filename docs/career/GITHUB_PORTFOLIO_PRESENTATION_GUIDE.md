# InsightPilot AI — GitHub Portfolio Presentation & Reviewer Guide

**Project:** InsightPilot AI  
**Author / Candidate:** Ayus  
**Document:** Public Repository Presentation Guide & Evaluator Walkthrough  

---

## 🧭 Evaluator Navigation Paths

```text
================================================================================
                    GITHUB PORTFOLIO PRESENTATION PATHS
================================================================================
```

### 1. The 5-Minute Recruiter Fast Path
1. **Start:** [`docs/portfolio/RECRUITER_OVERVIEW.md`](../portfolio/RECRUITER_OVERVIEW.md) — 2-minute summary answering top 10 technical evaluation questions.
2. **Review Feature Matrix:** [`docs/portfolio/FEATURE_SHOWCASE.md`](../portfolio/FEATURE_SHOWCASE.md) — Maps capabilities to code files.
3. **Inspect Quality Proof:** Look at test results in root [`README.md`](../../README.md) (271/271 tests passing, 10/10 static pages).

### 2. The 15-Minute Technical Deep Dive (Engineering Leads)
1. **Start:** [`docs/portfolio/CASE_STUDY.md`](../portfolio/CASE_STUDY.md) — Architectural case study on the deterministic/AI split.
2. **Inspect Orchestration:** [`ai/orchestration/state_graph.py`](../../ai/orchestration/state_graph.py) — 11-node LangGraph state machine.
3. **Inspect Deterministic Math:** [`analytics/driver_engine.py`](../../analytics/driver_engine.py) — Pure Python variance attribution.
4. **Inspect Safety & Grounding:** [`ai/validator.py`](../../ai/validator.py) & [`analytics/confidence_engine.py`](../../analytics/confidence_engine.py) — &lt;65% abstention gate and regex verification.
5. **Inspect Test Coverage:** [`tests/api/`](../../tests/api/) & [`tests/validate_dataset.py`](../../tests/validate_dataset.py).

### 3. Recommended Reading Order for Technical Interviewers
- **Step 1:** [`docs/career/CAREER_PORTFOLIO_CASE_STUDY.md`](./CAREER_PORTFOLIO_CASE_STUDY.md)
- **Step 2:** [`docs/career/TECHNICAL_INTERVIEW_STORYBOOK.md`](./TECHNICAL_INTERVIEW_STORYBOOK.md)
- **Step 3:** [`docs/career/SYSTEM_DESIGN_INTERVIEW_GUIDE.md`](./SYSTEM_DESIGN_INTERVIEW_GUIDE.md)
- **Step 4:** [`docs/engineering/ENGINEERING_QUALITY_AUDIT.md`](../engineering/ENGINEERING_QUALITY_AUDIT.md)

---

## 🏆 Key Repository Artifacts to Highlight in Interviews

| Topic | Top Documentation Hub | Top Source Code Reference |
| :--- | :--- | :--- |
| **System Architecture** | [`docs/architecture/MASTER_ARCHITECTURE.md`](../architecture/MASTER_ARCHITECTURE.md) | `ai/orchestration/state_graph.py` |
| **Code Quality & Debt** | [`docs/engineering/TECHNICAL_DEBT_REGISTER.md`](../engineering/TECHNICAL_DEBT_REGISTER.md) | `backend/app/errors.py` |
| **Operations & Deploy** | [`docs/operations/README.md`](../operations/README.md) | `backend/app/main.py` |
| **Resume Bullets** | [`docs/career/RESUME_PROJECT_BULLETS.md`](./RESUME_PROJECT_BULLETS.md) | `tests/api/test_phase92_engineering_quality.py` |
