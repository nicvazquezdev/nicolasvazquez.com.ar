"use client";

import { useHoverHighlight } from "@/hooks";
import { InfoData } from "@/types";

interface InfoNavigationProps {
  data: InfoData;
  activeInfo: string;
  onTabClick: (key: string) => void;
}

export default function InfoNavigation({
  data,
  activeInfo,
  onTabClick,
}: InfoNavigationProps) {
  const { hoverStyle, handleMouseEnter, handleMouseLeave, containerRef } =
    useHoverHighlight();

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap gap-1 text-sm -ml-3"
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover highlight background */}
      <div
        className={`absolute top-0 h-full rounded-lg bg-[#232323] pointer-events-none ${
          hoverStyle.animate
            ? "transition-all duration-300 ease-in-out"
            : "transition-opacity duration-150"
        }`}
        style={{
          left: hoverStyle.offset,
          width: hoverStyle.size,
          opacity: hoverStyle.opacity,
        }}
      />

      {/* Navigation buttons */}
      {Object.entries(data).map(([key, item]) => (
        <button
          key={key}
          onClick={() => onTabClick(key)}
          onMouseEnter={handleMouseEnter}
          className={`relative z-10 px-3 py-1.5 rounded-lg md:text-base cursor-pointer transition-colors duration-150 ${
            activeInfo === key
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
