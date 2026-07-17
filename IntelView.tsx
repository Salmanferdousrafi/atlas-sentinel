"use client";

import { useState } from "react";
import { NatoPanel } from "./NatoPanel";
import { intelFeed } from "@/app/data/crisisData";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/app/lib/utils";
import { FileText, Eye, Tag, Shield } from "lucide-react";

export function IntelView() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="space-y-4 p-4">
      <NatoPanel
        title="Intelligence Stream"
        subtitle="Classified — All Sources"
        headerAction={
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-crimson" />
            <span className="text-[10px] font-mono text-crimson">
              TS/SCI CLEARED
            </span>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Report List */}
          <ScrollArea className="h-[600px] lg:col-span-1">
            <div className="space-y-2 pr-3">
              {intelFeed.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedReport(item.id)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-all",
                    selectedReport === item.id
                      ? "border-cyan/30 bg-cyan/5"
                      : "border-border bg-surface hover:bg-surface-elevated"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        item.classification
                          .toLowerCase()
                          .replace(" ", "") as any
                      }
                      className="text-[9px]"
                    >
                      {item.classification}
                    </Badge>
                    <span className="text-[9px] font-mono text-slate-600">
                      {item.id}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-slate-200">
                    {item.headline}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] font-mono text-slate-600">
                      {item.source}
                    </span>
                    <span className="text-slate-700">|</span>
                    <span className="text-[9px] font-mono text-cyan/60">
                      {(item.confidence * 100).toFixed(0)}% CONF
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Report Detail */}
          <div className="rounded-lg border border-border bg-surface p-4 lg:col-span-2">
            {selectedReport ? (
              (() => {
                const report = intelFeed.find((i) => i.id === selectedReport);
                if (!report) return null;
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              report.classification
                                .toLowerCase()
                                .replace(" ", "") as any
                            }
                          >
                            {report.classification}
                          </Badge>
                          <span className="text-[10px] font-mono text-slate-600">
                            {report.id}
                          </span>
                        </div>
                        <h2 className="mt-2 text-lg font-bold text-slate-100">
                          {report.headline}
                        </h2>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-slate-500">
                          {new Date(report.timestamp).toLocaleString("en-US", {
                            timeZone: "UTC",
                          })}{" "}
                          Z
                        </p>
                        <p className="text-[10px] font-mono text-cyan/60">
                          CONFIDENCE: {(report.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Source
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">
                          {report.source}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Summary
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300">
                          {report.summary}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Region
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">
                          {report.region}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Tags
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {report.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-surface-elevated px-2 py-1 text-[10px] font-mono text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-lg border border-border bg-surface-elevated/30 p-3">
                        <div className="flex items-center gap-2">
                          <Eye className="h-3 w-3 text-slate-500" />
                          <span className="text-[10px] font-mono text-slate-500">
                            ANALYSIS NOTES
                          </span>
                        </div>
                        <p className="mt-2 text-xs italic text-slate-500">
                          Cross-reference with SIGINT-2026-0847 and IMINT-2026-0312.
                          Analyst assessment: High confidence in attribution.
                          Recommend immediate distribution to J2 and J3.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-20 text-slate-600">
                <FileText className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-sm font-mono">
                  Select a report to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </NatoPanel>
    </div>
  );
}
