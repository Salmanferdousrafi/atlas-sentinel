"use client";

import { useState } from "react";
import { NatoPanel } from "./NatoPanel";
import { Badge } from "@/components/ui/badge";
import { crisisEvents, regionData } from "@/app/data/crisisData";
import { getThreatHex, cn } from "@/app/lib/utils";
import { MapPin, Filter, Eye } from "lucide-react";

const categoryFilters = ["ALL", "MARITIME", "CYBER", "CONVENTIONAL", "HUMANITARIAN", "SAR", "NATURAL"];

export function CopView() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const filteredEvents =
    activeFilter === "ALL"
      ? crisisEvents
      : crisisEvents.filter((e) => e.category === activeFilter);

  // Map coordinates to SVG viewBox (0-1000 x 500)
  const mapX = (lon: number) => ((lon + 180) / 360) * 1000;
  const mapY = (lat: number) => ((90 - lat) / 180) * 500;

  return (
    <div className="space-y-4 p-4">
      <NatoPanel
        title="Common Operating Picture"
        subtitle="Global Crisis Heatmap — Interactive"
        headerAction={
          <div className="flex items-center gap-2">
            <Filter className="h-3 w-3 text-slate-500" />
            <span className="text-[10px] font-mono text-slate-500">
              {filteredEvents.length} INCIDENTS
            </span>
          </div>
        }
      >
        {/* Filter Chips */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all",
                activeFilter === cat
                  ? "bg-cyan/10 text-cyan border border-cyan/30"
                  : "bg-surface-elevated text-slate-500 border border-border hover:border-slate-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SVG World Map */}
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg border border-border bg-abyss">
          <svg
            viewBox="0 0 1000 500"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Grid lines */}
            {Array.from({ length: 19 }, (_, i) => (
              <line
                key={`v${i}`}
                x1={i * 55.5}
                y1={0}
                x2={i * 55.5}
                y2={500}
                stroke="#1e2129"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 55.5}
                x2={1000}
                y2={i * 55.5}
                stroke="#1e2129"
                strokeWidth="0.5"
              />
            ))}

            {/* Simplified continent shapes */}
            <path
              d="M150,80 Q200,60 280,70 Q320,90 300,150 Q280,200 220,220 Q150,200 120,150 Q100,100 150,80Z"
              fill="#1a1d27"
              stroke="#2a2e3b"
              strokeWidth="1"
            />
            <path
              d="M220,240 Q280,230 320,250 Q340,300 300,380 Q260,420 240,380 Q220,320 220,240Z"
              fill="#1a1d27"
              stroke="#2a2e3b"
              strokeWidth="1"
            />
            <path
              d="M420,60 Q480,50 520,70 Q560,100 540,140 Q500,160 460,150 Q420,130 420,60Z"
              fill="#1a1d27"
              stroke="#2a2e3b"
              strokeWidth="1"
            />
            <path
              d="M440,160 Q500,150 540,170 Q580,220 560,300 Q520,350 480,340 Q440,300 440,220Z"
              fill="#1a1d27"
              stroke="#2a2e3b"
              strokeWidth="1"
            />
            <path
              d="M560,50 Q640,40 720,60 Q800,80 840,120 Q860,180 820,220 Q760,240 680,220 Q600,180 560,120Z"
              fill="#1a1d27"
              stroke="#2a2e3b"
              strokeWidth="1"
            />
            <path
              d="M720,300 Q780,290 820,310 Q840,350 800,380 Q760,390 720,370Z"
              fill="#1a1d27"
              stroke="#2a2e3b"
              strokeWidth="1"
            />

            {/* Crisis markers */}
            {filteredEvents.map((event) => {
              const x = mapX(event.coordinates[1]);
              const y = mapY(event.coordinates[0]);
              const color = getThreatHex(event.threatLevel);
              const isHovered = hoveredEvent === event.id;

              return (
                <g key={event.id}>
                  {/* Pulse ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 25 : 15}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity={0.3}
                    className="animate-ping-slow"
                  />
                  {/* Center dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={color}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                  />
                  {/* Label on hover */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x + 12}
                        y={y - 30}
                        width={200}
                        height={50}
                        rx="4"
                        fill="#13151c"
                        stroke={color}
                        strokeWidth="0.5"
                        opacity="0.95"
                      />
                      <text
                        x={x + 18}
                        y={y - 18}
                        fill="#e2e8f0"
                        fontSize="8"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {event.id}
                      </text>
                      <text
                        x={x + 18}
                        y={y - 8}
                        fill="#94a3b8"
                        fontSize="7"
                        fontFamily="monospace"
                      >
                        {event.title.slice(0, 35)}
                        {event.title.length > 35 ? "..." : ""}
                      </text>
                      <text
                        x={x + 18}
                        y={y + 2}
                        fill={color}
                        fontSize="7"
                        fontFamily="monospace"
                      >
                        {event.threatLevel} | {event.category} | CONF:{" "}
                        {(event.confidence * 100).toFixed(0)}%
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Overlay legend */}
          <div className="absolute bottom-3 left-3 rounded-md border border-border bg-abyss/90 p-2 backdrop-blur">
            <div className="space-y-1">
              {[
                { level: "FLASH", color: "#ef4444" },
                { level: "CRITICAL", color: "#ef4444" },
                { level: "HIGH", color: "#f97316" },
                { level: "MODERATE", color: "#f59e0b" },
                { level: "LOW", color: "#10b981" },
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[9px] font-mono text-slate-500">
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </NatoPanel>

      {/* Region Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {regionData.slice(0, 4).map((region) => (
          <div
            key={region.id}
            className="rounded-lg border border-border bg-surface p-3 transition-all hover:border-cyan/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                {region.id}
              </span>
              <Badge
                variant={region.threatLevel.toLowerCase() as any}
                className="text-[9px]"
              >
                {region.threatLevel}
              </Badge>
            </div>
            <p className="mt-1 text-xs font-medium text-slate-200">
              {region.name}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-slate-600" />
                <span className="text-[10px] font-mono text-slate-500">
                  {region.activeCrises} crises
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-slate-600" />
                <span className="text-[10px] font-mono text-slate-500">
                  {region.personnelDeployed.toLocaleString()} deployed
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
