# InsightPilot AI — External Asset & URL Verification Workflow

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Public Verification Protocols for External URLs, Repositories & Media  
**Status:** `READY FOR VERIFICATION`

---

## 🌐 1. Overview & Verification Philosophy

To ensure zero submission errors and maximum evaluator trust, every external URL submitted to the Accenture portal or listed in public materials must undergo strict verification in an **Incognito / Private browser window** to ensure public accessibility without login walls.

---

## 🔍 2. Asset Verification Protocols

```text
================================================================================
                    EXTERNAL ASSET VERIFICATION PROTOCOL
================================================================================
```

### A. GitHub Repository Verification
- **Target URL:** `https://github.com/ayus1234/InsighPilotAI`
- **Verification Steps:**
  1. Open the URL in an Incognito/Private browser window.
  2. Confirm repository visibility is `Public`.
  3. Verify the root `README.md` renders cleanly with all badges, architecture diagrams, and links intact.
  4. Click on documentation hub links (`docs/portfolio/`, `docs/career/`, `docs/release/`, `docs/handoff/`) and verify relative navigation works.
  5. Confirm the latest commit hash matches local `git log -1`.
- **Status:** `🟢 ACTIVE & VERIFIED`

---

### B. Demo Video Verification (Post-Upload)
- **Target URL:** `[PENDING OWNER UPLOAD — REAL URL REQUIRED]`
- **Verification Steps:**
  1. Paste the video URL (YouTube/Vimeo) into an Incognito window.
  2. Confirm video starts playing immediately without "Private video" or "Login required" errors.
  3. Verify video title: `InsightPilot AI — Enterprise Decision Intelligence (Accenture Innovation Challenge 2026)`.
  4. Check video resolution (confirm 1080p option is selectable).
  5. Check audio playback across both left/right channels.
  6. Confirm video description links back to the GitHub repository.
- **Status:** `🟡 PENDING OWNER ACTION`

---

### C. Pitch Deck PDF Verification (Post-Export / Post-Upload)
- **Target File / URL:** `InsightPilot_AI_Pitch_Deck_Accenture_2026.pdf` / `[OPTIONAL DRIVE LINK]`
- **Verification Steps:**
  1. If hosted via cloud link (Google Drive / DocSend), open in Incognito window.
  2. Ensure link permissions are set to `"Anyone with the link can view"`.
  3. Confirm the PDF viewer displays all 12 slides cleanly without requesting account sign-in.
  4. Verify text remains sharp vector quality when zoomed in 200%.
- **Status:** `🟡 PENDING OWNER ACTION`

---

### D. Live Cloud Application URLs (Optional Cloud Hosting)
- **Backend API URL:** `[OPTIONAL — PENDING RENDER DEPLOYMENT]`
- **Frontend App URL:** `[OPTIONAL — PENDING VERCEL DEPLOYMENT]`
- **Verification Steps (If Deployed):**
  1. Open `https://<your-render-service>.onrender.com/health` $\to$ Confirm `{"status":"ok"}`.
  2. Open `https://<your-render-service>.onrender.com/api/v1/demo/readiness` $\to$ Confirm 12/12 subsystems ready.
  3. Open `https://<your-vercel-app>.vercel.app/` $\to$ Confirm executive dashboard renders with live API data.
- **Status:** `🟡 OPTIONAL / PENDING OWNER ACTION`

---

## 📋 3. External URL Verification Master Table

| Asset Destination | Canonical Expected URL / Format | Incognito Verified | Status |
| :--- | :--- | :---: | :---: |
| **GitHub Repository** | `https://github.com/ayus1234/InsighPilotAI` | `YES` | `🟢 VERIFIED` |
| **Demo Video Stream** | `https://youtu.be/<VIDEO_ID>` or `https://vimeo.com/<ID>` | `PENDING` | `🟡 PENDING OWNER ACTION` |
| **Pitch Deck PDF File** | Local `InsightPilot_AI_Pitch_Deck_Accenture_2026.pdf` | `PENDING` | `🟡 PENDING OWNER ACTION` |
| **Live Backend API** | `https://insightpilot-api.onrender.com` *(Optional)* | `PENDING` | `🟡 OPTIONAL` |
| **Live Web App** | `https://insightpilot.vercel.app` *(Optional)* | `PENDING` | `🟡 OPTIONAL` |
