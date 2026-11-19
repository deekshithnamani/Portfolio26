import { Link } from "react-router";
import { EmptyState } from "@/components/ui/empty-state";
import { PageContainer } from "@/components/ui";
import { ABOUT_CONTENT } from "@/data/about-content";
import { SITE_LINKS } from "@/data/site-links";

export default function NotFound() {
  const { message, link } = ABOUT_CONTENT.notFound;
  const { href, label } = SITE_LINKS[link];

  return (
    <PageContainer>
      <EmptyState title={message} action={<Link to={href}>{label}</Link>} />
    </PageContainer>
  );
}
