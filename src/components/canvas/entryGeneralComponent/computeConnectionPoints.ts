import { ContainerEntry } from '../../../model/EntriesGeneralFeatures';

export interface Point {
  x: number;
  y: number;
}

export function computeConnectionPoints(
  entry: ContainerEntry,
  entryRefs: Map<string, HTMLDivElement | null>,
  canvasEl: HTMLDivElement | null
): { from: Point | null; to: Point | null } | null {
  if (!entry.id) return null;
  if (!canvasEl) return null;

  const canvasRect = canvasEl.getBoundingClientRect();

  let fromEdge: Point | null = null;
  let toEdge: Point | null = null;

  const fromEl = entryRefs.get(entry.id);
  if (fromEl) {
    const fromRect = fromEl.getBoundingClientRect();
    const fromCenter = {
      x: fromRect.left + fromRect.width / 2 - canvasRect.left,
      y: fromRect.top + fromRect.height / 2 - canvasRect.top,
    };

    // If there's also a to, compute vector for edge alignment
    if (entry.nextEntry) {
      const toEl = entryRefs.get(entry.nextEntry);
      if (toEl) {
        const toRect = toEl.getBoundingClientRect();
        const toCenter = {
          x: toRect.left + toRect.width / 2 - canvasRect.left,
          y: toRect.top + toRect.height / 2 - canvasRect.top,
        };

        const dx = toCenter.x - fromCenter.x;
        const dy = toCenter.y - fromCenter.y;

        if (dx !== 0 || dy !== 0) {
          const fromHalfWidth = fromRect.width / 2;
          const fromHalfHeight = fromRect.height / 2;
          const fromScale = Math.min(
            Math.abs(fromHalfWidth / dx),
            Math.abs(fromHalfHeight / dy)
          );
          fromEdge = {
            x: fromCenter.x + dx * fromScale,
            y: fromCenter.y + dy * fromScale,
          };

          const toHalfWidth = toRect.width / 2;
          const toHalfHeight = toRect.height / 2;
          const toScale = Math.min(
            Math.abs(toHalfWidth / -dx),
            Math.abs(toHalfHeight / -dy)
          );
          toEdge = {
            x: toCenter.x - dx * toScale,
            y: toCenter.y - dy * toScale,
          };
        }
      }
    } else {
      // if no nextEntry, still provide center as from
      fromEdge = fromCenter;
    }
  }

  return fromEdge || toEdge ? { from: fromEdge, to: toEdge } : null;
}
