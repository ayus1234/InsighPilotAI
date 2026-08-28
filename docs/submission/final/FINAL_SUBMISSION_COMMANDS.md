# InsightPilot AI — Final Submission Verification Command Sequence

**Competition:** Accenture Innovation Challenge 2026  
**Track:** Track 3 — BusinessIntelligence.ai  
**Document:** Authoritative Clean-State Verification Command Sequence  
**Status:** `VERIFIED & OPERATIONAL`

---

## 1. Step-by-Step Command Sequence

### Step 1: Repository Clean-State Audit
```powershell
# Working Directory: Repository Root
git status
```
- **Expected Success Condition:** `On branch main`, `Your branch is up to date with 'origin/main'`, `nothing to commit, working tree clean`.

---

### Step 2: Automated Dataset Health & Signal Validation
```powershell
# Working Directory: Repository Root
python tests/validate_dataset.py
```
- **Expected Success Condition:**
  - 6/6 checks passing with output: `ALL DATASET VALIDATION CHECKS PASSED SUCCESSFULLY! (100% HEALTHY)`.
  - Verifies exact $15.43M $\to$ $14.20M revenue movement (-7.97%) and Atlanta 79.4% stockout signal.

---

### Step 3: Full Backend Regression & Contract Test Suite
```powershell
# Working Directory: Repository Root
python -m unittest discover -s tests -t . -p "test_*.py" -v
```
- **Expected Success Condition:**
  - `Ran 206 tests ... OK`.
  - Zero test failures, zero test errors, and 100% invariant preservation across all modules.

---

### Step 4: Frontend Next.js Production Bundle Build
```powershell
# Working Directory: frontend/next-app
cd frontend/next-app
npm run build
```
- **Expected Success Condition:**
  - Next.js 14.2.35 compiles successfully with `✓ Generating static pages (10/10)`.
  - Zero TypeScript errors, zero ESLint warnings, and output `Route (app)` listing all 7 competition routes as static (○).

---

### Step 5: Start Local Services for Judge Walkthrough
```powershell
# Terminal 1: FastAPI Backend (Port 8000)
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Next.js Frontend (Port 3000)
cd frontend/next-app
npm run dev
```
- **Expected Success Condition:**
  - Backend Swagger UI accessible at `http://localhost:8000/docs`.
  - Frontend accessible at `http://localhost:3000/` across all 7 routes.
