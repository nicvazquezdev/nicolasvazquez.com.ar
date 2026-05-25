"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ANIMATION } from "@/config";

interface LastUpdatedProps {
  lastCommitDate: string;
}

const MS_PER_MINUTE = 1000 * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const MS_PER_WEEK = MS_PER_DAY * 7;
const MS_PER_MONTH = MS_PER_DAY * 30;
const MS_PER_YEAR = MS_PER_DAY * 365;

export default function LastUpdated({ lastCommitDate }: LastUpdatedProps) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  const commitDate = useMemo(() => new Date(lastCommitDate), [lastCommitDate]);

  const calculateTimeAgo = useCallback(() => {
    const diffMs = Date.now() - commitDate.getTime();

    if (diffMs < MS_PER_MINUTE) return "just now";

    const minutes = Math.floor(diffMs / MS_PER_MINUTE);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(diffMs / MS_PER_HOUR);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(diffMs / MS_PER_DAY);
    if (days === 1) return "yesterday";
    if (days < 7) return `${days}d ago`;

    const weeks = Math.floor(diffMs / MS_PER_WEEK);
    if (weeks < 5) return weeks === 1 ? "1w ago" : `${weeks}w ago`;

    const months = Math.floor(diffMs / MS_PER_MONTH);
    if (months < 12) return months === 1 ? "1mo ago" : `${months}mo ago`;

    const years = Math.floor(diffMs / MS_PER_YEAR);
    return years === 1 ? "1y ago" : `${years}y ago`;
  }, [commitDate]);

  useEffect(() => {
    setTimeAgo(calculateTimeAgo());

    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, ANIMATION.lastUpdated.updateInterval);

    return () => clearInterval(interval);
  }, [calculateTimeAgo]);

  if (!timeAgo) return null;

  return (
    <div className="text-xs font-mono tabular-nums text-[var(--muted)]">
      <span>updated</span>{" "}
      <span className="text-[var(--muted-strong)]">{timeAgo}</span>
    </div>
  );
}
