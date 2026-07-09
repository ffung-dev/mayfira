"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RouteTransitionOverlay from "./RouteTransitionOverlay";

type RouteTransitionContextValue = {
  startTransition: () => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

// Held visible at least this long so a fast navigation still reads as a
// deliberate transition rather than a flicker.
const MIN_VISIBLE_MS = 500;

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
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

  const startTransition = () => {
    shownAtRef.current = Date.now();
    setVisible(true);
  };

  return (
    <RouteTransitionContext.Provider value={{ startTransition }}>
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
