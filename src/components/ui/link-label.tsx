export function LinkLabel({ label }: { label: string }) {
  const arrow = label.at(-1);
  if (arrow !== "↗" && arrow !== "→") return label;

  return (
    <>
      {label.slice(0, -1).trimEnd()}
      <span className="link-arrow">
        <span className="sr-only">{` ${arrow}`}</span>
        <svg
          aria-hidden="true"
          focusable="false"
          className="inline-block size-[0.75em] align-baseline"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path
            d={
              arrow === "↗" ? "M2.5 9.5 9.5 2.5m-6 0h6v6" : "M2 6h8M6 2l4 4-4 4"
            }
          />
        </svg>
      </span>
    </>
  );
}
