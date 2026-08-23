/**
 * InsightPilot AI — Typed API Client for FastAPI Backend
 */

import {
  KPIListResponse,
  KPIRecord,
  InvestigationResponse,
  EvidenceRecord,
  EvidenceLineage,
  RecommendationsResponse,
  SimulationBaseline,
  SimulationResult,
  AIExplanationResponse,
  PersonaType,
} from "./types";

const API_BASE_URL =
  typeof window !== "undefined" && (window as any).__API_BASE_URL__
    ? (window as any).__API_BASE_URL__
    : process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error [${response.status}] ${response.statusText}: ${errorText}`);
      }
      return (await response.json()) as T;
    } catch (err: any) {
      console.warn(`[InsightPilot APIClient] Request failed for ${endpoint}:`, err.message);
      throw err;
    }
  }

  // 1. KPI Endpoints
  async getKPIs(
    region: string = "NA-East",
    prevPeriod: string = "2026-Q2",
    currPeriod: string = "2026-Q3"
  ): Promise<KPIListResponse> {
    const query = new URLSearchParams({ region, prev_period_id: prevPeriod, curr_period_id: currPeriod }).toString();
    return this.request<KPIListResponse>(`/api/v1/kpis?${query}`);
  }

  async getKPI(
    kpiId: string = "north_america_east_revenue",
    region: string = "NA-East",
    prevPeriod: string = "2026-Q2",
    currPeriod: string = "2026-Q3"
  ): Promise<KPIRecord> {
    const query = new URLSearchParams({ region, prev_period_id: prevPeriod, curr_period_id: currPeriod }).toString();
    return this.request<KPIRecord>(`/api/v1/kpis/${kpiId}?${query}`);
  }

  // 2. Investigation Endpoints
  async getInvestigation(
    kpiId: string = "north_america_east_revenue",
    region: string = "NA-East",
    prevPeriod: string = "2026-Q2",
    currPeriod: string = "2026-Q3"
  ): Promise<InvestigationResponse> {
    const query = new URLSearchParams({ region, prev_period_id: prevPeriod, curr_period_id: currPeriod }).toString();
    return this.request<InvestigationResponse>(`/api/v1/investigations/${kpiId}?${query}`);
  }

  async getDecisionGraph(
    kpiId: string = "north_america_east_revenue",
    region: string = "NA-East",
    prevPeriod: string = "2026-Q2",
    currPeriod: string = "2026-Q3"
  ): Promise<any> {
    const query = new URLSearchParams({ region, prev_period_id: prevPeriod, curr_period_id: currPeriod }).toString();
    return this.request<any>(`/api/v1/investigations/${kpiId}/decision-graph?${query}`);
  }

  // 3. Evidence Endpoints
  async getEvidenceList(
    options: { domain?: string; q?: string; region?: string } = {}
  ): Promise<any> {
    const params = new URLSearchParams();
    if (options.domain) params.set("domain", options.domain);
    if (options.q) params.set("q", options.q);
    if (options.region) params.set("region", options.region);
    const queryString = params.toString();
    return this.request<any>(`/api/v1/evidence${queryString ? `?${queryString}` : ""}`);
  }

  async getEvidence(evidenceId: string, region: string = "NA-East"): Promise<EvidenceRecord> {
    const query = new URLSearchParams({ region }).toString();
    return this.request<EvidenceRecord>(`/api/v1/evidence/${encodeURIComponent(evidenceId)}?${query}`);
  }

  async getEvidenceLineage(evidenceId: string, region: string = "NA-East"): Promise<EvidenceLineage> {
    const query = new URLSearchParams({ region }).toString();
    return this.request<EvidenceLineage>(`/api/v1/evidence/${encodeURIComponent(evidenceId)}/lineage?${query}`);
  }

  // 4. Recommendations Endpoints
  async getRecommendations(
    kpiId: string = "north_america_east_revenue",
    region: string = "NA-East"
  ): Promise<RecommendationsResponse> {
    const query = new URLSearchParams({ region }).toString();
    return this.request<RecommendationsResponse>(`/api/v1/recommendations/${kpiId}?${query}`);
  }

  // 5. Simulation Endpoints
  async getSimulationBaseline(region: string = "NA-East"): Promise<SimulationBaseline> {
    const query = new URLSearchParams({ region }).toString();
    return this.request<SimulationBaseline>(`/api/v1/simulations/baseline?${query}`);
  }

  async simulateInventoryAvailability(
    availabilityRatioOrPct: number,
    region: string = "NA-East"
  ): Promise<SimulationResult> {
    return this.request<SimulationResult>(`/api/v1/simulations/run`, {
      method: "POST",
      body: JSON.stringify({
        scenario_name: "Atlanta DC Inventory Optimization",
        region,
        target_availability_pct: availabilityRatioOrPct,
      }),
    });
  }

  // 6. Grounded Gemini AI Explanations
  async getAIExplanation(
    kpiId: string = "north_america_east_revenue",
    options: {
      persona?: PersonaType;
      region?: string;
      prevPeriod?: string;
      currPeriod?: string;
      driverId?: string | null;
      includeRecommendations?: boolean;
      includeSimulation?: boolean;
    } = {}
  ): Promise<AIExplanationResponse> {
    const persona = options.persona || "CFO";
    const region = options.region || "NA-East";
    const prevPeriod = options.prevPeriod || "2026-Q2";
    const currPeriod = options.currPeriod || "2026-Q3";

    const query = new URLSearchParams({
      region,
      prev_period_id: prevPeriod,
      curr_period_id: currPeriod,
    }).toString();

    return this.request<AIExplanationResponse>(`/api/v1/ai/explain/${kpiId}?${query}`, {
      method: "POST",
      body: JSON.stringify({
        persona,
        explanation_mode: "structured",
        driver_id: options.driverId || null,
        include_recommendations: options.includeRecommendations !== undefined ? options.includeRecommendations : true,
        include_simulation: options.includeSimulation !== undefined ? options.includeSimulation : false,
      }),
    });
  }
}

export const apiClient = new APIClient();
