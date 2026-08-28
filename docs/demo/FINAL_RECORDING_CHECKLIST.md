# InsightPilot AI — Final Recording, Editing & Delivery Checklist

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** End-to-End Production & Quality Assurance Checklist  
**Status:** `READY FOR CAPTURE`

---

## 1. Pre-Recording System & Environment Checklist

- [ ] **Data Integrity:** Ran `python tests/validate_dataset.py` (6/6 checks passed).
- [ ] **Backend Status:** FastAPI server running on `http://localhost:8000` (Health returns `healthy`).
- [ ] **Frontend Status:** Next.js application running on `http://localhost:3000`.
- [ ] **Readiness Probe:** `GET /api/v1/demo/readiness` returns `submission_ready: true`.
- [ ] **Screen Setup:** Display resolution set to 1920x1080, 60 FPS, 100% display scaling.
- [ ] **Browser Profile:** Clean guest/demo profile, bookmarks hidden, 100% zoom, dark mode active.
- [ ] **Distraction Suppression:** Focus Assist active, notifications muted, taskbar hidden.
- [ ] **Microphone Level:** Peak audio between -6 dB and -3 dB, noise suppression active.

---

## 2. Recording Capture Checklist

- [ ] **A-Roll Voiceover:** Recorded clean narration track at 130–145 wpm with zero plosives.
- [ ] **SHOT-01 & 02:** Title and Enterprise BI Gap slides captured.
- [ ] **SHOT-03:** Command Center (`/`) captured; hero card and sparkline inspected.
- [ ] **SHOT-04:** LangGraph timeline (`/investigation`) captured; 11 nodes and 89% confidence shown.
- [ ] **SHOT-05:** Root Cause (`/root-cause`) captured; Atlanta DC Stockout row clicked.
- [ ] **SHOT-06 & 07:** Evidence Explorer (`/evidence`) and 5-layer lineage drawer captured; SHA-256 hash highlighted.
- [ ] **SHOT-08:** Grounded AI synthesis banner captured; cited evidence badge focused.
- [ ] **SHOT-09:** 6-column Decision Graph (`/decision-graph`) captured; horizontal pan recorded.
- [ ] **SHOT-10:** Recommendations (`/recommendations`) captured; Priority 1 action card inspected.
- [ ] **SHOT-11:** What-If Simulation (`/recommendations`) slider smoothly dragged 79.4% $\to$ 90.0%.
- [ ] **SHOT-12 & 13:** Executive Briefing (`/briefing`) persona toggle and "Approve Strategic Actions" sign-off captured.
- [ ] **SHOT-14:** Outro closing slate captured.

---

## 3. Post-Production & Editing Checklist

- [ ] **Timeline Synchronization:** Audio voiceover aligned to exact visual UI actions.
- [ ] **Graphics & Overlays:** All 14 visual overlays positioned and timed according to `FINAL_VIDEO_OVERLAY_PLAN.md`.
- [ ] **Micro-Zooms:** Subtle 115% zooms applied to dense data elements (SHA-256 hash, recovery gauge).
- [ ] **Audio Mix:** Voiceover normalized to -1.0 dB True Peak; background music ducked to -24 dB.
- [ ] **Sound Effects:** Digital clicks and transition whooshes leveled to -18 dB to -20 dB.
- [ ] **Zero Sensitive Data:** Checked that zero personal data, API keys, or unwanted tabs appear.

---

## 4. Final Review & Delivery Sign-Off

- [ ] **Runtime Verification:** Final video duration is exactly `03:00` (within $\pm$2 seconds).
- [ ] **Visual Clarity:** All chart numbers, table rows, and code hashes are crystal clear at 1080p.
- [ ] **Metric Verification:** Spoken and overlay values 100% match `VIDEO_METRIC_VERIFICATION.md`.
- [ ] **Export Specifications:** Rendered as 1080p60 MP4 (H.264 / AAC, 14 Mbps CBR).
- [ ] **Final Approval:** Ready for competition portal submission.
