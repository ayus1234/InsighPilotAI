"""
InsightPilot AI — API Routes Package
"""

from backend.app.routes.health import router as health_router
from backend.app.routes.kpis import router as kpis_router
from backend.app.routes.investigations import router as investigations_router
from backend.app.routes.evidence import router as evidence_router
from backend.app.routes.ai import router as ai_router

__all__ = [
    "health_router",
    "kpis_router",
    "investigations_router",
    "evidence_router",
    "ai_router",
]
