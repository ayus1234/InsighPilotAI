"""
InsightPilot AI — AI Explanation Output Schemas
Typed Pydantic models for structured Gemini responses and telemetry metadata.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class AIResponseMetadata(BaseModel):
    model: str = Field(..., example="gemini-2.5-flash", description="Gemini model identifier")
    generated_at: str = Field(..., description="UTC ISO generation timestamp")
    latency_ms: float = Field(..., example=842.5, description="End-to-end execution time in milliseconds")
    prompt_tokens: Optional[int] = Field(None, example=450, description="Input tokens consumed")
    completion_tokens: Optional[int] = Field(None, example=210, description="Output tokens generated")
    total_tokens: Optional[int] = Field(None, example=660, description="Total tokens consumed")
    grounded_evidence_count: int = Field(..., example=9, description="Number of verified evidence nodes grounded in narrative")
    validation_status: str = Field(..., example="VERIFIED_GROUNDED", description="Post-generation grounding check status")

class ExecutiveExplanation(BaseModel):
    headline: str = Field(..., description="High-impact 1-sentence executive summary of the KPI movement")
    situation: str = Field(..., description="Contextual statement of what KPI moved, by how much, and its materiality")
    diagnosis: str = Field(..., description="Multi-factor explanation synthesizing the ranked drivers")
    evidence_summary: str = Field(..., description="Synthesis of verified empirical evidence supporting the diagnosis")
    uncertainty: str = Field(..., description="Explicit acknowledgement of analytical limits or residual uncertainty")
    executive_takeaway: str = Field(..., description="Core takeaway tailored to the requesting executive persona")
    grounded_evidence_ids: List[str] = Field(..., description="List of evidence IDs cited in the narrative")

class DriverExplanation(BaseModel):
    driver_id: str = Field(..., description="Target driver identifier")
    driver_name: str = Field(..., description="Target driver display name")
    contribution_summary: str = Field(..., description="Quantified summary of contribution and estimated monetary impact")
    evidence_rationale: str = Field(..., description="How empirical source records substantiate this specific driver")
    operational_context: str = Field(..., description="Operational breakdown tailored to the persona")
    uncertainty: str = Field(..., description="Confidence explanation and unobserved causal caveats")
    grounded_evidence_ids: List[str] = Field(..., description="List of evidence IDs cited for this driver")

class InvestigationSummary(BaseModel):
    headline: str = Field(..., description="Overall investigation headline")
    situation: str = Field(..., description="Overview of the investigated KPI movement")
    primary_driver: str = Field(..., description="Identification and summary of the top-ranked explanatory driver")
    driver_breakdown: List[str] = Field(..., description="Bulleted narrative summaries of all ranked drivers")
    evidence_synthesis: str = Field(..., description="Cross-system synthesis of ERP, CRM, and Support signals")
    abstention_status: str = Field(..., description="Status of the confidence and abstention evaluation")
    executive_takeaway: str = Field(..., description="Summary takeaway for leadership")
    grounded_evidence_ids: List[str] = Field(..., description="All verified evidence IDs cited")

class AIExplanationResponse(BaseModel):
    investigation_id: str = Field(..., example="INV-EXEC-2026-NAE-001")
    persona: str = Field(..., example="CFO")
    explanation: ExecutiveExplanation
    metadata: AIResponseMetadata

class AIDriverExplanationResponse(BaseModel):
    investigation_id: str = Field(..., example="INV-EXEC-2026-NAE-001")
    driver_id: str = Field(..., example="atlanta_dc_stockout")
    persona: str = Field(..., example="CFO")
    explanation: DriverExplanation
    metadata: AIResponseMetadata
