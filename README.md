<div align="center">

<img src="https://img.shields.io/badge/ATLAS-SENTINEL-00d4ff?style=for-the-badge&logo=shield&logoColor=white" alt="Atlas Sentinel" />

<h3>Global Crisis Intelligence Platform</h3>

<p align="center">
  <img src="https://img.shields.io/badge/NEXT.JS-15-black?style=flat-square&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/SGP4-Orbit_Propagation-00d4ff?style=flat-square" />
</p>

<p><em>Enterprise-grade multi-agent intelligence dashboard with real-time satellite tracking, AI orchestration, and predictive analytics.</em></p>

[Quick Start](#quick-start) · [Architecture](#architecture) · [Deployment](#deployment) · [Wiki](WIKI.md)

</div>

---

## What is Atlas Sentinel?

**Atlas Sentinel** is a production-grade Global Crisis Intelligence Platform built with the architectural rigor of systems used by NATO, Palantir, Anduril, and Bloomberg Terminal. It combines real-time crisis monitoring, 3D orbital surveillance, multi-agent AI orchestration, and predictive analytics into a single, deployable application.

Named after the Titan who held the heavens and the eternal vigilance of a sentinel guard, this platform is designed for analysts, commanders, and decision-makers who need situational awareness at planetary scale.

### Why This Exists

Modern crisis intelligence is fragmented across dozens of tools, spreadsheets, and classified systems. Atlas Sentinel unifies:

- **Real-time crisis mapping** with interactive global heatmaps
- **Orbital surveillance** — 3,000+ satellites tracked in real-time via SGP4 propagation
- **Multi-agent AI** — 4 specialized intelligence agents (Orion, Cerberus, Prometheus, Athena)
- **Predictive modeling** — Escalation probability forecasting with confidence intervals
- **Resource deployment** — Live logistics tracking across 9 operational units
- **Classified intelligence feeds** — Structured data with source attribution

> *"The best intelligence platform is the one you actually want to use."*

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/YOURNAME/atlas-sentinel.git
cd atlas-sentinel

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client & run migrations
npx prisma generate
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and authenticate to access the platform.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOURNAME/atlas-sentinel)

---

## Architecture

```
atlas-sentinel/
├── app/
│   ├── api/                  # Next.js API routes (Auth, Chat, RAG, Crisis, Resources)
│   ├── components/           # React components
│   │   ├── orbit/           # 3D Satellite Visualization (Three.js + satellite.js)
│   │   ├── chat/            # AI Agent Console
│   │   ├── auth/            # Authentication forms
│   │   ├── SitrepView.tsx   # Situation Report dashboard
│   │   ├── CopView.tsx      # Common Operating Picture (interactive map)
│   │   ├── FuseView.tsx     # Data Fusion & predictive analytics
│   │   ├── LogstatView.tsx  # Logistics Status tracker
│   │   └── IntelView.tsx    # Intelligence stream
│   ├── data/                # Static datasets (crisis events, resources, intel)
│   ├── lib/                 # Utilities, auth config, Prisma client, agents
│   ├── types/               # TypeScript type definitions
│   └── hooks/               # Custom React hooks
├── components/ui/           # Radix UI primitives (shadcn/ui pattern)
├── prisma/                  # Database schema
├── docker/                  # Docker configurations
└── .github/workflows/       # CI/CD pipelines
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | React framework with SSR/SSG |
| **Language** | TypeScript 5.7 | Type-safe development |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS |
| **UI Primitives** | Radix UI | Accessible components |
| **3D Graphics** | Three.js + React Three Fiber | Satellite orbital visualization |
| **Orbit Propagation** | satellite.js | SGP4/SDP4 TLE propagation |
| **AI** | Vercel AI SDK + OpenAI | Streaming LLM responses |
| **Auth** | NextAuth.js v5 | OAuth + Credentials |
| **Database** | PostgreSQL + Prisma | Structured data persistence |
| **Deployment** | Vercel / Docker | Edge + containerized |

---

## 6 Operational Views

| View | NATO Term | Description |
|------|-----------|-------------|
| **SITREP** | Situation Report | KPIs, live threat meter, regional distribution, intel feed |
| **COP** | Common Operating Picture | Interactive SVG world heatmap with crisis markers & tooltips |
| **ORBIT** | Orbital Surveillance | Real-time 3D satellite tracking via CelesTrak TLE + SGP4 propagation |
| **FUSE** | Data Fusion | Predictive analytics, probability rings, trend forecasting |
| **LOGSTAT** | Logistics Status | 9 deployed resource cards with readiness indicators |
| **INTEL** | Intelligence | Classified stream with source attribution & confidence scoring |
| **AGENTS** | AI Agents | Multi-agent chat with Orion, Cerberus, Prometheus, Athena |

### Orbital Surveillance

The **ORBIT** view is the crown jewel of Atlas Sentinel. It visualizes approximately **3,000 active satellites** in real-time 3D space:

- **Data Source**: CelesTrak TLE (Two-Line Element) sets — fetched once every 2 hours, no API key required
- **Propagation**: SGP4 algorithm via `satellite.js` running client-side at 60 FPS
- **Categories**: Starlink constellation, GPS/GNSS, ISS & crewed vehicles, weather satellites, communications, scientific, military/reconnaissance
- **Visual Features**: 
  - Glowing satellite shell around Earth
  - Orbital trail visualization (30-minute history)
  - Coverage footprints for high-interest satellites (ISS, military)
  - Atmospheric glow and starfield background
  - Interactive camera controls (rotate, zoom, pan)

> The TLE data is cached for 2 hours and all position calculations happen locally — consuming zero API quota after the initial fetch. The sense of real-time is produced by pure physics calculations rather than polling.

### Multi-Agent AI Console

Four specialized AI agents operate within Atlas Sentinel:

| Agent | Codename | Role | Capabilities |
|-------|----------|------|-------------|
| **Orion** | ORION-7 | Strategic Analyst | Geopolitical analysis, threat assessment, scenario modeling |
| **Cerberus** | CERB-3 | Cyber Threat Hunter | APT detection, dark web monitoring, incident response |
| **Prometheus** | PROM-9 | Predictive Modeler | Escalation forecasting, risk quantification, trend analysis |
| **Athena** | ATHN-1 | Logistics Coordinator | Resource tracking, supply chain analysis, route optimization |

Each agent has a dedicated system prompt, tool access (crisis data lookup, resource status), and streams responses via the Vercel AI SDK.

---

## Design System

Atlas Sentinel uses a **semantic token system** inspired by Bloomberg Terminal and Palantir Foundry:

```css
--bg-void: #0a0a0f        /* Deep space background */
--bg-abyss: #0f1117       /* Elevated surfaces */
--accent-cyan: #00d4ff     /* Primary action / data */
--accent-amber: #f59e0b    /* Warning / attention */
--accent-crimson: #ef4444  /* Critical / FLASH alerts */
--accent-emerald: #10b981  /* Success / online */
--border-dim: #1e2129      /* Subtle dividers */
```

**Typography**: JetBrains Mono (data, labels, timestamps) + Inter (UI text)

---

## Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit: Atlas Sentinel v1.0"
git branch -M main
git remote add origin https://github.com/YOURNAME/atlas-sentinel.git
git push -u origin main

# 2. Import to Vercel
# Go to vercel.com → New Project → Import GitHub repo
# Vercel auto-detects Next.js and deploys
```

The `next.config.ts` has `output: 'export'` configured for static deployment.

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t atlas-sentinel .
docker run -p 3000:3000 atlas-sentinel
```

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/atlas_sentinel"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# OAuth (optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# AI
OPENAI_API_KEY="sk-..."

# Encryption
ENCRYPTION_KEY="your-32-char-encryption-key"
```

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

<p><em>Built for the analysts who never sleep.</em></p>

<p>
  <img src="https://img.shields.io/badge/NATO-STANAG_4609-1e3a5c?style=flat-square" />
  <img src="https://img.shields.io/badge/ISO-27001-1e3a5c?style=flat-square" />
  <img src="https://img.shields.io/badge/SGP4-Vallado_2006-1e3a5c?style=flat-square" />
</p>

</div>
