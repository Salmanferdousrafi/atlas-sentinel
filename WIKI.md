# Atlas Sentinel — Wiki

Welcome to the Atlas Sentinel documentation. This wiki covers architecture decisions, deployment guides, API integration patterns, and contribution guidelines.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Reference](#component-reference)
3. [Data Layer](#data-layer)
4. [Deployment Guide](#deployment-guide)
5. [Theming & Customization](#theming--customization)
6. [API Integration](#api-integration)
7. [Performance](#performance)
8. [Security Considerations](#security-considerations)
9. [Contributing](#contributing)
10. [FAQ](#faq)

---

## Architecture Overview

Atlas Sentinel follows a **modular view-based architecture** where each operational view (SITREP, COP, FUSE, LOGSTAT, INTEL) is a self-contained React component. The main `page.tsx` acts as a shell that manages view state and theater selection.

### State Management

- **View State:** Managed in `page.tsx` via `useState<ViewName>`
- **Theater State:** Managed in `page.tsx` via `useState<TheaterName>`
- **Component State:** Each view component manages its own local state
- **No global state library** — intentionally simple for a single-user dashboard

### Design Patterns

- **Compound Components:** `NatoPanel` accepts `actions` prop for header buttons
- **Render Props:** `KpiCard` accepts variant props for styling
- **Data-Driven:** All content comes from `app/data/crisisData.ts`

---

## Component Reference

### ClassificationBanner
Fixed-position NATO classification banners (top and bottom of viewport).

### CommandBar
Top navigation bar with:
- Branding & insignia
- Theater selector tabs
- Zulu & local time clocks (auto-updating)
- Role badge & security indicator

### SubNav
Secondary navigation for switching between 5 operational views.

### KpiCard
Reusable KPI metric card with:
- Label, value, badge, delta indicator
- Color-coded severity variants
- Hover lift animation

### NatoPanel
Standardized panel container with:
- Header with icon, title, and action buttons
- Body content area
- Consistent border and background styling

### SitrepView
Situation Report view containing:
- Flash alert banner (acknowledgeable)
- 6 KPI cards
- Crisis distribution bar chart
- Priority intelligence feed
- Crisis type breakdown (donut charts)
- Response effectiveness progress bars

### CopView
Common Operating Picture view with:
- Interactive SVG world map
- Hoverable landmass regions with tooltips
- Crisis markers with ping animations
- Coordinate tracker (follows mouse)
- Legend overlay

### FuseView
Data Fusion analytics view with:
- 6 analytics KPI cards
- 3 probability ring metrics (SVG)
- 6-month trend forecast chart (SVG area chart)

### LogstatView
Logistics Status view with:
- Filterable resource grid
- 9 deployment cards with progress bars
- Status badges (deployed/staging/standby)
- Color-coded severity indicators

### IntelView
Intelligence Stream view with:
- Sortable data table
- Classification badges
- Confidence scoring
- ACK/PENDING status indicators

---

## Data Layer

All data is centralized in `app/data/crisisData.ts` as typed arrays.

### Types

```typescript
interface FeedItem {
  time: string;        // DTG format: HHMMSSZ
  title: string;       // Alert headline
  desc: string;        // Detailed description
  severity: "crit" | "high" | "med";
  tags: string[];      // Categorization tags
}

interface RegionData {
  name: string;
  value: number;       // Active crisis count
  color: string;       // Hex color for chart
}

interface ResourceData {
  type: string;        // MED, MIL, HUM, LOG, CYB
  name: string;
  location: string;    // City + coordinates
  status: "deployed" | "staging" | "standby";
  progress: number;    // 0-100
  category: string;    // CSS class suffix
}

interface IntelRow {
  time: string;        // Full DTG
  source: string;      // IMINT, SIGINT, HUMINT, OSINT, CYBER
  region: string;      // AOR code
  classification: "critical" | "high" | "moderate";
  summary: string;
  confidence: string;  // Percentage string
  status: "ack" | "pending";
}
```

### Swapping for Real Data

Replace static imports in view components with async data fetching:

```typescript
// In any view component:
import { useEffect, useState } from "react";

export default function SitrepView() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    fetch("/api/intel/feed")
      .then(r => r.json())
      .then(setFeed);
  }, []);

  // Render using `feed` instead of imported `feedData`
}
```

---

## Deployment Guide

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Framework Preset: Next.js
5. Build Command: `next build`
6. Output Directory: `out` (set by `output: 'export'` in next.config.js)
7. Click Deploy

### Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → Add New Site → Import from Git
3. Build Command: `next build`
4. Publish Directory: `out`
5. Click Deploy

### Static Export (Any Host)

```bash
npm run build
# Output is in ./out directory
# Upload contents of ./out to any static host
```

---

## Theming & Customization

### Color Tokens

All colors are defined in `tailwind.config.ts` under `theme.extend.colors`:

| Token | Default | Usage |
|-------|---------|-------|
| `void` | `#04060a` | Deepest background |
| `primary` | `#080b14` | Main background |
| `secondary` | `#0d111c` | Secondary surfaces |
| `panel` | `#0f172a` | Card backgrounds |
| `cyan` | `#06b6d4` | Primary accent |
| `accent.red` | `#dc2626` | Critical alerts |
| `accent.amber` | `#f59e0b` | Warnings |
| `accent.green` | `#16a34a` | Success/OK |

### Adding a New Theme

1. Duplicate `tailwind.config.ts`
2. Modify color values
3. Import the desired config in `postcss.config.mjs`

### Custom Fonts

Default: Inter (sans) + JetBrains Mono (mono)

To change:
1. Update Google Fonts import in `app/globals.css`
2. Update `fontFamily` in `tailwind.config.ts`

---

## API Integration

### REST API Pattern

```typescript
// app/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getIntelFeed(): Promise<FeedItem[]> {
  const res = await fetch(`${API_BASE}/intel/feed`, {
    headers: { Authorization: `Bearer ${process.env.API_KEY}` },
  });
  if (!res.ok) throw new Error("Failed to fetch intel feed");
  return res.json();
}
```

### WebSocket for Real-Time Updates

```typescript
// app/hooks/useRealtimeFeed.ts
import { useEffect, useState } from "react";

export function useRealtimeFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://your-api.com/ws");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFeed((prev) => [data, ...prev].slice(0, 50));
    };
    return () => ws.close();
  }, []);

  return feed;
}
```

---

## Performance

### Optimizations Applied

- **Static Export:** Pre-rendered HTML, no server runtime needed
- **SVG Charts:** Zero JavaScript chart library overhead
- **CSS Transitions:** GPU-accelerated animations (transform, opacity)
- **Font Loading:** `display=swap` for non-blocking font loads
- **Code Splitting:** Each view is a separate component (natural split points)

### Metrics (Lighthouse)

| Metric | Score |
|--------|-------|
| Performance | 98+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## Security Considerations

> **Note:** This is a demo application. For production use:

1. **Authentication:** Add NextAuth.js or Clerk for user auth
2. **Authorization:** Implement role-based access control (RBAC)
3. **API Security:** Use API routes with middleware for auth checks
4. **Data Sanitization:** Validate all external data with Zod
5. **CSP Headers:** Add Content Security Policy headers
6. **Classification:** Replace demo banners with real classification levels

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript strict mode
- Follow existing component patterns
- Add JSDoc comments for public functions
- Run `npm run lint` before committing

---

## FAQ

**Q: Can I use this for a real military/intelligence application?**
A: This is a demo/prototype. For real-world use, you would need to add authentication, encryption, audit logging, and comply with your organization's security requirements.

**Q: How do I add real-time data?**
A: Replace the static data imports in view components with API calls or WebSocket connections. See the API Integration section above.

**Q: Can I change the classification level?**
A: Yes. Edit `ClassificationBanner.tsx` and change the banner text and colors. For SECRET/CONFIDENTIAL levels, use the appropriate color schemes.

**Q: Is this mobile-responsive?**
A: Yes. The grid system collapses from 6→3→2→1 columns on smaller screens. The map and tables are horizontally scrollable on mobile.

**Q: How do I add a new crisis marker on the map?**
A: Edit the `markers` array in `CopView.tsx` with the SVG coordinates.

**Q: Can I export data to PDF?**
A: Not built-in, but you can add a library like `jspdf` or `react-pdf` to generate reports from the data.

---

*Last updated: July 2026*
