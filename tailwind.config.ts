import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0a0f",
        abyss: "#0f1117",
        surface: "#13151c",
        "surface-elevated": "#1a1d27",
        "surface-hover": "#222633",
        border: "#2a2e3b",
        "border-dim": "#1e2129",
        cyan: {
          DEFAULT: "#00d4ff",
          glow: "#00d4ff40",
          dim: "#00d4ff20",
        },
        amber: {
          DEFAULT: "#f59e0b",
          glow: "#f59e0b40",
        },
        crimson: {
          DEFAULT: "#ef4444",
          glow: "#ef444440",
        },
        emerald: {
          DEFAULT: "#10b981",
          glow: "#10b98140",
        },
        violet: {
          DEFAULT: "#8b5cf6",
          glow: "#8b5cf640",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scan-line 8s linear infinite",
        "ticker": "ticker 30s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px var(--tw-shadow-color)" },
          "50%": { opacity: "0.5", boxShadow: "0 0 5px var(--tw-shadow-color)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #1e2129 1px, transparent 1px), linear-gradient(to bottom, #1e2129 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(0,212,255,0.03) 0%, transparent 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
