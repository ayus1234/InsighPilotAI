# InsightPilot AI — Claim Boundary & Truth Policy

**Project:** InsightPilot AI  
**Author / Candidate:** Ayus  
**Document:** Strict Ethical Guidelines for Professional & Interview Storytelling  

---

## ⚖️ 1. Claim Classification Framework

To maintain 100% credibility with technical interviewers, hiring managers, and recruiters, all professional claims must adhere to this classification:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TRUTHFUL CLAIM BOUNDARIES                             │
│                                                                             │
│  🟢 SAFE CLAIMS        ──> Verifiable by source code and 271+ tests on disk.│
│  🟡 CONDITIONAL CLAIMS ──> Explicitly labeled as modeled, simulated, or     │
│                            architectural design.                            │
│  🔴 UNSAFE CLAIMS      ──> Strictly prohibited; misleading or fabricated.   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 2. Detailed Claim Boundary Matrix

| Domain | 🟢 SAFE CLAIMS (Encouraged) | 🟡 CONDITIONAL CLAIMS (Allowed with Context) | 🔴 UNSAFE CLAIMS (Strictly Prohibited) |
| :--- | :--- | :--- | :--- |
| **Financial Impact** | "I built an engine that models $757K in potential recovery levers for a benchmark $1.23M revenue anomaly." | "The simulation models $341K in revenue recovery based on a linear supply chain elasticity model." | "My system recovered $757,000 in real cash for enterprise clients." *(Fabrication)* |
| **AI Performance & Grounding** | "I built a regex validator and deterministic separation that eliminates arithmetic hallucinations in our test suite." | "The system achieves 89% calculated confidence across our benchmark 8-dataset scenario." | "My AI model is 100% hallucination-free in all possible unconstrained domains." *(Overclaim)* |
| **System Scale & Tests** | "The platform is verified by 271 passing automated tests across API, contract, and dataset integrity checks." | "The architecture is designed to scale to distributed Celery workers and Kafka streams in production." | "The system currently handles millions of live concurrent enterprise requests in production." *(Fabrication)* |
| **Deployment Status** | "The application is validated locally and packaged with Dockerfile, render.yaml, and 10 static Next.js pages." | "Production deployment runbooks for Render and Vercel are fully documented and tested pre-deployment." | "The platform is currently live with thousands of paying SaaS customers." *(Fabrication)* |
| **Enterprise Adoption** | "Built as an advanced portfolio prototype for the Accenture Innovation Challenge 2026." | "Designed against enterprise-grade ERP, CRM, and WMS data schemas." | "Deployed internally at Fortune 500 enterprises." *(Fabrication)* |
| **Competition Status** | "Completed all submission deliverables, runbooks, and presentation blueprints for Track 3." | "The project adheres to all Accenture Innovation Challenge Round 2 technical criteria." | "Won 1st place in the Accenture Innovation Challenge." *(Unless officially awarded)* |

---

## 🎯 3. Core Principles for Interview Integrity

1. **Be Proud of the Real Engineering:** Building an 11-node LangGraph orchestration pipeline, deterministic variance decomposition engine, SHA-256 evidence hashing, and a 271-test regression suite is an impressive technical achievement on its own.
2. **Never Blur Prototype vs Production:** Always describe the current system as a *production-ready prototype* or *audited portfolio platform*, and describe future enterprise features as the *production evolution roadmap*.
3. **Own the Design Trade-offs:** Discussing why you chose pure Python over LLM math or LangGraph over ReAct demonstrates senior engineering maturity.
