import { LinkLabel } from "@/components/ui/link-label";
import { Link } from "react-router";

type ListRowProps = {
  title: string;
  type?: string;
  href?: string;
  newTab?: boolean;
  year?: string;
  description?: string;
};

export function ListRow({
  title,
  type,
  href,
  newTab,
  year,
  description,
}: ListRowProps) {
  const titleContent = <LinkLabel label={title} />;

  const metadata = [type, year].filter((value) => value?.trim()).join(" · ");

  return (
    <li className="min-w-0">
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
      </div>
      {metadata && <p className="text-small text-text-2">{metadata}</p>}
      {description?.trim() && (
        <p className="text-small text-text-2">{description}</p>
      )}
    </li>
  );
}
