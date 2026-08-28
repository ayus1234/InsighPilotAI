# InsightPilot AI — Final Video Production Runbook

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Final Production Runbook, Recording Guide & Environment Setup  
**Target Output:** 1080p60 MP4 (H.264/AAC) Competition Video  
**Status:** `PRODUCTION READY`

---

## 1. Recording Environment & Technical Specifications

| Parameter | Specification | Technical Purpose |
| :--- | :--- | :--- |
| **Video Resolution** | `1920 x 1080` (Full HD, 1080p, 16:9) | Standard competition portal and judging screen format |
| **Frame Rate** | `60 FPS` | Smooth cursor movements, slider animations, and drawer transitions |
| **Video Bitrate** | `12,000 – 16,000 kbps` (CBR) | Ultra-crisp text rendering on dense charts, tables, and hash strings |
| **Video Codec** | `H.264 (MP4)` (High Profile, Level 4.2) | Universal compatibility with VLC, QuickTime, YouTube, and web players |
| **Audio Format** | `AAC, 48 kHz, Stereo, 320 kbps` | Studio-quality voiceover clarity |
| **Voiceover Cadence** | `130 – 145 words per minute` | Authoritative, measured executive pacing |
| **Browser Environment** | Chrome / Edge (Clean profile, 100% zoom) | Zero extensions, clean URL bar, dark mode active (`#0B0F19`) |

---

## 2. Pre-Flight System Startup Sequence

Follow this exact command sequence to launch a verified clean demo environment:

### Step 1: Verify Dataset Health
```powershell
python tests/validate_dataset.py
```
*Expected: `ALL DATASET VALIDATION CHECKS PASSED SUCCESSFULLY! (100% HEALTHY)`*

### Step 2: Launch FastAPI Backend Server
```powershell
# In Terminal 1 (from repository root):
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```
- **Backend URL:** `http://localhost:8000`
- **Health Probe:** `http://localhost:8000/health` (Verify returns `{"status":"healthy"}`)
- **Swagger Docs:** `http://localhost:8000/docs`

### Step 3: Launch Next.js Frontend Server
```powershell
# In Terminal 2 (from repository root):
cd frontend/next-app
npm run dev
```
- **Frontend URL:** `http://localhost:3000`

### Step 4: Verify Subsystem Readiness Endpoint
```powershell
# In Terminal 3 (or browser):
curl http://localhost:8000/api/v1/demo/readiness
```
*Expected: `{"submission_ready": true, "subsystems": {...}}` (all 12 subsystems `true`)*

---

## 3. Display, OS & Browser Preparation

1. **OS Environment Cleanup:**
   - Set screen resolution to exactly **1920 x 1080**.
   - Set Windows Display Scaling to **100%** (Settings $\to$ System $\to$ Display $\to$ Scale = 100%).
   - Auto-hide the Windows Taskbar (Taskbar settings $\to$ Automatically hide taskbar in desktop mode).
   - Turn on **Focus Assist / Do Not Disturb** to suppress all Slack, email, and system notifications.
   - Mute all OS notification sounds.

2. **Browser Profile Preparation:**
   - Open a clean Google Chrome or Microsoft Edge window in a separate guest or clean demo profile.
   - Hide the Bookmarks Bar (`Ctrl+Shift+B`).
   - Set browser zoom level to **100%** (`Ctrl+0`).
   - Enable dark mode preference in browser settings.
   - Press **F11** for fullscreen mode during screen recording captures.

3. **Mouse & Cursor Guidelines:**
   - Use default Windows arrow cursor (medium size, white with black outline).
   - Move the cursor with deliberate, smooth, non-jerky movements.
   - Rest cursor on the side of the screen when speaking; avoid nervous circular hovering.
   - Click deliberately and hold for 0.5s on interactive elements (e.g., driver rows, simulation slider).

---

## 4. Audio Setup & Processing Chain

1. **Microphone Setup:**
   - USB or XLR cardioid microphone positioned 6–8 inches from speaker's mouth.
   - Use a pop filter to eliminate plosives ("P", "B", "T").
   - Maintain consistent head distance throughout all takes.

2. **OBS Studio Audio Filters:**
   - **Noise Suppression:** RNNoise (AI-based noise suppression) or -30 dB threshold.
   - **Compressor:** Ratio 3:1, Threshold -18 dB, Attack 6ms, Release 60ms.
   - **Limiter:** Threshold -2.0 dB (prevents clipping).
   - **Target Audio Level:** Peak between -6 dB and -3 dB on loud phrases; resting around -12 dB.

---

## 5. Demo Fallback & Failover Procedures

InsightPilot AI is engineered with resilient offline failover capabilities:

- **Scenario A (Live AI Online):** If `GROQ_API_KEY` or `GEMINI_API_KEY` is configured in `.env`, the system generates real-time grounded AI synthesis in ~185ms.
- **Scenario B (API Rate Limit / Network Drop):** If external APIs return 429 or timeout, the multi-pool router automatically cascades:
  `Groq Pool 1` $\to$ `Groq Pool 2` $\to$ `Gemini Pool 1` $\to$ `Gemini Pool 2` $\to$ `Deterministic Grounded Fallback`.
- **Scenario C (Offline Pure Deterministic Mode):** If running completely offline with no internet access, the backend seamlessly serves verified grounded templates with 100% mathematical fidelity.

---

## 6. Pre-Recording Verification Checklist

- [ ] Backend is running on `http://localhost:8000` (Health returns `healthy`).
- [ ] Frontend is running on `http://localhost:3000`.
- [ ] Subsystem readiness endpoint returns `submission_ready: true`.
- [ ] Screen resolution confirmed at 1920x1080, 60 FPS, 100% zoom.
- [ ] Windows notifications and taskbar hidden.
- [ ] OBS microphone levels tested (peaks between -6 dB and -3 dB).
- [ ] Browser tabs pre-loaded and tested across all 7 routes:
  - `http://localhost:3000/`
  - `http://localhost:3000/root-cause`
  - `http://localhost:3000/investigation`
  - `http://localhost:3000/decision-graph`
  - `http://localhost:3000/evidence`
  - `http://localhost:3000/recommendations`
  - `http://localhost:3000/briefing`
