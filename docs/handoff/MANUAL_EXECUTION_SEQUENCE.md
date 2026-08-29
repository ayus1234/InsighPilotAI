# InsightPilot AI — Manual Execution Sequence

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Concise Step-by-Step Execution Sequence for the Project Owner  
**Status:** `READY FOR IMMEDIATE EXECUTION`

---

## 🎯 Step-by-Step Manual Action Sequence

```text
================================================================================
                    IMMEDIATE MANUAL EXECUTION FLOW
================================================================================
```

### Step 1: Start Local Environment
```bash
# Terminal 1: Backend
uvicorn backend.app.main:app --port 8000

# Terminal 2: Frontend
cd frontend/next-app && npm run dev
```
- Open `http://localhost:3000` in Google Chrome or Brave.

### Step 2: Prepare Screen Recording Software
- Set screen resolution to `1920x1080`.
- Hide browser bookmarks (`Ctrl+Shift+B`).
- Open [`docs/demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md`](../demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md) for script reference.

### Step 3: Record the 3-Minute Walkthrough
- Execute the 7-screen flow in exactly 180 seconds:
  1. Command Center (`/`) — 0:00 to 0:25
  2. Root-Cause Waterfall (`/root-cause`) — 0:25 to 0:55
  3. LangGraph Investigation (`/investigation`) — 0:55 to 1:20
  4. Decision Graph (`/decision-graph`) — 1:20 to 1:50
  5. Evidence Lineage (`/evidence`) — 1:50 to 2:10
  6. Recommendations & Simulation (`/recommendations`) — 2:10 to 2:40
  7. Executive Briefing (`/briefing`) — 2:40 to 3:00

### Step 4: Export & Upload Video
- Export as `InsightPilot_AI_Demo_Accenture_2026.mp4`.
- Upload to YouTube (Unlisted/Public) or Vimeo.
- Copy the public streaming URL.

### Step 5: Export the 12-Slide Pitch Deck PDF
- Open your presentation software.
- Review slides against [`docs/presentation/COMPETITION_PITCH_DECK_SPECIFICATION.md`](../presentation/COMPETITION_PITCH_DECK_SPECIFICATION.md).
- Export vector PDF as `InsightPilot_AI_Pitch_Deck_Accenture_2026.pdf` (&lt;25 MB).

### Step 6: Log in and Submit on Accenture Portal
- Open official competition portal.
- Select `Track 3: BusinessIntelligence.ai`.
- Copy staged text from [`docs/handoff/FINAL_COMPETITION_PORTAL_EXECUTION_RUNBOOK.md`](./FINAL_COMPETITION_PORTAL_EXECUTION_RUNBOOK.md).
- Attach pitch deck PDF and paste video link.
- Click **SUBMIT**.

### Step 7: Record Confirmation
- Save confirmation screenshot to local records.
- Update confirmation ID in [`docs/handoff/SUBMISSION_EVIDENCE_REGISTER.md`](./SUBMISSION_EVIDENCE_REGISTER.md).
