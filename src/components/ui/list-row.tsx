import type { ReactNode } from "react";
import { Link } from "react-router";
import { NewMark } from "./new-mark";

type ListRowProps = {
  title: string;
  year?: string;
  status?: string;
  href?: string;
  newTab?: boolean;
  newLabel?: string;
  preview?: ReactNode;
};

export function ListRow({
  title,
  year,
  status,
  href,
  newTab,
  newLabel,
  preview,
}: ListRowProps) {
  const titleContent = (
    <>
      {title}
      {newLabel && (
        <>
          {" "}
          <NewMark label={newLabel} />
        </>
      )}
    </>
  );

  return (
    <li className="border-b border-line py-link">
      {preview}
      <div
        className={
          status
            ? "grid grid-cols-[96px_minmax(0,1fr)_auto] items-baseline gap-link"
            : undefined
        }
      >
        {status && <span className="text-small text-text-2">{year}</span>}
        {href ? (
          newTab ? (
            <a href={href} target="_blank" rel="noreferrer">
              {titleContent}
            </a>
          ) : (
            <Link to={href}>{titleContent}</Link>
          )
        ) : (
          <span className="text-text-2">{titleContent}</span>
        )}
        {status && (
          <span className="text-right text-small text-text-2">{status}</span>
        )}
      </div>
    </li>
  );
}
