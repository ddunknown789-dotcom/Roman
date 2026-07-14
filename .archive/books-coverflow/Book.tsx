"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/lib/palette";
import { damp } from "@/lib/scrollStore";

type Props = {
  texture: THREE.Texture;
  spineColor: string;
  pos: [number, number, number];
  rotY: number;
  scale: number;
  focused: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

// A single hardcover in the coverflow. Eased toward its slot transform; lifts
// and brightens on hover (the 3D behaviour kept from the original design).
export default function Book({
  texture,
  spineColor,
  pos,
  rotY,
  scale,
  focused,
  onSelect,
  onOpen,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const scaleRef = useRef(scale);
  const [hovered, setHovered] = useState(false);

  const materials = useMemo(() => {
    const dark = new THREE.MeshStandardMaterial({
      color: "#0a0a0d",
      roughness: 0.7,
      metalness: 0.2,
    });
    const spine = new THREE.MeshStandardMaterial({
      color: spineColor,
      roughness: 0.5,
      metalness: 0.25,
    });
    const front = new THREE.MeshStandardMaterial({
      map: texture,
      emissiveMap: texture,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.5,
      roughness: 0.5,
      metalness: 0.1,
    });
    const pages = new THREE.MeshStandardMaterial({
      color: PALETTE.ivory,
      roughness: 0.9,
    });
    // BoxGeometry faces: px(spine), nx, py, ny, pz(front cover), nz(back)
    return [spine, pages, pages, pages, front, dark];
  }, [texture, spineColor]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const cdt = Math.min(dt, 0.05);
    const lift = hovered ? 0.22 : 0;
    const fwd = hovered ? 0.35 : 0;
    g.position.x = damp(g.position.x, pos[0], 6, cdt);
    g.position.y = damp(g.position.y, pos[1] + lift, 6, cdt);
    g.position.z = damp(g.position.z, pos[2] + fwd, 6, cdt);
    g.rotation.y = damp(g.rotation.y, rotY, 6, cdt);
    const s = scale * (hovered ? 1.06 : 1);
    scaleRef.current = damp(scaleRef.current, s, 6, cdt);
    g.scale.setScalar(scaleRef.current);

    const fmat = materials[4] as THREE.MeshStandardMaterial;
    const targetEmissive = hovered || focused ? 0.72 : 0.42;
    fmat.emissiveIntensity = damp(fmat.emissiveIntensity, targetEmissive, 5, cdt);
  });

  return (
    <group
      ref={group}
      position={pos}
      rotation={[0, rotY, 0]}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "none";
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <mesh material={materials} castShadow>
        <boxGeometry args={[1.5, 2.2, 0.28]} />
      </mesh>
    </group>
  );
}
