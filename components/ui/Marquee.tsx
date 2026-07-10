"use client";

// Infinite kinetic marquee divider (pure CSS animation, reduced-motion safe).
export default function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: "1px solid rgba(200,162,76,0.18)",
        borderBottom: "1px solid rgba(200,162,76,0.18)",
        padding: "1.6rem 0",
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: "3.5rem",
          animation: "marquee 28s linear infinite",
          willChange: "transform",
        }}
      >
        {row.map((it, i) => (
          <span
            key={i}
            className="display"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.6rem)",
              color: i % 2 ? "var(--gold)" : "var(--ivory)",
              fontStyle: i % 2 ? "italic" : "normal",
              opacity: 0.9,
            }}
          >
            {it}
            <span style={{ color: "var(--gold)", margin: "0 0.2em" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
