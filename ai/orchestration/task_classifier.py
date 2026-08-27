"""
InsightPilot AI — AI Task Classifier
Maps task types to primary and fallback providers and required model capabilities.
"""

from typing import Dict, Any, Optional, Tuple, List
from ai.providers.types import TaskType, Capability

class TaskClassifier:
    """Classifies AI requests and selects appropriate providers and capabilities."""

    # Default capability mappings
    _TASK_CAPABILITIES: Dict[TaskType, List[Capability]] = {
        TaskType.BUSINESS_REASONING: [Capability.TEXT_REASONING, Capability.STRUCTURED_JSON],
        TaskType.EXECUTIVE_SYNTHESIS: [Capability.TEXT_REASONING, Capability.STRUCTURED_JSON],
        TaskType.PERSONA_ADAPTATION: [Capability.TEXT_REASONING, Capability.STRUCTURED_JSON],
        TaskType.INVESTIGATION_EXPLANATION: [Capability.TEXT_REASONING, Capability.STRUCTURED_JSON],
        TaskType.RECOMMENDATION_NARRATIVE: [Capability.TEXT_REASONING, Capability.STRUCTURED_JSON],
        TaskType.DECISION_NARRATIVE: [Capability.TEXT_REASONING, Capability.STRUCTURED_JSON],
        TaskType.MULTIMODAL_ANALYSIS: [Capability.MULTIMODAL_VISION],
        TaskType.IMAGE_ANALYSIS: [Capability.MULTIMODAL_VISION],
        TaskType.VISUAL_DOCUMENT_ANALYSIS: [Capability.MULTIMODAL_VISION],
        TaskType.CHART_ANALYSIS: [Capability.MULTIMODAL_VISION],
        TaskType.IMAGE_GENERATION: [Capability.IMAGE_GENERATION]
    }

    # Primary and fallback provider mappings
    _PROVIDER_ROUTING: Dict[TaskType, Tuple[str, Optional[str]]] = {
        TaskType.BUSINESS_REASONING: ("groq", "gemini"),
        TaskType.EXECUTIVE_SYNTHESIS: ("groq", "gemini"),
        TaskType.PERSONA_ADAPTATION: ("groq", "gemini"),
        TaskType.INVESTIGATION_EXPLANATION: ("groq", "gemini"),
        TaskType.RECOMMENDATION_NARRATIVE: ("groq", "gemini"),
        TaskType.DECISION_NARRATIVE: ("groq", "gemini"),
        TaskType.MULTIMODAL_ANALYSIS: ("gemini", None),
        TaskType.IMAGE_ANALYSIS: ("gemini", None),
        TaskType.VISUAL_DOCUMENT_ANALYSIS: ("gemini", None),
        TaskType.CHART_ANALYSIS: ("gemini", None),
        TaskType.IMAGE_GENERATION: ("gemini", None)
    }

    @classmethod
    def get_required_capabilities(cls, task_type: TaskType) -> List[Capability]:
        """Returns the capabilities required for a given task type."""
        return cls._TASK_CAPABILITIES.get(
            task_type,
            [Capability.TEXT_REASONING, Capability.STRUCTURED_JSON]
        )

    @classmethod
    def get_provider_routing(cls, task_type: TaskType) -> Tuple[str, Optional[str]]:
        """
        Returns (primary_provider_name, fallback_provider_name) for a task type.
        If fallback_provider_name is None, cross-provider fallback is forbidden.
        """
        return cls._PROVIDER_ROUTING.get(task_type, ("groq", "gemini"))
