"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BOOKS } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

const Books3D = dynamic(() => import("@/components/three/Books3D"), { ssr: false });

export default function Books() {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? BOOKS[active] : null;

  return (
    <section id="books" className="section" style={{ paddingBottom: "clamp(3rem, 6vh, 5rem)" }}>
      <div className="section-inner">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <Reveal>
              <span className="eyebrow">The Books</span>
            </Reveal>
            <SplitHeading
              text="Four books. One remarkable life."
              className="display display-xl"
              style={{ marginTop: "1.2rem", maxWidth: "14ch" }}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="body-copy" style={{ maxWidth: "34ch" }}>
              Hover a spine to open it — memoir, medicine, and the making of a modern field.
            </p>
          </Reveal>
        </div>

        {/* 3D stage */}
        <div
          style={{
            position: "relative",
            height: "clamp(360px, 52vh, 560px)",
            width: "100%",
          }}
        >
          <Books3D active={active} onHover={setActive} />
        </div>

        {/* Live blurb panel */}
        <div
          style={{
            minHeight: "9rem",
            marginTop: "1rem",
            borderTop: "1px solid rgba(200,162,76,0.2)",
            paddingTop: "1.6rem",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "2rem",
            alignItems: "start",
            transition: "opacity 0.4s ease",
          }}
        >
          <div
            className="display"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              color: "var(--gold)",
              fontStyle: "italic",
              minWidth: "3ch",
            }}
          >
            {active !== null ? String(active + 1).padStart(2, "0") : "—"}
          </div>
          <div>
            <h3
              className="display display-lg"
              style={{ margin: 0, color: "var(--ivory)" }}
            >
              {current ? current.title : "Select a title"}
            </h3>
            <p className="body-copy" style={{ marginTop: "0.8rem", maxWidth: "60ch" }}>
              {current
                ? current.blurb
                : "Move your cursor across the shelf to bring a book forward and read its story."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
