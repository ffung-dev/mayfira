"use client";

import type { ComponentType, RefObject } from "react";
import { motion } from "motion/react";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";

type CartClutterItemProps = {
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
export default function CartClutterItem({ Icon, imageUrl, x, y, rotate, constraintsRef }: CartClutterItemProps) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      className="absolute z-0 cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y, rotate }}
    >
      <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt="" width={112} height={112} className="h-28 w-28 drop-shadow-sm" />
    </motion.div>
  );
}
