"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { morphVertex, morphFragment } from "./shaders/morphShader";
import { samplePortrait, loadImage, type PortraitData } from "@/lib/portrait";
import { useScrollStore, damp } from "@/lib/scrollStore";

const COUNT = 130000;

// Each station pins the cloud to a DOM section and picks which photo it reforms
// into there. The visitor scrolls the hero face up and away, the same particles
// reassemble as Michael Jackson at the friendship chapter, then as Prof Treacy
// with his award at Honours & Awards.
const STATIONS = [
  // The hero (target 0) is handled specially below — it opens centred and lives
  // through the whole About section. These two form when their section centres.
  // `x` nudges the formation sideways (the copy sits left, so a touch right).
  // `appear` = [top-hi, top-lo] fade-in window (section top in viewport heights).
  // Mask appears late so the Doctor (which precedes it) fully disperses first —
  // the swap between the two photos then happens while the cloud is scattered.
  { section: "mask", target: 1, x: 0.7, appear: [0.45, 0.1] as [number, number] },
  { section: "awards", target: 2, x: 0, appear: [1.05, 0.4] as [number, number] },
];

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Every section this cloud reacts to, measured ONCE (on mount / resize / late
// layout settle) instead of via getBoundingClientRect() every render frame.
// getBoundingClientRect() forces a synchronous layout recalculation — doing
// that up to 7x per frame inside useFrame (i.e. on every WebGL frame, forever)
// is expensive enough to visibly drop frame rate, which is what turned Lenis's
// smooth scroll-easing into a "stepped"/sticky feel. Reading window.scrollY and
// window.innerHeight is cheap (no layout flush), so caching each section's
// document-absolute top/height and deriving viewport-relative position with
// plain arithmetic each frame removes all forced layout from the hot loop.
const SECTION_IDS = [
  "mask",
  "awards",
  "story",
  "protocols",
  "safety",
  "books",
  "publications",
  "lectures",
] as const;
type Measured = { top: number; height: number };

// choose a plane width so each portrait fits ~4.4 world units tall regardless
// of the photo's aspect ratio
const planeWidthFor = (img: HTMLImageElement) =>
  Math.min(5.2, 4.6 * (img.width / img.height));

export default function ParticleModel() {
  const group = useRef<THREE.Points>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const disperse = useRef(1);
  const posX = useRef(0);
  const posY = useRef(0);
  const measured = useRef<Partial<Record<(typeof SECTION_IDS)[number], Measured>>>({});
  const vhRef = useRef(typeof window !== "undefined" ? window.innerHeight : 800);
  const dpr = useThree((s) => s.gl.getPixelRatio());
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const fallback = (): PortraitData => {
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3).fill(0.6);
        for (let i = 0; i < COUNT; i++) {
          const u = Math.random() * 2 - 1;
          const th = Math.random() * Math.PI * 2;
          const s = Math.sqrt(1 - u * u);
          positions[i * 3] = s * Math.cos(th) * 1.6;
          positions[i * 3 + 1] = u * 1.6;
          positions[i * 3 + 2] = s * Math.sin(th) * 1.6;
        }
        return { positions, colors };
      };
      const sample = async (src: string): Promise<PortraitData> => {
        try {
          const img = await loadImage(src);
          return samplePortrait(img, COUNT, planeWidthFor(img));
        } catch {
          return fallback();
        }
      };

      const [pt, mj, emmy, doctor, reading] = await Promise.all([
        sample("/portrait.png"),
        sample("/mj1.png"),
        sample("/pt2.png"),
        sample("/doctor.png"),
        sample("/reading.png"),
      ]);
      if (!alive) return;

      const sizes = new Float32Array(COUNT);
      const phases = new Float32Array(COUNT);
      const rands = new Float32Array(COUNT);
      const dirs = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        sizes[i] = 0.6 + Math.random() * 1.4;
        phases[i] = Math.random();
        rands[i] = Math.random();
        const dx = Math.random() * 2 - 1;
        const dy = Math.random() * 2 - 1;
        const dz = Math.random() * 2 - 1;
        const dl = Math.hypot(dx, dy, dz) || 1;
        dirs[i * 3] = dx / dl;
        dirs[i * 3 + 1] = dy / dl;
        dirs[i * 3 + 2] = dz / dl;
      }

      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pt.positions, 3));
      g.setAttribute("aColor", new THREE.BufferAttribute(pt.colors, 3));
      g.setAttribute("aPos1", new THREE.BufferAttribute(mj.positions, 3));
      g.setAttribute("aColor1", new THREE.BufferAttribute(mj.colors, 3));
      g.setAttribute("aPos2", new THREE.BufferAttribute(emmy.positions, 3));
      g.setAttribute("aColor2", new THREE.BufferAttribute(emmy.colors, 3));
      g.setAttribute("aPos3", new THREE.BufferAttribute(doctor.positions, 3));
      g.setAttribute("aColor3", new THREE.BufferAttribute(doctor.colors, 3));
      g.setAttribute("aPos4", new THREE.BufferAttribute(reading.positions, 3));
      g.setAttribute("aColor4", new THREE.BufferAttribute(reading.colors, 3));
      g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
      g.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));
      g.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));
      setGeometry(g);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 6.0 },
      uPixelRatio: { value: Math.min(dpr, 2) },
      uTarget: { value: 0 },
      uDisperse: { value: 1 },
      uOpacity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [dpr]
  );

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const measure = () => {
      vhRef.current = window.innerHeight;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        measured.current[id] = { top: r.top + window.scrollY, height: r.height };
      }
    };
    measure();
    // re-measure after layout / fonts settle and once the Books section's
    // GSAP ScrollTrigger pin spacer has grown the page height
    const t1 = window.setTimeout(measure, 400);
    const t2 = window.setTimeout(measure, 1500);
    window.addEventListener("load", measure);
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // derive a section's viewport-relative top/bottom/height (in vh units) from
  // the cached measurement + current scroll — no DOM read, no forced layout
  const rectFor = (id: (typeof SECTION_IDS)[number], scrollY: number, vh: number) => {
    const m = measured.current[id];
    if (!m) return null;
    return {
      top: (m.top - scrollY) / vh,
      bottom: (m.top + m.height - scrollY) / vh,
      height: m.height / vh,
    };
  };

  useFrame((state, dt) => {
    const clampDt = Math.min(dt, 0.05);
    const g = group.current;
    if (!g || !mat.current) return;
    const { mouse } = useScrollStore.getState();
    const vh = vhRef.current;
    const scrollY = window.scrollY; // cheap: no layout flush (unlike getBoundingClientRect)

    const t = state.clock.elapsedTime;
    const m = reduced ? 0 : 1;

    // ---- MJ (mask) & Emmy (awards): each fades in as its section enters, then
    // sinks steadily DOWNWARD through it (like the hero — it descends with you,
    // it doesn't ride up with the page), and disperses as the section hands off
    // to the next chapter ----
    let stA = 0;
    let stTarget = 0;
    let stX = 0;
    let stY = 0;
    for (let i = 0; i < STATIONS.length; i++) {
      const rect = rectFor(STATIONS[i].section as (typeof SECTION_IDS)[number], scrollY, vh);
      if (!rect) continue;
      const { top, bottom, height: h } = rect;
      const ap = STATIONS[i].appear;
      const appear = smoothstep(ap[0], ap[1], top); // in as the section rises into view
      const leave = smoothstep(0.08, 0.55, bottom); // out as it hands to the next chapter
      const a = Math.min(appear, leave);
      if (a > stA) {
        stA = a;
        stTarget = STATIONS[i].target;
        // scroll progress across the section: 0 as it enters, 1 as its bottom
        // reaches the next chapter — drives a continuous downward sink
        const k = Math.max(0, Math.min(1, (1.0 - top) / (1.0 + h)));
        stY = 0.55 - k * 2.1 + Math.sin(t * 0.11) * 0.08 * m;
        // a touch to the right of centre (the copy now sits left) + gentle drift
        stX = STATIONS[i].x + Math.sin(t * 0.05) * 0.2 * m;
      }
    }

    // ---- HERO (target 0): opens dead-centre, then eases toward the blank space
    // (the right, once the left-aligned About copy takes over), lingering the
    // whole About section, and disperses at its end ----
    let heroA = 0;
    let heroX = 0;
    let heroY = 0;
    const storyRect = rectFor("story", scrollY, vh);
    if (storyRect) {
      // >0 while the About section still spans past centre; →0/neg at its end
      const endProx = storyRect.bottom - 0.5;
      heroA = smoothstep(-0.35, 0.2, endProx); // 1 formed .. 0 destroyed
      // descent progress, driven LINEARLY off scroll so the orb starts sinking
      // on the very first scroll: `upper` is the endProx value at the top of the
      // page (hero is 100vh), so k = 0 at rest and reaches 1 exactly as the
      // About section ends and the orb disperses.
      const upper = 0.5 + storyRect.height;
      const k = Math.max(0, Math.min(1, (upper - endProx) / (upper + 0.35)));
      // the orb itself sinks steadily downward the whole time (reads as the orb
      // descending with you, not just the page), easing only slightly left.
      heroY = 0.25 - k * 2.15 + Math.sin(t * 0.11) * 0.08 * m;
      heroX = -smoothstep(0.08, 1.0, k) * 0.55 + Math.sin(t * 0.05) * 0.16 * m;
    }

    // ---- DOCTOR (target 3): originates at Signature Protocols, sinks through it
    // and Patient Safety like the hero, and disperses exactly as Patient Safety
    // hands to the Mask chapter — so its ending meets Michael Jackson's origin ----
    let docA = 0;
    let docX = 0;
    let docY = 0;
    const protoRect = rectFor("protocols", scrollY, vh);
    const safetyRect = rectFor("safety", scrollY, vh);
    if (protoRect && safetyRect) {
      const protoTop = protoRect.top;
      const safetyBottom = safetyRect.bottom;
      const protoH = protoRect.height;
      const safetyH = safetyRect.height;
      const appear = smoothstep(1.05, 0.5, protoTop); // in as Protocols rises up
      // disperse through the lower part of Safety and be GONE before the Mask
      // formation begins (mask appears at top ≤ 0.45), so the doctor→MJ swap
      // happens while the cloud is scattered — a clean hand-off, not a pop
      const leave = smoothstep(0.55, 0.85, safetyBottom); // out as Safety ends
      docA = Math.min(appear, leave);
      // linear descent across the two-section span (Protocols → Safety)
      const k = Math.max(0, Math.min(1, (0.9 - protoTop) / (0.9 + protoH + safetyH)));
      docY = 0.5 - k * 2.2 + Math.sin(t * 0.11) * 0.08 * m;
      docX = 0.6 + Math.sin(t * 0.05) * 0.2 * m; // a touch right (the copy sits left)
    }

    // ---- READING (target 4): originates at the Books section ("Explore the
    // Collection"), sinks through Books → Publications like the hero, and
    // disperses at the MIDDLE of Signature Lecture Topics ----
    let readA = 0;
    let readX = 0;
    let readY = 0;
    const booksRect = rectFor("books", scrollY, vh);
    const pubRect = rectFor("publications", scrollY, vh);
    const lecturesRect = rectFor("lectures", scrollY, vh);
    if (booksRect && lecturesRect) {
      const booksTop = booksRect.top;
      const booksH = booksRect.height;
      const pubH = pubRect ? pubRect.height : 1;
      const lecturesH = lecturesRect.height;
      const lecturesMid = lecturesRect.top + lecturesRect.height / 2; // vh units to lectures centre
      const appear = smoothstep(1.05, 0.5, booksTop); // in as Books rises up
      // disperse as the MIDDLE of Lectures approaches the viewport centre
      const leave = smoothstep(0.35, 0.85, lecturesMid);
      readA = Math.min(appear, leave);
      // linear descent across the whole span (Books → Publications → mid-Lectures)
      const span = 0.9 + booksH + pubH + 0.5 * lecturesH;
      const k = Math.max(0, Math.min(1, (0.9 - booksTop) / span));
      readY = 0.55 - k * 2.15 + Math.sin(t * 0.11) * 0.08 * m;
      readX = 0.6 + Math.sin(t * 0.05) * 0.2 * m; // a touch right (the copy sits left)
    }

    // ---- choose the active formation (whichever is most present) ----
    let target: number;
    let opacity: number;
    let wantX: number;
    let wantY: number;
    if (heroA >= stA && heroA >= docA && heroA >= readA) {
      target = 0;
      opacity = heroA;
      wantX = heroX;
      wantY = heroY;
    } else if (docA >= stA && docA >= readA) {
      target = 3;
      opacity = docA;
      wantX = docX;
      wantY = docY;
    } else if (readA >= stA) {
      target = 4;
      opacity = readA;
      wantX = readX;
      wantY = readY;
    } else {
      target = stTarget;
      opacity = stA;
      wantX = stX;
      wantY = stY;
    }

    const u = mat.current.uniforms;
    u.uTime.value = t;
    u.uTarget.value = target;
    u.uOpacity.value = opacity;
    // formed while a formation is active, scattered as it hands off / ends
    disperse.current = damp(disperse.current, 1 - opacity, 7, clampDt);
    u.uDisperse.value = disperse.current;
    (u.uMouse.value as THREE.Vector2).set(mouse.x, mouse.y);

    posX.current = damp(posX.current, wantX, 8, clampDt);
    posY.current = damp(posY.current, wantY, 10, clampDt);
    g.position.x = posX.current;
    g.position.y = posY.current;
    // gentle depth drift so it reads as a living 3D form, not a flat decal
    g.position.z = Math.sin(t * 0.06 + 0.7) * 0.4 * m;

    // slow yaw / tilt sway layered under the mouse parallax
    g.rotation.y = Math.sin(t * 0.09) * 0.13 * m + mouse.x * 0.06;
    g.rotation.x = Math.sin(t * 0.075) * 0.05 * m - mouse.y * 0.05;
  });

  if (!geometry) return null;

  return (
    <points ref={group} geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={morphVertex}
        fragmentShader={morphFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
