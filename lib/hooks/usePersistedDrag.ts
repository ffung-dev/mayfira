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
 * next time.
 *
 * `defaultPosition` is where the item sits before it's ever been
 * dragged (defaults to (0, 0), i.e. wherever its own CSS places it) —
 * bulletin items pass their seeded "hand-pinned" jitter here instead, so
 * a drag moves it FROM that jittered spot rather than resetting it to
 * dead center first. Motion values start there on both server and first
 * client render, then jump to the saved offset (if any) in a layout
 * effect — before the browser paints — so there's no flash back to the
 * default spot when navigating back mid-visit, and no server/client
 * hydration mismatch. */
export function usePersistedDrag(storageKey: string, defaultPosition: { x: number; y: number } = { x: 0, y: 0 }) {
  const x = useMotionValue(defaultPosition.x);
  const y = useMotionValue(defaultPosition.y);

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
