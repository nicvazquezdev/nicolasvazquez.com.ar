import Link from "next/link";
import { Link as LinkType } from "@/types";

const externalLinkIcon = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block ml-1 opacity-60 group-hover:opacity-100 transition-opacity"
    aria-hidden="true"
  >
    <path d="M3.5 3h5.5v5.5M9 3L3 9" />
  </svg>
);

interface LinksListProps {
  links: LinkType[];
}

export default function LinksList({ links }: LinksListProps) {
  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li
          key={index}
          className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3"
        >
          {link.date && (
            <span className="text-xs tabular-nums text-[var(--muted)] font-mono md:w-32 md:shrink-0">
              {link.date}
            </span>
          )}
          <Link
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={
              link.url.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="group inline-flex items-baseline text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            <span className="underline underline-offset-4 decoration-[var(--muted)] group-hover:decoration-[var(--accent)]">
              {link.name}
            </span>
            {link.url.startsWith("http") ? externalLinkIcon : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
