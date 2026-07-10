"use client";

import { useLayoutEffect, useRef } from "react";

type FitTextProps = {
  children: React.ReactNode;
  as?: "span" | "p" | "div" | "h3" | "h4" | "li";
  className?: string;
  boxClassName?: string;
  maxFontSizePx: number;
  minFontSizePx?: number;
};

/** Shrinks font-size (never grows past maxFontSizePx) until the content
 * fits inside its own box, checking both width and height. For
 * Sanity-authored text landing in fixed-shape UI — notecards, tabs, tags,
 * pinned papers — where the author can type anything of any length, and
 * it must never visually overflow or spill past the shape's edges.
 *
 * The "box" (boxClassName) is a separate wrapping element from the text
 * itself: the box's CSS (width, max-height) defines the hard limit, and
 * the text element inside is what actually gets resized, so the two
 * measurements (container bound vs. content size) don't collide on the
 * same element. */
export default function FitText({
  children,
  as: Tag = "span",
  className = "",
  boxClassName = "",
  maxFontSizePx,
  minFontSizePx = 10,
}: FitTextProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    const fit = () => {
      let size = maxFontSizePx;
      text.style.fontSize = `${size}px`;
      while (
        size > minFontSizePx &&
        (text.scrollHeight > box.clientHeight || text.scrollWidth > box.clientWidth)
      ) {
        size -= 1;
        text.style.fontSize = `${size}px`;
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [maxFontSizePx, minFontSizePx, children]);

  return (
    <div ref={boxRef} className={boxClassName}>
      {/* Tag is chosen dynamically from a handful of intrinsic elements,
          so TS can't narrow its ref type — every option is a real DOM
          element ref at runtime, just typed more loosely than JSX wants. */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Tag ref={textRef as any} className={className}>
        {children}
      </Tag>
    </div>
  );
}
