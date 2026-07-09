// Deterministic pseudo-random number generator seeded from a string (e.g. a
// Sanity document _id). Same id always produces the same sequence, so a
// "randomly" tilted pinned note looks the same on every reload instead of
// reshuffling — string hash -> mulberry32.
function hashStringToSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type PinnedTransform = {
  rotation: number;
  offsetX: number;
  offsetY: number;
};

/** A stable "hand-pinned" tilt + jitter for a bulletin-board item, derived
 * from its document id. `rotationOverride` lets an editor hand-tune one
 * item in Sanity if the automatic tilt ever looks wrong. */
export function getPinnedTransform(id: string, rotationOverride?: number): PinnedTransform {
  const random = mulberry32(hashStringToSeed(id));
  const rotation = rotationOverride ?? random() * 14 - 7;
  const offsetX = random() * 24 - 12;
  const offsetY = random() * 24 - 12;
  return { rotation, offsetX, offsetY };
}
