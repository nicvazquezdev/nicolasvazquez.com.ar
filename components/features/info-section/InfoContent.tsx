"use client";

import { InfoItem } from "@/types";
import { linkifyText } from "@/lib/utils";
import LinksList from "./LinksList";
import NomadEntries from "./NomadEntries";
import HoverList from "./HoverList";

interface InfoContentProps {
  item: InfoItem;
}

export default function InfoContent({ item }: InfoContentProps) {
  const internalLinks = item.links?.filter(
    (l) => l.date && l.url.startsWith("/")
  );
  const externalLinks = item.links?.filter(
    (l) => !l.date || !l.url.startsWith("/")
  );

  return (
    <div className="text-gray-300 leading-relaxed animate-in fade-in duration-200">
      {/* Subtitle */}
      {item.subtitle && (
        <div className="mb-4 text-lg md:text-xl">{item.subtitle}</div>
      )}

      {/* Text content */}
      {item.content && (
        <div
          className="whitespace-pre-line break-words overflow-hidden md:max-w-3xl md:text-base"
        >
          {linkifyText(item.content)}
        </div>
      )}

      {/* Nomad entries */}
      {item.entries && <NomadEntries entries={item.entries} />}

      {/* Internal links (thoughts) */}
      {internalLinks && internalLinks.length > 0 && (
        <HoverList
          items={internalLinks.map((l) => ({
            href: l.url,
            label: l.name,
            meta: l.date!,
          }))}
        />
      )}

      {/* External links */}
      {externalLinks && externalLinks.length > 0 && (
        <LinksList links={externalLinks} />
      )}
    </div>
  );
}
