"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildCoverTexture } from "@/lib/coverTexture";
import { PALETTE } from "@/lib/palette";
import { damp } from "@/lib/scrollStore";
import type { Book as BookData } from "@/lib/content";

type Props = {
  data: BookData;
  index: number;
  x: number;
  active: boolean;
  onHover: (i: number | null) => void;
};

export default function Book({ data, index, x, active, onHover }: Props) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const t0 = useMemo(() => Math.random() * 10, []);

  const cover = useMemo(
    () => buildCoverTexture(data.title, data.kind, data.spineColor),
    [data]
  );

  // per-face materials: [ +x spine? ] order = px, nx, py, ny, pz(front), nz(back)
  const materials = useMemo(() => {
    const dark = new THREE.MeshStandardMaterial({
      color: "#0b0b0e",
      roughness: 0.85,
      metalness: 0.1,
    });
    const spine = new THREE.MeshStandardMaterial({
      color: data.spineColor,
      roughness: 0.6,
      metalness: 0.2,
    });
    const front = new THREE.MeshStandardMaterial({
      map: cover,
      roughness: 0.55,
      metalness: 0.15,
    });
    const pages = new THREE.MeshStandardMaterial({
      color: PALETTE.ivory,
      roughness: 0.9,
    });
    return [spine, pages, pages, pages, front, dark];
  }, [cover, data.spineColor]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const clampDt = Math.min(dt, 0.05);
    const et = state.clock.elapsedTime + t0;

    const targetY = Math.sin(et * 0.7) * 0.12 + (active ? 0.25 : 0);
    const targetZ = active ? 0.9 : 0;
    const targetRot = active ? 0 : -0.35 + Math.sin(et * 0.4) * 0.05;
    const targetScale = active ? 1.12 : 1;

    g.position.y = damp(g.position.y, targetY, 4, clampDt);
    g.position.z = damp(g.position.z, targetZ, 5, clampDt);
    g.rotation.y = damp(g.rotation.y, targetRot, 4, clampDt);
    const s = damp(g.scale.x, targetScale, 6, clampDt);
    g.scale.setScalar(s);
  });

  return (
    <group position={[x, 0, 0]}>
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(index);
          document.body.style.cursor = "none";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <mesh material={materials} castShadow>
          <boxGeometry args={[1.5, 2.15, 0.26]} />
        </mesh>
        {/* gold edge glow when active */}
        {(active || hovered) && (
          <pointLight position={[0, 0, 1.4]} intensity={3} color={PALETTE.goldHi} distance={4} />
        )}
      </group>
    </group>
  );
}
