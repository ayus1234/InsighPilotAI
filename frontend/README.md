# InsightPilot AI — Frontend Architecture & Integration Guide

> **Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai**  
> **Status:** Step 10B Approved Architecture & Screen 1 Integration

---

## 1. Architecture Overview

InsightPilot AI utilizes a zero-framework, lightweight frontend architecture designed to preserve the Round 1 Stitch visual design system:

- **Markup:** Semantic HTML5 (`code.html` across 7 screen directories).
- **Styling:** Tailwind CSS CDN with Material 3 Dark Theme design tokens (Primary Teal `#4fdbc8`, Deep Navy `#051424`, Glass Panels with backdrop blur).
- **Scripts:** Native JavaScript (ES Modules).
- **Icons & Fonts:** Material Symbols Outlined, Manrope (Display KPIs), Inter (Body), JetBrains Mono (Labels).
- **API Client:** Lightweight browser `fetch()` abstraction with configurable base URL, `AbortController` timeouts, and structured error handling.

---

## 2. Directory Structure

```text
stitch_insightpilot_ai_executive_platform/
├── executive_command_center_v3_optimized_hierarchy/   # Screen 1 (Integrated with live KPI APIs)
├── ai_investigation_activity_v2/                       # Screen 2 (Activity timeline)
├── root_cause_investigation_v2/                        # Screen 3 (Diagnostic drivers)
├── decision_graph_v4_final_presentation_view/         # Screen 4 (Decision Graph)
├── evidence_explorer_v2/                               # Screen 5 (Evidence repository)
├── recommendations_simulation_v3_decision_ready/       # Screen 6 (Action cards & slider)
└── executive_briefing_v3_boardroom_ready/              # Screen 7 (Executive slide briefing)

frontend/
├── api/
│   └── client.js             # API client with timeout, JSON parsing, and domain helpers
├── config/
│   └── config.js             # Base URL config (defaults to http://127.0.0.1:8000)
├── utils/
│   └── formatters.js         # Formatting helpers (Currency, %, Points, Numbers)
├── state/
│   └── store.js              # Lightweight state store for active KPI, persona, and caches
└── README.md                 # This documentation
```

---

## 3. How to Run Locally

### Step 1: Start the Backend (Port 8000)
```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

### Step 2: Start the Frontend Static Server (Port 3000)
```bash
python -m http.server 3000
```

### Step 3: Open in Browser
Navigate to:
```text
http://localhost:3000/stitch_insightpilot_ai_executive_platform/executive_command_center_v3_optimized_hierarchy/code.html
```

---

## 4. API Client & Base URL Configuration

The API client (`frontend/api/client.js`) automatically points to `http://127.0.0.1:8000` (or `window.__API_BASE_URL__`).

### Available Methods:
- `apiClient.getKPIs()`: Returns all 5 tracked enterprise KPIs.
- `apiClient.getKPI(kpiId)`: Returns single KPI detail and variance.
- `apiClient.getInvestigation(kpiId, region, prevPeriod, currPeriod, persona)`: Full root cause diagnostic tree.
- `apiClient.getDrivers(kpiId, region)`: Ranked drivers list.
- `apiClient.getEvidenceList(kpiId, region)`: Corroborating evidence records.
- `apiClient.getEvidence(evidenceId)`: Single evidence node.
- `apiClient.getEvidenceLineage(evidenceId)`: 5-layer cryptographic audit trace.
- `apiClient.getRecommendations(kpiId, region)`: Prioritized prescriptive actions.
- `apiClient.getSimulationBaseline(region)`: Empirical baseline availability & revenue.
- `apiClient.simulateInventoryAvailability(availabilityRatio, region)`: Live recovery projection.
- `apiClient.getAIExplanation(kpiId, persona, region)`: Grounded Gemini executive narrative.

---

## 5. Screen 1 (Executive Command Center) Live Integration

Screen 1 is now dynamically connected to `GET /api/v1/kpis`:

| UI Card | Raw Backend Value | Formatted Display |
|---|---|---|
| **Revenue** | `$14,200,000.05` | **`$14.20M (-7.97%)`** |
| **Gross Margin** | `57.4%` | **`57.4% (-3.2 pts)`** |
| **Units Sold** | `105,400` | **`105,400 (-8.5%)`** |
| **Inventory Availability** | `79.4%` | **`79.4% (-14.8 pts)`** |
| **Distributor Orders** | `842` | **`842 (-12.1%)`** |

---

## 6. Phased Implementation Roadmap

1. **Step 10B (Complete):** Frontend Foundation, API Client, and Screen 1 Integration.
2. **Step 10C:** AI Investigation Activity (Screen 2) & Root Cause Investigation (Screen 3) Integration.
3. **Step 10D:** Decision Graph (Screen 4) Dynamic SVG & Node Topology.
4. **Step 10E:** Evidence Explorer (Screen 5) & Cryptographic Lineage Drawer.
5. **Step 10F:** Recommendations & What-If Simulation (Screen 6) Live Slider.
6. **Step 10G:** Executive Briefing (Screen 7) & Grounded Gemini Persona Narrative.
