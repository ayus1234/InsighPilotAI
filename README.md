# InsightPilot AI

> **Enterprise Decision-Intelligence Prototype**  
> Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai

InsightPilot AI is an enterprise decision-intelligence prototype designed to investigate KPI movements, identify and rank explanatory drivers, trace conclusions back to evidence, recommend high-impact actions, and support deterministic what-if simulations.

---

## Project Status

This repository is currently under active development for the **Accenture Innovation Challenge 2026 (Track 3 — BusinessIntelligence.ai)**.

- **Round 1 (Completed Foundation):** Product concept, visual identity, business scenario, presentation, demo video, and 7-screen Stitch UI design.
- **Round 2 (Current Phase):** Transforming the product foundation into a credible, working prototype with separation of deterministic analytics and LLM reasoning.

> *Note: Application logic, analytics engine, backend services, and AI integrations are planned for incremental implementation in subsequent steps.*

---

## Core Workflow

```
Investigate ───► Explain ───► Recommend ───► Simulate
```

1. **Investigate:** Detect anomaly or variance in critical enterprise KPIs.
2. **Explain:** Decompose metrics into mathematical drivers, correlation trees, and contextual evidence.
3. **Recommend:** Generate prioritized, actionable initiatives tailored to organizational personas.
4. **Simulate:** Model the projected impact and second-order effects of decisions via what-if scenarios.

---

## Existing Product UI Foundation

The Round 1 Stitch product foundation defines the design system, component hierarchy, and user experience across seven core screens:

1. **Executive Command Center (v3)** — Enterprise portfolio view, KPI variance alerts, and top-level health metrics.
2. **AI Investigation Activity (v2)** — Real-time telemetry, active diagnostic workflows, and automated reasoning pipelines.
3. **Root Cause Investigation (v2)** — Deep-dive causal breakdown, anomaly attribution, and driver ranking.
4. **Decision Graph (v4)** — Multi-echelon graph linking KPIs, explanatory factors, external events, and policies.
5. **Evidence Explorer (v2)** — Direct citation explorer linking findings to internal telemetry, logs, and market reports.
6. **Recommendations & Simulation (v3)** — Strategic intervention cards with parameter sliders and deterministic outcome forecasting.
7. **Executive Briefing (v3)** — Boardroom-ready automated synthesis, executive narrative, and exportable briefing packet.

*(These screens establish the visual and ergonomic contract for the platform and will be extended with runtime telemetry, confidence scoring, and semantic contracts in Round 2).*

---

## Planned Round 2 Capabilities

- **KPI Intelligence:** Deterministic semantic contracts, variance calculation, and multidimensional slice-and-dice.
- **Driver Analysis:** Mathematical contribution scoring, correlation analysis, and driver ranking.
- **Decision Graph:** Graph-structured causal representation connecting drivers, root causes, and business domains.
- **Evidence & Lineage:** Source citation, data freshness tracking, methodology metadata, and audit trail lineage.
- **Confidence & Uncertainty:** Explicit confidence scoring, low-confidence handling, and abstention boundaries.
- **Persona-Aware Insights:** Tailored views and narrative depth for Executive, Analyst, and Operational personas.
- **Role-Based Access:** Role-scoped data visibility and action governance.
- **Actionable Recommendations:** Ranked, constraint-aware strategic interventions.
- **What-If Simulation:** Deterministic simulation engine for parameter sweeps and counterfactual evaluation.
- **Executive Briefing:** Structured, automated narrative synthesis grounded in quantitative metrics.
- **Runtime Telemetry:** System health, latency, query cost, and audit logs.
- **LLM-Assisted Explanation:** Grounded reasoning and narrative generation separated from quantitative logic.

---

## Repository Structure

```
insightpilot-ai/
│
├── README.md                           # Project overview & documentation index
├── LICENSE                             # Project licensing declaration
├── .gitignore                          # Standard git ignore rules
├── .env.example                        # Environment variable template
├── requirements.txt                    # Python foundational dependencies
│
├── frontend/                           # Web application & user interface
├── backend/                            # Application server & API routing
├── analytics/                          # Deterministic KPI & driver analysis engine
├── ai/                                 # LLM orchestration, prompts & reasoning layer
│
├── data/                               # Data management
│   ├── raw/                            # Ingested raw datasets
│   ├── processed/                      # Normalized & structured datasets
│   └── schemas/                        # Data contracts & JSON/SQL schemas
│
├── simulation/                         # Deterministic what-if simulation engine
├── config/                             # Application & environment configuration
├── tests/                              # Unit, integration & end-to-end test suites
│
├── docs/                               # Project documentation
│   ├── architecture/                   # Technical architecture & design specifications
│   ├── api/                            # API endpoints, request/response contracts
│   ├── screenshots/                    # UI captures & visual walkthroughs
│   └── business-proposal/              # Innovation Challenge business case & pitch
│
├── demo/                               # Demo scripts & presentation assets
└── stitch_insightpilot_ai_executive_platform/ # Round 1 Stitch UI design foundation
```

---

## Development Principles

1. **Strict Separation of Concerns:** Deterministic numerical calculations (analytics, simulations) are strictly separated from probabilistic LLM reasoning.
2. **Evidence-Grounded Intelligence:** All AI insights and recommendations must trace back to quantifiable metrics and verified evidence.
3. **Incremental Delivery:** Features are implemented through phased milestones with verifiable test gates.
