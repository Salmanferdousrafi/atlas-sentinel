import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#04060a",
        primary: "#080b14",
        secondary: "#0d111c",
        tertiary: "#111827",
        panel: "#0f172a",
        hover: "#1e293b",
        elevated: "#1a2236",
        "border-dim": "#1e293b",
        "border-med": "#334155",
        "border-bright": "#475569",
        "text-primary": "#f8fafc",
        "text-secondary": "#94a3b8",
        "text-muted": "#475569",
        "text-dim": "#334155",
        cyan: "#06b6d4",
        accent: {
          blue: "#3b82f6",
          indigo: "#6366f1",
          amber: "#f59e0b",
          red: "#dc2626",
          crimson: "#991b1b",
          green: "#16a34a",
          teal: "#14b8a6",
          purple: "#a855f7",
        },
        classification: "#fbbf24",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.3)",
        md: "0 4px 12px rgba(0,0,0,0.4)",
        lg: "0 8px 24px rgba(0,0,0,0.5)",
      },
      animation: {
        "secure-pulse": "secure-pulse 2.5s infinite",
        "alert-pulse": "alert-pulse 3s infinite",
        "nato-ping": "nato-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in": "fade-in 0.3s ease",
      },
      keyframes: {
        "secure-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        "alert-pulse": {
          "0%, 100%": { borderColor: "rgba(220,38,38,0.18)" },
          "50%": { borderColor: "rgba(220,38,38,0.35)" },
        },
        "nato-ping": {
          "0%": { r: "2", opacity: "1" },
          "100%": { r: "18", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
