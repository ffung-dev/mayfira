"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useRouteTransition } from "@/components/transition/RouteTransitionContext";

type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
  maxFontSizePx?: number;
  minFontSizePx?: number;
};

/** Page-level heading, set in Elsie. Shrinks (never grows) to whatever
 * size keeps it on one line, however long the copy is — plain CSS
 * clamp() can't guarantee that since it doesn't know the string's actual
 * pixel width, so this measures it directly against its container. */
export default function Heading({
  children,
  as: Tag = "h1",
  className = "",
  maxFontSizePx = 30,
  minFontSizePx = 14,
}: HeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { overlayGone } = useRouteTransition();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    if (!container || !heading) return;

    const fit = () => {
      heading.style.fontSize = `${maxFontSizePx}px`;
      const scale = Math.min(1, container.clientWidth / heading.scrollWidth);
      heading.style.fontSize = `${Math.max(minFontSizePx, Math.floor(maxFontSizePx * scale))}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [maxFontSizePx, minFontSizePx, children]);

  // Separate from sizing on purpose: the entrance animation should only
  // play once the loading overlay is fully gone, not the instant this
  // mounts (which, on a route transition, is still hidden behind it).
  useEffect(() => {
    if (!overlayGone) return;
    headingRef.current?.classList.add("tracking-in-expand");
  }, [overlayGone]);

  return (
    <div ref={containerRef} className="w-full">
      <Tag
        ref={headingRef}
        className={`font-title font-black text-xl leading-tight whitespace-nowrap sm:text-2xl lg:text-3xl ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
}
