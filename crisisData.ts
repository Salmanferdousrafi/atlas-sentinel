export interface FeedItem {
  time: string;
  title: string;
  desc: string;
  severity: "crit" | "high" | "med";
  tags: string[];
}

export const feedData: FeedItem[] = [
  {
    time: "162214Z",
    title: "FLASH: Armored convoy movement detected Kursk Oblast",
    desc: "IMINT confirms 200+ MBT and IFV formations 14km east of international border. SIGINT intercepts indicate offensive prep window T+48 to T+72 hours. J2 assessment: HIGH probability of escalation.",
    severity: "crit",
    tags: ["EUCOM", "IMINT", "SIGINT", "J2"],
  },
  {
    time: "161833Z",
    title: "Hurricane Delta intensifies to Category 4",
    desc: "NHC advisory: Sustained winds 240 km/h, gusts to 285 km/h. Coastal evacuation orders expanded to 5 counties. SOUTHCOM JOC activated. Estimated landfall T+36H.",
    severity: "crit",
    tags: ["SOUTHCOM", "NHC", "NAT-DIS"],
  },
  {
    time: "160907Z",
    title: "Cyber intrusion on ASEAN power grid SCADA",
    desc: "APT29 indicators detected on critical infrastructure nodes in 3 member states. Defensive cyber operations activated. CISA and NCSC coordinating response. Attribution: 72% confidence.",
    severity: "high",
    tags: ["INDOPACOM", "CYBER", "APT29", "CISA"],
  },
  {
    time: "155541Z",
    title: "UN OCHA convoy crosses into Gaza Strip",
    desc: "Humanitarian corridor established at Rafah crossing. 400 tonnes medical supplies, 200 tonnes food. IDF coordination confirmed. ETA field hospital T+4H.",
    severity: "med",
    tags: ["CENTCOM", "UN-OCHA", "HUM"],
  },
  {
    time: "154219Z",
    title: "Civil unrest escalation — Caracas",
    desc: "OSINT confirms 50,000+ demonstrators in Plaza Bolivar. National Guard deployed with tear gas. Road closures on Autopista Regional. US Embassy issuing security alert.",
    severity: "high",
    tags: ["SOUTHCOM", "OSINT", "CIV-UNREST"],
  },
  {
    time: "152855Z",
    title: "Tsunami warning downgraded to advisory",
    desc: "PTWC: Pacific earthquake aftershocks diminishing. Magnitude aftershock sequence below threshold. Coastal residents may return with caution. Maritime traffic resuming.",
    severity: "med",
    tags: ["INDOPACOM", "PTWC", "NAT-DIS"],
  },
  {
    time: "151522Z",
    title: "Back-channel ceasefire negotiations initiated",
    desc: "Qatar-mediated talks between conflicting parties confirmed. Third-party mediator (Norwegian diplomat) en route to Doha. INTEL assessment: 45% probability of 72-hour truce within T+96H.",
    severity: "med",
    tags: ["CENTCOM", "DIPLO", "HUMINT"],
  },
  {
    time: "145848Z",
    title: "Red Sea shipping insurance market flash crash",
    desc: "Lloyd's of London: Marine war risk premiums spiked 340% in 4 hours. 12 vessels rerouted via Cape of Good Hope. Supply chain delay estimate: +14 days. WTO monitoring.",
    severity: "high",
    tags: ["GLOBAL", "ECON", "MARITIME"],
  },
  {
    time: "144511Z",
    title: "DDoS campaign against Baltic state gov portals",
    desc: "CERT-EU and NATO CCDCOE reporting sustained volumetric attacks. Peak: 1.2 Tbps. Defensive measures holding. Attribution assessment: State-sponsored actor, 89% confidence.",
    severity: "crit",
    tags: ["EUCOM", "CYBER", "NATO-CCDCOE"],
  },
  {
    time: "143329Z",
    title: "Militia movement detected South Sudan border",
    desc: "HUMINT source H-17 reports irregular forces massing 8km north of Nimule. UNMISS patrols diverting. No engagement reported. J2 monitoring.",
    severity: "med",
    tags: ["AFRICOM", "HUMINT", "UNMISS"],
  },
];

export interface RegionData {
  name: string;
  value: number;
  color: string;
}

export const regionData: RegionData[] = [
  { name: "EUCOM", value: 14, color: "#dc2626" },
  { name: "CENTCOM", value: 11, color: "#dc2626" },
  { name: "AFRICOM", value: 9, color: "#f59e0b" },
  { name: "INDOPACOM", value: 8, color: "#f59e0b" },
  { name: "SOUTHCOM", value: 6, color: "#06b6d4" },
  { name: "GLOBAL", value: 4, color: "#06b6d4" },
];

export interface TypeData {
  name: string;
  value: number;
  color: string;
}

export const typeData: TypeData[] = [
  { name: "Conflict", value: 21, color: "#dc2626" },
  { name: "Natural Disaster", value: 13, color: "#f59e0b" },
  { name: "Cyber", value: 9, color: "#a855f7" },
  { name: "Humanitarian", value: 7, color: "#06b6d4" },
  { name: "Economic", value: 2, color: "#16a34a" },
];

export interface EffectivenessData {
  name: string;
  value: number;
  color: string;
}

export const effectivenessData: EffectivenessData[] = [
  { name: "Medical Response", value: 94, color: "#16a34a" },
  { name: "Evacuation (NEO)", value: 89, color: "#16a34a" },
  { name: "Cyber Defense", value: 81, color: "#06b6d4" },
  { name: "Supply Chain", value: 68, color: "#f59e0b" },
  { name: "Diplomatic", value: 56, color: "#f59e0b" },
  { name: "Conflict Mediation", value: 43, color: "#dc2626" },
];

export interface ResourceData {
  type: string;
  name: string;
  location: string;
  status: string;
  progress: number;
  category: string;
}

export const resourcesData: ResourceData[] = [
  { type: "Medical", name: "Field Hospital Alpha (Role 2+)", location: "Rzeszów, PL (50.04°N 22.00°E)", status: "deployed", progress: 96, category: "res-ok" },
  { type: "Military", name: "V Corps — Rapid Response Bn", location: "Eastern Poland (51.20°N 23.50°E)", status: "deployed", progress: 100, category: "res-crit" },
  { type: "Humanitarian", name: "UN OCHA Corridor Team Bravo", location: "Rafah Crossing (31.28°N 34.25°E)", status: "staging", progress: 71, category: "res-warn" },
  { type: "Cyber", name: "NATO CCDCOE Blue Team", location: "Tallinn, EE (59.43°N 24.75°E)", status: "deployed", progress: 92, category: "res-ok" },
  { type: "Logistics", name: "Air Bridge Op ATLANTIC LIFT", location: "Ramstein AB (49.44°N 7.60°E)", status: "standby", progress: 48, category: "res-info" },
  { type: "Medical", name: "USNS Comfort (T-AH-20)", location: "Gulf of Mexico (25.00°N 90.00°W)", status: "deployed", progress: 94, category: "res-ok" },
  { type: "Military", name: "CTF-153 — Naval Task Force", location: "Red Sea (20.00°N 38.00°E)", status: "deployed", progress: 100, category: "res-crit" },
  { type: "Humanitarian", name: "WFP Emergency Response", location: "Port Sudan (19.62°N 37.22°E)", status: "deployed", progress: 78, category: "res-warn" },
  { type: "Cyber", name: "NSA/CSS Threat Intel Cell", location: "Fort Meade, MD (39.11°N 76.74°W)", status: "deployed", progress: 97, category: "res-ok" },
];

export interface IntelRow {
  time: string;
  source: string;
  region: string;
  classification: string;
  summary: string;
  confidence: string;
  status: string;
}

export const intelData: IntelRow[] = [
  { time: "162214Z JUL", source: "SIGINT", region: "EUCOM", classification: "critical", summary: "Encrypted military comms spike 400% — Kursk axis", confidence: "98%", status: "ack" },
  { time: "161833Z JUL", source: "IMINT", region: "SOUTHCOM", classification: "critical", summary: "Hurricane eye wall formation confirmed — GOES-16", confidence: "99%", status: "ack" },
  { time: "160907Z JUL", source: "CYBER", region: "INDOPACOM", classification: "high", summary: "C2 beacon detected on ASEAN SCADA network", confidence: "94%", status: "ack" },
  { time: "155541Z JUL", source: "HUMINT", region: "CENTCOM", classification: "moderate", summary: "UN convoy GPS confirmed at waypoint 7 — Rafah", confidence: "100%", status: "ack" },
  { time: "154219Z JUL", source: "OSINT", region: "SOUTHCOM", classification: "high", summary: "Geotagged protest imagery: 50k+ crowd — Caracas", confidence: "87%", status: "ack" },
  { time: "152855Z JUL", source: "IMINT", region: "INDOPACOM", classification: "moderate", summary: "Thermal anomaly reduced 60% post-quake — Pacific", confidence: "92%", status: "ack" },
  { time: "151522Z JUL", source: "SIGINT", region: "CENTCOM", classification: "moderate", summary: "Diplomatic frequency chatter increase — Doha channel", confidence: "76%", status: "ack" },
  { time: "145848Z JUL", source: "OSINT", region: "GLOBAL", classification: "high", summary: "Insurance market flash crash — Lloyd's London", confidence: "89%", status: "ack" },
  { time: "144511Z JUL", source: "CYBER", region: "EUCOM", classification: "critical", summary: "DDoS attack on Baltic state gov portals — 1.2 Tbps", confidence: "96%", status: "pending" },
  { time: "143329Z JUL", source: "HUMINT", region: "AFRICOM", classification: "moderate", summary: "Local militia movement toward border — South Sudan", confidence: "72%", status: "ack" },
];

export const trendMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
export const trendValues = [34, 41, 38, 46, 49, 52];

export const mapRegions: Record<string, { name: string; crises: number; sev: string; sevClass: string; lat: string; lon: string }> = {
  na: { name: "NORTH AMERICA", crises: 4, sev: "NORMAL", sevClass: "nb-med", lat: "45.000°N", lon: "100.000°W" },
  sa: { name: "SOUTH AMERICA", crises: 6, sev: "ELEVATED", sevClass: "nb-high", lat: "15.000°S", lon: "60.000°W" },
  eu: { name: "EUROPE (EUCOM)", crises: 14, sev: "CRITICAL", sevClass: "nb-crit", lat: "50.000°N", lon: "15.000°E" },
  ru: { name: "RUSSIA / CENTRAL ASIA", crises: 8, sev: "CRITICAL", sevClass: "nb-crit", lat: "60.000°N", lon: "60.000°E" },
  me: { name: "MIDDLE EAST (CENTCOM)", crises: 11, sev: "CRITICAL", sevClass: "nb-crit", lat: "30.000°N", lon: "45.000°E" },
  ea: { name: "EAST AFRICA (AFRICOM)", crises: 9, sev: "ELEVATED", sevClass: "nb-high", lat: "5.000°N", lon: "35.000°E" },
  nafr: { name: "NORTH AFRICA (AFRICOM)", crises: 5, sev: "ELEVATED", sevClass: "nb-high", lat: "25.000°N", lon: "10.000°E" },
  "sa-asia": { name: "SOUTH ASIA (INDOPACOM)", crises: 8, sev: "ELEVATED", sevClass: "nb-high", lat: "25.000°N", lon: "80.000°E" },
  sea: { name: "SOUTHEAST ASIA (INDOPACOM)", crises: 6, sev: "ELEVATED", sevClass: "nb-high", lat: "10.000°N", lon: "110.000°E" },
  "ea-asia": { name: "EAST ASIA (INDOPACOM)", crises: 7, sev: "NORMAL", sevClass: "nb-med", lat: "35.000°N", lon: "120.000°E" },
  oc: { name: "OCEANIA (INDOPACOM)", crises: 2, sev: "NORMAL", sevClass: "nb-med", lat: "25.000°S", lon: "140.000°E" },
  ca: { name: "CENTRAL AMERICA (SOUTHCOM)", crises: 5, sev: "ELEVATED", sevClass: "nb-high", lat: "15.000°N", lon: "90.000°W" },
};
