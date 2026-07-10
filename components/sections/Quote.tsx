"use client";

import { QUOTE } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

export default function Quote() {
  return (
    <section
      className="section"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <span
            className="display"
            style={{ fontSize: "5rem", color: "var(--gold)", lineHeight: 0.5, display: "block" }}
          >
            &ldquo;
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="display"
            style={{
              fontSize: "clamp(1.6rem, 4.2vw, 3.4rem)",
              lineHeight: 1.28,
              fontWeight: 300,
              color: "var(--ivory)",
              marginTop: "1rem",
            }}
          >
            {QUOTE.text}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="eyebrow"
            style={{ marginTop: "2.5rem", color: "var(--ivory-dim)" }}
          >
            {QUOTE.attribution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
