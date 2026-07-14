"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore, damp } from "@/lib/scrollStore";

// Calm, near-fixed camera. The contextual orbs place themselves left/right and
// carry their own motion, so the camera only adds a soft mouse parallax and a
// very slow scroll sway — keeping each orb's side/depth composition stable.
const BASE = new THREE.Vector3(0, 0, 6.2);

export default function Camera() {
  const cam = useThree((s) => s.camera);
  const pos = useRef(new THREE.Vector3().copy(BASE));
  const look = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, dt) => {
    const clampDt = Math.min(dt, 0.05);
    const { progress, mouse } = useScrollStore.getState();

    const tx = BASE.x + mouse.x * 0.45;
    const ty = BASE.y + mouse.y * 0.32 + Math.sin(progress * Math.PI * 2) * 0.12;
    const tz = BASE.z;

    pos.current.x = damp(pos.current.x, tx, 4, clampDt);
    pos.current.y = damp(pos.current.y, ty, 4, clampDt);
    pos.current.z = damp(pos.current.z, tz, 4, clampDt);

    look.current.x = damp(look.current.x, mouse.x * 0.15, 4, clampDt);
    look.current.y = damp(look.current.y, mouse.y * 0.1, 4, clampDt);

    cam.position.copy(pos.current);
    cam.lookAt(look.current);
  });

  return null;
}
