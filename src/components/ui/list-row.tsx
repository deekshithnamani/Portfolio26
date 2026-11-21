import { LinkLabel } from "@/components/ui/link-label";
import { Link } from "react-router";

type ListRowProps = {
  title: string;
  compact?: boolean;
  href?: string;
  newTab?: boolean;
  year?: string;
  description?: string;
};

export function ListRow({
  title,
  compact,
  href,
  newTab,
  year,
  description,
}: ListRowProps) {
  const titleContent = <LinkLabel label={title} />;

  return (
    <li className={year ? "work-list-row" : undefined}>
      {year && (
        <span className="work-list-year text-small text-text-2">{year}</span>
      )}
      <div className="work-list-project">
        <div
          className={
            compact ? "text-small font-medium wrap-anywhere" : "work-list-title"
          }
        >
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
        </div>
        {description?.trim() && (
          <p className="text-small text-text-2">{description}</p>
        )}
      </div>
    </li>
  );
}
