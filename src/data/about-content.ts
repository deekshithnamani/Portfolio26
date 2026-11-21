import data from "./about.json";
import { readSiteLinkId } from "./site-links";

export const ABOUT_CONTENT = {
  ...data,
  notFound: { ...data.notFound, link: readSiteLinkId(data.notFound.link) },
};
