"use client";

import { STORY } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Story() {
  return (
    <section id="story" className="section">
      <div className="section-inner" style={{ maxWidth: 980 }}>
        <Reveal>
          <span className="eyebrow">{STORY.eyebrow}</span>
        </Reveal>
        <SplitHeading
          text={STORY.title}
          as="h2"
          className="display display-xl"
          style={{ marginTop: "1.4rem", maxWidth: "16ch" }}
        />
        <div
          style={{
            marginTop: "clamp(2.5rem, 6vw, 4.5rem)",
            display: "grid",
            gap: "1.8rem",
            maxWidth: "44ch",
          }}
        >
          {STORY.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="body-copy" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)" }}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
