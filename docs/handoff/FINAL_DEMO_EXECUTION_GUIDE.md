# InsightPilot AI — Final Demo Video Owner Execution Guide

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Step-by-Step Practical Execution Guide for 3-Minute Video Recording  
**Authoritative Source Script:** [`docs/demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md`](../demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md)  
**Status:** `READY FOR OWNER RECORDING`

---

## 🎬 1. Executive Summary

This guide provides practical instructions for recording, reviewing, exporting, and uploading the official 3-minute (180-second) demonstration video required for Track 3 evaluation.

The narration script, visual cues, camera focus areas, and storyboard timestamps are already fully specified in [`docs/demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md`](../demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md).

---

## 🛠️ 2. System Startup & Browser Preparation

### A. Terminal 1 — Start FastAPI Backend:
```bash
# In repository root
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```
- Verify API probe: `http://127.0.0.1:8000/health` (Status 200 OK).

### B. Terminal 2 — Start Next.js Frontend:
```bash
cd frontend/next-app
npm run dev
```
- Open browser at `http://localhost:3000`.

### C. Browser Canvas Preparation:
- **Browser:** Google Chrome or Brave (clean profile with zero extensions visible).
- **Zoom Level:** Set to `100%` or `110%` for optimal legibility at 1080p.
- **Bookmarks Bar:** Hide bookmarks bar (`Ctrl+Shift+B` on Windows).
- **Resolution:** 1920 x 1080 (1080p, 16:9 aspect ratio).

---

## 🎙️ 3. Recording Environment & Audio Setup

- **Microphone:** Dedicated USB condenser mic or high-quality headset (avoid laptop built-in mic).
- **Environment:** Quiet room with minimal echo; close windows and turn off fans.
- **Software Settings (OBS / Loom):**
  - Resolution: 1920x1080 @ 30fps or 60fps.
  - Video Bitrate: 6,000–8,000 Kbps (CBR / H.264).
  - Audio Bitrate: 192–320 Kbps (AAC / 48kHz).
- **Cursor Discipline:** Move cursor with deliberate, smooth motions; avoid erratic circling.

---

## ⏱️ 4. The 180-Second 7-Screen Walkthrough Route

| Time Slot | Screen Route | Core Talking Point & Visual Focus | Target Duration |
| :---: | :--- | :--- | :---: |
| **0:00 – 0:25** | `http://localhost:3000/` *(Command Center)* | Introduce diagnostic latency. Point to -$1.23M (-7.97%) drop and 8 synced enterprise datasets. | 25s |
| **0:25 – 0:55** | `http://localhost:3000/root-cause` *(Waterfall)* | Highlight deterministic 4-driver waterfall. Focus on Atlanta DC stockout (43.2% / -$550K). | 30s |
| **0:55 – 1:20** | `http://localhost:3000/investigation` *(LangGraph)* | Show 11-node multi-agent trace. Explain hypothesis testing and &lt;65% confidence abstention gate. | 25s |
| **1:20 – 1:50** | `http://localhost:3000/decision-graph` *(DAG)* | Walk through 6-column topology (Cause $\to$ Evidence $\to$ Action $\to$ Impact). Click nodes. | 30s |
| **1:50 – 2:10** | `http://localhost:3000/evidence` *(Lineage)* | Click Atlanta stockout record. Highlight 64-character SHA-256 cryptographic digest. | 20s |
| **2:10 – 2:40** | `http://localhost:3000/recommendations` *(Sandbox)*| Review Priority 1 action (+$484K). Move What-If slider (79.4% $\to$ 90% $\to$ +$341.4K recovery). | 30s |
| **2:40 – 3:00** | `http://localhost:3000/briefing` *(Briefing)* | Switch between CFO board view and Regional Sales Manager view. Deliver concluding call-to-action. | 20s |

*Total Target Duration: Exactly 180 Seconds (3:00).*

---

## 🔍 5. Post-Recording Quality Review

Before uploading, perform this 5-point sanity check:
1. **Duration Compliance:** Is the runtime between 2:50 and 3:05? (Exceeding 3:15 risks penalty).
2. **Audio Clarity:** Is the voiceover distinct, free of background hum, and volume-normalized (-14 to -16 LUFS)?
3. **Metric Accuracy:** Did you speak the locked numbers ($15.43M, $14.20M, -$1.23M, 43.2%, 89% conf, +$484K, +$341.4K)?
4. **Visual Resolution:** Are text and data tables crisp and readable in 1080p?
5. **No Glitches:** Zero accidental OS notifications, Discord chimes, or awkward pauses.

---

## 📤 6. Export & Hosting Instructions

1. **File Export:** Export final render as `InsightPilot_AI_Demo_Accenture_2026.mp4` (H.264, AAC).
2. **Video Hosting (YouTube / Vimeo):**
   - Title: `InsightPilot AI — Enterprise Decision Intelligence (Accenture Innovation Challenge 2026)`
   - Visibility: `Unlisted` (accessible via link) or `Public`.
   - Description: Include link to GitHub repository (`https://github.com/ayus1234/InsighPilotAI`).
3. **Record URL:** Copy the public streaming link and paste it into [`docs/handoff/SUBMISSION_EVIDENCE_REGISTER.md`](./SUBMISSION_EVIDENCE_REGISTER.md).
