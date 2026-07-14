"use client";

import { GLOBAL } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

export default function GlobalRecognition() {
  return (
    <section id="recognition" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{GLOBAL.eyebrow}</span>
        </Reveal>
        <SplitHeading text={GLOBAL.title} className="display display-xl" style={{ marginTop: "1.2rem" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{GLOBAL.lead}</p>
        </Reveal>

        <div className="grid-cards cols-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {GLOBAL.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="pcard" style={{ textAlign: "center" }}>
                <div className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "var(--gold)", lineHeight: 1 }}>
                  {s.value}
                </div>
                <p className="body-copy" style={{ marginTop: "0.7rem", fontSize: "0.85rem" }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* world footprint (stylised placeholder map) */}
        <Reveal delay={0.1}>
          <div className="footprint-map">
            <svg viewBox="0 0 1000 380" width="100%" height="auto" aria-hidden style={{ display: "block", opacity: 0.85 }}>
              <defs>
                <radialGradient id="dot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e7c877" />
                  <stop offset="100%" stopColor="#8a6d2c" />
                </radialGradient>
              </defs>
              {/* faint continental dot field */}
              {DOTS.map((d, i) => (
                <circle key={i} cx={d[0]} cy={d[1]} r={d[2]} fill="#c8a24c" opacity={d[3]} />
              ))}
              {/* highlighted hubs */}
              {HUBS.map((h, i) => (
                <g key={`h${i}`}>
                  <circle cx={h[0]} cy={h[1]} r="6" fill="url(#dot)">
                    <animate attributeName="r" values="4;7;4" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={h[0]} cy={h[1]} r="6" fill="none" stroke="#e7c877" strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" values="6;18" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </svg>

            <div className="chip-flow" style={{ justifyContent: "center", marginTop: "1.4rem" }}>
              {GLOBAL.regions.map((r) => (
                <span key={r} className="pchip">{r}</span>
              ))}
            </div>
            <div className="footprint-tag">{GLOBAL.footprint}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// stylised dot-field roughly evoking the continents (decorative placeholder)
const DOTS: [number, number, number, number][] = [
  [140, 110, 2, 0.5], [165, 130, 2, 0.4], [185, 100, 2, 0.55], [120, 150, 2, 0.35], [200, 150, 2, 0.4],
  [175, 175, 2, 0.3], [220, 120, 2, 0.45], [240, 165, 2, 0.35],
  [470, 90, 2, 0.5], [495, 105, 2, 0.6], [510, 85, 2, 0.4], [455, 115, 2, 0.4], [520, 120, 2, 0.45],
  [500, 140, 2, 0.35], [540, 100, 2, 0.5],
  [520, 200, 2, 0.5], [545, 230, 2, 0.45], [500, 250, 2, 0.4], [560, 270, 2, 0.35], [535, 300, 2, 0.4],
  [640, 130, 2, 0.5], [680, 150, 2, 0.55], [720, 120, 2, 0.45], [760, 160, 2, 0.5], [700, 190, 2, 0.4],
  [800, 140, 2, 0.45], [820, 175, 2, 0.4], [850, 200, 2, 0.5],
  [870, 300, 2, 0.5], [890, 320, 2, 0.4],
  [300, 250, 2, 0.45], [330, 285, 2, 0.4], [310, 315, 2, 0.35], [345, 250, 2, 0.4],
];

// pulsing hubs — key regions
const HUBS: [number, number][] = [
  [180, 120], // North America
  [500, 110], // Europe
  [530, 240], // Africa
  [600, 160], // Middle East
  [760, 150], // Asia
  [870, 300], // Oceania
  [325, 285], // South America
];
