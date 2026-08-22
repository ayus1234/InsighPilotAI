"""
InsightPilot AI — Confidence & Abstention Unit Tests
Tests confidence scoring, threshold banding, and low-confidence abstention gate behavior.
"""

import unittest
from analytics.confidence_engine import ConfidenceEngine

class TestConfidenceAbstention(unittest.TestCase):
    
    def setUp(self):
        self.engine = ConfidenceEngine(abstention_threshold=65)

    def test_high_confidence_scenario(self):
        drivers = [
            {"driver_id": "d1", "contribution_pct": 44.0, "confidence_score": 94},
            {"driver_id": "d2", "contribution_pct": 26.0, "confidence_score": 89},
            {"driver_id": "d3", "contribution_pct": 18.0, "confidence_score": 85},
            {"driver_id": "d4", "contribution_pct": 12.0, "confidence_score": 78}
        ]
        res = self.engine.calculate_overall_confidence(drivers)
        self.assertGreaterEqual(res["overall_confidence"], 80)
        self.assertEqual(res["confidence_label"], "HIGH")
        self.assertFalse(res["abstention"])
        self.assertIsNone(res["abstention_reason"])

    def test_low_confidence_abstention_scenario(self):
        # Ambiguous drivers with low individual confidence (<65)
        ambiguous_drivers = [
            {"driver_id": "inventory_var", "contribution_pct": 38.0, "confidence_score": 42},
            {"driver_id": "pricing_var", "contribution_pct": 34.0, "confidence_score": 40},
            {"driver_id": "orders_var", "contribution_pct": 28.0, "confidence_score": 41}
        ]
        res = self.engine.calculate_overall_confidence(ambiguous_drivers)
        self.assertLess(res["overall_confidence"], 65)
        self.assertEqual(res["confidence_label"], "LOW")
        self.assertTrue(res["abstention"])
        self.assertIn("No reliable primary driver identified", res["abstention_reason"])

    def test_synthetic_abstention_method(self):
        res = self.engine.evaluate_synthetic_low_confidence_scenario()
        self.assertTrue(res["abstention"])
        self.assertEqual(res["confidence_label"], "LOW")

if __name__ == "__main__":
    unittest.main()
