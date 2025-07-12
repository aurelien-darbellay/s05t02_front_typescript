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
  entryRef: RefObject<HTMLDivElement>;
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
      requestAnimationFrame(() => {
        const el = entryRef.current;
        const rect = el.getBoundingClientRect();
        const buffer = 20;

        const isFullyVisible =
          rect.top >= buffer && rect.bottom <= window.innerHeight - buffer;

        if (!isFullyVisible) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }

        if (onHoverHeightChange) {
          onHoverHeightChange(entry.id, rect.height);
        }
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
