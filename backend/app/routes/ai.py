"""
InsightPilot AI — AI Reasoning Routes
Exposes grounded Gemini executive narrative and driver explanation endpoints.
"""

from typing import Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, Depends, Path, Query, status
from backend.app.schemas.common import ErrorResponse
from backend.app.services.investigation_service import InvestigationService
from backend.app.services.evidence_service import EvidenceService
from backend.app.dependencies import get_investigation_service, get_evidence_service, get_ai_service
from backend.app.errors import (
    KPINotFoundError,
    InvalidPersonaAPIError,
    AIServiceUnavailableAPIError,
    AIGroundingAPIError
)
from ai.service import AIService, AIServiceUnavailableError, AIGroundingError
from ai.schemas.explanation import AIExplanationResponse, AIDriverExplanationResponse
from ai.schemas.persona import resolve_persona

router = APIRouter(prefix="/ai", tags=["AI Reasoning"])

class AIExplanationRequest(BaseModel):
    persona: str = Field("CFO", example="CFO", description="Target executive persona ('CFO' or 'REGIONAL_SALES_MANAGER')")

@router.post(
    "/investigations/{kpi_id}/explanation",
    response_model=AIExplanationResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Invalid persona or request parameters"},
        404: {"model": ErrorResponse, "description": "KPI not found"},
        422: {"model": ErrorResponse, "description": "AI grounding validation failed"},
        503: {"model": ErrorResponse, "description": "AI service unavailable / unconfigured"}
    },
    summary="Generate grounded executive explanation",
    description="Uses Gemini to synthesize deterministic investigation results into an executive-level narrative tailored to the requested persona."
)
async def generate_executive_explanation(
    kpi_id: str = Path(..., description="Target KPI identifier (e.g. north_america_east_revenue)"),
    request: AIExplanationRequest = AIExplanationRequest(),
    region: str = Query("NA-East", description="Target geographical region"),
    prev_period_id: str = Query("2026-Q2", description="Baseline comparison fiscal period"),
    curr_period_id: str = Query("2026-Q3", description="Current target fiscal period"),
    investigation_service: InvestigationService = Depends(get_investigation_service),
    evidence_service: EvidenceService = Depends(get_evidence_service),
    ai_service: AIService = Depends(get_ai_service)
) -> AIExplanationResponse:
    """Generates a grounded executive explanation for the specified KPI."""
    # 1. Validate Persona
    try:
        persona_profile = resolve_persona(request.persona)
    except ValueError as ve:
        raise InvalidPersonaAPIError(request.persona)

    # 2. Retrieve Deterministic Investigation Output
    inv_response = investigation_service.run_investigation(
        kpi_id=kpi_id,
        region=region,
        prev_period_id=prev_period_id,
        curr_period_id=curr_period_id,
        persona_id=persona_profile.persona.value
    )
    inv_dict = inv_response.model_dump()

    # 3. Retrieve Deterministic Evidence Output
    ev_response = evidence_service.get_investigation_evidence(kpi_id=kpi_id, region=region)
    ev_list = [e.model_dump() for e in ev_response.evidence]

    # 4. Generate Grounded AI Explanation
    try:
        ai_resp = ai_service.generate_executive_explanation(
            investigation_result=inv_dict,
            evidence_items=ev_list,
            persona=persona_profile.persona.value
        )
        return ai_resp
    except AIServiceUnavailableError as sue:
        raise AIServiceUnavailableAPIError(str(sue))
    except AIGroundingError as ge:
        raise AIGroundingAPIError(str(ge))

@router.post(
    "/investigations/{kpi_id}/drivers/{driver_id}/explanation",
    response_model=AIDriverExplanationResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Invalid persona or request parameters"},
        404: {"model": ErrorResponse, "description": "KPI or driver not found"},
        422: {"model": ErrorResponse, "description": "AI grounding validation failed"},
        503: {"model": ErrorResponse, "description": "AI service unavailable / unconfigured"}
    },
    summary="Generate grounded driver explanation",
    description="Uses Gemini to generate an in-depth explanation of a specific ranked driver and its supporting evidence."
)
async def generate_driver_explanation(
    kpi_id: str = Path(..., description="Target KPI identifier (e.g. north_america_east_revenue)"),
    driver_id: str = Path(..., description="Target driver identifier (e.g. atlanta_dc_stockout)"),
    request: AIExplanationRequest = AIExplanationRequest(),
    region: str = Query("NA-East", description="Target geographical region"),
    prev_period_id: str = Query("2026-Q2", description="Baseline comparison fiscal period"),
    curr_period_id: str = Query("2026-Q3", description="Current target fiscal period"),
    investigation_service: InvestigationService = Depends(get_investigation_service),
    evidence_service: EvidenceService = Depends(get_evidence_service),
    ai_service: AIService = Depends(get_ai_service)
) -> AIDriverExplanationResponse:
    """Generates a grounded driver-specific explanation."""
    try:
        persona_profile = resolve_persona(request.persona)
    except ValueError:
        raise InvalidPersonaAPIError(request.persona)

    inv_response = investigation_service.run_investigation(
        kpi_id=kpi_id,
        region=region,
        prev_period_id=prev_period_id,
        curr_period_id=curr_period_id,
        persona_id=persona_profile.persona.value
    )
    inv_dict = inv_response.model_dump()

    ev_response = evidence_service.get_investigation_evidence(kpi_id=kpi_id, region=region)
    ev_list = [e.model_dump() for e in ev_response.evidence]

    try:
        ai_resp = ai_service.generate_driver_explanation(
            investigation_result=inv_dict,
            evidence_items=ev_list,
            driver_id=driver_id,
            persona=persona_profile.persona.value
        )
        return ai_resp
    except AIServiceUnavailableError as sue:
        raise AIServiceUnavailableAPIError(str(sue))
    except AIGroundingError as ge:
        raise AIGroundingAPIError(str(ge))
