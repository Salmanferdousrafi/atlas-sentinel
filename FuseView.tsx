"use client";

import KpiCard from "./KpiCard";
import NatoPanel from "./NatoPanel";
import { trendMonths, trendValues } from "../data/crisisData";

function RingMetric({ value, label, color, subtext }: { value: number; label: string; color: string; subtext: string }) {
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-[18px] py-7">
      <div className="relative w-[140px] h-[140px]">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          <circle cx="70" cy="70" r="60" fill="none" stroke="#111827" strokeWidth="10" />
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="font-mono text-[28px] font-bold" style={{ color }}>
            {value}%
          </div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[1.5px]">{label}</div>
        </div>
      </div>
      <div className="font-mono text-[10px] text-text-muted text-center leading-relaxed whitespace-pre-line">
        {subtext}
      </div>
    </div>
  );
}

function TrendChart() {
  const maxVal = Math.max(...trendValues);
  const points = trendValues
    .map((v, i) => {
      const x = (i / (trendValues.length - 1)) * 100;
      const y = 100 - (v / maxVal) * 75 - 12;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-[260px]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(6,182,212,0.22)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${points} 100,100`} fill="url(#trendGrad)" />
        <polyline points={points} fill="none" stroke="#06b6d4" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
        {trendValues.map((v, i) => {
          const x = (i / (trendValues.length - 1)) * 100;
          const y = 100 - (v / maxVal) * 75 - 12;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.2"
              fill="#06b6d4"
              style={{ filter: "drop-shadow(0 0 3px rgba(6,182,212,0.5))" }}
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2.5 px-1.5">
        {trendMonths.map((m) => (
          <span key={m} className="font-mono text-[10px] text-text-muted font-semibold">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FuseView() {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-[18px]">
        <KpiCard
          label="Pred. Accuracy"
          value="96.1%"
          badge="NOM"
          badgeClass="bg-accent-green/10 text-accent-green border border-accent-green/15"
          valueClass="text-cyan"
          delta="▼ 0.2% (30D)"
          deltaClass="text-accent-green"
        />
        <KpiCard
          label="Response Time"
          value="3.8h"
          badge="OPT"
          badgeClass="bg-accent-green/10 text-accent-green border border-accent-green/15"
          valueClass="text-accent-green"
          delta="▼ 22% faster"
          deltaClass="text-accent-green"
          variant="success"
        />
        <KpiCard
          label="Escalation Risk"
          value="31"
          badge="HIGH"
          badgeClass="bg-accent-amber/10 text-accent-amber border border-accent-amber/15"
          valueClass="text-accent-amber"
          delta="▲ 8 new alerts"
          deltaClass="text-accent-red"
          variant="warning"
        />
        <KpiCard
          label="Flash Alerts (24H)"
          value="187"
          badge="CRIT"
          badgeClass="bg-accent-red/10 text-accent-red border border-accent-red/15"
          valueClass="text-accent-red"
          delta="▲ 53 vs yesterday"
          deltaClass="text-accent-red"
          variant="critical"
        />
        <KpiCard
          label="Sensor Uptime"
          value="99.97%"
          badge="NOM"
          badgeClass="bg-accent-green/10 text-accent-green border border-accent-green/15"
          valueClass="text-cyan"
          delta="— 0.00%"
          deltaClass="text-text-muted"
        />
        <KpiCard
          label="Data Fusion"
          value="14 sources"
          badge="NOM"
          badgeClass="bg-accent-green/10 text-accent-green border border-accent-green/15"
          valueClass="text-cyan"
          delta="▲ 2 new"
          deltaClass="text-accent-red"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <NatoPanel
          title="Conflict Probability (EUCOM)"
          icon="◉"
          iconBg="rgba(220,38,38,0.08)"
          iconColor="#dc2626"
        >
          <RingMetric value={80} label="High Risk" color="#dc2626" subtext={"EUCOM AOR
Window: T+30D
Confidence: 94%"} />
        </NatoPanel>
        <NatoPanel
          title="Natural Disaster Risk"
          icon="◉"
          iconBg="rgba(245,158,11,0.08)"
          iconColor="#f59e0b"
        >
          <RingMetric value={60} label="Moderate" color="#f59e0b" subtext={"Pacific Ring of Fire
Window: T+14D
Confidence: 91%"} />
        </NatoPanel>
        <NatoPanel
          title="Cyber Threat Index"
          icon="◉"
          iconBg="rgba(6,182,212,0.08)"
          iconColor="#06b6d4"
        >
          <RingMetric value={50} label="Elevated" color="#06b6d4" subtext={"Global Infrastructure
Status: Ongoing
Confidence: 88%"} />
        </NatoPanel>
      </div>

      <NatoPanel
        title="Crisis Event Trend — 6 Month Forecast"
        icon="◈"
        iconBg="rgba(139,92,246,0.08)"
        iconColor="#a855f7"
        actions={["6M", "1Y", "3Y"].map((btn, i) => (
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
      >
        <TrendChart />
      </NatoPanel>
    </div>
  );
}
