import React, { useState, useEffect, useRef, useContext } from 'react';
import { ContainerEntry } from '../../model/EntriesGeneralFeatures.ts';
import { Entry } from './entryGeneralComponent/Entry.tsx';
import { AddButtonGrid } from './AddButtonGrid.tsx';
import { useCanvasSize } from './CanvasHelpers.ts';
import { mapEntryToComponent } from '../../model/mappers/mapEntryToComponent.tsx';
import { EditEntryContext } from '../../contexts/EditEntryContext.ts';
import { computeConnectionPoints } from './entryGeneralComponent/computeConnectionPoints.ts';
import { createHandleKeyDown } from './entryGeneralComponent/createHandleKeyDown.ts';
import { PlayButton } from './PlayButton.tsx';

interface CanvasProps {
  entries: ContainerEntry[];
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>> | null;
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
  setEntries,
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
    {
      sourceId: string;
      targetId: string;
      from: { x: number; y: number } | null;
      to: { x: number; y: number } | null;
    }[]
  >([]);
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedConnectionIndex, setSelectedConnectionIndex] = useState<
    number | null
  >(null);
  const [hoveredConnectionIndex, setHoveredConnectionIndex] = useState<
    number | null
  >(null);

  const { editable, addOrUpdateEntry } = useContext(EditEntryContext);
  const entryOpenHeights = useRef<Map<string, number>>(new Map());
  const handleHoverHeightChange = (id: string, height: number) => {
    const old = entryOpenHeights.current.get(id);
    if (old !== height) {
      entryOpenHeights.current.set(id, height);
      setLayoutVersion((v) => v + 1);
    }
  };

  // NEW: Map of id -> ref
  const entryRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    let maxY = window.innerHeight - 250;

    entries.forEach((entry) => {
      const ref = entryRefs.current.get(entry.id);
      if (!ref) return;

      const rect = ref.getBoundingClientRect();
      const baseHeight = rect.height;

      const openHeight = entryOpenHeights.current.get(entry.id) ?? baseHeight;

      const bottom = entry.position.yCord + openHeight;

      if (bottom > maxY) maxY = bottom;
    });

    setCanvasHeight((prev) => (prev !== maxY + 100 ? maxY + 100 : prev));
  }, [entries, layoutVersion]);

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
      .map((e) => {
        const points = computeConnectionPoints(
          e,
          entryRefs.current,
          canvasRef.current
        );
        if (!points) return null;

        return {
          sourceId: e.id,
          targetId: e.nextEntry,
          from: points.from,
          to: points.to,
        };
      })
      .filter(Boolean);

    setConnections(newConnections);
  }, [
    entries,
    layoutVersion,
    existOpenEntry,
    entryRefs,
    canvasReady,
    canvasWidth,
  ]);

  useEffect(() => {
    const handleKeyDown = createHandleKeyDown({
      selectedConnectionIndex,
      setSelectedConnectionIndex,
      connections,
      entries,
      setEntries,
      addOrUpdateEntry,
    });

    if (editable) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedConnectionIndex, connections, entries]);

  //console.log(connections);
  return (
    <div
      ref={canvasRef}
      className="w-full"
      style={{
        position: 'relative',
        height: canvasHeight,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        //pointerEvents: isPlaying ? 'none' : 'auto',
      }}
    >
      <PlayButton setIsPlaying={setIsPlaying} />
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

        {connections.map((conn, idx) => {
          const pathD = `
  M ${conn.from?.x ?? 0} ${conn.from?.y ?? 0}
  L ${conn.to?.x ?? 0} ${conn.to?.y ?? 0}
`;

          return (
            <g key={idx}>
              {/* Invisible fat path for interaction */}
              <path
                d={pathD}
                stroke="transparent"
                strokeWidth="20"
                fill="none"
                pointerEvents="auto"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredConnectionIndex(idx)}
                onMouseLeave={() => setHoveredConnectionIndex(null)}
                onClick={() =>
                  setSelectedConnectionIndex((prev) =>
                    prev === idx ? null : idx
                  )
                }
              />

              {/* Visible thin path */}
              <path
                d={pathD}
                stroke={
                  selectedConnectionIndex === idx
                    ? 'orange'
                    : hoveredConnectionIndex === idx
                      ? 'red'
                      : 'black'
                }
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
                pointerEvents="auto"
              />
            </g>
          );
        })}
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
              onSizeChange={() => setLayoutVersion((prev) => prev + 1)}
              existOpenEntry={existOpenEntry}
              setExistOpenEntry={setExistOpenEntry}
              editable={editable}
              onHoverHeightChange={handleHoverHeightChange}
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
