import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas Sentinel — Global Crisis Intelligence Platform",
  description: "NATO STANAG 4609 compliant multi-theater command & control intelligence platform. Real-time crisis monitoring, predictive analytics, and force deployment tracking.",
  keywords: ["crisis intelligence", "NATO", "C2", "situation awareness", "geopolitics", "defense tech"],
  authors: [{ name: "Atlas Sentinel" }],
  openGraph: {
    title: "Atlas Sentinel — Global Crisis Intelligence Platform",
    description: "Multi-theater command & control intelligence platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
