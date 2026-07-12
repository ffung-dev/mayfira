"use client";

import type { ComponentType, RefObject } from "react";
import { motion } from "motion/react";
import { usePersistedDrag } from "@/lib/hooks/usePersistedDrag";
import { useLayoutSettled } from "@/lib/hooks/useLayoutSettled";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";
import { CART_ITEM_SIZE, CART_ITEM_IMAGE_SIZES } from "./cartLayout";

type CartClutterItemProps = {
  id: string;
  Icon: ComponentType<{ className?: string }>;
  imageUrl?: string;
  x: string;
  y: string;
  rotate: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
};

/** Decorative filler in the cart — fidgetable like the real nav items
 * (same drag mechanic, same size), but never navigates anywhere and
 * always renders behind them (z-0 vs. CartItem's z-10) so a dragged
 * clutter piece can never visually cover a real one. */
export default function CartClutterItem({ id, Icon, imageUrl, x, y, rotate, constraintsRef }: CartClutterItemProps) {
  const { x: dragX, y: dragY, onDragEnd } = usePersistedDrag(`mayfira:cart:${id}`);
  const settled = useLayoutSettled();

  return (
    // key forces a one-time remount once layout has settled — see
    // useLayoutSettled and the matching comment in CartItem.tsx. Motion
    // caches its drag-boundary measurement from the first drag and
    // otherwise never re-checks it just because the page shifted.
    <motion.div
      key={settled ? "settled" : "initial"}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      className="absolute z-0 aspect-square cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y, x: dragX, y: dragY, width: CART_ITEM_SIZE, rotate }}
    >
      <IllustrationSlot fill sizes={CART_ITEM_IMAGE_SIZES} imageUrl={imageUrl} Fallback={Icon} alt="" className="object-contain drop-shadow-sm" />
    </motion.div>
  );
}
