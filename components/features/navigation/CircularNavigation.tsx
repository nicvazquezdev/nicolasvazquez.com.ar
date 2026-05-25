import Link from "next/link";
import { NavigationItem } from "@/types";

const chevronLeftIcon = (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const chevronRightIcon = (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

interface CircularNavigationProps {
  previousItem?: NavigationItem | null;
  nextItem?: NavigationItem | null;
  basePath: string;
  centerLink?: {
    href: string;
    label: string;
  };
}

export default function CircularNavigation({
  previousItem,
  nextItem,
  basePath,
  centerLink,
}: CircularNavigationProps) {
  return (
    <nav className="mt-16" aria-label="Post navigation">
      <div className="flex justify-between items-center gap-4 text-sm">
        <div className="flex-1">
          {previousItem ? (
            <Link
              href={`${basePath}/${previousItem.slug}`}
              className="group inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              {chevronLeftIcon}
              <span className="hidden md:inline">{previousItem.title}</span>
              <span className="md:hidden">previous</span>
            </Link>
          ) : null}
        </div>

        {centerLink ? (
          <div className="flex-shrink-0">
            <Link
              href={centerLink.href}
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              {centerLink.label}
            </Link>
          </div>
        ) : null}

        <div className="flex-1 flex justify-end">
          {nextItem ? (
            <Link
              href={`${basePath}/${nextItem.slug}`}
              className="group inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="hidden md:inline">{nextItem.title}</span>
              <span className="md:hidden">next</span>
              {chevronRightIcon}
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
