import { LinkLabel } from "@/components/ui/link-label";
import { Link } from "react-router";
import { NewMark } from "./new-mark";

type ListRowProps = {
  title: string;
  status?: string;
  href?: string;
  newTab?: boolean;
  newLabel?: string;
  year: string;
  description?: string;
};

export function ListRow({
  title,
  status,
  href,
  newTab,
  newLabel,
  year,
  description,
}: ListRowProps) {
  const titleContent = <LinkLabel label={title} />;

  return (
    <li className="border-b border-line">
      <div className="work-list-row">
        <span className="work-list-year text-small text-text-2">{year}</span>
        <div className="work-list-project">
          <div className="work-list-title">
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
            {newLabel && <NewMark label={newLabel} />}
          </div>
          {description?.trim() && <p className="text-text-2">{description}</p>}
        </div>
        {status && (
          <span className="work-list-status text-small text-text-2">
            {status}
          </span>
        )}
      </div>
    </li>
  );
}
