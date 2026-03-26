import Link from "next/link";
import { NomadEntry } from "@/types";
import { CircularNavigation } from "@/components/features/navigation";

interface NomadDetailProps {
  entry: NomadEntry;
  previousEntry: NomadEntry | null;
  nextEntry: NomadEntry | null;
}

export default function NomadDetail({
  entry,
  previousEntry,
  nextEntry,
}: NomadDetailProps) {
  return (
    <main className="pt-6">
      <div className="w-full max-w-4xl">
        <nav className="mb-4 md:mb-10" aria-label="Breadcrumb">
          <Link
            href="/?tab=digital-nomad"
            className="text-gray-400 hover:text-white text-sm underline underline-offset-2"
          >
            ← back to travels
          </Link>
        </nav>

        <article className="space-y-6 min-h-[50vh]">
          <header className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {entry.country}
            </h1>
            <p className="text-gray-500 text-sm">{entry.date}</p>
          </header>

          <div className="text-gray-300 leading-relaxed whitespace-pre-line md:max-w-3xl md:text-lg">
            {entry.content}
          </div>
        </article>

        <CircularNavigation
          previousItem={
            previousEntry
              ? { slug: previousEntry.slug, title: previousEntry.country }
              : null
          }
          nextItem={
            nextEntry
              ? { slug: nextEntry.slug, title: nextEntry.country }
              : null
          }
          basePath="/digital-nomad"
          centerLink={{
            href: "/?tab=digital-nomad",
            label: "all entries",
          }}
        />
      </div>
    </main>
  );
}
