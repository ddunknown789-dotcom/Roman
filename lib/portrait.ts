// Turn a photo into a particle cloud: positions from bright pixels (density
// proportional to luminance), colours taken straight from the image so the
// gold-lit / blue-shadow duotone is reproduced exactly.

export type PortraitData = {
  positions: Float32Array; // shape 0 target
  colors: Float32Array; // per-particle rgb (0..1)
};

export function samplePortrait(
  img: HTMLImageElement,
  count: number,
  planeWidth = 5.0
): PortraitData {
  // downscale for fast pixel reads; higher res -> sharper facial detail
  const w = 860;
  const h = Math.round((img.height / img.width) * w);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  const planeHeight = planeWidth * (h / w);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  let i = 0;
  let attempts = 0;
  const maxAttempts = count * 80;
  while (i < count && attempts < maxAttempts) {
    attempts++;
    const px = (Math.random() * w) | 0;
    const py = (Math.random() * h) | 0;
    const idx = (py * w + px) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    if (lum < 0.10) continue; // skip near-black background
    // density proportional to brightness (edges/face densest, clothing sparse)
    if (Math.random() > Math.min(1, lum * 1.25)) continue;

    // position on a plane facing the camera, tiny depth jitter for life
    positions[i * 3] = (px / w - 0.5) * planeWidth + (Math.random() - 0.5) * 0.006;
    positions[i * 3 + 1] = -(py / h - 0.5) * planeHeight + (Math.random() - 0.5) * 0.006;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08 + (lum - 0.5) * 0.18;

    // colour straight from the image; push saturation of the duotone so the
    // gold-lit / blue-shadow split reads as strongly as the source
    const rr2 = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    if (bb > rr2) {
      // shadow (blue) side -> deepen the blue
      colors[i * 3] = rr2 * 0.85;
      colors[i * 3 + 1] = Math.min(1, gg * 1.02);
      colors[i * 3 + 2] = Math.min(1, bb * 1.35);
    } else {
      // lit (gold) side -> warm it
      colors[i * 3] = Math.min(1, rr2 * 1.15);
      colors[i * 3 + 1] = Math.min(1, gg * 1.02);
      colors[i * 3 + 2] = bb * 0.9;
    }
    i++;
  }

  // if we ran short, duplicate already-placed points so nothing clumps at origin
  for (let k = i; k < count && i > 0; k++) {
    const src = ((Math.random() * i) | 0) * 3;
    positions[k * 3] = positions[src];
    positions[k * 3 + 1] = positions[src + 1];
    positions[k * 3 + 2] = positions[src + 2];
    colors[k * 3] = colors[src];
    colors[k * 3 + 1] = colors[src + 1];
    colors[k * 3 + 2] = colors[src + 2];
  }

  return { positions, colors };
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
