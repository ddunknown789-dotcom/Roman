"use client";

import { CONFERENCES } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Conferences() {
  const f = CONFERENCES.featured;
  return (
    <section id="speaking" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{CONFERENCES.eyebrow}</span>
        </Reveal>
        <SplitHeading text={CONFERENCES.title} className="display display-xl" style={{ marginTop: "1.2rem" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{CONFERENCES.lead}</p>
        </Reveal>

        {/* featured keynote */}
        <Reveal delay={0.1}>
          <div className="conf-featured">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>{f.label}</div>
            <h3 className="display display-lg" style={{ margin: "0.8rem 0 0.6rem" }}>{f.title}</h3>
            <div className="conf-event" style={{ fontSize: "1rem" }}>{f.event}</div>
            <div className="conf-topic" style={{ marginTop: "0.3rem" }}>{f.meta}</div>
            {/* TODO: keynote video/link placeholder */}
            <div
              aria-label="Keynote video placeholder"
              style={{
                marginTop: "1.4rem",
                aspectRatio: "16 / 7",
                border: "1px dashed rgba(200,162,76,0.3)",
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                color: "var(--ivory-dim)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              ▶ Keynote film — asset to be added
            </div>
          </div>
        </Reveal>

        {/* upcoming */}
        <Reveal delay={0.1}>
          <div className="eyebrow" style={{ marginTop: "clamp(2.5rem,5vw,4rem)", color: "var(--ivory-dim)" }}>
            Upcoming Engagements
          </div>
        </Reveal>
        <div style={{ marginTop: "1rem" }}>
          {CONFERENCES.upcoming.map((e, i) => (
            <Reveal as="div" key={i} delay={(i % 5) * 0.04}>
              <div className="conf-row">
                <span className="conf-date">{e.date}</span>
                <span className="conf-place">{e.place}</span>
                <span className="conf-event">
                  {e.event}
                  <span className="conf-topic" style={{ display: "block", marginTop: "2px" }}>{e.topic}</span>
                </span>
                <span style={{ color: "var(--gold)" }}>→</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
