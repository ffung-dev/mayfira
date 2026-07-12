"use client";

import type { ComponentType, RefObject } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { usePersistedDrag } from "@/lib/hooks/usePersistedDrag";
import { useLayoutSettled } from "@/lib/hooks/useLayoutSettled";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";

type ClipboardStickerProps = {
  Icon: ComponentType<{ className?: string }>;
  imageUrl?: string;
  x: string;
  y: string;
  rotate: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
  storageKey: string;
};

/** Purely decorative — draggable anywhere within the clipboard's paper
 * (free 2D drag, like the cart items), but goes nowhere on click, since
 * these aren't navigation. Sized to match the cart items for visual
 * consistency between the two draggable systems.
 *
 * dragMomentum is off: Motion's default lets a released drag keep
 * coasting on its release velocity — here it should just stop dead
 * exactly where it's let go. dragElastic is a hair above 0 rather than
 * exactly 0 — a perfectly rigid constraint boundary makes Motion's
 * pointer tracking desync from the sticker right at the edge (pointer
 * keeps moving, sticker can't), which feels like the drag stopped
 * responding; a touch of give avoids that. Position is remembered across
 * visits via usePersistedDrag, keyed per sticker per page (projects and
 * hobbies each have their own saved layout).
 *
 * The clipboard's own size depends on viewport height (see
 * ClipboardPlaceholder.module.css's max-height: 100%, chained back to a
 * dvh-based value), so it's especially likely to still be settling for a
 * moment after mount — combined with Motion caching its drag-boundary
 * measurement from the first drag and never re-checking it on its own,
 * that's exactly what made the drag area look shifted relative to the
 * visible clipboard until a reload. See useLayoutSettled. */
export default function ClipboardSticker({ Icon, imageUrl, x, y, rotate, constraintsRef, storageKey }: ClipboardStickerProps) {
  const canDrag = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { x: dragX, y: dragY, onDragEnd } = usePersistedDrag(storageKey);
  const settled = useLayoutSettled();

  if (!canDrag) {
    return (
      <div className="absolute" style={{ left: x, top: y, transform: `rotate(${rotate}deg)` }}>
        <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt="" width={80} height={80} className="h-20 w-20 drop-shadow-md" />
      </div>
    );
  }

  return (
    <motion.div
      key={settled ? "settled" : "initial"}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      initial={{ rotate }}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y, x: dragX, y: dragY }}
    >
      <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt="" width={80} height={80} className="h-20 w-20 drop-shadow-md" />
    </motion.div>
  );
}
