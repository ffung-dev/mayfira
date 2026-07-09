import { useId } from "react";

export default function YarnBall({ className }: { className?: string }) {
  const clipId = useId();

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="yarn ball">
      <defs>
        <clipPath id={clipId}>
          <circle cx="58" cy="58" r="38" />
        </clipPath>
      </defs>

      <circle cx="58" cy="58" r="38" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="2.5" />
      <g clipPath={`url(#${clipId})`} fill="none" stroke="var(--color-maroon)" strokeWidth="2.5" strokeLinecap="round">
        <path d="M24 50 Q58 20 92 50" />
        <path d="M22 62 Q58 92 94 62" />
        <path d="M30 32 Q60 58 30 84" />
        <path d="M86 32 Q56 58 86 84" />
      </g>
      <path d="M88 78 q14 6 10 22" fill="none" stroke="var(--color-maroon)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
