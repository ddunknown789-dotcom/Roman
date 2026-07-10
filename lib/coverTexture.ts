import * as THREE from "three";
import { PALETTE } from "./palette";

// Generate a typographic book-cover texture (no external image files).
export function buildCoverTexture(
  title: string,
  kind: string,
  spine: string
): THREE.CanvasTexture {
  const W = 512;
  const H = 768;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // background: deep spine-tinted gradient
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#0c0c0f");
  g.addColorStop(1, spine);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // subtle vignette
  const rg = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, H);
  rg.addColorStop(0, "rgba(0,0,0,0)");
  rg.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, W, H);

  // gold frame
  ctx.strokeStyle = PALETTE.gold;
  ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, W - 68, H - 68);

  // top label
  ctx.fillStyle = PALETTE.gold;
  ctx.font = "600 20px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText(kind.toUpperCase(), W / 2, 96);

  // author
  ctx.fillStyle = PALETTE.ivoryDim;
  ctx.font = "400 22px 'Space Grotesk', sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("DR PATRICK TREACY", W / 2, H - 84);

  // title (wrapped, serif)
  ctx.fillStyle = PALETTE.ivory;
  ctx.letterSpacing = "0px";
  const words = title.split(" ");
  const lines: string[] = [];
  let line = "";
  const maxW = W - 130;
  ctx.font = "300 60px Fraunces, Georgia, serif";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);

  const lineH = 66;
  let y = H / 2 - ((lines.length - 1) * lineH) / 2;
  for (const l of lines) {
    ctx.fillText(l, W / 2, y);
    y += lineH;
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}
