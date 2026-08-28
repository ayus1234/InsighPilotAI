"use client";

import React from "react";
import { Search, Bell, Sparkles, User, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PersonaType } from "@/lib/types";

interface TopBarProps {
  persona: PersonaType;
  onPersonaChange: (p: PersonaType) => void;
  breadcrumb?: string;
}

export function TopBar({ persona, onPersonaChange, breadcrumb = "Command Center" }: TopBarProps) {
  return (
    <header className="h-16 border-b border-outline-variant bg-surface/85 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Breadcrumb Context */}
      <div className="flex items-center gap-2.5 text-xs font-mono text-on-surface-variant">
        <span className="text-on-surface-variant/70">Enterprise</span>
        <span className="text-outline-variant">/</span>
        <span className="text-primary font-bold">{breadcrumb}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Persona Selector with Visual Pill Indicator */}
        <div className="flex items-center gap-2 bg-surface-container border border-primary/30 px-3 py-1.5 rounded-lg shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Persona:</span>
          <select
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value as PersonaType)}
            className="bg-transparent text-xs font-mono font-bold text-primary focus:outline-none cursor-pointer pr-1"
          >
            <option value="CFO" className="bg-surface text-on-surface">
              CFO (Financial & Capital)
            </option>
            <option value="REGIONAL_SALES_MANAGER" className="bg-surface text-on-surface">
              Regional Sales Manager (Commercial & Ops)
            </option>
          </select>
        </div>

        {/* Global Search */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search telemetry, evidence, SKUs..."
            className="bg-surface-dim border border-outline-variant rounded-lg pl-9 pr-3 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none w-60 transition-all font-mono"
          />
        </div>

        {/* Live Integrity Chip */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-success bg-success-container/15 border border-success/30 px-2.5 py-1 rounded-md">
          <CheckCircle2 className="w-3 h-3" />
          <span>100% HEALTHY</span>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-2 pl-3 border-l border-outline-variant">
          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-mono font-bold text-xs">
            JD
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-on-surface">John Doe</div>
            <div className="text-[9px] font-mono text-on-surface-variant">VP Enterprise Analytics</div>
          </div>
        </div>
      </div>
    </header>
  );
}
