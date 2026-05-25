import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — not found",
  description: "the page you are looking for could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="pt-2">
      <h1 className="text-2xl md:text-[28px] font-medium tracking-tight text-[var(--foreground)]">
        not found
      </h1>
      <p className="mt-4 text-[15px] text-[var(--muted-strong)] max-w-prose leading-relaxed">
        the page you&apos;re looking for doesn&apos;t exist, was moved, or is no
        longer here.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link
          href="/"
          className="text-[var(--foreground)] underline underline-offset-4 decoration-[var(--muted)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
        >
          back home
        </Link>
        <Link
          href="/#thoughts"
          className="text-[var(--foreground)] underline underline-offset-4 decoration-[var(--muted)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
        >
          read something
        </Link>
      </div>
    </main>
  );
}
