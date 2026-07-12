"use client";

import type { ComponentType, RefObject } from "react";
import { motion } from "motion/react";
import { usePersistedDrag } from "@/lib/hooks/usePersistedDrag";
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

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      className="absolute z-0 aspect-square cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y, x: dragX, y: dragY, width: CART_ITEM_SIZE, rotate }}
    >
      <IllustrationSlot fill sizes={CART_ITEM_IMAGE_SIZES} imageUrl={imageUrl} Fallback={Icon} alt="" className="object-contain drop-shadow-sm" />
    </motion.div>
  );
}
