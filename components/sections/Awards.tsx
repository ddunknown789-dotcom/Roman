"use client";

import { AWARDS } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Awards() {
  return (
    <section id="awards" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{AWARDS.eyebrow}</span>
        </Reveal>
        <SplitHeading text={AWARDS.title} className="display display-xl" style={{ marginTop: "1.2rem", maxWidth: "16ch" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{AWARDS.lead}</p>
        </Reveal>

        {/* Lifetime achievement — the crown jewels */}
        <Reveal delay={0.1}>
          <div className="award-lifetime-head">
            <span className="display display-lg">{AWARDS.lifetimeHeadline}</span>
            <span className="award-nations">{AWARDS.lifetimeNations}</span>
          </div>
        </Reveal>
        <div className="grid-cards cols-3" style={{ marginTop: "1.4rem" }}>
          {AWARDS.lifetime.map((a, i) => (
            <Reveal key={a.country} delay={(i % 3) * 0.05}>
              <div className="pcard award-life-card">
                <span className="award-country">{a.country}</span>
                <h3 className="pcard-title" style={{ marginTop: "0.3rem" }}>{a.org}</h3>
                <p className="pcard-body">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Full award roll — year-grouped timeline */}
        <Reveal delay={0.1}>
          <div className="award-roll-head">
            <span className="eyebrow" style={{ color: "var(--gold)" }}>{AWARDS.rollHeadline}</span>
            <span className="award-roll-count">{AWARDS.rollCount}</span>
          </div>
        </Reveal>
        <div className="award-roll">
          {AWARDS.roll.map((yr, i) => (
            <Reveal as="div" key={yr.year} delay={(i % 4) * 0.04}>
              <div className="award-year">
                <div className="award-year-label">{yr.year}</div>
                <ul className="award-year-list">
                  {yr.items.map((it, j) => (
                    <li key={j} className="award-item">
                      <span className="award-item-title">{it.title}</span>
                      {it.place && <span className="award-item-place">{it.place}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
