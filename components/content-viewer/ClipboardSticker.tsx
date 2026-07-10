"use client";

import type { ComponentType, RefObject } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";

type ClipboardStickerProps = {
  Icon: ComponentType<{ className?: string }>;
  imageUrl?: string;
  x: string;
  y: string;
  rotate: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
};

/** Purely decorative — draggable anywhere within the clipboard's paper
 * (free 2D drag, like the cart items), but goes nowhere on click, since
 * these aren't navigation. Sized to match the cart items for visual
 * consistency between the two draggable systems.
 *
 * dragMomentum/dragElastic are both off: Motion's defaults let a released
 * drag keep coasting on its release velocity and rubber-band back if
 * pulled past the constraint edge — here it should just stop dead exactly
 * where it's let go, full stop, no coast and no snap-back. */
export default function ClipboardSticker({ Icon, imageUrl, x, y, rotate, constraintsRef }: ClipboardStickerProps) {
  const canDrag = useMediaQuery("(hover: hover) and (pointer: fine)");

  if (!canDrag) {
    return (
      <div className="absolute" style={{ left: x, top: y, transform: `rotate(${rotate}deg)` }}>
        <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt="" width={80} height={80} className="h-20 w-20 drop-shadow-md" />
      </div>
    );
  }

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      initial={{ rotate }}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y }}
    >
      <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt="" width={80} height={80} className="h-20 w-20 drop-shadow-md" />
    </motion.div>
  );
}
