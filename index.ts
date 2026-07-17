export interface CrisisEvent {
  id: string;
  title: string;
  region: string;
  coordinates: [number, number];
  threatLevel: ThreatLevel;
  category: string;
  description: string;
  timestamp: string;
  confidence: number;
  sources: string[];
}

export type ThreatLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL" | "FLASH";

export interface KpiMetric {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  unit?: string;
}

export interface ResourceUnit {
  id: string;
  name: string;
  type: string;
  status: "DEPLOYED" | "STAGING" | "STANDBY" | "RTB";
  location: string;
  coordinates: [number, number];
  personnel: number;
  readiness: number;
  eta?: string;
  mission: string;
}

export interface IntelFeedItem {
  id: string;
  classification: string;
  timestamp: string;
  source: string;
  headline: string;
  summary: string;
  confidence: number;
  region: string;
  tags: string[];
}

export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  agent?: string;
  confidence?: number;
  sources?: SourceReference[];
  timestamp: Date;
}

export interface SourceReference {
  id: string;
  title: string;
  url?: string;
  relevance: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  codename: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  capabilities: string[];
  model: string;
  systemPrompt: string;
}

export interface PredictionMetric {
  label: string;
  probability: number;
  trend: number[];
  timeframe: string;
}

export interface RegionData {
  id: string;
  name: string;
  aor: string;
  threatLevel: ThreatLevel;
  activeCrises: number;
  personnelDeployed: number;
  lastUpdate: string;
}

export interface NavItem {
  id: string;
  label: string;
  codename: string;
  icon: string;
  description: string;
}
