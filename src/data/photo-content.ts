import data from "./photos.json";
import { readSiteLinkId, type SiteLinkId } from "./site-links";

export const PHOTO_CONTENT: {
  homeCaption: { text: string; link: SiteLinkId; placeholder: boolean };
  images: {
    id: string;
    file: string;
    caption?: string;
    place: string;
    date: string;
    placeholder: boolean;
  }[];
  placeholder: boolean;
} = {
  ...data,
  homeCaption: {
    ...data.homeCaption,
    link: readSiteLinkId(data.homeCaption.link),
  },
};
