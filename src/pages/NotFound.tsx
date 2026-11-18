import { Link } from "react-router";
import { PageContainer } from "@/components/ui";
import { ABOUT_CONTENT } from "@/data/about-content";
import { SITE_LINKS } from "@/data/site-links";

export default function NotFound() {
  const { message, link } = ABOUT_CONTENT.notFound;
  const { href, label } = SITE_LINKS[link];

  return (
    <PageContainer>
      <h1>{message}</h1>
      <p className="mt-link">
        <Link to={href}>{label}</Link>
      </p>
    </PageContainer>
  );
}
