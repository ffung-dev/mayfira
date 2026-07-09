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

export function MilkCartonDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <path d="M18 16 L18 52 L42 52 L42 16 L30 8 L18 16 Z" fill="var(--color-cream)" stroke="var(--color-maroon)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 16 L30 22 L42 16" fill="none" stroke="var(--color-maroon)" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="21" y="30" width="18" height="10" rx="1.5" fill="var(--color-slate)" opacity="0.7" />
    </svg>
  );
}

export function BreadLoafDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <path d="M12 34 Q12 18 30 16 Q48 18 48 34 L46 46 Q30 52 14 46 Z" fill="var(--color-blush)" stroke="var(--color-maroon)" strokeWidth="1.6" />
      <path d="M20 24 Q30 18 40 24" fill="none" stroke="var(--color-maroon)" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
      <path d="M18 32 Q30 27 42 32" fill="none" stroke="var(--color-maroon)" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function EggCartonDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <rect x="10" y="18" width="40" height="28" rx="4" fill="var(--color-cream)" stroke="var(--color-maroon)" strokeWidth="1.6" />
      <ellipse cx="21" cy="32" rx="6" ry="7.5" fill="var(--color-blush)" stroke="var(--color-maroon)" strokeWidth="1.2" />
      <ellipse cx="39" cy="32" rx="6" ry="7.5" fill="var(--color-blush)" stroke="var(--color-maroon)" strokeWidth="1.2" />
      <path d="M10 18 L14 10 L46 10 L50 18" fill="none" stroke="var(--color-maroon)" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function CannedGoodDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <rect x="16" y="16" width="28" height="34" rx="3" fill="var(--color-rose)" stroke="var(--color-maroon)" strokeWidth="1.6" />
      <ellipse cx="30" cy="16" rx="14" ry="4" fill="var(--color-cream)" stroke="var(--color-maroon)" strokeWidth="1.4" />
      <rect x="18" y="28" width="24" height="12" rx="1.5" fill="var(--color-cream)" opacity="0.85" />
      <path d="M21 33 h18" stroke="var(--color-maroon)" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function CerealBoxDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} role="img" aria-hidden="true">
      <path d="M14 14 L46 14 L44 52 L16 52 Z" fill="var(--color-slate)" stroke="var(--color-maroon)" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="20" y="22" width="20" height="14" rx="2" fill="var(--color-cream)" opacity="0.85" />
      <circle cx="30" cy="29" r="4.5" fill="var(--color-blush)" />
    </svg>
  );
}
