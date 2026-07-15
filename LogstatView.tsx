"use client";

import NatoPanel from "./NatoPanel";
import { resourcesData } from "../data/crisisData";

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  deployed: { bg: "rgba(22,163,74,0.08)", color: "#16a34a", border: "rgba(22,163,74,0.12)" },
  staging: { bg: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "rgba(245,158,11,0.12)" },
  standby: { bg: "rgba(6,182,212,0.08)", color: "#06b6d4", border: "rgba(6,182,212,0.12)" },
};

const progressColors = (p: number) => (p > 90 ? "#16a34a" : p > 60 ? "#f59e0b" : "#06b6d4");

export default function LogstatView() {
  return (
    <div className="animate-fade-in">
      <NatoPanel
        title="Force Deployment Status — LOGSTAT"
        icon="◐"
        iconBg="rgba(22,163,74,0.08)"
        iconColor="#16a34a"
        actions={["ALL", "MED", "MIL", "HUM", "LOG", "CYB"].map((btn, i) => (
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
        className="mb-4"
      >
        <div />
      </NatoPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {resourcesData.map((r, idx) => {
          const sc = statusColors[r.status] || statusColors.standby;
          return (
            <div
              key={idx}
              className={`bg-panel border border-border-dim rounded-md p-[18px] transition-all hover:border-border-med hover:-translate-y-0.5 hover:shadow-lg relative group`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-md"
                style={{
                  background:
                    r.category === "res-crit"
                      ? "#dc2626"
                      : r.category === "res-warn"
                      ? "#f59e0b"
                      : r.category === "res-ok"
                      ? "#16a34a"
                      : "#06b6d4",
                }}
              />
              <div className="flex justify-between items-start mb-3.5">
                <span className="font-mono text-[9px] font-bold text-text-muted uppercase tracking-wider">{r.type}</span>
                <span
                  className="font-mono text-[9px] font-bold px-2.5 py-[3px] rounded-[3px] uppercase tracking-wide"
                  style={{
                    background: sc.bg,
                    color: sc.color,
                    border: `1px solid ${sc.border}`,
                  }}
                >
                  {r.status}
                </span>
              </div>
              <div className="text-[15px] font-bold mb-1 tracking-tight">{r.name}</div>
              <div className="font-mono text-[11px] text-text-secondary mb-4 tracking-wide">{r.location}</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[5px] bg-tertiary rounded-sm overflow-hidden">
                  <div
                    className="h-full rounded-sm transition-all duration-600"
                    style={{ width: `${r.progress}%`, background: progressColors(r.progress) }}
                  />
                </div>
                <span className="font-mono text-[11px] font-bold text-text-muted min-w-[36px] text-right">
                  {r.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
