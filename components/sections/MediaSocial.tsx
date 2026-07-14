"use client";

import { MEDIA, SOCIAL, SPEAKER_KIT } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import SocialFeeds from "@/components/sections/SocialFeeds";

export default function MediaSocial() {
  return (
    <section id="media" className="section">
      <div className="section-inner">
        {/* -------- Media & commentary -------- */}
        <Reveal>
          <span className="eyebrow">{MEDIA.eyebrow}</span>
        </Reveal>
        <SplitHeading text={MEDIA.title} className="display display-xl" style={{ marginTop: "1.2rem", maxWidth: "22ch" }} />

        {/* Featured film placeholder */}
        <Reveal delay={0.1}>
          <div className="media-film">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>{MEDIA.featured.label}</div>
            <h3 className="display display-lg" style={{ margin: "0.6rem 0 0.3rem" }}>{MEDIA.featured.title}</h3>
            <p className="pcard-body" style={{ maxWidth: "50ch" }}>{MEDIA.featured.tagline}</p>
            {/* TODO: featured film link */}
            <div className="media-film-frame" aria-label="Featured film placeholder">
              <span className="media-play">▶</span>
              <span>Film — asset to be added</span>
            </div>
          </div>
        </Reveal>

        {/* Outlets */}
        <div className="grid-cards cols-2" style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
          {MEDIA.outlets.map((o, i) => (
            <Reveal key={o.name} delay={(i % 2) * 0.05}>
              <div className="pcard media-outlet">
                <div className="media-outlet-name">{o.name}</div>
                <div className="media-outlet-kind">{o.kind}</div>
                <p className="pcard-body">{o.note}</p>
                {!o.href && <span className="media-todo">Link to be added</span>}
              </div>
            </Reveal>
          ))}
        </div>

        {/* -------- Social presence -------- */}
        <Reveal delay={0.1}>
          <span className="eyebrow" style={{ marginTop: "clamp(3rem,6vw,5rem)", display: "block" }}>{SOCIAL.eyebrow}</span>
        </Reveal>
        <SplitHeading text={SOCIAL.title} className="display display-lg" style={{ marginTop: "0.8rem" }} />
        <Reveal delay={0.1}>
          <p className="body-copy p-lead">{SOCIAL.lead}</p>
        </Reveal>

        {/* live auto-updating YouTube + Instagram slides */}
        <SocialFeeds />

        <div className="social-grid">
          {SOCIAL.channels.map((c, i) => {
            const live = !c.placeholder && c.href;
            const Inner = (
              <>
                <div className="social-top">
                  <span className="social-platform">{c.platform}</span>
                  {c.placeholder && <span className="social-flag">Coming soon</span>}
                </div>
                <div className="social-handle">{c.handle}</div>
                <p className="social-note">{c.note}</p>
                {c.stats && <div className="social-stats">{c.stats}</div>}
                <span className="social-cta">{live ? "Visit →" : "Link to be added"}</span>
              </>
            );
            return (
              <Reveal key={c.platform} delay={(i % 4) * 0.05}>
                {live ? (
                  <a className="social-card is-live" href={c.href} target="_blank" rel="noopener noreferrer">
                    {Inner}
                  </a>
                ) : (
                  <div className="social-card">{Inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        {/* -------- Speaker media kit CTA -------- */}
        <Reveal delay={0.1}>
          <div className="speaker-kit">
            <div>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>{SPEAKER_KIT.eyebrow}</span>
              <h3 className="display display-lg" style={{ margin: "0.6rem 0 1rem", maxWidth: "18ch" }}>{SPEAKER_KIT.title}</h3>
              <ul className="speaker-kit-list">
                {SPEAKER_KIT.included.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            {/* TODO: speaker profile PDF download */}
            <div className="speaker-kit-cta">
              <span className="p-cta is-disabled" aria-disabled>
                Download Speaker Profile
                <em>PDF to be added</em>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
