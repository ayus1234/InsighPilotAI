# InsightPilot AI — Production URL & Deployment Registry

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Authoritative Endpoint Registry, Hosting Targets & Verification Status  
**Status:** `REGISTRY ACTIVE — REPOSITORY VERIFIED, LIVE CLOUD PENDING`

---

## 1. Production Endpoint & Resource Registry

```text
================================================================================
                    PRODUCTION URL & ENDPOINT REGISTRY
================================================================================

1. Git Source Repository
   STATUS: VERIFIED
   URL:    https://github.com/ayus1234/InsighPilotAI.git

2. Backend API Service (Render Web Service)
   STATUS: PENDING EXTERNAL PLATFORM DEPLOYMENT
   URL:    TBD — RENDER DEPLOYMENT REQUIRED

3. Backend Liveness Health Probe
   STATUS: PENDING EXTERNAL PLATFORM DEPLOYMENT
   URL:    TBD — RENDER DEPLOYMENT REQUIRED (Target: https://[RENDER_URL]/health)

4. Backend 12-Subsystem Readiness Probe
   STATUS: PENDING EXTERNAL PLATFORM DEPLOYMENT
   URL:    TBD — RENDER DEPLOYMENT REQUIRED (Target: https://[RENDER_URL]/api/v1/demo/readiness)

5. Frontend Web Application (Vercel Edge Network)
   STATUS: PENDING EXTERNAL PLATFORM DEPLOYMENT
   URL:    TBD — VERCEL DEPLOYMENT REQUIRED

================================================================================
```

---

## 2. Local Verified Environments (Active Development / Demonstration)

| Service Tier | Local Binding Address | Verification Status | Response SLA |
| :--- | :--- | :---: | :---: |
| **Backend API Gateway** | `http://127.0.0.1:8000` | `VERIFIED ACTIVE` | &lt;1.0 ms (Liveness) |
| **FastAPI Swagger Docs** | `http://127.0.0.1:8000/docs` | `VERIFIED ACTIVE` | OpenAPI 3.0 Interactive |
| **Next.js Web Frontend** | `http://localhost:3000` | `VERIFIED ACTIVE` | 10 Static Routes Pre-rendered |
| **Unified Demo Route** | `http://127.0.0.1:8000/api/v1/demo/investigation/north_america_east_revenue` | `VERIFIED ACTIVE` | ~35 ms (Deterministic) |
