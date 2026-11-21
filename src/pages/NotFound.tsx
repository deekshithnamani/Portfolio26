import { BackLink } from "@/components/ui/back-link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageContainer } from "@/components/ui";
import { ABOUT_CONTENT } from "@/data/about-content";
import { SITE_LINKS } from "@/data/site-links";

export default function NotFound() {
  const { message, link } = ABOUT_CONTENT.notFound;
  const destination = SITE_LINKS[link];

  return (
    <PageContainer>
      <EmptyState
        title={message}
        action={<BackLink destination={destination} />}
      />
    </PageContainer>
  );
}
