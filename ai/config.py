"""
InsightPilot AI — AI Layer Configuration
Manages Gemini API credentials, model parameters, and operational constraints.
"""

import os
from dotenv import load_dotenv

load_dotenv()

class AIConfig:
    """Configuration settings for the Gemini reasoning layer."""
    API_KEY: str = os.getenv("GEMINI_API_KEY", "").strip()
    MODEL_NAME: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()
    TEMPERATURE: float = float(os.getenv("GEMINI_TEMPERATURE", "0.1"))
    TIMEOUT_SECONDS: int = int(os.getenv("GEMINI_TIMEOUT_SECONDS", "30"))
    MAX_OUTPUT_TOKENS: int = int(os.getenv("GEMINI_MAX_TOKENS", "2048"))

    @classmethod
    def is_configured(cls) -> bool:
        """Returns True if a valid non-empty API key is present."""
        return bool(cls.API_KEY)

ai_config = AIConfig()
