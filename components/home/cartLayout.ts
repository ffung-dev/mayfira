import { createSeededRandom } from "@/lib/utils/seededRandom";

/** Shared sizing for every draggable/decorative item inside the cart —
 * percentage of the cart's interior (not a fixed px size), so items scale
 * with the cart itself and never overflow it at any viewport size. If
 * this changes, the safe-zone math below (derived from it) still holds —
 * it isn't hand-tuned per size like the old fixed positions were. */
export const CART_ITEM_SIZE = "24%";
const SIZE_PERCENT = 24;

// next/image's `fill` mode needs a `sizes` hint to pick an appropriately
// sized source instead of defaulting to "could be the full viewport" —
// a rough estimate of the item's real rendered width is enough, it
// doesn't need to be exact. Cart items are CART_ITEM_SIZE (24%) of the
// cart's interior, which itself is capped around 672px inside a ~60%-
// width section on larger screens.
export const CART_ITEM_IMAGE_SIZES = "(min-width: 1024px) 160px, (min-width: 640px) 20vw, 22vw";

// The interior box (see ShoppingCart.tsx's inset values) has a fixed
// 1.6:1 aspect ratio regardless of screen size, so an item's footprint as
// a fraction of interior HEIGHT is always its width fraction × 1.6 — this
// is what keeps every item fully inside the cart at any viewport width.
const H_MARGIN = SIZE_PERCENT / 2;
const V_MARGIN = (SIZE_PERCENT * 1.6) / 2;
const SAFE_X: [number, number] = [H_MARGIN, 100 - H_MARGIN];
const SAFE_Y: [number, number] = [V_MARGIN, 100 - V_MARGIN];

const GRID_COLS = 4;
const GRID_ROWS = 3;

/** A scattered-but-stable default position for a cart item. Looks
 * randomly placed, but is seeded from the item's own id, so it doesn't
 * reshuffle on every reload (and stays in sync between server and client
 * render — a true Math.random() here would cause a hydration mismatch).
 *
 * Splits the cart's safe zone into a 4×3 grid — one cell per item, since
 * there are exactly 12 — and jitters each item within its own cell. A
 * fully random (x, y) draw per item could easily clump several of the 12
 * in the same spot; this guarantees every item gets its own patch of the
 * cart so all of them stay visible. `index` (0–11) picks the cell. */
export function getCartItemPosition(id: string, index: number): { x: string; y: string } {
  const col = index % GRID_COLS;
  const row = Math.floor(index / GRID_COLS) % GRID_ROWS;
  const cellW = (SAFE_X[1] - SAFE_X[0]) / GRID_COLS;
  const cellH = (SAFE_Y[1] - SAFE_Y[0]) / GRID_ROWS;
  const cellCenterX = SAFE_X[0] + cellW * (col + 0.5);
  const cellCenterY = SAFE_Y[0] + cellH * (row + 0.5);

  const random = createSeededRandom(id);
  const jitterX = (random() * 2 - 1) * (cellW * 0.2);
  const jitterY = (random() * 2 - 1) * (cellH * 0.2);

  const cx = Math.min(SAFE_X[1], Math.max(SAFE_X[0], cellCenterX + jitterX));
  const cy = Math.min(SAFE_Y[1], Math.max(SAFE_Y[0], cellCenterY + jitterY));

  return {
    x: `${(cx - H_MARGIN).toFixed(2)}%`,
    y: `${(cy - V_MARGIN).toFixed(2)}%`,
  };
}
