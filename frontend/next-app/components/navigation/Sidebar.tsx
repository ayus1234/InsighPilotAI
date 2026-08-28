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
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Command Center",
    href: "/",
    icon: LayoutDashboard,
    badge: "Live",
  },
  {
    name: "AI Investigation Activity",
    href: "/investigation",
    icon: Activity,
    badge: "11 Nodes",
  },
  {
    name: "Root Cause Diagnosis",
    href: "/root-cause",
    icon: ListOrdered,
    badge: "4 Drivers",
  },
  {
    name: "Decision Graph",
    href: "/decision-graph",
    icon: GitFork,
    badge: "6 Columns",
  },
  {
    name: "Evidence Explorer",
    href: "/evidence",
    icon: FileSearch,
    badge: "SHA-256",
  },
  {
    name: "Recommendations & What-If",
    href: "/recommendations",
    icon: Cpu,
    badge: "+$484K",
  },
  {
    name: "Executive Briefing",
    href: "/briefing",
    icon: FileText,
    badge: "Export",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-outline-variant flex flex-col shrink-0 min-h-screen select-none z-30 shadow-2xl">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-outline-variant bg-surface-dim/80">
        <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center text-primary shadow-glow">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="font-display font-bold text-sm text-on-surface tracking-tight flex items-center gap-1.5">
            <span>INSIGHTPILOT</span>
            <span className="text-primary font-extrabold text-[11px] px-1.5 py-0.2 rounded bg-primary/15 border border-primary/30">AI</span>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">
            Decision Intelligence
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-5 px-3 space-y-1.5">
        <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/70 font-semibold">
          Investigation Lifecycle
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/40 font-semibold shadow-glow"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/30"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-primary" : "text-on-surface-variant group-hover:text-primary"
                  )}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border transition-colors",
                    isActive
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-surface-dim text-on-surface-variant/70 border-outline-variant/60 group-hover:text-on-surface"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-outline-variant bg-surface-dim/70">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-bold tracking-tight">PIPELINE ONLINE</span>
          </div>
          <span className="text-on-surface-variant/70 text-[10px]">Track 3 • AIC 2026</span>
        </div>
      </div>
    </aside>
  );
}
