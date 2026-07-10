"use client";

import { useRef } from "react";
import Paperclip from "@/components/illustrations/svg/Paperclip";
import { FlowerDoodle, SmileyDoodle, SparkDoodle } from "@/components/illustrations/svg/doodles";
import FitText from "@/components/ui/FitText";
import type { ClipboardStickerUrls } from "@/lib/sanity/queries";
import ClipboardSticker from "./ClipboardSticker";
import styles from "./ClipboardPlaceholder.module.css";

const STICKERS = [
  { key: "one", Icon: Paperclip, imageKey: "clipboardStickerOneUrl" as const, x: "10%", y: "14%", rotate: -8 },
  { key: "two", Icon: FlowerDoodle, imageKey: "clipboardStickerTwoUrl" as const, x: "66%", y: "18%", rotate: 6 },
  { key: "three", Icon: SparkDoodle, imageKey: "clipboardStickerThreeUrl" as const, x: "14%", y: "70%", rotate: -5 },
  { key: "four", Icon: SmileyDoodle, imageKey: "clipboardStickerFourUrl" as const, x: "64%", y: "68%", rotate: 7 },
];

type ClipboardPlaceholderProps = {
  text: string;
  stickers: ClipboardStickerUrls;
};

/** Empty-state placeholder for Projects/Hobbies — a literal clipboard.
 * Text and stickers both come from that page's own Sanity settings
 * document, so Projects and Hobbies can (and do) show different ones.
 * The scattered stickers use the exact same drag-constrained-to-parent
 * mechanic as the homepage cart items, just without a destination —
 * clicking does nothing, they're purely there to fidget with. */
export default function ClipboardPlaceholder({ text, stickers }: ClipboardPlaceholderProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.board}>
      <div className={styles.clip}>
        <div className={styles.clipBody} />
        <span className={styles.clipRivet} aria-hidden />
      </div>
      <div ref={constraintsRef} className={styles.paper}>
        <FitText
          as="span"
          boxClassName={styles.paperTextBox}
          className="font-hand text-maroon"
          maxFontSizePx={26}
          minFontSizePx={12}
        >
          {text}
        </FitText>
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
