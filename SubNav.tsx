"use client";

import { cn } from "@/app/lib/utils";
import { NavItem } from "@/app/types";
import {
  LayoutDashboard,
  Globe,
  BrainCircuit,
  Truck,
  FileText,
  MessageSquare,
  Orbit,
} from "lucide-react";

interface SubNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems: NavItem[] = [
  {
    id: "sitrep",
    label: "SITREP",
    codename: "Situation Report",
    icon: "LayoutDashboard",
    description: "KPIs, live feed, crisis distribution",
  },
  {
    id: "cop",
    label: "COP",
    codename: "Common Operating Picture",
    icon: "Globe",
    description: "Interactive global heatmap",
  },
  {
    id: "orbit",
    label: "ORBIT",
    codename: "Orbital Surveillance",
    icon: "Orbit",
    description: "Real-time satellite tracking",
  },
  {
    id: "fuse",
    label: "FUSE",
    codename: "Data Fusion",
    icon: "BrainCircuit",
    description: "Predictive analytics & forecasting",
  },
  {
    id: "logstat",
    label: "LOGSTAT",
    codename: "Logistics Status",
    icon: "Truck",
    description: "Resource deployment tracker",
  },
  {
    id: "intel",
    label: "INTEL",
    codename: "Intelligence",
    icon: "FileText",
    description: "Classified data stream",
  },
  {
    id: "agents",
    label: "AGENTS",
    codename: "AI Agents",
    icon: "MessageSquare",
    description: "Multi-agent orchestration",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4 w-4" />,
  Globe: <Globe className="h-4 w-4" />,
  Orbit: <Orbit className="h-4 w-4" />,
  BrainCircuit: <BrainCircuit className="h-4 w-4" />,
  Truck: <Truck className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  MessageSquare: <MessageSquare className="h-4 w-4" />,
};

export function SubNav({ activeView, onViewChange }: SubNavProps) {
  return (
    <nav className="sticky top-12 z-40 w-full border-b border-border bg-abyss/90 backdrop-blur">
      <div className="flex items-center gap-1 px-2 py-1 overflow-x-auto scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "group relative flex items-center gap-2 rounded-md px-3 py-2 text-xs font-mono transition-all shrink-0",
              activeView === item.id
                ? "bg-cyan/10 text-cyan"
                : "text-slate-500 hover:bg-surface-elevated hover:text-slate-300"
            )}
          >
            {iconMap[item.icon]}
            <span className="font-bold">{item.label}</span>
            <span
              className={cn(
                "hidden text-[10px] text-slate-600 lg:inline",
                activeView === item.id && "text-cyan/60"
              )}
            >
              {item.codename}
            </span>
            {activeView === item.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
