// Signature "mask" material: animated noise displacement + fresnel rim + thin-film
// iridescence. The `uMorph` uniform is driven per-section for the chapter morph.

const SIMPLEX = /* glsl */ `
// Ashima Arts simplex noise 3D (public domain / MIT)
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

export const maskVertex = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform vec2  uMouse;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vNoise;

${SIMPLEX}

void main() {
  vec3 pos = position;

  // layered flowing noise; morph raises frequency + amplitude between chapters
  float freq = mix(1.15, 2.1, uMorph);
  float amp  = mix(0.16, 0.42, uMorph);
  float t = uTime * 0.22;

  float n =  snoise(pos * freq + vec3(0.0, 0.0, t));
  n      += 0.5 * snoise(pos * freq * 2.1 + vec3(t, 0.0, 0.0));
  // very subtle micro-surface ripple (kept low-freq so it never spikes)
  float detail = snoise(pos * freq * 2.8 + vec3(0.0, t * 1.2, 0.0)) * 0.05;
  vNoise = n;

  // gentle pull toward the cursor for a "living" tilt
  float mouseP = (uMouse.x * pos.x + uMouse.y * pos.y) * 0.12;

  vec3 displaced = pos + normal * ((n + detail) * amp + mouseP);

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vViewDir = normalize(-mv.xyz);
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * mv;
}
`;

export const maskFragment = /* glsl */ `
uniform float uTime;
uniform vec3  uColorA;   // deep body
uniform vec3  uColorB;   // gold rim
uniform vec3  uColorC;   // steel iridescence
uniform float uMorph;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vNoise;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);

  // refined duotone sheen: steel -> gold, not a full rainbow
  float phase = fres * 1.2 + vNoise * 0.35 + uTime * 0.04;
  float sheen = 0.5 + 0.5 * cos(6.28318 * phase);
  vec3 irid = mix(uColorC, uColorB, sheen);

  // dark, matte body with a slow inner glow in the hollows
  vec3 body = mix(uColorA * 0.5, uColorA * 1.2, smoothstep(-1.0, 1.0, vNoise));
  vec3 col = body;
  col += irid * (0.10 + 0.18 * uMorph);    // subtle shimmer, blooms on morph
  col += uColorB * fres * 1.15;            // gold fresnel rim
  col += pow(fres, 6.0) * uColorB * 1.4;   // hot rim highlight

  // restrained polished highlight from a fixed key light (liquid-gold read)
  vec3 L = normalize(vec3(0.55, 0.75, 0.6));
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), 64.0);
  col += spec * uColorB * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
`;
