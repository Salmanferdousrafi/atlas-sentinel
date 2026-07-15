"use client";

import { useState, useEffect } from "react";
import KpiCard from "./KpiCard";
import NatoPanel from "./NatoPanel";
import { feedData, regionData, typeData, effectivenessData } from "../data/crisisData";

export default function SitrepView() {
  const [alertVisible, setAlertVisible] = useState(true);
  const [activeCrises, setActiveCrises] = useState(52);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.7) {
        setActiveCrises((prev) => prev + (Math.random() > 0.5 ? 1 : 0));
      }
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const maxRegion = Math.max(...regionData.map((d) => d.value));

  const sevMap: Record<string, string> = {
    crit: "sev-crit",
    high: "sev-high",
    med: "sev-med",
  };

  return (
    <div className="animate-fade-in">
      {/* Alert Flash */}
      {alertVisible && (
        <div className="bg-gradient-to-r from-accent-red/[0.06] to-accent-red/[0.02] border border-accent-red/20 rounded-md px-[18px] py-3.5 mb-[18px] flex items-center gap-4 animate-alert-pulse">
          <div className="w-9 h-9 rounded-full bg-accent-red/15 flex items-center justify-center text-base flex-shrink-0">⚠</div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-accent-red tracking-tight mb-0.5">FLASH TRAFF — CRITICAL ESCALATION DETECTED</div>
            <div className="text-xs text-text-secondary leading-relaxed">
              EUCOM: Armored formations confirmed massing 14km east of Kursk (51.7°N 36.2°E). SIGINT intercepts indicate offensive prep window T+48 to T+72 hours. Threat level elevated to CRITICAL.
            </div>
          </div>
          <button
            onClick={() => setAlertVisible(false)}
            className="px-4 py-1.5 rounded-sm border border-accent-red bg-accent-red/10 text-accent-red text-[11px] font-bold cursor-pointer transition-all hover:bg-accent-red hover:text-white flex-shrink-0"
          >
            ACKNOWLEDGE
          </button>
        </div>
      )}

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-[18px]">
        <KpiCard
          label="Active Crises"
          value={activeCrises.toString()}
          badge="CRIT"
          badgeClass="bg-accent-red/10 text-accent-red border border-accent-red/15"
          valueClass="text-accent-red"
          delta="▲ 14% (7D)"
          deltaClass="text-accent-red"
          variant="critical"
        />
        <KpiCard
          label="Threat Index"
          value="8.4"
          badge="HIGH"
          badgeClass="bg-accent-amber/10 text-accent-amber border border-accent-amber/15"
          valueClass="text-accent-amber"
          delta="▲ 0.6 pts"
          deltaClass="text-accent-red"
          variant="warning"
        />
        <KpiCard
          label="Affected Pop"
          value="163.4M"
          badge="ELEV"
          badgeClass="bg-accent-amber/10 text-accent-amber border border-accent-amber/15"
          valueClass="text-cyan"
          delta="▲ 21.1M new"
          deltaClass="text-accent-red"
        />
        <KpiCard
          label="Response Units"
          value="287"
          badge="NOM"
          badgeClass="bg-accent-green/10 text-accent-green border border-accent-green/15"
          valueClass="text-accent-green"
          delta="▼ 23 deployed (24H)"
          deltaClass="text-accent-green"
          variant="success"
        />
        <KpiCard
          label="Intel Reports"
          value="1,247"
          badge="NOM"
          badgeClass="bg-accent-green/10 text-accent-green border border-accent-green/15"
          valueClass="text-cyan"
          delta="▲ 89 (24H)"
          deltaClass="text-accent-red"
        />
        <KpiCard
          label="Escalation Risk"
          value="31"
          badge="HIGH"
          badgeClass="bg-accent-amber/10 text-accent-amber border border-accent-amber/15"
          valueClass="text-accent-amber"
          delta="▲ 8 alerts"
          deltaClass="text-accent-red"
          variant="warning"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-4">
        <NatoPanel
          title="Crisis Distribution by AOR"
          icon="◈"
          iconBg="rgba(6,182,212,0.08)"
          iconColor="#06b6d4"
          actions={[
            <button key="7d" className="px-3 py-[5px] rounded-sm border border-border-dim bg-tertiary text-text-muted text-[11px] font-semibold cursor-pointer transition-all hover:border-border-med hover:text-text-secondary active">7D</button>,
            <button key="30d" className="px-3 py-[5px] rounded-sm border border-border-dim bg-tertiary text-text-muted text-[11px] font-semibold cursor-pointer transition-all hover:border-border-med hover:text-text-secondary">30D</button>,
            <button key="90d" className="px-3 py-[5px] rounded-sm border border-border-dim bg-tertiary text-text-muted text-[11px] font-semibold cursor-pointer transition-all hover:border-border-med hover:text-text-secondary">90D</button>,
          ]}
        >
          <div className="flex items-end gap-2.5 h-[200px] pt-6">
            {regionData.map((d) => (
              <div key={d.name} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-sm transition-all hover:brightness-130 relative"
                  style={{ height: `${(d.value / maxRegion) * 170}px`, background: d.color, minHeight: 4 }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-text-primary whitespace-nowrap">
                    {d.value}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-text-muted font-semibold uppercase tracking-wide">{d.name}</span>
              </div>
            ))}
          </div>
        </NatoPanel>

        <NatoPanel
          title="Priority Intelligence Feed"
          icon="◆"
          iconBg="rgba(220,38,38,0.08)"
          iconColor="#dc2626"
          actions={[
            <button key="all" className="px-3 py-[5px] rounded-sm border border-cyan/25 bg-cyan/[0.08] text-cyan text-[11px] font-semibold cursor-pointer">ALL</button>,
            <button key="crit" className="px-3 py-[5px] rounded-sm border border-border-dim bg-tertiary text-text-muted text-[11px] font-semibold cursor-pointer transition-all hover:border-border-med hover:text-text-secondary">CRIT</button>,
          ]}
        >
          <div className="max-h-[480px] overflow-y-auto scrollbar-nato">
            {feedData.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3.5 py-3.5 border-b border-border-dim transition-all cursor-pointer hover:bg-hover -mx-[18px] px-[18px] last:border-b-0"
              >
                <div className={`w-[3px] rounded-sm flex-shrink-0 self-stretch min-h-[40px] ${sevMap[item.severity]}`} />
                <div className="font-mono text-[10px] text-text-muted min-w-[70px] text-right pt-0.5 tracking-wide">{item.time}</div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold mb-1 leading-snug">{item.title}</div>
                  <div className="text-xs text-text-secondary leading-relaxed mb-2">{item.desc}</div>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] font-semibold px-2 py-[3px] rounded-[3px] bg-tertiary text-text-muted border border-border-dim uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </NatoPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NatoPanel title="Crisis Type Breakdown" icon="◉" iconBg="rgba(139,92,246,0.08)" iconColor="#a855f7">
          <div className="flex justify-around items-center flex-wrap gap-7 py-3.5">
            {(() => {
              const total = typeData.reduce((a, b) => a + b.value, 0);
              return typeData.map((d) => {
                const pct = ((d.value / total) * 100).toFixed(0);
                return (
                  <div key={d.name} className="text-center">
                    <div
                      className="w-[90px] h-[90px] rounded-full flex items-center justify-center mx-auto mb-2.5"
                      style={{
                        background: `conic-gradient(${d.color} ${pct}%, #111827 0)`,
                      }}
                    >
                      <div className="w-16 h-16 rounded-full bg-panel flex items-center justify-center font-mono text-base font-bold" style={{ color: d.color }}>
                        {pct}%
                      </div>
                    </div>
                    <div className="text-xs font-bold text-text-primary mb-0.5">{d.name}</div>
                    <div className="font-mono text-[10px] text-text-muted">{d.value} ACTIVE</div>
                  </div>
                );
              });
            })()}
          </div>
        </NatoPanel>

        <NatoPanel title="Response Effectiveness (KPI)" icon="◐" iconBg="rgba(22,163,74,0.08)" iconColor="#16a34a">
          <div className="py-1">
            {effectivenessData.map((d) => (
              <div key={d.name} className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-semibold text-text-secondary">{d.name}</span>
                  <span className="font-mono text-[11px] font-bold" style={{ color: d.color }}>
                    {d.value}%
                  </span>
                </div>
                <div className="h-1.5 bg-tertiary rounded-sm overflow-hidden">
                  <div
                    className="h-full rounded-sm transition-all duration-1000"
                    style={{ width: `${d.value}%`, background: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </NatoPanel>
      </div>
    </div>
  );
}
