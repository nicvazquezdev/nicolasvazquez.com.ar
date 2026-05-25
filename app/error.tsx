"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="pt-2">
      <h1 className="text-2xl md:text-[28px] font-medium tracking-tight text-[var(--foreground)]">
        something went wrong
      </h1>
      <p className="mt-4 text-[15px] text-[var(--muted-strong)] max-w-prose leading-relaxed">
        an unexpected error occurred. it&apos;s probably temporary. you can try
        again, or head back home.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <button
          onClick={reset}
          className="text-[var(--foreground)] underline underline-offset-4 decoration-[var(--muted)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors cursor-pointer"
        >
          retry
        </button>
        <Link
          href="/"
          className="text-[var(--foreground)] underline underline-offset-4 decoration-[var(--muted)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors"
        >
          back home
        </Link>
      </div>

      {process.env.NODE_ENV === "development" && error.message && (
        <pre className="mt-10 text-xs text-[var(--muted)] bg-[#f4f2ec] border border-[var(--rule)] p-3 rounded overflow-x-auto">
          {error.message}
        </pre>
      )}
    </main>
  );
}
