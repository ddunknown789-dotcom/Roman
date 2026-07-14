"use client";

import { QUALIFICATIONS } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Qualifications() {
  return (
    <section id="credentials" className="section">
      <div className="section-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <Reveal>
              <span className="eyebrow">{QUALIFICATIONS.eyebrow}</span>
            </Reveal>
            <SplitHeading text={QUALIFICATIONS.title} className="display display-xl" style={{ marginTop: "1.2rem" }} />
          </div>
          <Reveal delay={0.1}>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>{QUALIFICATIONS.count}</span>
          </Reveal>
        </div>

        <div className="grid-cards cols-3">
          {QUALIFICATIONS.items.map((q, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <div className="pcard qual-card">
                <span className="qual-abbr">{q.abbr}</span>
                <span className="qual-body">{q.body}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
