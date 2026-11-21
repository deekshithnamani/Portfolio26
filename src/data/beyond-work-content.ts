import data from "./practice.json";

type BeyondWorkSeries = {
  slug: string;
  title: string;
  description: string;
  photoIds: string[];
  placeholder: boolean;
};

export const BEYOND_WORK_CONTENT: {
  label: string;
  description: string;
  series: BeyondWorkSeries[];
  placeholder: boolean;
} = data;
