"use client";

import { ReactNode } from "react";

interface NatoPanelProps {
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function NatoPanel({ title, icon, iconBg, iconColor, children, actions, className = "" }: NatoPanelProps) {
  return (
    <div className={`bg-panel border border-border-dim rounded-md overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-[18px] py-[13px] border-b border-border-dim bg-secondary">
        <div className="text-xs font-bold flex items-center gap-2 tracking-wide">
          <span
            className="w-[22px] h-[22px] rounded-sm flex items-center justify-center text-[11px]"
            style={{ background: iconBg, color: iconColor }}
          >
            {icon}
          </span>
          {title}
        </div>
        {actions && <div className="flex gap-1.5">{actions}</div>}
      </div>
      <div className="px-[18px] py-4">{children}</div>
    </div>
  );
}
