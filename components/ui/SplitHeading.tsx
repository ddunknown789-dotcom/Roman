"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  start?: string;
  style?: React.CSSProperties;
};

// Word-by-word rise reveal (SplitText-style, hand-rolled — no premium plugin).
export default function SplitHeading({
  text,
  className,
  as = "h2",
  start = "top 82%",
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".word > span");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { yPercent: 0 });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [start]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as;
  return (
    <Tag ref={ref} className={className} style={{ margin: 0, ...style }}>
      {words.map((w, i) => (
        <span
          key={i}
          className="word"
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span style={{ display: "inline-block", willChange: "transform" }}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
