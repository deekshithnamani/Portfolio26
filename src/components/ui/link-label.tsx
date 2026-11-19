export function LinkLabel({ label }: { label: string }) {
  if (!label.endsWith(" ↗")) return label;

  return (
    <>
      {label.slice(0, -2)} <span className="sr-only">↗</span>
      <svg
        aria-hidden="true"
        focusable="false"
        className="inline-block size-[0.75em] align-baseline"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M2.5 9.5 9.5 2.5m-6 0h6v6" />
      </svg>
    </>
  );
}
