// Small decorative line-art doodles for the homepage's maroon panel —
// pure flair, not interactive, always rendered in the current text color.

export function FlowerDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="4" />
      <circle cx="20" cy="10" r="5" />
      <circle cx="30" cy="20" r="5" />
      <circle cx="20" cy="30" r="5" />
      <circle cx="10" cy="20" r="5" />
    </svg>
  );
}

export function SmileyDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="15" />
      <circle cx="14" cy="17" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="26" cy="17" r="1.4" fill="currentColor" stroke="none" />
      <path d="M13 24 Q20 30 27 24" />
    </svg>
  );
}

export function CatDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 14 L14 6 L18 14" />
      <path d="M29 14 L26 6 L22 14" />
      <circle cx="20" cy="21" r="11" />
      <circle cx="16" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <path d="M18 24 q2 2 4 0" />
    </svg>
  );
}

export function BearDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="4" />
      <circle cx="28" cy="10" r="4" />
      <circle cx="20" cy="21" r="12" />
      <circle cx="16" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <ellipse cx="20" cy="25" rx="3.4" ry="2.4" />
    </svg>
  );
}

export function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 30 Q20 8 34 12" />
      <path d="M26 9 L34 12 L31 20" />
    </svg>
  );
}

export function SparkDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20 6 V16 M20 24 V34 M6 20 H16 M24 20 H34 M10 10 L16 16 M30 10 L24 16 M10 30 L16 24 M30 30 L24 24" />
    </svg>
  );
}
