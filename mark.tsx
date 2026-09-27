export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
      <circle cx="16" cy="16" r="6.2" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
      <path
        d="M16 9.4V3.2M16 28.8V22.6M9.4 16H3.2M28.8 16H22.6M11.1 11.1 6.4 6.4M25.6 25.6 20.9 20.9M20.9 11.1 25.6 6.4M6.4 25.6 11.1 20.9"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}
