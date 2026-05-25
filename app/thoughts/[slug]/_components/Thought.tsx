"use client";

import Link from "next/link";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThoughtInterface } from "@/types";
import { CircularNavigation } from "@/components/features/navigation";

const markdownComponents: Partial<Components> = {
  a: ({ href, children }) => (
    <Link
      href={href || "#"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  ),
};

const formatPostDate = (date: string): string => {
  const [day, month, year] = date.split("-");
  const dateStr = `${year}-${month}-${day}`;
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface ThoughtProps {
  post: ThoughtInterface;
  previousPost: ThoughtInterface | null;
  nextPost: ThoughtInterface | null;
}

export default function Thought({
  post,
  previousPost,
  nextPost,
}: ThoughtProps) {
  const formattedDate = formatPostDate(post.date);

  return (
    <article className="pt-2" itemScope itemType="https://schema.org/BlogPosting">
      <nav className="mb-10" aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← back
        </Link>
      </nav>

      <header className="mb-10">
        <h1
          className="text-2xl md:text-[28px] font-medium tracking-tight text-[var(--foreground)] leading-tight"
          itemProp="headline"
        >
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-3 text-[15px] text-[var(--muted-strong)] leading-relaxed max-w-none">
            {post.excerpt}
          </p>
        )}
        <time
          dateTime={post.date}
          itemProp="datePublished"
          className="mt-4 block text-xs font-mono tabular-nums text-[var(--muted)]"
        >
          {formattedDate}
        </time>
      </header>

      <div className="prose-reading prose-post max-w-none" itemProp="articleBody">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <CircularNavigation
        previousItem={previousPost}
        nextItem={nextPost}
        basePath="/thoughts"
        centerLink={{
          href: "/",
          label: "index",
        }}
      />
    </article>
  );
}
