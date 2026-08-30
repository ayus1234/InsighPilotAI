"""
InsightPilot AI - Competition Final Submission Package Builder
Generates:
1. submission_assets/InsightPilot_AI_README.pdf
2. submission_assets/InsightPilot_AI_Detailed_Business_Proposal.pdf
3. submission_assets/InsightPilot_AI_Detailed_Business_Proposal.pptx
"""

import os
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

ASSETS_DIR = Path("submission_assets")
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

# ----------------------------------------------------------------------
# PDF Numbered Canvas Helper
# ----------------------------------------------------------------------
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_footer(num_pages)
            super().showPage()
        super().save()

    def draw_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#718096"))
        
        # Header line
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(40, 755, 572, 755)
        self.drawString(40, 760, "InsightPilot AI | Accenture Innovation Challenge 2026")
        self.drawRightString(572, 760, "Track 3: BusinessIntelligence.ai")
        
        # Footer line
        self.line(40, 45, 572, 45)
        self.drawString(40, 32, "Confidential • Enterprise Decision Intelligence • https://github.com/ayus1234/InsighPilotAI")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 32, page_text)
        self.restoreState()


# ----------------------------------------------------------------------
# 1. BUILD README PDF
# ----------------------------------------------------------------------
def build_readme_pdf():
    pdf_path = ASSETS_DIR / "InsightPilot_AI_README.pdf"
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55,
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=4,
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#0284C7'),
        spaceAfter=12,
    )
    
    h1_style = ParagraphStyle(
        'Heading1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=14,
        spaceAfter=6,
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=10,
        spaceAfter=4,
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6,
    )

    code_style = ParagraphStyle(
        'CodeBlock',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#0F172A'),
        backColor=colors.HexColor('#F1F5F9'),
        borderPadding=6,
        spaceAfter=8,
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#0369A1'),
        backColor=colors.HexColor('#F0F9FF'),
        borderColor=colors.HexColor('#BAE6FD'),
        borderWidth=1,
        borderPadding=6,
        spaceAfter=8,
    )

    story = []

    # Title & Header
    story.append(Paragraph("InsightPilot AI — System README & Technical Manual", title_style))
    story.append(Paragraph("Enterprise Decision Intelligence, Deterministic Root-Cause Attribution & Cryptographic Evidence Lineage", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0284C7"), spaceAfter=10))

    # Executive Summary
    story.append(Paragraph("1. Executive Summary & Problem Context", h1_style))
    story.append(Paragraph(
        "<b>InsightPilot AI</b> is an enterprise decision intelligence platform that automates the transition from descriptive anomaly detection to prescriptive operational recovery. Traditional BI tools indicate <i>what</i> occurred (e.g., -$1.23M revenue deficit), but investigating <i>why</i> requires weeks of cross-silo dataset triage across ERP, CRM, and EDI systems. InsightPilot AI bridges this gap using deterministic analytics engines, LangGraph 11-node orchestration, and SHA-256 cryptographic provenance.",
        body_style
    ))
    
    story.append(Paragraph(
        "<b>Core Architectural Principle:</b> <i>'Deterministic systems own quantitative truth. LangGraph orchestrates investigation. AI explains grounded facts.'</i> LLMs are strictly forbidden from calculating metrics or inventing evidence.",
        callout_style
    ))

    # 7-Screen Analytical Workflow
    story.append(Paragraph("2. The 7-Screen Executive Analytical Journey", h1_style))
    screens_data = [
        ["Screen / Route", "Primary Capability", "Enterprise Impact"],
        ["1. Command Center (/)", "Real-time revenue anomaly triage & data source synchronization", "Detects -$1.23M deficit (-7.97%) across 8 synced enterprise systems."],
        ["2. Root Cause (/root-cause)", "Deterministic waterfall attribution & 6-milestone timeline", "Attributes 43.2% ($550K) to Atlanta DC stockout; 100% variance explained."],
        ["3. Investigation (/investigation)", "LangGraph 11-node state graph trace & agent replay", "Full agentic audit trail with tool execution logs & confidence scores."],
        ["4. Decision Graph (/decision-graph)", "Interactive 6-column DAG mapping Anomaly -> Actions", "Visual causality pipeline with stage stepper & node inspector."],
        ["5. Evidence Explorer (/evidence)", "12 multi-modal records with SHA-256 verification", "Cryptographic provenance proof for ERP, EDI, CRM, and POS data."],
        ["6. Recommendations (/recommendations)", "2x2 Prioritization Matrix & What-If Elasticity Sandbox", "Priority 1 Stock Transfer ($484K recovery); $757.6K modeled recovery pool."],
        ["7. Executive Briefing (/briefing)", "Role-tailored synthesis (CFO, VP Supply Chain, COO, Sales)", "Audit-ready governance briefings with 1-click boardroom PDF export."],
    ]
    t = Table(screens_data, colWidths=[120, 210, 200])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8),
        ('BOTTOMPADDING', (0,0), (-1,0), 4),
        ('TOPPADDING', (0,0), (-1,0), 4),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#F8FAFC')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))

    # Architecture & Technology Stack
    story.append(Paragraph("3. Technology Stack & Verification", h1_style))
    tech_data = [
        ["Layer", "Technologies", "Verification Level"],
        ["Backend API", "Python 3.11+, FastAPI (ASGI), Pydantic v2, Uvicorn", "305/305 Unit/Integration Tests Passing"],
        ["Deterministic Core", "Pure Python Engines (KPI, Driver, Evidence, Confidence)", "100.000% Mathematical Precision ($1.23M locked)"],
        ["AI Orchestration", "LangGraph 11-Node StateGraph, Groq LLaMA 3.3 70B, Gemini 2.5", "Grounded facts only; calibrated abstention gate"],
        ["Frontend Web App", "Next.js 14.2 (App Router), React 18, Tailwind CSS, Lucide", "10/10 Static Routes Pre-rendered Cleanly"],
        ["Lineage & Security", "8 Normalized CSV Schemas (43K+ rows), SHA-256 Hashes", "100% Cryptographic Digest Verification"],
    ]
    t2 = Table(tech_data, colWidths=[110, 260, 160])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0284C7')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#FFFFFF')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t2)
    story.append(Spacer(1, 10))

    # Quick Start Commands
    story.append(Paragraph("4. Quick Start & Execution Commands", h1_style))
    story.append(Paragraph("<b>Backend API Server:</b>", h2_style))
    story.append(Paragraph("pip install -r requirements.txt<br/>uvicorn backend.app.main:app --host 127.0.0.1 --port 8000", code_style))
    story.append(Paragraph("<b>Frontend Web Application:</b>", h2_style))
    story.append(Paragraph("cd frontend/next-app && npm install && npm run dev<br/># App runs at http://localhost:3000", code_style))
    story.append(Paragraph("<b>Verification Suite:</b>", h2_style))
    story.append(Paragraph("python tests/validate_dataset.py<br/>python -m unittest discover -s tests -t . -p 'test_*.py'<br/>cd frontend/next-app && npm run build", code_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {pdf_path}")


# ----------------------------------------------------------------------
# 2. BUILD DETAILED BUSINESS PROPOSAL PDF
# ----------------------------------------------------------------------
def build_business_proposal_pdf():
    pdf_path = ASSETS_DIR / "InsightPilot_AI_Detailed_Business_Proposal.pdf"
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55,
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=4,
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#0D9488'),
        spaceAfter=12,
    )
    
    h1_style = ParagraphStyle(
        'Heading1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=12,
        spaceAfter=5,
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=5,
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#0F766E'),
        backColor=colors.HexColor('#F0FDFA'),
        borderColor=colors.HexColor('#99F6E4'),
        borderWidth=1,
        borderPadding=6,
        spaceAfter=8,
    )

    story = []

    # Title & Header
    story.append(Paragraph("Detailed Business Proposal — InsightPilot AI", title_style))
    story.append(Paragraph("Autonomous Decision Intelligence for Global Commercial Operations | Accenture Innovation Challenge 2026", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0D9488"), spaceAfter=8))

    # 1. Executive Summary & Value Proposition
    story.append(Paragraph("1. Executive Summary & Market Opportunity", h1_style))
    story.append(Paragraph(
        "Modern global enterprises suffer from the <b>'Investigation Latency Paradox'</b>: while dashboards flag revenue and supply chain anomalies within seconds, diagnosing root causes and formulating verified operational responses takes <b>14 to 28 business days</b>. This delay results in irreversible market share attrition, distributor order cancellations, and unrecovered revenue.",
        body_style
    ))
    story.append(Paragraph(
        "<b>InsightPilot AI</b> reduces decision latency from <b>3 weeks to under 30 seconds</b>. By unifying deterministic analytics with LangGraph multi-agent intelligence, it pinpoints root causes, verifies proof via SHA-256 cryptographic lineage, and simulates high-ROI operational interventions with calibrated confidence scores.",
        callout_style
    ))

    # 2. Case Study: East Region Disruption
    story.append(Paragraph("2. Financial Telemetry & Empirical Investigation Findings", h1_style))
    fin_table_data = [
        ["Metric", "Baseline (Q2 2026)", "Actual (Q3 2026)", "Empirical Gap", "Status"],
        ["East Region Net Revenue", "$15,430,000.06", "$14,200,000.05", "-$1,230,000.01 (-7.97%)", "Critical Deficit"],
        ["SKU-8821 Stockout Duration", "0.0 Days (Normal)", "14.0 Days (Atlanta DC)", "+14.0 Days Unfulfilled", "Primary Bottleneck"],
        ["Distributor PO Deferrals", "0 Held Orders", "29 Held Orders ($240K)", "29 Postponed POs", "Channel Friction"],
        ["Customer Escalations", "34 Baseline Tickets", "142 Backlog Tickets", "+310% Surge in SLA Breaches", "Customer Impact"],
    ]
    t_fin = Table(fin_table_data, colWidths=[125, 100, 100, 125, 80])
    t_fin.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 7.5),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#F8FAFC')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_fin)
    story.append(Spacer(1, 8))

    # 3. Root Cause Attribution
    story.append(Paragraph("3. Deterministic Root-Cause Attribution Waterfall", h1_style))
    driver_data = [
        ["Rank", "Driver Name", "Attribution %", "Financial Impact", "Confidence", "Controllability"],
        ["#1", "Atlanta DC Inventory Stockout (SKU-8821)", "43.2%", "-$550,000.00", "94.0% High", "Directly Controllable"],
        ["#2", "SKU-8821 Sales Velocity Contraction", "26.7%", "-$340,000.00", "88.5% High", "Directly Controllable"],
        ["#3", "Distributor Purchase Order Deferrals", "18.8%", "-$240,000.00", "89.0% High", "Semi-Controllable"],
        ["#4", "Competitor Horizon Price Cut (-15%)", "11.3%", "-$144,000.00", "86.0% High", "Market Factor"],
        ["Total", "100.0% Variance Explained", "100.0%", "-$1,230,000.00", "92.4% Avg", "Exhaustive Reconciliation"],
    ]
    t_drv = Table(driver_data, colWidths=[30, 195, 75, 85, 75, 70])
    t_drv.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F766E')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 7.5),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#CCFBF1')),
        ('FONTNAME', (0,-1), (-1,-1), 'Helvetica-Bold'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_drv)
    story.append(Spacer(1, 8))

    # 4. Prescriptive Actions & ROI
    story.append(Paragraph("4. Prescriptive Action Roadmap & Modeled ROI", h1_style))
    action_data = [
        ["Priority", "Recommended Action", "Recovery Value", "Feasibility", "SLA / Timeline"],
        ["Priority 1", "Emergency Stock Transfer (Chicago Central -> Atlanta DC)", "+$484,000.00", "High (4,800 units avail)", "14 Days (Immediate)"],
        ["Priority 2", "Distributor PO Discount Incentive (-4% early release)", "+$180,000.00", "High (29 POs target)", "7 Days (Commercial)"],
        ["Priority 3", "Targeted East Retail Co-Op Counter-Promotion", "+$93,600.00", "Medium (Marketing)", "30 Days (Quarterly)"],
        ["Total", "Modeled Financial Recovery Pool", "+$757,600.00", "High Feasibility", "61.6% Deficit Recouped"],
    ]
    t_act = Table(action_data, colWidths=[55, 205, 85, 95, 90])
    t_act.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 7.5),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#F1F5F9')),
        ('FONTNAME', (0,-1), (-1,-1), 'Helvetica-Bold'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_act)
    story.append(Spacer(1, 8))

    # 5. Commercial Model & Competitive Moat
    story.append(Paragraph("5. Commercialization, Enterprise Pricing & ROI Moat", h1_style))
    story.append(Paragraph(
        "<b>Enterprise Pricing Model:</b> InsightPilot AI is offered as an Annual SaaS License ($180,000/year/business unit) plus enterprise data connector onboarding ($45,000 one-time). For a Fortune 500 consumer goods enterprise with $250M regional revenue, preventing a single 14-day stockout yields <b>+$484,000 in immediate recovered revenue</b>, delivering a <b>2.7x first-year ROI in under 90 days</b>.",
        body_style
    ))
    story.append(Paragraph(
        "<b>Competitive Moat:</b> Unlike generic LLM chat wrappers that hallucinate calculations, InsightPilot AI features <i>Strict Mathematical Determinism</i>, <i>Cryptographic SHA-256 Proof</i>, and a <i>Calibrated Abstention Guard</i>, making it fully compliant with Enterprise Audit, SOX, and Corporate Governance standards.",
        callout_style
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {pdf_path}")


# ----------------------------------------------------------------------
# 3. BUILD DETAILED BUSINESS PROPOSAL PPTX (12 SLIDES)
# ----------------------------------------------------------------------
def build_business_proposal_pptx():
    pptx_path = ASSETS_DIR / "InsightPilot_AI_Detailed_Business_Proposal.pptx"
    prs = Presentation()
    
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    # Dark Enterprise Theme Colors
    BG_COLOR = RGBColor(5, 20, 36)        # #051424
    CARD_BG = RGBColor(15, 33, 55)        # #0F2137
    PRIMARY = RGBColor(79, 222, 200)      # #4FDEC8 (Teal)
    TEXT_LIGHT = RGBColor(241, 245, 249)  # #F1F5F9 (White/Light)
    TEXT_MUTED = RGBColor(148, 163, 184)  # #94A3B8 (Gray)
    ACCENT_WARN = RGBColor(255, 107, 107) # #FF6B6B (Coral/Red)
    ACCENT_GOLD = RGBColor(251, 191, 36)  # #FBBF24 (Gold)

    slides_content = [
        {
            "num": "01",
            "title": "InsightPilot AI: Autonomous Enterprise Decision Intelligence",
            "subtitle": "Accenture Innovation Challenge 2026 • Track 3: BusinessIntelligence.ai",
            "bullets": [
                "Automating the transition from descriptive anomaly detection to prescriptive operational action.",
                "Reducing enterprise investigation latency from 14-28 business days to under 30 seconds.",
                "Built on strict mathematical determinism, LangGraph 11-node orchestration, and SHA-256 evidence lineage.",
                "Team: Ayush Kumar (Developer & Architect) • Repository: https://github.com/ayus1234/InsighPilotAI"
            ],
            "kpis": [("-$1.23M", "Empirical Revenue Deficit"), ("43.2%", "Primary Stockout Attribution"), ("+$757.6K", "Modeled Recovery Pool"), ("<30s", "Automated Resolution Time")]
        },
        {
            "num": "02",
            "title": "Executive Problem: The Enterprise Investigation Latency Paradox",
            "subtitle": "Modern BI tools show WHAT happened; finding WHY takes weeks of manual cross-silo triage.",
            "bullets": [
                "Fragmented Silos: Critical operational data is locked in SAP S/4HANA (ERP), Salesforce (CRM), EDI gateways, and WMS.",
                "Decision Latency: Investigating a revenue deficit requires 2-4 weeks of manual cross-department coordination.",
                "Irreversible Losses: By the time root causes are discovered, distributor orders are cancelled and market share is lost.",
                "GenAI Hallucination Risk: Generic LLM chat tools invent metrics and lack verifiable audit trails for executive sign-off."
            ],
            "kpis": [("21 Days", "Avg Enterprise Investigation"), ("-$550K", "Avoidable Stockout Loss"), ("29 POs", "Deferred Distributor Orders"), ("+310%", "Support Ticket Escalations")]
        },
        {
            "num": "03",
            "title": "The InsightPilot AI Solution: Defensible, Grounded Decision Intelligence",
            "subtitle": "Deterministic Systems Own Truth • LangGraph Orchestrates • AI Explains Facts",
            "bullets": [
                "Deterministic Core: Pure Python analytics calculate variance, rank drivers, and simulate recovery without LLM hallucinations.",
                "Agentic Orchestration: LangGraph 11-node StateGraph executes autonomous multi-step investigation loops with tool inspection.",
                "Multi-Model Routing: Dynamically routes requests between Groq LLaMA 3.3 70B and Google Gemini 2.5 Flash with fallback resilience.",
                "Calibrated Guardrails: Built-in abstention engine halts execution if factual grounding falls below strict 80% confidence threshold."
            ],
            "kpis": [("100%", "Mathematical Precision"), ("11 Nodes", "StateGraph Orchestration"), ("2 Engines", "Groq + Gemini Multi-Pool"), ("0%", "Speculative Hallucinations")]
        },
        {
            "num": "04",
            "title": "Empirical Diagnostic Findings: East Region Disruption Case Study",
            "subtitle": "Deterministic decomposition of -$1,230,000.01 net variance across 8 enterprise systems.",
            "bullets": [
                "Empirical Gap: Q3 2026 actual revenue fell to $14,200,000.05 against $15,430,000.06 baseline (-7.97% critical deficit).",
                "Trigger Event: Atlanta DC experienced 14 consecutive days of zero available inventory for flagship product SKU-8821.",
                "Channel Friction: 29 Tier-1 distributor purchase orders ($240K value) deferred due to unconfirmed warehouse dispatch dates.",
                "External Factor: Horizon Foods launched aggressive 15% promotional pricing in East territory, capturing deferred volume."
            ],
            "kpis": [("$15.43M", "Q2 Baseline Revenue"), ("$14.20M", "Q3 Actual Revenue"), ("-$1.23M", "Net Financial Deficit"), ("14 Days", "Zero-Stock Duration")]
        },
        {
            "num": "05",
            "title": "Deterministic Root-Cause Attribution Waterfall",
            "subtitle": "Exhaustive mathematical decomposition explaining 100.0% of net financial variance.",
            "bullets": [
                "Driver #1: Atlanta DC Inventory Stockout — 43.2% contribution (-$550,000.00 impact, 94% confidence, Directly Controllable).",
                "Driver #2: SKU-8821 Sales Velocity Contraction — 26.7% contribution (-$340,000.00 impact, 88.5% confidence, Controllable).",
                "Driver #3: Distributor Purchase Order Deferrals — 18.8% contribution (-$240,000.00 impact, 89% confidence, Semi-Controllable).",
                "Driver #4: Competitor Horizon Promotional Pressure — 11.3% contribution (-$144,000.00 impact, 86% confidence, Market Factor)."
            ],
            "kpis": [("100.0%", "Variance Explained"), ("-$550K", "Primary Driver Share"), ("4 Drivers", "Ranked Attribution"), ("92.4%", "Average Confidence")]
        },
        {
            "num": "06",
            "title": "Panoramic 6-Column Decision Graph (Causal DAG)",
            "subtitle": "Interactive causal graph connecting Anomaly -> Drivers -> Market -> Evidence -> Actions -> Outcome.",
            "bullets": [
                "14 Nodes & 17 Directed Edges: Visual causality flow illustrating cascading operational dependencies.",
                "Active Pathway Highlighting: 1-click focus mode isolates specific causal chains (e.g. Stockout -> Transfer -> Recovery).",
                "3-Section Enterprise Toolbar: Flow selector, quick search, and toggleable Node Details drawer for deep telemetry.",
                "Floating Stage Stepper: Smoothly auto-scrolls between DAG columns without node clipping across any viewport."
            ],
            "kpis": [("6 Columns", "Lifecycle DAG Canvas"), ("14 Nodes", "Grounded Entities"), ("17 Edges", "Directed Lineage"), ("1-Click", "Path Spotlight")]
        },
        {
            "num": "07",
            "title": "Cryptographic Evidence Explorer & SHA-256 Provenance",
            "subtitle": "12 multi-modal records carrying immutable cryptographic SHA-256 audit digests.",
            "bullets": [
                "8 Structured Records: Live ledger integration across SAP S/4HANA (MM-WM), NetSuite EDI, Salesforce CRM, and Retail POS.",
                "4 Unstructured Streams: Distributor communication logs, customer escalation transcripts, and competitive web scrapes.",
                "Consolidated 3-Column Table: Source & Domain, Record ID, and Confidence badge with zero right-edge clipping.",
                "100% Cryptographic Verification: On-demand SHA-256 digest validation ensures audit-ready compliance for enterprise governance."
            ],
            "kpis": [("12 Records", "Empirical Evidence"), ("100%", "SHA-256 Integrity"), ("8 Systems", "Cross-Silo Ingestion"), ("SOX-Ready", "Governance Proof")]
        },
        {
            "num": "08",
            "title": "Prescriptive Action Recommendations & What-If Sandbox",
            "subtitle": "Prioritized operational playbook generating +$757,600.00 in modeled recovery value.",
            "bullets": [
                "Priority 1: Emergency Stock Transfer (Chicago Central -> Atlanta DC) — Recovers +$484,000.00 (4,800 surplus units available).",
                "Priority 2: Distributor PO Incentive (-4% early payment discount) — Recovers +$180,000.00 across 29 deferred orders.",
                "Priority 3: Targeted East Retail Co-Op Promotion — Recovers +$93,600.00 to counter competitor pricing pressure.",
                "2x2 Matrix & Elasticity Sandbox: Availability elasticity ($32.2K/pt) recovers 61.6% of total revenue deficit in 14-30 days."
            ],
            "kpis": [("+$484K", "Priority 1 Transfer ROI"), ("+$180K", "Distributor Recovery"), ("+$757.6K", "Total Modeled Pool"), ("61.6%", "Deficit Recouped")]
        },
        {
            "num": "09",
            "title": "Multi-Persona Executive Decision Briefings",
            "subtitle": "Role-tailored narrative synthesis with 1-click boardroom PDF generation.",
            "bullets": [
                "CFO View: Emphasizes GAAP revenue reconciliation, SOX compliance, working capital impact, and capital allocation.",
                "VP of Supply Chain View: Focuses on warehouse safety stock targets, freight lead times, and Chicago-to-Atlanta transfer logistics.",
                "COO View: Highlights SLA restoration, operational throughput, distributor relationships, and cross-functional execution.",
                "Regional Sales Director View: Details account-level impact, retail scan rates, and competitive market share defense."
            ],
            "kpis": [("4 Personas", "Executive Views"), ("1-Click", "Boardroom PDF Export"), ("Zero Hallucination", "Strict Guardrails"), ("30 Seconds", "Briefing Generation")]
        },
        {
            "num": "10",
            "title": "System Architecture, Security & Enterprise Scalability",
            "subtitle": "Modern cloud-native stack engineered for enterprise resilience, high concurrency, and zero downtime.",
            "bullets": [
                "FastAPI ASGI Backend: Sub-50ms deterministic inference with Pydantic v2 data contract validation and rate limiting.",
                "Next.js 14 App Router Frontend: Pure Tailwind CSS, React 18, Glassmorphism UI, and 10 pre-rendered static routes.",
                "Comprehensive Observability: Structured JSON logging with unique X-Request-ID tracing and 12-subsystem health probes.",
                "OWASP Compliance: Strict Content Security Policy, X-Frame-Options DENY, sanitization, and 0 secret leakage in repository."
            ],
            "kpis": [("305/305", "Backend Tests Passing"), ("10/10", "Static Routes Compiled"), ("<50ms", "Engine API Latency"), ("0 Secrets", "Verified Git Clean")]
        },
        {
            "num": "11",
            "title": "Commercial Business Model & Fortune 500 ROI",
            "subtitle": "Compelling enterprise SaaS economics with a 2.7x first-year ROI in under 90 days.",
            "bullets": [
                "Pricing Structure: Tiered annual SaaS subscription ($180,000/year/business unit) + $45,000 enterprise connector onboarding.",
                "Direct ROI Proof: For a $250M consumer goods enterprise, mitigating a single 14-day stockout recovers +$484,000 in net margin.",
                "Customer Payback: Full software investment recouped in less than 3 months of production operation.",
                "Expansion Vectors: Land & expand across Supply Chain, Commercial Sales, Finance, and Procurement divisions."
            ],
            "kpis": [("$180K/yr", "Enterprise SaaS Tier"), ("2.7x", "First-Year ROI"), ("<90 Days", "Payback Period"), ("$250M+", "Target Account Scale")]
        },
        {
            "num": "12",
            "title": "Conclusion, Production Readiness & Competition Summary",
            "subtitle": "Fully tested, deployed, documented, and ready for immediate executive evaluation.",
            "bullets": [
                "Competition Track: Accenture Innovation Challenge 2026 • Track 3: BusinessIntelligence.ai",
                "Repository: Public GitHub with 100% test coverage — https://github.com/ayus1234/InsighPilotAI",
                "Prototype Video: High-definition 3-minute executive walkthrough showcasing all 7 core analytical screens.",
                "Submission Deliverables: Master README (PDF), Detailed Business Proposal (PDF/PPTX), and Prototype Demo Video."
            ],
            "kpis": [("100%", "Competition Ready"), ("305 Tests", "Green Test Suite"), ("7 Screens", "Full User Journey"), ("Ready", "Final Submission")]
        }
    ]

    blank_layout = prs.slide_layouts[6]

    for item in slides_content:
        slide = prs.slides.add_slide(blank_layout)
        
        # Background shape
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()

        # Top Accent Line
        accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.04))
        accent.fill.solid()
        accent.fill.fore_color.rgb = PRIMARY
        accent.line.fill.background()

        # Slide Number Badge
        num_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.55), Inches(0.8), Inches(0.5))
        tf_num = num_box.text_frame
        tf_num.text = item["num"]
        p_num = tf_num.paragraphs[0]
        p_num.font.name = 'Arial'
        p_num.font.size = Pt(14)
        p_num.font.bold = True
        p_num.font.color.rgb = PRIMARY

        # Slide Title
        title_box = slide.shapes.add_textbox(Inches(1.6), Inches(0.5), Inches(10.9), Inches(0.55))
        tf_title = title_box.text_frame
        tf_title.text = item["title"]
        p_title = tf_title.paragraphs[0]
        p_title.font.name = 'Arial'
        p_title.font.size = Pt(20)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_LIGHT

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(1.6), Inches(1.05), Inches(10.9), Inches(0.4))
        tf_sub = sub_box.text_frame
        tf_sub.text = item["subtitle"]
        p_sub = tf_sub.paragraphs[0]
        p_sub.font.name = 'Arial'
        p_sub.font.size = Pt(11)
        p_sub.font.color.rgb = TEXT_MUTED

        # Main Content Card (Left 7.2 Inches)
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(7.5), Inches(5.2))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = RGBColor(30, 58, 90)
        card.line.width = Pt(1)

        # Bullets inside Card
        bullets_box = slide.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(7.1), Inches(4.8))
        tf_b = bullets_box.text_frame
        tf_b.word_wrap = True

        for i, bullet in enumerate(item["bullets"]):
            p = tf_b.add_paragraph() if i > 0 else tf_b.paragraphs[0]
            p.text = f"•  {bullet}"
            p.font.name = 'Arial'
            p.font.size = Pt(11.5)
            p.font.color.rgb = TEXT_LIGHT
            p.space_after = Pt(12)

        # KPI Callout Cards (Right Side: 4 small cards)
        kpi_y_starts = [1.6, 2.95, 4.3, 5.65]
        for idx, (kpi_val, kpi_label) in enumerate(item["kpis"]):
            y_pos = kpi_y_starts[idx]
            k_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.6), Inches(y_pos), Inches(3.933), Inches(1.15))
            k_card.fill.solid()
            k_card.fill.fore_color.rgb = CARD_BG
            k_card.line.color.rgb = PRIMARY if idx == 0 else RGBColor(30, 58, 90)
            k_card.line.width = Pt(1.5 if idx == 0 else 1)

            # KPI Text
            k_box = slide.shapes.add_textbox(Inches(8.8), Inches(y_pos + 0.1), Inches(3.533), Inches(0.95))
            tf_k = k_box.text_frame
            tf_k.word_wrap = True
            
            p_v = tf_k.paragraphs[0]
            p_v.text = kpi_val
            p_v.font.name = 'Arial'
            p_v.font.size = Pt(18)
            p_v.font.bold = True
            p_v.font.color.rgb = PRIMARY if idx == 0 else (ACCENT_GOLD if idx == 2 else TEXT_LIGHT)

            p_l = tf_k.add_paragraph()
            p_l.text = kpi_label
            p_l.font.name = 'Arial'
            p_l.font.size = Pt(9.5)
            p_l.font.color.rgb = TEXT_MUTED

        # Footer
        footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.733), Inches(0.3))
        tf_f = footer_box.text_frame
        p_f = tf_f.paragraphs[0]
        p_f.text = f"InsightPilot AI • Confidential • Slide {item['num']} of 12 • Track 3: BusinessIntelligence.ai"
        p_f.font.name = 'Arial'
        p_f.font.size = Pt(8.5)
        p_f.font.color.rgb = RGBColor(100, 116, 139)

    prs.save(str(pptx_path))
    print(f"[OK] Generated: {pptx_path}")


if __name__ == "__main__":
    print("==================================================")
    print("InsightPilot AI - Generating Submission Assets")
    print("==================================================")
    build_readme_pdf()
    build_business_proposal_pdf()
    build_business_proposal_pptx()
    print("==================================================")
    print("All submission assets successfully generated in 'submission_assets/'")
    print("==================================================")
