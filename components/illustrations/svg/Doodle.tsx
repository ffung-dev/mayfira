export default function Doodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <path
        d="M30 46 C10 32 6 18 18 12 C25 8 30 14 30 18 C30 14 35 8 42 12 C54 18 50 32 30 46 Z"
        fill="none"
        stroke="var(--color-maroon)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
