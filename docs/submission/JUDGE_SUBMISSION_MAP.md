# InsightPilot AI — Judge Submission Navigation Map

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Evaluator Quick-Route & Intent Navigation Guide  
**Purpose:** Eliminate evaluator navigation friction

---

## 1. Fast Intent-Based Navigation Guide

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ IF THE JUDGE WANTS TO...             NAVIGATE DIRECTLY TO...                │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Understand the core business problem │ 📄 README.md (Overview)              │
│ and why dashboards fail              │ 📄 MASTER_COMPETITION_NARRATIVE.md   │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Evaluate the complete system in      │ 📄 JUDGE_QUICKSTART.md               │
│ 5 minutes                            │ 📄 FINAL_SUBMISSION_PACKAGE.md       │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Inspect the technical architecture,  │ 📄 docs/architecture/                │
│ LangGraph workflow & data contracts  │ 📄 MASTER_ARCHITECTURE.md            │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Run the prototype locally from a     │ 📄 REPRODUCIBILITY_GUIDE.md          │
│ clean clone                          │ 💻 localhost:3000                    │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Review the competition pitch deck,   │ 📄 FINAL_COMPETITION_PITCH_DECK.md   │
│ slide breakdown & judge Q&A playbook │ 📄 FINAL_PITCH_SCRIPT.md             │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Inspect video scripts, shot lists,   │ 📄 docs/demo/                        │
│ and production blueprints            │ 📄 FINAL_3_MINUTE_VIDEO_SCRIPT.md    │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Evaluate the commercial business     │ 📄 docs/business-proposal/           │
│ case, pricing model & 5-year ROI     │ 📄 BUSINESS_PROPOSAL.md              │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Verify AI safety, grounding, SHA-256 │ 📄 SECURITY.md                       │
│ lineage & the 65% abstention gate    │ 📄 METRIC_CONSISTENCY_AUDIT.md       │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Execute automated tests and verify   │ 🧪 python tests/validate_dataset.py  │
│ dataset health and code integrity    │ 🧪 python -m unittest discover tests │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 2. 7-Screen Live Prototype Route Map

For hands-on interactive evaluation at `http://localhost:3000`:

1. **`http://localhost:3000/`** (Command Center): Detects -$1.23M (-7.97%) revenue deficit.
2. **`http://localhost:3000/root-cause`** (Root Cause): 4-factor decomposition; 43.2% Atlanta DC stockout.
3. **`http://localhost:3000/investigation`** (Investigation): 11-node LangGraph trace with 89% confidence.
4. **`http://localhost:3000/decision-graph`** (Decision Graph): 6-column causal topology (14 nodes, 17 edges).
5. **`http://localhost:3000/evidence`** (Evidence Explorer): 9 empirical records with SHA-256 lineage hashes.
6. **`http://localhost:3000/recommendations`** (Recommendations & Simulation): +$484K action lever and What-If slider.
7. **`http://localhost:3000/briefing`** (Executive Briefing): Boardroom synthesis and action sign-off.
