import data from "./links.json";

type LinkLocation =
  "header" | "footer" | "home" | "about" | "work" | "caseStudy" | "notFound";

type SiteLink = {
  label: string;
  href: string;
  appearsIn: readonly string[];
  newTab?: boolean;
  labels?: Partial<Record<LinkLocation, string>>;
  comment?: string;
  placeholder: boolean;
};

export const SITE_LINKS: { [Id in keyof typeof data.items]: SiteLink } =
  data.items;
export const SITE_UPDATED = data.updated;
export type SiteLinkId = keyof typeof SITE_LINKS;
export type LinkedText =
  { text: string; link?: never } | { link: SiteLinkId; text?: never };

export function readSiteLinkId(id: string): SiteLinkId {
  if (!Object.hasOwn(SITE_LINKS, id)) {
    throw new Error(`Unknown site link ID: ${id}`);
  }
  return id as SiteLinkId;
}

export function readLinkedText(
  part: { text: string; link?: never } | { link: string; text?: never },
): LinkedText {
  return part.link === undefined
    ? { text: part.text }
    : { link: readSiteLinkId(part.link) };
}

export function getSiteLinks(location: LinkLocation) {
  return Object.entries(SITE_LINKS)
    .filter(([, item]) => item.appearsIn.includes(location))
    .map(([id, { label, href, labels, newTab }]) => ({
      id,
      label: labels?.[location] ?? label,
      href,
      newTab,
    }));
}
