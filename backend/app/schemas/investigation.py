"""
InsightPilot AI — Investigation API Schemas
Models matching data/schemas/investigation_result.json for structured investigation responses.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class KPIBlock(BaseModel):
    id: str = Field(..., example="north_america_east_revenue")
    name: str = Field(..., example="North America East Revenue")
    current_value: float = Field(..., example=14200000.05)
    previous_value: float = Field(..., example=15430000.06)
    variance_amount: float = Field(..., example=-1230000.01)
    percent_change: float = Field(..., example=-7.97)
    materiality_status: str = Field(..., example="CRITICAL_NEGATIVE_VARIANCE")

class DriverResponse(BaseModel):
    driver_id: str = Field(..., example="atlanta_dc_stockout")
    driver_name: str = Field(..., example="Atlanta DC Stockout")
    contribution_pct: float = Field(..., example=43.2)
    impact_usd: float = Field(..., example=-550000.0)
    confidence_score: int = Field(..., example=94)
    rank: int = Field(..., example=1)
    evidence_ids: List[str] = Field(..., example=["EVID_ERP_ATL_STOCKOUT_001"])

class DriverListResponse(BaseModel):
    kpi_id: str = Field(..., example="north_america_east_revenue")
    total_drivers: int = Field(..., example=4)
    drivers: List[DriverResponse] = Field(...)

class EvidenceSummaryBlock(BaseModel):
    evidence_ids: List[str] = Field(...)
    source_count: int = Field(..., example=3)
    source_domains: List[str] = Field(..., example=["ERP", "CRM_SALES", "SUPPORT_MARKET_INTEL"])

class OverallConfidenceBlock(BaseModel):
    overall_confidence: int = Field(..., example=89)
    confidence_label: str = Field(..., example="HIGH")
    abstention: bool = Field(..., example=False)
    abstention_reason: Optional[str] = Field(None, example=None)

class LineageGraphBlock(BaseModel):
    kpi_node: str = Field(..., example="north_america_east_revenue")
    driver_nodes: List[str] = Field(...)
    evidence_nodes: List[str] = Field(...)

class InvestigationResponse(BaseModel):
    investigation_id: str = Field(..., example="INV-EXEC-2026-NAE-001")
    timestamp: str = Field(...)
    persona_id: str = Field(..., example="CFO")
    kpi: KPIBlock
    drivers: List[DriverResponse]
    evidence_summary: EvidenceSummaryBlock
    overall: OverallConfidenceBlock
    lineage_graph: LineageGraphBlock

class DecisionGraphNode(BaseModel):
    id: str = Field(..., example="drv-1")
    column: int = Field(..., example=2)
    column_title: str = Field(..., example="2. Causal Drivers")
    title: str = Field(..., example="Atlanta DC Stockout")
    node_type: str = Field(..., example="DRIVER")
    category: str = Field(..., example="Supply Chain")
    primary_metric: str = Field(..., example="43.2% Share")
    secondary_metric: Optional[str] = Field(None, example="-$550K Impact")
    confidence: int = Field(..., example=94)
    description: str = Field(...)
    status: str = Field(..., example="CRITICAL")
    evidence_id: Optional[str] = Field(None, example="EVID_ERP_ATL_STOCKOUT_001")
    linked_parents: List[str] = Field(default_factory=list)
    linked_children: List[str] = Field(default_factory=list)
    hash: Optional[str] = Field(None)

class DecisionGraphEdge(BaseModel):
    source: str = Field(..., example="kpi-1")
    target: str = Field(..., example="drv-1")
    relationship_type: str = Field(..., example="DECOMPOSED_TO")

class DecisionGraphResponse(BaseModel):
    kpi_id: str = Field(..., example="north_america_east_revenue")
    region: str = Field(..., example="NA-East")
    total_columns: int = Field(6, example=6)
    total_nodes_count: int = Field(..., example=12)
    total_edges_count: int = Field(..., example=15)
    nodes: List[DecisionGraphNode]
    edges: List[DecisionGraphEdge]
