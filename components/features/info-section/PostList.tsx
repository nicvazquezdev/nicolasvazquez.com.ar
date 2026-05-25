import Link from "next/link";

export interface PostListItem {
  href: string;
  label: string;
  meta?: string;
}

interface PostListProps {
  items: PostListItem[];
}

export default function PostList({ items }: PostListProps) {
  return (
    <ul className="divide-y divide-[var(--rule)]">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex items-baseline justify-between gap-6 py-4 transition-colors"
          >
            <span className="text-[19px] md:text-[20px] leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              {item.label}
            </span>
            {item.meta && (
              <span className="shrink-0 text-[11px] font-mono tabular-nums text-[var(--muted)] tracking-wider">
                {item.meta}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
