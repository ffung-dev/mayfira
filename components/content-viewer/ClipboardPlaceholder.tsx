"use client";

import { useRef } from "react";
import Paperclip from "@/components/illustrations/svg/Paperclip";
import { FlowerDoodle, SmileyDoodle, SparkDoodle } from "@/components/illustrations/svg/doodles";
import HandwrittenLabel from "@/components/ui/HandwrittenLabel";
import type { ClipboardStickerUrls } from "@/lib/sanity/queries";
import ClipboardSticker from "./ClipboardSticker";
import styles from "./ClipboardPlaceholder.module.css";

const STICKERS = [
  { key: "one", Icon: Paperclip, imageKey: "clipboardStickerOneUrl" as const, x: "10%", y: "14%", rotate: -8 },
  { key: "two", Icon: FlowerDoodle, imageKey: "clipboardStickerTwoUrl" as const, x: "66%", y: "18%", rotate: 6 },
  { key: "three", Icon: SparkDoodle, imageKey: "clipboardStickerThreeUrl" as const, x: "14%", y: "70%", rotate: -5 },
  { key: "four", Icon: SmileyDoodle, imageKey: "clipboardStickerFourUrl" as const, x: "64%", y: "68%", rotate: 7 },
];

/** Empty-state placeholder for Projects/Hobbies — a literal clipboard.
 * The scattered stickers use the exact same drag-constrained-to-parent
 * mechanic as the homepage cart items, just without a destination —
 * clicking does nothing, they're purely there to fidget with. */
export default function ClipboardPlaceholder({ stickers }: { stickers: ClipboardStickerUrls }) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.board}>
      <div className={styles.clip}>
        <div className={styles.clipBody} />
        <span className={styles.clipRivet} aria-hidden />
      </div>
      <div ref={constraintsRef} className={styles.paper}>
        <HandwrittenLabel className={`text-2xl text-maroon ${styles.paperText}`}>
          pick something to explore!
        </HandwrittenLabel>
        {STICKERS.map((sticker) => (
          <ClipboardSticker
            key={sticker.key}
            Icon={sticker.Icon}
            imageUrl={stickers[sticker.imageKey]}
            x={sticker.x}
            y={sticker.y}
            rotate={sticker.rotate}
            constraintsRef={constraintsRef}
          />
        ))}
      </div>
    </div>
  );
}
