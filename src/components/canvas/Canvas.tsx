import React, { useState, useEffect, useRef, useContext } from 'react';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from './Entry.tsx';
import { AddButtonGrid } from './AddButtonGrid.tsx';
import { useCanvasSize } from './CanvasHelpers.ts';
import { mapEntryToComponent } from '../../model/mappers/mapEntryToComponent.tsx';
import { EditEntryContext } from '../../contexts/EditEntryContext.ts';

interface CanvasProps {
  entries: ContainerEntry[];
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setEntrySpawnPosition?: React.Dispatch<
    React.SetStateAction<{
      xCord: number;
      yCord: number;
    } | null>
  >;
}

export const Canvas: React.FC<CanvasProps> = ({
  entries,
  setDialogOpen,
  setEntrySpawnPosition,
}) => {
  const [canvasHeight, setCanvasHeight] = useState(1000);
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    canvasReady,
    canvasSize: { canvasWidth },
  } = useCanvasSize(canvasRef);
  const [existOpenEntry, setExistOpenEntry] = useState(false);
  const { editable } = useContext(EditEntryContext);

  useEffect(() => {
    const buffer = 0;
    let maxY = window.innerHeight - 250;
    entries.forEach((entry) => {
      const bottom = entry.position.yCord + 50;
      if (bottom > maxY) maxY = bottom;
    });
    setCanvasHeight(maxY + buffer);
  }, [entries]);

  const handleButtonGrid = (relativeX, relativeY) => {
    if (setEntrySpawnPosition)
      setEntrySpawnPosition({ xCord: relativeX, yCord: relativeY });
    if (setDialogOpen) setDialogOpen(true);
  };

  return (
    <div ref={canvasRef} className="w-full" style={{ position: 'relative' }}>
      <AddButtonGrid
        entries={entries}
        gridLines={Math.ceil(canvasHeight / 100)}
        onAddClick={handleButtonGrid}
        existOpenEntry={existOpenEntry}
        canvasRef={canvasRef}
        editable={editable}
      />

      {!canvasReady ? (
        <div className="text-center py-10 text-gray-600 text-lg">
          Adjusting positions...
        </div>
      ) : (
        entries.map((entry, idx) =>
          entry.projected ? (
            <Entry
              key={idx}
              entry={entry}
              width={canvasWidth}
              existOpenEntry={existOpenEntry}
              setExistOpenEntry={setExistOpenEntry}
              editable={editable}
            >
              {mapEntryToComponent(entry)}
            </Entry>
          ) : (
            ''
          )
        )
      )}
    </div>
  );
};
