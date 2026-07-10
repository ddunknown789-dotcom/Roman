"use client";

import { RECOGNITION } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Recognition() {
  return (
    <section id="recognition" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{RECOGNITION.eyebrow}</span>
        </Reveal>
        <SplitHeading
          text={RECOGNITION.title}
          className="display display-xl"
          style={{ marginTop: "1.2rem" }}
        />

        <div
          style={{
            marginTop: "clamp(2.5rem, 6vw, 4.5rem)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            background: "rgba(200,162,76,0.16)",
            border: "1px solid rgba(200,162,76,0.16)",
          }}
        >
          {RECOGNITION.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div
                style={{
                  background: "var(--void)",
                  padding: "clamp(1.6rem, 3vw, 2.6rem)",
                  minHeight: "100%",
                }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <p
                  className="body-copy"
                  style={{ marginTop: "1rem", fontSize: "0.98rem" }}
                >
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
