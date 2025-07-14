import { useState, useEffect, RefObject } from 'react';

export function useEntryHover({
  entry,
  entryRef,
  dialogOpen,
  existOpenEntry,
  connectMode,
  setExistOpenEntry,
  onHoverHeightChange,
}: {
  entry: any;
  entryRef: RefObject<HTMLDivElement | null>;
  dialogOpen: boolean;
  existOpenEntry: boolean;
  connectMode: boolean;
  setExistOpenEntry: (v: boolean) => void;
  onHoverHeightChange?: (id: string, height: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(entry.highlighted);
  }, [entry.highlighted]);

  useEffect(() => {
    if (dialogOpen) setHovered(false);
  }, [dialogOpen]);

  useEffect(() => {
    if (hovered && entryRef.current) {
      const el = entryRef.current;
      const rect = el.getBoundingClientRect();

      // Call this immediately so Canvas can resize
      if (onHoverHeightChange) {
        onHoverHeightChange(entry.id, rect.height);
      }

      // Wait for next frame (layout update) before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const bottomMargin = 50; // distance from bottom of viewport
          const topMargin = 20; // optional margin at top

          const el = entryRef.current;
          const rect = el?.getBoundingClientRect();

          // How much space is available in viewport
          const viewportHeight = window.innerHeight;

          // If it's already fully in view with margins, do nothing
          if (
            rect &&
            rect.top >= topMargin &&
            rect.bottom <= viewportHeight - bottomMargin
          ) {
            return;
          }

          // Now compute the ideal target scroll position
          const absoluteElementBottom =
            window.pageYOffset + (rect ? rect.bottom : 0);
          let targetScrollY =
            absoluteElementBottom - viewportHeight + bottomMargin;

          // Clamp so that top doesn't go offscreen
          const absoluteElementTop = window.pageYOffset + (rect ? rect.top : 0);
          targetScrollY = Math.min(
            targetScrollY,
            absoluteElementTop - topMargin
          );

          // Scroll!
          window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth',
          });
        });
      });
    }
  }, [hovered]);

  const handleMouseEnter = () => {
    if (!dialogOpen && !existOpenEntry && !connectMode) {
      setHovered(true);
      setExistOpenEntry(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (e.buttons !== 0) return;
    setHovered(false);
    setExistOpenEntry(false);
  };

  return {
    hovered,
    setHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}
