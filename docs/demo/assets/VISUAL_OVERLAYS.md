# Visual Overlays & Lower-Thirds Production Guide

> **Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai**  
> *Graphical overlay specifications, lower-thirds text, callout badges, and visual emphasis cues for video post-production.*

---

## 🎨 Overlay Design System & Color Palette

```text
┌────────────────────────┬────────────────────────┬───────────────────────────┐
│ PRIMARY CYAN           │ ACCENT INDIGO          │ SUCCESS GREEN             │
│ Hex: #38BDF8           │ Hex: #6366F1           │ Hex: #10B981              │
│ Use: UI Focus / Links  │ Use: AI / LangGraph    │ Use: Recovery / Confidence│
├────────────────────────┼────────────────────────┼───────────────────────────┤
│ CRITICAL RED           │ BACKGROUND GLASS       │ TEXT WHITE                │
│ Hex: #EF4444           │ Hex: #0F172A (85% Op.) │ Hex: #F8FAFC              │
│ Use: Anomaly / Drops   │ Use: Overlay Cards     │ Use: Main Headers / Copy  │
└────────────────────────┴────────────────────────┴───────────────────────────┘
```

---

## 🏷️ Lower-Thirds Cue Sheet

Overlay lower-third cards in the bottom-left corner of the screen during specific narration moments:

```text
┌──────────┬─────────────────────────────┬────────────────────────────────────┐
│ TIMESTAMP│ LOWER-THIRD HEADER          │ SUBTEXT / TECHNICAL DETAIL         │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ 0:15     │ 🔴 DETECT: KPI Anomaly      │ NA-East Revenue: -$1.23M (-7.97%)  │
│ 0:30     │ 🤖 ORCHESTRATE: LangGraph   │ 11-Node Autonomous State Machine   │
│ 0:50     │ 📊 DECOMPOSE: Driver Math   │ Atlanta DC Stockout: 43.2% (-$550K)│
│ 1:15     │ 🔒 PROVE: Evidence Lineage  │ Immutable SHA-256 Verified Hashes  │
│ 1:35     │ 🧠 EXPLAIN: Multi-Model AI  │ Groq LLaMA 3.3 70B & Gemini Flash  │
│ 1:55     │ 🗺️ DECIDE: Decision Graph   │ Dynamic 6-Column Causal Topology   │
│ 2:15     │ ⚡ ACT: Prescriptive Lever   │ Charlotte -> Atlanta: +$484K Target│
│ 2:35     │ 🎛️ SIMULATE: What-If Sandbx │ 79.4% -> 90.0% = +$341,422.91 Rec. │
│ 2:55     │ 📋 BRIEF: Executive Brief   │ 100% Invariant Dual-Persona Views  │
└──────────┴─────────────────────────────┴────────────────────────────────────┘
```

---

## 🔍 Visual Callout Badges & Zoom Highlights

### 1. The Strict Quantitative Truth Badge
* **Appearance:** Top-right floating glass badge with glowing green checkmark.
* **Text:** `🛡️ 100% DETERMINISTIC PYTHON MATH • ZERO AI HALLUCINATION`
* **Trigger:** Appears during Beat 2 (KPI Movement) and Beat 4 (Driver Decomposition).

### 2. The SHA-256 Cryptographic Hash Callout
* **Appearance:** Zoom bounding box around the evidence lineage drawer in Screen 5.
* **Text:** `SHA-256: e3b0c442... | WMS Facility FAC-ATL-01 Inventory Snapshot`
* **Trigger:** Appears during Beat 5 (Evidence Corroboration).

### 3. The 6-Factor Confidence Gauge
* **Appearance:** Circular animated score indicator on Screen 2.
* **Text:** `89% HIGH CONFIDENCE | 6-Factor Analytical Verification`
* **Trigger:** Appears during Beat 6 (Grounded AI Explanation).

### 4. The Mandatory Abstention Policy Callout
* **Appearance:** Subtle safety banner overlay.
* **Text:** `⚠️ RESPONSIBLE AI GUARD: Suppresses LLM Generation if Confidence < 65%`
* **Trigger:** Appears during Beat 6 (AI Explanation / Safety discussion).

### 5. The Real-Time Simulation Result Callout
* **Appearance:** Glowing green summary box around the simulation revenue output.
* **Text:** `+$341,422.91 Projected Recovery | +0.72% Gross Margin Expansion`
* **Trigger:** Appears when dragging the availability slider to 90.0% in Beat 9.
