"use client";

import { useLayoutEffect, useRef } from "react";

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
  maxFontSizePx = 52,
  minFontSizePx = 15,
}: HeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <div ref={containerRef} className="w-full">
      <Tag
        ref={headingRef}
        className={`font-title font-black text-3xl leading-tight whitespace-nowrap sm:text-4xl lg:text-5xl ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
}
