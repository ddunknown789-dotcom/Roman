import * as THREE from "three";

// The scroll journey: one camera "station" per chapter. Progress 0..1 across the
// whole page samples a smooth path between these. Tuned in M3 alongside sections.
export type Station = { at: number; pos: THREE.Vector3; target: THREE.Vector3 };

export const CAMERA_STATIONS: Station[] = [
  { at: 0.0, pos: new THREE.Vector3(0, 0, 6.2), target: new THREE.Vector3(0, 0, 0) }, // hero
  // content stations: mask pushed back + to the RIGHT of left-aligned copy
  { at: 0.15, pos: new THREE.Vector3(-3.8, 0.6, 8.0), target: new THREE.Vector3(-1.6, 0, 0) }, // story
  { at: 0.34, pos: new THREE.Vector3(3.8, -0.5, 8.4), target: new THREE.Vector3(1.6, 0, 0) }, // books (own canvas over)
  { at: 0.55, pos: new THREE.Vector3(0, 0.15, 4.6), target: new THREE.Vector3(0, 0, 0) }, // mask (close, dramatic)
  { at: 0.72, pos: new THREE.Vector3(-3.9, -0.7, 8.2), target: new THREE.Vector3(-1.6, 0, 0) }, // humanity
  { at: 0.88, pos: new THREE.Vector3(3.6, 0.9, 8.2), target: new THREE.Vector3(1.5, 0, 0) }, // recognition
  { at: 1.0, pos: new THREE.Vector3(0, 0, 8.4), target: new THREE.Vector3(0, 0, 0) }, // contact (pull back)
];

// Catmull-ish smooth sample across stations into out vectors.
export function sampleStations(
  p: number,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3
) {
  const s = CAMERA_STATIONS;
  if (p <= s[0].at) {
    outPos.copy(s[0].pos);
    outTarget.copy(s[0].target);
    return;
  }
  if (p >= s[s.length - 1].at) {
    outPos.copy(s[s.length - 1].pos);
    outTarget.copy(s[s.length - 1].target);
    return;
  }
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i];
    const b = s[i + 1];
    if (p >= a.at && p <= b.at) {
      const t = (p - a.at) / (b.at - a.at);
      const e = t * t * (3 - 2 * t); // smoothstep
      outPos.copy(a.pos).lerp(b.pos, e);
      outTarget.copy(a.target).lerp(b.target, e);
      return;
    }
  }
}
