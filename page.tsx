"use client";

import { useState } from "react";
import { CommandBar } from "./components/CommandBar";
import { ClassificationBanner } from "./components/ClassificationBanner";
import { SubNav } from "./components/SubNav";
import { SitrepView } from "./components/SitrepView";
import { CopView } from "./components/CopView";
import { FuseView } from "./components/FuseView";
import { LogstatView } from "./components/LogstatView";
import { IntelView } from "./components/IntelView";
import { ChatInterface } from "./components/chat/ChatInterface";
import { SatelliteVisualization } from "./components/orbit/SatelliteVisualization";

export default function Home() {
  const [activeView, setActiveView] = useState("sitrep");

  const renderView = () => {
    switch (activeView) {
      case "sitrep":
        return <SitrepView />;
      case "cop":
        return <CopView />;
      case "orbit":
        return <SatelliteVisualization />;
      case "fuse":
        return <FuseView />;
      case "logstat":
        return <LogstatView />;
      case "intel":
        return <IntelView />;
      case "agents":
        return <ChatInterface />;
      default:
        return <SitrepView />;
    }
  };

  return (
    <div className="min-h-screen bg-void text-slate-200">
      <ClassificationBanner level="SECRET" />
      <CommandBar />
      <SubNav activeView={activeView} onViewChange={setActiveView} />
      <main className="scan-line">{renderView()}</main>
      <ClassificationBanner level="SECRET" />
    </div>
  );
}
