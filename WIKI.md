# Atlas Sentinel — Technical Wiki

> *"The heavens declare the glory of God; the skies proclaim the work of his hands."* — Psalm 19:1
>
> *We simply built better binoculars.*

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Data Flow](#data-flow)
3. [Authentication & Authorization](#authentication--authorization)
4. [Orbital Surveillance System](#orbital-surveillance-system)
5. [AI Agent Architecture](#ai-agent-architecture)
6. [RAG Pipeline](#rag-pipeline)
7. [Database Schema](#database-schema)
8. [API Reference](#api-reference)
9. [Deployment Guide](#deployment-guide)
10. [Security Posture](#security-posture)
11. [Contributing](#contributing)

---

## System Architecture

Atlas Sentinel follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐   │
│  │ SITREP  │ │   COP   │ │  ORBIT  │ │  AGENTS (Chat)  │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                        │
│  │  FUSE   │ │ LOGSTAT │ │  INTEL  │                        │
│  └─────────┘ └─────────┘ └─────────┘                        │
├─────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐    │
│  │  Next.js API  │ │  AI SDK      │ │  Auth (NextAuth) │    │
│  │  Routes       │ │  Streaming   │ │  v5              │    │
│  └──────────────┘ └──────────────┘ └──────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    DATA LAYER                                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐    │
│  │  PostgreSQL   │ │  Prisma ORM  │ │  CelesTrak TLE   │    │
│  │  (Primary)    │ │  (Type-safe) │ │  (External)      │    │
│  └──────────────┘ └──────────────┘ └──────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Static Export for Vercel**: The `output: 'export'` configuration enables instant deployment without a Node.js runtime. For dynamic features (auth, chat), use Server Actions or API routes with Edge runtime.

2. **Client-Side Orbit Propagation**: All SGP4 calculations run in the browser. TLE data is fetched once every 2 hours and cached. This eliminates server load and API quota consumption.

3. **Zero-Dependency Charts**: All visualizations use pure SVG and Three.js. No heavy charting libraries (Chart.js, D3) are required, keeping bundle size minimal.

4. **Semantic CSS Tokens**: The design system uses CSS custom properties that map directly to Tailwind classes, enabling instant white-label theming.

---

## Data Flow

### Crisis Intelligence Pipeline

```
External Sources (Mock / API)
         │
         ▼
┌─────────────────┐
│  crisisData.ts  │  ← Static datasets (swappable for REST/GraphQL)
│  (Data Layer)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│   API Routes    │────▶│  Prisma Client  │
│  /api/crisis    │     │  (PostgreSQL)   │
│  /api/resources │     └─────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React Components│
│  (Real-time UI) │
└─────────────────┘
```

### Orbital Data Pipeline

```
CelesTrak.org (TLE Feed)
         │
         │  Fetch every 2 hours
         ▼
┌─────────────────┐
│  Browser Cache  │  ← localStorage / Memory
│  (TLE Strings)  │
└────────┬────────┘
         │
         │  Parse via satellite.js
         ▼
┌─────────────────┐
│  SGP4 Propagator │  ← Real-time position calc at 60 FPS
│  (Client-side)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Three.js Scene │  ← 3D rendering with React Three Fiber
│  (WebGL)        │
└─────────────────┘
```

---

## Authentication & Authorization

Atlas Sentinel uses **NextAuth.js v5** (Auth.js) with multiple providers:

### Providers

- **Credentials**: Email/password with bcrypt hashing
- **OAuth**: GitHub, Google (configurable)
- **Session Strategy**: JWT with role/clearance claims

### Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| `ADMIN` | Full system access, user management |
| `COMMANDER` | All views, resource deployment approval |
| `ANALYST` | SITREP, COP, FUSE, INTEL views, read-only LOGSTAT |
| `OBSERVER` | SITREP, COP views only |

### Clearance Levels

| Level | Access |
|-------|--------|
| `UNCLASSIFIED` | Public data only |
| `CONFIDENTIAL` | Standard intel feeds |
| `SECRET` | All intel, resource locations |
| `TOP_SECRET` | Full platform access |
| `SCI` | Special compartmented information |

### Middleware Protection

The `middleware.ts` enforces:
- Authentication on all routes except `/auth/*`
- Security headers (CSP, X-Frame-Options, HSTS)
- API route authorization

---

## Orbital Surveillance System

### SGP4 Propagation

The Simplified General Perturbations model #4 (SGP4) is the standard algorithm for near-Earth satellite orbit propagation. Atlas Sentinel implements it via the `satellite.js` library.

**Key Functions:**

```typescript
// Initialize satellite from TLE
const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

// Propagate to current time
const pv = satellite.propagate(satrec, new Date());

// Convert ECI to Geodetic
const gmst = satellite.gstime(new Date());
const geo = satellite.eciToGeodetic(pv.position, gmst);

// Extract coordinates
const lat = satellite.degreesLat(geo.latitude);
const lon = satellite.degreesLong(geo.longitude);
const alt = geo.height; // km
```

### Coordinate Transformations

1. **TEME (True Equator Mean Equinox)** → SGP4 raw output
2. **ECI (Earth-Centered Inertial)** → Fixed orientation relative to stars
3. **ECF/ECEF (Earth-Centered Fixed)** → Rotates with Earth
4. **Geodetic (Lat/Lon/Alt)** → Human-readable coordinates

### Performance Optimizations

- **Batch Processing**: Satellites are processed in chunks to avoid frame drops
- **Level-of-Detail**: Only 200 orbit trails rendered at once
- **Culling**: Satellites below horizon or out of view are skipped
- **Memoization**: TLE parsing results cached in React refs

### Visual Effects

| Effect | Implementation |
|--------|---------------|
| Earth Glow | Additive blending on scaled sphere |
| City Lights | Canvas texture with radial gradients |
| Satellite Shell | 3,000 points with vertex colors |
| Orbit Trails | Line geometries with fading opacity |
| Coverage Footprints | Ring geometries for high-interest sats |
| Starfield | `Stars` component from `@react-three/drei` |

---

## AI Agent Architecture

### Agent Configuration

Agents are defined in `app/lib/agents.ts` with:
- **System Prompt**: Role-specific instructions
- **Model**: OpenAI GPT-4o (configurable)
- **Tools**: Function calling for crisis data, resource status
- **Capabilities**: Declared for UI filtering

### Tool System

```typescript
const tools = {
  getCrisisData: {
    description: "Get current crisis intelligence for a region",
    parameters: z.object({ region: z.string() }),
    execute: async ({ region }) => { /* ... */ }
  },
  getResourceStatus: {
    description: "Get deployment status of resources",
    parameters: z.object({ unitId: z.string().optional() }),
    execute: async ({ unitId }) => { /* ... */ }
  }
};
```

### Streaming Architecture

The AI SDK streams tokens via Server-Sent Events (SSE):

```
Client ──POST /api/chat──▶ Server
                              │
                              ▼
                        OpenAI API (streaming)
                              │
                              ▼
                        Server-Sent Events
                              │
                              ▼
Client ◀──text chunks─────── Server
```

---

## RAG Pipeline

### Ingestion

```
Intel Report (text)
      │
      ▼
┌─────────────┐
│  Chunking   │  ← Semantic paragraph splitting
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Embedding  │  ← OpenAI text-embedding-3-small
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Vector DB  │  ← Pinecone / pgvector
└─────────────┘
```

### Retrieval

```
User Query
    │
    ▼
┌─────────────┐
│  Embedding  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Similarity │  ← Cosine similarity search
│   Search    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Context    │  ← Top-k chunks + metadata
│  Assembly   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  LLM        │  ← GPT-4o with retrieved context
│  Generation │
└─────────────┘
```

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────┐       ┌──────────────┐       ┌──────────┐
│   User   │◄──────┤ Conversation │◄──────┤ Message  │
│          │  1:N  │              │  1:N   │          │
└────┬─────┘       └──────────────┘       └──────────┘
     │
     │ 1:N
     ▼
┌──────────┐
│IntelReport│
│          │
└──────────┘
```

### Key Tables

**User**
- `id`, `email`, `name`, `role` (enum), `clearance` (enum)
- `createdAt`, `updatedAt`

**Conversation**
- `id`, `userId`, `title`, `agent`
- One-to-many with Messages

**Message**
- `id`, `conversationId`, `role`, `content`, `agentId`
- `confidence`, `sources` (JSON)

**IntelReport**
- `id`, `userId`, `title`, `classification`
- `region`, `threatLevel`, `summary`, `details`
- `sources` (JSON), `vectorId`

---

## API Reference

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | ALL | NextAuth.js handlers |

### Crisis Data

| Endpoint | Method | Auth | Response |
|----------|--------|------|----------|
| `/api/crisis` | GET | Required | `{ events: CrisisEvent[], total: number }` |

### Resources

| Endpoint | Method | Auth | Response |
|----------|--------|------|----------|
| `/api/resources` | GET | Required | `{ units: ResourceUnit[], deployed, staging, standby }` |

### AI Chat

| Endpoint | Method | Body | Response |
|----------|--------|------|----------|
| `/api/chat` | POST | `{ messages, agentId }` | SSE stream |

### Agents

| Endpoint | Method | Auth | Response |
|----------|--------|------|----------|
| `/api/agents` | GET | Required | `{ agents: AgentConfig[] }` |

### RAG

| Endpoint | Method | Body/Query | Response |
|----------|--------|-----------|----------|
| `/api/rag/ingest` | POST | `{ title, content, classification, region, threatLevel, tags }` | `{ success, reportId }` |
| `/api/rag/search` | GET | `?q=query&region=optional` | `{ query, results, count }` |

---

## Deployment Guide

### Vercel (Production)

1. **Environment Variables**: Set all required env vars in Vercel Dashboard
2. **Database**: Use Vercel Postgres or external PostgreSQL
3. **Build Command**: `prisma generate && next build`
4. **Output**: Static export to `out/` directory

### Docker (Self-Hosted)

```bash
# Production build
docker build -t atlas-sentinel:latest .

# Run with compose (includes Postgres + Redis)
docker-compose -f docker-compose.yml up -d

# Scale the app
docker-compose up -d --scale app=3
```

### GitHub Actions CI/CD

The `.github/workflows/ci.yml` runs:
1. Lint + Type check
2. Build verification
3. Docker image build (on main branch)

The `.github/workflows/deploy.yml` auto-deploys to Vercel on push to main.

---

## Security Posture

### Encryption

- **Transit**: TLS 1.3 (Vercel Edge)
- **At Rest**: AES-256 (database fields)
- **Session**: JWT with HS256

### Headers

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; ...
```

### Compliance

- **NATO STANAG 4609**: DTG timestamps, AOR terminology, classification banners
- **ISO 27001**: Security posture indicator, role-based access
- **OWASP Top 10**: Input validation, XSS protection, CSRF tokens

---

## Contributing

We welcome contributions from the intelligence and developer communities.

### Development Workflow

```bash
# Fork and clone
git clone https://github.com/YOURNAME/atlas-sentinel.git

# Create feature branch
git checkout -b feature/your-feature

# Make changes, commit with conventional commits
git commit -m "feat(orbit): add satellite category filtering"

# Push and open PR
git push origin feature/your-feature
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js config
- **Prettier**: 2-space tabs, 100 char line width
- **Testing**: Vitest for unit tests

### Areas for Contribution

- [ ] Real-time WebSocket feeds for live crisis updates
- [ ] Additional satellite categories (debris, rocket bodies)
- [ ] Machine learning models for threat prediction
- [ ] Mobile-responsive optimizations
- [ ] Additional language support (i18n)
- [ ] Integration with external APIs (GDACS, ACLED)

---

## References

### Orbital Mechanics

- Hoots, F. R., & Roehrich, R. L. (1980). *Spacetrack Report No. 3*. NORAD.
- Vallado, D. A. (2013). *Fundamentals of Astrodynamics and Applications*. Microcosm Press.
- Kelso, T. S. *Satellite Times* columns on orbital propagation.

### Libraries

- [satellite.js](https://github.com/shashwatak/satellite-js) — SGP4/SDP4 propagation
- [Three.js](https://threejs.org/) — WebGL rendering
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — React renderer for Three.js
- [CelesTrak](https://celestrak.org/) — TLE data source

### Design Inspiration

- Bloomberg Terminal — Typography and data density
- Palantir Foundry — Component patterns and layout
- NATO C2 systems — Classification and terminology standards

---

<div align="center">

**Atlas Sentinel v2.4.1** — *Eternal Vigilance*

<p><em>"In orbit, there are no borders. Only trajectories."</em></p>

</div>
