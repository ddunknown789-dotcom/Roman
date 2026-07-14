"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AUTHOR } from "@/lib/content";
import { useScrollStore } from "@/lib/scrollStore";

// Hero text treatment (readability without changing layout)
const HERO_IVORY = "#F5F0E6"; // main heading
const HERO_SUBTITLE = "#CFCBC2"; // subtitle / tagline
const HERO_GOLD = "#D8B55B"; // labels / buttons
const HERO_SHADOW =
  "0 2px 8px rgba(0,0,0,0.65), 0 0 30px rgba(0,0,0,0.35)";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const ready = useScrollStore((s) => s.ready);
  const [roleIdx, setRoleIdx] = useState(0);

  // On-load kinetic reveal, fired once the preloader hands over.
  useEffect(() => {
    if (!ready || !root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(root.current.querySelectorAll("[data-rise] > *"), { yPercent: 0 });
      gsap.set(root.current.querySelectorAll("[data-fade]"), { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        "[data-rise] > *",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12 }
      ).fromTo(
        "[data-fade]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.15 },
        "-=0.6"
      );
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // Rotating role word.
  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % AUTHOR.roles.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      ref={root}
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        textAlign: "center",
        padding: "6rem 1.5rem 5.5rem",
      }}
    >
      <div
        data-fade
        className="eyebrow"
        style={{
          marginBottom: "1rem",
          opacity: 0,
          color: HERO_GOLD,
          textShadow: HERO_SHADOW,
        }}
      >
        {AUTHOR.honorific} {AUTHOR.name}
      </div>

      <h1
        className="display display-xl"
        style={{
          textTransform: "uppercase",
          margin: 0,
          color: HERO_IVORY,
          textShadow: HERO_SHADOW,
        }}
      >
        <span data-rise style={{ display: "block", overflow: "hidden" }}>
          <span style={{ display: "block" }}>Patrick</span>
        </span>
        <span data-rise style={{ display: "block", overflow: "hidden" }}>
          <span style={{ display: "block" }}>Treacy</span>
        </span>
      </h1>

      <div
        data-fade
        style={{
          marginTop: "2rem",
          height: "1.6em",
          overflow: "hidden",
          opacity: 0,
        }}
      >
        <span
          key={roleIdx}
          className="eyebrow"
          style={{
            display: "inline-block",
            color: HERO_GOLD,
            textShadow: HERO_SHADOW,
            animation: "roleIn 0.6s ease",
          }}
        >
          {AUTHOR.roles[roleIdx]}
        </span>
      </div>

      <p
        data-fade
        className="body-copy"
        style={{
          marginTop: "1.2rem",
          maxWidth: "46ch",
          opacity: 0,
          color: HERO_SUBTITLE,
          textShadow: HERO_SHADOW,
        }}
      >
        {AUTHOR.tagline}
      </p>

      <div
        data-fade
        style={{
          position: "absolute",
          bottom: "2.2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
          opacity: 0,
        }}
      >
        <span
          className="eyebrow"
          style={{ fontSize: "0.62rem", color: HERO_GOLD, textShadow: HERO_SHADOW }}
        >
          Scroll
        </span>
        <span
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(var(--gold), transparent)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 10,
              background: "var(--gold)",
              animation: "scrollcue 1.8s ease-in-out infinite",
            }}
          />
        </span>
      </div>
    </section>
  );
}
