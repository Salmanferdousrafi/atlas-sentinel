"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { TheaterName } from "../page";

const theaters: { key: TheaterName; label: string }[] = [
  { key: "global", label: "Global" },
  { key: "europe", label: "EUCOM" },
  { key: "pacific", label: "INDOPACOM" },
  { key: "central", label: "CENTCOM" },
  { key: "africa", label: "AFRICOM" },
  { key: "south", label: "SOUTHCOM" },
];

interface CommandBarProps {
  activeTheater: TheaterName;
  onTheaterChange: (t: TheaterName) => void;
}

export default function CommandBar({ activeTheater, onTheaterChange }: CommandBarProps) {
  const [zuluTime, setZuluTime] = useState("--:--:--Z");
  const [localTime, setLocalTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setZuluTime(now.toISOString().replace(/[-:T]/g, "").slice(0, 6) + "Z");
      setLocalTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="fixed top-[26px] left-0 right-0 h-[58px] bg-primary/98 backdrop-blur-2xl border-b border-border-dim flex items-center justify-between px-7 z-[999]">
      <div className="flex items-center gap-3.5">
        <div className="w-[38px] h-[38px] border-[1.5px] border-border-med rounded-sm flex items-center justify-center font-mono text-[10px] font-extrabold text-cyan bg-secondary tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          AS
        </div>
        <div>
          <div className="text-[15px] font-extrabold tracking-tight text-text-primary">Atlas Sentinel</div>
          <div className="font-mono text-[9px] text-text-muted tracking-wide uppercase mt-px">
            NATO STANAG 4609 | Multi-Theater C2 Node | ISO 27001
          </div>
        </div>
      </div>

      <div className="flex gap-0.5 bg-tertiary border border-border-dim rounded-md p-[3px]">
        {theaters.map((t) => (
          <button
            key={t.key}
            onClick={() => onTheaterChange(t.key)}
            className={`px-4 py-[7px] rounded-sm border-none bg-transparent font-sans text-[11px] font-bold uppercase tracking-wide cursor-pointer transition-all whitespace-nowrap ${
              activeTheater === t.key
                ? "bg-panel text-cyan shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.3)]"
                : "text-text-muted hover:text-text-secondary hover:bg-hover"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-[18px]">
        <div className="text-right hidden md:block">
          <div className="font-mono text-[13px] font-bold text-text-primary tracking-wider">{zuluTime}</div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-wider">Zulu Time</div>
        </div>
        <div className="text-right hidden md:block">
          <div className="font-mono text-[13px] font-bold text-text-primary tracking-wider">{localTime}</div>
          <div className="font-mono text-[9px] text-text-muted uppercase tracking-wider">Local</div>
        </div>
        <div className="px-3 py-[5px] rounded-sm bg-tertiary border border-border-dim font-mono text-[10px] font-bold text-accent-amber uppercase tracking-wider">
          Analyst
        </div>
        <div className="flex items-center gap-2 px-3 py-[5px] rounded-sm bg-accent-green/[0.06] border border-accent-green/15">
          <span className="w-[7px] h-[7px] rounded-full bg-accent-green shadow-[0_0_10px_rgba(22,163,74,0.4)] animate-secure-pulse" />
          <span className="font-mono text-[10px] font-bold text-accent-green tracking-wider">AES-256</span>
        </div>
      </div>
    </nav>
  );
}
