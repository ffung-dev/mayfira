export default function Laptop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="laptop">
      <rect x="28" y="18" width="64" height="46" rx="6" fill="var(--color-maroon)" stroke="var(--color-ink)" strokeWidth="2.5" />
      {/* screen "lights up" on hover — a fill/opacity shift is a cleaner
          read for this than a transform, so it's plain CSS via group-hover
          rather than part of the item's Motion wiggle */}
      <rect
        x="34"
        y="24"
        width="52"
        height="34"
        rx="3"
        className="fill-slate transition-colors duration-500 group-hover:fill-blush"
      />
      <rect
        x="40"
        y="30"
        width="24"
        height="3"
        rx="1.5"
        className="fill-cream opacity-85 transition-opacity duration-500 group-hover:opacity-100"
      />
      <rect
        x="40"
        y="37"
        width="34"
        height="3"
        rx="1.5"
        className="fill-cream opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <rect
        x="40"
        y="44"
        width="18"
        height="3"
        rx="1.5"
        className="fill-cream opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <path
        d="M20 64 H100 L108 88 A4 4 0 0 1 104 93 H16 A4 4 0 0 1 12 88 Z"
        fill="var(--color-rose)"
        stroke="var(--color-maroon)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="46" y="86" width="28" height="4" rx="2" fill="var(--color-maroon)" opacity="0.5" />
    </svg>
  );
}
