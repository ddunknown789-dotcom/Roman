"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import Book from "./Book";
import { PALETTE } from "@/lib/palette";
import type { Book as BookData } from "@/lib/content";

const RANGE = 4; // books shown to each side of centre

function slotTransform(o: number) {
  if (o === 0) return { pos: [0, 0, 0.7] as [number, number, number], rotY: 0, scale: 1.2 };
  const abs = Math.abs(o);
  const sign = Math.sign(o);
  const x = sign * (1.42 + (abs - 1) * 0.98);
  const z = -0.5 - abs * 0.85;
  const rotY = -sign * 0.98;
  const scale = Math.max(0.55, 0.95 - (abs - 1) * 0.06);
  return { pos: [x, 0, z] as [number, number, number], rotY, scale };
}

const wrap = (v: number, n: number) => ((v % n) + n) % n;

function Shelf({
  books,
  active,
  onActive,
  onOpen,
}: {
  books: BookData[];
  active: number;
  onActive: (i: number) => void;
  onOpen: (i: number) => void;
}) {
  const textures = useTexture(books.map((b) => b.cover)) as THREE.Texture[];
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  const len = books.length;
  const slots: number[] = [];
  for (let o = -RANGE; o <= RANGE; o++) slots.push(active + o);

  return (
    <>
      {slots.map((vi) => {
        const ri = wrap(vi, len);
        const t = slotTransform(vi - active);
        return (
          <Book
            key={vi}
            texture={textures[ri]}
            spineColor={books[ri].spineColor}
            pos={t.pos}
            rotY={t.rotY}
            scale={t.scale}
            focused={vi === active}
            onSelect={() => onActive(vi)}
            onOpen={() => onOpen(ri)}
          />
        );
      })}
    </>
  );
}

export default function Books3D({
  books,
  active,
  onActive,
  onOpen,
}: {
  books: BookData[];
  active: number;
  onActive: (i: number) => void;
  onOpen: (i: number) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0.55, 6.1], fov: 42 }}
      onCreated={({ camera }) => camera.lookAt(0, -0.15, 0)}
      gl={{
        alpha: false,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onPointerMissed={() => {}}
    >
      <color attach="background" args={[PALETTE.void]} />
      <fog attach="fog" args={[PALETTE.void, 6.5, 15]} />
      <ambientLight intensity={0.45} />
      <spotLight
        position={[0, 6, 6]}
        angle={0.55}
        penumbra={0.9}
        intensity={60}
        color={PALETTE.ivory}
        distance={30}
      />
      <pointLight position={[0, 2.5, 4]} intensity={14} color={PALETTE.ivory} distance={22} />
      <pointLight position={[-6, 1, 1]} intensity={7} color={PALETTE.steel} distance={20} />
      <pointLight position={[6, 1, 1]} intensity={7} color={PALETTE.steel} distance={20} />

      <Environment resolution={128} background={false}>
        <Lightformer form="rect" intensity={1.3} position={[0, 5, 6]} scale={[12, 6, 1]} color={PALETTE.ivory} />
        <Lightformer form="rect" intensity={0.7} position={[0, 0, -8]} scale={[16, 8, 1]} color={PALETTE.steel} />
      </Environment>

      <Suspense fallback={null}>
        <Shelf books={books} active={active} onActive={onActive} onOpen={onOpen} />
      </Suspense>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          resolution={720}
          blur={[400, 120]}
          mixBlur={1.2}
          mixStrength={26}
          roughness={0.95}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          color="#070708"
          metalness={0.55}
          mirror={0.55}
        />
      </mesh>
    </Canvas>
  );
}
