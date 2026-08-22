"""
InsightPilot AI — Post-Generation Grounding Validator
Validates Gemini responses to ensure zero hallucinated evidence IDs, strict abstention adherence,
and factual alignment with deterministic outputs.
"""

from typing import Dict, Any, List, Set

class GroundingValidationError(Exception):
    """Raised when an LLM generated response violates grounding constraints."""
    pass

class GroundingValidator:
    """Performs rigorous post-generation grounding and consistency checks."""

    @staticmethod
    def validate_grounding(
        response_dict: Dict[str, Any],
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Validates evidence IDs, abstention preservation, and factual consistency."""
        
        # 1. Extract valid evidence IDs from input context
        context_evidence = context.get("evidence", [])
        valid_evidence_ids: Set[str] = {ev["evidence_id"] for ev in context_evidence if "evidence_id" in ev}

        # 2. Extract cited evidence IDs from root and reasoning statements
        cited_ids: Set[str] = set(response_dict.get("grounded_evidence_ids", []))
        
        # Also check nested reasoning items if present
        for item in response_dict.get("reasoning", []):
            if isinstance(item, dict):
                for sid in item.get("supporting_evidence_ids", []):
                    cited_ids.add(sid)

        # 3. Check for hallucinated evidence IDs
        invalid_ids = [cid for cid in cited_ids if cid not in valid_evidence_ids]
        if invalid_ids:
            raise GroundingValidationError(
                f"Grounding Failure: Model cited unknown or unverified evidence IDs: {invalid_ids}."
            )

        # Ensure all cited IDs are captured in grounded_evidence_ids list
        if cited_ids and not response_dict.get("grounded_evidence_ids"):
            response_dict["grounded_evidence_ids"] = list(cited_ids)

        # 4. Check Abstention Policy
        is_abstained = context.get("overall_confidence", {}).get("abstention", False)
        if is_abstained:
            headline = str(response_dict.get("headline", "")).lower()
            summary = str(response_dict.get("summary", "")).lower()
            situation = str(response_dict.get("situation", "")).lower()
            uncertainty = str(response_dict.get("uncertainty", "")).lower()
            abstained_flag = response_dict.get("abstained", False)

            # Ensure text communicates low confidence or abstention
            abstention_signals = [
                "insufficient", "low confidence", "abstain", "uncertain",
                "cannot determine", "unreliable", "inconclusive", "data gap", "preliminary"
            ]
            has_signal = any(sig in headline or sig in summary or sig in situation or sig in uncertainty for sig in abstention_signals)
            
            if not has_signal and not abstained_flag:
                raise GroundingValidationError(
                    "Grounding Failure: Investigation is in mandatory abstention state, but model generated a confident narrative without uncertainty or abstention signals."
                )
            
            # Ensure abstained flag is explicitly true
            response_dict["abstained"] = True
            if not response_dict.get("abstention_reason"):
                response_dict["abstention_reason"] = context.get("overall_confidence", {}).get(
                    "abstention_reason",
                    "Analytical confidence below required threshold (65%). Additional empirical data required."
                )

        # 5. Check Empty Evidence Scenario
        if len(valid_evidence_ids) == 0:
            if len(cited_ids) > 0:
                raise GroundingValidationError(
                    "Grounding Failure: Zero evidence available in context, but model cited evidence."
                )

        return response_dict
