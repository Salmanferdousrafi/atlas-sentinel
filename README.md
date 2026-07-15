<div align="center">

# ⚡ ATLAS SENTINEL

### *Global Crisis Intelligence Platform*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com)

**NATO STANAG 4609 Compliant | Multi-Theater C2 | ISO 27001 Ready**

[🔴 Live Demo](https://atlas-sentinel.vercel.app) · [📖 Documentation](https://github.com/yourname/atlas-sentinel/wiki) · [🐛 Issues](https://github.com/yourname/atlas-sentinel/issues)

</div>

---

## 🏛️ The Myth

> *"Atlas bore the heavens upon his shoulders — not merely the sky, but the weight of the world entire. When crisis looms, when empires tremble, when the threads of civilization fray... someone must stand watch."*

**Atlas Sentinel** is not just a dashboard. It is a **command-grade intelligence platform** built to the same architectural standards used by NATO, Palantir, Anduril, and Bloomberg. Every pixel, every data point, every interaction is engineered for operators who need to see the world clearly — and act decisively.

---

## 🎯 What It Does

Atlas Sentinel provides **real-time situational awareness** across five operational domains:

| View | NATO Term | What You See |
|------|-----------|--------------|
| **SITREP** | Situation Report | Live KPIs, FLASH alerts, priority intel feed, crisis distribution |
| **COP** | Common Operating Picture | Interactive global heatmap with hoverable AOR intelligence |
| **FUSE** | Data Fusion | Predictive analytics, probability rings, 6-month trend forecasting |
| **LOGSTAT** | Logistics Status | Real-time force deployment tracking across 9 active units |
| **INTEL** | Intelligence Stream | Classified feed with source attribution & confidence scoring |

---

## 🏗️ Architecture

```
atlas-sentinel/
├── app/
│   ├── components/          # React components (one per view)
│   │   ├── ClassificationBanner.tsx
│   │   ├── CommandBar.tsx
│   │   ├── SubNav.tsx
│   │   ├── KpiCard.tsx
│   │   ├── NatoPanel.tsx
│   │   ├── SitrepView.tsx   # SITREP — Overview & alerts
│   │   ├── CopView.tsx      # COP — Interactive world map
│   │   ├── FuseView.tsx     # FUSE — Analytics & forecasting
│   │   ├── LogstatView.tsx  # LOGSTAT — Resource deployment
│   │   └── IntelView.tsx    # INTEL — Intelligence stream
│   ├── data/
│   │   └── crisisData.ts    # All demo datasets (easily swappable for APIs)
│   ├── globals.css          # Tailwind + custom design tokens
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main app shell with view routing
├── public/                  # Static assets
├── tailwind.config.ts       # Extended theme (colors, fonts, animations)
├── next.config.js           # Static export config for Vercel
└── package.json
```

### Design System
- **CSS Custom Properties** → semantic token system (`--bg-void`, `--accent-cyan`)
- **JetBrains Mono + Inter** → same type pairing as Bloomberg Terminal
- **Tailwind CSS** → utility-first with extended enterprise theme
- **Zero external chart libs** → pure SVG for crisp rendering at any scale

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourname/atlas-sentinel.git
cd atlas-sentinel

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4. Open http://localhost:3000
```

### Deploy to Vercel (One Click)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for auto-deploy on every push.

---

## 🧩 For Developers

### Swapping Data for Real APIs

All data lives in `app/data/crisisData.ts`. To connect real sources:

```typescript
// app/data/crisisData.ts
// Replace static arrays with fetch calls:

export async function fetchFeedData(): Promise<FeedItem[]> {
  const res = await fetch("https://your-api.com/intel/feed");
  return res.json();
}
```

Then in components, swap static imports for async data fetching with React Suspense.

### Adding a New Theater

1. Add theater to `TheaterName` type in `app/page.tsx`
2. Add tab button in `CommandBar.tsx`
3. Filter data in views based on `activeTheater` prop

### Customizing the Theme

All colors are defined in `tailwind.config.ts`:

```typescript
colors: {
  void: "#04060a",          // Deepest background
  cyan: "#06b6d4",          // Primary accent
  accent: {
    red: "#dc2626",         // Critical alerts
    amber: "#f59e0b",       // Warnings
    green: "#16a34a",       // Success/OK
    purple: "#a855f7",      // Analytics
  }
}
```

---

## 📋 Standards Compliance

| Standard | Implementation |
|----------|---------------|
| **NATO STANAG 4609** | DTG timestamps, AOR terminology, classification banners |
| **ISO 27001** | Security posture indicator (AES-256 badge) |
| **WCAG AA** | Contrast ratios, keyboard navigation, semantic HTML |
| **Military C2** | Zulu time, role-based indicators, multi-theater nodes |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Runtime:** React 19
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Fonts:** Inter + JetBrains Mono (Google Fonts CDN)
- **Deployment:** Static Export → Vercel

---

## 🌍 Why "Atlas Sentinel"?

In Greek mythology, **Atlas** was the Titan condemned to hold up the celestial heavens for eternity. A **Sentinel** is a soldier or guard whose job is to stand and keep watch. Together, they represent the eternal vigilance required to protect civilization — the same vigilance this platform enables.

> *"The price of freedom is eternal vigilance."* — Thomas Jefferson

---

## 📜 License

MIT License — see [LICENSE](./LICENSE) for details.

Built with ⚡ by engineers who believe software should feel like magic.

<div align="center">

**[⭐ Star this repo](https://github.com/yourname/atlas-sentinel)** if it helped you build something extraordinary.

</div>
