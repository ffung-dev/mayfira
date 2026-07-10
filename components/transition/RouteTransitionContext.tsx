"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RouteTransitionOverlay from "./RouteTransitionOverlay";

type RouteTransitionContextValue = {
  startTransition: () => void;
  /** False while the overlay is showing or still fading out. Page-entrance
   * animations (heading letter-spacing, homepage doodles, ...) should wait
   * for this to flip true rather than firing on mount, so nothing animates
   * behind a screen the user can't see yet. */
  overlayGone: boolean;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

// Held visible at least this long so a fast navigation still reads as a
// deliberate transition rather than a flicker.
const MIN_VISIBLE_MS = 500;
// Must match RouteTransitionOverlay.module.css's opacity transition
// duration — overlayGone should flip exactly when the fade finishes, not
// before (or noticeably after).
const FADE_OUT_MS = 350;

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [overlayGone, setOverlayGone] = useState(true);
  const shownAtRef = useRef(0);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;
    if (!visible) return;

    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    const timer = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(timer);
  }, [pathname, visible]);

  // overlayGone tracks the *fully faded* moment, one CSS-transition-length
  // after visible flips false — not the same instant.
  useEffect(() => {
    if (visible) return;
    const timer = setTimeout(() => setOverlayGone(true), FADE_OUT_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  const startTransition = () => {
    shownAtRef.current = Date.now();
    setVisible(true);
    setOverlayGone(false);
  };

  return (
    <RouteTransitionContext.Provider value={{ startTransition, overlayGone }}>
      {children}
      <RouteTransitionOverlay visible={visible} />
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) throw new Error("useRouteTransition must be used within RouteTransitionProvider");
  return ctx;
}
