"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { TAB_TO_COMMAND } from "@/config";

export default function TerminalPrompt() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getCommand = () => {
    // Home page - check tab parameter
    if (pathname === "/") {
      const section = searchParams.get("tab") || "thoughts";
      return TAB_TO_COMMAND[section] || "ls -la thoughts/";
    }

    // Blog post pages
    if (pathname.startsWith("/thoughts/")) {
      const slug = pathname.replace("/thoughts/", "");
      return `cat thoughts/${slug}.md`;
    }

    // Digital nomad detail pages
    if (pathname.startsWith("/digital-nomad/")) {
      const slug = pathname.replace("/digital-nomad/", "");
      return `cat digital-nomad/${slug}.md`;
    }

    // Unknown path
    return `cd ${pathname}`;
  };

  return (
    <div className="font-mono text-xs">
      <span className="text-white">visitor</span>
      <span className="text-white">@</span>
      <span className="text-white">nicolasvazquez</span>
      <span className="text-gray-500">:</span>
      <span className="text-gray-500">~</span>
      <span className="text-gray-500">$ </span>
      <span className="text-gray-400">{getCommand()}</span>
    </div>
  );
}
