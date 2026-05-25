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
    <article className="pt-2">
      <nav className="mb-10" aria-label="Breadcrumb">
        <Link
          href="/#digital-nomad"
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← back
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl md:text-[28px] font-medium tracking-tight text-[var(--foreground)] leading-tight">
          {entry.country}
        </h1>
        <p className="mt-3 text-xs font-mono tabular-nums text-[var(--muted)]">
          {entry.date}
        </p>
      </header>

      <div className="prose-reading prose-post max-w-none whitespace-pre-line">
        {entry.content}
      </div>

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
          href: "/#digital-nomad",
          label: "index",
        }}
      />
    </article>
  );
}
