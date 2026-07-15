"use client";

import { FEEDS } from "@/lib/profile";
import Reveal from "@/components/ui/Reveal";

// One auto-updating "slide": his YouTube uploads playlist always surfaces the
// newest videos/shorts to every visitor — no manual posting. Framed as a
// premium floating stage with depth, a gold-lit backdrop and a glow behind the
// player.
export default function SocialFeeds() {
  const { youtube } = FEEDS;
  return (
    <>
      <Reveal delay={0.1}>
        <span className="eyebrow" style={{ marginTop: "clamp(3rem,6vw,5rem)", display: "block" }}>
          {FEEDS.eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="display display-lg" style={{ marginTop: "0.8rem", maxWidth: "20ch" }}>
          {FEEDS.title}
        </h3>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="yt-panel">
          <div className="yt-glow" aria-hidden />
          <div className="yt-head">
            <div>
              <span className="yt-brand">
                <span className="yt-logo" aria-hidden>▶</span> YouTube
              </span>
              <span className="yt-handle">
                {youtube.handle} · {youtube.stats}
              </span>
            </div>
            <a className="yt-cta" href={youtube.channelUrl} target="_blank" rel="noopener noreferrer">
              Open channel →
            </a>
          </div>

          <div className="yt-stage">
            <div className="yt-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${youtube.uploadsPlaylist}`}
                title="Latest videos from Prof Patrick Treacy on YouTube"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <p className="yt-note">His newest uploads and shorts, straight from the channel.</p>
        </div>
      </Reveal>
    </>
  );
}
