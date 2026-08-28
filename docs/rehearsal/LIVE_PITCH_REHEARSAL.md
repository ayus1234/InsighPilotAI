# InsightPilot AI — Live Pitch Rehearsal Scenarios

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** 5 Interactive Panel Rehearsal Scenarios & Objection Handling Playbook  
**Status:** `REHEARSAL READY`

---

## Scenario 1: The Commercial Business Judge

- **Judge Persona:** Senior Partner, Enterprise Strategy & CFO Advisory.
- **Judge Mindset:** "Show me who buys this, why they can't do it with existing tools, and where the money comes from."
- **Primary Objections:** "Enterprises already have Power BI. Why add another $240K software contract?"
- **Interruption Points & Sequence:**
  1. *Pitch Claim:* "We reduce triage time by 95%." $\to$ **Judge:** *"How do you quantify that 95%?"*  
     **Answer:** *"In legacy enterprises, triaging a regional drop requires 80–120 analyst hours across 2–3 weeks of pulling ERP, WMS, and CRM tables. InsightPilot AI executes multi-source ingestion and attribution in under 30 seconds."*
  2. *Pitch Claim:* "$757,600 in recovery opportunity." $\to$ **Judge:** *"Is that real cash recovered?"*  
     **Answer:** *"It is the modeled recovery pool in our quarterly benchmark: $484,000 from emergency stock transfers and $180,000 from distributor outreach. Annualized across enterprise operations, this models a 4.8x–7.2x first-year ROI against a $240K ARR subscription."*
- **Supporting Evidence:** `docs/business-proposal/FINANCIAL_ANALYSIS.md`, `analytics/recommendations.py`.
- **Demo Screen to Show:** `http://localhost:3000/recommendations` (Action cards and recovery pool).
- **Overclaiming Risk:** Do not claim realized customer revenue; clearly state modeled recovery potential.

---

## Scenario 2: The Enterprise Technical Architect

- **Judge Persona:** Managing Director, Cloud & Enterprise AI Architecture.
- **Judge Mindset:** "Is this an actual engineered system, or are you just calling OpenAI in a Python script?"
- **Primary Objections:** "Why do you need LangGraph? Isn't a simple DAG or script enough?"
- **Interruption Points & Sequence:**
  1. *Pitch Claim:* "11-node LangGraph state machine." $\to$ **Judge:** *"Why LangGraph specifically?"*  
     **Answer:** *"LangGraph maintains an engineered state machine with cyclical error handling, telemetry, and deterministic validation gates. Most importantly, it allows us to evaluate our 65% abstention gate before any generative model is ever invoked."*
  2. *Pitch Claim:* "Zero numerical hallucination." $\to$ **Judge:** *"How do you guarantee that?"*  
     **Answer:** *"Because the LLM is prohibited from calculating numbers. All figures are pre-computed in pure Python. The LLM only receives pre-calculated facts and structured JSON schemas, which are verified post-generation by our grounding validator."*
- **Supporting Evidence:** `ai/langgraph/graph.py`, `ai/validator.py`, `tests/api/test_phase73_submission_readiness.py`.
- **Demo Screen to Show:** `http://localhost:3000/investigation` (11-node trace and node classifications).
- **Overclaiming Risk:** Do not claim unconstrained autonomous agentic behavior; it is an engineered state graph.

---

## Scenario 3: The AI Safety & Governance Evaluator

- **Judge Persona:** Global Lead, Responsible AI & Enterprise Risk.
- **Judge Mindset:** "Generative AI is inherently unpredictable. Why should a regulated enterprise trust this?"
- **Primary Objections:** "What happens when the model hallucinates a fake supplier or false reason?"
- **Interruption Points & Sequence:**
  1. *Pitch Claim:* "Mandatory abstention gate." $\to$ **Judge:** *"What triggers abstention?"*  
     **Answer:** *"Our 6-factor confidence model scores sample size, freshness, corroboration, signal strength, consistency, and completeness. If the score falls below 65%, the system halts generative reasoning and provides transparent uncertainty reporting."*
  2. *Pitch Claim:* "SHA-256 evidence lineage." $\to$ **Judge:** *"What does that hash actually prove?"*  
     **Answer:** *"It proves data integrity and provenance. Each of our 9 evidence records generates a 64-character SHA-256 digest from its source database query, timestamp, and row ID, enabling financial auditors to verify that evidence was not altered."*
- **Supporting Evidence:** `analytics/confidence.py`, `backend/app/services/evidence_service.py`, `SECURITY.md`.
- **Demo Screen to Show:** `http://localhost:3000/evidence` (Lineage drawer and SHA-256 copy action).
- **Overclaiming Risk:** Acknowledge that SHA-256 proves data lineage of the record, not physical reality.

---

## Scenario 4: The Skeptical Product & Moat Judge

- **Judge Persona:** Venture Partner / Head of Product Innovation.
- **Judge Mindset:** "Microsoft, Tableau, or Databricks will crush you in 6 months."
- **Primary Objections:** "What is your defensible moat once Copilot integrates with Power BI?"
- **Interruption Points & Sequence:**
  1. *Pitch Claim:* "Active decision intelligence layer." $\to$ **Judge:** *"Why can't Copilot do this?"*  
     **Answer:** *"Copilot is a conversational interface over charts—it summarizes what is already displayed. It lacks multi-source causal attribution, SHA-256 evidence lineage, 6-column Decision Graphs, and What-If elasticity simulation sandboxes. We sit on top of the data warehouse as a decision engine."*
  2. *Pitch Claim:* "Multi-model provider routing." $\to$ **Judge:** *"What happens if you switch models?"*  
     **Answer:** *"Our architecture treats foundation models as interchangeable inference engines. As models improve, our system becomes faster and cheaper, while our domain-specific causal topologies and safety gates remain proprietary."*
- **Supporting Evidence:** `docs/MASTER_COMPETITION_NARRATIVE.md`, `docs/presentation/FINAL_COMPETITION_PITCH_DECK.md`.
- **Demo Screen to Show:** `http://localhost:3000/decision-graph` (6-column causal topology).
- **Overclaiming Risk:** Acknowledge competition; focus on architectural separation and decision graphs.

---

## Scenario 5: The Final Round High-Pressure Mixed Panel

- **Judge Persona:** Panel of 4 judges interrupting alternately.
- **Judge Mindset:** Rapid stress-testing across business, math, AI safety, and demo execution.
- **Rehearsal Strategy:**
  1. **Stay Calm & Grounded:** Anchor every answer in the master principle: *"Deterministic analytics calculate truth, LangGraph orchestrates investigation, AI explains grounded facts."*
  2. **Direct Concise Answers First:** Give the 15-second summary before diving into technical details.
  3. **Point to Concrete Proof:** Transition immediately to the live prototype screen or test suite result.
- **Supporting Evidence:** Full 201-test validation suite, `tests/validate_dataset.py`, live Next.js application.
- **Demo Screen to Show:** Complete 7-screen live walkthrough from `/` to `/briefing`.
