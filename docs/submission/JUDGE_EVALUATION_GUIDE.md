# Competition Judge & Evaluator Guide

> **Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai**  
> *Executive evaluation blueprint designed for rapid jury onboarding, technical verification, and prototype walkthrough.*

---

## ⏱️ 2-Minute Executive Summary

**InsightPilot AI** solves the core trust and latency dilemma of enterprise decision intelligence:

```text
Traditional Dashboards (PowerBI / Tableau)   ──► Tells executives WHAT happened.
Generic GenAI Chatbots (ChatGPT / Copilot)   ──► Hallucinates and guesses WHY.
InsightPilot AI (Grounded Agentic BI)        ──► PROVES why with deterministic math,
                                                 SHA-256 evidence lineage, and prescriptive actions.
```

### Foundational Architectural Invariant:
> **"Deterministic systems own quantitative truth. LangGraph orchestrates investigation. AI explains grounded facts."**

---

## 🧭 5-Minute Technical Evaluation Path

For judges reviewing the live prototype and architecture:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    5-MINUTE JURY EVALUATION CLICK PATH                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Open http://localhost:3000/ (Command Center)                             │
│    • Observe NA-East Revenue drop: $15.43M -> $14.20M (-$1.23M / -7.97%).   │
│ 2. Click "Investigate Anomaly" -> View LangGraph Activity (/investigation) │
│    • Observe 11-node state graph lifecycle and millisecond node timings.    │
│ 3. View Root Cause Diagnosis (/root-cause)                                 │
│    • Top driver: Atlanta DC Stockout (43.2% / -$550K impact / 94% conf.).   │
│    • Grounded AI synthesis powered by Groq LLaMA 3.3 70B & Gemini Flash.    │
│ 4. Open Evidence Explorer (/evidence)                                       │
│    • Inspect EVD-INV-001 with immutable SHA-256 cryptographic lineage hash. │
│ 5. Pan the Dynamic Decision Graph (/decision-graph)                        │
│    • 6-column topology: Anomaly -> Driver -> Evidence -> Action -> Outcome. │
│ 6. Model Interventions in What-If Simulation Sandbox (/recommendations)    │
│    • Drag slider 79.4% -> 90.0% availability. Watch projected revenue      │
│      update to an exact, deterministic +$341,422.91 with +0.72% margin.     │
│ 7. Toggle Persona Selector in Navbar (/briefing)                            │
│    • Toggle CFO vs Regional Sales Manager. Observe tailored narratives      │
│      with 100% quantitative invariance.                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 Recommended Documentation Reading Sequence

1. [**`README.md`**](../../README.md) — Comprehensive platform overview, architecture, and quickstart.
2. [**`MASTER_ARCHITECTURE.md`**](../architecture/MASTER_ARCHITECTURE.md) — Deep 5-layer architecture blueprint and invariants.
3. [**`BUSINESS_PROPOSAL.md`**](../business-proposal/BUSINESS_PROPOSAL.md) — 16-section business case, commercial model, and ROI.
4. [**`DEMO_STORYBOARD.md`**](../demo/DEMO_STORYBOARD.md) — 10-beat demonstration storyline and scripts.
5. [**`FINAL_READINESS_REPORT.md`**](FINAL_READINESS_REPORT.md) — System readiness audit.

---

## 🏆 Key Competitive Differentiators for Judges

* **Deterministic Ground Truth:** Python analytical engines compute exact figures from 12,322 ERP invoices and 13,710 inventory snapshots—LLMs are forbidden from calculating numbers.
* **Cryptographic Evidence Lineage:** Every empirical citation includes a verifiable SHA-256 hash.
* **Responsible AI Abstention Gate:** Automatic suppression of generative AI when confidence is $< 65\%$.
* **5-Tier Multi-Pool AI Resilience:** Sequential failover (Groq 1 $\to$ Groq 2 $\to$ Gemini 1 $\to$ Gemini 2 $\to$ Deterministic Fallback) with zero downtime and zero credential leakage.
* **Interactive What-If Simulation Sandbox:** Real-time mathematical simulation of corrective action levers ($484K immediate recovery opportunity).
