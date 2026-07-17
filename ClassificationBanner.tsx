"use client";

import { cn } from "@/app/lib/utils";

interface ClassificationBannerProps {
  level?: string;
  className?: string;
}

export function ClassificationBanner({
  level = "UNCLASSIFIED",
  className,
}: ClassificationBannerProps) {
  const colors: Record<string, string> = {
    UNCLASSIFIED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    CONFIDENTIAL: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
    SECRET: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "TOP SECRET": "bg-crimson/20 text-crimson border-crimson/30",
    SCI: "bg-crimson/30 text-crimson border-crimson/50 animate-pulse",
  };

  return (
    <div
      className={cn(
        "w-full py-0.5 text-center text-[10px] font-mono font-bold tracking-[0.3em] uppercase border-y",
        colors[level] || colors.UNCLASSIFIED,
        className
      )}
    >
      {level} // ATLAS SENTINEL // NOFORN // AUTHORIZED PERSONNEL ONLY
    </div>
  );
}
