import { InfoData } from "@/types";
import Section from "./Section";
import PostList from "./PostList";

interface SectionsProps {
  data: InfoData;
}

/**
 * Section order is fixed independent of data key order so the home page
 * reads as: about → thoughts → travels.
 */
const ORDER = [
  { key: "me", label: "ABOUT" },
  { key: "thoughts", label: "THOUGHTS" },
  { key: "digital-nomad", label: "TRAVELS" },
] as const;

export default function Sections({ data }: SectionsProps) {
  return (
    <div className="space-y-16">
      {ORDER.map(({ key, label }) => {
        const item = data[key];
        if (!item) return null;

        return (
          <Section key={key} id={key} label={label}>
            {item.content && (
              <div
                className="prose-reading"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.content}
              </div>
            )}

            {item.entries && (
              <PostList
                items={item.entries.map((entry) => ({
                  href: `/digital-nomad/${entry.slug}`,
                  label: entry.country,
                  meta: entry.date,
                }))}
              />
            )}

            {item.links && item.links.length > 0 && (
              <PostList
                items={item.links.map((l) => ({
                  href: l.url,
                  label: l.name,
                  meta: l.date,
                }))}
              />
            )}
          </Section>
        );
      })}
    </div>
  );
}
