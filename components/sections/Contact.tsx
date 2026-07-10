"use client";

import { CONTACT, AUTHOR } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "clamp(2rem, 5vh, 3.5rem)",
      }}
    >
      <div className="section-inner" style={{ width: "100%", marginTop: "clamp(3rem, 10vh, 8rem)" }}>
        <Reveal>
          <span className="eyebrow">{CONTACT.eyebrow}</span>
        </Reveal>

        <Reveal delay={0.05}>
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${CONTACT.email}`}
              className="display"
              style={{
                display: "inline-block",
                fontSize: "clamp(1.5rem, 5.2vw, 4rem)",
                lineHeight: 1.1,
                marginTop: "1.5rem",
                maxWidth: "100%",
                overflowWrap: "anywhere",
                color: "var(--ivory)",
              }}
            >
              {CONTACT.email}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "40ch", color: "var(--ivory-dim)" }}>
            {CONTACT.lead}
          </p>
        </Reveal>

        <div
          style={{
            marginTop: "clamp(2rem, 5vw, 3.5rem)",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {CONTACT.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                color: "var(--gold)",
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div
        className="section-inner"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(244,239,230,0.12)",
        }}
      >
        <span className="eyebrow" style={{ color: "var(--ivory-dim)" }}>
          {AUTHOR.honorific} {AUTHOR.name}
        </span>
        <span className="body-copy" style={{ fontSize: "0.82rem" }}>
          © {new Date().getFullYear()} — Built as an immersive 3D experience.
        </span>
      </div>
    </footer>
  );
}
