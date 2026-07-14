"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import ParticleModel from "./ParticleModel";
import Camera from "./Camera";
import PostFX from "./PostFX";
import { PALETTE } from "@/lib/palette";
import { useScrollStore } from "@/lib/scrollStore";

// A dust layer that streams past as the visitor scrolls, at a depth-dependent
// rate — nearer dust moves faster than far dust. This parallax is what makes the
// whole page feel like one continuous 3D world you travel down through, rather
// than a flat background behind separate sections.
function ParallaxDust({
  factor,
  count,
  box,
  size,
  opacity,
  z,
}: {
  factor: number;
  count: number;
  box: [number, number, number];
  size: number;
  opacity: number;
  z: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = useScrollStore.getState().progress;
    ref.current.position.y = p * factor;
  });
  return (
    <group ref={ref} position={[0, 0, z]}>
      <Sparkles
        count={count}
        scale={box}
        size={size}
        speed={0.14}
        opacity={opacity}
        color={PALETTE.ivoryDim}
      />
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={[PALETTE.void]} />

      {/* two dust layers at different depths + parallax rates = a sense of
          travelling down through a continuous 3D world while scrolling */}
      <ParallaxDust factor={14} count={240} box={[26, 48, 10]} size={1.1} opacity={0.32} z={-1} />
      <ParallaxDust factor={7} count={150} box={[32, 48, 6]} size={0.75} opacity={0.18} z={-5} />

      {/* one cohesive particle cloud that reforms per chapter (Treacy → MJ → …) */}
      <ParticleModel />
      <Camera />
      <PostFX />
    </>
  );
}

export default function Stage() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.95,
      }}
      camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 100 }}
    >
      <Scene />
    </Canvas>
  );
}
