"use client";

import { PUBLICATIONS } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Publications() {
  return (
    <section id="publications" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{PUBLICATIONS.eyebrow}</span>
        </Reveal>
        <SplitHeading text={PUBLICATIONS.title} className="display display-xl" style={{ marginTop: "1.2rem", maxWidth: "20ch" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{PUBLICATIONS.lead}</p>
        </Reveal>

        <div className="grid-cards cols-2">
          {PUBLICATIONS.items.map((p, i) => (
            <Reveal key={p.num} delay={(i % 2) * 0.05}>
              <div className="pcard">
                <span className="pcard-num">{p.num}</span>
                <h3 className="pcard-title">{p.title}</h3>
                <p className="pcard-body">{p.body}</p>
                <div className="pcard-source">{p.source}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
