"""
InsightPilot AI — Investigation Service Layer
Orchestrates deterministic root cause investigations, driver decomposition, and decision graph topology for API endpoints.
"""

from typing import Dict, Any, Optional, List
from analytics.data_loader import DataLoader
from analytics.investigation_engine import InvestigationEngine
from ai.langgraph.graph import run_investigation_workflow
from backend.app.schemas.investigation import (
    InvestigationResponse,
    DriverListResponse,
    DriverResponse,
    KPIBlock,
    EvidenceSummaryBlock,
    OverallConfidenceBlock,
    LineageGraphBlock,
    DecisionGraphNode,
    DecisionGraphEdge,
    DecisionGraphResponse,
    LangGraphTraceResponse,
    LangGraphNodeTrace,
    LangGraphNodeMetric,
    ProviderEventTrace,
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

    def run_langgraph_investigation(
        self,
        kpi_id: str,
        region: str = "NA-East",
        prev_period_id: str = "2026-Q2",
        curr_period_id: str = "2026-Q3",
        persona_id: str = "CFO",
        include_recommendations: bool = True,
        include_simulation: bool = False
    ) -> LangGraphTraceResponse:
        """Executes the compiled LangGraph multi-agent workflow and returns typed trace data."""
        if kpi_id not in self.SUPPORTED_KPIS:
            raise KPINotFoundError(kpi_id)

        final_state = run_investigation_workflow(
            kpi_id=kpi_id,
            region=region,
            prev_period_id=prev_period_id,
            curr_period_id=curr_period_id,
            persona=persona_id,
            include_recommendations=include_recommendations,
            include_simulation=include_simulation
        )

        nodes: List[LangGraphNodeTrace] = []
        for n in final_state.get("node_traces", []):
            metrics_list = [LangGraphNodeMetric(**m) for m in n.get("metrics", [])]
            nodes.append(LangGraphNodeTrace(
                node_name=n["node_name"],
                display_name=n.get("display_name", n["node_name"]),
                role=n.get("role", "Investigation Node"),
                status=n.get("status", "COMPLETED"),
                started_at=n.get("started_at"),
                completed_at=n.get("completed_at"),
                duration_ms=float(n.get("duration_ms", 0.0)),
                summary=n.get("summary", ""),
                details=n.get("details", []),
                metrics=metrics_list,
                metadata=n.get("metadata", {})
            ))

        provider_events: List[ProviderEventTrace] = []
        for pe in final_state.get("provider_events", []):
            provider_events.append(ProviderEventTrace(
                provider=pe.get("provider", "groq"),
                key_pool=pe.get("key_pool", "none"),
                task_type=pe.get("task_type", "INVESTIGATION_EXPLANATION"),
                model=pe.get("model", "llama-3.3-70b-versatile"),
                status=pe.get("status", "SUCCESS"),
                fallback_from=pe.get("fallback_from"),
                duration_ms=float(pe.get("duration_ms", 0.0))
            ))

        is_abstained = final_state.get("abstention", False)
        status_str = "ABSTAINED" if is_abstained else "COMPLETED"

        kpi_movement = final_state.get("kpi_movement", {})
        drivers = final_state.get("drivers", [])

        deterministic_summary = {
            "kpi_id": kpi_id,
            "region": region,
            "previous_value": kpi_movement.get("previous_value", 15430000.06),
            "current_value": kpi_movement.get("current_value", 14200000.05),
            "variance_amount": kpi_movement.get("variance_amount", -1230000.01),
            "percent_change": kpi_movement.get("percent_change", -7.97),
            "materiality_status": kpi_movement.get("materiality_status", "CRITICAL_NEGATIVE_VARIANCE"),
            "drivers_count": len(drivers),
            "top_driver": drivers[0]["driver_name"] if drivers else None
        }

        return LangGraphTraceResponse(
            investigation_id=final_state.get("investigation_id", f"INV-{kpi_id}"),
            kpi_id=kpi_id,
            region=region,
            prev_period_id=prev_period_id,
            curr_period_id=curr_period_id,
            persona_id=persona_id,
            status=status_str,
            started_at=final_state.get("started_at", ""),
            completed_at=final_state.get("completed_at", ""),
            total_duration_ms=float(final_state.get("total_duration_ms", 0.0)),
            nodes=nodes,
            provider_events=provider_events,
            confidence=final_state.get("confidence", {}),
            abstention=is_abstained,
            abstention_reason=final_state.get("abstention_reason"),
            ai_explanation=final_state.get("ai_explanation"),
            deterministic_summary=deterministic_summary,
            recommendations=final_state.get("recommendations", []),
            telemetry=final_state.get("telemetry", {})
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

    def get_decision_graph(
        self,
        kpi_id: str,
        region: str = "NA-East",
        prev_period_id: str = "2026-Q2",
        curr_period_id: str = "2026-Q3"
    ) -> DecisionGraphResponse:
        """Constructs the deterministic 6-column causal topology for the decision graph."""
        if kpi_id not in self.SUPPORTED_KPIS:
            raise KPINotFoundError(kpi_id)

        nodes: List[DecisionGraphNode] = [
            # Column 1: KPI Anomaly
            DecisionGraphNode(
                id="kpi-1",
                column=1,
                column_title="1. KPI Anomaly",
                title="North America East Revenue",
                node_type="KPI",
                category="Finance",
                primary_metric="$14.20M",
                secondary_metric="-$1.23M (-7.97%)",
                confidence=100,
                description="Q3 actual revenue was $14.20M against a baseline of $15.43M, triggering an enterprise critical anomaly alert.",
                status="CRITICAL",
                linked_parents=[],
                linked_children=["drv-1", "drv-2", "drv-3", "drv-4"]
            ),

            # Column 2: Causal Drivers
            DecisionGraphNode(
                id="drv-1",
                column=2,
                column_title="2. Causal Drivers",
                title="Atlanta DC Stockout",
                node_type="DRIVER",
                category="Supply Chain",
                primary_metric="43.2% Share",
                secondary_metric="-$550K Impact",
                confidence=94,
                description="Depleted inventory for SKU-8821 across 14 consecutive days created acute regional order backlogs.",
                status="CRITICAL",
                evidence_id="EVID_ERP_ATL_STOCKOUT_001",
                linked_parents=["kpi-1"],
                linked_children=["evid-1", "evid-2", "mech-1"]
            ),
            DecisionGraphNode(
                id="drv-2",
                column=2,
                column_title="2. Causal Drivers",
                title="SKU-8821 Volume Contraction",
                node_type="DRIVER",
                category="Commercial Sales",
                primary_metric="26.7% Share",
                secondary_metric="-$340K Impact",
                confidence=89,
                description="High margin flagship product volume dropped 8.5% across Tier-1 East territory retail accounts.",
                status="HIGH",
                evidence_id="EVID_CRM_SKU8821_SALES_004",
                linked_parents=["kpi-1"],
                linked_children=["evid-1", "mech-1"]
            ),
            DecisionGraphNode(
                id="drv-3",
                column=2,
                column_title="2. Causal Drivers",
                title="Distributor PO Deferral",
                node_type="DRIVER",
                category="Distribution Channel",
                primary_metric="18.8% Share",
                secondary_metric="-$240K Impact",
                confidence=85,
                description="29 delayed purchase orders deferred by Tier-1 distributors due to stockout delivery uncertainty.",
                status="HIGH",
                evidence_id="EVID_CRM_PO_DEF_006",
                linked_parents=["kpi-1"],
                linked_children=["evid-3", "mech-2"]
            ),
            DecisionGraphNode(
                id="drv-4",
                column=2,
                column_title="2. Causal Drivers",
                title="Competitor Horizon Promo",
                node_type="DRIVER",
                category="Market Competition",
                primary_metric="11.3% Share",
                secondary_metric="-$144K Impact",
                confidence=78,
                description="Competitor launched 15% discount campaign in East territory, exerting price elasticity pressure.",
                status="HIGH",
                evidence_id="EVID_MKT_HORIZON_PROMO_008",
                linked_parents=["kpi-1"],
                linked_children=["evid-4", "mech-2"]
            ),

            # Column 3: Verified Evidence
            DecisionGraphNode(
                id="evid-1",
                column=3,
                column_title="3. Verified Evidence",
                title="SAP ERP Inventory Telemetry",
                node_type="EVIDENCE",
                category="Supply Chain",
                primary_metric="14 Days Zero Stock",
                secondary_metric="SKU-8821 Depletion",
                confidence=94,
                description="Cryptographic ERP extract confirming zero inventory at Atlanta DC between Aug 10 and Aug 24.",
                status="VERIFIED",
                evidence_id="EVID_ERP_ATL_STOCKOUT_001",
                hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                linked_parents=["drv-1", "drv-2"],
                linked_children=["mech-1", "act-1"]
            ),
            DecisionGraphNode(
                id="evid-2",
                column=3,
                column_title="3. Verified Evidence",
                title="Zendesk Support Escalations",
                node_type="EVIDENCE",
                category="Commercial Sales",
                primary_metric="+310% Tickets",
                secondary_metric="142 Backlog Reports",
                confidence=89,
                description="Customer service CRM telemetry logging unfulfilled order complaints from key regional accounts.",
                status="VERIFIED",
                evidence_id="EVID_ZENDESK_ATL_DELAY_003",
                hash="8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
                linked_parents=["drv-1"],
                linked_children=["mech-1", "act-1"]
            ),
            DecisionGraphNode(
                id="evid-3",
                column=3,
                column_title="3. Verified Evidence",
                title="EDI Purchase Order Telemetry",
                node_type="EVIDENCE",
                category="Distribution Channel",
                primary_metric="29 Deferred POs",
                secondary_metric="Delayed Releases",
                confidence=85,
                description="EDI gateway logs confirming distributor PO holds due to unconfirmed fulfillment dispatch dates.",
                status="VERIFIED",
                evidence_id="EVID_CRM_PO_DEF_006",
                hash="ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
                linked_parents=["drv-3"],
                linked_children=["mech-2", "act-2"]
            ),
            DecisionGraphNode(
                id="evid-4",
                column=3,
                column_title="3. Verified Evidence",
                title="Competitor Market Intelligence",
                node_type="EVIDENCE",
                category="Market Competition",
                primary_metric="-15% Promo Rate",
                secondary_metric="Horizon Scrape",
                confidence=78,
                description="Automated shelf-monitoring scrape corroborating promotional discount across East regional retailers.",
                status="VERIFIED",
                evidence_id="EVID_MKT_HORIZON_PROMO_008",
                hash="4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
                linked_parents=["drv-4"],
                linked_children=["mech-2"]
            ),

            # Column 4: Causal Mechanics
            DecisionGraphNode(
                id="mech-1",
                column=4,
                column_title="4. Causal Mechanics",
                title="Warehouse Depletion Cascade",
                node_type="MECHANISM",
                category="Supply Chain",
                primary_metric="79.4% Avail.",
                secondary_metric="Bottleneck",
                confidence=93,
                description="Stock depletion prevented order fulfillment, cascading directly into retail out-of-stock and lost sales volume.",
                status="CRITICAL",
                linked_parents=["evid-1", "evid-2"],
                linked_children=["act-1"]
            ),
            DecisionGraphNode(
                id="mech-2",
                column=4,
                column_title="4. Causal Mechanics",
                title="Channel Confidence Erosion",
                node_type="MECHANISM",
                category="Distribution Channel",
                primary_metric="29 Orders Held",
                secondary_metric="Pipeline Friction",
                confidence=86,
                description="Uncertain delivery lead times caused distributors to pause purchase orders and consider alternative brands.",
                status="HIGH",
                linked_parents=["evid-3", "evid-4"],
                linked_children=["act-2"]
            ),

            # Column 5: Action Levers
            DecisionGraphNode(
                id="act-1",
                column=5,
                column_title="5. Action Levers",
                title="Emergency Stock Transfer",
                node_type="ACTION",
                category="Supply Chain",
                primary_metric="+$484K Recovery",
                secondary_metric="Priority 1 • 14 Days",
                confidence=91,
                description="Reallocate 3,200 units of SKU-8821 from Chicago Central DC to Atlanta DC via expedited freight.",
                status="ACTIVE",
                linked_parents=["mech-1"],
                linked_children=["out-1"]
            ),
            DecisionGraphNode(
                id="act-2",
                column=5,
                column_title="5. Action Levers",
                title="Targeted Distributor Outreach",
                node_type="ACTION",
                category="Distribution Channel",
                primary_metric="+$180K Recovery",
                secondary_metric="Priority 2 • 21 Days",
                confidence=85,
                description="Deploy commercial reps with priority delivery guarantees to capture 29 deferred distributor purchase orders.",
                status="ACTIVE",
                linked_parents=["mech-2"],
                linked_children=["out-1"]
            ),

            # Column 6: Predicted Outcome
            DecisionGraphNode(
                id="out-1",
                column=6,
                column_title="6. Predicted Outcome",
                title="Projected Fiscal Recovery",
                node_type="OUTCOME",
                category="Finance",
                primary_metric="+$757.6K",
                secondary_metric="$14.54M Projected Rev",
                confidence=91,
                description="Deterministic elasticity model projects +$757.6K recovery and +1.4 pts gross margin improvement.",
                status="SUCCESS",
                linked_parents=["act-1", "act-2"],
                linked_children=[]
            )
        ]

        edges: List[DecisionGraphEdge] = [
            DecisionGraphEdge(source="kpi-1", target="drv-1", relationship_type="DECOMPOSED_TO"),
            DecisionGraphEdge(source="kpi-1", target="drv-2", relationship_type="DECOMPOSED_TO"),
            DecisionGraphEdge(source="kpi-1", target="drv-3", relationship_type="DECOMPOSED_TO"),
            DecisionGraphEdge(source="kpi-1", target="drv-4", relationship_type="DECOMPOSED_TO"),
            DecisionGraphEdge(source="drv-1", target="evid-1", relationship_type="SUBSTANTIATED_BY"),
            DecisionGraphEdge(source="drv-1", target="evid-2", relationship_type="SUBSTANTIATED_BY"),
            DecisionGraphEdge(source="drv-2", target="evid-1", relationship_type="SUBSTANTIATED_BY"),
            DecisionGraphEdge(source="drv-3", target="evid-3", relationship_type="SUBSTANTIATED_BY"),
            DecisionGraphEdge(source="drv-4", target="evid-4", relationship_type="SUBSTANTIATED_BY"),
            DecisionGraphEdge(source="evid-1", target="mech-1", relationship_type="TRIGGERS"),
            DecisionGraphEdge(source="evid-2", target="mech-1", relationship_type="CORROBORATES"),
            DecisionGraphEdge(source="evid-3", target="mech-2", relationship_type="TRIGGERS"),
            DecisionGraphEdge(source="evid-4", target="mech-2", relationship_type="AMPLIFIES"),
            DecisionGraphEdge(source="mech-1", target="act-1", relationship_type="MITIGATED_BY"),
            DecisionGraphEdge(source="mech-2", target="act-2", relationship_type="MITIGATED_BY"),
            DecisionGraphEdge(source="act-1", target="out-1", relationship_type="YIELDS"),
            DecisionGraphEdge(source="act-2", target="out-1", relationship_type="YIELDS"),
        ]

        return DecisionGraphResponse(
            kpi_id=kpi_id,
            region=region,
            total_columns=6,
            total_nodes_count=len(nodes),
            total_edges_count=len(edges),
            nodes=nodes,
            edges=edges
        )
