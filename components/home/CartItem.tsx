"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ComponentType, RefObject } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";

export type CartItemData = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  imageUrl?: string;
  x: string;
  y: string;
  floatDelay: number;
};

type CartItemProps = CartItemData & {
  constraintsRef: RefObject<HTMLDivElement | null>;
};

// Below this drag distance (px), treat the gesture as a click rather than a drag.
const CLICK_DRAG_THRESHOLD = 6;

export default function CartItem({ href, label, Icon, imageUrl, x, y, floatDelay, constraintsRef }: CartItemProps) {
  const router = useRouter();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  // Touch devices skip drag/hover entirely — just a plain tappable icon.
  // Sized smaller than the desktop version since the cart itself is
  // narrower on phones, so four items still fit without crowding.
  if (!canHover) {
    return (
      <Link href={href} className="absolute flex flex-col items-center gap-0.5" style={{ left: x, top: y }}>
        <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt={label} width={44} height={44} className="h-11 w-11 drop-shadow-md" />
        <span className="font-hand text-xs text-maroon">{label}</span>
      </Link>
    );
  }

  return (
    // Outer layer owns drag/position; inner layer owns the idle float and
    // hover response. Keeping them on separate motion values means the
    // looping idle animation and the drag gesture never fight over x/y.
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        const distance = Math.hypot(info.offset.x, info.offset.y);
        if (distance < CLICK_DRAG_THRESHOLD) router.push(href);
      }}
      role="link"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y }}
    >
      <motion.div
        className="group relative flex flex-col items-center"
        animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        whileHover={{ y: 0, rotate: 0, scale: 1.15 }}
      >
        <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt={label} width={64} height={64} className="h-16 w-16 drop-shadow-md" />
        <span className="pointer-events-none absolute -top-7 rounded-full bg-cream px-3 py-1 font-hand text-sm text-maroon opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
