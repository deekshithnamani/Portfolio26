export function NewMark({ label }: { label: string }) {
  return (
    <span className="relative ml-2 inline-block whitespace-nowrap px-1.5 text-small">
      {label}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-pen"
        viewBox="0 0 46 24"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          className="new-mark-stroke"
          d="M41 7C36 1 14 1 6 6C-4 12 3 22 22 22C37 23 45 17 44 11C44 9 43 8 41 7Z"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
