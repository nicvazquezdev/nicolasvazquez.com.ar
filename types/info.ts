// Info section and content related types

export interface Link {
  name: string;
  url: string;
  date?: string;
}

export interface NomadEntry {
  slug: string;
  country: string;
  date: string;
  content: string;
}

export interface InfoItem {
  title: string;
  content?: string;
  subtitle?: string;
  links?: Link[];
  entries?: NomadEntry[];
}

export interface InfoData {
  [key: string]: InfoItem;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}
