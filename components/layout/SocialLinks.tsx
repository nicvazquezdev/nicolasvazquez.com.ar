import Link from "next/link";
import { socialLinks } from "@/data";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4 text-xs font-mono">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          aria-label={social.name}
        >
          {social.name.toLowerCase()}
        </Link>
      ))}
    </div>
  );
}
