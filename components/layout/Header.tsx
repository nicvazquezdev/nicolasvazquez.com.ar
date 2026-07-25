import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="mb-14 md:mb-16">
      <div className="flex items-baseline justify-between gap-6">
        <Link href="/" className="group">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--foreground)] leading-none">
            nicolás vázquez
          </h1>
        </Link>
        <SocialLinks />
      </div>

      <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-[var(--muted-strong)]">
        senior software engineer. i write here about engineering and anything that comes to my mind.
      </p>
    </header>
  );
}
