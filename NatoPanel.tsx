"use client";

import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

interface NatoPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function NatoPanel({
  title,
  subtitle,
  children,
  className,
  headerAction,
}: NatoPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface-elevated/50 px-4 py-3">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[10px] font-mono text-slate-600">
              {subtitle}
            </p>
          )}
        </div>
        {headerAction}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
