"use client";

import { useRef } from "react";

// Magnetic hover: child drifts toward the cursor, springs back on leave.
export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      data-magnetic
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
