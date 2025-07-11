import { ContainerEntry } from '../../model/EntriesGeneralFeatures';

export interface Point {
  x: number;
  y: number;
}

export function computeConnectionPoints(
  entry: ContainerEntry,
  entryRefs: Map<string, HTMLDivElement | null>,
  canvasEl: HTMLDivElement | null
): { from: Point; to: Point } | null {
  if (!entry.id || !entry.nextEntry) return null;
  if (!canvasEl) return null;

  const fromEl = entryRefs.get(entry.id);
  const toEl = entryRefs.get(entry.nextEntry);

  if (!fromEl || !toEl) return null;

  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  const canvasRect = canvasEl.getBoundingClientRect();

  // Centers relative to canvas
  const fromCenter = {
    x: fromRect.left + fromRect.width / 2 - canvasRect.left,
    y: fromRect.top + fromRect.height / 2 - canvasRect.top,
  };
  const toCenter = {
    x: toRect.left + toRect.width / 2 - canvasRect.left,
    y: toRect.top + toRect.height / 2 - canvasRect.top,
  };

  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  if (dx === 0 && dy === 0) return null; // avoid division by zero

  // Compute edge exit point from source box
  const fromHalfWidth = fromRect.width / 2;
  const fromHalfHeight = fromRect.height / 2;
  const fromScale = Math.min(
    Math.abs(fromHalfWidth / dx),
    Math.abs(fromHalfHeight / dy)
  );
  const fromEdge = {
    x: fromCenter.x + dx * fromScale,
    y: fromCenter.y + dy * fromScale,
  };

  // Compute edge entry point into target box
  const toHalfWidth = toRect.width / 2;
  const toHalfHeight = toRect.height / 2;
  const toScale = Math.min(
    Math.abs(toHalfWidth / -dx),
    Math.abs(toHalfHeight / -dy)
  );
  const toEdge = {
    x: toCenter.x - dx * toScale,
    y: toCenter.y - dy * toScale,
  };

  return { from: fromEdge, to: toEdge };
}
