import { create } from "zustand";

// Central store bridging DOM scroll/pointer -> the persistent 3D stage.
// Read imperatively (getState) inside useFrame loops; subscribe for React UI.
type ScrollState = {
  progress: number; // 0..1 whole-page scroll
  setProgress: (p: number) => void;
  mouse: { x: number; y: number }; // -1..1, updated by Cursor
  setMouse: (x: number, y: number) => void;
  ready: boolean; // preloader finished
  setReady: (v: boolean) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
  mouse: { x: 0, y: 0 },
  setMouse: (x, y) => set({ mouse: { x, y } }),
  ready: false,
  setReady: (v) => set({ ready: v }),
}));

// Framerate-independent exponential damping (used across DOM + R3F).
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
