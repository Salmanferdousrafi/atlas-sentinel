import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "./lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atlas Sentinel — Global Crisis Intelligence Platform",
  description:
    "Enterprise-grade multi-agent intelligence dashboard for global crisis monitoring, predictive analytics, and strategic decision support.",
  keywords: [
    "crisis intelligence",
    "geopolitical analysis",
    "threat assessment",
    "AI agents",
    "RAG",
    "NATO",
    "SITREP",
    "COP",
  ],
  authors: [{ name: "Atlas Sentinel" }],
  openGraph: {
    title: "Atlas Sentinel",
    description: "Global Crisis Intelligence Platform",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-void text-slate-200`}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
