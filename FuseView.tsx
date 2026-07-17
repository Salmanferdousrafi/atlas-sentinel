"use client";

import { NatoPanel } from "./NatoPanel";
import { predictionMetrics } from "@/app/data/crisisData";
import { cn } from "@/app/lib/utils";
import { TrendingUp, AlertCircle, BrainCircuit } from "lucide-react";

export function FuseView() {
  return (
    <div className="space-y-4 p-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Probability Rings */}
        <NatoPanel
          title="Escalation Probability"
          subtitle="FUSE Predictive Model — 72H Window"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {predictionMetrics.map((metric) => {
              const circumference = 2 * Math.PI * 36;
              const strokeDashoffset =
                circumference - metric.probability * circumference;

              return (
                <div
                  key={metric.label}
                  className="flex flex-col items-center rounded-lg border border-border bg-surface-elevated/30 p-4"
                >
                  <div className="relative h-24 w-24">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="none"
                        stroke="#1e2129"
                        strokeWidth="6"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="none"
                        stroke={
                          metric.probability > 0.7
                            ? "#ef4444"
                            : metric.probability > 0.5
                            ? "#f59e0b"
                            : "#10b981"
                        }
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-mono font-bold text-slate-100">
                        {(metric.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-xs font-medium text-slate-300">
                    {metric.label}
                  </p>
                  <span className="text-[10px] font-mono text-slate-600">
                    {metric.timeframe} forecast
                  </span>

                  {/* Sparkline */}
                  <svg
                    viewBox="0 0 100 30"
                    className="mt-3 h-8 w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id={`spark-${metric.label.replace(/\s/g, "")}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M0,${30 - metric.trend[0] * 30} ${metric.trend
                        .map(
                          (v, i) =>
                            `L${(i / (metric.trend.length - 1)) * 100},${
                              30 - v * 30
                            }`
                        )
                        .join(" ")} L100,30 L0,30Z`}
                      fill={`url(#spark-${metric.label.replace(/\s/g, "")})`}
                    />
                    <path
                      d={`M0,${30 - metric.trend[0] * 30} ${metric.trend
                        .map(
                          (v, i) =>
                            `L${(i / (metric.trend.length - 1)) * 100},${
                              30 - v * 30
                            }`
                        )
                        .join(" ")}`}
                      fill="none"
                      stroke="#00d4ff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </NatoPanel>

        {/* Trend Analysis */}
        <NatoPanel
          title="Trend Analysis"
          subtitle="Multi-factor Correlation Matrix"
        >
          <div className="space-y-4">
            {predictionMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">
                      {(metric.probability * 100).toFixed(0)}%
                    </span>
                    {metric.probability > 0.6 && (
                      <AlertCircle className="h-3 w-3 text-amber-400" />
                    )}
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      metric.probability > 0.7
                        ? "bg-crimson"
                        : metric.probability > 0.5
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    )}
                    style={{ width: `${metric.probability * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-600">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </NatoPanel>
      </div>

      {/* Model Confidence */}
      <NatoPanel
        title="Model Performance"
        subtitle="FUSE Engine — Last 30 Days"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Prediction Accuracy", value: "91.4%", delta: "+2.1%", icon: BrainCircuit },
            { label: "False Positive Rate", value: "4.2%", delta: "-0.8%", icon: TrendingUp },
            { label: "Mean Latency", value: "142ms", delta: "-12ms", icon: TrendingUp },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface-elevated/30 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10">
                <stat.icon className="h-5 w-5 text-cyan" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500">
                  {stat.label}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-mono font-bold text-slate-100">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {stat.delta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NatoPanel>
    </div>
  );
}
