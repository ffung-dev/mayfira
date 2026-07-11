"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ComponentType, RefObject } from "react";
import { motion, type TargetAndTransition } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useRouteTransition } from "@/components/transition/RouteTransitionContext";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";

export type HoverVariant = "bob" | "spin" | "wiggle" | "none";

export type CartItemData = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  imageUrl?: string;
  x: string;
  y: string;
  hoverVariant: HoverVariant;
};

type CartItemProps = CartItemData & {
  constraintsRef: RefObject<HTMLDivElement | null>;
};

// Each loop's first and last keyframe match, so the repeat point is
// invisible — and each one is written so "return to rest" is a plain
// interpolation from wherever the pointer left it, not a hard reversal.
const HOVER_VARIANTS: Record<HoverVariant, TargetAndTransition | undefined> = {
  bob: {
    y: [0, -10, 0],
    scale: 1.15,
    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  },
  spin: {
    rotate: 360,
    scale: 1.15,
    transition: { duration: 3.6, repeat: Infinity, ease: "linear" },
  },
  wiggle: {
    rotate: [0, -6, 6, 0],
    scale: 1.15,
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  },
  none: { scale: 1.15 },
};

export default function CartItem({ href, label, Icon, imageUrl, x, y, hoverVariant, constraintsRef }: CartItemProps) {
  const router = useRouter();
  const { startTransition } = useRouteTransition();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  // Touch devices skip drag/hover entirely — just a plain tappable icon.
  if (!canHover) {
    return (
      <Link
        href={href}
        onClick={() => startTransition()}
        className="absolute z-10 flex flex-col items-center gap-0.5"
        style={{ left: x, top: y }}
      >
        <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt={label} width={112} height={112} className="h-28 w-28 drop-shadow-md" />
        <span className="font-hand text-xs text-maroon">{label}</span>
      </Link>
    );
  }

  return (
    // Outer layer owns drag/position and is the hover-group root; middle
    // layer (plain div) holds the icon and label as siblings; innermost
    // motion.div owns ONLY the icon's hover animation. Keeping the label
    // out of the rotating/bobbing element means a "spin" variant spins
    // just the icon, not the text floating next to it.
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onDoubleClick={() => {
        startTransition();
        router.push(href);
      }}
      role="link"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          startTransition();
          router.push(href);
        }
      }}
      className="group absolute z-10 cursor-grab active:cursor-grabbing"
      style={{ left: x, top: y }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          whileHover={HOVER_VARIANTS[hoverVariant]}
          // Governs the "leaving hover" animation specifically — a plain
          // ease back to rest from wherever the loop was interrupted,
          // instead of inheriting the loop's own transition.
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt={label} width={112} height={112} className="h-28 w-28 drop-shadow-md" />
        </motion.div>
        <span className="pointer-events-none absolute -top-7 rounded-full bg-cream px-3 py-1 font-hand text-sm text-maroon opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
