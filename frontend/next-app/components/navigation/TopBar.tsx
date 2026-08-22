"use client";

import React from "react";
import { Search, Bell, Sparkles, User, ChevronDown } from "lucide-react";
import { PersonaType } from "@/lib/types";

interface TopBarProps {
  persona: PersonaType;
  onPersonaChange: (p: PersonaType) => void;
  breadcrumb?: string;
}

export function TopBar({ persona, onPersonaChange, breadcrumb = "Executive Overview" }: TopBarProps) {
  return (
    <header className="h-16 border-b border-outline-variant bg-surface/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Breadcrumb Context */}
      <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant">
        <span className="text-on-surface-variant/70">Global Enterprise</span>
        <span>/</span>
        <span className="text-on-surface font-semibold text-primary">{breadcrumb}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-5">
        {/* Persona Selector */}
        <div className="flex items-center gap-2 bg-surface-container border border-outline-variant px-3 py-1.5 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-mono text-on-surface-variant uppercase">Persona:</span>
          <select
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value as PersonaType)}
            className="bg-transparent text-xs font-mono font-bold text-primary focus:outline-none cursor-pointer pr-1"
          >
            <option value="CFO" className="bg-surface text-on-surface">
              CFO (Financial & Capital)
            </option>
            <option value="REGIONAL_SALES_MANAGER" className="bg-surface text-on-surface">
              Regional Sales Manager (Commercial & Operations)
            </option>
          </select>
        </div>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search metrics, evidence..."
            className="bg-surface-dim border border-outline-variant rounded-lg pl-9 pr-4 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none w-56 transition-all"
          />
        </div>

        {/* Notification bell */}
        <button className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/20 relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-outline-variant">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
            JD
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-on-surface">John Doe</div>
            <div className="text-[10px] font-mono text-on-surface-variant">VP Enterprise Analytics</div>
          </div>
        </div>
      </div>
    </header>
  );
}
