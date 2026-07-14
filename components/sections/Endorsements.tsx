"use client";

import { ENDORSEMENTS } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Endorsements() {
  return (
    <section id="endorsements" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{ENDORSEMENTS.eyebrow}</span>
        </Reveal>
        <SplitHeading text={ENDORSEMENTS.title} className="display display-xl" style={{ marginTop: "1.2rem" }} />

        <div className="endorse-grid">
          {ENDORSEMENTS.items.map((e, i) => (
            <Reveal key={e.name} delay={(i % 2) * 0.06}>
              <figure className="endorse-card">
                <span className="endorse-mark" aria-hidden>“</span>
                <blockquote className="endorse-quote">{e.quote}</blockquote>
                <figcaption className="endorse-cap">
                  <span className="endorse-name">{e.name}</span>
                  <span className="endorse-award">{e.award}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
