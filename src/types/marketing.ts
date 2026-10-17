export interface Feature {
  icon: string;
  title: string;
  description: string;
  href?: string | null;
}

export interface EventItem {
  title: string;
  description: string;
  date: string;
  category: "ec" | "gl";
  tagLabel: string;
  image: string;
  location?: string | null;
}
