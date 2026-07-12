"use client";

import { useLayoutEffect } from "react";
import { useMotionValue } from "motion/react";

function readStored(key: string): { x: number; y: number } | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Remembers a draggable fidget item's position for the rest of the
 * current visit — via sessionStorage, not localStorage, so it resets
 * once the tab/browser is closed instead of following the visitor back
 * next time. Motion values always start at (0, 0) — matching the item's
 * default CSS position — on both server and first client render, then
 * jump to the saved offset in a layout effect (before the browser
 * paints), so there's no flash back to the default spot when navigating
 * back to the page mid-visit, and no server/client hydration mismatch. */
export function usePersistedDrag(storageKey: string) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useLayoutEffect(() => {
    const stored = readStored(storageKey);
    if (stored) {
      x.set(stored.x);
      y.set(stored.y);
    }
  }, [storageKey, x, y]);

  const onDragEnd = () => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify({ x: x.get(), y: y.get() }));
    } catch {
      // Private-browsing/storage-full edge cases — losing the saved spot isn't worth crashing over.
    }
  };

  return { x, y, onDragEnd };
}
