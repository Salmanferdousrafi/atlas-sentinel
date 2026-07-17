"use client";

import { NatoPanel } from "./NatoPanel";
import { resourceUnits } from "@/app/data/crisisData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/app/lib/utils";
import {
  Shield,
  Truck,
  Plane,
  Anchor,
  Cpu,
  Users,
  Clock,
  MapPin,
} from "lucide-react";

const statusConfig: Record<string, { color: string; label: string }> = {
  DEPLOYED: { color: "text-emerald-400 bg-emerald-400/10", label: "DEPLOYED" },
  STAGING: { color: "text-amber-400 bg-amber-400/10", label: "STAGING" },
  STANDBY: { color: "text-cyan bg-cyan/10", label: "STANDBY" },
  RTB: { color: "text-slate-400 bg-slate-400/10", label: "RTB" },
};

const typeIcons: Record<string, React.ReactNode> = {
  "Naval Strike Group": <Anchor className="h-4 w-4" />,
  "Cyber Operations": <Cpu className="h-4 w-4" />,
  "Search & Rescue": <Shield className="h-4 w-4" />,
  "Mechanized Infantry": <Truck className="h-4 w-4" />,
  "Missile Defense": <Shield className="h-4 w-4" />,
  "Medical & Logistics": <Truck className="h-4 w-4" />,
  "Special Forces": <Users className="h-4 w-4" />,
  "Unmanned Aerial Systems": <Plane className="h-4 w-4" />,
  "Combat Engineering": <Truck className="h-4 w-4" />,
};

export function LogstatView() {
  const deployed = resourceUnits.filter((u) => u.status === "DEPLOYED").length;
  const staging = resourceUnits.filter((u) => u.status === "STAGING").length;
  const standby = resourceUnits.filter((u) => u.status === "STANDBY").length;

  return (
    <div className="space-y-4 p-4">
      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "DEPLOYED", count: deployed, color: "emerald" },
          { label: "STAGING", count: staging, color: "amber" },
          { label: "STANDBY", count: standby, color: "cyan" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "rounded-lg border p-3",
              stat.color === "emerald"
                ? "border-emerald-400/20 bg-emerald-400/5"
                : stat.color === "amber"
                ? "border-amber-400/20 bg-amber-400/5"
                : "border-cyan/20 bg-cyan/5"
            )}
          >
            <span
              className={cn(
                "text-[10px] font-mono uppercase tracking-wider",
                stat.color === "emerald"
                  ? "text-emerald-400"
                  : stat.color === "amber"
                  ? "text-amber-400"
                  : "text-cyan"
              )}
            >
              {stat.label}
            </span>
            <p className="mt-1 text-2xl font-mono font-bold text-slate-100">
              {stat.count}
            </p>
          </div>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resourceUnits.map((unit) => {
          const status = statusConfig[unit.status];
          return (
            <div
              key={unit.id}
              className="rounded-lg border border-border bg-surface p-4 transition-all hover:border-cyan/20 hover:bg-surface-elevated"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-elevated text-slate-400">
                    {typeIcons[unit.type] || <Shield className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-slate-200">
                      {unit.id}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500">
                      {unit.name}
                    </p>
                  </div>
                </div>
                <Badge
                  className={cn("text-[9px]", status.color)}
                >
                  {status.label}
                </Badge>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    TYPE
                  </span>
                  <span className="text-[10px] font-mono text-slate-300">
                    {unit.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    LOCATION
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-600" />
                    <span className="text-[10px] font-mono text-slate-300">
                      {unit.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    PERSONNEL
                  </span>
                  <span className="text-[10px] font-mono text-slate-300">
                    {unit.personnel.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    ETA
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-600" />
                    <span className="text-[10px] font-mono text-slate-300">
                      {unit.eta}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    READINESS
                  </span>
                  <span className="text-[10px] font-mono text-cyan">
                    {unit.readiness}%
                  </span>
                </div>
                <Progress value={unit.readiness} className="h-1.5" />
              </div>

              <div className="mt-3 rounded bg-surface-elevated/50 px-2 py-1.5">
                <span className="text-[9px] font-mono text-slate-600">
                  MISSION: {unit.mission}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
