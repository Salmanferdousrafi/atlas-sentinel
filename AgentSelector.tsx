"use client";

import { cn } from "@/app/lib/utils";
import { AGENTS } from "@/app/lib/agents";
import {
  Telescope,
  Shield,
  TrendingUp,
  Truck,
} from "lucide-react";

interface AgentSelectorProps {
  selectedAgent: string;
  onSelect: (agentId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Telescope: <Telescope className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
  Truck: <Truck className="h-4 w-4" />,
};

const colorMap: Record<string, string> = {
  cyan: "border-cyan/30 bg-cyan/5 text-cyan hover:bg-cyan/10",
  violet: "border-violet-500/30 bg-violet-500/5 text-violet-400 hover:bg-violet-500/10",
  amber: "border-amber-400/30 bg-amber-400/5 text-amber-400 hover:bg-amber-400/10",
  emerald: "border-emerald-400/30 bg-emerald-400/5 text-emerald-400 hover:bg-emerald-400/10",
};

export function AgentSelector({ selectedAgent, onSelect }: AgentSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-600">
        Active Agents
      </span>
      {AGENTS.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onSelect(agent.id)}
          className={cn(
            "flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-left transition-all",
            selectedAgent === agent.id
              ? colorMap[agent.color]
              : "border-border bg-transparent text-slate-500 hover:bg-surface-elevated hover:text-slate-300"
          )}
        >
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
              selectedAgent === agent.id
                ? "bg-current/10"
                : "bg-surface-elevated"
            )}
            style={
              selectedAgent === agent.id
                ? { color: "inherit" }
                : {}
            }
          >
            {iconMap[agent.icon]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">{agent.name}</span>
              <span className="text-[9px] font-mono opacity-60">
                {agent.codename}
              </span>
            </div>
            <p className="truncate text-[10px] text-slate-600">
              {agent.role}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
