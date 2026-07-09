"use client";

import { useEffect, useState } from "react";

/** Tracks a CSS media query client-side. Starts false (matches SSR), then
 * corrects itself after mount — fine for progressive-enhancement UI like
 * hover affordances, but don't use it to gate anything that must be
 * correct on first paint. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
