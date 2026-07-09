export default function CartSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="shopping cart, top view">
      <rect x="40" y="20" width="320" height="28" rx="14" fill="var(--color-maroon)" stroke="var(--color-ink)" strokeWidth="3" />
      <rect x="20" y="48" width="360" height="220" rx="28" fill="var(--color-blush)" stroke="var(--color-maroon)" strokeWidth="3.5" />
      <g stroke="var(--color-rose)" strokeWidth="2" opacity="0.6">
        <line x1="20" y1="98" x2="380" y2="98" />
        <line x1="20" y1="148" x2="380" y2="148" />
        <line x1="20" y1="198" x2="380" y2="198" />
        <line x1="100" y1="48" x2="100" y2="268" />
        <line x1="180" y1="48" x2="180" y2="268" />
        <line x1="260" y1="48" x2="260" y2="268" />
        <line x1="340" y1="48" x2="340" y2="268" />
      </g>
    </svg>
  );
}
