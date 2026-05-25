import type { ReactNode } from "react";

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

export interface NavigationItem {
  slug: string;
  title: string;
}

export interface InfoItem {
  title: string;
  content?: ReactNode;
  links?: Link[];
  entries?: NomadEntry[];
}

export interface InfoData {
  [key: string]: InfoItem;
}

export interface SocialLink {
  name: string;
  url: string;
}
