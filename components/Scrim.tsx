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
      let veil = 0.1 + Math.min(1, p / 0.13) * 0.44;
      // dip where the particle cloud reforms into a portrait — the friendship /
      // Michael Jackson chapter (~0.38) and Honours & Awards (~0.74) — so the
      // face reads brighter while keeping enough veil for the copy elsewhere
      const dipMJ = Math.exp(-Math.pow((p - 0.378) / 0.05, 2)) * 0.22;
      const dipAward = Math.exp(-Math.pow((p - 0.74) / 0.05, 2)) * 0.22;
      veil = Math.max(0.26, veil - dipMJ - dipAward);
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
