// Procedural point-cloud targets for the particle model. Every shape fills the
// SAME point count so the shader can morph/scatter between them. All roughly
// centred on the origin and scaled to fit ~[-1.6, 1.6].

type Vec = [number, number, number];

const rand = () => Math.random();
const rr = (a: number, b: number) => a + Math.random() * (b - a);

// even point on a unit sphere (for caps / jitter)
function onSphere(): Vec {
  const u = rand() * 2 - 1;
  const t = rand() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(t), u, s * Math.sin(t)];
}

function fill(count: number, fn: (i: number, r: number) => Vec): Float32Array {
  const a = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const [x, y, z] = fn(i, i / count);
    a[i * 3] = x;
    a[i * 3 + 1] = y;
    a[i * 3 + 2] = z;
  }
  return a;
}

// ---- ORB: fibonacci sphere -------------------------------------------------
function orb(count: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return fill(count, (i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const j = 1 + (rand() - 0.5) * 0.05;
    return [Math.cos(th) * r * 1.5 * j, y * 1.5 * j, Math.sin(th) * r * 1.5 * j];
  });
}

// ---- SYRINGE (axis along X) ------------------------------------------------
function syringe(count: number) {
  const OX = -0.25; // recentre
  return fill(count, (_i, r) => {
    let x: number, y: number, z: number;
    if (r < 0.5) {
      // barrel
      x = rr(-0.5, 1.0);
      const a = rand() * Math.PI * 2;
      const rad = 0.3 * (0.96 + rand() * 0.04);
      y = Math.cos(a) * rad;
      z = Math.sin(a) * rad;
    } else if (r < 0.6) {
      // hub cone (barrel -> needle)
      const t = rand();
      x = 0.9 + t * 0.15;
      const a = rand() * Math.PI * 2;
      const rad = 0.3 * (1 - t) + 0.05 * t;
      y = Math.cos(a) * rad;
      z = Math.sin(a) * rad;
    } else if (r < 0.7) {
      // needle
      x = rr(1.05, 1.75);
      const a = rand() * Math.PI * 2;
      const rad = 0.016;
      y = Math.cos(a) * rad;
      z = Math.sin(a) * rad;
    } else if (r < 0.86) {
      // plunger rod: a plus-shaped cross
      x = rr(-1.15, -0.5);
      if (rand() < 0.5) {
        y = rr(-0.09, 0.09);
        z = rr(-0.02, 0.02);
      } else {
        y = rr(-0.02, 0.02);
        z = rr(-0.09, 0.09);
      }
    } else {
      // thumb flange + press disc at the tail
      const disc = rand() < 0.7;
      x = disc ? rr(-1.2, -1.14) : rr(0.86, 0.92);
      const a = rand() * Math.PI * 2;
      const rad = (disc ? 0.46 : 0.4) * Math.sqrt(rand());
      y = Math.cos(a) * rad;
      z = Math.sin(a) * rad;
    }
    return [x + OX, y, z];
  });
}

// ---- DNA double helix (axis along Y) --------------------------------------
function dna(count: number) {
  const turns = 3;
  const R = 0.72;
  const H = 3.0;
  const rungCount = 26;
  return fill(count, (_i, r) => {
    if (r < 0.6) {
      // two strands
      const strand = rand() < 0.5 ? 0 : Math.PI;
      const t = rand();
      const ang = t * turns * Math.PI * 2 + strand;
      const jitter = 0.04;
      return [
        Math.cos(ang) * R + (rand() - 0.5) * jitter,
        (t - 0.5) * H + (rand() - 0.5) * jitter,
        Math.sin(ang) * R + (rand() - 0.5) * jitter,
      ];
    } else {
      // rungs between the strands
      const k = Math.floor(rand() * rungCount);
      const t = k / (rungCount - 1);
      const ang = t * turns * Math.PI * 2;
      const u = rand();
      const p1: Vec = [Math.cos(ang) * R, (t - 0.5) * H, Math.sin(ang) * R];
      const p2: Vec = [
        Math.cos(ang + Math.PI) * R,
        (t - 0.5) * H,
        Math.sin(ang + Math.PI) * R,
      ];
      return [
        p1[0] + (p2[0] - p1[0]) * u,
        p1[1] + (p2[1] - p1[1]) * u,
        p1[2] + (p2[2] - p1[2]) * u,
      ];
    }
  });
}

// ---- CAPSULE / pill (axis along X) ----------------------------------------
function capsule(count: number) {
  const R = 0.5;
  const halfLen = 0.55; // cylinder half-length
  return fill(count, (_i, r) => {
    if (r < 0.5) {
      // cylinder body
      const x = rr(-halfLen, halfLen);
      const a = rand() * Math.PI * 2;
      return [x, Math.cos(a) * R, Math.sin(a) * R];
    } else {
      // hemispherical caps
      let [sx, sy, sz] = onSphere();
      const sign = rand() < 0.5 ? 1 : -1;
      sx = Math.abs(sx) * sign;
      return [sx * R + sign * halfLen, sy * R, sz * R];
    }
  });
}

export type ShapeSet = {
  orb: Float32Array;
  syringe: Float32Array;
  dna: Float32Array;
  capsule: Float32Array;
};

export function makeShapes(count: number): ShapeSet {
  return {
    orb: orb(count),
    syringe: syringe(count),
    dna: dna(count),
    capsule: capsule(count),
  };
}
