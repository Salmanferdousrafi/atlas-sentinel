"use client";

import NatoPanel from "./NatoPanel";
import { intelData } from "../data/crisisData";

const badgeClasses: Record<string, string> = {
  critical: "bg-accent-red/8 text-accent-red border border-accent-red/12",
  high: "bg-accent-amber/8 text-accent-amber border border-accent-amber/12",
  moderate: "bg-cyan/8 text-cyan border border-cyan/12",
};

export default function IntelView() {
  return (
    <NatoPanel
      title="Classified Intelligence Stream — REL TO NATO"
      icon="◆"
      iconBg="rgba(6,182,212,0.08)"
      iconColor="#06b6d4"
      actions={[
        <button key="live" className="px-3 py-[5px] rounded-sm border border-cyan/25 bg-cyan/[0.08] text-cyan text-[11px] font-semibold cursor-pointer">LIVE</button>,
        <button key="archive" className="px-3 py-[5px] rounded-sm border border-border-dim bg-tertiary text-text-muted text-[11px] font-semibold cursor-pointer transition-all hover:border-border-med hover:text-text-secondary">ARCHIVE</button>,
      ]}
      className="animate-fade-in"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {["DTG", "Source", "AOR", "Classification", "Summary", "Confidence", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-left px-3.5 py-2.5 font-mono text-[9px] font-bold text-text-muted uppercase tracking-[1.5px] border-b border-border-dim bg-secondary sticky top-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {intelData.map((row, idx) => (
              <tr key={idx} className="hover:bg-hover group">
                <td className="px-3.5 py-3 font-mono text-[11px] text-text-secondary tracking-wide border-b border-border-dim group-hover:text-text-primary">
                  {row.time}
                </td>
                <td className="px-3.5 py-3 border-b border-border-dim">
                  <span className="inline-flex items-center gap-1 px-2.5 py-[3px] rounded-[3px] font-mono text-[10px] font-bold tracking-wide bg-cyan/8 text-cyan border border-cyan/12">
                    {row.source}
                  </span>
                </td>
                <td className="px-3.5 py-3 font-mono text-[11px] text-text-secondary tracking-wide border-b border-border-dim group-hover:text-text-primary">
                  {row.region}
                </td>
                <td className="px-3.5 py-3 border-b border-border-dim">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-[3px] rounded-[3px] font-mono text-[10px] font-bold tracking-wide uppercase ${
                      badgeClasses[row.classification] || badgeClasses.moderate
                    }`}
                  >
                    {row.classification}
                  </span>
                </td>
                <td className="px-3.5 py-3 text-xs text-text-secondary border-b border-border-dim group-hover:text-text-primary">
                  {row.summary}
                </td>
                <td className="px-3.5 py-3 font-mono text-[11px] text-cyan tracking-wide border-b border-border-dim">
                  {row.confidence}
                </td>
                <td className="px-3.5 py-3 border-b border-border-dim">
                  {row.status === "ack" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-[3px] rounded-[3px] font-mono text-[10px] font-bold tracking-wide bg-accent-green/8 text-accent-green border border-accent-green/12">
                      ACK
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-[3px] rounded-[3px] font-mono text-[10px] font-bold tracking-wide bg-accent-red/8 text-accent-red border border-accent-red/12">
                      PENDING
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NatoPanel>
  );
}
