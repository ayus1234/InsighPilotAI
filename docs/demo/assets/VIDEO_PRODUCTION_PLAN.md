# Video Production & Recording Blueprint

> **Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai**  
> *Technical recording guide, audio configuration, OBS settings, timestamped cut list, and metadata package.*

---

## 🎥 Recording Equipment & Technical Specifications

| Parameter | Specification | Purpose |
| :--- | :--- | :--- |
| **Video Resolution** | 1920 x 1080 (Full HD, 1080p) | Standard 16:9 executive presentation format |
| **Frame Rate** | 60 FPS (Frames Per Second) | Smooth cursor movements, slider drags, and UI transitions |
| **Video Codec** | H.264 / MP4 (High Profile, Level 4.2) | Universal compatibility with video judging portals |
| **Video Bitrate** | 12,000 – 16,000 kbps (CBR) | Crisp text rendering on high-density charts and code |
| **Audio Format** | AAC, 48 kHz, Stereo, 320 kbps | Studio-grade narration clarity |
| **Voiceover Pacing** | 130 – 145 words per minute | Clear, authoritative, non-rushed executive cadence |
| **Browser Environment** | Chrome / Edge (Clean profile, 100% zoom) | Zero bookmarks, clean address bar, dark mode enabled |

---

## 🛠️ Pre-Flight Recording Environment Setup

1. **System & Server Preparation:**
   - Launch FastAPI backend: `uvicorn backend.app.main:app --host 0.0.0.0 --port 8000`
   - Launch Next.js frontend: `npm run dev` (running on `http://localhost:3000`)
   - Verify health check: `GET http://localhost:8000/health` $\to$ `{"status": "healthy"}`
2. **Display & OS Preparation:**
   - Hide Windows Taskbar / Mac Dock.
   - Disable all operating system notifications, Slack alerts, and sound effects.
   - Set browser window to exact 1920x1080 resolution (F11 Fullscreen recommended).
3. **Audio Pre-Processing:**
   - Use high-quality cardioid USB/XLR microphone (placed 6–8 inches from mouth).
   - Apply gentle Noise Suppression (-30dB) and Compressor (Ratio 3:1) in OBS Studio.

---

## 🎬 Timestamped Cut List & Camera Directives (3-Minute Version)

```text
┌───────┬──────────────┬────────────────────────┬─────────────────────────────┐
│ TIME  │ SCENE TYPE   │ ON-SCREEN VISUAL       │ PRODUCTION DIRECTIVE        │
├───────┼──────────────┼────────────────────────┼─────────────────────────────┤
│ 0:00  │ Slide / Hero │ Slide 1: Title & Badges│ Fade in from black.         │
│ 0:15  │ Live UI      │ Screen 1: Command Ctr  │ Cut to browser fullscreen.  │
│ 0:30  │ Live UI      │ Screen 3: Activity     │ Smooth zoom on LangGraph.   │
│ 0:50  │ Live UI      │ Screen 2: Root Cause   │ Highlight Atlanta DC card.  │
│ 1:15  │ Live UI      │ Screen 5: Evidence     │ Open SHA-256 lineage drawer.│
│ 1:35  │ Live UI      │ Screen 2: Grounded AI  │ Pan across AI explanation.  │
│ 1:55  │ Live UI      │ Screen 4: Decision Gr. │ Smooth horizontal graph pan.│
│ 2:15  │ Live UI      │ Screen 6: Levers       │ Focus on Priority 1 Lever.  │
│ 2:35  │ Live UI      │ Screen 6: Simulation   │ Drag slider 79.4% -> 90.0%. │
│ 2:55  │ Live UI / End│ Screen 7: Briefing     │ Toggle CFO -> RSM persona.  │
│ 3:00  │ Slide / Outro│ Slide 8: ROI & Outro   │ Fade out with GitHub URL.   │
└───────┴──────────────┴────────────────────────┴─────────────────────────────┘
```

---

## 🎙️ Audio Pacing & Teleprompter Timing Guide

* **Words per Slide (3-Min Version):** ~40 words per 15-second block (~400 words total script).
* **Emphasis Points:**
  - Emphasize *"Deterministic truth"* with measured confidence.
  - Emphasize numbers precisely: *"One point two three million dollars"*, *"Forty-three point two percent"*, *"Four hundred and eighty-four thousand dollars"*.
  - Use brief 0.5-second pauses when transitioning across UI screens to allow viewers to absorb visual layouts.

---

## 📋 Video Submission Metadata

```text
Title:
InsightPilot AI — Enterprise Root-Cause Intelligence & Agentic Decision Orchestration | Accenture Innovation Challenge 2026

Description:
InsightPilot AI is a grounded agentic business intelligence platform built for the Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai). 

Traditional dashboards tell executives *what* happened, while generic AI chatbots hallucinate numbers without proof. InsightPilot AI combines deterministic analytics engines, an 11-node LangGraph agentic workflow, SHA-256 cryptographic evidence lineage, and capability-aware AI routing (Groq LLaMA 3.3 70B & Google Gemini 2.5 Flash) with a mandatory 65% confidence abstention gate.

🚀 CHAPTER TIMESTAMPS:
0:00 - The Enterprise BI Blindspot
0:15 - Automated KPI Anomaly Triage (Screen 1)
0:30 - LangGraph 11-Node Multi-Agent Investigation (Screen 3)
0:50 - Normalized Causal Driver Attribution (Screen 2)
1:15 - Cryptographic Evidence Lineage & SHA-256 Hashes (Screen 5)
1:35 - Capability-Aware AI & Responsible Abstention (Screen 2)
1:55 - Dynamic 6-Column Decision Graph (Screen 4)
2:15 - Prescriptive Action Levers (Screen 6)
2:35 - Deterministic What-If Simulation Sandbox (Screen 6)
2:55 - Boardroom Executive Briefing & Persona Toggle (Screen 7)

🔗 GitHub Repository: https://github.com/ayus1234/InsighPilotAI
🏆 Track 3: BusinessIntelligence.ai — Accenture Innovation Challenge 2026
```
