"use client";

import { SAFETY } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Safety() {
  return (
    <section id="safety" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{SAFETY.eyebrow}</span>
        </Reveal>
        <SplitHeading text={SAFETY.title} className="display display-xl" style={{ marginTop: "1.2rem", maxWidth: "18ch" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{SAFETY.lead}</p>
        </Reveal>

        <div className="grid-cards cols-3">
          {SAFETY.items.map((s, i) => (
            <Reveal key={s.num} delay={(i % 3) * 0.05}>
              <div className="pcard">
                <span className="pcard-num">{s.num}</span>
                <h3 className="pcard-title">{s.title}</h3>
                <p className="pcard-body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
