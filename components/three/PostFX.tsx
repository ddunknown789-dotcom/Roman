"use client";

import {
  EffectComposer,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// No bloom — the particle cloud is a refined matte sculpture. Only a faint
// vignette + film grain for depth and texture.
export default function PostFX() {
  return (
    <EffectComposer multisampling={2}>
      <Vignette eskil={false} offset={0.28} darkness={0.82} />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.14} />
    </EffectComposer>
  );
}
