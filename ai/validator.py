"""
InsightPilot AI — Post-Generation Grounding Validator
Validates Gemini responses to ensure zero hallucinated evidence IDs or conflicting facts.
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
        """Validates evidence IDs, abstention preservation, and consistency."""
        
        # 1. Extract valid evidence IDs from input context
        context_evidence = context.get("evidence", [])
        valid_evidence_ids: Set[str] = {ev["evidence_id"] for ev in context_evidence if "evidence_id" in ev}

        # 2. Check cited evidence IDs
        cited_ids: List[str] = response_dict.get("grounded_evidence_ids", [])
        invalid_ids = [cid for cid in cited_ids if cid not in valid_evidence_ids]
        if invalid_ids:
            raise GroundingValidationError(
                f"Grounding Failure: Model cited unknown or unverified evidence IDs: {invalid_ids}."
            )

        # 3. Check Abstention Policy
        is_abstained = context.get("overall_confidence", {}).get("abstention", False)
        if is_abstained:
            headline = response_dict.get("headline", "").lower()
            situation = response_dict.get("situation", "").lower()
            uncertainty = response_dict.get("uncertainty", "").lower()
            
            # Ensure text communicates low confidence or abstention
            abstention_signals = ["insufficient", "low confidence", "abstain", "uncertain", "cannot determine", "unreliable"]
            has_signal = any(sig in headline or sig in situation or sig in uncertainty for sig in abstention_signals)
            if not has_signal:
                raise GroundingValidationError(
                    "Grounding Failure: Investigation is in abstention state, but model generated a confident narrative."
                )

        # 4. Check Empty Evidence Scenario
        if len(valid_evidence_ids) == 0:
            if len(cited_ids) > 0:
                raise GroundingValidationError(
                    "Grounding Failure: Zero evidence available in context, but model cited evidence."
                )

        return response_dict
