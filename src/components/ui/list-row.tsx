import { LinkLabel } from "@/components/ui/link-label";
import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { NewMark } from "./new-mark";

type ListRowProps = {
  title: string;
  status?: string;
  href?: string;
  newTab?: boolean;
  navigationState?: LinkProps["state"];
  newLabel?: string;
  preview?: ReactNode;
};

export function ListRow({
  title,
  status,
  href,
  newTab,
  navigationState,
  newLabel,
  preview,
}: ListRowProps) {
  const titleContent = (
    <>
      <LinkLabel label={title} />
      {newLabel && (
        <>
          <span className="sr-only"> </span>
          <NewMark label={newLabel} />
        </>
      )}
    </>
  );

  return (
    <li className={status ? undefined : "py-link"}>
      {preview}
      <div className={status ? "work-list-row" : undefined}>
        <div className="work-list-title">
          {href ? (
            newTab ? (
              <a href={href} target="_blank" rel="noreferrer">
                {titleContent}
              </a>
            ) : (
              <Link to={href} state={navigationState}>
                {titleContent}
              </Link>
            )
          ) : (
            <span className="text-text-2">{titleContent}</span>
          )}
        </div>
        {status && (
          <span className="text-small text-text-2 min-[480px]:text-right">
            {status}
          </span>
        )}
      </div>
    </li>
  );
}
