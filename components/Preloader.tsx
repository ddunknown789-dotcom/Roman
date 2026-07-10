"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/lib/scrollStore";

// usta-style percentage preloader that gates the scene reveal.
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 300 : 1900;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        useScrollStore.getState().setReady(true);
        // fade out the overlay
        if (root.current) {
          root.current.style.transition = "opacity 0.7s ease, transform 0.9s ease";
          root.current.style.opacity = "0";
          root.current.style.transform = "translateY(-2%)";
        }
        setTimeout(() => setGone(true), 750);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "var(--void)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "clamp(1.5rem, 5vw, 3.5rem)",
      }}
    >
      <div style={{ maxWidth: "60ch" }}>
        <div className="eyebrow" style={{ marginBottom: "1rem" }}>
          Dr Patrick Treacy
        </div>
        <div
          className="display display-lg"
          style={{ color: "var(--ivory)", fontStyle: "italic" }}
        >
          Behind the Mask
        </div>
      </div>
      <div
        className="display"
        style={{
          fontSize: "clamp(3rem, 10vw, 9rem)",
          color: "var(--gold)",
          lineHeight: 1,
        }}
      >
        {count}
        <span style={{ fontSize: "0.35em", color: "var(--ivory-dim)" }}>%</span>
      </div>
    </div>
  );
}
