# InsightPilot AI — Final Competition Submission Manifest

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Authoritative Inventory of Submission Assets  
**Status:** `100% COMPLETE & VERIFIED`

---

## Category A: Core Project & Technical Architecture

| Asset Name | Repository Path | Purpose | Status | Intended Evaluator Use |
| :--- | :--- | :--- | :---: | :--- |
| **Competition README** | [`../../README.md`](../../README.md) | High-level system overview, quickstart, and architecture summary. | `READY` | Initial repository landing and quick evaluation. |
| **Master Architecture** | [`../architecture/MASTER_ARCHITECTURE.md`](../architecture/MASTER_ARCHITECTURE.md) | Full technical blueprint across all 12 subsystems and data contracts. | `READY` | Technical architecture deep dive. |
| **Analytics Engine** | [`../architecture/ANALYTICS_ENGINE.md`](../architecture/ANALYTICS_ENGINE.md) | Mathematical specification of time-series, variance, and attribution engines. | `READY` | Verification of deterministic quantitative truth. |
| **Data Contracts** | [`../architecture/DATA_CONTRACTS.md`](../architecture/DATA_CONTRACTS.md) | JSON schemas and Pydantic contract definitions across all layers. | `READY` | API and data contract validation. |

---

## Category B: Product Demonstration & Video Assets

| Asset Name | Repository Path | Purpose | Status | Intended Evaluator Use |
| :--- | :--- | :--- | :---: | :--- |
| **Next.js Prototype** | [`../../frontend/next-app/`](../../frontend/next-app/) | Live 7-screen interactive decision intelligence application. | `READY` | Hands-on prototype testing at `http://localhost:3000`. |
| **3-Minute Video Script** | [`../demo/FINAL_3_MINUTE_VIDEO_SCRIPT.md`](../demo/FINAL_3_MINUTE_VIDEO_SCRIPT.md) | Time-stamped 180s video script with exact narration and UI actions. | `READY` | Evaluation of video presentation narrative. |
| **5-Minute Technical Script** | [`../demo/FINAL_5_MINUTE_TECHNICAL_VIDEO_SCRIPT.md`](../demo/FINAL_5_MINUTE_TECHNICAL_VIDEO_SCRIPT.md) | Extended 300s technical walkthrough script. | `READY` | In-depth technical video evaluation. |
| **Production Runbook** | [`../demo/FINAL_VIDEO_PRODUCTION_RUNBOOK.md`](../demo/FINAL_VIDEO_PRODUCTION_RUNBOOK.md) | Complete recording guide, server sequence, and audio settings. | `READY` | Video production replication. |
| **Recording Shot List** | [`../demo/RECORDING_SHOT_LIST.md`](../demo/RECORDING_SHOT_LIST.md) | 14-shot capture list mapping UI routes, overlays, and zooms. | `READY` | Scene-by-scene verification. |
| **Video Overlay Plan** | [`../demo/FINAL_VIDEO_OVERLAY_PLAN.md`](../demo/FINAL_VIDEO_OVERLAY_PLAN.md) | 14 lower-third banners, verification chips, and badges. | `READY` | Visual overlay inspection. |
| **Video Metric Audit** | [`../demo/VIDEO_METRIC_VERIFICATION.md`](../demo/VIDEO_METRIC_VERIFICATION.md) | Parity audit cross-checking spoken metrics against source data. | `READY` | Numerical verification of video claims. |

---

## Category C: Presentation & Pitch Materials

| Asset Name | Repository Path | Purpose | Status | Intended Evaluator Use |
| :--- | :--- | :--- | :---: | :--- |
| **Final Pitch Deck** | [`../presentation/FINAL_COMPETITION_PITCH_DECK.md`](../presentation/FINAL_COMPETITION_PITCH_DECK.md) | Authoritative 12-slide executive presentation specification and Q&A playbook. | `READY` | Evaluation of pitch deck and judge Q&A answers. |
| **Final Pitch Script** | [`../presentation/FINAL_PITCH_SCRIPT.md`](../presentation/FINAL_PITCH_SCRIPT.md) | Word-for-word speaker scripts for 3-minute and 5-minute pitches. | `READY` | Pitch narration review. |
| **Judge Experience Audit** | [`../presentation/JUDGE_EXPERIENCE_AUDIT.md`](../presentation/JUDGE_EXPERIENCE_AUDIT.md) | 7-screen judge journey validation and persona invariance verification. | `READY` | User journey auditing. |
| **UI Visual Audit** | [`../presentation/UI_VISUAL_AUDIT.md`](../presentation/UI_VISUAL_AUDIT.md) | Design tokens, dark glassmorphism styling, and trust badges. | `READY` | Visual aesthetics and design system review. |

---

## Category D: Business Case & Commercial Strategy

| Asset Name | Repository Path | Purpose | Status | Intended Evaluator Use |
| :--- | :--- | :--- | :---: | :--- |
| **Business Proposal** | [`../business-proposal/BUSINESS_PROPOSAL.md`](../business-proposal/BUSINESS_PROPOSAL.md) | Commercial strategy, market sizing, ROI calculations, and pricing model. | `READY` | Business viability evaluation. |
| **Financial Analysis** | [`../business-proposal/FINANCIAL_ANALYSIS.md`](../business-proposal/FINANCIAL_ANALYSIS.md) | 5-year unit economics, revenue projections, and customer LTV/CAC. | `READY` | Financial model auditing. |
| **Implementation Plan** | [`../business-proposal/IMPLEMENTATION_PLAN.md`](../business-proposal/IMPLEMENTATION_PLAN.md) | Enterprise deployment roadmap, change management, and rollout timeline. | `READY` | Operational feasibility review. |

---

## Category E: Technical Validation & Test Automation

| Asset Name | Repository Path | Purpose | Status | Intended Evaluator Use |
| :--- | :--- | :--- | :---: | :--- |
| **Dataset Validator** | [`../../tests/validate_dataset.py`](../../tests/validate_dataset.py) | Automated validation script verifying 8 CSVs and 6 data checks. | `READY` | Verification: `python tests/validate_dataset.py`. |
| **Submission Test Suite** | [`../../tests/api/test_phase73_submission_readiness.py`](../../tests/api/test_phase73_submission_readiness.py) | 12-point invariant testing suite. | `READY` | Verification of canonical invariants. |
| **Judge Journey Suite** | [`../../tests/api/test_phase72_judge_journey.py`](../../tests/api/test_phase72_judge_journey.py) | 10-point end-to-end user journey test suite. | `READY` | Verification of 7-screen flow. |
| **Full Backend Suite** | [`../../tests/`](../../tests/) | 196 unit, integration, and contract tests. | `READY` | Verification: `python -m unittest discover`. |

---

## Category F: Trust, AI Safety & Governance

| Asset Name | Repository Path | Purpose | Status | Intended Evaluator Use |
| :--- | :--- | :--- | :---: | :--- |
| **Security Policy** | [`../../SECURITY.md`](../../SECURITY.md) | Security disclosure, credential isolation, and SHA-256 lineage rules. | `READY` | Security & compliance audit. |
| **Final Submission Audit** | [`FINAL_SUBMISSION_AUDIT.md`](./FINAL_SUBMISSION_AUDIT.md) | 19-category system verification report and readiness verdict. | `READY` | Comprehensive system audit. |
| **Metric Consistency Audit**| [`METRIC_CONSISTENCY_AUDIT.md`](./METRIC_CONSISTENCY_AUDIT.md) | Repository-wide cross-metric consistency verification (0 drift). | `READY` | Numerical truth auditing. |
