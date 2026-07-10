"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import MaskObject from "./MaskObject";
import Camera from "./Camera";
import PostFX from "./PostFX";
import { PALETTE } from "@/lib/palette";

function Scene() {
  return (
    <>
      <color attach="background" args={[PALETTE.void]} />
      <fog attach="fog" args={[PALETTE.void, 6, 14]} />

      <ambientLight intensity={0.16} />
      <pointLight position={[4, 3, 5]} intensity={14} color={PALETTE.goldHi} distance={20} />
      <pointLight position={[-5, -2, 3]} intensity={8} color={PALETTE.steel} distance={20} />

      <Suspense fallback={null}>
        <Environment resolution={128} background={false}>
          <Lightformer
            form="rect"
            intensity={2}
            position={[3, 2, 4]}
            scale={[6, 6, 1]}
            color={PALETTE.goldHi}
          />
          <Lightformer
            form="circle"
            intensity={1.4}
            position={[-4, -1, 2]}
            scale={[5, 5, 1]}
            color={PALETTE.steel}
          />
        </Environment>

        <MaskObject />
      </Suspense>

      <Sparkles
        count={90}
        scale={[12, 8, 8]}
        size={2.2}
        speed={0.25}
        opacity={0.5}
        color={PALETTE.ivory}
      />

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
        toneMappingExposure: 0.72,
      }}
      camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 100 }}
    >
      <Scene />
    </Canvas>
  );
}
