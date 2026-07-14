"use client";

import { RESEARCH } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{RESEARCH.eyebrow}</span>
        </Reveal>
        <SplitHeading text={RESEARCH.title} className="display display-xl" style={{ marginTop: "1.2rem" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{RESEARCH.lead}</p>
        </Reveal>

        <div className="grid-cards cols-3">
          {RESEARCH.items.map((r, i) => (
            <Reveal key={r.num} delay={(i % 3) * 0.05}>
              <div className="pcard">
                <span className="pcard-num">{r.num}</span>
                <h3 className="pcard-title">{r.title}</h3>
                <p className="pcard-body">{r.body}</p>
                <span className="pcard-ghost">{r.num}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
