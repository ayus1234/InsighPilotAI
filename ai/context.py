"""
InsightPilot AI — Grounded Context Builder
Converts deterministic investigation results into a clean, compact, structured context for Gemini prompts.
"""

from typing import Dict, Any, List, Optional
from ai.schemas.persona import PersonaProfile, resolve_persona

class GroundedContextBuilder:
    """Builds authoritative, compact context representations from deterministic outputs."""

    @staticmethod
    def build_investigation_context(
        investigation_result: Dict[str, Any],
        evidence_items: List[Dict[str, Any]],
        persona: str = "CFO"
    ) -> Dict[str, Any]:
        """Constructs the canonical grounded context payload."""
        persona_profile = resolve_persona(persona)

        kpi_raw = investigation_result.get("kpi", {})
        kpi_block = {
            "id": kpi_raw.get("id"),
            "name": kpi_raw.get("name"),
            "current_value": kpi_raw.get("current_value"),
            "previous_value": kpi_raw.get("previous_value"),
            "variance_amount": kpi_raw.get("variance_amount"),
            "percent_change": kpi_raw.get("percent_change"),
            "materiality_status": kpi_raw.get("materiality_status")
        }

        drivers_list = []
        for d in investigation_result.get("drivers", []):
            drivers_list.append({
                "driver_id": d.get("driver_id"),
                "driver_name": d.get("driver_name"),
                "rank": d.get("rank"),
                "contribution_pct": d.get("contribution_pct"),
                "impact_usd": d.get("impact_usd"),
                "confidence_score": d.get("confidence_score"),
                "evidence_ids": d.get("evidence_ids", [])
            })

        evidence_list = []
        for ev in evidence_items:
            evidence_list.append({
                "evidence_id": ev.get("evidence_id"),
                "supports_driver": ev.get("supports_driver"),
                "source_system": ev.get("source"),
                "source_domain": ev.get("source_domain"),
                "source_record_id": ev.get("source_record_id"),
                "timestamp": ev.get("timestamp"),
                "freshness_status": ev.get("freshness", {}).get("status"),
                "analytical_method": ev.get("analytical_method"),
                "finding_summary": ev.get("finding_summary"),
                "confidence_score": ev.get("confidence", {}).get("score")
            })

        overall_raw = investigation_result.get("overall", {})
        overall_block = {
            "score": overall_raw.get("overall_confidence", 89),
            "label": overall_raw.get("confidence_label", "HIGH"),
            "abstention": overall_raw.get("abstention", False),
            "abstention_reason": overall_raw.get("abstention_reason")
        }

        return {
            "investigation_id": investigation_result.get("investigation_id", "INV-EXEC-2026-NAE-001"),
            "kpi": kpi_block,
            "drivers": drivers_list,
            "evidence": evidence_list,
            "overall_confidence": overall_block,
            "persona": {
                "persona_name": persona_profile.persona.value,
                "role_title": persona_profile.role_title,
                "focus_areas": persona_profile.focus_areas,
                "tone": persona_profile.tone
            }
        }
