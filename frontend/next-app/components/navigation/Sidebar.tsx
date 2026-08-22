"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  ListOrdered,
  GitFork,
  FileSearch,
  Cpu,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Executive Command Center",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Investigation Activity",
    href: "/investigation",
    icon: Activity,
  },
  {
    name: "Root Cause Diagnosis",
    href: "/root-cause",
    icon: ListOrdered,
  },
  {
    name: "Decision Graph",
    href: "/decision-graph",
    icon: GitFork,
  },
  {
    name: "Evidence Explorer",
    href: "/evidence",
    icon: FileSearch,
  },
  {
    name: "Recommendations & What-If",
    href: "/recommendations",
    icon: Cpu,
  },
  {
    name: "Executive Decision Briefing",
    href: "/briefing",
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-outline-variant flex flex-col shrink-0 min-h-screen select-none z-30">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-outline-variant bg-surface-dim">
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-glow">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="font-display font-bold text-sm text-on-surface tracking-tight">
            INSIGHTPILOT <span className="text-primary">AI</span>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">
            Decision Intelligence
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60">
          Executive Platform
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group",
                isActive
                  ? "bg-primary-container/20 text-primary border-r-2 border-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/20"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-primary" : "text-on-surface-variant group-hover:text-primary"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-outline-variant bg-surface-dim/50">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>SYSTEM ONLINE</span>
          </div>
          <span className="text-on-surface-variant">v2.0 (Next.js)</span>
        </div>
      </div>
    </aside>
  );
}
