"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "@/lib/scrollStore";

let registered = false;

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    // reloads start at the top (don't restore mid-page scroll)
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      // Reduced-motion: no smoothing, still keep progress in sync for the scene.
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        useScrollStore.getState().setProgress(max > 0 ? window.scrollY / max : 0);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", (e: { scroll: number; limit: number }) => {
      ScrollTrigger.update();
      const p = e.limit > 0 ? e.scroll / e.limit : 0;
      useScrollStore.getState().setProgress(p);
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    lenis.scrollTo(0, { immediate: true });
    // dev aid: allow precise programmatic scrolling during testing
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Keep ScrollTrigger and Lenis married.
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
