"""
InsightPilot AI — What-If Simulation API Schemas
Pydantic models matching data/schemas/simulation_contract.json.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class SimulationRequest(BaseModel):
    inventory_availability: float = Field(
        ...,
        example=0.90,
        description="Target inventory availability parameter (0.0 to 1.0 or 0% to 100%)"
    )

class SimulationRecoveryModel(BaseModel):
    revenue_recovery_usd: float = Field(..., example=421500.0)
    margin_recovery_pct: float = Field(..., example=1.4)
    recovery_timeframe_days: int = Field(..., example=14)

class SimulationConfidenceModel(BaseModel):
    score: int = Field(..., example=91)
    label: str = Field(..., example="HIGH")

class SimulationResponse(BaseModel):
    simulation_id: str = Field(..., example="SIM-RUN-2026-ATL-90")
    simulation_name: str = Field(...)
    input_variable: str = Field(..., example="inventory_availability")
    target_facility_or_scope: str = Field(..., example="Atlanta DC (Atlanta-DC-01) / NA-East")
    baseline_value: float = Field(..., example=72.4)
    scenario_value: float = Field(..., example=90.0)
    availability_delta: float = Field(..., example=17.6)
    baseline_revenue_usd: float = Field(..., example=14200000.05)
    projected_metric: str = Field(..., example="north_america_east_revenue")
    projected_value: float = Field(..., example=14621500.05)
    estimated_recovery: SimulationRecoveryModel
    assumptions: List[str] = Field(...)
    confidence: SimulationConfidenceModel

class SimulationBaselineResponse(BaseModel):
    baseline_availability_pct: float = Field(..., example=72.4)
    baseline_availability_ratio: float = Field(..., example=0.724)
    baseline_revenue_usd: float = Field(..., example=14200000.05)
