import data from "./photos.json";

export const PHOTO_CONTENT: {
  images: {
    id: string;
    file: string;
    alt: string;
    caption?: string;
    place: string;
    date: string;
    placeholder: boolean;
  }[];
  placeholder: boolean;
} = data;
