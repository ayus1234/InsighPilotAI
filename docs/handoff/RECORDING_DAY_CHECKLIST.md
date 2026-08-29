# InsightPilot AI — Recording Day Execution Checklist

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Printable Pre-Flight, Live Recording & Post-Production Checklist  
**Status:** `READY FOR MANUAL EXECUTION`

---

## 📋 Pre-Flight Checklist (Before Clicking Record)

### 1. System & Server Health
- [ ] Backend server running (`uvicorn backend.app.main:app --port 8000`).
- [ ] Health probe verified (`http://127.0.0.1:8000/health` returns status `ok`).
- [ ] Frontend dev server running (`cd frontend/next-app && npm run dev`).
- [ ] Frontend dashboard loading cleanly at `http://localhost:3000`.

### 2. Environment & OS Preparation
- [ ] Windows notifications disabled (Focus Assist / Do Not Disturb ON).
- [ ] Background communication apps closed (Slack, Discord, WhatsApp, Teams).
- [ ] Browser bookmarks bar hidden (`Ctrl+Shift+B`).
- [ ] Clean browser window with zero extra tabs open.
- [ ] Browser zoom level set to `100%` or `110%` for crisp rendering.
- [ ] Display resolution set to `1920x1080` (16:9 aspect ratio).

### 3. Audio & Recording Software
- [ ] Screen recording software configured (OBS / Loom / Camtasia).
- [ ] Recording canvas set to 1080p @ 30fps/60fps, 6,000+ Kbps bitrate.
- [ ] Microphone selected, levels tested (peaks between -6dB and -12dB).
- [ ] Room quiet, doors closed, background noise eliminated.
- [ ] Script and storyboard open on second monitor or printed for reference ([`docs/demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md`](../demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md)).

---

## 🎙️ Live Recording Checklist (During the 3-Minute Walkthrough)

### 1. Navigation & Timing Discipline
- [ ] **0:00 – 0:25:** Command Center (`/`) — Problem stated, -$1.23M (-7.97%) highlighted.
- [ ] **0:25 – 0:55:** Root-Cause Waterfall (`/root-cause`) — Atlanta DC stockout (43.2% / -$550K).
- [ ] **0:55 – 1:20:** LangGraph Investigation (`/investigation`) — 11-node trace & <65% abstention gate.
- [ ] **1:20 – 1:50:** Decision Graph (`/decision-graph`) — 6-column DAG (Cause $\to$ Evidence $\to$ Action).
- [ ] **1:50 – 2:10:** Evidence Lineage (`/evidence`) — SHA-256 cryptographic hash highlighted.
- [ ] **2:10 – 2:40:** Recommendations & Simulation (`/recommendations`) — What-If slider moved (79.4% $\to$ 90%).
- [ ] **2:40 – 3:00:** Executive Briefing (`/briefing`) — CFO vs Sales Manager persona switch & closing.

### 2. Narration & Physical Delivery
- [ ] Voice tone energetic, professional, confident, and articulate.
- [ ] Pacing steady (approx. 140–150 words per minute).
- [ ] Numbers spoken accurately ($15.43M, $14.20M, -$1.23M, 43.2%, 89% conf, +$484K, +$341.4K).
- [ ] Mouse movements smooth and purposeful; no rapid jitter.

---

## 🎬 Post-Recording Review & Export Checklist

- [ ] Complete video playback reviewed with headphones.
- [ ] Video duration verified between 2:50 and 3:05.
- [ ] Audio synchronized with on-screen clicks and animations.
- [ ] Video exported as `InsightPilot_AI_Demo_Accenture_2026.mp4` (1080p, H.264, AAC).
- [ ] Exported file size checked (&lt;500 MB).
- [ ] Video uploaded to YouTube (Unlisted/Public) or Vimeo.
- [ ] Public video playback tested in Incognito window.
- [ ] Video link recorded in [`docs/handoff/SUBMISSION_EVIDENCE_REGISTER.md`](./SUBMISSION_EVIDENCE_REGISTER.md).
