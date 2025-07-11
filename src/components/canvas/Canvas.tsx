import React, { useState, useEffect, useRef, useContext } from 'react';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from './Entry.tsx';
import { AddButtonGrid } from './AddButtonGrid.tsx';
import { useCanvasSize } from './CanvasHelpers.ts';
import { mapEntryToComponent } from '../../model/mappers/mapEntryToComponent.tsx';
import { EditEntryContext } from '../../contexts/EditEntryContext.ts';
import { computeConnectionPoints } from './computeConnectionPoints.ts';

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
// ... your existing imports

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
  const [connections, setConnections] = useState<
    { from: { x: number; y: number }; to: { x: number; y: number } }[]
  >([]);

  const { editable } = useContext(EditEntryContext);

  // NEW: Map of id -> ref
  const entryRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

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

  // NEW: Compute connections with coordinates
  useEffect(() => {
    if (!canvasRef.current) return;

    const newConnections = entries
      .filter((e) => e.id && e.nextEntry)
      .map((e) =>
        computeConnectionPoints(e, entryRefs.current, canvasRef.current)
      )
      .filter(Boolean) as {
      from: { x: number; y: number };
      to: { x: number; y: number };
    }[];

    setConnections(newConnections);
  }, [entries, existOpenEntry, entryRefs, canvasReady]);

  //console.log(connections);
  return (
    <div
      ref={canvasRef}
      className="w-full"
      style={{ position: 'relative', height: canvasHeight }}
    >
      <AddButtonGrid
        entries={entries}
        gridLines={Math.ceil(canvasHeight / 100)}
        onAddClick={handleButtonGrid}
        existOpenEntry={existOpenEntry}
        canvasRef={canvasRef}
        editable={editable}
      />

      {/* Lines SVG overlay */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: canvasHeight,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
          </marker>
        </defs>

        {connections.map((conn, idx) => (
          <path
            key={idx}
            d={`
        M ${conn.from.x} ${conn.from.y}
        C ${conn.from.x + 100} ${conn.from.y},
          ${conn.to.x - 100} ${conn.to.y},
          ${conn.to.x} ${conn.to.y}
      `}
            stroke="black"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrow)"
          />
        ))}
      </svg>

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
              // NEW: provide the ref to this Entry
              ref={(el) => {
                if (entry.id) {
                  entryRefs.current.set(entry.id, el);
                }
              }}
            >
              {mapEntryToComponent(entry)}
            </Entry>
          ) : null
        )
      )}
    </div>
  );
};
