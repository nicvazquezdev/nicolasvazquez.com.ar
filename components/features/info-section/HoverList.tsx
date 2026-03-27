"use client";

import Link from "next/link";
import { useHoverHighlight } from "@/hooks";

export interface HoverListItem {
  href: string;
  label: string;
  meta: string;
}

interface HoverListProps {
  items: HoverListItem[];
}

export default function HoverList({ items }: HoverListProps) {
  const { hoverStyle, handleMouseEnter, handleMouseLeave, containerRef } =
    useHoverHighlight("vertical");

  return (
    <div
      ref={containerRef}
      className="relative md:max-w-xl -ml-4"
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute left-0 w-full rounded-lg bg-white/[0.04] pointer-events-none ${
          hoverStyle.animate
            ? "transition-[top,height,opacity] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            : "transition-opacity duration-150"
        }`}
        style={{
          top: hoverStyle.offset,
          height: hoverStyle.size,
          opacity: hoverStyle.opacity,
        }}
      />

      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={handleMouseEnter}
          className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-0.5 py-3 px-4 rounded-lg cursor-pointer"
        >
          <span className="text-gray-300 text-sm font-medium">
            {item.label}
          </span>
          <span className="text-gray-600 text-xs">{item.meta}</span>
        </Link>
      ))}
    </div>
  );
}
