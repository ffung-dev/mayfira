export function TagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L20 3 L20 11 L12.7 20.3a1.5 1.5 0 0 1-2.1.2L4 14.8a1.5 1.5 0 0 1-.2-2.1Z" />
      <circle cx="16" cy="7" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M18 6l-2 2M6 18l2-2M18 18l-2-2" />
    </svg>
  );
}

export function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l2.6 6.9 7.4.5-5.7 4.8 1.9 7.2-6.2-4-6.2 4 1.9-7.2-5.7-4.8 7.4-.5Z" />
    </svg>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7.5-4.6-10-9.3C.5 7 2.3 3.8 5.6 3.4c2-.3 3.7.7 4.9 2.6C11.7 4.1 13.4 3.1 15.4 3.4c3.3.4 5.1 3.6 3.6 7.3C16.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
