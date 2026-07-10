"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore, damp } from "@/lib/scrollStore";
import { CAMERA_STATIONS, sampleStations } from "@/lib/journey";

// Production camera: lerps through named stations by scroll progress, with a
// gentle mouse parallax on top. Dev orbit lives in a separate gated module.
export default function Camera() {
  const cam = useThree((s) => s.camera);
  const pos = useRef(new THREE.Vector3().copy(CAMERA_STATIONS[0].pos));
  const look = useRef(new THREE.Vector3().copy(CAMERA_STATIONS[0].target));
  const tmpPos = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const clampDt = Math.min(dt, 0.05);
    const { progress, mouse } = useScrollStore.getState();

    sampleStations(progress, tmpPos.current, tmpLook.current);

    // add mouse parallax to the sampled camera position
    tmpPos.current.x += mouse.x * 0.5;
    tmpPos.current.y += mouse.y * 0.35;

    pos.current.x = damp(pos.current.x, tmpPos.current.x, 4, clampDt);
    pos.current.y = damp(pos.current.y, tmpPos.current.y, 4, clampDt);
    pos.current.z = damp(pos.current.z, tmpPos.current.z, 4, clampDt);
    look.current.lerp(tmpLook.current, 1 - Math.exp(-4 * clampDt));

    cam.position.copy(pos.current);
    cam.lookAt(look.current);
  });

  return null;
}
