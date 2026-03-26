import { notFound } from "next/navigation";
import {
  getNomadEntryBySlug,
  getAllNomadSlugs,
  getAdjacentNomadEntries,
} from "@/lib/nomad";
import { NomadDetail } from "./_components";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config";

interface NomadPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NomadPage({ params }: NomadPageProps) {
  const { slug } = await params;
  const entry = getNomadEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { previous, next } = getAdjacentNomadEntries(slug);

  return <NomadDetail entry={entry} previousEntry={previous} nextEntry={next} />;
}

export async function generateStaticParams() {
  return getAllNomadSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NomadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNomadEntryBySlug(slug);

  if (!entry) {
    return { title: "Not Found" };
  }

  const description = entry.content.slice(0, 160);

  return {
    title: `${entry.country} — ${entry.date}`,
    description,
    openGraph: {
      title: `${entry.country} — ${entry.date}`,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/digital-nomad/${slug}`,
    },
  };
}
