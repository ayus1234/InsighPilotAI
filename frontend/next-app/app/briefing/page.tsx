"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { useApp } from "@/context/AppContext";
import Link from "next/link";

export default function ExecutiveBriefingPage() {
  const { persona, region, regionData, quarter } = useApp();
  const [approved, setApproved] = useState<boolean>(false);
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [approvalTimestamp, setApprovalTimestamp] = useState<string>("");
  const [slideMode, setSlideMode] = useState<boolean>(false);

  const handleApprove = () => {
    setApprovalTimestamp(new Date().toLocaleString());
    setShowApprovalModal(true);
  };

  const confirmApproval = () => {
    setApproved(true);
    setShowApprovalModal(false);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Persona-specific narrative content
  const getPersonaBriefingNarrative = () => {
    switch (persona) {
      case "CFO":
        return {
          situation: `${region} region experienced a net revenue contraction from baseline to ${regionData.revenue} (${regionData.variancePct}), creating a ${regionData.variance} variance gap with -3.2 pts gross margin dilution.`,
          recommendation: `Authorize $28,000 expedited ground freight transfer of 3,200 units from Chicago to Atlanta. Return on investment: $757.6K projected recovery vs $28K transfer cost (27.0x ROI).`,
        };
      case "REGIONAL_SALES_MANAGER":
        return {
          situation: `Retail partner order fulfillment in East territory dropped due to stockouts. 29 distributor purchase orders ($240K value) are held, while competitor Horizon Foods launched 15% promotional pricing discounts.`,
          recommendation: `Deploy 4 commercial account managers with priority SLA fulfillment guarantees to convert all 29 held POs within 21 business days.`,
        };
      case "COO":
        return {
          situation: `Atlanta DC experienced 14 consecutive days of zero available inventory for SKU-8821. Availability collapsed to ${regionData.availability} (-14.8 pts), triggering regional shipping backlogs.`,
          recommendation: `Execute expedited Chicago-to-Atlanta inventory rebalancing (3,200 units / 14-day SLA) to immediately restore regional fulfillment capability above 90%.`,
        };
      case "SUPPLY_CHAIN_LEAD":
        return {
          situation: `Chicago Central DC holds 4,800 surplus units (142% of safety threshold) of SKU-8821 while Atlanta DC is at zero stock, creating an inter-hub inventory imbalance.`,
          recommendation: `Issue transfer order for 3,200 units from Chicago to Atlanta via designated expedited freight lane, preserving 1,600 units (110% buffer) at Chicago.`,
        };
      default:
        return {
          situation: `${region} region revenue fell to ${regionData.revenue} (${regionData.variancePct}) against the baseline target.`,
          recommendation: `Execute Emergency Inventory Transfer and targeted distributor commercial outreach to recover ${regionData.recoveryPool}.`,
        };
    }
  };

  const narrative = getPersonaBriefingNarrative();

  return (
    <div className="flex min-h-screen bg-[#051424] text-on-surface">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar breadcrumb="Executive Briefing (Boardroom Ready)" />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Boardroom Certified
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  Doc ID: BRIEF-{quarter}-{region}-REV • Lens: <strong className="text-primary">{persona.replace("_", " ")}</strong>
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-on-surface tracking-tight">
                Executive Intelligence Briefing
              </h1>
            </div>

            {/* Clean Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Presentation Mode Toggle */}
              <button
                onClick={() => setSlideMode(!slideMode)}
                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  slideMode
                    ? "bg-secondary text-black shadow-sm"
                    : "bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">slideshow</span>
                <span>{slideMode ? "Doc View" : "Slide Mode"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant font-mono text-xs hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">print</span>
                <span>Export PDF</span>
              </button>

              <button
                onClick={handleApprove}
                disabled={approved}
                className={`font-mono text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  approved
                    ? "bg-success/20 text-success border border-success/40"
                    : "bg-primary text-black hover:bg-primary-light shadow-glow"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {approved ? "check_circle" : "task_alt"}
                </span>
                <span>{approved ? "Signed" : "Approve Strategy"}</span>
              </button>
            </div>
          </div>

          {/* Approved Audit Banner */}
          {approved && (
            <div className="p-3.5 rounded-xl bg-success/10 border border-success/30 flex items-center justify-between font-mono text-xs text-success">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>
                  <strong>EXECUTIVE AUDIT SIGN-OFF CONFIRMED:</strong> Approved by John Doe ({persona}) on {approvalTimestamp}
                </span>
              </div>
              <span className="text-[10px] bg-success/20 px-2 py-0.5 rounded font-bold">SHA-256 SEAL VALID</span>
            </div>
          )}

          {/* 5-Section Boardroom Grid */}
          <div className="space-y-6">
            {/* Top 3-Card Bento Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Section 1: Situation */}
              <section className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-outline-variant/30 bg-surface-container/70">
                <div>
                  <h2 className="font-mono text-xs text-on-surface-variant mb-4 uppercase tracking-widest flex items-center gap-2 border-b border-outline-variant/30 pb-3 font-bold">
                    <span className="material-symbols-outlined text-error text-[18px]">trending_down</span>
                    1. Situation
                  </h2>
                  <div className="font-display font-extrabold text-4xl md:text-5xl text-error mb-2 leading-none">
                    {regionData.variance}
                  </div>
                  <div className="flex items-center gap-1 text-error font-mono text-sm font-bold">
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                    <span>{regionData.variancePct} vs Q2 baseline</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed mt-4 border-t border-outline-variant/30 pt-4">
                  {narrative.situation}
                </p>
              </section>

              {/* Section 2: Diagnosis */}
              <section className="glass-panel rounded-2xl p-6 flex flex-col border border-outline-variant/30 bg-surface-container/70 space-y-4">
                <h2 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2 border-b border-outline-variant/30 pb-3 font-bold">
                  <span className="material-symbols-outlined text-primary text-[18px]">troubleshoot</span>
                  2. Diagnosis
                </h2>

                <div className="space-y-3">
                  <div className="bg-surface-dim p-3.5 rounded-xl border border-outline-variant/30">
                    <h3 className="font-display font-bold text-xs text-on-surface mb-1">
                      Primary: {regionData.primaryDriver}
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-sans mb-2">
                      Critical inventory depletion at regional DC (-14.8 pts availability drop).
                    </p>
                    <div className="flex justify-between font-mono text-[10px] mb-1">
                      <span className="text-on-surface-variant">Attribution Share</span>
                      <span className="text-error font-bold">{regionData.primaryDriverShare} (-$550K)</span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-error w-[43.2%] h-full"></div>
                    </div>
                  </div>

                  <div className="bg-surface-dim p-3.5 rounded-xl border border-outline-variant/30">
                    <h3 className="font-display font-bold text-xs text-on-surface mb-1">
                      Secondary: SKU-8821 Contraction
                    </h3>
                    <p className="text-[11px] text-on-surface-variant font-sans mb-2">
                      Flagship volume contraction exacerbated by distributor PO deferrals.
                    </p>
                    <div className="flex justify-between font-mono text-[10px] mb-1">
                      <span className="text-on-surface-variant">Attribution Share</span>
                      <span className="text-primary font-bold">26.7% (-$340K)</span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary w-[26.7%] h-full"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Corroborating Evidence */}
              <section className="glass-panel rounded-2xl p-6 flex flex-col border border-outline-variant/30 bg-surface-container/70 space-y-3">
                <h2 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2 border-b border-outline-variant/30 pb-3 font-bold">
                  <span className="material-symbols-outlined text-primary text-[18px]">plagiarism</span>
                  3. Corroborating Evidence
                </h2>

                <div className="space-y-2.5 flex-1 flex flex-col justify-around">
                  <div className="flex items-center justify-between p-3 bg-surface-dim rounded-xl border border-outline-variant/30">
                    <span className="font-sans font-semibold text-xs text-on-surface">Atlanta DC Availability</span>
                    <span className="font-mono text-[10px] font-bold text-error bg-error/15 px-2 py-0.5 rounded border border-error/30">
                      {regionData.availability} (CRITICAL)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface-dim rounded-xl border border-outline-variant/30">
                    <span className="font-sans font-semibold text-xs text-on-surface">Zendesk Stockout Tickets</span>
                    <span className="font-mono text-[10px] font-bold text-error bg-error/15 px-2 py-0.5 rounded border border-error/30">
                      +310% Surge
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface-dim rounded-xl border border-outline-variant/30">
                    <span className="font-sans font-semibold text-xs text-on-surface">Competitor Horizon Pricing</span>
                    <span className="font-mono text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded border border-primary/30">
                      -15.0% Scrape
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom Full-Width Section: Recommended Action & Projected Impact */}
            <section className="glass-panel rounded-2xl p-6 md:p-8 border border-primary/40 bg-gradient-to-br from-primary-container/15 via-surface-container to-surface shadow-glow relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {/* Left: Recommended Action */}
                <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant/30 pb-6 lg:pb-0 lg:pr-8">
                  <div>
                    <div className="flex justify-between items-center mb-3 border-b border-primary/20 pb-2.5">
                      <h2 className="font-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2 font-bold">
                        <span className="material-symbols-outlined text-[20px]">offline_bolt</span>
                        4. Recommended Action
                      </h2>
                      <span className="font-mono text-[10px] bg-primary/20 text-primary px-2.5 py-0.5 rounded-full border border-primary/30 font-bold uppercase">
                        Priority: Critical
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl md:text-2xl text-on-surface mb-3 leading-tight">
                      Execute Emergency Inventory Transfer (3,200 Units)
                    </h3>

                    <p className="text-xs md:text-sm leading-relaxed text-on-surface-variant font-sans">
                      {narrative.recommendation}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center gap-4 font-mono text-[11px] text-on-surface-variant">
                    <span>SLA: 14 Days</span>
                    <span>•</span>
                    <span>Owner: Supply Chain Operations</span>
                  </div>
                </div>

                {/* Right: Projected Impact & Confidence */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="font-mono text-xs text-on-surface-variant mb-3 uppercase tracking-widest flex items-center gap-2 border-b border-outline-variant/30 pb-2.5 font-bold">
                      <span className="material-symbols-outlined text-[18px]">insights</span>
                      5. Projected Impact & Confidence
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                      <div className="bg-surface-dim border border-primary/30 rounded-xl p-5 flex flex-col justify-center">
                        <div className="font-mono text-[10px] text-on-surface-variant uppercase font-bold mb-1">
                          Projected Recovery Pool
                        </div>
                        <div className="font-display font-extrabold text-3xl md:text-4xl text-primary leading-none mb-1">
                          {regionData.recoveryPool}
                        </div>
                        <div className="text-xs font-mono text-on-surface-variant">+$729.6K net fiscal benefit</div>
                      </div>

                      <div className="bg-surface-dim border border-outline-variant/30 rounded-xl p-5 flex flex-col justify-center gap-3">
                        <div>
                          <div className="flex justify-between items-center mb-1 font-mono">
                            <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                              Confidence Score
                            </span>
                            <span className="text-sm text-primary font-extrabold">89.0%</span>
                          </div>
                          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                            <div className="bg-primary w-[89%] h-full"></div>
                          </div>
                        </div>
                        <p className="text-[10px] font-sans text-on-surface-variant leading-snug">
                          Multi-layer deterministic reconciliation across 8 enterprise data sources.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
                    <span>Deterministic Lineage Verified</span>
                    <span className="text-primary font-bold">Zero-Hallucination Safe</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Boardroom Sign-Off Modal */}
          {showApprovalModal && (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-surface-container border border-primary/50 rounded-2xl max-w-md w-full p-6 shadow-glow space-y-4 font-mono">
                <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">draw</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-on-surface">Executive Authorization Sign-Off</h3>
                    <span className="text-[11px] text-primary">{region} • {quarter} Briefing</span>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  By clicking confirm, you authorize the execution of Strategy Lever 1 (Emergency Stock Transfer) and record an immutable audit signature in the enterprise governance ledger.
                </p>

                <div className="p-3 bg-surface-dim rounded-xl border border-outline-variant/30 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Signatory Role:</span>
                    <strong className="text-primary">{persona.replace("_", " ")}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Signatory ID:</span>
                    <strong className="text-on-surface">JD-EXEC-2026-991</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Timestamp:</span>
                    <span className="text-[11px] text-on-surface-variant">{approvalTimestamp}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="flex-1 py-2 rounded-lg border border-outline-variant/40 text-on-surface-variant hover:text-on-surface transition-colors text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmApproval}
                    className="flex-1 py-2 rounded-lg bg-primary text-black font-bold hover:bg-primary-light transition-all shadow-glow text-xs"
                  >
                    Authorize & Sign
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
