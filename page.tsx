"use client";

import { useState } from "react";
import ClassificationBanner from "./components/ClassificationBanner";
import CommandBar from "./components/CommandBar";
import SubNav from "./components/SubNav";
import SitrepView from "./components/SitrepView";
import CopView from "./components/CopView";
import FuseView from "./components/FuseView";
import LogstatView from "./components/LogstatView";
import IntelView from "./components/IntelView";

export type ViewName = "overview" | "map" | "analytics" | "resources" | "intelligence";
export type TheaterName = "global" | "europe" | "pacific" | "central" | "africa" | "south";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewName>("overview");
  const [activeTheater, setActiveTheater] = useState<TheaterName>("global");

  const views: Record<ViewName, React.ReactNode> = {
    overview: <SitrepView />,
    map: <CopView />,
    analytics: <FuseView />,
    resources: <LogstatView />,
    intelligence: <IntelView />,
  };

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans">
      <ClassificationBanner />
      <CommandBar activeTheater={activeTheater} onTheaterChange={setActiveTheater} />
      <SubNav activeView={activeView} onViewChange={setActiveView} />
      <main className="pt-[126px] pb-9 px-7">
        <div className="animate-fade-in">{views[activeView]}</div>
      </main>
    </div>
  );
}
