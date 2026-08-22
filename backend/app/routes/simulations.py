"""
InsightPilot AI — What-If Simulation Routes
Exposes deterministic what-if scenario simulations for operational parameter adjustments.
"""

from fastapi import APIRouter, Depends, Query, status
from backend.app.schemas.simulation import (
    SimulationRequest,
    SimulationResponse,
    SimulationBaselineResponse
)
from backend.app.schemas.common import ErrorResponse
from backend.app.services.simulation_service import SimulationService
from backend.app.dependencies import get_simulation_service

router = APIRouter(prefix="/simulations", tags=["What-If Simulations"])

@router.get(
    "/baseline",
    response_model=SimulationBaselineResponse,
    summary="Get simulation baseline state",
    description="Returns the empirical baseline inventory availability and current revenue before intervention."
)
async def get_simulation_baseline(
    region: str = Query("NA-East", description="Target geographical region"),
    simulation_service: SimulationService = Depends(get_simulation_service)
) -> SimulationBaselineResponse:
    """Returns empirical baseline state for simulation comparison."""
    return simulation_service.get_baseline(region=region)

@router.post(
    "/inventory-availability",
    response_model=SimulationResponse,
    responses={400: {"model": ErrorResponse, "description": "Invalid simulation parameter"}},
    summary="Simulate inventory availability recovery",
    description="Calculates deterministic revenue and margin recovery projections under a target inventory availability slider setting."
)
async def simulate_inventory_availability(
    request: SimulationRequest,
    region: str = Query("NA-East", description="Target geographical region"),
    simulation_service: SimulationService = Depends(get_simulation_service)
) -> SimulationResponse:
    """Runs deterministic simulation on inventory availability slider parameter."""
    return simulation_service.simulate_availability(
        inventory_availability=request.inventory_availability,
        region=region
    )
