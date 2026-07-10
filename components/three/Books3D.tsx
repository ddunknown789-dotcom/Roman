"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import Book from "./Book";
import { BOOKS } from "@/lib/content";
import { PALETTE } from "@/lib/palette";

// Responsive shelf: wider + closer on desktop, tighter + pulled back on mobile
// so all four books always fit the frame.
function layoutFor(w: number) {
  if (w < 560) return { gap: 1.5, z: 11.6, fov: 44, key: "m" };
  if (w < 900) return { gap: 1.65, z: 9, fov: 42, key: "t" };
  return { gap: 1.85, z: 7.2, fov: 40, key: "d" };
}

export default function Books3D({
  active,
  onHover,
}: {
  active: number | null;
  onHover: (i: number | null) => void;
}) {
  const [layout, setLayout] = useState(() =>
    layoutFor(typeof window !== "undefined" ? window.innerWidth : 1200)
  );

  useEffect(() => {
    const onResize = () => setLayout(layoutFor(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const start = -((BOOKS.length - 1) * layout.gap) / 2;

  return (
    <Canvas
      key={layout.key}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, layout.z], fov: layout.fov }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100%" }}
      onPointerMissed={() => onHover(null)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} color={PALETTE.ivory} />
      <pointLight position={[-4, 2, 3]} intensity={20} color={PALETTE.steel} distance={18} />
      <Environment resolution={128} background={false}>
        <Lightformer form="rect" intensity={1.6} position={[2, 3, 4]} scale={[7, 7, 1]} color={PALETTE.goldHi} />
      </Environment>

      {BOOKS.map((b, i) => (
        <Book
          key={b.title}
          data={b}
          index={i}
          x={start + i * layout.gap}
          active={active === i}
          onHover={onHover}
        />
      ))}
    </Canvas>
  );
}
