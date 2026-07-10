"use client";

import { HUMANITY, TIMELINE } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Humanity() {
  return (
    <section id="humanity" className="section">
      <div className="section-inner">
        <div style={{ maxWidth: "48ch", marginBottom: "clamp(2.5rem, 6vw, 4.5rem)" }}>
          <Reveal>
            <span className="eyebrow">{HUMANITY.eyebrow}</span>
          </Reveal>
          <SplitHeading
            text={HUMANITY.title}
            className="display display-xl"
            style={{ marginTop: "1.2rem" }}
          />
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: "1.6rem", color: "var(--ivory-dim)" }}>
              {HUMANITY.lead}
            </p>
          </Reveal>
        </div>

        <ol style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 780 }}>
          {TIMELINE.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.04}>
              <div
                className="timeline-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(4.5rem, 8rem) 1fr",
                  gap: "clamp(1.2rem, 4vw, 3rem)",
                  alignItems: "baseline",
                  padding: "1.5rem 0",
                  borderTop: "1px solid rgba(244,239,230,0.12)",
                }}
              >
                <span
                  className="display"
                  style={{
                    fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)",
                    color: "var(--gold)",
                  }}
                >
                  {t.year}
                </span>
                <span
                  className="body-copy"
                  style={{
                    fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)",
                    color: "var(--ivory)",
                  }}
                >
                  {t.text}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
