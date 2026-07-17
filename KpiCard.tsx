"use client";

import { cn } from "@/app/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { KpiMetric } from "@/app/types";

interface KpiCardProps {
  metric: KpiMetric;
  className?: string;
}

export function KpiCard({ metric, className }: KpiCardProps) {
  const TrendIcon =
    metric.trend === "up"
      ? TrendingUp
      : metric.trend === "down"
      ? TrendingDown
      : Minus;

  const trendColor =
    metric.trend === "up"
      ? "text-emerald-400"
      : metric.trend === "down"
      ? "text-crimson"
      : "text-slate-500";

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-4 transition-all hover:border-cyan/20 hover:bg-surface-elevated",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
          {metric.label}
        </span>
        <div className={cn("flex items-center gap-1", trendColor)}>
          <TrendIcon className="h-3 w-3" />
          <span className="text-[10px] font-mono">
            {metric.change > 0 ? "+" : ""}
            {metric.change}
            {metric.unit}
          </span>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-mono font-bold text-slate-100">
          {metric.value}
        </span>
      </div>
    </div>
  );
}
