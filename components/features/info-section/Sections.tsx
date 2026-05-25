import { InfoData } from "@/types";
import { linkifyText } from "@/lib/utils";
import Section from "./Section";
import PostList from "./PostList";
import LinksList from "./LinksList";

interface SectionsProps {
  data: InfoData;
}

/**
 * Section order is fixed independent of data key order so the home page
 * reads as: about → writing → travels.
 */
const ORDER: Array<{ key: string; label: string }> = [
  { key: "me", label: "ABOUT" },
  { key: "thoughts", label: "THOUGHTS" },
  { key: "digital-nomad", label: "TRAVELS" },
];

export default function Sections({ data }: SectionsProps) {
  return (
    <div className="space-y-16">
      {ORDER.map(({ key, label }) => {
        const item = data[key];
        if (!item) return null;

        const internalLinks = item.links?.filter(
          (l) => l.date && l.url.startsWith("/")
        );
        const externalLinks = item.links?.filter(
          (l) => !l.date || !l.url.startsWith("/")
        );

        return (
          <Section key={key} id={key} label={label}>
            {item.content && (
              <div
                className="prose-reading"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {typeof item.content === "string" ? (
                  <div className="whitespace-pre-line">
                    {linkifyText(item.content)}
                  </div>
                ) : (
                  item.content
                )}
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

            {internalLinks && internalLinks.length > 0 && (
              <PostList
                items={internalLinks.map((l) => ({
                  href: l.url,
                  label: l.name,
                  meta: l.date,
                }))}
              />
            )}

            {externalLinks && externalLinks.length > 0 && (
              <div className={item.content ? "mt-6" : ""}>
                <LinksList links={externalLinks} />
              </div>
            )}
          </Section>
        );
      })}
    </div>
  );
}
