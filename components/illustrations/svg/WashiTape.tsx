export default function WashiTape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 32" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="100" height="32" fill="var(--color-slate)" opacity="0.55" />
      <g stroke="var(--color-cream)" strokeWidth="2" opacity="0.5">
        <line x1="-10" y1="34" x2="20" y2="-2" />
        <line x1="10" y1="34" x2="40" y2="-2" />
        <line x1="30" y1="34" x2="60" y2="-2" />
        <line x1="50" y1="34" x2="80" y2="-2" />
        <line x1="70" y1="34" x2="100" y2="-2" />
        <line x1="90" y1="34" x2="120" y2="-2" />
      </g>
    </svg>
  );
}
