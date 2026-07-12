/** Shared sizing for every draggable/decorative item inside the cart —
 * percentage of the cart's interior (not a fixed px size), so items scale
 * with the cart itself and never overflow it at any viewport size. The x/y
 * positions in ShoppingCart.tsx are pre-computed against this exact value
 * (item's own footprint kept fully inside the 0–100% bounds), so if this
 * changes, those positions need re-checking too. */
export const CART_ITEM_SIZE = "16%";
