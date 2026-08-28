# InsightPilot AI — Video Editing Blueprint & Timeline Construction

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Non-Linear Video Editing Blueprint, Audio Sync & Rendering Specifications  
**Recommended NLE Software:** DaVinci Resolve, Adobe Premiere Pro, or Final Cut Pro  
**Master Timeline Target:** `03:00.00 (180 Seconds / 10,800 Frames @ 60 FPS)`

---

## 1. Multi-Track Timeline Architecture

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TRACK               MAPPING / PURPOSE                                                  │
├─────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Video Track 4 (V4)  │ Graphic Overlays, Lower-Thirds & Verification Badges             │
│ Video Track 3 (V3)  │ Motion Inserts, Cursor Highlights & Dynamic Micro-Zooms (115%)   │
│ Video Track 2 (V2)  │ Fullscreen Live UI Screen Recordings (1080p60 Lossless)          │
│ Video Track 1 (V1)  │ Presentation Title & Outro Motion Graphic Slides                 │
├─────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Audio Track 1 (A1)  │ Voiceover (Master Dialogue, Cleaned, De-essed, Normalized -3dB)   │
│ Audio Track 2 (A2)  │ Subtle Ambient Electronic UI SFX (Clicks, Drawer Slides, Swooshes)│
│ Audio Track 3 (A3)  │ Low-Volume Ambient Background Music (Sidechained Ducking -24dB)  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Scene-by-Scene Cut & Zoom Blueprint

| Scene # | Time Window | Screen / Focus | Cut / Transition | Zoom & Pan Directive |
| :---: | :---: | :--- | :--- | :--- |
| **01** | `0:00 - 0:15` | Pitch Deck (Slide 1 & 2) | Hard Cut / Crossfade (12 frames) | Static slide with subtle text reveal animation. |
| **02** | `0:15 - 0:30` | Command Center (`/`) | Cross-dissolve from slide | Smooth zoom (110%) centering on Hero KPI Card (`-$1.23M`). |
| **03** | `0:30 - 0:50` | LangGraph Trace (`/investigation`) | Whip-pan right transition | Slow vertical pan down the 11 nodes; zoom on Node 6 (Confidence). |
| **04** | `0:50 - 1:10` | Root Cause (`/root-cause`) | Quick dissolve (8 frames) | Zoom (115%) on Atlanta DC Stockout row and 43.2% progress bar. |
| **05** | `1:10 - 1:25` | Evidence (`/evidence`) | Quick cut | Pan to 5-layer lineage drawer; highlight SHA-256 hash string. |
| **06** | `1:25 - 1:45` | Grounded AI (`/root-cause`) | Cut to AI Summary card | Focus zoom (112%) on cited evidence badges and zero hallucination note. |
| **07** | `1:45 - 2:05` | Decision Graph (`/decision-graph`) | Smooth cross-dissolve | Slow horizontal pan across all 6 columns; highlight causal flow. |
| **08** | `2:05 - 2:25` | Recommendations (`/recommendations`) | Cut to recommendations | Zoom on Priority 1 Action Card; highlight `+$484K` recovery badge. |
| **09** | `2:25 - 2:40` | Simulation (`/recommendations`) | Close-up on slider | Dynamic zoom on availability slider moving from 79.4% $\to$ 90.0%. |
| **10** | `2:40 - 3:00` | Briefing & Outro (`/briefing`) | Cut to briefing $\to$ Outro Slate | Show persona switch $\to$ click Approve button $\to$ fade to black. |

---

## 3. Audio Post-Processing & Background Music Rules

1. **Voiceover Mastering Chain:**
   - **High-Pass Filter:** 80 Hz rolloff (removes low-frequency rumble).
   - **Parametric EQ:** +2 dB boost at 3.5 kHz (adds presence and vocal intelligibility).
   - **Compressor:** 3:1 ratio with -16 dB threshold.
   - **Master Limiter:** Ceiling locked at `-1.0 dB True Peak`.
2. **Background Music (BGM):**
   - Style: Minimalist, tech-forward, ambient corporate electronic (no vocals).
   - Volume: Set to `-24 dB` during speech, ducking automatically by -4 dB when voiceover is active.
3. **Sound Effects (SFX):**
   - Subtle digital "whoosh" on major screen transitions (Volume: `-18 dB`).
   - Soft digital "click" on button activations and slider release (Volume: `-20 dB`).

---

## 4. Master Export & Delivery Specifications

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ MASTER EXPORT PRESET (H.264 / MP4)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Container:           MP4 (.mp4)                                             │
│ Video Codec:         H.264 / AVC (High Profile, Level 4.2)                  │
│ Resolution:          1920 x 1080 (16:9 Aspect Ratio)                        │
│ Frame Rate:          60.000 FPS (Progressive)                               │
│ Bitrate Mode:        Constant Bitrate (CBR) or Two-Pass VBR                 │
│ Target Bitrate:      14,000 kbps (14 Mbps)                                  │
│ Audio Codec:         AAC-LC                                                 │
│ Audio Bitrate:       320 kbps (Stereo, 48,000 Hz)                           │
│ Color Space:         Rec.709 / sRGB                                         │
│ Total File Size:     ~315 MB (for 3:00 at 14 Mbps)                          │
└─────────────────────────────────────────────────────────────────────────────┘
```
