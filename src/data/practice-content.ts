import data from "./practice.json";

type PracticeSeries = {
  slug: string;
  title: string;
  description?: string;
  photoIds: string[];
  placeholder: boolean;
};

export const PRACTICE_CONTENT: {
  label: string;
  description: string;
  series: PracticeSeries[];
  placeholder: boolean;
} = data;
