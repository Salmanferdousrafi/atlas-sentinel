"use client";

import { useState, useEffect } from "react";
import { Shield, Clock, Lock, Radio, Activity } from "lucide-react";
import { formatDTG, formatZuluTime } from "@/app/lib/utils";
import { useSession } from "next-auth/react";

export function CommandBar() {
  const [zuluTime, setZuluTime] = useState("");
  const [dtg, setDtg] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setZuluTime(formatZuluTime(now));
      setDtg(formatDTG(now));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-abyss/95 backdrop-blur supports-[backdrop-filter]:bg-abyss/80">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan" />
            <span className="text-sm font-bold tracking-wider text-slate-100">
              ATLAS SENTINEL
            </span>
            <span className="hidden text-[10px] font-mono text-slate-600 sm:inline">
              v2.4.1-BETA
            </span>
          </div>
          <div className="hidden h-4 w-px bg-border md:block" />
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1.5">
              <Radio className="h-3 w-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400">
                SYS-ONLINE
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-cyan" />
              <span className="text-[10px] font-mono text-cyan">AES-256</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-amber-400" />
              <span className="text-[10px] font-mono text-amber-400">
                LATENCY 24ms
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <Clock className="h-3 w-3 text-slate-500" />
            <span className="text-[10px] font-mono text-slate-400">{dtg}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-cyan">{zuluTime}</span>
          </div>
          {session?.user && (
            <div className="flex items-center gap-2 border-l border-border pl-4">
              <div className="h-6 w-6 rounded-full bg-cyan/10 flex items-center justify-center">
                <span className="text-[10px] font-mono text-cyan">
                  {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
                </span>
              </div>
              <span className="hidden text-[10px] font-mono text-slate-400 lg:inline">
                {session.user.clearance || "UNCLASSIFIED"}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
