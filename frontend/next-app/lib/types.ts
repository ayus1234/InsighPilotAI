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

export interface InvestigationResponse {
  investigation_id: string;
  kpi_id: string;
  region: string;
  prev_period_id: string;
  curr_period_id: string;
  drivers: DriverRecord[];
  total_drivers_count: number;
  dominant_driver_id: string;
  timestamp: string;
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
}

export interface RecommendationRecord {
  recommendation_id: string;
  priority_rank: number;
  title: string;
  summary: string;
  rationale: string;
  target_driver_id: string;
  levers: ActionLever[];
  projected_financial_recovery_usd: number;
  projected_margin_lift_pts: number;
  overall_confidence_score: number;
  overall_confidence_level: "HIGH" | "MEDIUM" | "LOW";
  controllability: "HIGH" | "MEDIUM" | "LOW";
  risk_level: "LOW" | "MEDIUM" | "HIGH";
  owner_role: string;
  implementation_timeframe_days: number;
  supporting_evidence_ids: string[];
  overlap_group_id: string;
  status: "ACTIVE" | "PENDING" | "EXECUTED";
}

export interface RecommendationsResponse {
  kpi_id: string;
  region: string;
  recommendations: RecommendationRecord[];
  total_projected_recovery_usd: number;
  total_recommendations_count: number;
  timestamp: string;
}

export interface SimulationBaseline {
  kpi_id: string;
  region: string;
  baseline_revenue_usd: number;
  current_revenue_usd: number;
  revenue_deficit_usd: number;
  baseline_inventory_availability_pct: number;
  current_inventory_availability_pct: number;
  availability_deficit_pts: number;
}

export interface SimulationResult {
  scenario_name: string;
  region: string;
  input_availability_pct: number;
  baseline_availability_pct: number;
  availability_delta_pts: number;
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
  summary: string;
  reasoning: ReasoningStatement[];
  primary_driver_explanation: string;
  secondary_driver_explanation?: string;
  uncertainty: string;
  recommended_next_step?: string;
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
}

export interface AIExplanationResponse {
  investigation_id?: string;
  persona?: PersonaType | string;
  explanation?: StructuredInvestigationExplanation;
  metadata?: AIResponseMetadata;
  // Legacy / fallback flat properties
  kpi_id?: string;
  kpi_name?: string;
  region?: string;
  variance_summary?: string;
  grounded_narrative?: string;
  confidence_assessment?: string;
  cited_evidence_ids?: string[];
  abstention?: boolean;
  abstention_reason?: string | null;
  generated_at?: string;
  model_provider?: string;
}

