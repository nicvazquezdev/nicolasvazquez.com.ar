import { NomadEntry } from "@/types";
import HoverList from "./HoverList";

interface NomadEntriesProps {
  entries: NomadEntry[];
}

export default function NomadEntries({ entries }: NomadEntriesProps) {
  const items = entries.map((entry) => ({
    href: `/digital-nomad/${entry.slug}`,
    label: entry.country,
    meta: entry.date,
  }));

  return <HoverList items={items} />;
}
