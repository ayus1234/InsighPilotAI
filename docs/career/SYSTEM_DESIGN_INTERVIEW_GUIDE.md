# InsightPilot AI — System Design Interview Guide

**Project:** InsightPilot AI  
**Author / Candidate:** Ayus  
**Document:** System Design Case Study, Architectural Deep-Dive & Scale Roadmap  

---

## 🏛️ 1. Current System Architecture (Implemented Prototype)

InsightPilot AI is architected as a decoupled, multi-tiered decision intelligence system:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. PRESENTATION & SANDBOX LAYER                                             │
│    Next.js 14 App Router • React 18 • Recharts • Glassmorphic Dark Mode     │
│    10 Static Routes Pre-rendered • 7 Core Executive User Screens            │
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │ HTTP / JSON REST APIs
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 4. API GATEWAY, SECURITY & TELEMETRY LAYER                                  │
│    FastAPI (ASGI) • Pydantic v2 Contracts • OWASP Security Headers          │
│    Structured JSON Logs with X-Request-ID Tracking • Global Error Shield    │
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 3. AI ORCHESTRATION & GROUNDING SAFETY LAYER                                │
│    LangGraph 11-Node StateGraph Lifecycle • Post-Generation Regex Validator │
│    Capability-Aware Router (Groq LLaMA 3.3 70B + Google Gemini 2.5 Flash)   │
│    Calibrated Confidence Scoring (89% HIGH) • <65% Mandatory Abstention Gate│
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 2. DETERMINISTIC ANALYTICS & INFERENCE LAYER                                │
│    KPI Anomaly Detection • 100% Variance Decomposition Engine               │
│    Cryptographic SHA-256 Evidence Generator • Supply Chain Simulation       │
└──────────────────────────────────────▲──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│ 1. DATA & AUDIT LINEAGE TIER                                                │
│    8 Validated CSV Schemas (43,000+ Rows) • JSON Schema Boundary Contracts  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 2. End-to-End Request Lifecycle (11 Stages)

```text
1. Ingestion & Validation  ──> 8 normalized CSV schemas validated with zero missing keys.
2. Anomaly Detection       ──> $15.43M -> $14.20M (-$1.23M / -7.97%) flagged by kpi_engine.py.
3. Variance Decomposition  ──> 4 drivers computed deterministically summing to 100.0%.
4. Evidence Extraction     ──> 9 empirical records retrieved across ERP, CRM, and WMS.
5. Cryptographic Hashing   ──> 64-character SHA-256 digests generated per record.
6. Confidence Evaluation   ──> Multi-factor scoring outputs 89% HIGH confidence.
7. Abstention Gating       ──> Confirms score >= 65% (proceeds to synthesis).
8. LangGraph Execution     ──> 11-node StateGraph updates investigation state.
9. Grounded AI Synthesis   ──> Groq/Gemini formats narrative; ai/validator.py verifies tokens.
10. Prescriptive Modeling  ──> Ranks actions (Priority 1: Transfer, +$484K; Sim: +$341.4K).
11. UI Delivery            ──> Next.js 14 renders interactive decision graphs and sliders.
```

---

## 🛡️ 3. Failure Modes & Resilience Architecture

| Failure Scenario | Mitigation Strategy | Implemented Component |
| :--- | :--- | :--- |
| **LLM Provider Outage** | Automatic failover from Groq to Gemini. If all APIs fail, serves deterministic template. | `ai/client.py` & `ai/providers/` |
| **LLM Rate Limiting (429)** | Catches 429 status code and routes to secondary provider pool. | `ai/providers/` |
| **Arithmetic Hallucination** | LLMs are never passed raw tables; math is computed upstream in Python. | `analytics/driver_engine.py` |
| **Low Data Quality / Noise** | Mandatory &lt;65% confidence abstention gate withholds automated conclusions. | `analytics/confidence_engine.py` |
| **Uncaught Server Error** | Global exception handlers sanitize responses; zero stack traces exposed. | `backend/app/errors.py` |

---

## 🚀 4. Evolution to Enterprise Production Architecture (Future Roadmap)

To scale InsightPilot AI from an audited prototype to a multi-tenant cloud enterprise SaaS:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                   FUTURE PRODUCTION CLOUD ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────────────┘

                  ┌─────────────────────────────────┐
                  │   Enterprise Clients (Web/API)   │
                  └────────────────┬────────────────┘
                                   │ HTTPS / WSS
                  ┌────────────────▼────────────────┐
                  │    Cloudflare CDN / API WAF     │
                  └────────────────┬────────────────┘
                                   │
                  ┌────────────────▼────────────────┐
                  │    Kong / Envoy API Gateway     │
                  │ (OAuth2 / SAML SSO / Rate Limits│
                  └────────┬───────────────┬────────┘
                           │               │
         ┌─────────────────▼──┐         ┌──▼──────────────────┐
         │ FastAPI Core Nodes │         │ FastAPI Async Tasks │
         │ (Stateless Pods)   │         │ (Long Investigations│
         └────────┬───────────┘         └──┬──────────────────┘
                  │                        │
       ┌──────────┴────────┐      ┌────────┴─────────┐
       │ Redis Cluster     │      │ Celery / RabbitMQ│
       │ (Distributed Lock │      │ (Task Queue)     │
       │  & Session Cache) │      └────────┬─────────┘
       └──────────┬────────┘               │
                  │               ┌────────▼─────────┐
                  │               │ Background Agents│
                  │               │ (LangGraph Nodes)│
                  │               └────────┬─────────┘
       ┌──────────┴────────────────────────┴─────────┐
       │ Data Tier                                    │
       │ • PostgreSQL (Multi-tenant Partitioned OLTP) │
       │ • Snowflake / ClickHouse (Analytical Lake)   │
       │ • Kafka / Debezium (Real-time CDC Streaming) │
       └──────────────────────────────────────────────┘
```

### Key Scaling Levers:
1. **Multi-Tenancy & RBAC:** Partition database schemas by `tenant_id` with row-level security and SAML 2.0 / Okta integration.
2. **Asynchronous Agent Workers:** Offload 11-node LangGraph execution to background Celery workers, streaming state updates to the UI via Server-Sent Events (SSE).
3. **Analytical Data Lake:** Stream transactions via Kafka CDC into ClickHouse or Snowflake for sub-second aggregations over billions of rows.
4. **Enterprise Observability:** Export structured JSON telemetry to OpenTelemetry collectors, Datadog APM, and Prometheus/Grafana.
