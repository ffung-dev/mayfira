export default function TeddyBear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="teddy bear">
      <circle cx="32" cy="28" r="14" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2.5" />
      <circle cx="88" cy="28" r="14" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2.5" />
      <circle cx="32" cy="28" r="5.5" fill="var(--color-blush)" />
      <circle cx="88" cy="28" r="5.5" fill="var(--color-blush)" />

      <circle cx="60" cy="48" r="34" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2.5" />
      <ellipse cx="60" cy="58" rx="17" ry="13" fill="var(--color-cream)" stroke="var(--color-maroon)" strokeWidth="2" />

      <circle cx="49" cy="44" r="3.5" fill="var(--color-ink)" />
      <circle cx="71" cy="44" r="3.5" fill="var(--color-ink)" />
      <ellipse cx="60" cy="53" rx="4.5" ry="3.2" fill="var(--color-ink)" />
      <path
        d="M60 56 v4 M60 60 q-6 5 -11 2 M60 60 q6 5 11 2"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <ellipse cx="60" cy="100" rx="30" ry="20" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2.5" />
      <circle cx="26" cy="94" r="11" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2.5" />
      <circle cx="94" cy="94" r="11" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2.5" />
    </svg>
  );
}
