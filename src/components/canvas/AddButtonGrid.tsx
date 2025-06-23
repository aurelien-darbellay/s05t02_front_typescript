import React from 'react';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures.ts';

interface AddButtonGridProps {
  entries: ContainerEntry[];
  gridLines: number;
  onAddClick: () => void;
}

export const AddButtonGrid: React.FC<AddButtonGridProps> = ({ entries, gridLines, onAddClick }) => {
  const totalCells = gridLines * 6;

  // Calculate overlapped grid indices (assuming entry.position in grid units)
  const overlappedGridIndices = new Set<number>();
  entries.forEach((entry) => {
    if (!entry.position) return; // Skip entries without a position
    const { xCord, yCord } = entry.position;
    if (xCord >= 0 && xCord < gridLines && yCord >= 0 && yCord < gridLines) {
      const index = yCord * gridLines + xCord;
      overlappedGridIndices.add(index);
    }
  });

  return (
    <div
      className="grid gap-4 p-4 z-0 pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(6, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridLines}, 100px)`,
      }}
    >
      {Array.from({ length: totalCells }).map((_, idx) => {
        const isOverlapped = overlappedGridIndices.has(idx);
        return (
          <button
          
            key={idx}
            onClick={() => !isOverlapped && onAddClick()}
            className={`${
              isOverlapped ? 'hidden' : 'opacity-0 hover:opacity-100 pointer-events-auto'
            } transition-opacity duration-300 bg-white text-gray-600 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center text-2xl`}
          >
            +
          </button>
        );
      })}
    </div>
  );
};
