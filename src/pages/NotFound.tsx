import { BackLink } from "@/components/ui/back-link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageContainer } from "@/components/ui";
import { NOT_FOUND_CONTENT, SITE_LINKS } from "@/data/site-links";

export default function NotFound() {
  const { message, link } = NOT_FOUND_CONTENT;
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
