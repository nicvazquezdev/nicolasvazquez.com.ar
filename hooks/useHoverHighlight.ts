import { useState, useCallback, useRef, RefObject } from "react";
import { useCanHover } from "./useMediaQuery";

interface HoverStyle {
  offset: number;
  size: number;
  opacity: number;
  animate: boolean;
}

interface UseHoverHighlightReturn {
  hoverStyle: HoverStyle;
  handleMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function useHoverHighlight(
  direction: "horizontal" | "vertical" = "horizontal"
): UseHoverHighlightReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverStyle, setHoverStyle] = useState<HoverStyle>({
    offset: 0,
    size: 0,
    opacity: 0,
    animate: true,
  });

  const canHover = useCanHover();

  const canHoverRef = useRef(canHover);
  canHoverRef.current = canHover;

  const directionRef = useRef(direction);
  directionRef.current = direction;

  const isInsideRef = useRef(false);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!canHoverRef.current) return;

    const element = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const isVertical = directionRef.current === "vertical";
    const newOffset = isVertical
      ? elementRect.top - containerRect.top
      : elementRect.left - containerRect.left;
    const newSize = isVertical ? elementRect.height : elementRect.width;

    const shouldAnimate = isInsideRef.current;
    isInsideRef.current = true;

    setHoverStyle({
      offset: newOffset,
      size: newSize,
      opacity: 1,
      animate: shouldAnimate,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    isInsideRef.current = false;
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return {
    hoverStyle,
    handleMouseEnter,
    handleMouseLeave,
    containerRef,
  };
}
