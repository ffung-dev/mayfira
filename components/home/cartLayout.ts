/** Shared sizing for every draggable/decorative item inside the cart —
 * percentage of the cart's interior (not a fixed px size), so items scale
 * with the cart itself and never overflow it at any viewport size.
 *
 * The interior (see ShoppingCart.tsx's inset values) is a fixed 1.6:1
 * landscape box regardless of screen size, and each item is a square, so
 * an item's footprint as a fraction of interior HEIGHT is always its
 * width fraction × 1.6 — a square simply "costs" more of the shorter
 * (vertical) axis than the longer one. That's why this had to shrink to
 * fit a clean, non-overlapping 4×3 grid of all 12 items (matching the
 * reference layout) — at the previous, larger size there wasn't enough
 * room on the vertical axis for 3 rows without overlapping. */
export const CART_ITEM_SIZE = "10%";
const SIZE_PERCENT = 10;

// next/image's `fill` mode needs a `sizes` hint to pick an appropriately
// sized source instead of defaulting to "could be the full viewport" —
// a rough estimate of the item's real rendered width is enough, it
// doesn't need to be exact.
export const CART_ITEM_IMAGE_SIZES = "(min-width: 1024px) 68px, (min-width: 640px) 9vw, 10vw";

const H_MARGIN = SIZE_PERCENT / 2;
const V_MARGIN = (SIZE_PERCENT * 1.6) / 2;
const SAFE_X: [number, number] = [H_MARGIN, 100 - H_MARGIN];
const SAFE_Y: [number, number] = [V_MARGIN, 100 - V_MARGIN];

const GRID_COLS = 4;
const GRID_ROWS = 3;

/** An item's default slot in the cart's 4×3 grid — one cell per item
 * (there are exactly 12), centered with even gaps on all sides, matching
 * the reference layout (a neat grid, not a scattered/overlapping pile).
 * `index` (0–11) picks the cell; row-major, left to right, top to
 * bottom. Returns the item's top-left corner as CSS left/top values. */
export function getCartItemPosition(index: number): { x: string; y: string } {
  const col = index % GRID_COLS;
  const row = Math.floor(index / GRID_COLS) % GRID_ROWS;
  const cellW = (SAFE_X[1] - SAFE_X[0]) / GRID_COLS;
  const cellH = (SAFE_Y[1] - SAFE_Y[0]) / GRID_ROWS;
  const cx = SAFE_X[0] + cellW * (col + 0.5);
  const cy = SAFE_Y[0] + cellH * (row + 0.5);

  return {
    x: `${(cx - H_MARGIN).toFixed(2)}%`,
    y: `${(cy - V_MARGIN).toFixed(2)}%`,
  };
}
