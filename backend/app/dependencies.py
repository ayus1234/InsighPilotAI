"""
InsightPilot AI — Dependency Injection Providers
Instantiates and reuses singleton service instances across API requests.
"""

from functools import lru_cache
from analytics.data_loader import DataLoader
from backend.app.services.kpi_service import KPIService
from backend.app.services.investigation_service import InvestigationService
from backend.app.services.evidence_service import EvidenceService
from backend.app.services.recommendation_service import RecommendationService
from backend.app.services.simulation_service import SimulationService
from ai.service import AIService

@lru_cache(maxsize=1)
def get_data_loader() -> DataLoader:
    """Returns singleton instance of the typed DataLoader."""
    return DataLoader()

@lru_cache(maxsize=1)
def get_kpi_service() -> KPIService:
    """Returns singleton instance of the KPIService."""
    return KPIService(get_data_loader())

@lru_cache(maxsize=1)
def get_investigation_service() -> InvestigationService:
    """Returns singleton instance of the InvestigationService."""
    return InvestigationService(get_data_loader())

@lru_cache(maxsize=1)
def get_evidence_service() -> EvidenceService:
    """Returns singleton instance of the EvidenceService."""
    return EvidenceService(get_data_loader())

@lru_cache(maxsize=1)
def get_recommendation_service() -> RecommendationService:
    """Returns singleton instance of the RecommendationService."""
    return RecommendationService(get_data_loader())

@lru_cache(maxsize=1)
def get_simulation_service() -> SimulationService:
    """Returns singleton instance of the SimulationService."""
    return SimulationService(get_data_loader())

@lru_cache(maxsize=1)
def get_ai_service() -> AIService:
    """Returns singleton instance of the AIService."""
    return AIService()
