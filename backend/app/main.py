"""
InsightPilot AI — FastAPI Application Entry Point
Accenture Innovation Challenge 2026 — Track 3: BusinessIntelligence.ai
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import settings
from backend.app.errors import register_error_handlers
from backend.app.routes.health import router as health_router
from backend.app.routes.kpis import router as kpis_router
from backend.app.routes.investigations import router as investigations_router
from backend.app.routes.evidence import router as evidence_router

def create_app() -> FastAPI:
    """Factory creating and configuring the FastAPI application."""
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description=(
            "REST API exposing the deterministic KPI calculations, multi-factor driver analyses, "
            "and cryptographic evidence lineage graphs of InsightPilot AI."
        ),
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json"
    )

    # Configure CORS Middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    # Register Error Handlers
    register_error_handlers(app)

    # Register Routes
    app.include_router(health_router)
    app.include_router(kpis_router, prefix=settings.API_PREFIX)
    app.include_router(investigations_router, prefix=settings.API_PREFIX)
    app.include_router(evidence_router, prefix=settings.API_PREFIX)

    return app

app = create_app()
