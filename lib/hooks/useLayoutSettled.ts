"use client";

import { useEffect, useState } from "react";

/** True once fonts have loaded and a couple of paint frames have passed —
 * a "the page has stopped moving" signal.
 *
 * Motion's ref-based `dragConstraints` measures the drag boundary exactly
 * once, on the first drag, then caches it for the component's whole
 * lifetime — it only re-measures if a ResizeObserver later sees the
 * constraint box's own SIZE change, not a position shift. If that first
 * measurement happens before layout is fully settled, the boundary stays
 * wrong (visually offset from the actual container) until the page is
 * fully reloaded. Draggable items key off this value to remount once
 * layout has settled, so their first real measurement is a fresh one. */
export function useLayoutSettled(): boolean {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const markSettled = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setSettled(true);
        });
      });
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(markSettled);
    } else {
      markSettled();
    }
    return () => {
      cancelled = true;
    };
  }, []);

  return settled;
}
