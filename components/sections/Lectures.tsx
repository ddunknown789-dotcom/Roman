"use client";

import { LECTURES } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Lectures() {
  return (
    <section id="lectures" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{LECTURES.eyebrow}</span>
        </Reveal>
        <SplitHeading text={LECTURES.title} className="display display-xl" style={{ marginTop: "1.2rem", maxWidth: "18ch" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{LECTURES.lead}</p>
        </Reveal>

        <div className="lecture-list">
          {LECTURES.topics.map((t, i) => (
            <Reveal as="div" key={t} delay={(i % 5) * 0.04}>
              <div className="lecture-row">
                <span className="lecture-idx">TOPIC {pad(i + 1)}</span>
                <span className="lecture-topic">{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
