const DIAL_HOLES = [
  { cx: 60, cy: 65 },
  { cx: 73, cy: 72.5 },
  { cx: 73, cy: 87.5 },
  { cx: 60, cy: 95 },
  { cx: 47, cy: 87.5 },
  { cx: 47, cy: 72.5 },
];

export default function Telephone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="telephone">
      <rect x="20" y="60" width="80" height="40" rx="10" fill="var(--color-maroon)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <circle cx="60" cy="80" r="22" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="60" cy="80" r="3" fill="var(--color-ink)" />
      {DIAL_HOLES.map((hole) => (
        <circle key={`${hole.cx}-${hole.cy}`} cx={hole.cx} cy={hole.cy} r="2.5" fill="var(--color-ink)" />
      ))}

      <path d="M28 42 Q60 14 92 42" fill="none" stroke="var(--color-rose)" strokeWidth="12" strokeLinecap="round" />
      <circle cx="28" cy="42" r="10" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2" />
      <circle cx="92" cy="42" r="10" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2" />
      <path d="M60 60 q-6 8 0 14 q6 6 0 12" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
