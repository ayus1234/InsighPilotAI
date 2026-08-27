/**
 * InsightPilot AI — TypeScript Domain Definitions
 * Maps 1:1 with authoritative backend Pydantic API response schemas.
 */

export type PersonaType = "CFO" | "REGIONAL_SALES_MANAGER";

export interface KPIRecord {
  id?: string;
  kpi_id?: string;
  name?: string;
  kpi_name?: string;
  domain?: string;
  region?: string;
  current_period?: string;
  previous_period?: string;
  current_value: number;
  previous_value?: number;
  baseline_value?: number;
  variance_amount?: number;
  variance_abs?: number;
  percent_change?: number;
  variance_pct?: number;
  materiality_status?: string;
  status?: "CRITICAL" | "HIGH" | "MEDIUM" | "HEALTHY" | "WATCH" | string;
  unit: string;
  threshold_alert?: string;
  trend_direction?: "UP" | "DOWN" | "FLAT";
  source_datasets?: string[];
}

export interface KPIListResponse {
  total_count: number;
  kpis: KPIRecord[];
}

export interface DriverRecord {
  driver_id: string;
  driver_name: string;
  rank: number;
  contribution_pct: number;
  impact_usd: number;
  confidence_score: number;
  confidence_level: "HIGH" | "MEDIUM" | "LOW";
  supporting_evidence_ids: string[];
  controllability: "HIGH" | "MEDIUM" | "LOW";
  category: string;
}

export interface KPIBlockType {
  kpi_id: string;
  region: string;
  prev_period_id: string;
  curr_period_id: string;
  previous_value: number;
  current_value: number;
  variance_amount: number;
  percent_change: number;
  materiality_status: string;
  currency?: string;
  variance_abs?: number;
  variance_pct?: number;
}

export interface OverallConfidenceType {
  overall_confidence: number;
  confidence_label: string;
  abstention: boolean;
  abstention_reason?: string | null;
}

export interface InvestigationResponse {
  investigation_id: string;
  kpi_id?: string;
  region?: string;
  prev_period_id?: string;
  curr_period_id?: string;
  persona_id?: string;
  timestamp: string;
  kpi?: KPIBlockType;
  drivers: DriverRecord[];
  evidence_summary?: {
    evidence_ids: string[];
    source_count: number;
    source_domains: string[];
  };
  overall?: OverallConfidenceType;
  lineage_graph?: {
    kpi_node: string;
    driver_nodes: string[];
    evidence_nodes: string[];
  };
  total_drivers_count?: number;
  dominant_driver_id?: string;
}

export interface EvidenceRecord {
  evidence_id: string;
  source_system: string;
  source_record_id: string;
  evidence_type: string;
  finding_summary: string;
  timestamp: string;
  freshness_hours: number;
  analytical_method: string;
  contribution_pct: number;
  confidence_score: number;
  confidence_level: "HIGH" | "MEDIUM" | "LOW";
  related_driver_ids: string[];
  verification_hash: string;
  status: "VERIFIED" | "PENDING" | "UNVERIFIED";
}

export interface EvidenceLineage {
  evidence_id: string;
  source_pipeline: string;
  source_table: string;
  extraction_query_hash: string;
  last_pipeline_run: string;
  pipeline_status: string;
  data_quality_score: number;
  transformation_steps: string[];
  verification_hash: string;
}

export interface ActionLever {
  lever_id: string;
  name: string;
  description: string;
  target_driver_id: string;
  lever_type: string;
  feasibility_score: number;
  estimated_recovery_usd: number;
  estimated_timeframe_days: number;
  owner_role: string;
  priority_rank: number;
}

export interface ExpectedImpact {
  revenue_recovery_usd: number;
  margin_impact_pct: number;
  recovery_timeframe_days: number;
}

export interface ConfidenceData {
  score: number;
  label: "HIGH" | "MEDIUM" | "LOW";
}

export interface RecommendationItem {
  recommendation_id: string;
  kpi_id: string;
  driver_id: string;
  driver_name: string;
  controllability: string;
  controllable_lever: string;
  action: string;
  rationale: string;
  expected_impact: ExpectedImpact;
  owner: string;
  priority: string;
  priority_rank: number;
  confidence: ConfidenceData;
  supporting_evidence_ids: string[];
  assumptions: string[];
  constraints: string[];
  overlap_group: string;
}

export type RecommendationRecord = RecommendationItem;

export interface RecommendationsResponse {
  kpi_id: string;
  total_recommendations: number;
  total_projected_recovery_usd: number;
  recommendations: RecommendationItem[];
}

export interface SimulationBaseline {
  kpi_id: string;
  region: string;
  current_availability_pct: number;
  stockout_revenue_loss_usd: number;
  gross_margin_pct: number;
  total_shortfall_usd: number;
  baseline_timestamp: string;
}

export interface SimulationResult {
  simulation_id?: string;
  scenario_name?: string;
  kpi_id?: string;
  region?: string;
  input_availability_pct?: number;
  baseline_availability_pct?: number;
  availability_delta_pts?: number;
  target_availability_pct?: number;
  availability_lift_pct?: number;
  projected_recovery_usd: number;
  projected_total_revenue_usd: number;
  projected_margin_impact_pts: number;
  confidence_score: number;
  assumptions: string[];
  timestamp: string;
}

export interface ReasoningStatement {
  statement: string;
  supporting_evidence_ids: string[];
  confidence: number;
}

export interface StructuredInvestigationExplanation {
  headline?: string;
  summary: string;
  situation?: string;
  primary_driver?: string;
  reasoning?: ReasoningStatement[];
  primary_driver_explanation?: string;
  secondary_driver_explanation?: string;
  uncertainty?: string;
  recommended_next_step?: string;
  strategic_recommendation?: string;
  abstained: boolean;
  abstention_reason?: string | null;
  grounded_evidence_ids: string[];
}

export interface AIResponseMetadata {
  model: string;
  generated_at: string;
  latency_ms: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  grounded_evidence_count: number;
  validation_status: string;
  provider?: string;
  key_pool_id?: string;
  fallback_used?: boolean;
}

export interface AIExplanationResponse {
  investigation_id?: string;
  persona?: PersonaType | string;
  explanation?: StructuredInvestigationExplanation;
  metadata?: AIResponseMetadata;
  // Convenience & fallback properties
  executive_summary?: string;
  summary?: string;
  provider?: string;
  kpi_id?: string;
  kpi_name?: string;
  region?: string;
  variance_summary?: string;
  grounded_narrative?: string;
  confidence_assessment?: string;
  cited_evidence_ids?: string[];
  grounded_evidence_ids?: string[];
  abstention?: boolean;
  abstained?: boolean;
  abstention_reason?: string | null;
  generated_at?: string;
  model_provider?: string;
}

// ==============================================================================
// Phase 5.2 — LangGraph Live Execution Trace Types
// ==============================================================================

export interface LangGraphNodeMetric {
  label: string;
  value: string;
}

export interface LangGraphNodeTrace {
  node_name: string;
  display_name: string;
  role: string;
  status: "COMPLETED" | "RUNNING" | "PENDING" | "SKIPPED" | "ABSTAINED" | string;
  started_at?: string;
  completed_at?: string;
  duration_ms: number;
  summary: string;
  details: string[];
  metrics: LangGraphNodeMetric[];
  metadata?: Record<string, any>;
}

export interface ProviderEventTrace {
  provider: string;
  key_pool: string;
  task_type: string;
  model: string;
  status: string;
  fallback_from?: string | null;
  duration_ms: number;
}

export interface LangGraphTraceResponse {
  investigation_id: string;
  kpi_id: string;
  region: string;
  prev_period_id: string;
  curr_period_id: string;
  persona_id: string;
  status: string;
  started_at: string;
  completed_at: string;
  total_duration_ms: number;
  nodes: LangGraphNodeTrace[];
  provider_events: ProviderEventTrace[];
  confidence: Record<string, any>;
  abstention: boolean;
  abstention_reason?: string | null;
  ai_explanation?: StructuredInvestigationExplanation | Record<string, any> | null;
  deterministic_summary: Record<string, any>;
  recommendations: RecommendationItem[] | any[];
  telemetry?: Record<string, any>;
}
