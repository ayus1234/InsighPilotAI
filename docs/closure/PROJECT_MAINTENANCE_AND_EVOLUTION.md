# InsightPilot AI — Project Maintenance & Evolution Guide

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** System Maintenance Protocol & Enterprise Architectural Evolution Roadmap  

---

## 🟢 1. Verified Current State (Implemented & Tested)

The following capabilities are fully implemented and verified by 279+ automated tests:
- **Deterministic Analytics Core:** Pure Python variance decomposition calculating 100.0% variance allocation ($15.43M $\to$ $14.20M, -$1.23M).
- **LangGraph StateGraph:** 11-node state machine governing the multi-agent investigation lifecycle.
- **Cryptographic Lineage:** SHA-256 digests across 9 empirical evidence records.
- **AI Safety & Grounding:** Calibrated confidence scoring (89% HIGH), &lt;65% mandatory abstention gate, and regex grounding validation.
- **Multi-Model Routing:** Groq LLaMA 3.3 and Google Gemini 2.5 failover with deterministic fallback.
- **Full-Stack Application:** FastAPI ASGI backend and Next.js 14 App Router frontend with 10 pre-rendered static routes.

---

## 🟡 2. Safe Near-Term Improvements (Recommended Backlog)

These low-risk improvements build directly upon the current codebase:
1. **GitHub Actions CI/CD (`.github/workflows/ci.yml`):** Automate `python tests/validate_dataset.py` and `unittest` discovery on pull requests.
2. **OpenAPI TypeScript Code Generation:** Automatically generate TypeScript interfaces from FastAPI OpenAPI JSON schema to reduce manual typing.
3. **Playwright E2E UI Tests:** Add automated headless browser interaction tests across the 7 Next.js executive screens.
4. **Synthetic Cloud Health Ping:** Configure a 5-minute UptimeRobot HTTP monitor targeting `/health` once live cloud hosting is active.

---

## 🔵 3. Medium-Term Evolution (Future Architectural Proposals)

*Note: The following capabilities represent design directions for production scaling and are NOT implemented in the current prototype.*

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MEDIUM-TERM SCALING PROPOSAL                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                  │
      ┌───────────────────────────┴───────────────────────────┐
      │                                                       │
┌─────▼─────────────────────────┐               ┌─────────────▼───────────────┐
│ ASYNCHRONOUS AGENT WORKERS    │               │ REDIS CACHING & LOCKS       │
│ • Celery / Redis Task Queue   │               │ • Cache invariant math      │
│ • Offload LangGraph runs      │               │ • Session-level rate limits │
│ • SSE live streaming to UI    │               │ • Distributed locking       │
└───────────────────────────────┘               └─────────────────────────────┘
```

1. **Background Agent Workers (Celery / RabbitMQ):** Offload long-running multi-agent investigations from HTTP request threads to background workers, streaming node-by-node state transitions via Server-Sent Events (SSE).
2. **Distributed Redis Caching:** Cache deterministic variance calculations and confidence scores to deliver sub-10ms response times for recurring executive queries.

---

## 🟣 4. Long-Term Enterprise SaaS Evolution (Conceptual Roadmap)

*Note: The following represent conceptual enterprise architectural blueprints.*

1. **Multi-Tenancy & RBAC:** Schema-level partitioning (`tenant_id`) in PostgreSQL with row-level security policies and enterprise SAML 2.0 / Okta SSO.
2. **Real-Time Data Streaming (Kafka / Debezium):** Replace batch CSV ingestion with Change Data Capture (CDC) pipelines streaming ERP and WMS transactions in real-time into Snowflake or ClickHouse.
3. **Enterprise OpenTelemetry Integration:** Export structured telemetry to Datadog APM, AWS CloudWatch, and Prometheus/Grafana dashboards.
