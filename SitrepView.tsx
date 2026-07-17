"use client";

import { useState, useEffect } from "react";
import { KpiCard } from "./KpiCard";
import { NatoPanel } from "./NatoPanel";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  kpiMetrics,
  intelFeed,
  crisisEvents,
  regionData,
} from "@/app/data/crisisData";
import { getThreatColor, getThreatHex, cn } from "@/app/lib/utils";
import {
  AlertTriangle,
  Radio,
  MapPin,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";

export function SitrepView() {
  const [activeAlert, setActiveAlert] = useState(0);
  const [threatMeter, setThreatMeter] = useState(73);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatMeter((prev) => {
        const change = Math.random() * 4 - 2;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const flashEvents = crisisEvents.filter((e) => e.threatLevel === "FLASH");

  return (
    <div className="space-y-4 p-4">
      {/* Flash Alerts */}
      {flashEvents.length > 0 && (
        <div className="rounded-lg border border-crimson/30 bg-crimson/5 p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-crimson animate-pulse" />
            <span className="text-xs font-mono font-bold text-crimson">
              FLASH ALERT — {flashEvents.length} ACTIVE
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {flashEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded bg-crimson/10 px-3 py-2"
              >
                <div>
                  <span className="text-[10px] font-mono text-crimson/70">
                    {event.id}
                  </span>
                  <p className="text-xs font-medium text-slate-200">
                    {event.title}
                  </p>
                </div>
                <Badge variant="flash">{event.threatLevel}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Threat Meter */}
        <NatoPanel
          title="Threat Assessment"
          subtitle="Global Threat Index — Real-time"
          className="lg:col-span-1"
        >
          <div className="flex flex-col items-center py-4">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#1e2129"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#threatGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${threatMeter * 2.64} 264`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-mono font-bold text-slate-100">
                  {Math.round(threatMeter)}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  THREAT INDEX
                </span>
              </div>
            </div>
            <div className="mt-4 flex w-full gap-1">
              {["LOW", "MOD", "HIGH", "CRIT", "FLASH"].map((level, i) => (
                <div
                  key={level}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    i < Math.ceil(threatMeter / 20)
                      ? i < 2
                        ? "bg-emerald-500"
                        : i < 3
                        ? "bg-amber-500"
                        : "bg-crimson"
                      : "bg-surface-elevated"
                  )}
                />
              ))}
            </div>
          </div>
        </NatoPanel>

        {/* Regional Distribution */}
        <NatoPanel
          title="Regional Distribution"
          subtitle="Active Crises by AOR"
          className="lg:col-span-1"
        >
          <div className="space-y-3">
            {regionData.map((region) => (
              <div key={region.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-slate-500" />
                    <span className="text-xs font-mono text-slate-300">
                      {region.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={region.threatLevel.toLowerCase() as any}
                      className="text-[9px]"
                    >
                      {region.threatLevel}
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-500">
                      {region.activeCrises}
                    </span>
                  </div>
                </div>
                <Progress value={region.activeCrises * 20} className="h-1" />
              </div>
            ))}
          </div>
        </NatoPanel>

        {/* Live Intel Feed */}
        <NatoPanel
          title="Live Intel Feed"
          subtitle="Streaming — All Sources"
          className="lg:col-span-1"
          headerAction={
            <div className="flex items-center gap-1.5">
              <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400">
                LIVE
              </span>
            </div>
          }
        >
          <ScrollArea className="h-64">
            <div className="space-y-3 pr-3">
              {intelFeed.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-md border p-2.5 transition-all hover:bg-surface-elevated",
                    i === activeAlert
                      ? "border-cyan/20 bg-cyan/5"
                      : "border-border"
                  )}
                  onMouseEnter={() => setActiveAlert(i)}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        item.classification
                          .toLowerCase()
                          .replace(" ", "") as any
                      }
                      className="text-[9px]"
                    >
                      {item.classification}
                    </Badge>
                    <span className="text-[9px] font-mono text-slate-600">
                      {new Date(item.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                      })}{" "}
                      Z
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-slate-200">
                    {item.headline}
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
                    {item.summary.slice(0, 120)}...
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] font-mono text-slate-600">
                      SRC: {item.source}
                    </span>
                    <span className="text-[9px] font-mono text-cyan/60">
                      CONF: {(item.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </NatoPanel>
      </div>

      {/* Crisis Breakdown Table */}
      <NatoPanel title="Active Crisis Breakdown" subtitle="All Active Incidents">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  ID
                </th>
                <th className="pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Event
                </th>
                <th className="pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Region
                </th>
                <th className="pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Level
                </th>
                <th className="pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Confidence
                </th>
                <th className="pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Sources
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {crisisEvents.map((event) => (
                <tr
                  key={event.id}
                  className="transition-colors hover:bg-surface-elevated/50"
                >
                  <td className="py-2.5 text-[10px] font-mono text-slate-600">
                    {event.id}
                  </td>
                  <td className="py-2.5 text-xs text-slate-200">
                    {event.title}
                  </td>
                  <td className="py-2.5 text-[10px] font-mono text-slate-500">
                    {event.region}
                  </td>
                  <td className="py-2.5">
                    <Badge
                      variant={event.threatLevel.toLowerCase() as any}
                      className="text-[9px]"
                    >
                      {event.threatLevel}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-[10px] font-mono text-slate-500">
                    {event.category}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={event.confidence * 100}
                        className="h-1 w-16"
                      />
                      <span className="text-[10px] font-mono text-slate-500">
                        {(event.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <div className="flex gap-1">
                      {event.sources.map((src) => (
                        <span
                          key={src}
                          className="rounded bg-surface-elevated px-1.5 py-0.5 text-[9px] font-mono text-slate-500"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NatoPanel>
    </div>
  );
}
