import { Link, type LinkProps } from "react-router";

export function BackLink({
  destination,
  state,
}: {
  destination: { href: string; label: string };
  state?: LinkProps["state"];
}) {
  return (
    <Link
      to={destination.href}
      state={state}
      aria-label={`Back to ${destination.label}`}
      className="back-link"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 8H3m0 0 4-4M3 8l4 4" />
      </svg>
      <span>{destination.label}</span>
    </Link>
  );
}
