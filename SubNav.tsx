"use client";

import { ViewName } from "../page";

const views: { key: ViewName; label: string; icon: string }[] = [
  { key: "overview", label: "SITREP", icon: "◈" },
  { key: "map", label: "COP", icon: "◎" },
  { key: "analytics", label: "FUSE", icon: "◉" },
  { key: "resources", label: "LOGSTAT", icon: "◐" },
  { key: "intelligence", label: "INTEL", icon: "◆" },
];

interface SubNavProps {
  activeView: ViewName;
  onViewChange: (v: ViewName) => void;
}

export default function SubNav({ activeView, onViewChange }: SubNavProps) {
  return (
    <div className="fixed top-[84px] left-0 right-0 h-[42px] bg-secondary border-b border-border-dim flex items-center px-7 gap-0.5 z-[998]">
      {views.map((v) => (
        <button
          key={v.key}
          onClick={() => onViewChange(v.key)}
          className={`px-[18px] py-[7px] rounded-sm border-none bg-transparent font-sans text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
            activeView === v.key
              ? "bg-panel text-cyan shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.3)]"
              : "text-text-muted hover:text-text-secondary hover:bg-hover"
          }`}
        >
          <span className="text-[10px] opacity-70">{v.icon}</span>
          {v.label}
        </button>
      ))}
    </div>
  );
}
