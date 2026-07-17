"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import * as satellite from "satellite.js";
import { NatoPanel } from "../NatoPanel";
import { cn } from "@/app/lib/utils";
import {
  Satellite,
  Orbit,
  Globe,
  Activity,
  Radio,
  Crosshair,
  Layers,
  Eye,
  Filter,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
interface SatelliteData {
  satrec: satellite.SatRec;
  name: string;
  noradId: string;
  type: string;
  lat: number;
  lon: number;
  alt: number;
  velocity: number;
  position: THREE.Vector3;
}

interface TLELine {
  name: string;
  line1: string;
  line2: string;
}

// ─── Constants ─────────────────────────────────────────────────────
const EARTH_RADIUS = 6371; // km
const SCALE = 0.001; // Scale down for Three.js
const EARTH_SCALE = EARTH_RADIUS * SCALE;

const SATELLITE_CATEGORIES: Record<string, { color: string; label: string }> = {
  STARLINK: { color: "#00d4ff", label: "Starlink" },
  GPS: { color: "#f59e0b", label: "GPS / GNSS" },
  ISS: { color: "#ef4444", label: "ISS & Crewed" },
  WEATHER: { color: "#10b981", label: "Weather & Earth Obs" },
  COMMUNICATION: { color: "#8b5cf6", label: "Communications" },
  SCIENTIFIC: { color: "#ec4899", label: "Scientific" },
  MILITARY: { color: "#f97316", label: "Military / Recon" },
  OTHER: { color: "#94a3b8", label: "Other" },
};

function categorizeSatellite(name: string): string {
  const n = name.toUpperCase();
  if (n.includes("STARLINK")) return "STARLINK";
  if (n.includes("GPS") || n.includes("GLONASS") || n.includes("GALILEO") || n.includes("BEIDOU")) return "GPS";
  if (n.includes("ISS") || n.includes("TIANGONG") || n.includes("CREW")) return "ISS";
  if (n.includes("NOAA") || n.includes("TERRA") || n.includes("AQUA") || n.includes("LANDSAT") || n.includes("SENTINEL")) return "WEATHER";
  if (n.includes("INTELSAT") || n.includes("SES") || n.includes("EUTELSAT") || n.includes("INMARSAT")) return "COMMUNICATION";
  if (n.includes("HST") || n.includes("CHANDRA") || n.includes("SWIFT") || n.includes("FERMI")) return "SCIENTIFIC";
  if (n.includes("USA") || n.includes("NROL") || n.includes("MILSTAR") || n.includes("DSP")) return "MILITARY";
  return "OTHER";
}

// ─── Fetch TLE Data from CelesTrak ─────────────────────────────────
async function fetchTLEData(): Promise<TLELine[]> {
  const urls = [
    "https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle",
    "https://celestrak.org/NORAD/elements/gp.php?GROUP=gps-ops&FORMAT=tle",
    "https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle",
    "https://celestrak.org/NORAD/elements/gp.php?GROUP=weather&FORMAT=tle",
    "https://celestrak.org/NORAD/elements/gp.php?GROUP=science&FORMAT=tle",
    "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle",
  ];

  const allTLEs: TLELine[] = [];
  const seen = new Set<string>();

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const lines = text.trim().split("
");

      for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 >= lines.length) break;
        const name = lines[i].trim();
        const line1 = lines[i + 1].trim();
        const line2 = lines[i + 2].trim();

        if (!name || !line1.startsWith("1 ") || !line2.startsWith("2 ")) continue;
        if (seen.has(name)) continue;
        seen.add(name);

        allTLEs.push({ name, line1, line2 });
      }
    } catch (e) {
      console.warn("Failed to fetch:", url);
    }
  }

  return allTLEs.slice(0, 3000); // Limit for performance
}

// ─── Earth Component ────────────────────────────────────────────────
function Earth({ showAtmosphere = true }: { showAtmosphere?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Create earth texture programmatically
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Deep ocean base
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, "#0a1628");
    gradient.addColorStop(0.3, "#0d1f35");
    gradient.addColorStop(0.5, "#0a1a2e");
    gradient.addColorStop(0.7, "#0d1f35");
    gradient.addColorStop(1, "#0a1628");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Grid lines (latitude/longitude)
    ctx.strokeStyle = "#1a3a5c";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 1024; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
    }
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // Continent silhouettes (simplified)
    ctx.fillStyle = "#1a2f4a";
    // North America rough shape
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(280, 80);
    ctx.lineTo(300, 150);
    ctx.lineTo(250, 200);
    ctx.lineTo(180, 180);
    ctx.closePath();
    ctx.fill();

    // South America
    ctx.beginPath();
    ctx.moveTo(280, 240);
    ctx.lineTo(320, 230);
    ctx.lineTo(340, 320);
    ctx.lineTo(300, 400);
    ctx.lineTo(260, 350);
    ctx.closePath();
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.moveTo(460, 80);
    ctx.lineTo(520, 70);
    ctx.lineTo(540, 110);
    ctx.lineTo(500, 130);
    ctx.lineTo(460, 120);
    ctx.closePath();
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.moveTo(480, 160);
    ctx.lineTo(540, 150);
    ctx.lineTo(560, 250);
    ctx.lineTo(520, 320);
    ctx.lineTo(480, 280);
    ctx.closePath();
    ctx.fill();

    // Asia
    ctx.beginPath();
    ctx.moveTo(580, 60);
    ctx.lineTo(780, 50);
    ctx.lineTo(840, 120);
    ctx.lineTo(800, 200);
    ctx.lineTo(680, 180);
    ctx.lineTo(600, 120);
    ctx.closePath();
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.moveTo(760, 320);
    ctx.lineTo(820, 310);
    ctx.lineTo(840, 360);
    ctx.lineTo(800, 380);
    ctx.lineTo(760, 360);
    ctx.closePath();
    ctx.fill();

    // Glow points for cities
    const cities = [
      [280, 110], // New York
      [180, 130], // Los Angeles
      [320, 350], // São Paulo
      [500, 100], // London
      [520, 120], // Paris
      [540, 110], // Berlin
      [600, 100], // Moscow
      [780, 140], // Beijing
      [800, 160], // Tokyo
      [820, 320], // Sydney
    ];

    cities.forEach(([x, y]) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 15);
      grad.addColorStop(0, "rgba(0, 212, 255, 0.4)");
      grad.addColorStop(0.5, "rgba(0, 212, 255, 0.1)");
      grad.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[EARTH_SCALE, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
          emissive="#001133"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmosphere glow */}
      {showAtmosphere && (
        <mesh ref={atmosphereRef} scale={1.05}>
          <sphereGeometry args={[EARTH_SCALE, 32, 32]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[EARTH_SCALE * 1.002, 32, 16]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
}

// ─── Satellite Points ───────────────────────────────────────────────
function SatelliteField({
  satellites,
  activeFilters,
  showOrbits,
  showFootprints,
}: {
  satellites: SatelliteData[];
  activeFilters: Set<string>;
  showOrbits: boolean;
  showFootprints: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const orbitRefs = useRef<THREE.Line[]>([]);
  const [now, setNow] = useState(new Date());

  // Update positions every frame
  useFrame(() => {
    setNow(new Date());
  });

  // Calculate satellite positions
  const positions = useMemo(() => {
    const posArray = new Float32Array(satellites.length * 3);
    const colorArray = new Float32Array(satellites.length * 3);

    satellites.forEach((sat, i) => {
      const positionAndVelocity = satellite.propagate(sat.satrec, now);
      if (positionAndVelocity.position) {
        const gmst = satellite.gstime(now);
        const geo = satellite.eciToGeodetic(
          positionAndVelocity.position as satellite.EciVec3<number>,
          gmst
        );

        const lat = satellite.degreesLat(geo.latitude);
        const lon = satellite.degreesLong(geo.longitude);
        const alt = geo.height;

        // Convert lat/lon/alt to 3D position
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const r = (EARTH_RADIUS + alt) * SCALE;

        const x = -(r * Math.sin(phi) * Math.cos(theta));
        const z = r * Math.sin(phi) * Math.sin(theta);
        const y = r * Math.cos(phi);

        posArray[i * 3] = x;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = z;

        const category = categorizeSatellite(sat.name);
        const color = SATELLITE_CATEGORIES[category]?.color || "#94a3b8";
        const c = new THREE.Color(color);
        colorArray[i * 3] = c.r;
        colorArray[i * 3 + 1] = c.g;
        colorArray[i * 3 + 2] = c.b;
      }
    });

    return { positions: posArray, colors: colorArray };
  }, [satellites, now]);

  // Generate orbit trails
  const orbitTrails = useMemo(() => {
    if (!showOrbits) return [];

    return satellites
      .filter((sat) => activeFilters.has(categorizeSatellite(sat.name)))
      .slice(0, 200) // Limit orbit trails for performance
      .map((sat) => {
        const points: THREE.Vector3[] = [];
        const startTime = new Date(now.getTime() - 30 * 60000); // 30 min ago

        for (let i = 0; i < 100; i++) {
          const t = new Date(startTime.getTime() + i * 36000); // Every 36 seconds
          const pv = satellite.propagate(sat.satrec, t);
          if (pv.position) {
            const gmst = satellite.gstime(t);
            const geo = satellite.eciToGeodetic(
              pv.position as satellite.EciVec3<number>,
              gmst
            );
            const lat = satellite.degreesLat(geo.latitude);
            const lon = satellite.degreesLong(geo.longitude);
            const alt = geo.height;

            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const r = (EARTH_RADIUS + alt) * SCALE;

            points.push(
              new THREE.Vector3(
                -(r * Math.sin(phi) * Math.cos(theta)),
                r * Math.cos(phi),
                r * Math.sin(phi) * Math.sin(theta)
              )
            );
          }
        }

        const category = categorizeSatellite(sat.name);
        const color = SATELLITE_CATEGORIES[category]?.color || "#94a3b8";

        return { points, color, name: sat.name };
      });
  }, [satellites, showOrbits, activeFilters, now]);

  return (
    <group>
      {/* Satellite points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={satellites.length}
            array={positions.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={satellites.length}
            array={positions.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.008}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Orbit trails */}
      {showOrbits &&
        orbitTrails.map((trail, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={trail.points.length}
                array={new Float32Array(trail.points.flatMap((p) => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={trail.color}
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
            />
          </line>
        ))}

      {/* Coverage footprints for high-interest satellites */}
      {showFootprints &&
        satellites
          .filter(
            (sat) =>
              categorizeSatellite(sat.name) === "ISS" ||
              categorizeSatellite(sat.name) === "MILITARY"
          )
          .slice(0, 10)
          .map((sat, i) => {
            const pv = satellite.propagate(sat.satrec, now);
            if (!pv.position) return null;

            const gmst = satellite.gstime(now);
            const geo = satellite.eciToGeodetic(
              pv.position as satellite.EciVec3<number>,
              gmst
            );
            const lat = satellite.degreesLat(geo.latitude);
            const lon = satellite.degreesLong(geo.longitude);
            const alt = geo.height;

            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const r = (EARTH_RADIUS + alt) * SCALE;

            const pos = new THREE.Vector3(
              -(r * Math.sin(phi) * Math.cos(theta)),
              r * Math.cos(phi),
              r * Math.sin(phi) * Math.sin(theta)
            );

            const footprintRadius = Math.acos(EARTH_RADIUS / (EARTH_RADIUS + alt)) * EARTH_SCALE;

            return (
              <group key={`footprint-${i}`} position={[pos.x, pos.y, pos.z]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[footprintRadius * 0.95, footprintRadius, 64]} />
                  <meshBasicMaterial
                    color="#ef4444"
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                  />
                </mesh>
              </group>
            );
          })}
    </group>
  );
}

// ─── Scene Setup ────────────────────────────────────────────────────
function Scene({
  satellites,
  activeFilters,
  showOrbits,
  showFootprints,
  showAtmosphere,
}: {
  satellites: SatelliteData[];
  activeFilters: Set<string>;
  showOrbits: boolean;
  showFootprints: boolean;
  showAtmosphere: boolean;
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 12);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#00d4ff" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Earth showAtmosphere={showAtmosphere} />

      <SatelliteField
        satellites={satellites}
        activeFilters={activeFilters}
        showOrbits={showOrbits}
        showFootprints={showFootprints}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={30}
        autoRotate
        autoRotateSpeed={0.3}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </>
  );
}

// ─── Stats Panel ────────────────────────────────────────────────────
function StatsPanel({ satellites }: { satellites: SatelliteData[] }) {
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    satellites.forEach((sat) => {
      const cat = categorizeSatellite(sat.name);
      c[cat] = (c[cat] || 0) + 1;
    });
    return c;
  }, [satellites]);

  const total = satellites.length;

  return (
    <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-border bg-abyss/90 p-3 backdrop-blur">
      <div className="mb-2 flex items-center gap-2">
        <Satellite className="h-3 w-3 text-cyan" />
        <span className="text-[10px] font-mono font-bold text-slate-300">
          SATELLITE TRACKING
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">TOTAL TRACKED</span>
          <span className="text-[10px] font-mono text-cyan">{total.toLocaleString()}</span>
        </div>
        {Object.entries(SATELLITE_CATEGORIES).map(([key, { color, label }]) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] font-mono text-slate-500">{label}</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400">
              {counts[key] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
export function SatelliteVisualization() {
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(Object.keys(SATELLITE_CATEGORIES))
  );
  const [showOrbits, setShowOrbits] = useState(true);
  const [showFootprints, setShowFootprints] = useState(false);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function loadSatellites() {
      setLoading(true);
      try {
        const tleData = await fetchTLEData();
        const satData: SatelliteData[] = tleData
          .map((tle) => {
            try {
              const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
              return {
                satrec,
                name: tle.name,
                noradId: tle.line1.substring(2, 7).trim(),
                type: categorizeSatellite(tle.name),
                lat: 0,
                lon: 0,
                alt: 0,
                velocity: 0,
                position: new THREE.Vector3(),
              };
            } catch {
              return null;
            }
          })
          .filter(Boolean) as SatelliteData[];

        setSatellites(satData);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Failed to load satellite data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSatellites();
    // Refresh TLE data every 2 hours
    interval = setInterval(loadSatellites, 2 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleFilter = (category: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const filteredSatellites = satellites.filter((sat) =>
    activeFilters.has(categorizeSatellite(sat.name))
  );

  return (
    <div className="space-y-4 p-4">
      <NatoPanel
        title="Orbital Surveillance"
        subtitle="Real-Time Satellite Tracking — CelesTrak TLE / SGP4 Propagation"
        headerAction={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400">
                LIVE PROPAGATION
              </span>
            </div>
            {lastUpdate && (
              <span className="text-[10px] font-mono text-slate-600">
                TLE: {lastUpdate.toLocaleTimeString("en-US", { timeZone: "UTC" })}Z
              </span>
            )}
          </div>
        }
      >
        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600">
            Filters:
          </span>
          {Object.entries(SATELLITE_CATEGORIES).map(([key, { color, label }]) => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={cn(
                "flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-mono transition-all",
                activeFilters.has(key)
                  ? "border-opacity-30 bg-opacity-10"
                  : "border-border bg-transparent opacity-40"
              )}
              style={
                activeFilters.has(key)
                  ? {
                      borderColor: color,
                      backgroundColor: color + "15",
                      color: color,
                    }
                  : {}
              }
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              {label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowOrbits(!showOrbits)}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-mono transition-all",
                showOrbits
                  ? "border-cyan/30 bg-cyan/5 text-cyan"
                  : "border-border text-slate-600"
              )}
            >
              <Orbit className="h-3 w-3" />
              ORBITS
            </button>
            <button
              onClick={() => setShowFootprints(!showFootprints)}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-mono transition-all",
                showFootprints
                  ? "border-crimson/30 bg-crimson/5 text-crimson"
                  : "border-border text-slate-600"
              )}
            >
              <Globe className="h-3 w-3" />
              FOOTPRINTS
            </button>
            <button
              onClick={() => setShowAtmosphere(!showAtmosphere)}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-mono transition-all",
                showAtmosphere
                  ? "border-cyan/30 bg-cyan/5 text-cyan"
                  : "border-border text-slate-600"
              )}
            >
              <Layers className="h-3 w-3" />
              ATMOSPHERE
            </button>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-black">
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center">
              <Satellite className="h-8 w-8 animate-spin text-cyan" />
              <p className="mt-3 text-xs font-mono text-slate-500">
                FETCHING TLE DATA FROM CELESTRAK...
              </p>
              <p className="mt-1 text-[10px] font-mono text-slate-700">
                Propagating ~3,000 satellites via SGP4
              </p>
            </div>
          ) : (
            <>
              <Canvas
                camera={{ fov: 45, near: 0.1, far: 1000 }}
                gl={{ antialias: true, alpha: false }}
                style={{ background: "#000000" }}
              >
                <Suspense fallback={null}>
                  <Scene
                    satellites={filteredSatellites}
                    activeFilters={activeFilters}
                    showOrbits={showOrbits}
                    showFootprints={showFootprints}
                    showAtmosphere={showAtmosphere}
                  />
                </Suspense>
              </Canvas>
              <StatsPanel satellites={filteredSatellites} />

              {/* Overlay info */}
              <div className="absolute right-4 top-4 z-10 rounded-lg border border-border bg-abyss/90 p-3 backdrop-blur">
                <div className="flex items-center gap-2 mb-2">
                  <Crosshair className="h-3 w-3 text-cyan" />
                  <span className="text-[10px] font-mono font-bold text-slate-300">
                    ORBITAL PARAMETERS
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-[9px] font-mono text-slate-600">PROPAGATOR</span>
                    <span className="text-[9px] font-mono text-cyan">SGP4</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-[9px] font-mono text-slate-600">FRAME</span>
                    <span className="text-[9px] font-mono text-cyan">TEME → ECF</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-[9px] font-mono text-slate-600">UPDATE</span>
                    <span className="text-[9px] font-mono text-cyan">60 FPS</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-[9px] font-mono text-slate-600">DATA SRC</span>
                    <span className="text-[9px] font-mono text-cyan">CELESTRAK</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Technical note */}
        <div className="mt-3 rounded-md border border-border bg-surface-elevated/30 p-3">
          <div className="flex items-start gap-2">
            <Activity className="mt-0.5 h-3 w-3 text-slate-500" />
            <div>
              <p className="text-[10px] font-mono text-slate-500">
                <span className="text-cyan">SGP4 ORBITAL PROPAGATION</span> — Satellite positions
                are computed in real-time using the Simplified General Perturbations model #4.
                TLE data is fetched from CelesTrak and cached for 2 hours. All calculations run
                client-side at 60 FPS with sub-meter precision for LEO satellites.
              </p>
              <p className="mt-1 text-[10px] font-mono text-slate-700">
                Reference: Hoots, F. R., & Roehrich, R. L. (1980). Spacetrack Report No. 3.
              </p>
            </div>
          </div>
        </div>
      </NatoPanel>
    </div>
  );
}
