"""
InsightPilot AI — Confidence & Abstention Engine
Calculates deterministic confidence scoring and evaluates mandatory abstention gates.
"""

from typing import List, Dict, Any, Optional
from analytics.config import ABSTENTION_CONFIDENCE_THRESHOLD

class ConfidenceEngine:
    """Calculates deterministic confidence scores and evaluates abstention boundaries."""
    
    def __init__(self, abstention_threshold: int = ABSTENTION_CONFIDENCE_THRESHOLD):
        self.abstention_threshold = abstention_threshold

    def calculate_overall_confidence(self, drivers: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculates weighted overall confidence from driver scores and contribution weights."""
        if not drivers:
            return {
                "overall_confidence": 0,
                "confidence_label": "LOW",
                "abstention": True,
                "abstention_reason": "No drivers evaluated. Insufficient analytical data."
            }
            
        total_weight = sum(d.get("contribution_pct", 0.0) for d in drivers)
        if total_weight == 0:
            total_weight = 1.0
            
        weighted_score_sum = sum(
            d.get("confidence_score", 50) * (d.get("contribution_pct", 0.0) / total_weight)
            for d in drivers
        )
        
        overall_score = int(round(weighted_score_sum))
        
        # Label classification
        if overall_score >= 80:
            label = "HIGH"
        elif overall_score >= 65:
            label = "MEDIUM"
        else:
            label = "LOW"
            
        abstention_required = overall_score < self.abstention_threshold
        abstention_reason = (
            "No reliable primary driver identified. Additional data required."
            if abstention_required else None
        )
        
        return {
            "overall_confidence": overall_score,
            "confidence_label": label,
            "abstention": abstention_required,
            "abstention_reason": abstention_reason
        }

    def evaluate_synthetic_low_confidence_scenario(self) -> Dict[str, Any]:
        """Simulates a low-confidence scenario to test abstention behavior."""
        ambiguous_drivers = [
            {"driver_id": "inventory_var", "contribution_pct": 38.0, "confidence_score": 42},
            {"driver_id": "pricing_var", "contribution_pct": 34.0, "confidence_score": 40},
            {"driver_id": "orders_var", "contribution_pct": 28.0, "confidence_score": 41}
        ]
        return self.calculate_overall_confidence(ambiguous_drivers)
