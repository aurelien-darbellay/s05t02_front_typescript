import React from 'react';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures.ts';

interface AddButtonGridProps {
  entries: ContainerEntry[];
  gridLines: number;
  onAddClick: (relativeX, relativeY) => void;
  existOpenEntry: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const AddButtonGrid: React.FC<AddButtonGridProps> = ({
  entries,
  gridLines,
  onAddClick,
  existOpenEntry,
  canvasRef,
}) => {
  const totalCells = gridLines * 6;
  const overlappedGridIndices = new Set<number>();

  const getFraction = (value: number, radix: number): number => {
    if (value < 0 || value > 1) {
      throw new Error('Value must be between 0 and 1.');
    }
    return Math.min(6, Math.floor(value * radix) + 1);
  };

  entries.forEach((entry) => {
    if (!entry.position) return; // Skip entries without a position
    const { xCord, yCord } = entry.position;
    const xIndex = getFraction(xCord, 6) - 1; // Convert to grid index (0-5)
    const yIndex = getFraction(yCord, gridLines) - 1; // Convert
    const gridIndex = yIndex * 6 + xIndex; // Calculate the grid index
    if (gridIndex >= 0 && gridIndex < totalCells) {
      overlappedGridIndices.add(gridIndex);
      if (gridIndex > 1) overlappedGridIndices.add(gridIndex - 1); // Add left neighbor
      if (gridIndex < totalCells - 1) overlappedGridIndices.add(gridIndex + 1); // Add right neighbor
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('hola');
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = (e.clientX - rect.left) / rect.width;
    const centerY = (e.clientY - rect.top) / rect.height;
    onAddClick(centerX, centerY);
  };

  if (existOpenEntry) return null;

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
        //console.log(`Cell ${idx} is overlapped: ${isOverlapped}`);
        return (
          <button
            key={idx}
            onClick={(e) => {
              if (!isOverlapped) handleClick(e);
            }}
            className={`${
              isOverlapped
                ? 'opacity-0'
                : 'opacity-0 hover:opacity-100 pointer-events-auto'
            } transition-opacity duration-300 bg-white text-gray-600 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center text-2xl`}
          >
            +
          </button>
        );
      })}
    </div>
  );
};
