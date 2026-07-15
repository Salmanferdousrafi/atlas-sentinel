"use client";

import { useState, useRef, useCallback } from "react";
import NatoPanel from "./NatoPanel";
import { mapRegions } from "../data/crisisData";

interface TooltipData {
  name: string;
  lat: string;
  lon: string;
  crises: number;
  sev: string;
  sevClass: string;
}

export default function CopView() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState("LAT/LON: 00.000°N 000.000°E");
  const mapRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 520;
    const lat = (90 - (y / 520) * 180).toFixed(2);
    const lon = ((x / 1000) * 360 - 180).toFixed(2);
    const latDir = parseFloat(lat) >= 0 ? "N" : "S";
    const lonDir = parseFloat(lon) >= 0 ? "E" : "W";
    setCoords(`LAT/LON: ${Math.abs(parseFloat(lat)).toFixed(3)}°${latDir} ${Math.abs(parseFloat(lon)).toFixed(3)}°${lonDir}`);
  }, []);

  const handleRegionEnter = useCallback((key: string, e: React.MouseEvent) => {
    const data = mapRegions[key];
    if (!data) return;
    setTooltip(data);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleRegionMove = useCallback((e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleRegionLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const landmasses = [
    { id: "na", d: "M120,60 L280,50 L320,100 L300,160 L240,180 L200,170 L160,150 L130,120 L110,90 Z", crisis: "crisis-3" },
    { id: "sa", d: "M240,240 L300,230 L330,300 L310,380 L270,400 L240,370 L220,320 L230,280 Z", crisis: "crisis-3" },
    { id: "eu", d: "M460,80 L530,70 L560,100 L550,140 L500,150 L460,140 L440,110 Z", crisis: "crisis-1" },
    { id: "ru", d: "M540,60 L780,50 L820,100 L780,150 L680,160 L580,140 L550,100 Z", crisis: "crisis-1" },
    { id: "me", d: "M520,150 L580,140 L600,190 L560,210 L530,200 L510,180 Z", crisis: "crisis-1" },
    { id: "ea", d: "M510,240 L570,230 L590,280 L560,310 L520,300 L500,270 Z", crisis: "crisis-2" },
    { id: "nafr", d: "M450,180 L520,170 L540,210 L500,230 L450,220 L430,200 Z", crisis: "crisis-2" },
    { id: "sa-asia", d: "M600,160 L680,150 L700,210 L660,240 L620,230 L590,200 Z", crisis: "crisis-2" },
    { id: "sea", d: "M680,200 L780,190 L800,250 L760,280 L700,270 L680,240 Z", crisis: "crisis-2" },
    { id: "ea-asia", d: "M700,120 L820,110 L850,170 L800,200 L720,190 L690,160 Z", crisis: "crisis-3" },
    { id: "oc", d: "M780,320 L880,310 L900,370 L860,400 L780,390 L760,360 Z", crisis: "crisis-3" },
    { id: "ca", d: "M200,180 L250,170 L270,200 L240,220 L200,210 L190,195 Z", crisis: "crisis-2" },
  ];

  const markers = [
    { cx: 545, cy: 115, label: "UKR", ping: true, color: "#dc2626" },
    { cx: 555, cy: 175, label: "GAZA", ping: true, color: "#dc2626" },
    { cx: 545, cy: 265, label: "SUD", ping: false, color: "#f59e0b" },
    { cx: 730, cy: 220, label: "MMR", ping: false, color: "#f59e0b" },
    { cx: 790, cy: 170, label: "TW", ping: true, color: "#dc2626" },
    { cx: 540, cy: 195, label: "RED", ping: false, color: "#f59e0b" },
    { cx: 220, cy: 140, label: "GULF", ping: true, color: "#dc2626" },
    { cx: 280, cy: 250, label: "VEN", ping: false, color: "#f59e0b" },
  ];

  return (
    <NatoPanel
      title="Common Operating Picture (COP) — Global"
      icon="◎"
      iconBg="rgba(6,182,212,0.08)"
      iconColor="#06b6d4"
      actions={["ALL", "IMINT", "SIGINT", "HUMINT", "OSINT"].map((btn, i) => (
        <button
          key={btn}
          className={`px-3 py-[5px] rounded-sm border text-[11px] font-semibold cursor-pointer transition-all ${
            i === 0
              ? "border-cyan/25 bg-cyan/[0.08] text-cyan"
              : "border-border-dim bg-tertiary text-text-muted hover:border-border-med hover:text-text-secondary"
          }`}
        >
          {btn}
        </button>
      ))}
      className="animate-fade-in"
    >
      <div className="relative w-full h-[540px] bg-secondary rounded-sm overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(51,65,85,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <svg
          ref={mapRef}
          className="w-full h-full"
          viewBox="0 0 1000 520"
          onMouseMove={handleMouseMove}
        >
          {/* Grid lines */}
          {[130, 260, 390].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(51,65,85,0.08)" strokeWidth="0.5" strokeDasharray="4,4" />
          ))}
          {[250, 500, 750].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="520" stroke="rgba(51,65,85,0.08)" strokeWidth="0.5" strokeDasharray="4,4" />
          ))}

          {/* Landmasses */}
          {landmasses.map((land) => (
            <path
              key={land.id}
              data-region={land.id}
              className={`fill-tertiary stroke-border-dim stroke-[0.5] transition-all hover:fill-hover cursor-pointer ${land.crisis}`}
              d={land.d}
              onMouseEnter={(e) => handleRegionEnter(land.id, e)}
              onMouseMove={handleRegionMove}
              onMouseLeave={handleRegionLeave}
            />
          ))}

          {/* Markers */}
          {markers.map((m, i) => (
            <g key={i}>
              {m.ping && <circle cx={m.cx} cy={m.cy} r="2" fill={m.color} className="animate-nato-ping" />}
              <circle cx={m.cx} cy={m.cy} r="3" fill={m.color} />
              <text x={m.cx} y={m.cy - 7} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono" fontWeight="600">
                {m.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute top-2.5 right-2.5 bg-[rgba(4,6,10,0.97)] border border-border-dim rounded-sm p-3 z-10 min-w-[160px]">
          <div className="font-mono text-[9px] font-bold text-text-muted uppercase tracking-[1.5px] mb-2.5 pb-1.5 border-b border-border-dim">Legend</div>
          {[
            { color: "#dc2626", glow: true, label: "Critical (CAT-1)" },
            { color: "#f59e0b", glow: false, label: "Elevated (CAT-2)" },
            { color: "#06b6d4", glow: false, label: "Normal (CAT-3)" },
            { color: "#475569", glow: false, label: "Stable" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-[11px] text-text-secondary mb-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: item.color, boxShadow: item.glow ? `0 0 6px ${item.color}` : "none" }} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Coords */}
        <div className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-text-muted bg-[rgba(4,6,10,0.95)] px-2.5 py-1 rounded-sm border border-border-dim z-10 tracking-wide">
          {coords}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute bg-panel border border-border-med rounded-sm p-3.5 z-[100] shadow-lg min-w-[220px] pointer-events-none"
            style={{
              left: tooltipPos.x - (mapRef.current?.getBoundingClientRect().left || 0) + 16,
              top: tooltipPos.y - (mapRef.current?.getBoundingClientRect().top || 0) + 16,
            }}
          >
            <div className="font-mono text-[9px] font-bold text-text-muted uppercase tracking-[1.5px] mb-1.5">Area of Responsibility</div>
            <div className="text-[13px] font-bold mb-1 tracking-tight">{tooltip.name}</div>
            <div className="font-mono text-[10px] text-cyan mb-2 tracking-wide">
              {tooltip.lat} {tooltip.lon}
            </div>
            <div className="text-[11px] text-text-secondary leading-relaxed">
              Active crises: {tooltip.crises} | Intel reports: {tooltip.crises * 12}
            </div>
            <div className={`inline-block mt-2 px-2.5 py-[3px] rounded-[3px] font-mono text-[10px] font-bold uppercase tracking-wide ${tooltip.sevClass}`}>
              {tooltip.sev}
            </div>
          </div>
        )}
      </div>
    </NatoPanel>
  );
}
