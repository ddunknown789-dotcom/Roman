"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useScrollStore } from "@/lib/scrollStore";

// Load the WebGL stage client-only (no SSR) to avoid hydration on the Canvas.
const Stage = dynamic(() => import("./Stage"), { ssr: false });

export default function StageMount() {
  const ready = useScrollStore((s) => s.ready);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s ease 0.1s",
        pointerEvents: "none",
      }}
    >
      {mounted && <Stage />}
    </div>
  );
}
