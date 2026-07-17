"use client";

import { useState, useEffect } from "react";

export function useZuluTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toISOString().replace("T", " ").slice(0, 19) + "Z");
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
