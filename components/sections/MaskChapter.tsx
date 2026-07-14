"use client";

import { MASK } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function MaskChapter() {
  return (
    <section
      id="mask"
      className="section"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div className="section-inner" style={{ textAlign: "left" }}>
        <Reveal>
          <span className="eyebrow">{MASK.eyebrow}</span>
        </Reveal>
        <SplitHeading
          text={MASK.title}
          className="display display-xl"
          style={{ marginTop: "1.4rem", maxWidth: "18ch" }}
        />
        <div
          style={{
            marginTop: "clamp(2rem, 5vw, 3.5rem)",
            display: "grid",
            gap: "1.4rem",
            maxWidth: "54ch",
          }}
        >
          {MASK.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="body-copy" style={{ color: "var(--ivory)" }}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p
            className="display"
            style={{
              marginTop: "clamp(2.5rem, 6vw, 4rem)",
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontStyle: "italic",
              color: "var(--gold)",
              lineHeight: 1.3,
            }}
          >
            {MASK.quote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
