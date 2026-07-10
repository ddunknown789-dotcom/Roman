"use client";

import { useEffect, useRef } from "react";
import { useScrollStore } from "@/lib/scrollStore";

// A scroll-aware darkening veil between the 3D stage and the DOM content.
// Near-transparent at the hero and the mask chapter (let the object shine),
// stronger during text-heavy sections so copy stays legible.
export default function Scrim() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = useScrollStore.getState().progress;
      // base veil ramps in after the hero
      let veil = 0.1 + Math.min(1, p / 0.13) * 0.5;
      // gentle dip during the "mask" chapter (~0.5-0.6) — lets the object read
      // brighter while keeping enough veil for the centered copy
      const dramaticDip = Math.exp(-Math.pow((p - 0.55) / 0.09, 2)) * 0.24;
      veil = Math.max(0.3, veil - dramaticDip);
      if (ref.current) ref.current.style.opacity = String(veil);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.12,
        background:
          "radial-gradient(120% 100% at 50% 45%, rgba(8,8,10,0.5) 0%, rgba(8,8,10,0.88) 100%)",
      }}
    />
  );
}
