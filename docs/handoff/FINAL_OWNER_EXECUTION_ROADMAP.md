# InsightPilot AI — Master Owner Execution Roadmap

**Project:** InsightPilot AI  
**Competition:** Accenture Innovation Challenge 2026 (Track 3: BusinessIntelligence.ai)  
**Document:** Dependency-Ordered Master Manual Execution Roadmap  
**Status:** `READY FOR OWNER EXECUTION — ALL REPOSITORY ASSETS PREPARED`

---

## 🗺️ 12-Stage Dependency-Ordered Execution Sequence

This roadmap defines the strict chronological sequence of human-only actions required to bring InsightPilot AI from a finalized local codebase to official competition submission and public portfolio publication.

```text
================================================================================
                    12-STAGE OWNER EXECUTION TIMELINE
================================================================================

 [Stage 1] Repository Check & Verification
      │
      ▼
 [Stage 2] Demo Environment Preparation ──▶ [Stage 3] Record 3-Min Demo Video
                                                         │
                                                         ▼
 [Stage 5] Pitch Deck Review ──────────────▶ [Stage 4] Review & Export Video
      │
      ▼
 [Stage 6] Export Pitch Deck to PDF ───────▶ [Stage 7] External Asset Verification
                                                         │
                                                         ▼
 [Stage 8] Portal Metadata Assembly ───────▶ [Stage 9] Pre-Submission Gate Review
                                                         │
                                                         ▼
 [Stage 11] Capture Evidence ◀───────────── [Stage 10] Submit on Accenture Portal
      │
      ▼
 [Stage 12] Final Archive & Portfolio Showcase
================================================================================
```

---

### Stage 1: Repository Final Check & Liveness Probe
- **Objective:** Confirm local system health and zero-regression state.
- **Prerequisites:** Python 3.11+, Node.js 18+.
- **Authoritative Docs:** [`docs/closure/LONG_TERM_HANDOFF.md`](../closure/LONG_TERM_HANDOFF.md).
- **Manual Action:** Run `python tests/validate_dataset.py` and start backend (`uvicorn backend.app.main:app --port 8000`) and frontend (`npm run dev`).
- **Verification:** `http://127.0.0.1:8000/health` returns `{"status":"ok"}`.
- **Expected Output:** Local dashboard active at `http://localhost:3000`.

---

### Stage 2: Final Demo Recording Environment Preparation
- **Objective:** Configure recording software, browser resolution, and clean tabs.
- **Prerequisites:** OBS Studio / Loom / Screen Recorder installed; microphone tested.
- **Authoritative Docs:** [`docs/demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md`](../demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md), [`docs/handoff/RECORDING_DAY_CHECKLIST.md`](./RECORDING_DAY_CHECKLIST.md).
- **Manual Action:** Set display to 1920x1080 (16:9), close background apps, mute system notifications.
- **Expected Output:** Clean recording canvas with zero desktop clutter.

---

### Stage 3: Record 3-Minute Demo Video
- **Objective:** Record a crisp, uninterrupted 3-minute product walkthrough following storyboard beats.
- **Prerequisites:** Screen recorder active, microphone unmuted.
- **Authoritative Docs:** [`docs/demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md`](../demo/DEMO_VIDEO_SCRIPT_AND_STORYBOARD.md).
- **Manual Action:** Execute the 7-screen flow in 180 seconds: Command Center (25s) $\to$ Root-Cause Waterfall (30s) $\to$ LangGraph Trace (25s) $\to$ Decision Graph (30s) $\to$ Evidence Lineage (20s) $\to$ What-If Sandbox (30s) $\to$ Executive Briefing (20s).
- **Expected Output:** Raw video recording (MP4/WebM).

---

### Stage 4: Review and Export Demo Video
- **Objective:** Verify audio clarity, timing (175–180s), and resolution.
- **Prerequisites:** Raw video file recorded.
- **Authoritative Docs:** [`docs/handoff/FINAL_DEMO_EXECUTION_GUIDE.md`](./FINAL_DEMO_EXECUTION_GUIDE.md).
- **Manual Action:** Trim head/tail silence, export MP4 (1080p, H.264, AAC), upload as Unlisted/Public to YouTube/Vimeo.
- **Expected Output:** Working public streaming video URL.
- **Status:** `PENDING OWNER ACTION`

---

### Stage 5: Prepare Final Pitch Deck
- **Objective:** Review the 12-slide executive presentation blueprint against locked metrics.
- **Prerequisites:** Presentation editor (PowerPoint / Keynote / Canva / Google Slides).
- **Authoritative Docs:** [`docs/presentation/COMPETITION_PITCH_DECK_SPECIFICATION.md`](../presentation/COMPETITION_PITCH_DECK_SPECIFICATION.md).
- **Manual Action:** Verify all 12 slides match canonical metrics ($15.43M $\to$ $14.20M, Atlanta DC 43.2%, 89% conf, +$484K action, +$341.4K simulation).
- **Expected Output:** Finalized 12-slide presentation file.

---

### Stage 6: Export Pitch Deck PDF
- **Objective:** Export presentation to high-resolution vector PDF (&lt;25 MB).
- **Prerequisites:** Slide content verified.
- **Authoritative Docs:** [`docs/handoff/FINAL_PITCH_DECK_EXECUTION_GUIDE.md`](./FINAL_PITCH_DECK_EXECUTION_GUIDE.md).
- **Manual Action:** Export PDF named `InsightPilot_AI_Pitch_Deck_Accenture_2026.pdf` and upload to Google Drive/DocSend if URL submission is required.
- **Expected Output:** Clean PDF document with working internal text and crisp diagrams.
- **Status:** `PENDING OWNER ACTION`

---

### Stage 7: Verify External Assets
- **Objective:** Cross-verify that all external links (GitHub repo, demo video URL, presentation PDF) open cleanly in an incognito window.
- **Prerequisites:** URLs gathered from Stages 4 and 6.
- **Authoritative Docs:** [`docs/handoff/EXTERNAL_ASSET_VERIFICATION_WORKFLOW.md`](./EXTERNAL_ASSET_VERIFICATION_WORKFLOW.md).
- **Manual Action:** Test each link without authenticated browser sessions.
- **Expected Output:** 100% link accessibility verified.

---

### Stage 8: Assemble Competition Portal Metadata
- **Objective:** Prepare copy-paste ready answers for all standard competition portal fields.
- **Prerequisites:** Submission package reviewed.
- **Authoritative Docs:** [`docs/submission/FINAL_SUBMISSION_PACKAGE.md`](../submission/FINAL_SUBMISSION_PACKAGE.md), [`docs/handoff/FINAL_COMPETITION_PORTAL_EXECUTION_RUNBOOK.md`](./FINAL_COMPETITION_PORTAL_EXECUTION_RUNBOOK.md).
- **Manual Action:** Populate local form staging document with executive summary, problem statement, architecture overview, and URLs.
- **Expected Output:** Zero-error staging document ready for form entry.

---

### Stage 9: Pre-Submission Gate Review (Go / No-Go)
- **Objective:** Formal pre-submission sign-off across all 5 critical submission dimensions.
- **Prerequisites:** Stages 1–8 complete.
- **Authoritative Docs:** [`docs/handoff/FINAL_OWNER_PRE_SUBMISSION_GATE.md`](./FINAL_OWNER_PRE_SUBMISSION_GATE.md).
- **Manual Action:** Check off all 20 gate items.
- **Expected Output:** Formal `🟢 GO — READY FOR OWNER SUBMISSION` verdict.

---

### Stage 10: Submit on Accenture Portal
- **Objective:** Final submission on the official Accenture Innovation Challenge portal before deadline.
- **Prerequisites:** Portal login credentials, Stage 9 sign-off.
- **Authoritative Docs:** [`docs/handoff/FINAL_COMPETITION_PORTAL_EXECUTION_RUNBOOK.md`](./FINAL_COMPETITION_PORTAL_EXECUTION_RUNBOOK.md).
- **Manual Action:** Fill portal fields, attach PDF, paste video URL, review submission preview, and click **Submit**.
- **Expected Output:** Submission successful confirmation screen.
- **Status:** `PENDING OWNER ACTION`

---

### Stage 11: Capture Submission Evidence & Record Details
- **Objective:** Log timestamp, confirmation ID, and screenshots for records.
- **Prerequisites:** Submission confirmation displayed.
- **Authoritative Docs:** [`docs/handoff/SUBMISSION_EVIDENCE_REGISTER.md`](./SUBMISSION_EVIDENCE_REGISTER.md).
- **Manual Action:** Screenshot confirmation screen, record confirmation ID and timestamp in `SUBMISSION_EVIDENCE_REGISTER.md`.
- **Expected Output:** Tamper-evident record of official submission.

---

### Stage 12: Post-Submission Archive & Portfolio Publication
- **Objective:** Update social channels and archive competition materials.
- **Prerequisites:** Stage 11 complete.
- **Authoritative Docs:** [`docs/career/LINKEDIN_PROJECT_SHOWCASE.md`](../career/LINKEDIN_PROJECT_SHOWCASE.md), [`docs/handoff/OWNER_FINAL_SIGN_OFF.md`](./OWNER_FINAL_SIGN_OFF.md).
- **Manual Action:** Publish LinkedIn project card, update resume bullets, and store local offline archive.
- **Expected Output:** Project fully leveraged across competition and career portfolios.
