import data from "./about.json";
import { readLinkedText } from "./site-links";

export const ABOUT_CONTENT = {
  ...data,
  sections: data.sections.map(({ body, ...section }) => ({
    ...section,
    body: body.map(readLinkedText),
  })),
  contact: data.contact.map(readLinkedText),
};
