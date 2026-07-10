"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export default function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField focusDistance={0.025} focalLength={0.03} bokehScale={1.6} height={480} />
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.45}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0006, 0.0006)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.18} />
    </EffectComposer>
  );
}
