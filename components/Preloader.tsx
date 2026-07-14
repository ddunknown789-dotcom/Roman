"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/lib/scrollStore";

// usta-style percentage preloader that gates the scene reveal.
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // if the portrait is already cached it may finish before onLoad attaches —
  // catch that case so it doesn't stay invisible
  useEffect(() => {
    const im = imgRef.current;
    if (im && im.complete && im.naturalWidth > 0) setImgLoaded(true);
  }, []);

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
      {/* centred founder portrait — its black background blends into the void */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/founder.png"
          alt=""
          onLoad={() => setImgLoaded(true)}
          style={{
            maxHeight: "72vh",
            maxWidth: "82vw",
            objectFit: "contain",
            transform: "translateY(-3%)",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 1.1s ease 0.15s",
            WebkitMaskImage:
              "radial-gradient(120% 120% at 50% 42%, #000 62%, transparent 100%)",
            maskImage:
              "radial-gradient(120% 120% at 50% 42%, #000 62%, transparent 100%)",
          }}
        />
      </div>

      <div style={{ maxWidth: "60ch", position: "relative" }}>
        <div className="eyebrow" style={{ marginBottom: "1rem" }}>
          Prof Patrick Treacy
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
          position: "relative",
        }}
      >
        {count}
        <span style={{ fontSize: "0.35em", color: "var(--ivory-dim)" }}>%</span>
      </div>
    </div>
  );
}
