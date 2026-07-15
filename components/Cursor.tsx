"use client";

import { useEffect, useRef } from "react";
import { useScrollStore } from "@/lib/scrollStore";

// Custom cursor: a small dot + a lagging ring that swells over interactives.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;
    // Mouse/pen: visible as soon as it moves. Touch has no idle position, so it
    // only shows while a finger is actually down, following that finger, then
    // fades out on release rather than freezing at the last touch point.
    let visible = false;

    const setMouse = useScrollStore.getState().setMouse;

    const place = (x: number, y: number, el: HTMLElement | null) => {
      mx = x;
      my = y;
      visible = true;
      hovering = !!el?.closest("a, button, [data-magnetic]");
      // feed normalized pointer to the 3D stage (-1..1)
      setMouse((x / window.innerWidth) * 2 - 1, -((y / window.innerHeight) * 2 - 1));
    };

    const onMove = (e: PointerEvent) => {
      // fires continuously for mouse; for touch it only fires while a finger
      // is already down and moving — exactly when we want the ring to follow it
      place(e.clientX, e.clientY, e.target as HTMLElement | null);
    };
    const onDown = (e: PointerEvent) => {
      // snap straight to the touch/click point instead of lerping in from
      // wherever the ring last was (or the screen centre, on first touch)
      rx = e.clientX;
      ry = e.clientY;
      place(e.clientX, e.clientY, e.target as HTMLElement | null);
    };
    const onRelease = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") visible = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onRelease, { passive: true });
    window.addEventListener("pointercancel", onRelease, { passive: true });

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        dot.current.style.opacity = visible ? "1" : "0";
      }
      if (ring.current) {
        const s = hovering ? 2.1 : 1;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${s})`;
        ring.current.style.opacity = visible ? (hovering ? "1" : "0.6") : "0";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
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
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform, opacity",
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
          opacity: 0,
          transition: "opacity 0.25s ease",
          willChange: "transform, opacity",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
