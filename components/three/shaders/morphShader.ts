// ONE particle cloud, conserved across the whole page. It holds three image
// targets (Prof Treacy, Michael Jackson, Prof Treacy + Emmy) sampled from
// photos, and reforms from one into the next as the visitor scrolls — the same
// tiny particles changing shape. Between targets the cloud scatters into a drift
// field (uDisperse) and reassembles, so the "destruction" reads as continuous.
//
// Colours come straight from the photos (gold-lit / blue-shadow duotone) but are
// de-whited and capped so no particle ever glows white. Matte points, no
// additive blending — crisp, never bloomy.

export const morphVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uTarget;     // 0 = portrait · 1 = MJ · 2 = Emmy · 3 = Doctor · 4 = Reading
uniform float uDisperse;   // 0 formed .. 1 scattered
uniform vec2  uMouse;

attribute float aSize;
attribute float aPhase;
attribute float aRand;
attribute vec3  aDir;      // unit scatter direction
attribute vec3  aPos1;     // MJ position
attribute vec3  aPos2;     // Emmy position
attribute vec3  aPos3;     // Doctor position
attribute vec3  aPos4;     // Reading position
attribute vec3  aColor;    // portrait colour
attribute vec3  aColor1;   // MJ colour
attribute vec3  aColor2;   // Emmy colour
attribute vec3  aColor3;   // Doctor colour
attribute vec3  aColor4;   // Reading colour

varying vec3 vColor;

void main() {
  vec3 basePos = uTarget < 0.5 ? position
    : (uTarget < 1.5 ? aPos1 : (uTarget < 2.5 ? aPos2 : (uTarget < 3.5 ? aPos3 : aPos4)));
  vec3 baseCol = uTarget < 0.5 ? aColor
    : (uTarget < 1.5 ? aColor1 : (uTarget < 2.5 ? aColor2 : (uTarget < 3.5 ? aColor3 : aColor4)));

  float shimmer = sin(uTime * 0.6 + aPhase * 6.2831) * 0.016;
  float mouseP = (uMouse.x * basePos.x + uMouse.y * basePos.y) * 0.05;
  vec3 formed = basePos + aDir * shimmer + vec3(0.0, 0.0, mouseP);

  float ease = uDisperse * uDisperse * (3.0 - 2.0 * uDisperse);
  vec3 drift = vec3(
    sin(uTime * 0.3 + aPhase * 6.2831),
    cos(uTime * 0.26 + aPhase * 6.2831),
    sin(uTime * 0.22 + aPhase * 3.14)
  ) * 0.6;
  vec3 scattered = aDir * (2.6 + aRand * 6.0) + drift;

  vec3 finalPos = mix(formed, scattered, ease);

  vec4 mv = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * mv;

  vColor = baseCol;
  float size = uSize * aSize * (1.0 - 0.2 * ease);
  gl_PointSize = size * uPixelRatio * (1.0 / max(0.1, -mv.z));
}
`;

export const morphFragment = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;

void main() {
  if (uOpacity < 0.01) discard;
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  // de-white: any near-white particle is pulled toward warm gold and its
  // brightness capped, so the cloud never glows white
  vec3 c = vColor;
  float mn = min(c.r, min(c.g, c.b));
  float white = smoothstep(0.5, 0.9, mn);
  c = mix(c, vec3(0.72, 0.57, 0.30), white);
  c = min(c, vec3(0.85)) * 0.94;

  float alpha = smoothstep(0.5, 0.24, d) * uOpacity;
  gl_FragColor = vec4(c, alpha);
}
`;
