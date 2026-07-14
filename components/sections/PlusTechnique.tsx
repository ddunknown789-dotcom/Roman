"use client";

import { PLUS } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function PlusTechnique() {
  return (
    <section id="protocols" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{PLUS.eyebrow}</span>
        </Reveal>
        <SplitHeading text={PLUS.title} className="display display-xl" style={{ marginTop: "1.2rem" }} />
        <Reveal delay={0.08}>
          <p className="eyebrow" style={{ color: "var(--gold)", marginTop: "0.8rem" }}>{PLUS.tagline}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="body-copy p-lead" style={{ maxWidth: "68ch" }}>{PLUS.intro}</p>
        </Reveal>

        <div className="plus-grid">
          {PLUS.pillars.map((p, i) => (
            <Reveal key={p.letter} delay={i * 0.06}>
              <div className="plus-cell">
                <div className="plus-letter">{p.letter}</div>
                <h3 className="pcard-title" style={{ marginTop: "0.6rem" }}>{p.title}</h3>
                {p.sub && <div className="plus-sub">{p.sub}</div>}
                <p className="pcard-body" style={{ marginTop: "0.6rem" }}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)", maxWidth: "68ch" }}>
            <h3 className="display display-lg" style={{ margin: 0 }}>{PLUS.why.title}</h3>
            <p className="body-copy" style={{ marginTop: "1rem" }}>{PLUS.why.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
