"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BOOKS } from "@/lib/content";
import BookLinksModal from "@/components/BookLinksModal";

const Books3D = dynamic(() => import("@/components/three/Books3D"), { ssr: false });

const pad = (n: number) => String(n).padStart(2, "0");

export default function Books() {
  // `active` is a virtual index — it can grow/shrink without bound so the
  // coverflow loops infinitely with books always on both sides.
  const [active, setActive] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const total = BOOKS.length;
  const realIndex = ((active % total) + total) % total;
  const go = (i: number) => setActive(i);

  return (
    <section
      id="books"
      className="section"
      style={{
        paddingTop: "clamp(3rem, 8vh, 6rem)",
        paddingBottom: "clamp(2rem, 5vh, 4rem)",
        paddingInline: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* header */}
      <div style={{ textAlign: "center" }}>
        <div
          className="eyebrow"
          style={{ color: "var(--gold)", letterSpacing: "0.4em", fontSize: "0.8rem" }}
        >
          Explore the Collection
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            margin: "1.1rem auto 0",
            maxWidth: 240,
            color: "var(--gold)",
          }}
        >
          <span style={{ flex: 1, height: 1, background: "rgba(200,162,76,0.35)" }} />
          <span style={{ fontSize: "0.7rem" }}>◇</span>
          <span style={{ flex: 1, height: 1, background: "rgba(200,162,76,0.35)" }} />
        </div>
        <div
          className="eyebrow"
          style={{ marginTop: "1rem", color: "var(--ivory-dim)", letterSpacing: "0.35em" }}
        >
          {pad(realIndex + 1)} <span style={{ color: "var(--gold)" }}>—</span> {pad(total)}
        </div>
      </div>

      {/* coverflow */}
      <div style={{ position: "relative", flex: 1, width: "100%", minHeight: "clamp(340px, 56vh, 620px)" }}>
        <Books3D books={BOOKS} active={active} onActive={go} onOpen={setModalIndex} />
      </div>

      {/* active title caption */}
      <div style={{ textAlign: "center", marginBottom: "1.4rem", minHeight: "3.4rem" }}>
        <h3
          className="display"
          style={{ margin: 0, fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "var(--ivory)" }}
        >
          {BOOKS[realIndex].title}
        </h3>
        <p className="eyebrow" style={{ marginTop: "0.5rem", color: "var(--gold)" }}>
          {BOOKS[realIndex].kind}
        </p>
      </div>

      {/* controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
      >
        <button
          aria-label="Previous book"
          onClick={() => go(active - 1)}
          className="cf-arrow"
        >
          ←
        </button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem" }}>
          <span
            aria-hidden
            style={{
              width: 20,
              height: 30,
              border: "1.5px solid var(--gold)",
              borderRadius: 12,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 5,
                left: "50%",
                transform: "translateX(-50%)",
                width: 2,
                height: 6,
                background: "var(--gold)",
                borderRadius: 2,
                animation: "scrollcue 1.8s ease-in-out infinite",
              }}
            />
          </span>
          <span className="eyebrow" style={{ fontSize: "0.62rem", color: "var(--ivory-dim)" }}>
            Click to Browse · Double-Click to Buy
          </span>
        </div>
        <button
          aria-label="Next book"
          onClick={() => go(active + 1)}
          className="cf-arrow"
        >
          →
        </button>
      </div>

      {modalIndex !== null && (
        <BookLinksModal book={BOOKS[modalIndex]} onClose={() => setModalIndex(null)} />
      )}
    </section>
  );
}
