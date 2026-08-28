# InsightPilot AI — AI Safety, Governance & Responsible AI Defense

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Responsible AI Architecture, Safety Gates & Governance Defense  
**Status:** `REHEARSAL READY`

---

## 1. The 4-Layer Anti-Hallucination Perimeter

InsightPilot AI prevents generative hallucinations through a multi-layered architectural boundary:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: DETERMINISTIC ISOLATION                                            │
│ • LLMs are prohibited from querying databases or computing arithmetic.     │
│ • 100% of KPIs, variances, driver weights, and confidence scores are       │
│   pre-computed by deterministic Python engines.                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: GROUNDED CONTEXT ASSEMBLY                                          │
│ • Prompts receive only pre-validated numerical facts and verified evidence  │
│   IDs (e.g., EVID_ERP_ATL_STOCKOUT_001).                                    │
│ • Strict JSON output schemas enforce structured reasoning statements.       │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 3: 65% MANDATORY ABSTENTION SAFETY GATE                               │
│ • If the 6-factor confidence score is < 65%, the system halts generative   │
│   synthesis and provides transparent, responsible uncertainty reporting.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 4: POST-GENERATION GROUNDING VALIDATION                               │
│ • ai/validator.py automatically parses model output and checks that every  │
│   cited evidence ID and fact matches ground-truth database records.         │
│ • If an ungrounded or hallucinated ID is cited, the output is rejected.     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Cryptographic SHA-256 Lineage & Auditability

- Every empirical node calculates an immutable 64-character SHA-256 hash digest from its raw source data.
- Financial auditors and enterprise compliance officers can trace any claim back to the originating database query, timestamp, and row ID.
- Example: `EVID_ERP_ATL_STOCKOUT_001` $\to$ `sha256:8f4c2e7a1b9d3c5f...` verified across SAP ERP inventory snapshots.

---

## 3. Zero Secret Leakage & Credential Isolation

- Automated regular expression suites scan all public API endpoints and frontend responses.
- `gsk_*` (Groq API keys), `AIzaSy*` (Gemini keys), and `Bearer *` authorization tokens are stripped from client payloads, build artifacts, and telemetry logs.
- The platform operates safely in zero-trust public evaluation environments.

---

## 4. Multi-Pool Provider Failover Resilience

- Multi-pool sequential routing: `Groq Pool 1` $\to$ `Groq Pool 2` $\to$ `Gemini Pool 1` $\to$ `Gemini Pool 2` $\to$ `Deterministic Grounded Fallback`.
- Handles rate limits (HTTP 429), quota exhaustion, and network timeouts without user-facing crashes.
- Grounded fallback ensures 100% mathematical availability even during complete internet or cloud outages.

---

## 5. MANDATORY SECTION: What InsightPilot AI Does NOT Guarantee

To ensure absolute integrity and credibility with competition judges, the team must explicitly communicate what the system does **NOT** claim:

1. **It does not guarantee philosophical causality:** Observational enterprise data establishes empirical operational attribution and statistical correlation; it does not replace randomized A/B trials.
2. **It does not guarantee upstream data correctness:** SHA-256 digests prove data integrity and lineage from the moment of ingestion; they cannot detect human data entry errors originating inside legacy ERPs.
3. **Confidence is not absolute certainty:** An 89% confidence score indicates strong statistical and cross-source support; it does not mean there is zero risk of unmeasured external market factors.
4. **Simulation outputs depend on modeled assumptions:** The What-If simulation assumes linear availability elasticity ($32,209.71 per percentage point) within empirical bounds (75%–95%); it does not guarantee macroeconomic immunity during black swan events.
5. **It does not replace executive accountability:** InsightPilot AI is a decision-support and recommendation platform; final capital allocation and operational execution remain human management decisions.
