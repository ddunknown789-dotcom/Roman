"use client";

import { useEffect, useRef } from "react";
import { useScrollStore } from "@/lib/scrollStore";

// Custom cursor: a small dot + a lagging ring that swells over interactives.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;

    const setMouse = useScrollStore.getState().setMouse;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // feed normalized pointer to the 3D stage (-1..1)
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
      const el = e.target as HTMLElement | null;
      hovering = !!el?.closest("a, button, [data-magnetic]");
    };

    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot.current)
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring.current) {
        const s = hovering ? 2.1 : 1;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${s})`;
        ring.current.style.opacity = hovering ? "1" : "0.6";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none" }}>
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid var(--gold)",
          transition: "opacity 0.3s ease",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--ivory)",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
