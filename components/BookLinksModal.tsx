"use client";

import { useEffect } from "react";
import { amazonLinks, REGION_LABEL, type AmazonRegion } from "@/lib/amazon";
import type { Book } from "@/lib/content";

const REGIONS: AmazonRegion[] = ["uk", "us", "ie"];

export default function BookLinksModal({
  book,
  onClose,
}: {
  book: Book;
  onClose: () => void;
}) {
  const links = amazonLinks(book.title);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 65,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "rgba(4,4,6,0.72)",
        backdropFilter: "blur(10px)",
        animation: "modalFade 0.28s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(440px, 100%)",
          background: "linear-gradient(180deg, #14141a, #0c0c10)",
          border: "1px solid rgba(200,162,76,0.25)",
          borderRadius: 18,
          padding: "clamp(1.6rem, 4vw, 2.4rem)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
          textAlign: "center",
          animation: "modalRise 0.32s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            background: "transparent",
            border: "none",
            color: "var(--ivory-dim)",
            fontSize: "1.4rem",
            lineHeight: 1,
            cursor: "none",
          }}
        >
          ×
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.cover}
          alt={book.title}
          style={{
            width: 118,
            height: "auto",
            borderRadius: 6,
            margin: "0 auto 1.2rem",
            display: "block",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        />

        <div className="eyebrow" style={{ color: "var(--gold)" }}>
          {book.kind}
        </div>
        <h3
          className="display"
          style={{
            margin: "0.5rem 0 0.2rem",
            fontSize: "clamp(1.3rem, 3.5vw, 1.7rem)",
            color: "var(--ivory)",
          }}
        >
          {book.title}
        </h3>
        <p
          className="eyebrow"
          style={{
            marginTop: "1.1rem",
            marginBottom: "1.1rem",
            fontSize: "0.62rem",
            color: "var(--ivory-dim)",
          }}
        >
          Choose your Amazon store
        </p>

        <div style={{ display: "grid", gap: "0.7rem" }}>
          {REGIONS.map((r) => (
            <a
              key={r}
              href={links[r]}
              target="_blank"
              rel="noopener noreferrer"
              className="amz-link"
            >
              <span>{REGION_LABEL[r]}</span>
              <span aria-hidden style={{ color: "var(--gold)" }}>
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
