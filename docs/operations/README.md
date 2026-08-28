# InsightPilot AI — Operations & Go-Live Readiness Hub

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Directory:** `docs/operations/`  
**Status:** `🟡 CONDITIONAL GO — REPOSITORY & LOCAL READINESS VERIFIED`

---

## Overview

This directory contains the production environment audits, clean-start smoke tests, health and readiness validations, critical API journey logs, degraded-mode fault analyses, security revalidations, frontend build verifications, deployment handoff runbooks, risk registers, and authoritative go-live sign-offs for **InsightPilot AI**.

---

## Operations Documentation Directory

| # | Document | Purpose & Description |
| :---: | :--- | :--- |
| **1** | **[Environment Readiness Audit](./ENVIRONMENT_READINESS_AUDIT.md)** | Master taxonomy of environment variables, secret boundaries, and configuration rules. |
| **2** | **[Clean-Start Smoke Test](./CLEAN_START_SMOKE_TEST.md)** | Local clean checkout validation, dependency verification, and startup smoke test log. |
| **3** | **[Health & Readiness Validation](./HEALTH_AND_READINESS_VALIDATION.md)** | Liveness vs. 12-subsystem deep readiness probe verification and SLA benchmarks. |
| **4** | **[Critical Journey Smoke Test](./CRITICAL_JOURNEY_SMOKE_TEST.md)** | Step-by-step 11-stage API smoke journey covering end-to-end analytical pipeline. |
| **5** | **[Degraded Mode & Failure Handling](./DEGRADED_MODE_AND_FAILURE_HANDLING.md)** | Fault injection testing across AI outages, bad payloads, and graceful fallbacks. |
| **6** | **[Production Security Revalidation](./PRODUCTION_SECURITY_REVALIDATION.md)** | Revalidation of HTTP security headers, CORS restrictions, and zero secret leakage. |
| **7** | **[Frontend Production Smoke Test](./FRONTEND_PRODUCTION_SMOKE_TEST.md)** | Next.js 14 static build audit, 7 core screens verification, and client bundle inspection. |
| **8** | **[Deployment Handoff Runbook](./DEPLOYMENT_HANDOFF_RUNBOOK.md)** | Cloud deployment procedures for Render/Vercel, operational boundaries, and rollbacks. |
| **9** | **[Go-Live Risk Register](./GO_LIVE_RISK_REGISTER.md)** | Comprehensive risk assessment matrix with owners, mitigations, and current statuses. |
| **10**| **[Phase 8.5 Go-Live Readiness Sign-Off](./PHASE_85_GO_LIVE_READINESS_SIGN_OFF.md)** | Authoritative Go-Live verdict: `🟡 CONDITIONAL GO (DEPLOYMENT ACTION REQUIRED)`. |

---

## Core Operations Invariants

```text
1. Mathematical Truth: Deterministic Python engines calculate 100% of figures.
2. Canonical Metrics: $15.43M -> $14.20M (-$1.23M / -7.97%), 43.2% Atlanta DC, 89% Confidence, <65% Abstention.
3. Secret Isolation: Zero API keys in client bundles, logs, or error responses.
4. Clean Startup: Application operates out-of-the-box in deterministic mode without external APIs.
5. High Availability: 100% compliant analytical reports served even during global AI provider outages.
```
