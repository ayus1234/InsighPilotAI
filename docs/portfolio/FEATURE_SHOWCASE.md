# InsightPilot AI — Feature Showcase & Capability Map

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Evaluator-Friendly Feature Matrix & Technical Implementation Guide  

---

## 🌟 Comprehensive Feature Matrix

| Feature | What It Does | Why It Matters | Where To Inspect |
| :--- | :--- | :--- | :--- |
| **KPI Anomaly Detection** | Automatically flags business metrics deviating beyond materiality thresholds (-3.0%). | Replaces static quarterly dashboard monitoring with real-time anomaly alerting. | [`analytics/kpi_engine.py`](../../analytics/kpi_engine.py)<br>Route: `/` |
| **Deterministic Variance Analysis** | Calculates exact variance ($15.43M $\to$ $14.20M, -$1.23M / -7.97%) from raw tabular transactions. | Guarantees 100% mathematical precision with zero LLM calculation errors. | [`analytics/driver_engine.py`](../../analytics/driver_engine.py)<br>Route: `/root-cause` |
| **Root-Cause Waterfall Attribution** | Decomposes net variance into 4 mutually exclusive ranked drivers summing to 100.0%. | Eliminates diagnostic ambiguity by identifying Atlanta DC stockout as primary driver (43.2%). | [`analytics/driver_engine.py`](../../analytics/driver_engine.py)<br>Route: `/root-cause` |
| **LangGraph Agentic Orchestration** | Manages an 11-node state graph for multi-step reasoning, evidence aggregation, and state transitions. | Provides reproducible, inspectable, and fault-tolerant AI agent workflows. | [`ai_service/orchestration/state_graph.py`](../../ai_service/orchestration/state_graph.py)<br>Route: `/investigation` |
| **Calibrated Confidence Scoring** | Evaluates multi-source corroboration strength, yielding an aggregate confidence score (89% HIGH). | Quantifies evidentiary certainty so executives know when to trust automated findings. | [`analytics/confidence_engine.py`](../../analytics/confidence_engine.py)<br>Route: `/investigation` |
| **Mandatory AI Abstention Gate** | Programmatically blocks AI conclusions and requests human review if confidence falls below **65%**. | Prevents catastrophic AI hallucinations and speculative decision-making in low-data regimes. | [`analytics/confidence_engine.py`](../../analytics/confidence_engine.py)<br>Route: `/briefing` |
| **SHA-256 Cryptographic Evidence Lineage** | Attaches a 64-character SHA-256 digest to every empirical evidence record across ERP, CRM, and WMS. | Ensures enterprise auditability, data provenance, and compliance verification. | [`analytics/evidence_engine.py`](../../analytics/evidence_engine.py)<br>Route: `/evidence` |
| **Dynamic 6-Column Decision Graph** | Generates a topological DAG (14 nodes, 17 edges) mapping anomaly $\to$ cause $\to$ evidence $\to$ action $\to$ outcome. | Transforms static charts into an interactive causal decision-making model. | [`analytics/decision_graph_engine.py`](../../analytics/decision_graph_engine.py)<br>Route: `/decision-graph` |
| **Prioritized Action Recommendations** | Prescribes ranked operational levers (Priority 1: Emergency Transfer, +$484K recovery in 14 days). | Transitions from passive diagnostic reporting to actionable operational execution. | [`analytics/recommendation_engine.py`](../../analytics/recommendation_engine.py)<br>Route: `/recommendations` |
| **What-If Elasticity Simulation** | Interactive elasticity sandbox modeling inventory availability (79.4% $\to$ 90% $\to$ +$341.4K recovery). | Enables executive teams to test scenarios before committing capital or operational resources. | [`analytics/simulation_engine.py`](../../analytics/simulation_engine.py)<br>Route: `/recommendations` |
| **Role-Tailored Executive Briefings** | Synthesizes customized narratives (CFO board view vs. Regional Sales Manager view). | Delivers the right level of abstraction and financial context for diverse enterprise personas. | [`ai_service/briefing_synthesizer.py`](../../ai_service/briefing_synthesizer.py)<br>Route: `/briefing` |
| **Capability-Aware Multi-Model Router** | Routes requests between Groq LLaMA 3.3 70B and Google Gemini 2.5 Flash with automatic failover. | Delivers sub-second response times while maintaining high-context synthesis and resilience. | [`ai_service/llm_router.py`](../../ai_service/llm_router.py)<br>Backend Gateway |
| **Zero-Downtime Deterministic Fallback** | Serves grounded analytical narratives when third-party AI APIs are missing, rate-limited, or offline. | Guarantees high availability and complete operational continuity in isolated environments. | [`ai_service/fallback_synthesizer.py`](../../ai_service/fallback_synthesizer.py)<br>Route: `/api/v1/demo/*` |
| **OWASP Security Headers & Telemetry** | Injects `nosniff`, `DENY`, `no-store`, and structured JSON logging with `X-Request-ID` tracking. | Enforces enterprise-grade API security and request correlation observability. | [`backend/app/security.py`](../../backend/app/security.py)<br>[`backend/app/logging.py`](../../backend/app/logging.py) |
