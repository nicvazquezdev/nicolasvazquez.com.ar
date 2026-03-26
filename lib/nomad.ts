import { infoData } from "@/data";
import { NomadEntry } from "@/types";

export function getAllNomadEntries(): NomadEntry[] {
  return infoData["digital-nomad"].entries ?? [];
}

export function getNomadEntryBySlug(slug: string): NomadEntry | null {
  const entries = getAllNomadEntries();
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllNomadSlugs(): string[] {
  return getAllNomadEntries().map((e) => e.slug);
}

export function getAdjacentNomadEntries(
  currentSlug: string
): { previous: NomadEntry | null; next: NomadEntry | null } {
  const entries = getAllNomadEntries();
  const index = entries.findIndex((e) => e.slug === currentSlug);

  if (index === -1) return { previous: null, next: null };

  const previousIndex = index === 0 ? entries.length - 1 : index - 1;
  const nextIndex = index === entries.length - 1 ? 0 : index + 1;

  return {
    previous: entries[previousIndex],
    next: entries[nextIndex],
  };
}
