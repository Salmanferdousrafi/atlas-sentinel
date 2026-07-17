import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDTG(date: Date = new Date()): string {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const day = days[date.getUTCDay()];
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const mmStr = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(-2);
  return `${day} ${dd}${hh}${mm}Z ${mmStr}${yy}`;
}

export function formatZuluTime(date: Date = new Date()): string {
  return date.toISOString().replace("T", " ").slice(0, 19) + "Z";
}

export function getThreatColor(level: string): string {
  const map: Record<string, string> = {
    LOW: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    MODERATE: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    HIGH: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    CRITICAL: "text-crimson bg-crimson/10 border-crimson/30",
    FLASH: "text-crimson bg-crimson/20 border-crimson/50 animate-pulse-glow",
  };
  return map[level] || map.LOW;
}

export function getThreatHex(level: string): string {
  const map: Record<string, string> = {
    LOW: "#10b981",
    MODERATE: "#f59e0b",
    HIGH: "#f97316",
    CRITICAL: "#ef4444",
    FLASH: "#ef4444",
  };
  return map[level] || "#10b981";
}

export function getClassificationColor(level: string): string {
  const map: Record<string, string> = {
    UNCLASSIFIED: "text-slate-400 bg-slate-400/10 border-slate-400/30",
    CONFIDENTIAL: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    SECRET: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    "TOP SECRET": "text-crimson bg-crimson/10 border-crimson/30",
  };
  return map[level] || map.UNCLASSIFIED;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
