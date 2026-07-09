"use client";

import { motion } from "motion/react";
import {
  ArrowDoodle,
  BearDoodle,
  CatDoodle,
  FlowerDoodle,
  SmileyDoodle,
  SparkDoodle,
} from "@/components/illustrations/svg/doodles";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";

// top/left are each doodle's resting center; drift is how far (px) it
// wanders before easing back — kept small relative to each doodle's
// distance from the panel edge so it can never actually drift out.
const DOODLES = [
  { Doodle: FlowerDoodle, top: "10%", left: "80%", size: "2.1rem", rotate: -8, drift: { x: 14, y: 10 }, duration: 9 },
  { Doodle: SparkDoodle, top: "18%", left: "10%", size: "1.5rem", rotate: 10, drift: { x: 10, y: 14 }, duration: 11 },
  { Doodle: SmileyDoodle, top: "70%", left: "84%", size: "1.9rem", rotate: 6, drift: { x: 12, y: 10 }, duration: 8 },
  { Doodle: CatDoodle, top: "80%", left: "16%", size: "2.3rem", rotate: -6, drift: { x: 14, y: 8 }, duration: 12 },
  { Doodle: ArrowDoodle, top: "42%", left: "90%", size: "1.9rem", rotate: 18, drift: { x: 8, y: 12 }, duration: 10 },
  { Doodle: BearDoodle, top: "58%", left: "5%", size: "2.1rem", rotate: -12, drift: { x: 12, y: 12 }, duration: 13 },
];

/** Purely decorative — scattered doodles drifting slowly and bouncing back
 * within the panel (never leaving it, since the drift range is small
 * relative to each one's distance from the edge). Each slot can be
 * replaced with a real image from Sanity; falls back to coded line-art. */
export default function DoodleField({ doodleUrls }: { doodleUrls: string[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {DOODLES.map(({ Doodle, top, left, size, rotate, drift, duration }, index) => (
        <motion.span
          key={index}
          className="absolute text-cream opacity-35"
          style={{ top, left, width: size, height: size }}
          animate={{
            x: [0, drift.x, 0, -drift.x, 0],
            y: [0, -drift.y, 0, drift.y, 0],
            rotate: [rotate, rotate + 6, rotate, rotate - 6, rotate],
          }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <IllustrationSlot
            imageUrl={doodleUrls[index]}
            Fallback={Doodle}
            alt=""
            width={40}
            height={40}
            className="h-full w-full"
          />
        </motion.span>
      ))}
    </div>
  );
}
