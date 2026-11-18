import data from "./about.json";
import { readSiteLinkId, type SiteLinkId } from "./site-links";

export const ABOUT_CONTENT: {
  label: string;
  sections: {
    title: string;
    body: string;
    links?: SiteLinkId[];
    placeholder: boolean;
  }[];
  languages: string;
  notFound: { message: string; link: SiteLinkId; placeholder: boolean };
  placeholder: boolean;
} = {
  ...data,
  sections: data.sections.map((section) => ({
    ...section,
    links: section.links?.map(readSiteLinkId),
  })),
  notFound: { ...data.notFound, link: readSiteLinkId(data.notFound.link) },
};
