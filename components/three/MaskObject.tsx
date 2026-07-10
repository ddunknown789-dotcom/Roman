"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { maskVertex, maskFragment } from "./shaders/maskShader";
import { PALETTE } from "@/lib/palette";
import { useScrollStore, damp } from "@/lib/scrollStore";

export default function MaskObject() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const morph = useRef(0);
  const rot = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color(PALETTE.graphite) },
      uColorB: { value: new THREE.Color(PALETTE.gold) },
      uColorC: { value: new THREE.Color(PALETTE.steel) },
    }),
    []
  );

  useFrame((state, dt) => {
    const clampDt = Math.min(dt, 0.05);
    const { progress, mouse } = useScrollStore.getState();

    if (mat.current) {
      const u = mat.current.uniforms;
      u.uTime.value = state.clock.elapsedTime;

      // Morph swells around the "Behind the Mask" chapter (~mid scroll).
      const target = Math.sin(progress * Math.PI) * 0.7 + progress * 0.3;
      morph.current = damp(morph.current, target, 3, clampDt);
      u.uMorph.value = morph.current;

      (u.uMouse.value as THREE.Vector2).set(mouse.x, mouse.y);
    }

    if (mesh.current) {
      // slow idle spin + subtle mouse-follow tilt
      rot.current.y = damp(rot.current.y, mouse.x * 0.4, 2.5, clampDt);
      rot.current.x = damp(rot.current.x, -mouse.y * 0.3, 2.5, clampDt);
      mesh.current.rotation.y += clampDt * 0.08;
      mesh.current.rotation.x = rot.current.x;
      mesh.current.rotation.z = rot.current.y * 0.2;
      const s = 1 + morph.current * 0.06;
      mesh.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 64]} />
      <shaderMaterial
        ref={mat}
        vertexShader={maskVertex}
        fragmentShader={maskFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}
