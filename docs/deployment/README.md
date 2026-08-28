# InsightPilot AI — Deployment & Production Operations Hub

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Directory:** `docs/deployment/`  
**Status:** `🟢 PRODUCTION DEPLOYMENT READY`

---

## Overview

This directory contains the production architecture blueprints, environment configuration guides, frontend and backend deployment manuals, CORS security audits, healthcheck specifications, security reviews, and operational runbooks for **InsightPilot AI**.

---

## Deployment Documentation Directory

| # | Document | Purpose & Description |
| :---: | :--- | :--- |
| **1** | **[Deployment Architecture Audit](./DEPLOYMENT_ARCHITECTURE_AUDIT.md)** | Baseline audit of current architecture, runtime dependencies, environment variables, and production gaps. |
| **2** | **[Production Deployment Architecture](./PRODUCTION_DEPLOYMENT_ARCHITECTURE.md)** | Recommended cloud topology (Vercel edge tier + Render API gateway + Postgres + AI providers). |
| **3** | **[Environment Configuration Guide](./ENVIRONMENT_CONFIGURATION_GUIDE.md)** | Multi-environment setup rules, variable matrix, secret isolation, and credential handling. |
| **4** | **[Frontend Deployment Guide](./FRONTEND_DEPLOYMENT_GUIDE.md)** | Next.js 14 static build, Vercel edge deployment procedure, and `NEXT_PUBLIC_API_URL` configuration. |
| **5** | **[Backend Deployment Guide](./BACKEND_DEPLOYMENT_GUIDE.md)** | FastAPI Uvicorn ASGI deployment on Render/Railway/Fly.io and Docker containerization. |
| **6** | **[API Security & CORS Audit](./API_SECURITY_AND_CORS_AUDIT.md)** | Cross-Origin Resource Sharing rules, transport encryption, and trust perimeter defense. |
| **7** | **[Production Health Checks](./PRODUCTION_HEALTH_CHECKS.md)** | Specifications for `/health` (liveness) and `/api/v1/demo/readiness` (12-subsystem probe). |
| **8** | **[Deployment Security Review](./DEPLOYMENT_SECURITY_REVIEW.md)** | Threat modeling, client bundle secret isolation, and vulnerability assessment. |
| **9** | **[Production Deployment Runbook](./DEPLOYMENT_RUNBOOK.md)** | Step-by-step operational runbook covering setup, deployment, smoke tests, and rollback. |
| **10**| **[Live Deployment Checklist](./LIVE_DEPLOYMENT_CHECKLIST.md)** | Go-live verification checklist across Pre-Deployment, Deployment, and Post-Deployment. |

---

## Core Deployment Invariants

```text
1. Mathematical Truth: Deterministic Python engines calculate 100% of figures.
2. Canonical Metrics: $15.43M -> $14.20M (-$1.23M / -7.97%), 43.2% Atlanta DC, 89% Confidence, <65% Abstention.
3. Secret Isolation: Zero API keys in frontend bundles or Git history.
4. Health Probes: Dual lightweight liveness probes at /health and /api/v1/health.
5. Production Build: 10/10 static pages compiled with zero build errors.
```
