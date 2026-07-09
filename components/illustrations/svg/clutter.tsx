// Purely decorative background clutter for the cart — never interactive.

export function OrangesBagDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <path d="M14 20 Q30 8 46 20 L42 50 Q30 56 18 50 Z" fill="var(--color-blush)" stroke="var(--color-maroon)" strokeWidth="1.6" opacity="0.9" />
      <circle cx="24" cy="30" r="6" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="1.2" />
      <circle cx="36" cy="28" r="6.5" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="1.2" />
      <circle cx="30" cy="40" r="6" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="1.2" />
      <path d="M22 20 L30 10 L38 20" fill="none" stroke="var(--color-maroon)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScallionsDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <path d="M22 10 Q24 30 20 48" fill="none" stroke="var(--color-slate)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 6 Q31 28 29 48" fill="none" stroke="var(--color-slate)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M38 10 Q37 30 40 48" fill="none" stroke="var(--color-slate)" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="17" y="44" width="26" height="10" rx="4" fill="var(--color-cream)" stroke="var(--color-maroon)" strokeWidth="1.6" />
    </svg>
  );
}

export function ChipBagDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <path d="M16 16 L44 16 L48 52 Q30 58 12 52 Z" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="1.6" />
      <path d="M14 16 L20 8 L26 16 L32 8 L38 16 L46 16" fill="none" stroke="var(--color-maroon)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="30" cy="34" rx="10" ry="7" fill="var(--color-cream)" opacity="0.85" />
    </svg>
  );
}
