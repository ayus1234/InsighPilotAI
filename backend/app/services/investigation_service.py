"""
InsightPilot AI — Investigation Service Layer
Orchestrates deterministic root cause investigations and driver decomposition for API endpoints.
"""

from typing import Dict, Any, Optional
from analytics.data_loader import DataLoader
from analytics.investigation_engine import InvestigationEngine
from backend.app.schemas.investigation import (
    InvestigationResponse,
    DriverListResponse,
    DriverResponse,
    KPIBlock,
    EvidenceSummaryBlock,
    OverallConfidenceBlock,
    LineageGraphBlock
)
from backend.app.errors import KPINotFoundError

class InvestigationService:
    """Service layer delegating investigation logic to analytics.investigation_engine."""
    
    SUPPORTED_KPIS = {"north_america_east_revenue"}

    def __init__(self, data_loader: Optional[DataLoader] = None):
        self.loader = data_loader or DataLoader()
        self.investigation_engine = InvestigationEngine(self.loader)

    def run_investigation(
        self,
        kpi_id: str,
        region: str = "NA-East",
        prev_period_id: str = "2026-Q2",
        curr_period_id: str = "2026-Q3",
        persona_id: str = "CFO"
    ) -> InvestigationResponse:
        """Executes full deterministic investigation pipeline and formats Pydantic response."""
        if kpi_id not in self.SUPPORTED_KPIS:
            raise KPINotFoundError(kpi_id)

        raw_result = self.investigation_engine.run_investigation(
            kpi_id=kpi_id,
            region=region,
            prev_period_id=prev_period_id,
            curr_period_id=curr_period_id,
            persona_id=persona_id
        )

        return InvestigationResponse(
            investigation_id=raw_result["investigation_id"],
            timestamp=raw_result["timestamp"],
            persona_id=raw_result["persona_id"],
            kpi=KPIBlock(**raw_result["kpi"]),
            drivers=[DriverResponse(**d) for d in raw_result["drivers"]],
            evidence_summary=EvidenceSummaryBlock(**raw_result["evidence_summary"]),
            overall=OverallConfidenceBlock(**raw_result["overall"]),
            lineage_graph=LineageGraphBlock(**raw_result["lineage_graph"])
        )

    def get_drivers(
        self,
        kpi_id: str,
        region: str = "NA-East",
        prev_period_id: str = "2026-Q2",
        curr_period_id: str = "2026-Q3"
    ) -> DriverListResponse:
        """Retrieves and returns the ranked explanatory drivers list."""
        inv_res = self.run_investigation(kpi_id, region, prev_period_id, curr_period_id)
        return DriverListResponse(
            kpi_id=kpi_id,
            total_drivers=len(inv_res.drivers),
            drivers=inv_res.drivers
        )
