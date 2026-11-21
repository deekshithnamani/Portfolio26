import { Link } from "react-router";
import { SITE_LINKS, type LinkedText } from "@/data/site-links";
import { LinkLabel } from "./link-label";

export function InlineCopy({ parts }: { parts: readonly LinkedText[] }) {
  return parts.map(({ text, link }, index) => {
    if (link === undefined) return text;
    const { href, label, newTab } = SITE_LINKS[link];
    return newTab ? (
      <a key={index} href={href} target="_blank" rel="noreferrer">
        <LinkLabel label={label} />
      </a>
    ) : (
      <Link key={index} to={href}>
        {label}
      </Link>
    );
  });
}
