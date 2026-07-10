"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(1rem, 2.5vw, 1.8rem) clamp(1.2rem, 4vw, 3rem)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        background: scrolled
          ? "linear-gradient(180deg, rgba(8,8,10,0.7), rgba(8,8,10,0))"
          : "transparent",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <a href="#top" className="eyebrow" style={{ letterSpacing: "0.28em", color: "var(--ivory)" }}>
        P·<span style={{ color: "var(--gold)" }}>TREACY</span>
      </a>

      <nav
        style={{ display: "flex", gap: "clamp(0.9rem, 2vw, 2rem)", alignItems: "center" }}
        className="nav-links"
      >
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="nav-link"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--ivory-dim)",
            }}
          >
            {n.label}
          </a>
        ))}
      </nav>

      <Magnetic strength={0.5}>
        <a
          href="#contact"
          style={{
            display: "inline-block",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            borderRadius: "999px",
            padding: "0.55rem 1.1rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.78rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}
        >
          Let&rsquo;s talk
        </a>
      </Magnetic>
    </header>
  );
}
