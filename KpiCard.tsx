"use client";

interface KpiCardProps {
  label: string;
  value: string;
  badge: string;
  badgeClass: string;
  valueClass: string;
  delta: string;
  deltaClass: string;
  variant?: "critical" | "warning" | "success" | "default";
}

const beforeColors = {
  critical: "before:bg-accent-red",
  warning: "before:bg-accent-amber",
  success: "before:bg-accent-green",
  default: "before:bg-cyan",
};

export default function KpiCard({
  label,
  value,
  badge,
  badgeClass,
  valueClass,
  delta,
  deltaClass,
  variant = "default",
}: KpiCardProps) {
  return (
    <div
      className={`bg-panel border border-border-dim rounded-md px-[18px] py-4 relative transition-all hover:border-border-med hover:-translate-y-px hover:shadow-md ${
        beforeColors[variant]
      } before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:opacity-70 before:rounded-t-md`}
    >
      <div className="flex justify-between items-start mb-2.5">
        <span className="font-mono text-[9px] font-bold text-text-muted uppercase tracking-wider">{label}</span>
        <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] tracking-wide ${badgeClass}`}>
          {badge}
        </span>
      </div>
      <div className={`font-mono text-2xl font-bold tracking-tight mb-1.5 ${valueClass}`}>{value}</div>
      <div className={`font-mono text-[10px] font-semibold flex items-center gap-1 ${deltaClass}`}>{delta}</div>
    </div>
  );
}
